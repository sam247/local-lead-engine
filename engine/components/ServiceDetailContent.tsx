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
}: ServiceDetailContentProps) {
  const displayTitle = service.titleSingular ?? service.title;
  const serviceTypes = verticalConfig.serviceTypesBySlug?.[service.slug] ?? [];
  const industries = verticalConfig.industries ?? DEFAULT_INDUSTRIES;
  const trustedEquipment = verticalConfig.trustedEquipment ?? [];
  const sectionIntros = verticalConfig.sectionIntros ?? {};
  const relatedSidebarLabel = verticalConfig.relatedServicesLabel
    ? `Related ${verticalConfig.relatedServicesLabel} Services`
    : `Related ${verticalConfig.siteName} Services`;

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
          <img src={heroImageSrc} alt="" className="h-full w-full object-cover opacity-20" />
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
              <h2 className="mb-4 font-display text-2xl font-bold">Overview</h2>
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

              {serviceTypes.length > 0 && (
                <>
                  <h2 className="mb-4 font-display text-2xl font-bold">
                    Types of {displayTitle}
                  </h2>
                  {sectionIntros.types && (
                    <p className="mb-4 text-muted-foreground">{sectionIntros.types}</p>
                  )}
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
                  <h3 className="mb-4 font-display text-xl font-bold">
                    {symptomLinksSectionTitle ?? `Common Signs You Need ${service.title}`}
                  </h3>
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

              <h3 className="mb-4 font-display text-xl font-bold">Our Process</h3>
              {sectionIntros.process && (
                <p className="mb-4 text-muted-foreground">{sectionIntros.process}</p>
              )}
              <ol className="mb-8 space-y-3">
                {service.process.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>

              <h3 className="mb-4 font-display text-xl font-bold">Industries We Work With</h3>
              {sectionIntros.industries && (
                <p className="mb-4 text-muted-foreground">{sectionIntros.industries}</p>
              )}
              <ul className="mb-8 list-disc space-y-2 pl-6 text-muted-foreground">
                {industries.map((ind, i) => (
                  <li key={i}>{ind}</li>
                ))}
              </ul>

              {trustedEquipment.length > 0 && (
                <>
                  <h3 className="mb-4 font-display text-xl font-bold">
                    Trusted Systems and Equipment
                  </h3>
                  <ul className="mb-8 list-disc space-y-2 pl-6 text-muted-foreground">
                    {trustedEquipment.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {galleryImages.length > 0 && (
                <ServiceImageGallery images={galleryImages} />
              )}

              <h3 className="mb-4 font-display text-xl font-bold">Benefits</h3>
              {sectionIntros.benefits && (
                <p className="mb-4 text-muted-foreground">{sectionIntros.benefits}</p>
              )}
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
                const featuredLocations = locations.slice(0, 6);
                const showRelatedServices =
                  otherServices.length > 0 && verticalConfig.relatedServicesIntro;
                const showRelatedLocations = featuredLocations.length > 0;
                if (!showRelatedServices && !showRelatedLocations) return null;
                return (
                  <div className="mb-8 space-y-8">
                    {showRelatedServices && (
                      <>
                        <h2 className="mb-4 font-display text-2xl font-bold">
                          {relatedSidebarLabel}
                        </h2>
                        <p className="mb-4 text-muted-foreground">
                          {verticalConfig.relatedServicesIntro}
                        </p>
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
                        <h3 className="mb-4 font-display text-xl font-bold">
                          {service.title} by Location
                        </h3>
                        <p className="mb-4 text-muted-foreground">
                          {verticalConfig.relatedLocationsIntro ??
                            "We serve the following areas."}
                        </p>
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
