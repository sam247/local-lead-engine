/**
 * Lookup of neighbouring location ids per location. Keys and values are location ids (slug form).
 * Used for "Nearby areas we cover" and "Nearby service areas" link mesh on location pages.
 */
import { getCountyPeerLocationIds } from "./uk-location-hierarchy";

export const locationNeighbours: Record<string, string[]> = {
  london: ["camden", "islington", "westminster", "kensington", "fulham"],
  watford: ["st-albans", "hemel-hempstead", "bushey", "rickmansworth", "radlett"],
  manchester: ["salford", "trafford", "stockport", "oldham", "rochdale"],
};

const NEIGHBOUR_LOCATIONS_MAX = 8;

function mergeUniqueIds(preferred: string[], fallback: string[], max: number, exclude: string): string[] {
  const seen = new Set<string>([exclude]);
  const out: string[] = [];
  for (const id of preferred) {
    if (out.length >= max) break;
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  for (const id of fallback) {
    if (out.length >= max) break;
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}

/**
 * Returns up to 8 neighbour location ids for the current location.
 * Uses manual locationNeighbours when present, augmented with same-county peers from uk-location-hierarchy.
 * Falls back to county peers first, then arbitrary others.
 */
export function getNeighbourLocationIds(
  currentLocationId: string,
  allLocationIds: string[]
): string[] {
  const others = allLocationIds.filter((id) => id !== currentLocationId);
  const countyPeers = getCountyPeerLocationIds(currentLocationId, NEIGHBOUR_LOCATIONS_MAX, allLocationIds);
  const neighbours = locationNeighbours[currentLocationId];

  if (neighbours && neighbours.length > 0) {
    const fromMap = neighbours.filter((id) => allLocationIds.includes(id));
    return mergeUniqueIds([...fromMap, ...countyPeers], others, NEIGHBOUR_LOCATIONS_MAX, currentLocationId);
  }

  if (countyPeers.length >= 3) {
    return mergeUniqueIds(countyPeers, others, NEIGHBOUR_LOCATIONS_MAX, currentLocationId);
  }

  return others.slice(0, NEIGHBOUR_LOCATIONS_MAX);
}
