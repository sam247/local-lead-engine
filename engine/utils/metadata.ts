import type { Metadata } from "next";
import { getVariantIndex } from "../lib/contentVariants";
import type {
  Service,
  Location,
  HubData,
  InfoPageData,
  VerticalConfig,
  ProblemData,
} from "../types";

const TITLE_MAX = 65;
const DESC_MIN = 120;
const DESC_MAX = 155;

type MetaVariantPair = readonly [string, string];

const SERVICE_HUB_TITLE_TEMPLATES: Record<string, Record<string, MetaVariantPair>> = {
  drains: {
    "drain-collapse-repair": [
      "Collapsed Drain Repair - Fast Diagnosis & Expert Repairs",
      "Collapsed Drain Repair - CCTV Checks & Same-Day Help",
    ],
    "drain-relining": [
      "Drain Relining - No-Dig Repairs & Clear Pricing",
      "Drain Relining - Less Disruption & Fixed Quotes",
    ],
    "cctv-drain-surveys": [
      "CCTV Drain Survey - Fixed Price Surveys & Fast Reports",
      "CCTV Drain Survey - Fast Reports & Clear Findings",
    ],
    "drain-excavation": [
      "Drain Excavation - Full Repairs & Clear Reinstatement",
      "Drain Excavation - Expert Repairs & Clear Pricing",
    ],
    "emergency-drainage": [
      "Emergency Drainage - Fast Response & 24/7 Help",
      "Emergency Drainage - Same-Day Help & Expert Engineers",
    ],
    "blocked-drains": [
      "Blocked Drains - Fast Clearance & Same-Day Help",
      "Blocked Drains - Rapid Unblocking & Clear Pricing",
    ],
    "drain-jetting": [
      "Drain Jetting - Fast Clearance & Same-Day Service",
      "Drain Jetting - Powerful Cleaning & Clear Pricing",
    ],
    "drain-root-removal": [
      "Drain Root Removal - Fast Clearance & Lasting Repairs",
      "Drain Root Removal - Specialist Cutting & Clear Pricing",
    ],
    "drain-unblocking": [
      "Drain Unblocking - Fast Response & Same-Day Help",
      "Drain Unblocking - Rapid Clearance & Clear Pricing",
    ],
    "drain-pipe-replacement": [
      "Drain Pipe Replacement - Reliable Repairs & Clear Quotes",
      "Drain Pipe Replacement - New Pipe Runs & Fixed Pricing",
    ],
    "commercial-drainage": [
      "Commercial Drainage - Reliable Support & Fast Response",
      "Commercial Drainage - Planned Works & Clear Pricing",
    ],
  },
  surveys: {
    "topographical-survey": [
      "Topographical Survey - Accurate Plans & Fast Delivery",
      "Topographical Survey - Planning-Ready Drawings & Clear Quotes",
    ],
    "measured-building-survey": [
      "Measured Building Survey - Accurate Plans & Fast Delivery",
      "Measured Building Survey - Clear Drawings & Reliable Turnaround",
    ],
    "utility-survey": [
      "Utility Survey - Clear Site Data & Fast Turnaround",
      "Utility Survey - Safer Dig Planning & Reliable Reports",
    ],
    "utility-mapping-survey": [
      "Utility Mapping Survey - Accurate Plans & Fast Reports",
      "Utility Mapping Survey - Clear Site Data & Reliable Delivery",
    ],
    "boundary-survey": [
      "Boundary Survey - Clear Plans & Reliable Advice",
      "Boundary Survey - Accurate Boundaries & Fast Turnaround",
    ],
    "laser-scanning-survey": [
      "Laser Scanning Survey - Accurate Point Clouds & Fast Delivery",
      "Laser Scanning Survey - Detailed 3D Data & Clear Quotes",
    ],
    "drone-survey": [
      "Drone Survey - Fast Site Capture & Clear Reports",
      "Drone Survey - Accurate Aerial Data & Reliable Turnaround",
    ],
    "drone-roof-inspection": [
      "Drone Roof Inspection - Fast Checks & Clear Images",
      "Drone Roof Inspection - Safe Access & Fast Reports",
    ],
    "drone-building-inspection": [
      "Drone Building Inspection - Safe Checks & Fast Reports",
      "Drone Building Inspection - High-Level Access & Clear Images",
    ],
    "drone-topographical-survey": [
      "Drone Topographical Survey - Fast Coverage & Accurate Data",
      "Drone Topographical Survey - Large-Site Capture & Clear Reports",
    ],
    "drone-construction-survey": [
      "Construction Drone Survey - Fast Progress Data & Clear Reporting",
      "Construction Drone Survey - Reliable Site Capture & Fast Turnaround",
    ],
    "building-surveys": [
      "Building Surveys - Clear Findings & Reliable Advice",
      "Building Surveys - Fast Reports & Specialist Guidance",
    ],
    "party-wall-surveyors": [
      "Party Wall Surveyors - Clear Advice & Reliable Support",
      "Party Wall Surveyors - Fast Guidance & Expert Help",
    ],
  },
  access: {
    "access-control-systems": [
      "Access Control Systems - Secure Entry & Clear Quotes",
      "Access Control Systems - Reliable Security & Fast Surveys",
    ],
    "commercial-cctv-installation": [
      "Commercial CCTV Installation - Reliable Coverage & Fast Surveys",
      "Commercial CCTV Installation - Clear Imaging & Trusted Installers",
    ],
    "ip-camera-systems": [
      "IP Camera Systems - Clear Coverage & Reliable Installers",
      "IP Camera Systems - Smart Security & Fast Surveys",
    ],
    "perimeter-security-systems": [
      "Perimeter Security Systems - Stronger Protection & Clear Quotes",
      "Perimeter Security Systems - Reliable Detection & Fast Surveys",
    ],
    "security-system-integration": [
      "Security System Integration - Joined-Up Control & Clear Quotes",
      "Security System Integration - Faster Response & Trusted Specialists",
    ],
  },
  groundworks: {
    "groundworks-contractors": [
      "Groundworks Contractors - Reliable Site Prep & Fast Turnaround",
      "Groundworks Contractors - Full Packages & Clear Quotes",
    ],
    underpinning: [
      "Underpinning Contractors - Structural Repairs & Clear Quotes",
      "Underpinning Contractors - Reliable Stabilisation & Fast Advice",
    ],
    "piling-contractors": [
      "Piling Contractors - Reliable Foundations & Fast Turnaround",
      "Piling Contractors - Specialist Ground Support & Clear Quotes",
    ],
    "cfa-piling": [
      "CFA Piling - Reliable Foundations & Fast Delivery",
      "CFA Piling - Low-Vibration Ground Support & Clear Quotes",
    ],
    "mini-piling-contractors": [
      "Mini Piling Contractors - Reliable Foundations & Fast Turnaround",
      "Mini Piling Contractors - Tight Access Solutions & Clear Quotes",
    ],
    "foundation-contractors": [
      "Foundation Contractors - Reliable Bases & Fast Turnaround",
      "Foundation Contractors - Accurate Ground Prep & Clear Quotes",
    ],
    "foundation-repair": [
      "Foundation Repair - Reliable Structural Fixes & Clear Quotes",
      "Foundation Repair - Crack Repairs & Fast Specialist Advice",
    ],
    "concrete-repair": [
      "Concrete Repair - Reliable Structural Repairs & Clear Quotes",
      "Concrete Repair - Fast Specialist Fixes & Trusted Workmanship",
    ],
    "excavation-contractors": [
      "Excavation Contractors - Reliable Ground Prep & Fast Turnaround",
      "Excavation Contractors - Bulk Digging & Clear Quotes",
    ],
    "site-clearance-contractors": [
      "Site Clearance Contractors - Fast Site Prep & Clear Quotes",
      "Site Clearance Contractors - Reliable Clearance & Trusted Teams",
    ],
    "concrete-foundations": [
      "Concrete Foundations - Reliable Bases & Clear Quotes",
      "Concrete Foundations - Fast Ground Prep & Trusted Installers",
    ],
    "enabling-works-contractors": [
      "Enabling Works Contractors - Fast Site Prep & Clear Quotes",
      "Enabling Works Contractors - Reliable Early Works & Trusted Teams",
    ],
  },
};

function normaliseBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/$/, "");
}

/** Trim and shorten meta title to target length (word-aware). */
export function clampMetaTitle(text: string, max = TITLE_MAX): string {
  const t = text.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  const slice = t.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > Math.floor(max * 0.5) ? slice.slice(0, lastSpace) : slice.slice(0, max - 3);
  return `${cut.trimEnd()}…`;
}

export function maybeAddNearMeMetaTitle(baseTitle: string, max = TITLE_MAX): string {
  const normalized = baseTitle.trim().replace(/\s+/g, " ");
  if (/near me/i.test(normalized)) return normalized;

  const separatorMatch = normalized.match(/\s([–-])\s/);
  if (!separatorMatch?.index) return normalized;

  const separatorStart = separatorMatch.index;
  const separator = separatorMatch[1];
  const before = normalized.slice(0, separatorStart).trimEnd();
  const after = normalized.slice(separatorStart + separatorMatch[0].length).trimStart();
  const candidate = `${before} Near Me ${separator} ${after}`;

  return candidate.length <= max && clampMetaTitle(candidate, max) === candidate
    ? candidate
    : normalized;
}

/**
 * Deterministic title pick: primary variant from seed, then rotate if the clamped
 * string matches the primary (truncation collision within the candidate set).
 */
function pickMetaTitle(candidates: readonly string[], seed: string, max = TITLE_MAX): string {
  const n = candidates.length;
  if (n === 0) return "";
  const trimmed = candidates.map((c) => c.trim().replace(/\s+/g, " "));
  const clamped = trimmed.map((c) => clampMetaTitle(c, max));
  const i0 = getVariantIndex(seed, n);
  const primary = clamped[i0]!;

  for (let k = 1; k < n; k += 1) {
    const idx = (i0 + k) % n;
    const t = clamped[idx]!;
    if (t !== primary) {
      return t;
    }
  }
  return primary;
}

