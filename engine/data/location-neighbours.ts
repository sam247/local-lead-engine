/**
 * Lookup of neighbouring location ids per location. Keys and values are location ids (slug form).
 * Used for "Nearby areas we cover" and "Nearby service areas" link mesh on location pages.
 */
import { getCountyPeerLocationIds } from "./uk-location-hierarchy";

export const locationNeighbours: Record<string, string[]> = {
  essex: ["chelmsford", "colchester", "basildon", "brentwood", "braintree", "southend"],
  london: ["camden", "islington", "westminster", "kensington", "fulham"],
  watford: ["st-albans", "hemel-hempstead", "bushey", "rickmansworth", "radlett"],
  manchester: ["salford", "trafford", "stockport", "oldham", "rochdale"],
  chislehurst: ["sidcup", "bromley", "petts-wood", "bickley", "new-eltham", "mottingham"],
  sidcup: ["new-eltham", "mottingham", "chislehurst", "bexley", "dartford", "bromley"],
  bickley: ["petts-wood", "bromley", "chislehurst", "beckenham", "west-wickham", "orpington"],
  mottingham: ["new-eltham", "sidcup", "chislehurst", "blackheath", "greenwich", "bromley"],
  "new-eltham": ["mottingham", "sidcup", "chislehurst", "blackheath", "bexley", "greenwich"],
  "petts-wood": ["bickley", "chislehurst", "bromley", "orpington", "beckenham", "west-wickham"],
  blackheath: ["greenwich", "mottingham", "new-eltham", "beckenham", "bromley", "lewisham"],
  "west-wickham": ["beckenham", "bromley", "petts-wood", "bickley", "orpington", "sidcup"],
  swanley: ["dartford", "orpington", "bexley", "bexleyheath", "sevenoaks"],
  bexleyheath: ["bexley", "sidcup", "erith", "dartford", "bromley"],
  erith: ["bexleyheath", "dartford", "gravesend", "bexley"],
  wilmington: ["dartford", "longfield", "chislehurst", "mottingham"],
  greenhithe: ["dartford", "gravesend", "bexley", "erith"],
  longfield: ["west-malling", "dartford", "wilmington"],
  "west-malling": ["maidstone", "kings-hill", "sevenoaks", "tonbridge"],
  "kings-hill": ["west-malling", "maidstone", "tonbridge"],
  faversham: ["whitstable", "canterbury", "ashford"],
  whitstable: ["canterbury", "faversham"],
  "haywards-heath": ["burgess-hill", "crawley", "brighton"],
  "burgess-hill": ["haywards-heath", "worthing", "crawley"],
  "east-grinstead": ["crawley", "reigate", "horsham"],
  uckfield: ["crowborough", "lewes", "brighton"],
  crowborough: ["tunbridge-wells", "uckfield", "brighton"],
  lewes: ["brighton", "eastbourne", "uckfield"],
  borehamwood: ["st-albans", "watford", "hitchin", "hemel-hempstead"],
  berkhamsted: ["hemel-hempstead", "tring", "chesham"],
  tring: ["berkhamsted", "aylesbury", "dunstable", "hemel-hempstead"],
  dunstable: ["luton", "leighton-buzzard", "tring"],
  biggleswade: ["sandy", "bedford", "st-neots"],
  "leighton-buzzard": ["milton-keynes", "dunstable", "aylesbury"],
  ampthill: ["bedford", "flitwick", "luton"],
  flitwick: ["ampthill", "bedford", "dunstable"],
  sandy: ["biggleswade", "bedford"],
  beaconsfield: ["high-wycombe", "gerrards-cross", "amersham"],
  "gerrards-cross": ["beaconsfield", "amersham"],
  marlow: ["high-wycombe", "maidenhead", "cookham"],
  "princes-risborough": ["aylesbury", "high-wycombe"],
  "bourne-end": ["marlow", "high-wycombe", "maidenhead"],
  cookham: ["maidenhead", "marlow", "high-wycombe"],
  chesham: ["amersham", "berkhamsted", "high-wycombe"],
  amersham: ["chesham", "beaconsfield", "high-wycombe"],
  wendover: ["aylesbury", "high-wycombe"],
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
