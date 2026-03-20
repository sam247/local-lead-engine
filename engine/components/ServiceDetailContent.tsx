import Link from "next/link";
import { CheckCircle, ArrowRight, AlertTriangle } from "lucide-react";
import { SchemaMarkup } from "../schema/SchemaMarkup";
import { FAQSchema, type FAQItem } from "../schema/FAQSchema";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { MidContentCTA } from "./MidContentCTA";
import { InspectionCTA } from "./InspectionCTA";
import { CTABanner } from "./CTABanner";
import { ServiceImageGallery } from "./ServiceImageGallery";
import { Button } from "./ui/button";
import { SectionIntro } from "./SectionIntro";
import { ProcessTimeline } from "./ProcessTimeline";
import { TrustReassuranceStrip } from "./TrustReassuranceStrip";
import { ActionPanel } from "./ActionPanel";
import { getImageAlt } from "../utils/imageAlt";
import type { Service, Location, VerticalConfig } from "../types";

const DEFAULT_INDUSTRIES = [
  "Hospitals",
  "Data centres",
  "Warehouses",
  "Office buildings",
  "Manufacturing sites",
  "Commercial property",
];

export interface SymptomLink {
  slug: string;
  path: string;
  title: string;
}

export interface ServiceDetailContentProps {
  service: Service;
  services: Service[];
  locations: Location[];
  verticalConfig: VerticalConfig;
  heroImageSrc: string;
  contactPath?: string;
  servicesPath?: string;
  locationLinkPath?: (serviceSlug: string, locationId: string) => string;
  symptomLinks?: SymptomLink[];
  faqs?: FAQItem[];
  firstCtaMessage?: string;
  firstCtaButtonText?: string;
  firstCtaButtonLink?: string;
  secondCtaHeading?: string;
  secondCtaBody?: string;
  secondCtaButtonText?: string;
  galleryImages?: { src: string; alt?: string }[];
  overviewExtra?: React.ReactNode;
  /** Optional image block shown after Overview (before Types section). */
  overviewImage?: { src: string; alt: string };
  /** Optional override for the symptom/related-links section heading (e.g. "Related guides" for surveys). */
  symptomLinksSectionTitle?: string;
  /** Optional list of problem/issue pages to link to (e.g. "Drain problems we solve"). Rendered as crawlable links. */
  problemLinks?: { path: string; label: string }[];
  /** Optional heading for the problem links section (e.g. "Drain problems we solve"). */
  problemLinksSectionTitle?: string;
}