/** Ensure meta description sits in a sensible length band for SERPs. */
export function clampMetaDescription(text: string, min = DESC_MIN, max = DESC_MAX): string {
  let t = text.trim().replace(/\s+/g, " ");
  if (t.length >= min && t.length <= max) return t;
  if (t.length > max) {
    const slice = t.slice(0, max - 1);
    const lastSpace = slice.lastIndexOf(" ");
    const cut = lastSpace > min - 30 ? slice.slice(0, lastSpace) : slice.slice(0, max - 3);
    return `${cut.trimEnd()}…`;
  }
  const pad = " Speak to a specialist or get help today.";
  const combined = (t + pad).trim();
  if (combined.length <= max) return combined.length >= min ? combined : clampMetaDescription(combined + " Clear next steps.", min, max);
  return clampMetaDescription(combined, min, max);
}

function infoMetaDescriptionNeedsRewrite(meta: string, title: string): boolean {
  const m = meta.trim();
  if (m.length < 100) return true;
  const t = title.trim().toLowerCase();
  const ml = m.toLowerCase();
  if (ml === t) return true;
  if (ml.startsWith(t) && m.length < DESC_MIN + 20) return true;
  return false;
}

function pickServiceHubTitle(service: Service, config: VerticalConfig): string {
  const templates = SERVICE_HUB_TITLE_TEMPLATES[config.verticalId]?.[service.slug];
  if (templates) {
    return pickMetaTitle(templates, `svc-hub-title:${config.verticalId}:${service.slug}`);
  }
  const displayTitle = service.titleSingular ?? service.title;
  return pickMetaTitle(
    [
      `${displayTitle} - Fast Response & Clear Pricing`,
      `${displayTitle} - Specialist Advice & Trusted Service`,
    ],
    `svc-hub-title:${config.verticalId}:${service.slug}`
  );
}

function buildServiceHubDescription(service: Service): string {
  const displayTitle = service.titleSingular ?? service.title;
  return clampMetaDescription(
    `Get ${displayTitle} with fast response, clear pricing, and practical advice from a specialist team. Speak to a specialist today or request a quote.`
  );
}

function synthesiseInfoDescription(page: InfoPageData): string {
  const parts = [page.intro, page.whenNeeded, page.diagnosis].filter(Boolean).join(" ");
  const stripped = parts.replace(/\s+/g, " ").trim();
  const snippet = stripped.slice(0, 220);
  if (snippet.length >= 40) {
    return clampMetaDescription(
      `${page.title}. ${snippet} Get help or speak to a specialist when you need a clear plan.`
    );
  }
  return clampMetaDescription(
    `${page.title} explained clearly, including when it matters and what to do next. Speak to a specialist today.`
  );
}

