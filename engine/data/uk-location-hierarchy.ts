/**
 * Curated UK region/county grouping for Location.id values only (commercial coverage, not exhaustive).
 * Used for copy, peer links, footer caps, and service-areas hubs. URLs remain /{serviceSlug}/{locationSlug}.
 */

export type UkLocationGrouping = {
  regionName: string;
  countyName: string;
  countySlug: string;
  isLondonBorough: boolean;
};

type CountyDef = {
  countyName: string;
  countySlug: string;
  locationIds: readonly string[];
};

type RegionDef = {
  regionName: string;
  counties: readonly CountyDef[];
};

const UK_REGIONS: readonly RegionDef[] = [
  {
    regionName: "London",
    counties: [
      {
        countyName: "Greater London",
        countySlug: "greater-london",
        locationIds: [
          "barnes",
          "barnet",
          "brentford",
          "bromley",
          "chelsea",
          "chiswick",
          "croydon",
          "ealing",
          "enfield",
          "fulham",
          "greenwich",
          "hammersmith",
          "harrow",
          "hounslow",
          "ilford",
          "isleworth",
          "kensington",
          "kingston",
          "lewisham",
          "london",
          "putney",
          "richmond",
          "romford",
          "surbiton",
          "sutton",
          "teddington",
          "twickenham",
          "uxbridge",
          "wandsworth",
          "wimbledon",
        ] as const,
      },
    ],
  },
  {
    regionName: "South East",
    counties: [
      { countyName: "Kent", countySlug: "kent", locationIds: ["ashford", "canterbury", "dartford", "dover", "folkestone", "gravesend", "maidstone", "rochester", "sevenoaks", "tonbridge", "tunbridge-wells"] },
      { countyName: "Surrey", countySlug: "surrey", locationIds: ["epsom", "esher", "guildford", "leatherhead", "reigate", "staines", "weybridge", "woking"] },
      { countyName: "East Sussex", countySlug: "east-sussex", locationIds: ["brighton", "eastbourne", "hastings"] },
      { countyName: "West Sussex", countySlug: "west-sussex", locationIds: ["chichester", "crawley", "horsham", "worthing"] },
      { countyName: "Berkshire", countySlug: "berkshire", locationIds: ["maidenhead", "reading", "slough"] },
      { countyName: "Oxfordshire", countySlug: "oxfordshire", locationIds: ["oxford"] },
      {
        countyName: "Hertfordshire",
        countySlug: "hertfordshire",
        locationIds: ["bishops-stortford", "hemel-hempstead", "hertford", "st-albans", "stevenage", "watford"],
      },
    ],
  },
  {
    regionName: "East of England",
    counties: [
      {
        countyName: "Essex",
        countySlug: "essex",
        locationIds: ["basildon", "braintree", "brentwood", "chelmsford", "colchester", "essex", "southend"],
      },
      { countyName: "Cambridgeshire", countySlug: "cambridgeshire", locationIds: ["cambridge", "peterborough"] },
      { countyName: "Bedfordshire", countySlug: "bedfordshire", locationIds: ["bedford", "luton"] },
      { countyName: "Norfolk", countySlug: "norfolk", locationIds: ["norwich"] },
      { countyName: "Suffolk", countySlug: "suffolk", locationIds: ["ipswich"] },
    ],
  },
  {
    regionName: "South West",
    counties: [
      { countyName: "Bristol", countySlug: "bristol", locationIds: ["bristol"] },
      { countyName: "Somerset", countySlug: "somerset", locationIds: ["bath", "taunton"] },
      { countyName: "Wiltshire", countySlug: "wiltshire", locationIds: ["salisbury", "swindon"] },
      { countyName: "Dorset", countySlug: "dorset", locationIds: ["bournemouth"] },
      { countyName: "Devon", countySlug: "devon", locationIds: ["exeter", "plymouth"] },
      { countyName: "Gloucestershire", countySlug: "gloucestershire", locationIds: ["gloucester"] },
      { countyName: "Hampshire", countySlug: "hampshire", locationIds: ["basingstoke", "portsmouth", "southampton", "winchester"] },
      { countyName: "Worcestershire", countySlug: "worcestershire", locationIds: ["worcester"] },
    ],
  },
  {
    regionName: "Midlands",
    counties: [
      { countyName: "West Midlands", countySlug: "west-midlands", locationIds: ["birmingham", "coventry"] },
      { countyName: "Derbyshire", countySlug: "derbyshire", locationIds: ["derby"] },
      { countyName: "Leicestershire", countySlug: "leicestershire", locationIds: ["leicester"] },
      { countyName: "Northamptonshire", countySlug: "northamptonshire", locationIds: ["northampton"] },
      { countyName: "Nottinghamshire", countySlug: "nottinghamshire", locationIds: ["nottingham"] },
      {
        countyName: "Buckinghamshire",
        countySlug: "buckinghamshire",
        locationIds: ["aylesbury", "high-wycombe", "milton-keynes"],
      },
    ],
  },
  {
    regionName: "North West",
    counties: [
      { countyName: "Greater Manchester", countySlug: "greater-manchester", locationIds: ["manchester"] },
      { countyName: "Merseyside", countySlug: "merseyside", locationIds: ["liverpool"] },
    ],
  },
  {
    regionName: "Yorkshire and the Humber",
    counties: [
      { countyName: "West Yorkshire", countySlug: "west-yorkshire", locationIds: ["leeds"] },
      { countyName: "South Yorkshire", countySlug: "south-yorkshire", locationIds: ["sheffield"] },
    ],
  },
  {
    regionName: "North East",
    counties: [{ countyName: "Tyne and Wear", countySlug: "tyne-and-wear", locationIds: ["newcastle"] }],
  },
  {
    regionName: "Scotland",
    counties: [
      { countyName: "City of Edinburgh", countySlug: "edinburgh-city", locationIds: ["edinburgh"] },
      { countyName: "Glasgow City", countySlug: "glasgow-city", locationIds: ["glasgow"] },
      { countyName: "Aberdeenshire", countySlug: "aberdeenshire", locationIds: ["aberdeen"] },
    ],
  },
  {
    regionName: "Wales",
    counties: [
      { countyName: "South Glamorgan", countySlug: "south-glamorgan", locationIds: ["cardiff"] },
      { countyName: "West Glamorgan", countySlug: "west-glamorgan", locationIds: ["swansea"] },
    ],
  },
] as const;

