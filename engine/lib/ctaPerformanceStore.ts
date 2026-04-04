/** In-memory service → CTA text → call stats (resets on deploy / cold start). */

export type CtaPerfStats = { calls: number; strongCalls: number };

const store = new Map<string, Map<string, CtaPerfStats>>();

const MIN_CALLS_TO_BIAS = 5;

export function recordCtaResult(service: string, cta: string, isStrong: boolean): void {
  const s = String(service ?? "").trim();
  const c = String(cta ?? "").trim();
  if (!s || !c) return;

  if (!store.has(s)) store.set(s, new Map());
  const m = store.get(s)!;
  const cur = m.get(c) ?? { calls: 0, strongCalls: 0 };
  cur.calls += 1;
  if (isStrong) cur.strongCalls += 1;
  m.set(c, cur);

  console.log("[cta_perf]", { service: s, cta: c, calls: cur.calls, strongCalls: cur.strongCalls });
}

/**
 * Returns best CTA label among `variants` when this service has at least MIN_CALLS_TO_BIAS total calls
 * across all variants; otherwise null (caller falls back to hash bucketing).
 */
export function getBestCtaForService(service: string, variants: readonly string[]): string | null {
  const s = String(service ?? "").trim();
  if (!s || variants.length === 0) return null;

  const m = store.get(s);
  if (!m) return null;

  let totalCalls = 0;
  for (const v of variants) {
    totalCalls += m.get(v)?.calls ?? 0;
  }
  if (totalCalls < MIN_CALLS_TO_BIAS) return null;

  let best: string | null = null;
  let bestScore = -1;
  for (const v of variants) {
    const st = m.get(v) ?? { calls: 0, strongCalls: 0 };
    const score = st.strongCalls * 3 + st.calls;
    if (score > bestScore) {
      bestScore = score;
      best = v;
    }
  }
  return best;
}
