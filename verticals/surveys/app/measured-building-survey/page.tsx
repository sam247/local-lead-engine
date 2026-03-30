import Link from "next/link";
import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyInfo, locations, services } from "@/lib/data";
import { verticalConfig } from "@/config";
import { TrackablePhoneLink } from "engine";
import CTABanner from "@/components/sections/CTABanner";

export const dynamic = "force-static";
export const revalidate = false;

const pageSlug = "measured-building-survey";
const serviceConfigBySlug = new Map(services.map((service) => [service.slug, service]));
const locationNameById = new Map(locations.map((location) => [location.id, location.name]));
const locationIds = locations.map((location) => location.id);

const servicePriorityFallback = [
  "measured-building-survey",
  "topographical-survey",
  "utility-survey",
  "laser-scanning-survey",
  "drone-building-inspection",
];

const preferredLocations = ["london", "manchester", "birmingham"];
const serviceFallback = {
  title: "Measured Building Survey Services",
  heroSubtitle: "Deliver accurate as-built measurements and practical drawings for extension, refurbishment and retrofit projects.",
  intro:
    "Mainline Surveys provides local measured building survey support across the UK with reliable output formats and clear project handover documentation.",
  includedPoints: [
    "Internal and external dimension capture of the current structure",
    "Plan, elevation and section outputs in clear CAD-ready format",
    "Point cloud or scanned data for design and verification workflows",
    "Consistent accuracy checks and project-focused delivery notes",
    "Coordination support for structural, M&E and planning teams",
  ],
  costBands: [
    { label: "Small domestic rerun or extension baseline", range: "£550–£1,400 + VAT", note: "Typically 1–2 room scope." },
    { label: "Commercial refurbishment baseline", range: "£1,200–£2,800 + VAT", note: "Larger floor plans and coordinated output." },
    { label: "Large complex premises", range: "£2,800–£5,500 + VAT", note: "Detailed sections, multiple levels and high accuracy." },
  ],
  casePoints: [
    "Apartment conversion planning that needs as-existing measurements",
    "Commercial fit-outs where dimensions and clearance matter",
    "Retrofit or maintenance work with tight building access windows",
    "Pre-construction design and planning verification",
  ],
  ctaLabel: "Request Survey Quote",
  ctaHeading: "Need dependable measurement data fast?",
};

const serviceForPage = serviceConfigBySlug.get(pageSlug);
const pageTitle = serviceForPage ? serviceForPage.title : serviceFallback.title;
const trackedServiceSlug = serviceForPage?.slug ?? pageSlug;
const pageCtaHeading = serviceForPage ? `${serviceForPage.title} for your site measurements` : serviceFallback.ctaHeading;
const pageCtaLabel = serviceForPage ? `Request ${serviceForPage.title} Quote` : serviceFallback.ctaLabel;
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
    const preferredLocationOrder = orderedLocationIds.slice(0, 3);
    return preferredLocationOrder.map((locationId) => ({
      href: `/${slug}/${locationId}`,
      label: `${service.title} in ${locationNameById.get(locationId)}`,
      key: `${slug}-${locationId}`,
    }));
  });

const internalLinks = linkCandidates.slice(0, 5);

const phoneLinkClass =
  "inline-flex items-center justify-center gap-2 rounded-md border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90";

export const metadata: Metadata = {
  title: `${serviceFallback.title} | ${verticalConfig.siteName}`,
  description:
    "Need measured building survey support in London, Manchester or Birmingham? Request a local quote for precise as-built measurement, planning-ready drawings and survey deliverables.",
  alternates: {
    canonical: `${verticalConfig.baseUrl}/${pageSlug}`,
  },
};

export default function MeasuredBuildingSurveyPage() {
  const sidebarBullets = serviceFallback.includedPoints.slice(0, 5);

  return (
    <main className="bg-background">
      <section className="border-b border-border/60 bg-muted/40 py-10">
        <div className="container">
          <h1 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">{`${pageTitle} | ${verticalConfig.siteName}`}</h1>
          <p className="mb-4 text-muted-foreground md:text-lg">{serviceFallback.heroSubtitle}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <TrackablePhoneLink
              phone={companyInfo.phone}
              vertical={verticalConfig.verticalId}
              serviceSlug={trackedServiceSlug}
              locationSlug={null}
              pagePath={`/${pageSlug}`}
              source="cta"
              className={phoneLinkClass}
            >
              <Phone className="h-4 w-4" />
              Call now
            </TrackablePhoneLink>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Get a quote</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
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
                {serviceFallback.casePoints.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {point}
                  </li>
                ))}
              </ul>
              <h2 className="mb-4 font-display text-2xl font-bold">{pageCtaHeading}</h2>
              <p className="mb-4 text-muted-foreground">Use our local survey team to move design and build plans forward with dependable measured data and clear timelines.</p>
              <div className="mb-8 flex flex-col gap-3 sm:flex-row">
                <TrackablePhoneLink
                  phone={companyInfo.phone}
                  vertical={verticalConfig.verticalId}
                  serviceSlug={trackedServiceSlug}
                  locationSlug={null}
                  pagePath={`/${pageSlug}`}
                  source="cta"
                  className={phoneLinkClass}
                >
                  <Phone className="h-4 w-4" />
                  Call now
                </TrackablePhoneLink>
                <Button asChild variant="default">
                  <Link href="/contact">{pageCtaLabel}</Link>
                </Button>
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

            <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit rounded-xl border border-border bg-card p-5">
              <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Get a quote</h2>
              <div className="flex flex-col gap-3">
                <TrackablePhoneLink
                  phone={companyInfo.phone}
                  vertical={verticalConfig.verticalId}
                  serviceSlug={trackedServiceSlug}
                  locationSlug={null}
                  pagePath={`/${pageSlug}`}
                  source="cta"
                  className={phoneLinkClass}
                >
                  <Phone className="h-4 w-4" />
                  Call now
                </TrackablePhoneLink>
                <Button asChild>
                  <Link href="/contact">Get a quote</Link>
                </Button>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {sidebarBullets.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
