#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const verticalConfigs = {
  drains: {
    csvPath: "docs/mainlinegroundworks.co.uk-Performance-on-Search-2026-04-03 - drains.csv",
    domain: "mainlinedrains.co.uk",
    validServices: [
      "drain-collapse-repair",
      "drain-relining",
      "cctv-drain-surveys",
      "drain-excavation",
      "emergency-drainage",
      "blocked-drains",
      "drain-jetting",
      "drain-root-removal",
      "drain-unblocking",
      "drain-pipe-replacement",
      "commercial-drainage",
    ],
    preferredTargets: [
      "drain-excavation/ealing",
      "drain-jetting/dartford",
      "cctv-drain-surveys/ilford",
    ],
    relatedServiceDonors: {
      "drain-excavation": ["drain-collapse-repair", "drain-pipe-replacement"],
      "drain-jetting": ["blocked-drains", "drain-unblocking"],
      "cctv-drain-surveys": ["drain-collapse-repair", "drain-relining"],
    },
    guideDonorStrategy: {
      "drain-excavation": "Guide pages related to drain excavation and repair-method content",
      "drain-jetting": "Guide pages related to blockages, jetting, and maintenance content",
      "cctv-drain-surveys": "Guide pages related to inspection, mapping, and survey content",
    },
    slugMappings: {},
  },
  surveys: {
    csvPath: "docs/mainlinegroundworks.co.uk-Performance-on-Search-2026-04-03 - surveys.csv",
    domain: "mainlinesurveys.co.uk",
    validServices: [
      "topographical-survey",
      "measured-building-survey",
      "utility-survey",
      "utility-mapping-survey",
      "boundary-survey",
      "laser-scanning-survey",
      "drone-survey",
      "drone-roof-inspection",
      "drone-building-inspection",
      "drone-topographical-survey",
      "drone-construction-survey",
    ],
    preferredTargets: [
      "utility-survey/barnet",
      "measured-building-survey/barnet",
      "drone-building-inspection/wandsworth",
    ],
    relatedServiceDonors: {
      "utility-survey": ["utility-mapping-survey", "topographical-survey"],
      "measured-building-survey": ["laser-scanning-survey", "topographical-survey"],
      "drone-building-inspection": ["drone-roof-inspection", "measured-building-survey"],
    },
    guideDonorStrategy: {
      "utility-survey": "Guide pages related to utility mapping, underground services, and dig planning",
      "measured-building-survey": "Guide pages related to measured surveys, building plans, and design prep",
      "drone-building-inspection": "Guide pages related to drone inspection, roof access, and condition reporting",
    },
    slugMappings: {},
  },
  access: {
    csvPath: "docs/mainlinegroundworks.co.uk-Performance-on-Search-2026-04-03 - access.csv",
    domain: "mainlineaccess.co.uk",
    validServices: [
      "access-control-systems",
      "commercial-cctv-installation",
      "ip-camera-systems",
      "perimeter-security-systems",
      "security-system-integration",
    ],
    preferredTargets: [
      "commercial-cctv-installation/teddington",
      "access-control-systems/isleworth",
      "security-system-integration/stevenage",
    ],
    relatedServiceDonors: {
      "commercial-cctv-installation": ["ip-camera-systems", "access-control-systems"],
      "access-control-systems": ["commercial-cctv-installation", "security-system-integration"],
      "security-system-integration": ["access-control-systems", "commercial-cctv-installation"],
    },
    guideDonorStrategy: {
      "commercial-cctv-installation": "Guide pages related to CCTV planning, coverage, and commercial systems",
      "access-control-systems": "Guide pages related to entry control, doors, and access management",
      "security-system-integration": "Guide pages related to integrated security, cabling, and monitoring workflows",
    },
    slugMappings: {
      "commercial-cctv-systems": "commercial-cctv-installation",
      "cctv-installation": "commercial-cctv-installation",
      "gate-access-control": "access-control-systems",
      "data-cabling-installation": "security-system-integration",
      "cat6-network-cabling": "security-system-integration",
    },
  },
  groundworks: {
    csvPath: "docs/mainlinegroundworks.co.uk-Performance-on-Search-2026-04-03 - groundworks.csv",
    domain: "mainlinegroundworks.co.uk",
    validServices: [
      "groundworks-contractors",
      "piling-contractors",
      "mini-piling-contractors",
      "excavation-contractors",
      "site-clearance-contractors",
      "foundation-contractors",
      "concrete-foundations",
      "enabling-works-contractors",
      "underpinning",
      "cfa-piling",
      "foundation-repair",
      "concrete-repair",
    ],
    preferredTargets: [
      "cfa-piling/derby",
      "foundation-repair/brentwood",
      "enabling-works-contractors/ashford",
    ],
    relatedServiceDonors: {
      "cfa-piling": ["piling-contractors", "mini-piling-contractors"],
      "foundation-repair": ["underpinning", "foundation-contractors"],
      "enabling-works-contractors": ["site-clearance-contractors", "groundworks-contractors"],
    },
    guideDonorStrategy: {
      "cfa-piling": "Guide pages related to piling, ground support, and foundation method choice",
      "foundation-repair": "Guide pages related to movement, structural repair, and foundation defects",
      "enabling-works-contractors": "Guide pages related to site preparation, enabling works, and early packages",
    },
    slugMappings: {
      "foundation-underpinning": "underpinning",
      "site-clearance-muck-away": "site-clearance-contractors",
      "bulk-excavation-services": "excavation-contractors",
      "groundworks-and-enabling-works": "groundworks-contractors",
      "piling-foundations": "piling-contractors",
      "ground-investigation": "groundworks-contractors",
      "soil-testing-services": "groundworks-contractors",
    },
  },
};

