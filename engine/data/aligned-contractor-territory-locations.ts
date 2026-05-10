/**
 * Contractor-aligned territory appendix (Kent/Sussex fringe, Hertfordshire, Bedfordshire,
 * Buckinghamshire, Berkshire commuter nodes). Consumed ONLY via explicit merges in
 * Groundworks, Surveys, and Drains lib/data.ts — NOT part of default `locations`.
 */
import type { Location } from "../types";

export const alignedContractorTerritoryLocations: Location[] = [
  { id: "swanley", name: "Swanley", area: "Kent", lat: 51.214, lng: 0.175, nearbyTowns: ["Dartford", "Orpington", "Bexley", "Eynsford"], propertyTypes: "1930s semis, post-war estates, modern infill housing and commuter stock" },
  { id: "bexleyheath", name: "Bexleyheath", area: "Kent", lat: 51.459, lng: 0.138, nearbyTowns: ["Bexley", "Welling", "Erith", "Sidcup"], propertyTypes: "1930s semis, town-centre terraces, suburban retail adjacency and redevelopment plots" },
  { id: "erith", name: "Erith", area: "Kent", lat: 51.48, lng: 0.175, nearbyTowns: ["Dartford", "Bexleyheath", "Belvedere", "Slade Green"], propertyTypes: "Riverside industry, terraces, estates and redevelopment-led mixes" },
  { id: "wilmington", name: "Wilmington", area: "Kent", lat: 51.295, lng: 0.198, nearbyTowns: ["Dartford", "Longfield", "Bean", "Ash"], propertyTypes: "Village-style housing, large-plot residences and strategic location near arterial routes" },
  { id: "greenhithe", name: "Greenhithe", area: "Kent", lat: 51.45, lng: 0.285, nearbyTowns: ["Bluewater", "Swanscombe", "Stone", "Dartford"], propertyTypes: "Waterside and retail-adjacent stock, marina housing and modern commuter developments" },
  { id: "longfield", name: "Longfield", area: "Kent", lat: 51.396, lng: 0.301, nearbyTowns: ["New Barn", "Hartley", "Meopham", "Ash"], propertyTypes: "Village semis and detached houses, farmland-edge plots and post-war ribbons" },
  { id: "west-malling", name: "West Malling", area: "Kent", lat: 51.292, lng: 0.419, nearbyTowns: ["Kings Hill", "Maidstone", "East Malling", "Offham"], propertyTypes: "Market town terraces, Georgian stock, cottages and commuter executive homes" },
  { id: "kings-hill", name: "Kings Hill", area: "Kent", lat: 51.274, lng: 0.589, nearbyTowns: ["West Malling", "Tonbridge", "Maidstone", "Snodland"], propertyTypes: "Planned-business-park fringe housing, large detached stock and SME commercial parks" },
  { id: "faversham", name: "Faversham", area: "Kent", lat: 51.313, lng: 0.889, nearbyTowns: ["Whitstable", "Canterbury", "Sittingbourne", "Selling"], propertyTypes: "Historic market town terraces, docks-adjacent industry and creek-side dwellings" },
  { id: "whitstable", name: "Whitstable", area: "Kent", lat: 51.361, lng: 1.025, nearbyTowns: ["Herne Bay", "Canterbury", "Faversham", "Tankerton"], propertyTypes: "Victorian terraces, beach huts-adjacent stock, fisherman cottages and second homes" },
  { id: "haywards-heath", name: "Haywards Heath", area: "West Sussex", lat: 50.997, lng: -0.103, nearbyTowns: ["Burgess Hill", "Lindfield", "Cuckfield", "Wivelsfield"], propertyTypes: "Executive semis, 1930s stock, commuter belt housing and logistics-adjacent land" },
  { id: "burgess-hill", name: "Burgess Hill", area: "West Sussex", lat: 50.954, lng: -0.132, nearbyTowns: ["Haywards Heath", "Hassocks", "Hurstpierpoint", "Wivelsfield"], propertyTypes: "New-town style housing, 1930s semis and light-industrial fringe stock" },
  { id: "east-grinstead", name: "East Grinstead", area: "West Sussex", lat: 51.128, lng: -0.007, nearbyTowns: ["Crawley", "Forest Row", "Felbridge", "Dormansland"], propertyTypes: "Period town centre stock, high-value detached homes and woodland-edge plots" },
  { id: "uckfield", name: "Uckfield", area: "East Sussex", lat: 50.964, lng: 0.088, nearbyTowns: ["Crowborough", "Heathfield", "Lewes", "Framfield"], propertyTypes: "Market town terraces, commuter semis and village-adjacent new-build estates" },
  { id: "crowborough", name: "Crowborough", area: "East Sussex", lat: 51.06, lng: 0.162, nearbyTowns: ["Tunbridge Wells", "Uckfield", "Forest Row", "Rotherfield"], propertyTypes: "Elevated commuter housing, large detached plots and wooded residential stock" },
  { id: "lewes", name: "Lewes", area: "East Sussex", lat: 50.874, lng: 0.011, nearbyTowns: ["Brighton", "Uckfield", "Peacehaven", "Ditchling"], propertyTypes: "Georgian and Victorian townhouses, period cottages and high-value hillside views" },
  { id: "borehamwood", name: "Borehamwood", area: "Hertfordshire", lat: 51.658, lng: -0.272, nearbyTowns: ["Elstree", "Radlett", "Potters Bar", "Mill Hill"], propertyTypes: "1930s semis, studios-adjacent stock, post-war estates and infill redevelopment" },
  { id: "berkhamsted", name: "Berkhamsted", area: "Hertfordshire", lat: 51.763, lng: -0.562, nearbyTowns: ["Tring", "Hemel Hempstead", "Chesham", "Northchurch"], propertyTypes: "Georgian high street terraces, commuter detached homes and Chilterns-adjacent stock" },
  { id: "tring", name: "Tring", area: "Hertfordshire", lat: 51.796, lng: -0.662, nearbyTowns: ["Berkhamsted", "Aylesbury", "Wigginton", "Aston Clinton"], propertyTypes: "Georgian townhouses, market-town cottages and commuter village ribbons" },
  { id: "dunstable", name: "Dunstable", area: "Bedfordshire", lat: 51.886, lng: -0.519, nearbyTowns: ["Luton", "Leighton Buzzard", "Houghton Regis", "Toddington"], propertyTypes: "Post-war estates, Chilterns-edge semis and distribution-adjacent commercial land" },
  { id: "biggleswade", name: "Biggleswade", area: "Bedfordshire", lat: 52.088, lng: -0.262, nearbyTowns: ["Sandy", "St Neots", "Shefford", "Langford"], propertyTypes: "Rail-adjacent growth, terraces, new estates and logistics corridor plots" },
  { id: "leighton-buzzard", name: "Leighton Buzzard", area: "Bedfordshire", lat: 51.919, lng: -0.661, nearbyTowns: ["Milton Keynes", "Tring", "Dunstable", "Winslow"], propertyTypes: "Grand Union-adjacent stock, town-centre terraces and commuter executive housing" },
  { id: "ampthill", name: "Ampthill", area: "Bedfordshire", lat: 52.033, lng: -0.496, nearbyTowns: ["Flitwick", "Bedford", "Millbrook", "Maulden"], propertyTypes: "Georgian town centre, park-adjacent stock and commuter village terraces" },
  { id: "flitwick", name: "Flitwick", area: "Bedfordshire", lat: 52.009, lng: -0.497, nearbyTowns: ["Ampthill", "Bedford", "Harlington", "Millbrook"], propertyTypes: "Rail-village commuter homes, estates and farmland-edge redevelopment" },
  { id: "sandy", name: "Sandy", area: "Bedfordshire", lat: 52.128, lng: -0.291, nearbyTowns: ["Biggleswade", "Bedford", "Potton", "Blunham"], propertyTypes: "Riverside commuter town stock, terraces and executive new-build estates" },
  { id: "beaconsfield", name: "Beaconsfield", area: "Buckinghamshire", lat: 51.611, lng: -0.644, nearbyTowns: ["High Wycombe", "Gerrards Cross", "Seer Green", "Knotty Green"], propertyTypes: "High-value commuter detached homes, Georgian old town pockets and wooded plots" },
  { id: "gerrards-cross", name: "Gerrards Cross", area: "Buckinghamshire", lat: 51.582, lng: -0.555, nearbyTowns: ["Beaconsfield", "Denham", "Chalfont St Peter", "Stoke Poges"], propertyTypes: "Executive housing, commuter semis and Chilterns-adjacent large gardens" },
  { id: "marlow", name: "Marlow", area: "Buckinghamshire", lat: 51.571, lng: -0.774, nearbyTowns: ["High Wycombe", "Maidenhead", "Cookham", "Bourne End"], propertyTypes: "Georgian Thames-side terraces, affluent detached riverside homes and commuter stock" },
  { id: "princes-risborough", name: "Princes Risborough", area: "Buckinghamshire", lat: 51.725, lng: -0.841, nearbyTowns: ["Aylesbury", "High Wycombe", "Monks Risborough", "Longwick"], propertyTypes: "Chiltern ridge housing, terraces and commuter village redevelopment" },
  { id: "bourne-end", name: "Bourne End", area: "Buckinghamshire", lat: 51.575, lng: -0.712, nearbyTowns: ["Wooburn Green", "Marlow", "Cookham", "High Wycombe"], propertyTypes: "Riverside homes, commuter semis and light-industrial adjacency plots" },
  { id: "cookham", name: "Cookham", area: "Berkshire", lat: 51.563, lng: -0.72, nearbyTowns: ["Maidenhead", "Marlow", "Bourne End", "Furze Platt"], propertyTypes: "Country-village commuter homes, woodland-adjacent stock and Thames commuter belts" },
  { id: "chesham", name: "Chesham", area: "Buckinghamshire", lat: 51.705, lng: -0.611, nearbyTowns: ["Amersham", "Berkhamsted", "Ley Hill", "Whelpley Hill"], propertyTypes: "Chilterns valley terraces, commuter semis and high-value hillside homes" },
  { id: "amersham", name: "Amersham", area: "Buckinghamshire", lat: 51.668, lng: -0.608, nearbyTowns: ["Chesham", "Little Chalfont", "Chalfont St Giles", "Beaconsfield"], propertyTypes: "Historic old town terraces, commuter housing and Underground-adjacent stock" },
  { id: "wendover", name: "Wendover", area: "Buckinghamshire", lat: 51.761, lng: -0.747, nearbyTowns: ["Aylesbury", "Halton", "Weston Turville", "Stoke Mandeville"], propertyTypes: "Chilterns village commuter homes, terraces and hillside executive stock" },
];

export const alignedContractorTerritoryLocationIds = new Set(
  alignedContractorTerritoryLocations.map((loc) => loc.id)
);
