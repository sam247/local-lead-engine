#!/usr/bin/env node
/**
 * Classify GSC 404 URLs against Groundworks controlled generation rules.
 * Usage: node scripts/analyze-gsc-404s.mjs /path/to/Table.csv
 */
import fs from "fs";
import path from "path";

const repoRoot = path.resolve(path.dirname(decodeURIComponent(new URL(import.meta.url).pathname)), "..");

function readFile(p) {
  return fs.readFileSync(path.join(repoRoot, p), "utf8");
}

function extractSlugs(content, pattern) {
  return [...content.matchAll(pattern)].map((m) => m[1]);
}

const servicesContent = readFile("verticals/groundworks/lib/data.ts");
const serviceSlugs = new Set(extractSlugs(servicesContent, /slug: "([^"]+)"/g).filter((s) => !s.includes("/")));

const locationsContent = readFile("engine/data/locations.ts");
const alignedContent = readFile("engine/data/aligned-contractor-territory-locations.ts");
const locationIds = new Set([
  ...extractSlugs(locationsContent, /id: "([^"]+)"/g),
  ...extractSlugs(alignedContent, /id: "([^"]+)"/g),
]);

const topicConfig = readFile("verticals/groundworks/lib/topicLocationConfig.ts");
const topicSlugs = new Set();
const topicArrayMatch = topicConfig.match(/TOPIC_LOCATION_SLUGS = \[([\s\S]*?)\] as const/);
if (topicArrayMatch) {
  for (const m of topicArrayMatch[1].matchAll(/"([^"]+)"/g)) topicSlugs.add(m[1]);
}

const ctrl = readFile("verticals/groundworks/lib/controlledTerritoryGeneration.ts");
const wave1Locs = new Set(extractSlugs(ctrl, /STRATEGIC_MICRO_LOCATION_IDS[\s\S]*?"([^"]+)"/g).slice(0, 5));
const wave1Services = new Set();
const alignedServices = new Set();
const wave1Topics = new Set();
const alignedTopics = new Set();

const wave1SvcBlock = ctrl.match(/STRATEGIC_MICRO_SERVICE_SLUGS = new Set\(\[([\s\S]*?)\]\)/);
const alignedSvcBlock = ctrl.match(/ALIGNED_CONTRACTOR_SERVICE_SLUGS = new Set\(\[([\s\S]*?)\]\)/);
const wave1TopicBlock = ctrl.match(/STRATEGIC_MICRO_TOPIC_SLUGS = new Set\(\[([\s\S]*?)\]\)/);
const alignedTopicBlock = ctrl.match(/ALIGNED_CONTRACTOR_TOPIC_SLUGS = new Set\(\[([\s\S]*?)\]\)/);

for (const m of (wave1SvcBlock?.[1] ?? "").matchAll(/"([^"]+)"/g)) wave1Services.add(m[1]);
for (const m of (alignedSvcBlock?.[1] ?? "").matchAll(/"([^"]+)"/g)) alignedServices.add(m[1]);
for (const m of (wave1TopicBlock?.[1] ?? "").matchAll(/"([^"]+)"/g)) wave1Topics.add(m[1]);
for (const m of (alignedTopicBlock?.[1] ?? "").matchAll(/"([^"]+)"/g)) alignedTopics.add(m[1]);

const alignedLocs = new Set(extractSlugs(alignedContent, /id: "([^"]+)"/g));

function allowsService(loc, svc) {
  if (wave1Locs.has(loc)) return wave1Services.has(svc);
  if (alignedLocs.has(loc)) return alignedServices.has(svc);
  return true;
}

function allowsTopic(loc, topic) {
  if (wave1Locs.has(loc)) return wave1Topics.has(topic);
  if (alignedLocs.has(loc)) return alignedTopics.has(topic);
  return true;
}

function classifyUrl(url) {
  const pathname = url.replace(/^https?:\/\/[^/]+/, "").replace(/\?.*$/, "");
  const segs = pathname.split("/").filter(Boolean);
  if (segs[0] === "_next") return "noise_static_asset";
  if (segs.length === 1) {
    if (/-\d+$/.test(segs[0])) return "suffix_junk_single_segment";
    if (serviceSlugs.has(segs[0])) return "orphan_service_root";
    return "unknown_single_segment";
  }
  if (segs.length === 2 && segs[0] === "services" && /-\d+$/.test(segs[1])) {
    return "suffix_junk_service_hub";
  }
  if (
    segs.length === 2 &&
    ["guides", "foundation-problems", "groundworks-costs", "construction-drainage", "driveway-groundworks", "projects", "blog"].includes(
      segs[0]
    ) &&
    /-\d+$/.test(segs[1])
  ) {
    return "suffix_junk_hub_page";
  }
  if (segs.length !== 2) return "other_path_shape";

  const [first, locRaw] = segs;
  const hasSuffix = /-\d+$/.test(locRaw);
  const loc = hasSuffix ? locRaw.replace(/(-\d+)+$/, "") : locRaw;

  if (!locationIds.has(loc)) return "unknown_location";

  if (topicSlugs.has(first)) {
    if (!allowsTopic(loc, first)) return "topic_blocked_by_territory";
    if (hasSuffix) return "suffix_redirect_topic";
    return "topic_should_work";
  }

  if (!serviceSlugs.has(first)) {
    if (first === "ground-investigation") return "wrong_slug_use_ground_investigation_services";
    if (first === "site-preparation-contractors") return "wrong_slug_topic_vs_service";
    return "unknown_service_slug";
  }

  if (!allowsService(loc, first)) {
    const t = wave1Locs.has(loc) ? "wave1" : alignedLocs.has(loc) ? "aligned" : "core";
    return `service_blocked_territory_${t}`;
  }
  if (hasSuffix) return "suffix_redirect_service";
  return "service_should_work";
}

const csvPath = process.argv[2];
if (!csvPath) {
  console.error("Usage: node scripts/analyze-gsc-404s.mjs <Table.csv>");
  process.exit(1);
}

const lines = fs.readFileSync(csvPath, "utf8").trim().split("\n").slice(1);
const urls = lines.map((l) => l.split(",")[0].trim()).filter(Boolean);

const counts = {};
const samples = {};
for (const url of urls) {
  const bucket = classifyUrl(url);
  counts[bucket] = (counts[bucket] || 0) + 1;
  if (!samples[bucket]) samples[bucket] = [];
  if (samples[bucket].length < 2) samples[bucket].push(url);
}

const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
console.log(`Total URLs: ${urls.length}\n`);
for (const [bucket, n] of sorted) {
  console.log(`${String(n).padStart(4)}  ${bucket}`);
  for (const s of samples[bucket] ?? []) console.log(`       e.g. ${s}`);
}

const blocked = urls.filter((u) => classifyUrl(u).startsWith("service_blocked_territory"));
const bySvc = {};
for (const u of blocked) {
  const svc = u.replace(/.*\.co\.uk\//, "").split("/")[0];
  bySvc[svc] = (bySvc[svc] || 0) + 1;
}
console.log("\nTop blocked service slugs (aligned/wave1 territory):");
Object.entries(bySvc)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 12)
  .forEach(([s, n]) => console.log(`  ${n}  ${s}`));

const hub = urls.filter((u) => {
  const p = u.replace(/.*\.co\.uk\//, "");
  return p.startsWith("groundworks-contractors/") && !p.includes("-2");
});
const hubBlocked = hub.filter((u) => classifyUrl(u).startsWith("service_blocked"));
console.log(`\ngroundworks-contractors/* (no -2 suffix): ${hub.length}, still blocked in rules: ${hubBlocked.length}`);
