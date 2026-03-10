import Link from "next/link";
import { services, locations, relatedGuideLinksByService, serviceFaqsBySlug } from "@/lib/data";
import { getHeroImage } from "@/lib/images";
import { verticalConfig } from "@/config";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, AlertTriangle } from "lucide-react";
import { BreadcrumbNav, SchemaMarkup as EngineSchemaMarkup } from "engine";
import InspectionCTA from "@/components/sections/InspectionCTA";
import MidContentCTA from "@/components/sections/MidContentCTA";
import FAQSchema from "@/components/sections/FAQSchema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import RelatedLinks from "@/components/sections/RelatedLinks";
import CTABanner from "@/components/sections/CTABanner";

interface ServiceDetailContentProps {
  service: (typeof services)[number];
}

export default function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  const relatedGuides = relatedGuideLinksByService[service.slug] ?? [];
  const faqs = serviceFaqsBySlug[service.slug] ?? [];
  const imageSrc = getHeroImage({ serviceSlug: service.slug });

  return (
    <>
      <EngineSchemaMarkup
        type="Service"
        companyInfo={verticalConfig.companyInfo}
        baseUrl={verticalConfig.baseUrl}
        data={{
          serviceName: service.title,
          serviceDescription: service.description,
          url: `/services/${service.slug}`,
          areaServed: "London and surrounding areas",
          serviceType: service.title,
        }}
      />
      <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: service.title, url: `/services/${service.slug}` }] }} />
      <section className="relative bg-primary py-16 md:py-24">
        <div className="absolute inset-0">
          <img src={imageSrc} alt="" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <BreadcrumbNav
              items={[
                { name: "Home", url: "/" },
                { name: "Services", url: "/services" },
                { name: service.title, url: `/services/${service.slug}` },
              ]}
              variant="inverse"
            />
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">{service.titleSingular ?? service.title}</h1>
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
              {relatedGuides.length > 0 && (
                <>
                  <h3 className="mb-4 font-display text-xl font-bold">Related guides</h3>
                  <ul className="mb-8 space-y-2">
                    {relatedGuides.map((g) => (
                      <li key={g.slug} className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 shrink-0 text-primary" />
                        <Link href={g.path} className="text-primary hover:underline">{g.title}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <h3 className="mb-4 font-display text-xl font-bold">Our Process</h3>
              <ol className="mb-8 space-y-3">
                {service.process.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
              <MidContentCTA message="Need a survey for your project? Request a quote and we'll match you with a survey specialist." buttonText="Request a Survey Quote" />
              <h3 className="mb-4 font-display text-xl font-bold">Benefits</h3>
              <ul className="mb-8 space-y-2">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <InspectionCTA />
            </div>
            <div className="space-y-6">
              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Related survey services</h3>
                <ul className="space-y-2">
                  {services
                    .filter((s) => s.slug !== service.slug)
                    .slice(0, 6)
                    .map((s) => (
                      <li key={s.id}>
                        <Link href={`/services/${s.slug}`} className="text-sm text-primary hover:underline">
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
                    <Link key={loc.id} href={`/${service.slug}/${loc.id}`} className="text-sm text-primary hover:underline">
                      {loc.name} <ArrowRight className="inline h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>
              <RelatedLinks relatedServices={services.filter((s) => s.slug !== service.slug).slice(0, 3).map((s) => s.slug)} />
              <Button asChild className="w-full" variant="highlight">
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {faqs.length > 0 && <FAQSchema items={faqs} title={`${service.title} FAQ`} />}
      <CTABanner />
    </>
  );
}