function parseLocationRecords() {
  const source = fs.readFileSync(path.join(repoRoot, "engine/data/locations.ts"), "utf8");
  const records = [...source.matchAll(/id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*area:\s*"([^"]+)"/g)].map(
    ([, id, name, area]) => ({ id, name, area })
  );
  const byId = Object.fromEntries(records.map((record) => [record.id, record]));
  return { records, byId };
}

function parseCsv(csvText) {
  return csvText
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line) => {
      const [page = "", query = ""] = line.split(/,(.+)/);
      return {
        page: page.trim(),
        query: query.trim(),
      };
    })
    .filter((row) => row.page);
}

function extractPageParts(url, expectedDomain) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== expectedDomain) return null;
    const segments = parsed.pathname.split("/").filter(Boolean);
    if (segments.length !== 2) return null;
    return {
      rawServiceSlug: segments[0],
      locationSlug: segments[1],
    };
  } catch {
    return null;
  }
}

function buildAreaLookup(records) {
  const byArea = new Map();
  for (const record of records) {
    const existing = byArea.get(record.area) ?? [];
    existing.push(record.id);
    byArea.set(record.area, existing);
  }
  return byArea;
}

function pickNearbyLocationDonors(locationSlug, locationById, areaLookup) {
  const location = locationById[locationSlug];
  if (!location) return [];
  const sameArea = (areaLookup.get(location.area) ?? []).filter((id) => id !== locationSlug);
  if (sameArea.length >= 2) return sameArea.slice(0, 2);
  const fallback = Object.keys(locationById).filter((id) => id !== locationSlug && !sameArea.includes(id));
  return [...sameArea, ...fallback].slice(0, 2);
}

function aggregateCandidates(verticalName, config, locationById) {
  const csvText = fs.readFileSync(path.join(repoRoot, config.csvPath), "utf8");
  const rows = parseCsv(csvText);
  const aggregates = new Map();

  for (const row of rows) {
    const parts = extractPageParts(row.page, config.domain);
    if (!parts) continue;
    if (!locationById[parts.locationSlug]) continue;

    const isExactService = config.validServices.includes(parts.rawServiceSlug);
    const mappedServiceSlug = config.slugMappings[parts.rawServiceSlug];
    const canonicalServiceSlug = isExactService ? parts.rawServiceSlug : mappedServiceSlug;
    if (!canonicalServiceSlug) continue;

    const key = `${canonicalServiceSlug}/${parts.locationSlug}`;
    const current = aggregates.get(key) ?? {
      vertical: verticalName,
      serviceSlug: canonicalServiceSlug,
      locationSlug: parts.locationSlug,
      rowCount: 0,
      clicks: null,
      impressions: null,
      ctr: null,
      currentPosition: null,
      exactSourceRows: 0,
      mappedSourceRows: 0,
      sourceQueries: [],
      sourceUrls: new Set(),
      sourceSlugs: new Set(),
    };

    current.rowCount += 1;
    if (isExactService) current.exactSourceRows += 1;
    if (!isExactService) current.mappedSourceRows += 1;
    if (row.query) current.sourceQueries.push(row.query);
    current.sourceUrls.add(row.page);
    current.sourceSlugs.add(parts.rawServiceSlug);
    aggregates.set(key, current);
  }

  return [...aggregates.values()];
}

