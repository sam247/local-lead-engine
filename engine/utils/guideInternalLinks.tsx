import Link from "next/link";
import type { Location, Service } from "../types";
import { getServiceUrl } from "./serviceUrls";
import {
  buildFeaturedServiceLocationLinks,
  buildServiceLocationAnchor,
  pickFeaturedLocationsForInternalLinks,
} from "./internalLinkTargets";

export interface GuideInternalLinksModel {
  serviceLinks: { href: string; label: string }[];
  locationLinks: { href: string; label: string }[];
  aboutHref: string;
  aboutLabel: string;
}

export function buildGuideInternalLinksWithLocations(
  services: Service[],
  locations: Location[],
  primaryServiceSlug: string,
  aboutLabel = "Learn more about our team"
): GuideInternalLinksModel {
  const sorted = [...services].sort((a, b) => a.slug.localeCompare(b.slug));
  const primary = sorted.find((s) => s.slug === primaryServiceSlug) ?? sorted[0];
  const secondary = sorted.find((s) => s.slug !== primary?.slug);
  const serviceLinks: { href: string; label: string }[] = [];
  if (primary) serviceLinks.push({ href: getServiceUrl(primary.slug), label: primary.title });
  if (secondary) serviceLinks.push({ href: getServiceUrl(secondary.slug), label: secondary.title });
  const picked = primary
    ? buildFeaturedServiceLocationLinks({
        service: primary,
        locations,
        seed: `guide-internal-links:${primary.slug}`,
        maxLinks: 2,
      })
    : [];
  const fallbackLocations =
    secondary == null
      ? []
      : pickFeaturedLocationsForInternalLinks(locations, `guide-secondary:${secondary.slug}`, 1).map((location) => ({
          href: `/${secondary.slug}/${location.id}`,
          label: buildServiceLocationAnchor(secondary.title, location.name),
        }));
  const locationLinks = [...picked, ...fallbackLocations].slice(0, 2);
  return {
    serviceLinks,
    locationLinks,
    aboutHref: "/about",
    aboutLabel,
  };
}

export function GuideInternalLinksBlock({ model }: { model: GuideInternalLinksModel }) {
  return (
    <div className="mt-8 rounded-lg border border-border bg-secondary/30 p-5 text-sm text-muted-foreground">
      <p className="mb-3 font-medium text-foreground">Related on this site</p>
      <ul className="list-inside list-disc space-y-2">
        {model.serviceLinks.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-primary hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
        {model.locationLinks.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-primary hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
        <li>
          <Link href={model.aboutHref} className="text-primary hover:underline">
            {model.aboutLabel}
          </Link>
        </li>
      </ul>
    </div>
  );
}
