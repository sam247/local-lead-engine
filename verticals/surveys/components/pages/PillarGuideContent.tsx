import Link from "next/link";
import { services, getCategoryPages, companyInfo, faqs } from "@/lib/data";
import { serviceImages } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import InspectionCTA from "@/components/sections/InspectionCTA";
import FAQSchema from "@/components/sections/FAQSchema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

const sectionIds = [
  { id: "when-you-need", title: "When You Need a Survey" },
  { id: "planning", title: "Planning & Development" },
  { id: "technology", title: "Survey Technology" },
  { id: "drone", title: "Drone Surveys" },
  { id: "costs", title: "Survey Costs" },
  { id: "need-help", title: "Not Sure? Decision Guide" },
];

export default function PillarGuideContent() {
  const guidesPages = getCategoryPages("guides");
  const costPages = getCategoryPages("costs");
  const imageSrc = serviceImages["topographical-survey"];

  return (
    <>
      <SchemaMarkup type="Article" data={{ title: "Survey Guides", description: "When you need a survey, which type to choose, and how much it costs. Planning, development and construction.", url: "/collapsed-drains-complete-guide" }} />
      <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: "Survey Guides", url: "/collapsed-drains-complete-guide" }] }} />
      <section className="relative bg-primary py-16 md:py-24">
        <div className="absolute inset-0">
          <img src={imageSrc} alt="" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">Survey Guides</h1>
            <p className="mb-6 text-lg text-primary-foreground/80">When you need a survey, which type to choose, and how much it costs. Planning, development and construction.</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
              <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-primary-foreground">
                <Phone className="h-5 w-5" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-border bg-secondary py-8">
        <div className="container">
          <h2 className="mb-4 font-display text-lg font-bold">In This Guide</h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {sectionIds.map((s) => (
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
            <div id="when-you-need">
              <h2 className="mb-4 font-display text-3xl font-bold">When You Need a Survey</h2>
              <p className="mb-6 text-muted-foreground">Planning applications, extensions, development and design work usually need accurate site information. Our guides explain when to commission a topographical, measured building, utility or drone survey.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {guidesPages.slice(0, 4).map((p) => (
                  <Link key={p.slug} href={`/drainage-guides/${p.slug}`} className="rounded border border-border p-3 text-sm transition-colors hover:border-primary">
                    {p.title} <ArrowRight className="ml-1 inline h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>
            <div id="planning">
              <h2 className="mb-4 font-display text-3xl font-bold">Planning & Development</h2>
              <p className="mb-6 text-muted-foreground">Survey requirements for planning permission, extensions and property development. Get the right scope from the start to avoid delays and refusals.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {guidesPages.filter((p) => p.slug.includes("planning") || p.slug.includes("extension") || p.slug.includes("development") || p.slug.includes("architectural")).slice(0, 4).map((p) => (
                  <Link key={p.slug} href={`/drainage-guides/${p.slug}`} className="rounded border border-border p-3 text-sm transition-colors hover:border-primary">
                    {p.title} <ArrowRight className="ml-1 inline h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>
            <div id="technology">
              <h2 className="mb-4 font-display text-3xl font-bold">Survey Technology</h2>
              <p className="mb-6 text-muted-foreground">How total stations, GNSS, laser scanning, GPR and drone mapping work. Understand the equipment and methods used by surveyors.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {guidesPages.filter((p) => p.slug.includes("total-station") || p.slug.includes("gnss") || p.slug.includes("lidar") || p.slug.includes("gpr") || p.slug.includes("drone-mapping")).slice(0, 4).map((p) => (
                  <Link key={p.slug} href={`/drainage-guides/${p.slug}`} className="rounded border border-border p-3 text-sm transition-colors hover:border-primary">
                    {p.title} <ArrowRight className="ml-1 inline h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>
            <div id="drone">
              <h2 className="mb-4 font-display text-3xl font-bold">Drone Surveys</h2>
              <p className="mb-6 text-muted-foreground">When to use drone surveys, how they work, accuracy and timescales. Drone surveys are ideal for large sites, roof inspections and progress monitoring.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {guidesPages.filter((p) => p.slug.includes("drone")).slice(0, 4).map((p) => (
                  <Link key={p.slug} href={`/drainage-guides/${p.slug}`} className="rounded border border-border p-3 text-sm transition-colors hover:border-primary">
                    {p.title} <ArrowRight className="ml-1 inline h-3 w-3" />
                  </Link>
                ))}
                {services.filter((s) => s.slug === "drone-survey" || s.slug === "drone-topographical-survey").map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="rounded border border-primary/30 bg-primary/5 p-3 text-sm font-medium transition-colors hover:border-primary">
                    {s.title} <ArrowRight className="ml-1 inline h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>
            <div id="costs">
              <h2 className="mb-4 font-display text-3xl font-bold">Survey Costs</h2>
              <p className="mb-6 text-muted-foreground">Typical UK cost ranges for topographical, measured building, utility and drone surveys. Costs depend on site size, complexity and deliverables.</p>
              <div className="mb-6 grid gap-3 sm:grid-cols-2">
                {costPages.slice(0, 4).map((p) => (
                  <Link key={p.slug} href={`/drain-costs/${p.slug}`} className="rounded border border-border p-3 text-sm transition-colors hover:border-primary">
                    {p.title} <ArrowRight className="ml-1 inline h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>
            <div id="need-help">
              <h2 className="mb-4 font-display text-3xl font-bold">Not Sure Which Survey You Need?</h2>
              <p className="mb-6 text-muted-foreground">Use our decision guide to find out which survey type fits your project, then request a free quote.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link href="/do-i-need-a-drain-survey" className="rounded border border-primary/30 bg-primary/5 p-3 text-sm font-medium transition-colors hover:border-primary">
                  Do I Need a Land Survey? <ArrowRight className="ml-1 inline h-3 w-3" />
                </Link>
                <Link href="/drainage-faq" className="rounded border border-border p-3 text-sm transition-colors hover:border-primary">
                  Survey FAQ <ArrowRight className="ml-1 inline h-3 w-3" />
                </Link>
                <Link href="/contact" className="rounded border border-border p-3 text-sm transition-colors hover:border-primary">
                  Request a Quote <ArrowRight className="ml-1 inline h-3 w-3" />
                </Link>
              </div>
            </div>
            <InspectionCTA />
          </div>
        </div>
      </section>
      <FAQSchema items={faqs.slice(0, 5)} title="Survey FAQs" />
      <section className="bg-primary py-16">
        <div className="container text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground">Need a Survey Quote?</h2>
          <p className="mb-6 text-primary-foreground/80">Contact us for a free, no-obligation quote. We'll match you with a qualified survey partner.</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Get Your Free Quote</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
