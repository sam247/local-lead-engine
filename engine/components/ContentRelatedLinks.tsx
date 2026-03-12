import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service, Location } from "../types";

export interface ContentRelatedLinksProps {
  relatedServiceSlugs: string[];
  services: Service[];
  locations: Location[];
  relatedGuideLinks?: { title: string; href: string }[];
  servicesPath: string;
  locationLinkPath: (serviceSlug: string, locationId: string) => string;
  /** Used for location links when no service context. Defaults to first related service or first in list. */
  firstServiceSlugForLocations?: string;
  crossVerticalLinks?: { label: string; url: string }[];
  /** Section heading. Default "Related services and areas". */
  sectionTitle?: string;
  relatedServicesTitle?: string;
  keyAreasTitle?: string;
  relatedGuidesTitle?: string;
  crossVerticalTitle?: string;
}

export function ContentRelatedLinks({
  relatedServiceSlugs,
  services,
  locations,
  relatedGuideLinks = [],
  servicesPath,
  locationLinkPath,
  firstServiceSlugForLocations,
  crossVerticalLinks = [],
  sectionTitle = "Related services and areas",
  relatedServicesTitle = "Related services",
  keyAreasTitle = "Key areas",
  relatedGuidesTitle = "Related guides",
  crossVerticalTitle = "Related reading",
}: ContentRelatedLinksProps) {
  const matchedServices = services.filter((s) => relatedServiceSlugs.includes(s.slug)).slice(0, 4);
  const firstSlug =
    firstServiceSlugForLocations ?? relatedServiceSlugs[0] ?? services[0]?.slug;
  const featuredLocations = locations.slice(0, 8);
  const guides = relatedGuideLinks.slice(0, 4);
  const crossLinks = crossVerticalLinks.slice(0, 2);

  const hasServices = matchedServices.length > 0;
  const hasLocations = featuredLocations.length > 0 && firstSlug;
  const hasGuides = guides.length > 0;
  const hasCross = crossLinks.length > 0;

  if (!hasServices && !hasLocations && !hasGuides && !hasCross) return null;

  return (
    <div className="mb-8 space-y-6 rounded-lg border border-border bg-secondary/30 p-6">
      <h2 className="mb-4 font-display text-2xl font-bold">{sectionTitle}</h2>

      {hasServices && (
        <>
          <h3 className="mb-2 font-display text-lg font-semibold">{relatedServicesTitle}</h3>
          <ul className="mb-4 space-y-2">
            {matchedServices.map((s) => (
              <li key={s.id}>
                <Link
                  href={`${servicesPath}/${s.slug}`}
                  className="text-primary hover:underline"
                >
                  {s.title} <ArrowRight className="inline h-3 w-3" />
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {hasLocations && (
        <>
          <h3 className="mb-2 font-display text-lg font-semibold">{keyAreasTitle}</h3>
          <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {featuredLocations.map((loc) => (
              <Link
                key={loc.id}
                href={locationLinkPath(firstSlug, loc.id)}
                className="text-sm text-primary hover:underline"
              >
                {loc.name} <ArrowRight className="inline h-3 w-3" />
              </Link>
            ))}
          </div>
        </>
      )}

      {hasGuides && (
        <>
          <h3 className="mb-2 font-display text-lg font-semibold">{relatedGuidesTitle}</h3>
          <ul className="mb-4 space-y-2">
            {guides.map((g) => (
              <li key={g.href}>
                <Link href={g.href} className="text-sm text-primary hover:underline">
                  {g.title} <ArrowRight className="inline h-3 w-3" />
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {hasCross && (
        <>
          <h3 className="mb-2 font-display text-lg font-semibold">{crossVerticalTitle}</h3>
          <p className="text-sm text-muted-foreground">
            {crossLinks.map((c, i) => (
              <span key={c.url}>
                {i > 0 && " "}
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {c.label}
                </a>
                {i < crossLinks.length - 1 ? "," : "."}
              </span>
            ))}
          </p>
        </>
      )}
    </div>
  );
}
