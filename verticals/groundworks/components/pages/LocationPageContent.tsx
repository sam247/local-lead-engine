import Link from "next/link";
import { services, locations, companyInfo } from "@/lib/data";
import { getHeroImage } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Mail, ArrowRight } from "lucide-react";
import InspectionCTA from "@/components/sections/InspectionCTA";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { getServiceUrl } from "engine";
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
      question: `Do you provide ${service.title.toLowerCase()} in ${location.name}?`,
      answer: `Yes, we provide comprehensive ${service.title.toLowerCase()} services throughout ${location.name} and surrounding areas in ${location.area}.`,
    },
    {
      question: `What groundworks do I need for a new build in ${location.name}?`,
      answer: `The groundworks required depend on your site conditions and project scope. Typical new-build groundworks in ${location.name} include site clearance, excavation, foundations, and drainage installation. We carry out a full site assessment to recommend the right approach.`,
    },
    {
      question: `How long do foundations take to complete in ${location.name}?`,
      answer: `Foundation timescales vary by type and ground conditions. Strip foundations typically take 1–2 weeks, while piled foundations may take 2–4 weeks. We provide a detailed programme once we've assessed your ${location.name} site.`,
    },
    {
      question: `Do you offer free quotes in ${location.name}?`,
      answer: `Yes, we provide free, no-obligation site assessments and quotes for all groundworks projects in ${location.name} and the wider ${location.area} area.`,
    },
  ];

  const locationWithExtras = location;

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
            src={getHeroImage({ serviceSlug: service.slug })}
            alt={`${service.title} team working in ${location.name}, ${location.area}`}
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
              Trusted {service.title.toLowerCase()} serving {location.name} and {location.area}.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="highlight" asChild>
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
              <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-primary-foreground">
                <Phone className="h-5 w-5" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-4 font-display text-2xl font-bold">
                {service.title} in {location.name}
              </h2>
              <p className="mb-6 text-muted-foreground">
                {companyInfo.name} provides expert {service.title.toLowerCase()} in {location.name}, {location.area}. Our experienced groundworks teams deliver reliable project support tailored to your site and programme.
              </p>
              <p className="mb-8 text-muted-foreground">{service.description}</p>

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
                  <h3 className="mb-2 font-display text-lg font-bold">Common Project Types in {location.name}</h3>
                  <p className="text-sm text-muted-foreground">{locationWithExtras.propertyTypes}</p>
                </div>
              )}

              <h3 className="mb-4 font-display text-xl font-bold">Why Choose Us for {service.title} in {location.name}?</h3>
              <ul className="mb-8 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" /> Local groundworks expertise across {location.area}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" /> Fully insured with structural warranties
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" /> Health & safety compliant on every site
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" /> Free site assessments and no-obligation quotes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" /> Transparent, competitive pricing
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
                  <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-primary hover:underline">
                    <Phone className="h-4 w-4" /> Call Now
                  </a>
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
