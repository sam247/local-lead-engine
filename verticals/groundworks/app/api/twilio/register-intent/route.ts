import { setLatestIntentId } from "@/lib/twilioIntentStore";

function trimToString(value: unknown): string {
  return String(value ?? "").trim();
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const intent_id = trimToString(body.intent_id);
    if (intent_id.length > 0) {
      setLatestIntentId(intent_id);
    }
  } catch (error) {
    console.error("[call_intent_register] Failed to parse body", error);
  }
  return new Response(null, { status: 204 });
}
