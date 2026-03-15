import Link from "next/link";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";
import { SchemaMarkup } from "../schema/SchemaMarkup";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { InspectionCTA } from "./InspectionCTA";
import { NearMeLocationList } from "./NearMeLocationList";
import type { Service, Location, CompanyInfo } from "../types";

export interface NearMePageProps {
  service: Service;
  locations: Location[];
  companyInfo: CompanyInfo;
  serviceImage: string;
  otherServices: Service[];
  baseUrl: string;
  pagePath: string;
  contactPath?: string;
  /** Intro for location section (e.g. "We provide drainage services across the UK. Select an area below..."). */
  introParagraph?: string;
  /** Section title above locations (e.g. "{service.title} by Location"). */
  sectionTitle?: string;
  /** Trust block heading (e.g. "Why choose MainLine Drains"). */
  trustBlockTitle?: string;
  /** Trust block bullet points. */
  trustBlockPoints?: string[];
  /** Conversion block heading above location list (e.g. "Need urgent drain repair?"). */
  conversionHeading?: string;
  /** Secondary CTA label (e.g. "Book CCTV Drain Survey"). */
  secondaryCtaLabel?: string;
  /** Secondary CTA path (defaults to contactPath). */
  secondaryCtaPath?: string;
}

export function NearMePage({
  service,
  locations,
  companyInfo,
  serviceImage,
  otherServices,
  baseUrl,
  pagePath,
  contactPath = "/contact",
  introParagraph,
  sectionTitle,
  trustBlockTitle,
  trustBlockPoints,
  conversionHeading,
  secondaryCtaLabel,
  secondaryCtaPath,
}: NearMePageProps) {
  const pageTitle = `${service.title} Near Me`;
  const secondaryPath = secondaryCtaPath ?? contactPath;

  return (
    <>
      <SchemaMarkup
        type="LocalBusiness"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{ areaServed: "London and surrounding areas" }}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: pageTitle, url: pagePath },
          ],
        }}
      />
      <section className="relative bg-primary py-16 md:py-24">
        <div className="absolute inset-0">
          <img
            src={serviceImage}
            alt={`Professional ${service.title.toLowerCase()} services near your location`}
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <BreadcrumbNav
              items={[
                { name: "Home", url: "/" },
                { name: pageTitle, url: pagePath },
              ]}
              variant="inverse"
            />
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">
              {pageTitle}
            </h1>
            <p className="mb-6 text-lg text-primary-foreground/80">
              Professional {service.title.toLowerCase()} services. Fast response, free quotes, and
              guaranteed workmanship.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="highlight" asChild>
                <Link href={contactPath}>Get a Free Quote</Link>
              </Button>
              <a
                href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-primary-foreground"
              >
                <Phone className="h-5 w-5" /> {companyInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust block – compact, mobile friendly */}
      {trustBlockTitle && trustBlockPoints && trustBlockPoints.length > 0 && (
        <section className="border-t border-border bg-secondary/30 py-8 md:py-10" aria-labelledby="near-me-trust-heading">
          <div className="container">
            <h2 id="near-me-trust-heading" className="mb-4 font-display text-xl font-bold md:text-2xl">
              {trustBlockTitle}
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground md:text-base">
              {trustBlockPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Conversion block – above location list */}
      {conversionHeading && (
        <section className="section-padding border-t border-border pt-8" aria-labelledby="near-me-conversion-heading">
          <div className="container">
            <h2 id="near-me-conversion-heading" className="mb-4 font-display text-xl font-bold md:text-2xl">
              {conversionHeading}
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button size="lg" variant="highlight" className="min-h-12 flex-1 sm:flex-initial" asChild>
                <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </Button>
              {secondaryCtaLabel && (
                <Button size="lg" variant="outline" className="min-h-12 flex-1 border-2 sm:flex-initial" asChild>
                  <Link href={secondaryPath}>
                    {secondaryCtaLabel}
                    <span className="ml-2" aria-hidden>→</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>
      )}

      <NearMeLocationList
        service={service}
        locations={locations}
        sectionTitle={sectionTitle}
        introParagraph={introParagraph}
        searchLabel={`Find ${service.title.toLowerCase()} near you`}
        searchPlaceholder="Enter postcode or town"
      />
      <section className="bg-secondary py-12">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 font-display text-2xl font-bold">
              About Our {service.title} Service
            </h2>
            <p className="mb-6 text-muted-foreground">{service.description}</p>
            <h3 className="mb-3 font-display text-lg font-bold">Why Choose Us?</h3>
            <ul className="mb-6 space-y-2">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 h-4 w-4 shrink-0 text-primary">→</span>
                  {b}
                </li>
              ))}
            </ul>
            <Button asChild>
              <Link href={`/services/${service.slug}`}>
                Learn More About {service.title}
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <h2 className="mb-8 text-center font-display text-2xl font-bold">
            Other Services Near You
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {otherServices.slice(0, 6).map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="rounded-lg border border-border p-4 transition-all hover:border-primary hover:shadow-md"
              >
                <h3 className="mb-1 font-display text-sm font-semibold">{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="container pb-12">
        <InspectionCTA companyInfo={companyInfo} contactPath={contactPath} />
      </div>
      <section className="bg-primary py-16">
        <div className="container text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground">
            Need {service.title} Near You?
          </h2>
          <p className="mb-6 text-primary-foreground/80">
            Contact us for fast, reliable services in your area.
          </p>
          <Button size="lg" variant="highlight" asChild>
            <Link href={contactPath}>Get Your Free Quote</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
