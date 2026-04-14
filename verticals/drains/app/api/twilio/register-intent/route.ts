function twilioBridgeBaseUrl(): string {
  return (process.env.TWILIO_BRIDGE_BASE_URL ?? "https://mainlinegroundworks.co.uk").replace(/\/$/, "");
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    await fetch(`${twilioBridgeBaseUrl()}/api/twilio/register-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
  } catch (error) {
    console.error("[twilio_bridge][drains][register-intent] Forward failed", error);
  }
  return new Response(null, { status: 204 });
}
