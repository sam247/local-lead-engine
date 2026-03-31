function toStringValue(value: FormDataEntryValue | null, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

function toDuration(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function buildMeasurementProtocolUrl(): string | null {
  const measurementId = process.env.GA4_MEASUREMENT_ID?.trim();
  const apiSecret = process.env.GA4_API_SECRET?.trim();
  if (!measurementId || !apiSecret) return null;
  return `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`;
}

export async function POST(req: Request) {
  const formData = await req.formData();

  const callSid = toStringValue(formData.get("CallSid"), "unknown");
  const status = toStringValue(formData.get("CallStatus"), "unknown");
  const from = toStringValue(formData.get("From"), "unknown");
  const to = toStringValue(formData.get("To"), "unknown");
  const durationRaw = toStringValue(formData.get("CallDuration"), "0");
  const duration = toDuration(durationRaw);

  // Twilio can include custom context fields when configured in callback URL.
  const service = toStringValue(formData.get("service"), "unknown");
  const location = toStringValue(formData.get("location"), "unknown");
  const page = toStringValue(formData.get("page"), "unknown");
  const issue = toStringValue(formData.get("issue"), "none");

  const gaUrl = buildMeasurementProtocolUrl();
  if (gaUrl) {
    try {
      await fetch(gaUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: callSid,
          events: [
            {
              name: "phone_call",
              params: {
                event_type: "call",
                call_status: status,
                call_duration: duration,
                from_number: from,
                to_number: to,
                vertical: "groundworks",
                service,
                location,
                page,
                issue,
              },
            },
          ],
        }),
      });
    } catch (error) {
      console.error("[twilio_status] Failed GA4 post", error);
    }
  } else {
    console.warn("[twilio_status] GA4 env vars missing, skipping GA4 call event");
  }

  const sheetsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  if (sheetsWebhook) {
    try {
      await fetch(sheetsWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type: "call",
          callSid,
          status,
          from,
          to,
          duration,
          vertical: "groundworks",
          service,
          location,
          page,
          issue,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error("[twilio_status] Failed Sheets webhook post", error);
    }
  } else {
    console.warn("[twilio_status] GOOGLE_SHEETS_WEBHOOK_URL missing, skipping call log webhook");
  }

  return new Response("OK");
}
