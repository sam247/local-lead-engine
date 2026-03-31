import Link from "next/link";
import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyInfo, locations, services } from "@/lib/data";
import { verticalConfig } from "@/config";
import { TrackablePhoneLink } from "engine";
import CTABanner from "@/components/sections/CTABanner";
import { getTopicForRouteSlug } from "@/lib/topicLocationConfig";

export const dynamic = "force-static";
export const revalidate = false;

const pageSlug = "soakaway-installation";

const serviceConfigBySlug = new Map(services.map((service) => [service.slug, service]));
const locationNameById = new Map(locations.map((location) => [location.id, location.name]));
const locationIds = locations.map((location) => location.id);

const servicePriorityFallback = [
  "groundworks-contractors",
  "excavation-contractors",
  "foundation-contractors",
  "site-clearance-contractors",
  "enabling-works-contractors",
];

const preferredLocations = ["london", "manchester", "birmingham"];

function buildPageData() {
  const topic = getTopicForRouteSlug(pageSlug);
  if (!topic) return null;

  const includedPoints = [
    ...topic.typicalScenarios,
    ...topic.commonProblems.slice(0, Math.max(0, 5 - topic.typicalScenarios.length)),
  ].slice(0, 5);

  const costBands = [
    { label: "Small domestic soakaway", range: "£1,500–£4,000 + VAT", note: "Typical crate or rubble install to design." },
    { label: "Larger residential / light commercial", range: "£4,000–£12,000 + VAT", note: "Bigger drained area, deeper dig, more connections." },
    { label: "Attenuation / SuDS-linked scope", range: "£12,000+ + VAT", note: "Storage, flow control and adoption requirements." },
  ];

  const serviceFallback = {
    heroSubtitle: `${topic.intro.split(".")[0]}.`,
    intro: topic.intro,
    includedPoints,
    costBands,
    casePoints: topic.commonProblems,
    ctaLabel: topic.ctaText,
    ctaHeading: "Ready to install surface water disposal?",
  };

  return { topic, serviceFallback, pageTitle: topic.title, trackedServiceSlug: topic.primaryServiceSlug };
}

const pageData = buildPageData();
if (!pageData) {
  throw new Error("soakaway-installation: topic data missing");
}
const { pageTitle, serviceFallback, trackedServiceSlug } = pageData;
const serviceForPage = serviceConfigBySlug.get(trackedServiceSlug);

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
  title: `${pageTitle} | ${verticalConfig.siteName}`,
  description: `${serviceFallback.intro.slice(0, 155)}`,
  alternates: {
    canonical: `${verticalConfig.baseUrl}/${pageSlug}`,
  },
};

export default function SoakawayInstallationPage() {
  const sidebarBullets = serviceFallback.includedPoints;

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
              context={{
                service: trackedServiceSlug,
                page: `/${pageSlug}`,
                voiceWebhookPath: "/api/twilio/voice",
                vertical: verticalConfig.verticalId,
              }}
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
                {serviceFallback.casePoints.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <h2 className="mb-4 font-display text-2xl font-bold">{serviceFallback.ctaHeading}</h2>
              <p className="mb-4 text-muted-foreground">
                Get a clear quote for soakaway installation with commissioning and documentation for building control or adoption.
              </p>
              <div className="mb-8 flex flex-col gap-3 sm:flex-row">
                <TrackablePhoneLink
                  phone={companyInfo.phone}
                  vertical={verticalConfig.verticalId}
                  serviceSlug={trackedServiceSlug}
                  locationSlug={null}
                  pagePath={`/${pageSlug}`}
                  source="cta"
                  context={{
                    service: trackedServiceSlug,
                    page: `/${pageSlug}`,
                    voiceWebhookPath: "/api/twilio/voice",
                    vertical: verticalConfig.verticalId,
                  }}
                  className={phoneLinkClass}
                >
                  <Phone className="h-4 w-4" />
                  Call now
                </TrackablePhoneLink>
                <Button asChild variant="default">
                  <Link href="/contact">{serviceFallback.ctaLabel}</Link>
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
                  context={{
                    service: trackedServiceSlug,
                    page: `/${pageSlug}`,
                    voiceWebhookPath: "/api/twilio/voice",
                    vertical: verticalConfig.verticalId,
                  }}
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
