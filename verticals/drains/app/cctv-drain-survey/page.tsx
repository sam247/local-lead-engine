import Link from "next/link";
import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyInfo, locations, services } from "@/lib/data";
import { verticalConfig } from "@/config";
import { TrackablePhoneLink } from "engine";

export const dynamic = "force-static";
export const revalidate = false;

const pageSlug = "cctv-drain-survey";

const serviceConfigBySlug = new Map(services.map((service) => [service.slug, service]));
const locationNameById = new Map(locations.map((location) => [location.id, location.name]));
const locationIds = locations.map((location) => location.id);
const servicePriorityFallback = [
  "cctv-drain-surveys",
  "drain-collapse-repair",
  "drain-excavation",
  "drain-relining",
  "drain-root-removal",
];

const preferredLocations = ["london", "manchester", "birmingham"];
const serviceFallback = {
  title: "CCTV Drain Survey Services",
  heroSubtitle: "Get a fast, practical assessment of your drainage system, with no unnecessary excavation and clear next-step recommendations.",
  intro:
    "Mainline Drains provides local CCTV drain survey support to identify blockages, collapses and damage quickly. We then guide you to the right remedy so you can move from diagnosis to repair with confidence.",
  includedPoints: [
    "Camera inspection of access points, inspection chambers and pipe runs",
    "Condition reporting with fault location and likely cause",
    "Clear options for relining, jetting or excavation",
    "Prioritised recommendations based on risk and disruption",
    "Advice for insurance claims and onward contractors",
  ],
  costBands: [
    { label: "Residential priority survey", range: "£150–£300 + VAT", note: "Typical single-property scope." },
    { label: "Complex property survey", range: "£300–£550 + VAT", note: "Additional chambers or deep access points." },
    { label: "Multiple area survey", range: "£550–£900 + VAT", note: "Commercial blocks and larger run lengths." },
  ],
  casePoints: [
    "Recurring foul smells or backup symptoms",
    "Repeated blockages after previous clearance",
    "Property sale or refinance with drain condition risks",
    "Planning new work that may intersect existing drainage",
  ],
  ctaLabel: "Get a Drain Survey Quote",
  ctaHeading: "Need to book a drain survey quickly?",
};

const serviceForPage = serviceConfigBySlug.get(pageSlug);
const pageTitle = serviceForPage?.title ?? serviceFallback.title;
const trackedServiceSlug = serviceForPage?.slug ?? pageSlug;

const servicePriority = serviceForPage
  ? [serviceForPage.slug, ...servicePriorityFallback.filter((slug) => slug !== serviceForPage.slug)]
  : servicePriorityFallback;
const uniqueServicePriority = servicePriority.filter((slug, index, arr) => arr.indexOf(slug) === index);

const orderedLocationIds = preferredLocations.filter((locationId) => locationNameById.has(locationId));
locationIds.forEach((locationId) => {
  if (locationNameById.has(locationId) && !orderedLocationIds.includes(locationId)) {
    orderedLocationIds.push(locationId);
  }
});

const linkCandidates = uniqueServicePriority
  .filter((slug) => serviceConfigBySlug.has(slug))
  .flatMap((slug) => {
    const service = serviceConfigBySlug.get(slug);
    if (!service) return [];

    const validLocationIds = orderedLocationIds.slice(0, 3);

    return validLocationIds.map((locationId) => ({
      href: `/${slug}/${locationId}`,
      label: `${service.title} in ${locationNameById.get(locationId)}`,
      key: `${slug}-${locationId}`,
    }));
  })
  ;

const internalLinks = linkCandidates.slice(0, 5);

export const metadata: Metadata = {
  title: `${pageTitle} | ${verticalConfig.siteName}`,
  description:
    "Need CCTV drain survey support in London, Manchester or Birmingham? Request a local quote for practical inspection and next-step pricing from Mainline Drains.",
  alternates: {
    canonical: `${verticalConfig.baseUrl}/${pageSlug}`,
  },
};

export default function CctvDrainSurveyPage() {
  return (
    <main className="bg-background">
      <section className="section-padding">
        <div className="container max-w-4xl">
          <h1 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">{`${pageTitle} | ${verticalConfig.siteName}`}</h1>
          <p className="mb-4 text-muted-foreground md:text-lg">{serviceFallback.heroSubtitle}</p>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/contact">Get a quote</Link>
            </Button>
            <TrackablePhoneLink
              phone={companyInfo.phone}
              vertical={verticalConfig.verticalId}
              serviceSlug={trackedServiceSlug}
              locationSlug={null}
              pagePath={`/${pageSlug}`}
              source="cta"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Phone className="h-4 w-4" />
              Call now
            </TrackablePhoneLink>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container max-w-4xl">
          <p className="text-muted-foreground">{serviceFallback.intro}</p>
          <h2 className="mt-8 mb-4 font-display text-2xl font-bold">What this service includes</h2>
          <ul className="space-y-2">
            {serviceFallback.includedPoints.map((point) => (
              <li key={point} className="flex items-start gap-2 text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {point}
              </li>
            ))}
          </ul>
          <h2 className="mt-8 mb-4 font-display text-2xl font-bold">Typical costs</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {serviceFallback.costBands.map((band) => (
              <div key={band.label} className="rounded-lg border border-border bg-secondary p-4">
                <p className="text-sm font-semibold text-foreground">{band.label}</p>
                <p className="mt-1 text-lg font-bold text-primary">{band.range}</p>
                <p className="mt-2 text-sm text-muted-foreground">{band.note}</p>
              </div>
            ))}
          </div>
          <h2 className="mt-8 mb-4 font-display text-2xl font-bold">When you need this</h2>
          <ul className="mb-8 space-y-2">
            {serviceFallback.casePoints.map((item) => (
              <li key={item} className="flex items-start gap-2 text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
          <h2 className="mb-4 font-display text-2xl font-bold">{serviceFallback.ctaHeading}</h2>
          <p className="mb-4 text-muted-foreground">Get this job started today with a direct quote and clear repair direction from a local service team.</p>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="default">
              <Link href="/contact">{serviceFallback.ctaLabel}</Link>
            </Button>
            <TrackablePhoneLink
              phone={companyInfo.phone}
              vertical={verticalConfig.verticalId}
              serviceSlug={trackedServiceSlug}
              locationSlug={null}
              pagePath={`/${pageSlug}`}
              source="cta"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Phone className="h-4 w-4" />
              Call now
            </TrackablePhoneLink>
          </div>
          <h2 className="mb-4 font-display text-2xl font-bold">Related local services</h2>
          <ul className="grid gap-3">
            {internalLinks.map((link) => (
              <li key={link.key}>
                <Link href={link.href} className="inline-flex text-muted-foreground transition-colors hover:text-primary">
                  {link.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
