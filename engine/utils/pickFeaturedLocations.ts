import { KEY_SERVICE_DETAIL_LOCATION_IDS } from "../data/key-location-ids";
import { getVariantIndex } from "../lib/contentVariants";
import type { Location } from "../types";

/** Deterministic subset of key locations for service detail and commercial guide “areas we cover” blocks. */
export function pickServiceDetailFeaturedLocations(
  all: Location[],
  serviceSlug: string,
  verticalId: string
): Location[] {
  const pool = all
    .filter((l) => KEY_SERVICE_DETAIL_LOCATION_IDS.includes(l.id))
    .sort((a, b) => a.id.localeCompare(b.id));
  if (pool.length === 0) return [];
  const seed = `${serviceSlug}:${verticalId}:service-detail-locs`;
  const count = 3 + getVariantIndex(seed, 3);
  const maxStart = Math.max(0, pool.length - count);
  const start = maxStart === 0 ? 0 : getVariantIndex(`${seed}:start`, maxStart + 1);
  return pool.slice(start, start + count);
}
