/**
 * In-memory CallSid → intent_id mapping for Groundworks Twilio webhooks.
 * Scoped to this Node process only (serverless instances do not share memory).
 */

const TTL_MS = 10 * 60 * 1000;

let latestIntentId: string | null = null;

const callSidToIntent = new Map<string, { intentId: string; expiresAt: number }>();

function pruneExpired(): void {
  const now = Date.now();
  for (const [sid, entry] of callSidToIntent) {
    if (entry.expiresAt <= now) callSidToIntent.delete(sid);
  }
}

export function setLatestIntentId(id: string): void {
  const t = id.trim();
  latestIntentId = t.length > 0 ? t : null;
}

export function clearLatestIntentId(): void {
  latestIntentId = null;
}

export function peekLatestIntentId(): string | null {
  return latestIntentId;
}

export function bindCallSidToIntent(callSid: string, intentId: string): void {
  const sid = callSid.trim();
  const intent = intentId.trim();
  if (!sid || !intent) return;
  pruneExpired();
  callSidToIntent.set(sid, { intentId: intent, expiresAt: Date.now() + TTL_MS });
}

export function getIntentIdByCallSid(callSid: string): string | undefined {
  const sid = callSid.trim();
  if (!sid) return undefined;
  pruneExpired();
  const entry = callSidToIntent.get(sid);
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) {
    callSidToIntent.delete(sid);
    return undefined;
  }
  return entry.intentId;
}

export function deleteCallSid(callSid: string): void {
  const sid = callSid.trim();
  if (sid) callSidToIntent.delete(sid);
}
