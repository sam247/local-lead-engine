import Link from "next/link";
import { services, getCategoryPages, companyInfo } from "@/lib/data";
import { serviceImages } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import InspectionCTA from "@/components/sections/InspectionCTA";
import CostEstimator from "@/components/sections/CostEstimator";
import DiagnosisTool from "@/components/sections/DiagnosisTool";
import FAQSchema from "@/components/sections/FAQSchema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { TrackablePhoneLink } from "engine";
import { CALL_TRACK_VERTICAL } from "@/lib/callTrackVertical";

const sections = [
  { id: "signs", title: "Signs of a Collapsed Drain" },
  { id: "causes", title: "What Causes Drain Collapse" },
  { id: "inspection", title: "How We Inspect Drains" },
  { id: "repair", title: "Repair Methods" },
  { id: "costs", title: "Typical Repair Costs" },
  { id: "insurance", title: "Insurance & Claims" },
  { id: "diagnosis", title: "Diagnosis Tool" },
  { id: "estimator", title: "Cost Estimator" },
];

const guideFaqs = [
  { question: "Can a collapsed drain fix itself?", answer: "No. A collapsed drain will only get worse over time as soil washes into the void and the damage spreads. Professional repair is always needed." },
  { question: "How long does drain repair take?", answer: "Simple relining can be completed in a day. Excavation repairs typically take 1-3 days depending on depth and location. Emergency repairs often start the same day." },
  { question: "Will insurance cover drain damage?", answer: "Many home insurance policies cover sudden drain collapse. Gradual deterioration is less commonly covered. We provide detailed CCTV reports to support your claim." },
  { question: "How much does drain relining cost?", answer: "Drain relining typically costs £1,000-£4,000 depending on pipe diameter, length, and access difficulty. It's usually cheaper than excavation." },
  { question: "Do I need a CCTV drain survey?", answer: "A CCTV survey is essential for accurate diagnosis. It reveals the exact nature, location and severity of any problem, allowing us to recommend the most appropriate repair." },
];

