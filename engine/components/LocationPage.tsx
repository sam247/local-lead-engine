import Link from "next/link";
import { Button } from "./ui/button";
import { CheckCircle, Phone, Mail, ArrowRight } from "lucide-react";
import { SchemaMarkup } from "../schema/SchemaMarkup";
import { FAQSchema, type FAQItem } from "../schema/FAQSchema";
import { InspectionCTA } from "./InspectionCTA";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { MapEmbed } from "./MapEmbed";
import { LocationContext } from "./LocationContext";
import { NearbyAreas } from "./NearbyAreas";
import type { Service, Location, CompanyInfo } from "../types";

const locationBreadcrumbs = (
  serviceTitle: string,
  serviceSlug: string,
  locationName: string,
  serviceSlugParam: string,
  locationSlugParam: string
) => [
  { name: "Home", url: "/" },
  { name: serviceTitle, url: `/services/${serviceSlug}` },
  { name: `${serviceTitle} in ${locationName}`, url: `/${serviceSlugParam}/${locationSlugParam}` },
];

export interface LocationPageProps {
  service: Service;
  location: Location;
  serviceSlug: string;
  locationSlug: string;
  sameAreaLocations: Location[];
  nearbyLocations: Location[];
  localFaqs: FAQItem[];
  companyInfo: CompanyInfo;
  otherServices: Service[];
  baseUrl: string;
  serviceImage: string;
  contactPath?: string;
  /** Optional trust section: title and bullet points (e.g. "Trusted Drain Engineers in Camden"). */
  trustSectionTitle?: string;
  trustPoints?: string[];
  /** Path to diagnosis tool page (e.g. /collapsed-drains-complete-guide). Button links to path#diagnosis. */
  diagnosisGuidePath?: string;
  /** Show map embed in sidebar. Default true when location has coordinates. */
  showMap?: boolean;
  /** Optional intro paragraph describing the service in this location (above main content). */
  introParagraph?: string;
  /** Optional description for the "Nearby Areas We Serve" block (e.g. "Compare our {service} in nearby areas"). */
  nearbyAreasDescription?: string;
  /** Up to 5 neighbour locations for local context block and "Nearby service areas" links. When provided, LocationContext and NearbyAreas are rendered after the intro paragraph. */
  neighbourLocationsForContext?: Location[];
  /** Optional 60–100 word paragraph for the Location Context section (H2 + paragraph). When provided, LocationContext uses it instead of the default short text. */
  locationContextParagraph?: string;
  /** Optional 2–3 projects near this location for "Recent Projects Near {Location}" block. Each url typically points to /projects or /projects#id. */
  nearbyProjects?: Array<{ id: string; title: string; description: string; image: string; url: string }>;
}

