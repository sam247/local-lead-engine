import Link from "next/link";
import { companyInfo } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone } from "lucide-react";
import DiagnosisTool from "@/components/sections/DiagnosisTool";
import InspectionCTA from "@/components/sections/InspectionCTA";
import FAQSchema from "@/components/sections/FAQSchema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import CTABanner from "@/components/sections/CTABanner";
import { TrackablePhoneLink } from "engine";
import { CALL_TRACK_VERTICAL } from "@/lib/callTrackVertical";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const warningSigns = [
  "Recurring blockages that keep coming back after clearing",
  "Foul sewage smells inside or outside your property",
  "Slow drainage across multiple fixtures",
  "Sinking or soft ground in your garden or driveway",
  "Damp patches appearing on ground-floor walls",
  "Gurgling noises from drains when using water",
  "Buying a property and want to check the drains",
  "Planning building work near drain runs",
];

const scenarios = [
  { title: "Buying a Property", description: "A pre-purchase drain survey can reveal hidden problems that cost thousands to fix. Standard homebuyer surveys don't cover underground drainage.", link: "/drain-survey/drain-survey-before-buying-house" },
  { title: "Recurring Problems", description: "If blockages keep coming back, there's a structural cause. A CCTV survey finds the root cause so it can be fixed permanently.", link: "/drain-problems/recurring-drain-blockages" },
  { title: "Planning Building Work", description: "Building near or over drains requires knowledge of pipe routes and condition. A survey prevents accidental damage and satisfies building regulations.", link: "/drain-inspection/drain-tracing" },
  { title: "Insurance Claim", description: "Insurance companies require CCTV evidence for drain damage claims. Our reports are formatted specifically for insurer requirements.", link: "/drain-insurance/drain-collapse-insurance-claim" },
];

const faqs = [
  { question: "How much does a CCTV drain survey cost?", answer: "A standard residential CCTV drain survey typically costs £150–£300. Detailed homebuyer surveys with full reports cost £250–£400. We provide transparent pricing with no hidden fees." },
  { question: "How long does a drain survey take?", answer: "Most residential drain surveys take 1–2 hours depending on the size of the property and complexity of the drainage system. Results are available immediately with a full report within 24–48 hours." },
  { question: "Will a drain survey cause any disruption?", answer: "No. CCTV drain surveys are completely non-invasive. We access your drains through existing manholes and access points — no digging is required." },
  { question: "Can drains collapse without warning signs?", answer: "Yes, drains can deteriorate gradually without obvious symptoms. This is why pre-purchase surveys are so important — they reveal hidden problems before you commit to buying." },
];

export const metadata: Metadata = {
  title: "Do I Need a Drain Survey? | Mainline Drains",
  description: "Not sure if you need a drain survey? Check the warning signs and use our diagnosis tool to find out. Expert advice from Mainline Drains.",
  alternates: { canonical: "https://mainlinedrains.co.uk/do-i-need-a-drain-survey" },
};

export default function DoINeedADrainSurveyPage() {
  return (
    <>
      <SchemaMarkup type="Article" data={{ title: "Do I Need a Drain Survey?", description: "Decision guide for homeowners unsure if they need a professional drain survey.", url: "/do-i-need-a-drain-survey" }} />
      <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: "Drainage Guides", url: "/drainage-guides" }, { name: "Do I Need a Drain Survey?", url: "/do-i-need-a-drain-survey" }] }} />
      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">Do I Need a Drain Survey?</h1>
            <p className="text-lg text-primary-foreground/80">Use our guide and diagnosis tool to find out whether you need a professional CCTV drain inspection.</p>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 font-display text-2xl font-bold">Warning Signs You Need a Survey</h2>
            <p className="mb-6 text-muted-foreground">If you&apos;re experiencing any of the following, a professional CCTV drain survey is recommended:</p>
            <ul className="mb-8 space-y-3">
              {warningSigns.map((sign) => (
                <li key={sign} className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
            <div className="mb-8 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
              <p className="mb-4 text-lg font-medium">Experiencing two or more of these signs?</p>
              <p className="mb-4 text-muted-foreground">A CCTV drain survey will give you a definitive answer about the condition of your drains.</p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/contact">Book a Survey</Link>
                </Button>
                <TrackablePhoneLink
                  phone={companyInfo.phone}
                  vertical={CALL_TRACK_VERTICAL}
                  serviceSlug="cctv-drain-surveys"
                  locationSlug={null}
                  pagePath="/do-i-need-a-drain-survey"
                  className="flex items-center gap-2 font-medium text-primary"
                >
                  <Phone className="h-5 w-5" /> {companyInfo.phone}
                </TrackablePhoneLink>
              </div>
            </div>
            <h2 className="mb-6 font-display text-2xl font-bold">Check Your Symptoms</h2>
            <div className="mb-8">
              <DiagnosisTool />
            </div>
            <h2 className="mb-6 font-display text-2xl font-bold">When You Should Get a Survey</h2>
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
      <FAQSchema items={faqs} title="Drain Survey FAQs" />
      <CTABanner />
    </>
  );
}
