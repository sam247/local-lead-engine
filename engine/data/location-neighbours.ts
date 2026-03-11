/**
 * Lookup of neighbouring location ids per location. Keys and values are location ids (slug form).
 * Used for "Nearby areas we cover" and "Nearby service areas" link mesh on location pages.
 */
export const locationNeighbours: Record<string, string[]> = {
  london: ["camden", "islington", "westminster", "kensington", "fulham"],
  watford: ["st-albans", "hemel-hempstead", "bushey", "rickmansworth", "radlett"],
  manchester: ["salford", "trafford", "stockport", "oldham", "rochdale"],
};

/**
 * Returns up to 5 neighbour location ids for the current location.
 * Uses locationNeighbours when available; otherwise returns the first 5 from allLocationIds excluding current.
 */
export function getNeighbourLocationIds(
  currentLocationId: string,
  allLocationIds: string[]
): string[] {
  const neighbours = locationNeighbours[currentLocationId];
  const others = allLocationIds.filter((id) => id !== currentLocationId);
  if (neighbours && neighbours.length > 0) {
    const fromMap = neighbours.filter((id) => allLocationIds.includes(id)).slice(0, 5);
    if (fromMap.length >= 5) return fromMap;
    const remaining = others.filter((id) => !fromMap.includes(id)).slice(0, 5 - fromMap.length);
    return [...fromMap, ...remaining];
  }
  return others.slice(0, 5);
}
