import {
  buildFeaturedServiceLocationLinks,
  type InternalLinkTarget,
  type Location,
  type Service,
} from "engine";
import { groundworksAllowsServiceSlugForLocation } from "@/lib/controlledTerritoryGeneration";

const DEFAULT_FALLBACK_SERVICE_SLUG = "groundworks-contractors";

/** True when this service×location pair is statically generated. */
export function isGroundworksServiceLocationAllowed(
  locationId: string,
  serviceSlug: string
): boolean {
  return groundworksAllowsServiceSlugForLocation(locationId, serviceSlug);
}

/** Href for an allowed pair, otherwise null (omit the link). */
export function groundworksServiceLocationHref(
  serviceSlug: string,
  locationId: string
): string | null {
  if (!isGroundworksServiceLocationAllowed(locationId, serviceSlug)) return null;
  return `/${serviceSlug}/${locationId}`;
}

/**
 * Prefer the requested service×location; fall back to primary hub slug when constrained.
 * Last resort: near-me hub (always valid).
 */
export function groundworksServiceLocationHrefWithFallback(
  serviceSlug: string,
  locationId: string,
  fallbackSlug: string = DEFAULT_FALLBACK_SERVICE_SLUG
): string {
  const primary = groundworksServiceLocationHref(serviceSlug, locationId);
  if (primary) return primary;
  const fallback = groundworksServiceLocationHref(fallbackSlug, locationId);
  if (fallback) return fallback;
  return "/groundworks-contractors-near-me";
}

export function filterGroundworksServiceLocationLinks<T extends { href: string }>(
  links: T[]
): T[] {
  return links.filter((link) => {
    const match = link.href.match(/^\/([^/]+)\/([^/]+)\/?$/);
    if (!match) return true;
    return isGroundworksServiceLocationAllowed(match[2], match[1]);
  });
}

export function filterLocationsForService(serviceSlug: string, all: Location[]): Location[] {
  return all.filter((loc) => isGroundworksServiceLocationAllowed(loc.id, serviceSlug));
}

export function buildGroundworksFeaturedServiceLocationLinks(opts: {
  service: Service;
  locations: Location[];
  seed: string;
  maxLinks?: number;
}): InternalLinkTarget[] {
  const eligible = filterLocationsForService(opts.service.slug, opts.locations);
  if (eligible.length === 0) return [];
  return buildFeaturedServiceLocationLinks({
    service: opts.service,
    locations: eligible,
    seed: opts.seed,
    maxLinks: opts.maxLinks,
  });
}

export function groundworksLocationLinkPath(
  fallbackSlug: string = DEFAULT_FALLBACK_SERVICE_SLUG
): (serviceSlug: string, locationId: string) => string {
  return (serviceSlug, locationId) =>
    groundworksServiceLocationHrefWithFallback(serviceSlug, locationId, fallbackSlug);
}
