import Link from "next/link";
import { companyInfo } from "@/lib/data";
import { serviceImages } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone } from "lucide-react";
import FAQSchema from "@/components/sections/FAQSchema";
import InspectionCTA from "@/components/sections/InspectionCTA";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import CTABanner from "@/components/sections/CTABanner";
import { getServiceUrl, TrackablePhoneLink } from "engine";
import { verticalConfig } from "@/config";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const surveyFaqs = [
  { question: "How much does a topographical survey cost?", answer: "Costs depend on site size and complexity. Small residential plots typically range from around £600–£1,200 + VAT; larger or multi-phase sites can be £1,500–£4,000+. Survey partners provide fixed quotes once scope is clear." },
  { question: "How much does a drone survey cost?", answer: "Drone survey pricing depends on site size, deliverables and airspace. Small sites or roof inspections often start from around £750–£1,500 + VAT; larger sites may be £2,000–£7,000+. Request a quote for your project." },
  { question: "How long does a survey take?", answer: "A typical topographical or measured building survey for a single dwelling can be completed on site in one day, with drawings delivered within a few days to a week. Larger or drone surveys may need more processing time." },
  { question: "When should I use a drone survey?", answer: "Drone surveys are ideal for large or inaccessible sites, roof inspections, progress monitoring and volume calculations. They often cost less than traditional surveys for big areas." },
];

export const metadata: Metadata = {
  title: "Survey Cost Guide | Mainline Surveys",
  description: "How much do land and drone surveys cost? Typical UK pricing for topographical, measured building, utility and drone surveys. Get a fixed quote.",
  alternates: { canonical: "https://mainlinesurveys.co.uk/drain-survey-cost" },
};

export default function SurveyCostPage() {
  const imageSrc = serviceImages["topographical-survey"];
  return (
    <>
      <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: "Survey Cost Guide", url: "/drain-survey-cost" }] }} />
      <section className="relative bg-primary py-16 md:py-24">
        <div className="absolute inset-0">
          <img src={imageSrc} alt="Land and drone surveying" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">Survey Cost Guides</h1>
            <p className="text-lg text-primary-foreground/80">Typical UK pricing for topographical, measured building, utility and drone surveys. Get a fixed quote for your project.</p>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-4 font-display text-2xl font-bold">How Much Do Land and Drone Surveys Cost?</h2>
              <p className="mb-6 text-muted-foreground">Survey pricing depends on site size, complexity, deliverables and access. Our survey partners provide fixed quotes once they know your scope. Use the guides below for typical ranges.</p>
              <div className="mb-8 flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <Link href="/drain-costs/topographical-survey-cost">Topographical Survey Cost</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/drain-costs/measured-building-survey-cost">Measured Building Survey Cost</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/drain-costs/utility-survey-cost">Utility Survey Cost</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/drain-costs/drone-survey-cost">Drone Survey Cost</Link>
                </Button>
              </div>
              <h2 className="mb-4 font-display text-2xl font-bold">What Affects Survey Cost?</h2>
              <ul className="mb-8 space-y-3">
                {["Site size and complexity — larger or more detailed sites cost more", "Deliverables — 2D CAD vs 3D/BIM, sections, volume reports", "Access and vegetation — difficult access can increase time and cost", "Accuracy and specification — higher accuracy or PAS128 levels cost more", "Turnaround — rush jobs may attract a premium", "Location — travel and mobilisation affect the quote"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <InspectionCTA />
              <div className="mt-8 rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Related Guides</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  <Link href="/survey-guides/survey-for-planning-permission" className="text-sm text-primary hover:underline">Survey for Planning Permission →</Link>
                  <Link href="/survey-guides/survey-before-building-extension" className="text-sm text-primary hover:underline">Survey Before Extension →</Link>
                  <Link href="/survey-guides/when-to-use-drone-surveys" className="text-sm text-primary hover:underline">When to Use Drone Surveys →</Link>
                  <Link href="/drain-costs" className="text-sm text-primary hover:underline">All Cost Guides →</Link>
                  <Link href={getServiceUrl("topographical-survey")} className="text-sm text-primary hover:underline">Topographical Survey →</Link>
                  <Link href={getServiceUrl("drone-survey")} className="text-sm text-primary hover:underline">Drone Survey →</Link>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Typical Survey Cost Ranges</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-border pb-2"><span className="text-sm">Topographical (small plot)</span><span className="text-sm font-medium">£600–£1,200 + VAT</span></div>
                  <div className="flex justify-between border-b border-border pb-2"><span className="text-sm">Measured building (house)</span><span className="text-sm font-medium">£600–£1,800 + VAT</span></div>
                  <div className="flex justify-between border-b border-border pb-2"><span className="text-sm">Utility survey</span><span className="text-sm font-medium">£800–£3,000 + VAT</span></div>
                  <div className="flex justify-between border-b border-border pb-2"><span className="text-sm">Drone survey (medium site)</span><span className="text-sm font-medium">£1,200–£3,000 + VAT</span></div>
                  <div className="flex justify-between"><span className="text-sm">Large/complex sites</span><span className="text-sm font-medium">£3,000+ + VAT</span></div>
                </div>
              </div>
              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Contact Us</h3>
                <TrackablePhoneLink
                  phone={companyInfo.phone}
                  vertical={verticalConfig.verticalId}
                  serviceSlug="topographical-survey"
                  locationSlug={null}
                  pagePath="/drain-survey-cost"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Phone className="h-4 w-4" /> {companyInfo.phone}
                </TrackablePhoneLink>
                <Button asChild className="mt-4 w-full"><Link href="/contact">Request a Survey Quote</Link></Button>
              </div>
              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Why Choose Us?</h3>
                <ul className="space-y-2">
                  {["Fixed-price quotes where possible", "RICS-linked survey partners", "Clear scope and deliverables", "CAD and BIM outputs", "Planning and development focus"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FAQSchema items={surveyFaqs} title="Survey Cost FAQ" />
      <CTABanner />
    </>
  );
}
