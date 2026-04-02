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

const pageSlug = "cctv-installation";
const serviceConfigBySlug = new Map(services.map((service) => [service.slug, service]));
const locationNameById = new Map(locations.map((location) => [location.id, location.name]));
const locationIds = locations.map((location) => location.id);

const servicePriorityFallback = [
  "commercial-cctv-installation",
  "access-control-systems",
  "ip-camera-systems",
  "perimeter-security-systems",
  "security-system-integration",
];

const preferredLocations = ["london", "manchester", "birmingham"];
const serviceFallback = {
  title: "CCTV Installation Services",
  heroSubtitle: "Deploy secure, reliable CCTV for commercial sites with a clear scope, installation plan and handover support.",
  intro:
    "Mainline Access delivers practical CCTV installation services for businesses and public-facing premises. We install, configure and commission systems quickly and keep the project aligned to your security requirements.",
  includedPoints: [
    "Site survey, camera placement planning and mounting strategy",
    "High-definition camera procurement and network readiness checks",
    "Cabling, recorder setup and remote access configuration",
    "Recording retention policy and staff handover documentation",
    "Optional integration with access control, alarms and monitoring",
  ],
  costBands: [
    { label: "Small commercial room/entry package", range: "£600–£1,200 + VAT", note: "Typical for single-site basics." },
    { label: "Multi-camera site package", range: "£1,200–£2,800 + VAT", note: "Coverage for offices, shops or small estates." },
    { label: "Enterprise scope with integration", range: "£2,800–£6,000 + VAT", note: "Larger CCTV and platform integration projects." },
  ],
  casePoints: [
    "New site opening where evidence capture is required",
    "Theft, vandalism or repeat access incidents",
    "Refurbishment, upgrade or blind-spot remediation",
    "Compliance and audit requirements in sensitive areas",
  ],
  ctaLabel: "Request CCTV Installation Quote",
  ctaHeading: "Ready to install now?",
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
    const preferredLocationOrder = orderedLocationIds.slice(0, 3);
    return preferredLocationOrder.map((locationId) => ({
      href: `/${slug}/${locationId}`,
      label: `${service.title} in ${locationNameById.get(locationId)}`,
      key: `${slug}-${locationId}`,
    }));
  });

const internalLinks = linkCandidates.slice(0, 5);

const phoneLinkClass =
  "inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline";

export const metadata: Metadata = {
  title: `${serviceFallback.title} | ${verticalConfig.siteName}`,
  description:
    "Need CCTV installation in London, Manchester or Birmingham? Request a local quote for commercial CCTV setup, commissioning and pricing from Mainline Access.",
  alternates: {
    canonical: `${verticalConfig.baseUrl}/${pageSlug}`,
  },
};

export default function CctvInstallationPage() {
  const sidebarBullets = serviceFallback.includedPoints.slice(0, 5);

  return (
    <main className="bg-background">
      <section className="border-b border-border/60 bg-muted/40 py-10">
        <div className="container">
          <h1 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">{`${pageTitle} | ${verticalConfig.siteName}`}</h1>
          <p className="mb-4 text-muted-foreground md:text-lg">{serviceFallback.heroSubtitle}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Get a quote</Link>
            </Button>
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
              {companyInfo.phone}
            </TrackablePhoneLink>
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
              <h2 className="mb-4 font-display text-2xl font-bold">{serviceFallback.ctaHeading}</h2>
              <p className="mb-4 text-muted-foreground">Get local commercial CCTV support from survey to commissioning, with a clear quote and launch date.</p>
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
                  className={phoneLinkClass}
                >
                  <Phone className="h-4 w-4" />
                  {companyInfo.phone}
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

            <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit rounded-xl border border-border bg-card p-5">
              <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Get a quote</h2>
              <div className="flex flex-col gap-3">
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
                  className={phoneLinkClass}
                >
                  <Phone className="h-4 w-4" />
                  {companyInfo.phone}
                </TrackablePhoneLink>
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
