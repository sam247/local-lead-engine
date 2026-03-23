import Link from "next/link";
import { getServiceAreasHubSections } from "../data/uk-location-hierarchy";
import type { Location } from "../types";

export type ServiceAreasHubProps = {
  primaryServiceSlug: string;
  locations: readonly Location[];
  heroTitle: string;
  heroSubtitle: string;
  introTitle?: string;
  introBody: string;
  browseMoreHref?: string;
  browseMoreLabel?: string;
};

export function ServiceAreasHub({
  primaryServiceSlug,
  locations,
  heroTitle,
  heroSubtitle,
  introTitle = "Coverage by region",
  introBody,
  browseMoreHref = "/services",
  browseMoreLabel = "Browse all services",
}: ServiceAreasHubProps) {
  const byId = new Map(locations.map((l) => [l.id, l]));
  const sections = getServiceAreasHubSections();

  return (
    <>
      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">
              {heroTitle}
            </h1>
            <p className="text-lg text-primary-foreground/80">{heroSubtitle}</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-4xl">
          <h2 className="mb-3 font-display text-2xl font-bold">{introTitle}</h2>
          <p className="mb-10 text-muted-foreground">{introBody}</p>

          <div className="space-y-12">
            {sections.map((region) => (
              <div key={region.regionName}>
                <h3 className="mb-6 border-b border-border pb-2 font-display text-xl font-semibold">
                  {region.regionName}
                </h3>
                <div className="space-y-8">
                  {region.counties.map((county) => {
                    const locs = county.locationIds
                      .map((id) => byId.get(id))
                      .filter((l): l is Location => l != null);
                    if (locs.length === 0) return null;
                    return (
                      <div key={county.countySlug}>
                        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                          {county.countyName}
                        </h4>
                        <ul className="flex flex-wrap gap-x-4 gap-y-2">
                          {locs.map((loc) => (
                            <li key={loc.id}>
                              <Link
                                href={`/${primaryServiceSlug}/${loc.id}`}
                                className="text-primary hover:underline"
                              >
                                {loc.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30 py-12">
        <div className="container">
          <Link href={browseMoreHref} className="inline-flex font-medium text-primary hover:underline">
            {browseMoreLabel} →
          </Link>
        </div>
      </section>
    </>
  );
}
