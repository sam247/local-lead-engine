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

export async function POST(req: Request) {
  const url = new URL(req.url);
  const service = readParam(url, "service", "unknown");
  const location = readParam(url, "location", "unknown");
  const page = readParam(url, "page", "unknown");
  const issue = readParam(url, "issue", "none");

  const forwardedNumber = process.env.FORWARD_PHONE_NUMBER?.trim();
  if (!forwardedNumber) {
    console.error("[twilio_voice] Missing FORWARD_PHONE_NUMBER");
    return new Response("Missing FORWARD_PHONE_NUMBER", { status: 500 });
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>${xmlEscape(forwardedNumber)}</Dial>
</Response>`;

  // Context is parsed now so it can be surfaced to logs/monitoring later if needed.
  void service;
  void location;
  void page;
  void issue;

  return new Response(twiml, {
    headers: { "Content-Type": "text/xml; charset=utf-8" },
  });
}