export function buildLocationMetadata(
  service: Service,
  location: Location,
  config: VerticalConfig
): Metadata {
  const displayTitle = service.titleSingular ?? service.title;
  const base = normaliseBaseUrl(config.baseUrl);
  const description = clampMetaDescription(
    `Get ${displayTitle} in ${location.name} with fast response, clear pricing, and practical advice from a specialist team. Speak to a specialist today or request a quote.`
  );
  return {
    description,
    alternates: { canonical: `${base}/${service.slug}/${location.id}` },
  };
}

export function buildServiceHubMetadata(service: Service, config: VerticalConfig): Metadata {
  const base = normaliseBaseUrl(config.baseUrl);
  const title = pickServiceHubTitle(service, config);
  const description = buildServiceHubDescription(service);
  return {
    title,
    description,
    alternates: { canonical: `${base}/${service.slug}` },
  };
}

export function buildProblemMetadata(
  problem: ProblemData,
  config: VerticalConfig,
  canonicalUrl: string
): Metadata {
  const titleSeed = `problem-meta-title:${problem.slug}`;
  const titleCandidates = [
    `${problem.title} – causes and fixes`,
    `${problem.title} – what to do`,
    `${problem.title}: next steps`,
  ];
  const title = pickMetaTitle(titleCandidates, titleSeed);
  const description = clampMetaDescription(
    `${problem.title}? Understand causes, risks, and next steps. Get expert help if needed.`
  );
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
  };
}

export type TopicLocationMetaInput = {
  topicTitle: string;
  topicSlug: string;
  location: Location;
  /** Optional programmatic topic meta; blended into description when useful. */
  baseMetaDescription?: string;
};

export function buildTopicLocationMetadata(
  input: TopicLocationMetaInput,
  config: VerticalConfig
): Metadata {
  const { topicTitle, topicSlug, location } = input;
  const base = normaliseBaseUrl(config.baseUrl);
  const area = location.area?.trim() || location.name;
  const titleSeed = `topic-loc-title:${topicSlug}:${location.id}`;
  const titleCandidates = [
    `${topicTitle} in ${location.name}`,
    `Local ${topicTitle} in ${location.name}`,
    `${location.name} ${topicTitle} specialists`,
    `${topicTitle} in ${location.name} (${area})`,
    `${location.name}: ${topicTitle}`,
  ];
  const title = pickMetaTitle(titleCandidates, titleSeed);
  const extra = input.baseMetaDescription?.trim();
  let description: string;
  if (extra && extra.length >= 40) {
    const merged = `${topicTitle} in ${location.name}. ${extra} Get help or speak to our team today.`.replace(
      /\s+/g,
      " "
    );
    description = clampMetaDescription(merged);
  } else {
    description = clampMetaDescription(
      `${topicTitle} explained clearly in ${location.name}, including when it matters and what to do next. Get help today.`
    );
  }
  return {
    title,
    description,
    alternates: { canonical: `${base}/${topicSlug}/${location.id}` },
  };
}

export function buildHubMetadata(hub: HubData, config: VerticalConfig): Metadata {
  const base = normaliseBaseUrl(config.baseUrl);
  const titleSeed = `hub-title:${hub.basePath}`;
  const titleCandidates = [hub.title, `${hub.title} explained`, `${hub.title} guide`];
  const title = pickMetaTitle(titleCandidates, titleSeed);
  const description = clampMetaDescription(hub.metaDescription);
  return {
    title,
    description,
    alternates: { canonical: `${base}${hub.basePath}` },
  };
}

export function buildInfoMetadata(
  hub: HubData,
  page: InfoPageData,
  config: VerticalConfig
): Metadata {
  const base = normaliseBaseUrl(config.baseUrl);
  const titleSeed = `info-title:${hub.category}:${page.slug}`;
  const titleCandidates = [page.title, `${page.title} explained`, `${page.title} guide`];
  const title = pickMetaTitle(titleCandidates, titleSeed);
  const description = infoMetaDescriptionNeedsRewrite(page.metaDescription, page.title)
    ? synthesiseInfoDescription(page)
    : clampMetaDescription(page.metaDescription);
  return {
    title,
    description,
    alternates: { canonical: `${base}${hub.basePath}/${page.slug}` },
  };
}
