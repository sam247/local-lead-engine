#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..");
const MANIFEST_TS_PATH = path.join(ROOT, "engine/data/generated/serviceHeroManifest.ts");

const VERTICALS = {
  drains: path.join(ROOT, "verticals/drains/lib/data.ts"),
  surveys: path.join(ROOT, "verticals/surveys/lib/data.ts"),
  access: path.join(ROOT, "verticals/access/lib/data.ts"),
  groundworks: path.join(ROOT, "verticals/groundworks/lib/data.ts"),
  scaffolding: path.join(ROOT, "verticals/scaffolding/lib/data.ts"),
};

const VERTICAL_FALLBACK_QUERY = {
  drains: "drain excavation and cctv inspection uk",
  surveys: "topographical survey equipment construction site uk",
  access: "commercial cctv access control installation uk",
  groundworks: "groundworks contractors excavation foundations uk",
  scaffolding: "scaffolding structure construction site uk",
};

const SERVICE_QUERY_BY_VERTICAL = {
  drains: {
    "drain-collapse-repair": "collapsed drain excavation repair uk",
    "cctv-drain-surveys": "cctv drain survey operator uk",
    "drain-relining": "drain relining trenchless repair uk",
    "blocked-drains": "blocked drain jetting engineer uk",
    "commercial-drainage": "commercial drainage maintenance team uk",
  },
  surveys: {
    "topographical-survey": "topographical survey tripod total station uk",
    "measured-building-survey": "measured building survey laser scanner uk",
    "utility-survey": "utility survey gpr scanning uk",
    "drone-survey": "drone survey construction site uk",
    "boundary-survey": "boundary survey equipment land measurement uk",
  },
  access: {
    "access-control-systems": "commercial access control door reader installation uk",
    "commercial-cctv-installation": "commercial cctv installation engineer uk",
    "ip-camera-systems": "ip camera system installation commercial site uk",
    "perimeter-security-systems": "perimeter security fence cameras commercial uk",
    "security-system-integration": "integrated security system control room uk",
  },
  groundworks: {
    "groundworks-contractors": "groundworks contractors machinery construction uk",
    "piling-contractors": "piling rig construction site uk",
    "foundation-contractors": "foundation excavation concrete works uk",
    "site-clearance-contractors": "construction site clearance excavator uk",
    "bulk-earthworks": "earthmoving heavy equipment construction uk",
  },
  scaffolding: {
    "scaffolding-contractors": "scaffolding crew working construction site uk",
    "domestic-scaffolding": "domestic house scaffolding installation uk",
    "commercial-scaffolding": "commercial scaffolding installation team uk",
    "temporary-roofing": "temporary roof scaffold weather protection uk",
    "emergency-scaffolding": "emergency scaffolding response construction uk",
  },
};

function parseArgs() {
  const args = new Set(process.argv.slice(2));
  return {
    refresh: args.has("--refresh"),
  };
}

function getUnsplashKey() {
  return (process.env.UNSPLASH_API_KEY ?? "").trim();
}

function serviceBlockFromDataFile(content) {
  const anchor = "export const services = [";
  const start = content.indexOf(anchor);
  if (start < 0) return "";
  const from = start + anchor.length;
  const end = content.indexOf("];", from);
  if (end < 0) return "";
  return content.slice(from, end);
}

function parseServiceSlugs(content) {
  const block = serviceBlockFromDataFile(content);
  const re = /slug:\s*"([^"]+)"/g;
  const slugs = [];
  let m;
  while ((m = re.exec(block)) != null) {
    const slug = String(m[1]).trim();
    if (slug && !slugs.includes(slug)) slugs.push(slug);
  }
  return slugs;
}

function deriveQuery(verticalId, serviceSlug) {
  const explicit = SERVICE_QUERY_BY_VERTICAL[verticalId]?.[serviceSlug];
  if (explicit) return explicit;
  const words = serviceSlug
    .replace(/-/g, " ")
    .replace(/\b(contractors?|services?|systems?|advice|issues|problems)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const base = words.length > 0 ? words : VERTICAL_FALLBACK_QUERY[verticalId];
  return `${base} ${VERTICAL_FALLBACK_QUERY[verticalId]}`.trim();
}

async function readExistingManifest() {
  try {
    const raw = await fs.readFile(MANIFEST_TS_PATH, "utf8");
    const match = raw.match(/export const SERVICE_HERO_MANIFEST:[^=]+=\s*([\s\S]*);\s*$/m);
    if (!match) return {};
    return Function(`"use strict"; return (${match[1]});`)();
  } catch {
    return {};
  }
}

async function fetchUnsplashImage({ accessKey, query }) {
  const endpoint = new URL("https://api.unsplash.com/photos/random");
  endpoint.searchParams.set("query", query);
  endpoint.searchParams.set("orientation", "landscape");
  const res = await fetch(endpoint.toString(), {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
      "Accept-Version": "v1",
    },
  });
  if (!res.ok) {
    throw new Error(`Unsplash ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  return {
    imageUrl: data?.urls?.regular ?? data?.urls?.full ?? "",
    unsplashId: data?.id,
  };
}

function renderManifestTs(manifest) {
  return `export type ServiceHeroManifestEntry = {
  imageUrl: string;
  query: string;
  source: "unsplash";
  unsplashId?: string;
  updatedAt: string;
};

export type ServiceHeroManifest = Record<string, Record<string, ServiceHeroManifestEntry>>;

/**
 * Build-time generated service hero image manifest.
 * Regenerate via: npm run images:service-heroes
 */
export const SERVICE_HERO_MANIFEST: ServiceHeroManifest = ${JSON.stringify(manifest, null, 2)};\n`;
}

async function main() {
  const { refresh } = parseArgs();
  const accessKey = getUnsplashKey();
  if (!accessKey) {
    throw new Error("Missing UNSPLASH_API_KEY for build-time manifest generation.");
  }

  const existing = await readExistingManifest();
  const next = { ...existing };

  for (const [verticalId, filePath] of Object.entries(VERTICALS)) {
    const content = await fs.readFile(filePath, "utf8");
    const slugs = parseServiceSlugs(content);
    if (!next[verticalId]) next[verticalId] = {};

    for (const slug of slugs) {
      if (!refresh && next[verticalId][slug]?.imageUrl) continue;
      const query = deriveQuery(verticalId, slug);
      try {
        const image = await fetchUnsplashImage({ accessKey, query });
        if (!image.imageUrl) continue;
        next[verticalId][slug] = {
          imageUrl: image.imageUrl,
          query,
          source: "unsplash",
          unsplashId: image.unsplashId,
          updatedAt: new Date().toISOString(),
        };
        console.log(`[hero-manifest] ${verticalId}/${slug} <- ${query}`);
      } catch (error) {
        console.warn(`[hero-manifest] failed ${verticalId}/${slug}: ${String(error)}`);
      }
    }
  }

  await fs.mkdir(path.dirname(MANIFEST_TS_PATH), { recursive: true });
  await fs.writeFile(MANIFEST_TS_PATH, renderManifestTs(next), "utf8");
  console.log(`[hero-manifest] wrote ${MANIFEST_TS_PATH}`);
}

main().catch((err) => {
  console.error("[hero-manifest] fatal:", err);
  process.exit(1);
});