export function ServiceDetailContent({
  service,
  services,
  locations,
  verticalConfig,
  heroImageSrc,
  contactPath = "/contact",
  servicesPath = "/services",
  locationLinkPath = (slug, id) => `/${slug}/${id}`,
  symptomLinks = [],
  faqs = [],
  firstCtaMessage,
  firstCtaButtonText,
  firstCtaButtonLink = "/contact",
  secondCtaHeading,
  secondCtaBody,
  secondCtaButtonText,
  galleryImages = [],
  overviewExtra,
  overviewImage,
  symptomLinksSectionTitle,
  problemLinks = [],
  problemLinksSectionTitle,
}: ServiceDetailContentProps) {
  const displayTitle = service.titleSingular ?? service.title;
  const serviceTypes = verticalConfig.serviceTypesBySlug?.[service.slug] ?? [];
  const industries = verticalConfig.industries ?? DEFAULT_INDUSTRIES;
  const trustedEquipment = verticalConfig.trustedEquipment ?? [];
  const sectionIntros = verticalConfig.sectionIntros ?? {};
  const heroImageAlt =
    getImageAlt({
      service: displayTitle,
      noLocationSuffix: verticalConfig.imageAltNoLocationSuffix,
    });
  const relatedSidebarLabel = verticalConfig.relatedServicesLabel
    ? `Related ${verticalConfig.relatedServicesLabel} Services`
    : `Related ${verticalConfig.siteName} Services`;
  const trustPoints = [
    "Clear scope and practical recommendations",
    "Transparent pricing and documented next steps",
    "Reliable scheduling with minimal disruption",
    "Experienced teams aligned to site requirements",
  ];

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: servicesPath },
    { name: service.title, url: `${servicesPath}/${service.slug}` },
  ];

  return (
    <>
      <SchemaMarkup
        type="Service"
        companyInfo={verticalConfig.companyInfo}
        baseUrl={verticalConfig.baseUrl}
        data={{
          serviceName: service.title,
          serviceDescription: service.description,
          url: `${servicesPath}/${service.slug}`,
          areaServed: "London and surrounding areas",
          serviceType: service.title,
        }}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        companyInfo={verticalConfig.companyInfo}
        baseUrl={verticalConfig.baseUrl}
        data={{ breadcrumbs }}
      />

      <section className="relative bg-primary py-16 md:py-24">
        <div className="absolute inset-0">
          <img src={heroImageSrc} alt={heroImageAlt} className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <BreadcrumbNav items={breadcrumbs} variant="inverse" />
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">
              {displayTitle}
            </h1>
            <p className="text-lg text-primary-foreground/80">{service.shortDescription}</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SectionIntro
                title="Overview"
                description={`This service is designed to solve the underlying issue quickly and safely, while keeping disruption, uncertainty, and repeat costs to a minimum.`}
              />
              <p className="mb-8 text-muted-foreground">{service.description}</p>
              {overviewExtra && <div className="mb-8">{overviewExtra}</div>}
              {overviewImage && (
                <figure className="mb-8 overflow-hidden rounded-lg border border-border shadow-sm">
                  <img
                    src={overviewImage.src}
                    alt={overviewImage.alt}
                    className="h-auto w-full object-cover"
                  />
                </figure>
              )}
              <TrustReassuranceStrip points={trustPoints} />

              {serviceTypes.length > 0 && (
                <>
                  <SectionIntro
                    title={`Types of ${displayTitle}`}
                    description={
                      sectionIntros.types ??
                      "Choose the right scope based on site conditions, urgency, and long-term performance requirements."
                    }
                  />
                  <ul className="mb-8 list-disc space-y-2 pl-6 text-muted-foreground">
                    {serviceTypes.map((type, i) => (
                      <li key={i}>{type}</li>
                    ))}
                  </ul>
                </>
              )}

              <MidContentCTA
                companyInfo={verticalConfig.companyInfo}
                message={firstCtaMessage}
                buttonText={firstCtaButtonText}
                buttonLink={firstCtaButtonLink}
              />

              {symptomLinks.length > 0 && (
                <>
                  <SectionIntro
                    title={symptomLinksSectionTitle ?? `Common Signs You Need ${service.title}`}
                    description="If you notice these signs, acting early usually keeps costs down and reduces operational disruption."
                  />
                  <ul className="mb-8 space-y-2">
                    {symptomLinks.map((s) => (
                      <li key={s.slug} className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
                        <Link href={s.path} className="text-primary hover:underline">
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {problemLinks.length > 0 && problemLinksSectionTitle && (
                <>
                  <SectionIntro
                    title={problemLinksSectionTitle}
                    description="These related issues often lead to this service being commissioned as part of a complete fix."
                  />
                  <ul className="mb-8 space-y-2">
                    {problemLinks.map((link) => (
                      <li key={link.path}>
                        <Link href={link.path} className="text-primary hover:underline">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <SectionIntro
                title="Our Process"
                description={
                  sectionIntros.process ??
                  "Each stage is structured to keep decisions clear and delivery predictable from first assessment to sign-off."
                }
              />
              <ProcessTimeline steps={service.process} />

              <SectionIntro
                title="Industries We Work With"
                description={
                  sectionIntros.industries ??
                  "Our teams adapt this service to the compliance, access, and operational constraints of each environment."
                }
              />
              <ul className="mb-8 list-disc space-y-2 pl-6 text-muted-foreground">
                {industries.map((ind, i) => (
                  <li key={i}>{ind}</li>
                ))}
              </ul>

              {trustedEquipment.length > 0 && (
                <>
                  <SectionIntro
                    title="Trusted Systems and Equipment"
                    description="We use proven systems and tools selected for reliability, maintainability, and suitability to each job."
                  />
                  <ul className="mb-8 list-disc space-y-2 pl-6 text-muted-foreground">
                    {trustedEquipment.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {galleryImages.length > 0 && (
                <ServiceImageGallery
                  images={galleryImages}
                  imageAltFallback={() =>
                    getImageAlt({
                      service: displayTitle,
                      noLocationSuffix: verticalConfig.imageAltNoLocationSuffix,
                    })
                  }
                />
              )}

              <SectionIntro
                title="Benefits"
                description={
                  sectionIntros.benefits ??
                  "The outcomes below reflect what clients typically gain when this service is scoped and delivered correctly."
                }
              />
              <ul className="mb-8 space-y-2">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {(() => {
                const otherServices = services.filter((s) => s.slug !== service.slug);
                const featuredLocations = locations.slice(0, 12);
                const showRelatedServices =
                  otherServices.length > 0 && verticalConfig.relatedServicesIntro;
                const showRelatedLocations = featuredLocations.length > 0;
                if (!showRelatedServices && !showRelatedLocations) return null;
                return (
                  <div className="mb-8 space-y-8">
                    {showRelatedServices && (
                      <>
                        <SectionIntro
                          title={relatedSidebarLabel}
                          description={
                            verticalConfig.relatedServicesIntro ??
                            "Explore related services that are commonly scoped together for better overall outcomes."
                          }
                        />
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {otherServices.slice(0, 8).map((s) => (
                            <Link
                              key={s.id}
                              href={`${servicesPath}/${s.slug}`}
                              className="group rounded-lg border border-border bg-background p-4 transition-all hover:border-primary hover:shadow-md"
                            >
                              <h3 className="mb-1 font-display text-lg font-semibold group-hover:text-primary">
                                {s.title}
                              </h3>
                              {s.shortDescription && (
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {s.shortDescription}
                                </p>
                              )}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                    {showRelatedLocations && (
                      <>
                        <SectionIntro
                          title={`${service.title} by Location`}
                          description={
                            verticalConfig.relatedLocationsIntro ??
                            "Browse local coverage to find the nearest team for this service."
                          }
                        />
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          {featuredLocations.map((loc) => (
                            <Link
                              key={loc.id}
                              href={locationLinkPath(service.slug, loc.id)}
                              className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-primary transition-all hover:border-primary hover:shadow-md hover:underline"
                            >
                              {service.title} {loc.name}
                              <ArrowRight className="h-4 w-4 shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })()}

              <InspectionCTA
                companyInfo={verticalConfig.companyInfo}
                contactPath={contactPath}
                heading={secondCtaHeading}
                body={secondCtaBody}
                ctaText={secondCtaButtonText}
              />
              <ActionPanel
                companyInfo={verticalConfig.companyInfo}
                contactPath={contactPath}
                heading={`Discuss your ${displayTitle.toLowerCase()} requirements`}
                body="Share your site details and goals. We will recommend the right scope and provide a clear quote."
                ctaText="Book a Site Survey"
              />
            </div>

            <div className="space-y-6">
              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">{relatedSidebarLabel}</h3>
                <ul className="space-y-2">
                  {services
                    .filter((s) => s.slug !== service.slug)
                    .slice(0, 6)
                    .map((s) => (
                      <li key={s.id}>
                        <Link
                          href={`${servicesPath}/${s.slug}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Areas We Cover</h3>
                <div className="grid grid-cols-2 gap-2">
                  {locations.map((loc) => (
                    <Link
                      key={loc.id}
                      href={locationLinkPath(service.slug, loc.id)}
                      className="text-sm text-primary hover:underline"
                    >
                      {loc.name} <ArrowRight className="inline h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>
              <Button asChild className="w-full" variant="highlight">
                <Link href={contactPath}>Get a Free Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <FAQSchema items={faqs} title={`${service.title} FAQ`} />
      )}

      <CTABanner
        companyInfo={verticalConfig.companyInfo}
        contactPath={contactPath}
      />
    </>
  );
}
