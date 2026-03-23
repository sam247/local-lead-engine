import Link from "next/link";
import { ChevronDown } from "lucide-react";
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
        <div className="container max-w-5xl">
          <h2 className="mb-3 font-display text-2xl font-bold">{introTitle}</h2>
          <p className="mb-10 text-muted-foreground">{introBody}</p>

          <div className="space-y-3">
            {sections.map((region) => (
              <details
                key={region.regionName}
                className="group rounded-xl border border-border/80 bg-background shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-left font-display text-lg font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary md:py-4 md:text-xl">
                  <span>{region.regionName}</span>
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <div className="space-y-8 border-t border-border/60 px-3 py-4 md:px-4 md:py-6">
                  {region.counties.map((county) => {
                    const locs = county.locationIds
                      .map((id) => byId.get(id))
                      .filter((l): l is Location => l != null);
                    if (locs.length === 0) return null;
                    return (
                      <div key={county.countySlug}>
                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                          {county.countyName}
                        </h3>
                        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                          {locs.map((loc) => (
                            <li key={loc.id}>
                              <Link
                                href={`/${primaryServiceSlug}/${loc.id}`}
                                className="block rounded-lg border border-transparent px-3 py-2.5 text-sm font-medium text-primary transition-[border-color,box-shadow] hover:border-primary/30 hover:bg-muted/40 hover:underline"
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
              </details>
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
