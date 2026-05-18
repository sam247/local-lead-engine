/**
 * Kent towns surfaced on the primary near-me hub and /service-areas (uk-location-hierarchy).
 * Used to guarantee groundworks-contractors L4 pages are in generateStaticParams.
 */
export const KENT_NEAR_ME_LOCATION_IDS = [
  "ashford",
  "bickley",
  "bexleyheath",
  "canterbury",
  "chislehurst",
  "dartford",
  "dover",
  "erith",
  "faversham",
  "folkestone",
  "gravesend",
  "greenhithe",
  "kings-hill",
  "longfield",
  "maidstone",
  "mottingham",
  "new-eltham",
  "rochester",
  "sevenoaks",
  "sidcup",
  "swanley",
  "tonbridge",
  "tunbridge-wells",
  "west-malling",
  "whitstable",
  "wilmington",
] as const;

export const PRIMARY_NEAR_ME_SERVICE_SLUG = "groundworks-contractors" as const;
