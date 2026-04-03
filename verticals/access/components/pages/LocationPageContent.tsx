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
      question: `Do you install ${service.title.toLowerCase()} in ${location.name}?`,
      answer: `Yes. We design, install, and maintain ${service.title.toLowerCase()} for commercial and public-sector premises throughout ${location.name} and the wider ${location.area} area.`,
    },
    {
      question: `How much does ${service.title.toLowerCase()} cost in ${location.name}?`,
      answer: `Every site is different. We carry out a free site survey in ${location.name} and provide a detailed, no-obligation quotation based on your specific requirements.`,
    },
    {
      question: `What access control system is best for my ${location.name} premises?`,
      answer: `It depends on the size and nature of your site. Our engineers assess entry points, staff numbers, and compliance needs before recommending a system — from standalone keypads to enterprise-grade biometric and cloud-managed platforms.`,
    },
    {
      question: `Do you offer ongoing maintenance and monitoring in ${location.name}?`,
      answer: `Yes. We provide 24/7 remote monitoring, scheduled maintenance plans, and emergency call-out support for all systems we install across ${location.name} and ${location.area}.`,
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

      <section className="relative overflow-hidden bg-primary pt-10 pb-14 md:pt-16 md:pb-24">
        <div className="absolute inset-0">
          <img
            src={serviceImages[service.slug] ?? serviceImages["access-control-systems"]}
            alt={`${service.title} installation in ${location.name}, ${location.area}`}
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-primary/65 to-primary/80" />
        </div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex flex-col items-center gap-4">
              <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">
                {service.title} in {location.name}
              </h1>
              <p className="text-lg text-primary-foreground/80">
                Professional {service.title.toLowerCase()} for commercial premises in {location.name} and {location.area}.
              </p>
            </div>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="highlight" className="shadow-md ring-2 ring-primary-foreground/20" asChild>
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
              <TrackablePhoneLink
                phone={companyInfo.phone}
                vertical={verticalConfig.verticalId}
                serviceSlug={service.slug}
                locationSlug={location.id}
                className="hidden sm:inline-flex items-center gap-2 text-primary-foreground hover:underline"
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
                {service.title} in {location.name}
              </h2>
              <p className="mb-6 max-w-prose text-muted-foreground">
                {companyInfo.name} designs and installs {service.title.toLowerCase()} for businesses, public-sector buildings, and multi-site organisations across {location.name} and {location.area}. Every solution is tailored to your site&apos;s security requirements and compliance obligations.
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
                  <h3 className="mb-2 font-display text-lg font-bold">Typical Premises in {location.name}</h3>
                  <p className="text-sm text-muted-foreground">{locationWithExtras.propertyTypes}</p>
                </div>
              )}

              <h3 className="mb-4 font-display text-xl font-bold">Why Choose Us in {location.name}?</h3>
              <ul className="mb-8 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" /> NSI-approved security installers
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" /> 24/7 remote monitoring and emergency call-out
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" /> BS EN compliant systems and installations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" /> Free site survey and no-obligation quotation
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
                  We also install {service.title.toLowerCase()} in these areas:
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
          <p className="mb-6 text-primary-foreground/80">Contact us today for a free site survey and no-obligation quote.</p>
          <Button size="lg" variant="highlight" asChild>
            <Link href="/contact">Get Your Free Quote</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
