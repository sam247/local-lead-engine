import Link from "next/link";
import { services, locations, companyInfo } from "@/lib/data";
import { serviceImages } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { Phone, MapPin } from "lucide-react";
import InspectionCTA from "@/components/sections/InspectionCTA";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { getServiceUrl } from "engine";

interface NearMePageContentProps {
  serviceSlug: string;
}

export default function NearMePageContent({ serviceSlug }: NearMePageContentProps) {
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) return null;

  const pageTitle = `${service.title} Near Me`;
  return (
    <>
      <SchemaMarkup type="LocalBusiness" data={{ areaServed: "London and surrounding areas" }} />
      <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: pageTitle, url: `/${serviceSlug}-near-me` }] }} />
      <section className="relative bg-primary py-16 md:py-24">
        <div className="absolute inset-0">
          <img src={serviceImages[service.slug]} alt={`Professional ${service.title.toLowerCase()} engineer servicing drainage near your location`} className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">{pageTitle}</h1>
            <p className="mb-6 text-lg text-primary-foreground/80">
              Professional {service.title.toLowerCase()} services across London. Fast response, free quotes, and guaranteed workmanship.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
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
          <h2 className="mb-8 text-center font-display text-3xl font-bold">Areas We Cover for {service.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {locations.map((loc) => (
              <Link key={loc.id} href={`/${service.slug}/${loc.id}`} className="group rounded-lg border border-border p-4 text-center transition-all hover:border-primary hover:shadow-md">
                <MapPin className="mx-auto mb-2 h-5 w-5 text-primary" />
                <span className="font-display text-sm font-semibold group-hover:text-primary">{loc.name}</span>
                <p className="mt-1 text-xs text-muted-foreground">{loc.area}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-secondary py-12">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 font-display text-2xl font-bold">About Our {service.title} Service</h2>
            <p className="mb-6 text-muted-foreground">{service.description}</p>
            <h3 className="mb-3 font-display text-lg font-bold">Why Choose Mainline Drains?</h3>
            <ul className="mb-6 space-y-2">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 h-4 w-4 shrink-0 text-primary">→</span>
                  {b}
                </li>
              ))}
            </ul>
            <Button asChild>
              <Link href={getServiceUrl(service.slug)}>Learn More About {service.title}</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <h2 className="mb-8 text-center font-display text-2xl font-bold">Other Services Near You</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {services.filter((s) => s.slug !== service.slug).slice(0, 6).map((s) => (
              <Link key={s.slug} href={getServiceUrl(s.slug)} className="rounded-lg border border-border p-4 transition-all hover:border-primary hover:shadow-md">
                <h3 className="mb-1 font-display text-sm font-semibold">{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="container pb-12">
        <InspectionCTA />
      </div>
      <section className="bg-primary py-16">
        <div className="container text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground">Need {service.title} Near You?</h2>
          <p className="mb-6 text-primary-foreground/80">Contact us for fast, reliable drainage services in your area.</p>
          <Button size="lg" variant="highlight" asChild>
            <Link href="/contact">Get Your Free Quote</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
