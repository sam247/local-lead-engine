/**
 * Phase 4 – Controlled rollout of topic × location pages.
 * Exactly 10 topics; route slug may differ from programmatic topic slug where needed to avoid conflict with service slugs.
 */

import { getProgrammaticTopicBySlug } from "@/data/programmaticTopics";
import { services } from "@/lib/data";
import type { Location } from "engine";

/** Route slugs used for topic×location URLs. Must not overlap with service slugs. */
export const TOPIC_LOCATION_SLUGS = [
  "cctv-installation",
  "commercial-cctv-systems",
  "warehouse-cctv-systems",
  "door-access-control",
  "gate-access-control",
  "perimeter-security-guide",
  "yard-security-systems",
  "data-cabling-installation",
  "cat6-network-cabling",
  "structured-cabling-contractors",
] as const;

/** Map route slug → programmatic topic slug (dataset). */
export const ROUTE_SLUG_TO_TOPIC_SLUG: Record<string, string> = {
  "cctv-installation": "commercial-cctv-installation",
  "commercial-cctv-systems": "office-cctv-installation",
  "warehouse-cctv-systems": "warehouse-cctv-installation",
  "door-access-control": "door-access-control-installation",
  "gate-access-control": "gate-access-control",
  "perimeter-security-guide": "construction-perimeter-security",
  "yard-security-systems": "logistics-security-systems",
  "data-cabling-installation": "data-cabling-installation",
  "cat6-network-cabling": "cat6-cabling",
  "structured-cabling-contractors": "structured-cabling",
};

export type TopicScaleClass = "GLOBAL_CONTENT" | "LOCATION_VALID" | "GREY";

const GLOBAL_KEYWORDS = ["cost", "price", "pricing", "per-metre", "per-m2", "guide", "what-is", "vs", "how-to"];
const LOCATION_VALID_KEYWORDS = ["contractors", "installation", "repair", "services", "near-me", "emergency"];

function classifyRouteSlug(routeSlug: string): TopicScaleClass {
  const input = routeSlug.toLowerCase();
  if (GLOBAL_KEYWORDS.some((keyword) => input.includes(keyword))) return "GLOBAL_CONTENT";
  if (LOCATION_VALID_KEYWORDS.some((keyword) => input.includes(keyword))) return "LOCATION_VALID";
  return "GREY";
}

export function getTopicScaleClassByRouteSlug(routeSlug: string): TopicScaleClass {
  return classifyRouteSlug(routeSlug);
}

export function getGlobalTopicRouteSlugs(): string[] {
  return TOPIC_LOCATION_SLUGS.filter((slug) => classifyRouteSlug(slug) === "GLOBAL_CONTENT");
}

export function getLocationScalableTopicSlugs(): string[] {
  return TOPIC_LOCATION_SLUGS.filter((slug) => classifyRouteSlug(slug) !== "GLOBAL_CONTENT");
}

export function isGlobalTopicSlugForLocation(routeSlug: string): boolean {
  return getGlobalTopicRouteSlugs().includes(routeSlug);
}

export function getGlobalTopicCanonicalPath(routeSlug: string): string | null {
  const programmaticSlug = ROUTE_SLUG_TO_TOPIC_SLUG[routeSlug];
  if (!programmaticSlug) return null;
  const hubPath = TOPIC_HUB_PATH[programmaticSlug];
  if (!hubPath) return null;
  return `${hubPath}/${programmaticSlug}`;
}

export function isTopicLocationSlug(slug: string): boolean {
  return TOPIC_LOCATION_SLUGS.includes(slug as (typeof TOPIC_LOCATION_SLUGS)[number]);
}

export function getTopicForRouteSlug(routeSlug: string) {
  const topicSlug = ROUTE_SLUG_TO_TOPIC_SLUG[routeSlug];
  return topicSlug ? getProgrammaticTopicBySlug(topicSlug) : undefined;
}

/** Topic slug (programmatic dataset slug) → topic hub path for "back to hub" link. */
export const TOPIC_HUB_PATH: Record<string, string> = {
  "commercial-cctv-installation": "/cctv-guides",
  "office-cctv-installation": "/cctv-guides",
  "warehouse-cctv-installation": "/cctv-guides",
  "door-access-control-installation": "/access-control-guides",
  "gate-access-control": "/access-control-guides",
  "construction-perimeter-security": "/perimeter-security-guides",
  "logistics-security-systems": "/cctv-guides",
  "data-cabling-installation": "/data-cabling-guides",
  "cat6-cabling": "/data-cabling-guides",
  "structured-cabling": "/data-cabling-guides",
};

/** Services to list under "Security services in {location}". */
export const TOPIC_PAGE_SERVICES = services.filter((s) =>
  ["commercial-cctv-installation", "access-control-systems", "perimeter-security-systems", "ip-camera-systems"].includes(s.slug)
);

export function getTopicLocationStaticParams(locations: Location[]) {
  return getLocationScalableTopicSlugs().flatMap((topicSlug) =>
    locations.map((loc) => ({ serviceSlug: topicSlug, locationSlug: loc.id }))
  );
}
