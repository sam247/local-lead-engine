import Link from "next/link";
import { companyInfo } from "@/lib/data";
import { serviceImages } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone } from "lucide-react";
import CostEstimator from "@/components/sections/CostEstimator";
import FAQSchema from "@/components/sections/FAQSchema";
import InspectionCTA from "@/components/sections/InspectionCTA";
import MidContentCTA from "@/components/sections/MidContentCTA";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import CTABanner from "@/components/sections/CTABanner";
import { getServiceUrl, TrackablePhoneLink } from "engine";
import { verticalConfig } from "@/config";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const surveyFaqs = [
  { question: "How much does a CCTV drain survey cost?", answer: "A standard CCTV drain survey for a residential property typically costs between £120 and £350. The exact price depends on the property type, number of access points, and complexity of the drainage system. Commercial surveys may cost more due to larger systems." },
  { question: "What affects the cost of a drain survey?", answer: "Key factors include: property type and size, number of drainage access points, suspected issue type (simple check vs detailed investigation), access difficulty (easy garden access vs restricted urban access), and whether drain tracing or mapping is also required." },
  { question: "Is a drain survey worth the cost?", answer: "Absolutely. A drain survey costing £120–£350 can save you thousands by identifying problems before they become emergencies. It's especially valuable before buying a property, when making insurance claims, or when investigating recurring drainage problems." },
  { question: "Do insurance companies require drain surveys?", answer: "Yes, most insurance companies require a professional CCTV drain survey report before approving drain collapse claims. Our survey reports are formatted specifically for insurance purposes and provide all the evidence insurers need to process your claim." },
  { question: "How long does a drain survey take?", answer: "A standard residential CCTV drain survey takes 1–2 hours. More complex surveys involving drain tracing, mapping, or large commercial systems may take 3–4 hours. You receive the full report within 24–48 hours." },
  { question: "When is a drain survey recommended?", answer: "We recommend drain surveys before buying a property, when you notice drainage symptoms (slow drains, smells, damp), for insurance claims, before building work near drains, and as periodic health checks on older drainage systems." },
];

export const metadata: Metadata = {
  title: "Drain Survey Cost Calculator | CCTV Drain Survey Prices | Mainline Drains",
  description: "How much does a CCTV drain survey cost? Use our calculator to estimate costs based on your property type, access points and suspected issue. Typical range: £120–£350.",
  alternates: { canonical: "https://mainlinedrains.co.uk/drain-survey-cost" },
};

export default function DrainSurveyCostPage() {
  const imageSrc = serviceImages["cctv-drain-surveys"];
  return (
    <>
      <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: "Drain Survey Cost", url: "/drain-survey-cost" }] }} />
      <section className="relative bg-primary py-16 md:py-24">
        <div className="absolute inset-0">
          <img src={imageSrc} alt="CCTV drain survey camera equipment" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">CCTV Drain Survey Cost</h1>
            <p className="text-lg text-primary-foreground/80">Find out how much a professional CCTV drain survey costs for your property. Use our calculator for an instant estimate.</p>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-4 font-display text-2xl font-bold">How Much Does a Drain Survey Cost?</h2>
              <p className="mb-6 text-muted-foreground">A CCTV drain survey is the essential first step in diagnosing any drainage problem. The cost depends on several factors including your property type, the number of access points, and the complexity of the drainage system.</p>
              <p className="mb-8 text-muted-foreground">For most residential properties, a standard CCTV drain survey costs between <strong>£120 and £350</strong>. We always provide a fixed price before starting work.</p>
              <div className="mb-8">
                <CostEstimator />
              </div>
              <h2 className="mb-4 font-display text-2xl font-bold">What Affects Drain Survey Cost?</h2>
              <ul className="mb-8 space-y-3">
                {["Property type — detached houses have more drainage to survey than flats", "Number of access points — more manholes means more pipe to inspect", "Suspected issue type — targeted investigation vs full system check", "Access difficulty — restricted access may require specialist equipment", "Additional services — drain tracing, mapping, or flow testing add cost", "Location — urban properties may have more complex drainage connections"].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <MidContentCTA message="Want an accurate survey price for your property? We provide fixed-price quotes with no hidden charges." buttonText="Get a Fixed Price Quote" />
              <h2 className="mb-4 font-display text-2xl font-bold">When Is a Drain Survey Recommended?</h2>
              <p className="mb-4 text-muted-foreground">A CCTV drain survey is recommended before buying a property, when you notice drainage symptoms, for insurance claims, and before building work near drains.</p>
              <p className="mb-8 text-muted-foreground">Our survey reports are specifically formatted for insurance purposes, including time-stamped HD footage and a clear statement of the cause.</p>
              <InspectionCTA />
              <div className="mt-8 rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Related Guides</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  <Link href="/drain-survey" className="text-sm text-primary hover:underline">Drain Survey Hub →</Link>
                  <Link href="/do-i-need-a-drain-survey" className="text-sm text-primary hover:underline">Do I Need a Drain Survey? →</Link>
                  <Link href="/drain-costs/drain-repair-cost" className="text-sm text-primary hover:underline">Drain Repair Cost Guide →</Link>
                  <Link href="/drain-costs/collapsed-drain-repair-cost" className="text-sm text-primary hover:underline">Collapsed Drain Repair Cost →</Link>
                  <Link href="/drain-insurance/collapsed-drain-insurance-claims" className="text-sm text-primary hover:underline">Insurance Claims Guide →</Link>
                  <Link href={getServiceUrl("cctv-drain-surveys")} className="text-sm text-primary hover:underline">CCTV Drain Surveys Service →</Link>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Typical Survey Costs</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-border pb-2"><span className="text-sm">Standard residential</span><span className="text-sm font-medium">£120–£250</span></div>
                  <div className="flex justify-between border-b border-border pb-2"><span className="text-sm">Large/detached property</span><span className="text-sm font-medium">£200–£350</span></div>
                  <div className="flex justify-between border-b border-border pb-2"><span className="text-sm">Pre-purchase survey</span><span className="text-sm font-medium">£150–£350</span></div>
                  <div className="flex justify-between border-b border-border pb-2"><span className="text-sm">With drain tracing</span><span className="text-sm font-medium">£250–£450</span></div>
                  <div className="flex justify-between"><span className="text-sm">Commercial survey</span><span className="text-sm font-medium">£300–£600+</span></div>
                </div>
              </div>
              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Contact Us</h3>
                <TrackablePhoneLink
                  phone={companyInfo.phone}
                  vertical={verticalConfig.verticalId}
                  serviceSlug="cctv-drain-surveys"
                  locationSlug={null}
                  pagePath="/drain-survey-cost"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Phone className="h-4 w-4" /> Call Now
                </TrackablePhoneLink>
                <Button asChild className="mt-4 w-full"><Link href="/contact">Get a Free Quote</Link></Button>
              </div>
              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Why Choose Us?</h3>
                <ul className="space-y-2">
                  {["Fixed-price surveys — no hidden charges", "HD CCTV with detailed written reports", "Reports formatted for insurance claims", "Same-day and next-day appointments", "Qualified, experienced engineers"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FAQSchema items={surveyFaqs} title="Drain Survey Cost FAQ" />
      <CTABanner />
    </>
  );
}
