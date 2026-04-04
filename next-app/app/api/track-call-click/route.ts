export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const record = {
      timestamp: new Date().toISOString(),
      page_path: typeof body.page_path === "string" ? body.page_path : "",
      service_slug: body.service_slug ?? null,
      location_slug: body.location_slug ?? null,
      vertical: typeof body.vertical === "string" ? body.vertical : "",
      user_agent: req.headers.get("user-agent") ?? undefined,
      cta_text: typeof body.cta_text === "string" ? body.cta_text : "",
      cta_seed: typeof body.cta_seed === "string" ? body.cta_seed : "",
    };
    console.log("[track-call-click]", JSON.stringify(record));
  } catch {
    // Never block the client
  }
  return new Response(null, { status: 204 });
}