function buildLocationMeta(): Record<string, UkLocationGrouping> {
  const meta: Record<string, UkLocationGrouping> = {};
  for (const region of UK_REGIONS) {
    const isLondon = region.regionName === "London";
    for (const county of region.counties) {
      for (const id of county.locationIds) {
        meta[id] = {
          regionName: region.regionName,
          countyName: county.countyName,
          countySlug: county.countySlug,
          isLondonBorough: isLondon,
        };
      }
    }
  }
  return meta;
}

function buildCountyToIds(): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  for (const region of UK_REGIONS) {
    for (const county of region.counties) {
      map[county.countySlug] = [...county.locationIds].sort((a, b) => a.localeCompare(b));
    }
  }
  return map;
}

const LOCATION_META = buildLocationMeta();
const COUNTY_TO_IDS = buildCountyToIds();

/** Priority order for footer: London and major commercial centres first; capped to 24 when consumed. */
export const FOOTER_LOCATION_LINK_PRIORITY: readonly string[] = [
  "london",
  "richmond",
  "kingston",
  "croydon",
  "bromley",
  "wandsworth",
  "ealing",
  "hammersmith",
  "reading",
  "guildford",
  "brighton",
  "oxford",
  "cambridge",
  "birmingham",
  "manchester",
  "leeds",
  "bristol",
  "edinburgh",
  "glasgow",
  "cardiff",
  "newcastle",
  "liverpool",
  "nottingham",
  "sheffield",
  "southampton",
  "milton-keynes",
  "watford",
  "dartford",
  "maidstone",
  "slough",
  "high-wycombe",
  "coventry",
  "leicester",
  "exeter",
  "northampton",
  "bournemouth",
  "norwich",
  "chelmsford",
  "colchester",
  "basildon",
  "swansea",
  "aberdeen",
] as const;

export const FOOTER_LOCATION_LINK_MAX = 24;

/** Max location links shown per county on service-areas hub (avoid flat walls). */
export const SERVICE_AREAS_COUNTY_LINK_CAP = 8;

export function getUkGroupingForLocationId(id: string): UkLocationGrouping | null {
  return LOCATION_META[id] ?? null;
}

export function getCountyPeerLocationIds(
  locationId: string,
  max: number,
  validIds: readonly string[]
): string[] {
  const grouping = LOCATION_META[locationId];
  if (!grouping || max <= 0) return [];
  const set = new Set(validIds);
  const peers = (COUNTY_TO_IDS[grouping.countySlug] ?? [])
    .filter((id) => id !== locationId && set.has(id))
    .sort((a, b) => a.localeCompare(b));
  return peers.slice(0, max);
}

export type FooterAreaGroup = {
  regionLabel: string;
  links: { id: string; name: string }[];
};

export function getFooterAreaGroups(
  idToName: Record<string, string>,
  maxLinks: number = FOOTER_LOCATION_LINK_MAX
): FooterAreaGroup[] {
  const picked: { id: string; name: string; region: string }[] = [];
  for (const id of FOOTER_LOCATION_LINK_PRIORITY) {
    if (picked.length >= maxLinks) break;
    const name = idToName[id];
    if (!name) continue;
    const g = LOCATION_META[id];
    if (!g) continue;
    picked.push({ id, name, region: g.regionName });
  }

  const byRegion = new Map<string, { id: string; name: string }[]>();
  for (const row of picked) {
    const list = byRegion.get(row.region) ?? [];
    list.push({ id: row.id, name: row.name });
    byRegion.set(row.region, list);
  }

  const regionOrder = [
    "London",
    "South East",
    "Midlands",
    "North West",
    "Yorkshire and the Humber",
    "North East",
    "South West",
    "East of England",
    "Scotland",
    "Wales",
  ];

  return regionOrder
    .filter((r) => byRegion.has(r))
    .map((regionLabel) => ({
      regionLabel,
      links: byRegion.get(regionLabel) ?? [],
    }));
}

export type ServiceAreasHubCounty = {
  countyName: string;
  countySlug: string;
  locationIds: string[];
};

export type ServiceAreasHubRegion = {
  regionName: string;
  counties: ServiceAreasHubCounty[];
};

export function getServiceAreasHubSections(): ServiceAreasHubRegion[] {
  return UK_REGIONS.map((region) => ({
    regionName: region.regionName,
    counties: region.counties.map((c) => ({
      countyName: c.countyName,
      countySlug: c.countySlug,
      locationIds: [...c.locationIds].slice(0, SERVICE_AREAS_COUNTY_LINK_CAP),
    })),
  }));
}
