#!/usr/bin/env node
/**
 * Groundworks crawl-discovery checks: sitemap pairs vs allowlist, suspicious link patterns.
 * Usage: node scripts/verify-groundworks-discovery.mjs
 */
import fs from "fs";
import path from "path";

const repoRoot = path.resolve(path.dirname(decodeURIComponent(new URL(import.meta.url).pathname)), "..");
const gwRoot = path.join(repoRoot, "verticals/groundworks");

function read(rel) {
  return fs.readFileSync(path.join(repoRoot, rel), "utf8");
}

function extractSet(block) {
  return new Set([...block.matchAll(/"([^"]+)"/g)].map((m) => m[1]));
}

const ctrl = read("verticals/groundworks/lib/controlledTerritoryGeneration.ts");
const aligned = read("engine/data/aligned-contractor-territory-locations.ts");
const locationsMain = read("engine/data/locations.ts");

const wave1Locs = extractSet(ctrl.match(/STRATEGIC_MICRO_LOCATION_IDS = new Set\(\[([\s\S]*?)\]\)/)[1]);
const wave1Services = extractSet(ctrl.match(/STRATEGIC_MICRO_SERVICE_SLUGS = new Set\(\[([\s\S]*?)\]\)/)[1]);
const alignedServices = extractSet(ctrl.match(/ALIGNED_CONTRACTOR_SERVICE_SLUGS = new Set\(\[([\s\S]*?)\]\)/)[1]);
const alignedLocs = extractSet(aligned);

const locationIds = new Set([
  ...[...locationsMain.matchAll(/id: "([^"]+)"/g)].map((m) => m[1]),
  ...alignedLocs,
]);

const serviceSlugs = new Set(
  [...read("verticals/groundworks/lib/data.ts").matchAll(/slug: "([^"]+)"/g)]
    .map((m) => m[1])
    .filter((s) => !s.includes("/"))
);

function allowsService(loc, svc) {
  if (wave1Locs.has(loc)) return wave1Services.has(svc);
  if (alignedLocs.has(loc)) return alignedServices.has(svc);
  return true;
}

let generated = 0;
let blocked = 0;
for (const loc of locationIds) {
  for (const svc of serviceSlugs) {
    if (allowsService(loc, svc)) generated++;
    else blocked++;
  }
}

console.log("Groundworks discovery verification\n");
console.log(`Locations: ${locationIds.size}, services: ${serviceSlugs.size}`);
console.log(`Allowed service×location pairs: ${generated}`);
console.log(`Blocked pairs (intentional): ${blocked}`);
console.log(`Aligned appendix towns: ${alignedLocs.size}`);
console.log(`Aligned allowed services: ${alignedServices.size}`);
console.log(`Wave-1 towns: ${wave1Locs.size}, allowed services: ${wave1Services.size}`);

const investigation = ["plate-load-testing", "incremental-plate-load-testing", "foundation-depth-issues"];
for (const svc of investigation) {
  const onAppendix = [...alignedLocs].filter((loc) => allowsService(loc, svc)).length;
  console.log(`  ${svc}: ${onAppendix}/${alignedLocs.size} appendix towns`);
}

const suspicious = [];
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === "node_modules" || ent.name === ".next") continue;
      walk(p);
    } else if (/\.(tsx|ts)$/.test(ent.name)) {
      const text = fs.readFileSync(p, "utf8");
      if (
        text.includes("locations.slice") &&
        text.includes("href={`/${") &&
        !text.includes("groundworksAllows") &&
        !text.includes("filterLocationsForService") &&
        !text.includes("isGroundworksServiceLocationAllowed") &&
        !text.includes("buildGroundworksFeatured")
      ) {
        suspicious.push(path.relative(gwRoot, p));
      }
    }
  }
}
walk(gwRoot);

if (suspicious.length) {
  console.log("\n⚠ Files with possible unfiltered location links (manual review):");
  for (const f of suspicious) console.log(`  - ${f}`);
  process.exitCode = 1;
} else {
  console.log("\n✓ No obvious unfiltered location×service link patterns in Groundworks TSX.");
}

const kentNearMe = [
  "ashford","bickley","bexleyheath","canterbury","chislehurst","dartford","dover","erith","faversham","folkestone","gravesend","greenhithe","kings-hill","longfield","maidstone","mottingham","new-eltham","rochester","sevenoaks","sidcup","swanley","tonbridge","tunbridge-wells","west-malling","whitstable","wilmington",
];
const kentMissing = kentNearMe.filter((id) => !locationIds.has(id));
const kentBlocked = kentNearMe.filter((id) => locationIds.has(id) && !allowsService(id, "groundworks-contractors"));
if (kentMissing.length) {
  console.log("\n✗ Kent near-me towns missing from locations dataset:", kentMissing.join(", "));
  process.exitCode = 1;
}
if (kentBlocked.length) {
  console.log("\n✗ Kent near-me towns blocked for groundworks-contractors:", kentBlocked.join(", "));
  process.exitCode = 1;
} else {
  console.log(`\n✓ All ${kentNearMe.length} Kent near-me towns allowed for groundworks-contractors.`);
}