function pickTargets(candidates, config) {
  const byKey = new Map(candidates.map((candidate) => [`${candidate.serviceSlug}/${candidate.locationSlug}`, candidate]));
  const selected = [];
  const selectedServices = new Set();

  for (const preferredKey of config.preferredTargets) {
    const candidate = byKey.get(preferredKey);
    if (!candidate) continue;
    selected.push(candidate);
    selectedServices.add(candidate.serviceSlug);
  }

  if (selected.length >= 3) return selected.slice(0, 3);

  const remaining = [...candidates].sort((a, b) => {
    if (b.rowCount !== a.rowCount) return b.rowCount - a.rowCount;
    if (b.exactSourceRows !== a.exactSourceRows) return b.exactSourceRows - a.exactSourceRows;
    if (a.serviceSlug !== b.serviceSlug) return a.serviceSlug.localeCompare(b.serviceSlug);
    return a.locationSlug.localeCompare(b.locationSlug);
  });

  for (const candidate of remaining) {
    const key = `${candidate.serviceSlug}/${candidate.locationSlug}`;
    if (selected.find((item) => `${item.serviceSlug}/${item.locationSlug}` === key)) continue;
    if (selectedServices.has(candidate.serviceSlug) && selected.length < 2) continue;
    selected.push(candidate);
    selectedServices.add(candidate.serviceSlug);
    if (selected.length === 3) break;
  }

  return selected.slice(0, 3);
}

function buildManifestEntry(candidate, config, locationById, areaLookup) {
  const location = locationById[candidate.locationSlug];
  const relatedServices = (config.relatedServiceDonors[candidate.serviceSlug] ?? []).slice(0, 2);
  const nearbyLocations = pickNearbyLocationDonors(candidate.locationSlug, locationById, areaLookup);
  return {
    vertical: candidate.vertical,
    serviceSlug: candidate.serviceSlug,
    locationSlug: candidate.locationSlug,
    currentPosition: candidate.currentPosition,
    clicks: candidate.clicks,
    impressions: candidate.impressions,
    ctr: candidate.ctr,
    sourceRowCount: candidate.rowCount,
    sourceMatchType: candidate.exactSourceRows > 0 && candidate.mappedSourceRows > 0
      ? "mixed"
      : candidate.exactSourceRows > 0
        ? "exact"
        : "mapped",
    sampleQueries: candidate.sourceQueries.slice(0, 3),
    donorAssignments: {
      relatedServicePages: relatedServices.map((serviceSlug) => `/${serviceSlug}/${candidate.locationSlug}`),
      nearbyLocationPages: nearbyLocations.map((locationSlug) => `/${candidate.serviceSlug}/${locationSlug}`),
      guideDonorStrategy: config.guideDonorStrategy[candidate.serviceSlug] ?? "Guide pages related to this service",
    },
    locationArea: location?.area ?? null,
  };
}

const { records, byId: locationById } = parseLocationRecords();
const areaLookup = buildAreaLookup(records);

const manifest = Object.entries(verticalConfigs).flatMap(([verticalName, config]) => {
  const candidates = aggregateCandidates(verticalName, config, locationById);
  const selectedTargets = pickTargets(candidates, config);
  return selectedTargets.map((candidate) => buildManifestEntry(candidate, config, locationById, areaLookup));
});

const outputDir = path.join(repoRoot, "seo");
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(
  path.join(outputDir, "striking-distance-targets.json"),
  `${JSON.stringify(manifest, null, 2)}\n`
);

console.log(`Wrote ${manifest.length} striking-distance targets to seo/striking-distance-targets.json`);
