"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, ChevronDown, MapPin } from "lucide-react";
import type { Location, Service } from "../types";

export interface NearMeLocationListProps {
  service: Service;
  locations: Location[];
  /** Section heading above the list (e.g. "{service.title} areas we cover"). */
  sectionTitle?: string;
  /** Intro paragraph above search (e.g. "We provide drainage services across the UK. Select an area below..."). */
  introParagraph?: string;
  /** Search input label (e.g. "Find drain collapse repair near you"). */
  searchLabel?: string;
  /** Search input placeholder (e.g. "Enter postcode or town"). */
  searchPlaceholder?: string;
}

function normalizeForSearch(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function matchesQuery(loc: Location, query: string): boolean {
  if (!query.trim()) return true;
  const q = normalizeForSearch(query);
  const name = normalizeForSearch(loc.name);
  const area = normalizeForSearch(loc.area);
  const id = normalizeForSearch(loc.id.replace(/-/g, " "));
  return name.includes(q) || area.includes(q) || id.includes(q);
}

/** Groups locations by area; returns array of [regionName, locations]. */
function groupByArea(locations: Location[]): [string, Location[]][] {
  const byArea = new Map<string, Location[]>();
  for (const loc of locations) {
    const area = loc.area || "Other";
    if (!byArea.has(area)) byArea.set(area, []);
    byArea.get(area)!.push(loc);
  }
  return Array.from(byArea.entries()).sort(([a], [b]) => a.localeCompare(b));
}

export function NearMeLocationList({
  service,
  locations,
  sectionTitle,
  introParagraph,
  searchLabel,
  searchPlaceholder = "Enter postcode or town",
}: NearMeLocationListProps) {
  const [query, setQuery] = useState("");
  const title = sectionTitle ?? `${service.title} areas we cover`;
  const label = searchLabel ?? `Find ${service.title.toLowerCase()} near you`;

  const regions = useMemo(() => groupByArea(locations), [locations]);

  return (
    <section className="section-padding" aria-labelledby="near-me-locations-heading">
      <div className="container">
        <h2 id="near-me-locations-heading" className="mb-4 font-display text-2xl font-bold md:text-3xl">
          {title}
        </h2>
        {introParagraph && (
          <p className="mb-6 text-muted-foreground">{introParagraph}</p>
        )}

        {/* Search – client-side filter only; all links remain in DOM below */}
        <div className="mb-8">
          <label htmlFor="near-me-search" className="mb-2 block text-sm font-medium">
            {label}
          </label>
          <input
            id="near-me-search"
            type="search"
            role="searchbox"
            aria-label={label}
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 md:max-w-md"
          />
        </div>

        {/* Regional accordions – all links in DOM for SEO; non-matching hidden via class */}
        <div className="space-y-2">
          {regions.map(([areaName, areaLocations]) => {
            const visibleCount = query.trim()
              ? areaLocations.filter((loc) => matchesQuery(loc, query)).length
              : areaLocations.length;
            return (
              <details
                key={areaName}
                className="group rounded-xl border border-border/80 bg-background shadow-sm"
                open={!!query.trim() || undefined}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-left font-display font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary md:py-4">
                  <span>
                    {areaName}
                    {visibleCount > 0 && (
                      <span className="ml-2 text-sm font-normal text-muted-foreground">
                        ({visibleCount})
                      </span>
                    )}
                  </span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <ul className="grid border-t border-border/60 px-2 py-2 md:grid-cols-2 md:gap-2 md:px-3 md:py-3 lg:gap-3" role="list">
                  {areaLocations.map((loc) => {
                    const show = matchesQuery(loc, query);
                    return (
                      <li
                        key={loc.id}
                        className="location-list-item"
                        style={show ? undefined : { display: "none" }}
                      >
                        <Link
                          href={`/${service.slug}/${loc.id}`}
                          className="flex w-full items-center gap-3 rounded-lg border border-transparent bg-background px-3 py-3 text-left transition-[border-color,box-shadow,transform] hover:border-primary/40 hover:shadow-sm active:scale-[0.99] md:py-4 md:px-4"
                        >
                          <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                          <span className="min-w-0 flex-1 font-display font-medium text-foreground">
                            {service.title} {loc.name}
                          </span>
                          <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </details>
            );
          })}
        </div>

      </div>
    </section>
  );
}