export default function PillarGuideContent() {
  const collapsePages = getCategoryPages("collapse");
  const causePages = getCategoryPages("causes");
  const inspectionPages = getCategoryPages("inspection");
  const repairPages = getCategoryPages("repair-methods");
  const costPages = getCategoryPages("costs");
  const insurancePages = getCategoryPages("insurance");
  const imageSrc = serviceImages["drain-collapse-repair"];

  return (
    <>
      <SchemaMarkup type="Article" data={{ title: "Collapsed Drains: The Complete Guide", description: "Comprehensive guide to collapsed drain signs, causes, repair methods, costs and insurance claims.", url: "/collapsed-drains-complete-guide" }} />
      <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: "Collapsed Drains Guide", url: "/collapsed-drains-complete-guide" }] }} />
      <section className="relative bg-primary py-16 md:py-24">
        <div className="absolute inset-0">
          <img src={imageSrc} alt="" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">Collapsed Drains: The Complete Guide</h1>
            <p className="mb-6 text-lg text-primary-foreground/80">Everything you need to know about identifying, diagnosing, repairing and claiming for collapsed drains.</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
              <TrackablePhoneLink
                phone={companyInfo.phone}
                vertical={CALL_TRACK_VERTICAL}
                serviceSlug={null}
                locationSlug={null}
                pagePath="/collapsed-drains-complete-guide"
                className="flex items-center gap-2 text-primary-foreground"
              >
                <Phone className="h-5 w-5" /> {companyInfo.phone}
              </TrackablePhoneLink>
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-border bg-secondary py-8">
        <div className="container">
          <h2 className="mb-4 font-display text-lg font-bold">In This Guide</h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="flex items-center gap-2 text-sm text-primary hover:underline">
                <ArrowRight className="h-3 w-3" /> {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-4xl space-y-16">
            <div id="signs">
              <h2 className="mb-4 font-display text-3xl font-bold">Signs of a Collapsed Drain</h2>
              <p className="mb-6 text-muted-foreground">A collapsed drain can go undetected for weeks, causing increasing damage. Key warning signs include slow drainage across multiple fixtures, foul sewage smells, sinkholes in the garden, recurring blockages, damp patches, and cracks in walls near drain runs.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {collapsePages.slice(0, 4).map((p) => (
                  <Link key={p.slug} href={`/drain-collapse/${p.slug}`} className="rounded border border-border p-3 text-sm transition-colors hover:border-primary">
                    {p.title} <ArrowRight className="ml-1 inline h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>
            <div id="causes">
              <h2 className="mb-4 font-display text-3xl font-bold">What Causes Drain Collapse</h2>
              <p className="mb-6 text-muted-foreground">Drains collapse due to age-related deterioration of old clay pipes, tree root ingress cracking joints, ground movement from construction or subsidence, heavy vehicle loads above shallow pipes, and corrosion of metal pipework.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {causePages.slice(0, 4).map((p) => (
                  <Link key={p.slug} href={`/drain-causes/${p.slug}`} className="rounded border border-border p-3 text-sm transition-colors hover:border-primary">
                    {p.title} <ArrowRight className="ml-1 inline h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>
            <div id="inspection">
              <h2 className="mb-4 font-display text-3xl font-bold">How We Inspect Drains</h2>
              <p className="mb-6 text-muted-foreground">CCTV drain surveys are the gold standard for diagnosing drainage problems. A high-resolution camera is fed through your pipes, revealing the exact condition, location and severity of any defects — without any digging.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {inspectionPages.slice(0, 4).map((p) => (
                  <Link key={p.slug} href={`/drain-inspection/${p.slug}`} className="rounded border border-border p-3 text-sm transition-colors hover:border-primary">
                    {p.title} <ArrowRight className="ml-1 inline h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>
            <div id="repair">
              <h2 className="mb-4 font-display text-3xl font-bold">Repair Methods</h2>
              <p className="mb-6 text-muted-foreground">The right repair method depends on the type and extent of damage. Options range from no-dig relining for partial damage to full excavation for severe collapses. We always recommend the most cost-effective solution.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {repairPages.slice(0, 4).map((p) => (
                  <Link key={p.slug} href={`/drain-repair-methods/${p.slug}`} className="rounded border border-border p-3 text-sm transition-colors hover:border-primary">
                    {p.title} <ArrowRight className="ml-1 inline h-3 w-3" />
                  </Link>
                ))}
                {services.filter((s) => ["drain-relining", "drain-excavation", "drain-collapse-repair"].includes(s.slug)).map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="rounded border border-primary/30 bg-primary/5 p-3 text-sm font-medium transition-colors hover:border-primary">
                    {s.title} <ArrowRight className="ml-1 inline h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>
            <div id="costs">
              <h2 className="mb-4 font-display text-3xl font-bold">Typical Repair Costs</h2>
              <p className="mb-6 text-muted-foreground">Costs depend on the repair method, pipe depth, location, and extent of damage. A CCTV survey gives you the information needed for an accurate quote.</p>
              <div className="mb-6 grid gap-3 sm:grid-cols-2">
                {costPages.slice(0, 4).map((p) => (
                  <Link key={p.slug} href={`/drain-costs/${p.slug}`} className="rounded border border-border p-3 text-sm transition-colors hover:border-primary">
                    {p.title} <ArrowRight className="ml-1 inline h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>
            <div id="insurance">
              <h2 className="mb-4 font-display text-3xl font-bold">Insurance & Claims</h2>
              <p className="mb-6 text-muted-foreground">Many home insurance policies cover drain collapse repair. We help you through the claims process with detailed CCTV reports and documentation.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {insurancePages.slice(0, 4).map((p) => (
                  <Link key={p.slug} href={`/drain-insurance/${p.slug}`} className="rounded border border-border p-3 text-sm transition-colors hover:border-primary">
                    {p.title} <ArrowRight className="ml-1 inline h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>
            <InspectionCTA />
            <div id="diagnosis">
              <h2 className="mb-4 font-display text-3xl font-bold">Diagnose Your Problem</h2>
              <DiagnosisTool />
            </div>
            <div id="estimator">
              <h2 className="mb-4 font-display text-3xl font-bold">Estimate Your Costs</h2>
              <CostEstimator />
            </div>
          </div>
        </div>
      </section>
      <FAQSchema items={guideFaqs} title="Collapsed Drain FAQs" />
      <section className="bg-primary py-16">
        <div className="container text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground">Need Expert Help with a Collapsed Drain?</h2>
          <p className="mb-6 text-primary-foreground/80">Contact us for a free CCTV survey and no-obligation repair quote.</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Get Your Free Quote</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
