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
  const area = location.area?.trim() || location.name;
  const titleSeed = `loc-title:${service.slug}:${location.id}`;
  const titleCandidates = [
    `${displayTitle} in ${location.name}`,
    `Local ${displayTitle} in ${location.name}`,
    `${location.name} ${displayTitle} specialists`,
    `${displayTitle} in ${location.name} (${area})`,
    `${location.name}: ${displayTitle}`,
  ];
  const title = pickMetaTitle(titleCandidates, titleSeed);
  const industry = config.industry?.trim();
  const descCore = industry
    ? `${displayTitle} in ${location.name}. Fast response, local engineers, clear pricing for ${industry}. Get help today.`
    : `${displayTitle} in ${location.name}. Fast response, local engineers, clear pricing. Get help today.`;
  const description = clampMetaDescription(descCore);
  return {
    title,
    description,
    alternates: { canonical: `${base}/${service.slug}/${location.id}` },
  };
}

export function buildServiceHubMetadata(service: Service, config: VerticalConfig): Metadata {
  const displayTitle = service.titleSingular ?? service.title;
  const base = normaliseBaseUrl(config.baseUrl);
  const titleSeed = `svc-hub-title:${service.slug}`;
  const titleCandidates = [
    displayTitle,
    `${displayTitle} services`,
    `Professional ${displayTitle}`,
    `${displayTitle} for projects`,
  ];
  const title = pickMetaTitle(titleCandidates, titleSeed);
  const description = clampMetaDescription(
    `Professional ${displayTitle.toLowerCase()} for residential and commercial projects. Speak to a specialist today.`
  );
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
