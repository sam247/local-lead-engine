import Link from "next/link";
import { services, locations, companyInfo } from "@/lib/data";
import { serviceImages } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Mail, ArrowRight } from "lucide-react";
import InspectionCTA from "@/components/sections/InspectionCTA";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { getServiceUrl, TrackablePhoneLink } from "engine";
import { verticalConfig } from "@/config";
import FAQSchema from "@/components/sections/FAQSchema";
type Service = (typeof services)[number];
type Location = (typeof locations)[number] & { nearbyTowns?: string[]; propertyTypes?: string };

interface LocationPageContentProps {
  service: Service;
  location: Location;
  serviceSlug: string;
  locationSlug: string;
}

export default function LocationPageContent({ service, location, serviceSlug, locationSlug }: LocationPageContentProps) {
  const sameAreaLocations = locations.filter((l) => l.id !== location.id && l.area === location.area);
  const nearbyLocations =
    sameAreaLocations.length >= 4
      ? sameAreaLocations.slice(0, 8)
      : [...sameAreaLocations, ...locations.filter((l) => l.id !== location.id && l.area !== location.area)].slice(0, 8);

  const localFaqs = [
    {
      question: `Do you provide ${service.title.toLowerCase()} services in ${location.name}?`,
      answer: `Yes. We connect you with qualified survey partners who carry out ${service.title.toLowerCase()} throughout ${location.name} and surrounding areas in ${location.area}.`,
    },
    {
      question: `Do I need a survey for planning permission in ${location.name}?`,
      answer: `In most cases, yes. Local planning authorities in ${location.area} typically require a topographical survey and sometimes a measured building survey as part of a planning application.`,
    },
    {
      question: `What does a topographical survey include in ${location.name}?`,
      answer: `A topographical survey captures ground levels, boundaries, buildings, trees, access routes and underground services across your site. The output is a scaled CAD drawing used by architects and engineers.`,
    },
    {
      question: `How long does a survey take to complete in ${location.name}?`,
      answer: `Most residential surveys in ${location.name} are completed in one to two days on site, with final drawings issued within five to ten working days depending on complexity.`,
    },
    {
      question: `Do you offer free quotes for surveys in ${location.name}?`,
      answer: `Absolutely. We provide free, no-obligation quotes for all survey types in ${location.name}. Contact us with your project details and we will recommend the right survey scope.`,
    },
  ];

  const locationWithExtras = location;
  const productPageLink =
    service.slug === "measured-building-survey" ||
    service.slug === "topographical-survey" ||
    service.slug === "laser-scanning-survey"
      ? {
          href: "/measured-building-survey",
          label: "Measured building survey service",
          description:
            "If you need as-built plans, elevations, or sections alongside this scope, our measured building survey service covers the wider deliverables.",
        }
      : null;

  return (
    <>
      <SchemaMarkup
        type="LocalBusiness"
        data={{ areaServed: `${location.name}, ${location.area}`, geo: { lat: location.lat, lng: location.lng } }}
      />
      <SchemaMarkup
        type="Service"
        data={{
          serviceName: service.title,
          serviceDescription: service.description,
          areaServed: `${location.name}, ${location.area}`,
          url: `/${serviceSlug}/${locationSlug}`,
        }}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: service.title, url: getServiceUrl(service.slug) },
            { name: `${service.title} in ${location.name}`, url: `/${serviceSlug}/${locationSlug}` },
          ],
        }}
      />

      <section className="relative bg-primary py-16 md:py-24">
        <div className="absolute inset-0">
          <img
            src={serviceImages[service.slug] ?? "/images/services/topographical-survey.jpg"}
            alt={`${service.title} in ${location.name}, ${location.area}`}
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">
              {service.title} in {location.name}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Trusted {service.title.toLowerCase()} experts serving {location.name} and {location.area}.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="highlight" asChild>
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
              <TrackablePhoneLink
                phone={companyInfo.phone}
                vertical={verticalConfig.verticalId}
                serviceSlug={service.slug}
                locationSlug={location.id}
                className="flex items-center gap-2 text-primary-foreground"
              >
                <Phone className="h-5 w-5" /> Call Now
              </TrackablePhoneLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-4 font-display text-2xl font-bold">
                {service.title} Services in {location.name}
              </h2>
              <p className="mb-6 text-muted-foreground">
                Mainline Surveys connects you with qualified survey partners for {service.title.toLowerCase()} in {location.name}, {location.area}. Professional land and drone surveying for architects, developers and property owners.
              </p>
              <p className="mb-8 text-muted-foreground">{service.description}</p>

              {productPageLink && (
                <div className="mb-8 rounded-lg border border-border bg-secondary/50 p-4">
                  <h3 className="mb-2 font-display text-lg font-bold">Need building measurement drawings?</h3>
                  <p className="mb-3 text-sm text-muted-foreground">{productPageLink.description}</p>
                  <Link href={productPageLink.href} className="inline-flex text-sm text-primary hover:underline">
                    {productPageLink.label} <ArrowRight className="ml-1 inline h-3 w-3" />
                  </Link>
                </div>
              )}

              {locationWithExtras.nearbyTowns && (
                <div className="mb-8 rounded-lg bg-secondary p-4">
                  <h3 className="mb-2 font-display text-lg font-bold">We Also Cover</h3>
                  <p className="text-sm text-muted-foreground">
                    {locationWithExtras.nearbyTowns.join(", ")} and surrounding areas in {location.area}.
                  </p>
                </div>
              )}

              {locationWithExtras.propertyTypes && (
                <div className="mb-8">
                  <h3 className="mb-2 font-display text-lg font-bold">Common Property Types in {location.name}</h3>
                  <p className="text-sm text-muted-foreground">{locationWithExtras.propertyTypes}</p>
                </div>
              )}

              <h3 className="mb-4 font-display text-xl font-bold">Why Choose Us for {service.title} in {location.name}?</h3>
              <ul className="mb-8 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" /> RICS-linked survey partners across {location.area}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" /> Topographical, measured building, utility and drone surveys
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" /> Fully insured with professional indemnity cover
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" /> Fixed-price quotes with no hidden fees
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" /> CAD, BIM and 3D deliverables to industry standards
                </li>
              </ul>

              <h3 className="mb-4 font-display text-xl font-bold">Our {service.title} Process</h3>
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

              <InspectionCTA />
            </div>

            <div className="space-y-6">
              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Contact Us</h3>
                <div className="space-y-3">
                  <TrackablePhoneLink
                    phone={companyInfo.phone}
                    vertical={verticalConfig.verticalId}
                    serviceSlug={service.slug}
                    locationSlug={location.id}
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Phone className="h-4 w-4" /> Call Now
                  </TrackablePhoneLink>
                  <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-2 text-primary hover:underline">
                    <Mail className="h-4 w-4" /> {companyInfo.email}
                  </a>
                </div>
                <Button asChild className="mt-4 w-full" variant="highlight">
                  <Link href="/contact">Get a Free Quote</Link>
                </Button>
              </div>

              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Nearby Areas We Cover</h3>
                <p className="mb-3 text-xs text-muted-foreground">
                  We also provide {service.title.toLowerCase()} in these areas:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {nearbyLocations.map((loc) => (
                    <Link key={loc.id} href={`/${service.slug}/${loc.id}`} className="text-sm text-primary hover:underline">
                      {loc.name} <ArrowRight className="inline h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Other Services</h3>
                <div className="space-y-2">
                  {services.filter((s) => s.id !== service.id).map((s) => (
                    <Link key={s.id} href={`/${s.slug}/${location.id}`} className="block text-sm text-primary hover:underline">
                      {s.title} in {location.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSchema items={localFaqs} title={`${service.title} FAQs for ${location.name}`} />

      <section className="bg-primary py-16">
        <div className="container text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground">
            Need {service.title} in {location.name}?
          </h2>
          <p className="mb-6 text-primary-foreground/80">Contact us today for a free, no-obligation quote.</p>
          <Button size="lg" variant="highlight" asChild>
            <Link href="/contact">Get Your Free Quote</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
