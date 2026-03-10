import Link from "next/link";
import { companyInfo } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone } from "lucide-react";
import InspectionCTA from "@/components/sections/InspectionCTA";
import FAQSchema from "@/components/sections/FAQSchema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import CTABanner from "@/components/sections/CTABanner";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const whenYouMightNeed = [
  "You're submitting a planning application and need existing site drawings",
  "You're designing an extension and need accurate floor plans and elevations",
  "You're developing a site and need levels, utilities and boundaries mapped",
  "You need a drone survey for a large site or roof inspection",
  "You're not sure which survey type is right for your project",
  "Your architect or planner has requested a topographical or measured building survey",
  "You're buying land or a property and need to understand site constraints",
  "You need underground utilities located before excavation",
];

const scenarios = [
  { title: "Planning Permission", description: "Most planning applications need an up-to-date topographical survey and often a measured building survey of existing structures. Get the right scope from the start.", link: "/drainage-guides/survey-for-planning-permission" },
  { title: "Extension or Refurbishment", description: "Accurate existing drawings reduce design risk. A measured building survey gives your architect floor plans, elevations and sections they can rely on.", link: "/drainage-guides/survey-before-building-extension" },
  { title: "Development or Feasibility", description: "Before committing to design and planning, developers need site levels, utilities and existing structures mapped. We help scope the right survey package.", link: "/drainage-guides/survey-before-property-development" },
  { title: "Drone Survey", description: "Ideal for large sites, roof inspections and progress monitoring. Drone surveys deliver orthophotos, contours and 3D data quickly and often at lower cost for big areas.", link: "/drainage-guides/when-to-use-drone-surveys" },
];

const faqs = [
  { question: "How much does a topographical survey cost?", answer: "Costs depend on site size and complexity. Small residential plots typically range from around £600–£1,200 + VAT; larger sites can be £1,500–£4,000+. Survey partners provide fixed quotes once scope is clear." },
  { question: "How long does a survey take?", answer: "A typical topographical or measured building survey for a single dwelling can be completed on site in one day, with drawings delivered within a few days to a week. Larger or drone surveys may need more processing time." },
  { question: "Do I need a survey before an extension?", answer: "Yes, in most cases. A measured building survey gives your architect accurate existing plans, elevations and sections; a topographical survey captures levels and features. Together they reduce design risk." },
  { question: "When should I use a drone survey?", answer: "Drone surveys are ideal for large or inaccessible sites, roof inspections, progress monitoring and volume calculations. They often cost less than traditional surveys for big areas and deliver rich data quickly." },
];

export const metadata: Metadata = {
  title: "Do I Need a Land Survey? | Mainline Surveys",
  description: "Not sure which survey you need for your project? Check common scenarios and get expert advice from Mainline Surveys.",
  alternates: { canonical: "https://mainlinesurveys.co.uk/do-i-need-a-drain-survey" },
};

export default function DoINeedADrainSurveyPage() {
  return (
    <>
      <SchemaMarkup type="Article" data={{ title: "Do I Need a Land Survey?", description: "Decision guide for when you need a topographical, measured building, utility or drone survey.", url: "/do-i-need-a-drain-survey" }} />
      <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: "Guides", url: "/drainage-guides" }, { name: "Do I Need a Land Survey?", url: "/do-i-need-a-drain-survey" }] }} />
      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">Do I Need a Land Survey?</h1>
            <p className="text-lg text-primary-foreground/80">Not sure which survey you need? Use our guide to match your project to the right survey type.</p>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 font-display text-2xl font-bold">When You Might Need a Survey</h2>
            <p className="mb-6 text-muted-foreground">You might need a land or drone survey if any of the following apply:</p>
            <ul className="mb-8 space-y-3">
              {whenYouMightNeed.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mb-8 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
              <p className="mb-4 text-lg font-medium">Not sure which survey you need?</p>
              <p className="mb-4 text-muted-foreground">Request a quote and we&apos;ll match you with a survey specialist who can advise the right scope for your project.</p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/contact">Request a Survey Quote</Link>
                </Button>
                <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 font-medium text-primary">
                  <Phone className="h-5 w-5" /> Call Now
                </a>
              </div>
            </div>
            <h2 className="mb-6 font-display text-2xl font-bold">Survey Types by Project</h2>
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              {scenarios.map((s) => (
                <Link key={s.link} href={s.link} className="group rounded-lg border border-border p-5 transition-all hover:shadow-md">
                  <h3 className="mb-2 font-display font-semibold group-hover:text-primary">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                </Link>
              ))}
            </div>
            <InspectionCTA />
          </div>
        </div>
      </section>
      <FAQSchema items={faqs} title="Survey FAQs" />
      <CTABanner />
    </>
  );
}
