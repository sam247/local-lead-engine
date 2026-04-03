import { KEY_SERVICE_DETAIL_LOCATION_IDS } from "../data/key-location-ids";
import { getVariantIndex } from "../lib/contentVariants";
import type { Location, Service } from "../types";

export interface InternalLinkTarget {
  href: string;
  label: string;
}

export function buildServiceLocationAnchor(serviceTitle: string, locationName: string) {
  const dedupedTitle = serviceTitle.replace(/\b(services?)\s+\1\b/gi, "$1").trim();
  if (new RegExp(`\\b${locationName}\\b`, "i").test(dedupedTitle)) return dedupedTitle;
  return `${dedupedTitle} in ${locationName}`;
}

export function pickRelatedServiceLocationLinks({
  currentServiceSlug,
  services,
  location,
  priorityByService,
  maxLinks = 3,
}: {
  currentServiceSlug: string;
  services: Service[];
  location: Location;
  priorityByService: Record<string, string[]>;
  maxLinks?: number;
}): InternalLinkTarget[] {
  const selected = new Set<string>([currentServiceSlug]);
  const orderedCandidates = [
    ...(priorityByService[currentServiceSlug] ?? []),
    ...services.map((service) => service.slug),
  ];

  return orderedCandidates.reduce<InternalLinkTarget[]>((links, slug) => {
    if (links.length >= maxLinks || selected.has(slug)) return links;
    const service = services.find((candidate) => candidate.slug === slug);
    if (!service) return links;

    selected.add(slug);
    links.push({
      href: `/${service.slug}/${location.id}`,
      label: buildServiceLocationAnchor(service.title, location.name),
    });
    return links;
  }, []);
}

export function pickFeaturedLocationsForInternalLinks(
  allLocations: Location[],
  seed: string,
  count = 3
): Location[] {
  const keyPool = allLocations
    .filter((location) => KEY_SERVICE_DETAIL_LOCATION_IDS.includes(location.id))
    .sort((a, b) => a.id.localeCompare(b.id));
  const pool =
    keyPool.length >= count
      ? keyPool
      : [...allLocations].sort((a, b) => a.id.localeCompare(b.id));

  if (pool.length <= count) return pool;

  const maxStart = Math.max(0, pool.length - count);
  const start = maxStart === 0 ? 0 : getVariantIndex(`${seed}:start`, maxStart + 1);
  return pool.slice(start, start + count);
}

export function buildFeaturedServiceLocationLinks({
  service,
  locations,
  seed,
  maxLinks = 3,
}: {
  service: Service;
  locations: Location[];
  seed: string;
  maxLinks?: number;
}): InternalLinkTarget[] {
  return pickFeaturedLocationsForInternalLinks(locations, seed, maxLinks).map((location) => ({
    href: `/${service.slug}/${location.id}`,
    label: buildServiceLocationAnchor(service.title, location.name),
  }));
}
