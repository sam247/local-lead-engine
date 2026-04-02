import {
  bindCallSidToIntent,
  clearLatestIntentId,
  peekLatestIntentId,
} from "@/lib/twilioIntentStore";

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function readParam(url: URL, key: string, fallback: string): string {
  const value = url.searchParams.get(key);
  if (!value) return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

function trimToString(value: unknown): string {
  return String(value ?? "").trim();
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const service = readParam(url, "service", "unknown");
  const location = readParam(url, "location", "unknown");
  const page = readParam(url, "page", "unknown");
  const issue = readParam(url, "issue", "none");

  let intentFromQuery = trimToString(url.searchParams.get("intent_id"));
  let callSid = "";
  let intentFromForm = "";

  if (req.method === "POST") {
    try {
      const fd = await req.formData();
      callSid = trimToString(fd.get("CallSid"));
      intentFromForm = trimToString(fd.get("intent_id"));
    } catch {
      // ignore
    }
  }

  let intentId = intentFromQuery || intentFromForm;
  const latest = peekLatestIntentId();

  if (callSid && latest) {
    bindCallSidToIntent(callSid, latest);
    intentId = latest;
    clearLatestIntentId();
  }

  const forwardedNumber = process.env.FORWARD_PHONE_NUMBER?.trim();
  if (!forwardedNumber) {
    console.error("[twilio_voice] Missing FORWARD_PHONE_NUMBER");
    return new Response("Missing FORWARD_PHONE_NUMBER", { status: 500 });
  }

  const baseUrl = `${url.protocol}//${url.host}`;
  const statusPath = "/api/twilio/status";
  const statusCallback = intentId
    ? `${baseUrl}${statusPath}?intent_id=${encodeURIComponent(intentId)}`
    : `${baseUrl}${statusPath}`;

  console.log("[twilio_voice]", {
    intentId,
    callSid: callSid || undefined,
    statusCallback,
  });

  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial statusCallback="${xmlEscape(statusCallback)}" statusCallbackEvent="completed" statusCallbackMethod="POST">
    ${xmlEscape(forwardedNumber)}
  </Dial>
</Response>`;

  void service;
  void location;
  void page;
  void issue;

  return new Response(twiml, {
    headers: { "Content-Type": "text/xml" },
  });
}
