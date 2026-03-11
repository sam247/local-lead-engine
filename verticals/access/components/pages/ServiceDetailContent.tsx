import Link from "next/link";
import { services, locations } from "@/lib/data";
import { getHeroImage } from "@/lib/images";
import { verticalConfig, partnerBaseUrl, partnerTopographicalSurveyPath, partnerDrainsBaseUrl } from "@/config";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, AlertTriangle } from "lucide-react";
import { BreadcrumbNav, SchemaMarkup as EngineSchemaMarkup } from "engine";
import InspectionCTA from "@/components/sections/InspectionCTA";
import MidContentCTA from "@/components/sections/MidContentCTA";
import FAQSchema from "@/components/sections/FAQSchema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import RelatedLinks from "@/components/sections/RelatedLinks";
import CTABanner from "@/components/sections/CTABanner";

const serviceSymptomLinks: Record<string, { slug: string; path: string; title: string }[]> = {
  "access-control-systems": [
    { slug: "access-control-system-cost", path: "/access-problems/access-control-system-cost", title: "Access control system cost" },
    { slug: "hospital-security-system-requirements", path: "/access-problems/hospital-security-system-requirements", title: "Hospital security requirements" },
  ],
  "commercial-cctv-installation": [
    { slug: "commercial-cctv-installation-cost", path: "/access-problems/commercial-cctv-installation-cost", title: "Commercial CCTV installation cost" },
    { slug: "how-many-cameras-for-commercial-building", path: "/access-problems/how-many-cameras-for-commercial-building", title: "How many cameras for commercial building" },
  ],
  "ip-camera-systems": [
    { slug: "commercial-cctv-installation-cost", path: "/access-problems/commercial-cctv-installation-cost", title: "CCTV and IP camera costs" },
    { slug: "how-many-cameras-for-commercial-building", path: "/access-problems/how-many-cameras-for-commercial-building", title: "How many cameras do I need?" },
  ],
  "perimeter-security-systems": [
    { slug: "data-centre-perimeter-security", path: "/access-problems/data-centre-perimeter-security", title: "Data centre perimeter security" },
  ],
  "security-system-integration": [
    { slug: "hospital-security-system-requirements", path: "/access-problems/hospital-security-system-requirements", title: "Integrated security for healthcare" },
    { slug: "data-centre-perimeter-security", path: "/access-problems/data-centre-perimeter-security", title: "Integrated security for data centres" },
  ],
};

const serviceFaqs: Record<string, { question: string; answer: string }[]> = {
  "access-control-systems": [
    { question: "How much does access control cost?", answer: "Costs depend on the number of doors, reader type (card, fob, biometric) and integration needs. We provide fixed-price quotes after a site survey." },
    { question: "Can you integrate with our existing system?", answer: "Yes. We integrate with major access and building management systems where possible and recommend upgrades when needed." },
    { question: "Do you offer maintenance?", answer: "Yes. We offer planned maintenance and 24/7 support for contract clients." },
  ],
  "commercial-cctv-installation": [
    { question: "How much does commercial CCTV cost?", answer: "Costs depend on camera count, resolution, recording and remote viewing. We quote after a site survey." },
    { question: "Do you provide remote viewing?", answer: "Yes. We configure secure remote viewing and can integrate with your existing network." },
    { question: "What areas do you cover?", answer: "We install CCTV across London and the UK for commercial and public-sector sites." },
  ],
  "ip-camera-systems": [
    { question: "What is the difference between IP and analogue CCTV?", answer: "IP cameras use your network and offer higher resolution, scalability and integration. We can specify the right option for your site." },
    { question: "Can IP cameras work with our existing system?", answer: "Yes. We integrate IP cameras with existing NVRs, VMS and access control where compatible." },
  ],
  "perimeter-security-systems": [
    { question: "What types of perimeter detection do you install?", answer: "We install PIR, beam detection, fence sensors and CCTV for boundaries and outdoor areas, tailored to your site." },
    { question: "Do you work with data centres?", answer: "Yes. We design and install perimeter and access security for data centres and critical sites." },
  ],
  "security-system-integration": [
    { question: "What can be integrated?", answer: "We integrate access control, CCTV, intruder alarms and monitoring into a single platform where appropriate." },
    { question: "Do you support existing systems?", answer: "Yes. We work with major brands and open protocols to integrate or upgrade existing security." },
  ],
};

interface ServiceDetailContentProps {
  service: (typeof services)[number];
}

export default function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  const symptoms = serviceSymptomLinks[service.slug] || [];
  const faqs = serviceFaqs[service.slug] || [];
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
              <p className="mb-4 text-sm text-muted-foreground">
                Large commercial security installations often require a{" "}
                <a
                  href={`${partnerBaseUrl}${partnerTopographicalSurveyPath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  topographical survey
                </a>{" "}
                before installation begins.
              </p>
              <p className="mb-8 text-sm text-muted-foreground">
                Security systems are often installed during major construction projects alongside{" "}
                <a
                  href={partnerDrainsBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  drainage and other utilities
                </a>
                .
              </p>
              {symptoms.length > 0 && (
                <>
                  <h3 className="mb-4 font-display text-xl font-bold">Common Signs You Need {service.title}</h3>
                  <ul className="mb-8 space-y-2">
                    {symptoms.map((s) => (
                      <li key={s.slug} className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
                        <Link href={s.path} className="text-primary hover:underline">{s.title}</Link>
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
              <MidContentCTA message="Need a security system quote or site survey? We provide free, no-obligation consultations." buttonText="Request Security Consultation" />
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
                <h3 className="mb-4 font-display text-lg font-bold">Related Services</h3>
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
