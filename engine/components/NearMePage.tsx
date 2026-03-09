import Link from "next/link";
import { Button } from "./ui/button";
import { Phone, MapPin } from "lucide-react";
import { SchemaMarkup } from "../schema/SchemaMarkup";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { InspectionCTA } from "./InspectionCTA";
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
}: NearMePageProps) {
  const pageTitle = `${service.title} Near Me`;
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
      <section className="section-padding">
        <div className="container">
          <h2 className="mb-8 text-center font-display text-3xl font-bold">
            Areas We Cover for {service.title}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {locations.map((loc) => (
              <Link
                key={loc.id}
                href={`/${service.slug}/${loc.id}`}
                className="group rounded-lg border border-border p-4 text-center transition-all hover:border-primary hover:shadow-md"
              >
                <MapPin className="mx-auto mb-2 h-5 w-5 text-primary" />
                <span className="font-display text-sm font-semibold group-hover:text-primary">
                  {loc.name}
                </span>
                <p className="mt-1 text-xs text-muted-foreground">{loc.area}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
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
