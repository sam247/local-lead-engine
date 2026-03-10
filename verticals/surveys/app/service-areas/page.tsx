import Link from "next/link";
import { locations } from "@/lib/data";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const PRIMARY_SERVICE_SLUG = "topographical-survey";

const MAJOR_CITY_IDS = [
  "london",
  "richmond",
  "wimbledon",
  "kingston",
  "kensington",
  "chelsea",
  "croydon",
  "bromley",
  "greenwich",
  "reading",
  "oxford",
  "brighton",
  "bristol",
  "bath",
  "watford",
  "st-albans",
  "milton-keynes",
  "luton",
  "slough",
  "maidstone",
];

export const metadata: Metadata = {
  title: "Service Areas | Mainline Surveys",
  description: "Land and drone survey services across the UK. Find topographical, measured building, utility and drone surveys in your area.",
  alternates: { canonical: "https://mainlinesurveys.co.uk/service-areas" },
};

export default function ServiceAreasPage() {
  const majorCities = MAJOR_CITY_IDS.map((id) => locations.find((l) => l.id === id)).filter((l): l is (typeof locations)[number] => l != null);

  return (
    <>
      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">
              Land &amp; Drone Survey Services Across the UK
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Topographical, measured building, utility and drone surveys in towns and cities nationwide.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <h2 className="mb-6 font-display text-2xl font-bold">Major Cities</h2>
          <p className="mb-6 text-muted-foreground">
            We provide land and drone survey services across the UK. Select your area for local information and quotes.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {majorCities.map((loc) => (
              <li key={loc.id}>
                <Link
                  href={`/${PRIMARY_SERVICE_SLUG}/${loc.id}`}
                  className="text-primary hover:underline"
                >
                  {loc.name} <span className="text-muted-foreground">({loc.area})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30 py-12">
        <div className="container">
          <h2 className="mb-4 font-display text-2xl font-bold">Browse by Location</h2>
          <p className="mb-4 text-muted-foreground">
            View all areas we cover and find survey services near you.
          </p>
          <Link
            href="/drain-collapse-near-me"
            className="inline-flex font-medium text-primary hover:underline"
          >
            View all areas →
          </Link>
        </div>
      </section>
    </>
  );
}
