import Link from "next/link";
import type { Location, Service } from "../types";
import { KEY_SERVICE_DETAIL_LOCATION_IDS } from "../data/key-location-ids";

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
  if (primary) serviceLinks.push({ href: `/services/${primary.slug}`, label: primary.title });
  if (secondary) serviceLinks.push({ href: `/services/${secondary.slug}`, label: secondary.title });
  const locMap = new Map(locations.map((l) => [l.id, l]));
  const orderedIds = [...KEY_SERVICE_DETAIL_LOCATION_IDS].filter((id) => locMap.has(id)).sort();
  const picked = orderedIds.slice(0, 2).map((id) => locMap.get(id)!);
  const locationLinks = picked.map((loc) => ({
    href: `/${primaryServiceSlug}/${loc.id}`,
    label: `${loc.name}`,
  }));
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
              Coverage in {l.label}
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
