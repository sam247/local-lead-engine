function twilioBridgeBaseUrl(): string {
  return (process.env.TWILIO_BRIDGE_BASE_URL ?? "https://mainlinegroundworks.co.uk").replace(/\/$/, "");
}

export async function POST(req: Request) {
  try {
    const incoming = new URL(req.url);
    const target = new URL(`${twilioBridgeBaseUrl()}/api/twilio/voice`);
    incoming.searchParams.forEach((value, key) => target.searchParams.set(key, value));
    await fetch(target.toString(), { method: "POST" });
  } catch (error) {
    console.error("[twilio_bridge][access][voice] Forward failed", error);
  }
  return new Response(null, { status: 204 });
}