export function LocationPage({
  service,
  location,
  serviceSlug,
  locationSlug,
  nearbyLocations,
  localFaqs,
  companyInfo,
  otherServices,
  baseUrl,
  serviceImage,
  contactPath = "/contact",
  trustSectionTitle,
  trustPoints,
  diagnosisGuidePath,
  showMap = true,
  introParagraph,
  nearbyAreasDescription,
  neighbourLocationsForContext,
  locationContextParagraph,
  nearbyProjects,
}: LocationPageProps) {
  const showMapEmbed = showMap && typeof location.lat === "number" && typeof location.lng === "number";
  const displayTitle = service.titleSingular ?? service.title;
  return (
    <>
      <SchemaMarkup
        type="LocalBusiness"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          areaServed: `${location.name}, ${location.area}`,
          geo: { lat: location.lat, lng: location.lng },
          serviceType: service.title,
        }}
      />
      <SchemaMarkup
        type="Service"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          serviceName: service.title,
          serviceDescription: service.description,
          areaServed: `${location.name}, ${location.area}`,
          url: `/${serviceSlug}/${locationSlug}`,
        }}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          breadcrumbs: locationBreadcrumbs(displayTitle, service.slug, location.name, serviceSlug, locationSlug),
        }}
      />

      <section className="relative bg-primary py-16 md:py-24">
        <div className="absolute inset-0">
          <img
            src={serviceImage}
            alt={`${displayTitle} engineer working in ${location.name}, ${location.area}`}
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <BreadcrumbNav
              items={locationBreadcrumbs(displayTitle, service.slug, location.name, serviceSlug, locationSlug)}
              variant="inverse"
            />
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">
              {displayTitle} in {location.name}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Trusted {service.title.toLowerCase()} experts serving {location.name} and {location.area}.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="highlight" asChild>
                <Link href={contactPath}>Get a Free Quote</Link>
              </Button>
              <a
                href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-primary-foreground"
              >
                <Phone className="h-5 w-5" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {diagnosisGuidePath && (
        <section className="border-b border-border bg-secondary/30 py-6">
          <div className="container">
            <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-6">
              <p className="text-muted-foreground">Not sure what&apos;s wrong with your drains?</p>
              <Button asChild variant="outline" size="sm">
                <Link href={`${diagnosisGuidePath}#diagnosis`}>Use our free diagnosis tool</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      <section className="section-padding">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-4 font-display text-2xl font-bold">
                {displayTitle} Services in {location.name}
              </h2>
              {introParagraph ? (
                <p className="mb-6 text-muted-foreground">{introParagraph}</p>
              ) : (
                <p className="mb-6 text-muted-foreground">
                  Expert {service.title.toLowerCase()} services to residential and commercial clients in {location.name}, {location.area}. Our experienced engineers deliver fast, reliable solutions tailored to your property&apos;s specific needs.
                </p>
              )}
              {neighbourLocationsForContext && neighbourLocationsForContext.length > 0 && (
                <>
                  <LocationContext
                    serviceTitle={displayTitle}
                    locationName={location.name}
                    locationArea={location.area}
                    neighbourNames={neighbourLocationsForContext.map((l) => l.name)}
                    contextParagraph={locationContextParagraph}
                  />
                  <NearbyAreas
                    serviceSlug={serviceSlug}
                    serviceTitle={displayTitle}
                    neighbourLocations={neighbourLocationsForContext.slice(0, 8).map((l) => ({ id: l.id, name: l.name }))}
                  />
                </>
              )}
              <p className="mb-8 text-muted-foreground">{service.description}</p>

              {location.nearbyTowns && location.nearbyTowns.length > 0 && (
                <div className="mb-8 rounded-lg bg-secondary p-4">
                  <h3 className="mb-2 font-display text-lg font-bold">We Also Cover</h3>
                  <p className="text-sm text-muted-foreground">
                    {location.nearbyTowns.join(", ")} and surrounding areas in {location.area}.
                  </p>
                </div>
              )}

              {location.propertyTypes && (
                <div className="mb-8">
                  <h3 className="mb-2 font-display text-lg font-bold">
                    Common Property Types in {location.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{location.propertyTypes}</p>
                </div>
              )}

              <h3 className="mb-4 font-display text-xl font-bold">
                Why Choose Us for {displayTitle} in {location.name}?
              </h3>
              <ul className="mb-8 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" /> Local expertise in {location.area}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" /> 24/7 emergency response
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" /> Fully insured with guarantees
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" /> Free surveys and no-obligation quotes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" /> Transparent, competitive pricing
                </li>
              </ul>

              {trustSectionTitle && trustPoints && trustPoints.length > 0 && (
                <div className="mb-8 rounded-lg border border-border bg-secondary/50 p-6">
                  <h3 className="mb-4 font-display text-xl font-bold">{trustSectionTitle}</h3>
                  <ul className="space-y-2">
                    {trustPoints.map((point, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <h3 className="mb-4 font-display text-xl font-bold">Our {displayTitle} Process</h3>
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

              {nearbyProjects && nearbyProjects.length > 0 && (
                <>
                  <h3 className="mb-4 font-display text-xl font-bold">
                    Recent Projects Near {location.name}
                  </h3>
                  <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {nearbyProjects.slice(0, 3).map((project) => (
                      <Link
                        key={project.id}
                        href={project.url}
                        className="group rounded-lg border border-border bg-background overflow-hidden transition-all hover:border-primary hover:shadow-md"
                      >
                        <div className="aspect-video w-full overflow-hidden bg-muted">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="mb-1 font-display font-semibold group-hover:text-primary">
                            {project.title}
                          </h4>
                          <p className="line-clamp-2 text-sm text-muted-foreground">
                            {project.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              <InspectionCTA companyInfo={companyInfo} contactPath={contactPath} />
            </div>

            <div className="space-y-6">
              {showMapEmbed && (
                <div className="rounded-lg overflow-hidden">
                  <MapEmbed
                    lat={location.lat}
                    lng={location.lng}
                    height={250}
                    title={`Map of ${location.name}, ${location.area}`}
                  />
                </div>
              )}
              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Contact Us</h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Phone className="h-4 w-4" /> Call Now
                  </a>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" /> {companyInfo.email}
                  </a>
                </div>
                <Button asChild className="mt-4 w-full" variant="highlight">
                  <Link href={contactPath}>Get a Free Quote</Link>
                </Button>
              </div>

              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Nearby Areas We Cover</h3>
                <p className="mb-3 text-xs text-muted-foreground">
                  We also provide {service.title.toLowerCase()} in these areas:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {nearbyLocations.map((loc) => (
                    <Link
                      key={loc.id}
                      href={`/${service.slug}/${loc.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {loc.name} <ArrowRight className="inline h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Other Services</h3>
                <div className="space-y-2">
                  {otherServices.map((s) => (
                    <Link
                      key={s.id}
                      href={`/${s.slug}/${location.id}`}
                      className="block text-sm text-primary hover:underline"
                    >
                      {s.title} in {location.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSchema items={localFaqs} title={`${displayTitle} FAQs for ${location.name}`} />

      <section className="bg-secondary/50 py-12">
        <div className="container">
          <h2 className="mb-6 font-display text-2xl font-bold text-center">
            Nearby Areas We Serve
          </h2>
          {nearbyAreasDescription && (
            <p className="mb-4 text-center text-sm text-muted-foreground">
              {nearbyAreasDescription}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {nearbyLocations.slice(0, 8).map((loc) => (
              <Link
                key={loc.id}
                href={`/${service.slug}/${loc.id}`}
                className="text-primary hover:underline"
              >
                {displayTitle} in {loc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container">
          <h2 className="mb-6 font-display text-2xl font-bold text-center">
            Other Services in {location.name}
          </h2>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {otherServices.map((s) => (
              <Link
                key={s.id}
                href={`/${s.slug}/${location.id}`}
                className="text-primary hover:underline"
              >
                {s.title} in {location.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="container text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground">
            Need {displayTitle} in {location.name}?
          </h2>
          <p className="mb-6 text-primary-foreground/80">
            Contact us today for a free, no-obligation quote.
          </p>
          <Button size="lg" variant="highlight" asChild>
            <Link href={contactPath}>Get Your Free Quote</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
