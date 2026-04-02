export type TrackCallClickContext = {
  page_path?: string;
  service_slug?: string | null;
  location_slug?: string | null;
  vertical?: string;
  source?: "cta" | "header" | "footer" | "inline";
  twilioContext?: {
    service?: string | null;
    location?: string | null;
    page?: string | null;
    issue?: string | null;
    vertical?: string | null;
    voiceWebhookPath?: string | null;
  };
};

export function digitsFromPhone(phone: string): string {
  return phone.replace(/\s/g, "");
}

/**
 * Progressive enhancement: keep `href="tel:…"` on the anchor.
 * With JS: prevent default, POST tracking (fire-and-forget), then navigate to tel:.
 */
export function handleCallClick(
  e: { preventDefault(): void },
  phoneDigits: string,
  context: TrackCallClickContext
): void {
  e.preventDefault();
  const telHref = `tel:${phoneDigits}`;
  const vertical = String(context.vertical ?? "").trim();
  const service_slug = String(context.service_slug ?? "").trim();
  const location_slug = String(context.location_slug ?? "").trim();
  const source = context.source ?? "inline";
  const page_path =
    typeof window !== "undefined"
      ? String(window.location?.pathname ?? "").trim()
      : String(context.page_path ?? "").trim();
  const utm_source =
    typeof window !== "undefined"
      ? String(new URLSearchParams(window.location?.search ?? "").get("utm_source") ?? "").trim()
      : "";

  // Fire GA4 event first (non-blocking, fail silently).
  try {
    if (typeof window !== "undefined" && typeof (window as { gtag?: unknown }).gtag === "function") {
      (window as { gtag: (...args: unknown[]) => void }).gtag("event", "call_click", {
        event_category: "engagement",
        event_label: `${vertical || "unknown"}:${service_slug || "unknown"}`,
        value: 1,
        vertical,
        service_slug,
        location_slug,
        page_path,
      });
    }
  } catch {
    // Do not block call behavior when GA4 is unavailable.
  }

  const clickTimestamp = new Date().toISOString();
  const intentId =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

  try {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("last_call_intent_id", intentId);
    }
  } catch {
    // sessionStorage may be unavailable; tracking still proceeds.
  }

  // Internal tracking is fire-and-forget and must not block dial action.
  void fetch("/api/track-call-click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      vertical,
      page_path,
      service_slug,
      location_slug,
      utm_source,
      source,
      intent_id: intentId,
      click_timestamp: clickTimestamp,
    }),
    keepalive: true,
  }).catch(() => {
    // Swallow tracking errors; dial should proceed regardless.
  });

  if (typeof window !== "undefined" && vertical === "groundworks") {
    void fetch("/api/twilio/register-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intent_id: intentId }),
      keepalive: true,
    }).catch(() => {
      // Non-blocking; must not delay tel:
    });
  }

  // Bridge intent_id to the Groundworks Twilio voice route so statusCallback can carry it (same-origin only).
  if (typeof window !== "undefined" && vertical === "groundworks") {
    void fetch(`/api/twilio/voice?intent_id=${encodeURIComponent(intentId)}`, {
      method: "POST",
      keepalive: true,
    }).catch(() => {
      // Non-blocking; must not delay tel:
    });
  }

  const twilioContext = context.twilioContext;
  const voiceWebhookPath = String(twilioContext?.voiceWebhookPath ?? "").trim();
  if (voiceWebhookPath && typeof window !== "undefined") {
    try {
      const url = new URL(voiceWebhookPath, window.location.origin);
      const service = String(twilioContext?.service ?? service_slug).trim() || "unknown";
      const location = String(twilioContext?.location ?? location_slug).trim() || "unknown";
      const page = String(twilioContext?.page ?? page_path).trim() || "unknown";
      const issue = String(twilioContext?.issue ?? "none").trim() || "none";
      const verticalValue = String(twilioContext?.vertical ?? vertical).trim() || "unknown";

      url.searchParams.set("service", service);
      url.searchParams.set("location", location);
      url.searchParams.set("page", page);
      url.searchParams.set("issue", issue);
      url.searchParams.set("vertical", verticalValue);
      url.searchParams.set("intent_id", intentId);

      void fetch(url.toString(), {
        method: "POST",
        keepalive: true,
      }).catch(() => {
        // Non-blocking pre-call context capture endpoint.
      });
    } catch {
      // Invalid endpoint should never block dialing.
    }
  }

  if (typeof window !== "undefined") {
    window.location.href = telHref;
  }
}
