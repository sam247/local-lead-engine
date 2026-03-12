/**
 * Lookup of neighbouring location ids per location. Keys and values are location ids (slug form).
 * Used for "Nearby areas we cover" and "Nearby service areas" link mesh on location pages.
 */
export const locationNeighbours: Record<string, string[]> = {
  london: ["camden", "islington", "westminster", "kensington", "fulham"],
  watford: ["st-albans", "hemel-hempstead", "bushey", "rickmansworth", "radlett"],
  manchester: ["salford", "trafford", "stockport", "oldham", "rochdale"],
};

const NEIGHBOUR_LOCATIONS_MAX = 8;

/**
 * Returns up to 8 neighbour location ids for the current location.
 * Uses locationNeighbours when available; otherwise returns the first 8 from allLocationIds excluding current.
 */
export function getNeighbourLocationIds(
  currentLocationId: string,
  allLocationIds: string[]
): string[] {
  const neighbours = locationNeighbours[currentLocationId];
  const others = allLocationIds.filter((id) => id !== currentLocationId);
  if (neighbours && neighbours.length > 0) {
    const fromMap = neighbours.filter((id) => allLocationIds.includes(id)).slice(0, NEIGHBOUR_LOCATIONS_MAX);
    if (fromMap.length >= NEIGHBOUR_LOCATIONS_MAX) return fromMap;
    const remaining = others.filter((id) => !fromMap.includes(id)).slice(0, NEIGHBOUR_LOCATIONS_MAX - fromMap.length);
    return [...fromMap, ...remaining];
  }
  return others.slice(0, NEIGHBOUR_LOCATIONS_MAX);
}
