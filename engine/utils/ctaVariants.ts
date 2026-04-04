import { getBestCtaForService } from "../lib/ctaPerformanceStore";

/** Deterministic string hash for stable A/B bucketing (djb2-style). */
export function hashCode(seed: string): number {
  let hash = 5381;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 33) ^ seed.charCodeAt(i);
  }
  return hash;
}

const CTA_VARIANT_FALLBACK = "Get a free quote";

export type GetCtaVariantOptions = {
  /** When set and in-memory stats have enough calls for this service, prefer best-performing variant. */
  serviceSlug?: string | null;
};

export function getCtaVariant(
  seed: string,
  variants: readonly string[] | undefined,
  opts?: GetCtaVariantOptions
): string {
  if (!variants || variants.length === 0) {
    return CTA_VARIANT_FALLBACK;
  }
  const slug = String(opts?.serviceSlug ?? "").trim();
  if (slug) {
    const best = getBestCtaForService(slug, variants);
    if (best && variants.includes(best)) {
      return best;
    }
  }
  const index = Math.abs(hashCode(seed)) % variants.length;
  return variants[index] ?? CTA_VARIANT_FALLBACK;
}
