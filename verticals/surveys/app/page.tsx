import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/sections/Hero";
import TrustBadgeStrip from "@/components/sections/TrustBadgeStrip";
import Stats from "@/components/sections/Stats";
import WhenYouNeedSurvey from "@/components/sections/WhenYouNeedSurvey";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import Testimonials from "@/components/sections/Testimonials";
import BlogPreview from "@/components/sections/BlogPreview";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import InspectionCTA from "@/components/sections/InspectionCTA";

export const metadata: Metadata = {
  title: "Mainline Surveys | Land & Drone Surveying Across the UK",
  description: "Professional land and drone surveys for planning, development and construction. Topographical, measured building, utility and drone survey services.",
  alternates: { canonical: "https://mainlinesurveys.co.uk" },
};

export default function HomePage() {
  return (
    <>
      <SchemaMarkup type="LocalBusiness" data={{ areaServed: "London and surrounding areas" }} />
      <Hero />
      <TrustBadgeStrip />
      <Stats />
      <WhenYouNeedSurvey />
      <ServicesGrid />

      <section className="section-padding bg-background">
        <div className="container max-w-3xl">
          <div className="mb-6 text-center">
            <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
              Not Sure Which Survey You Need?
            </h2>
            <p className="text-muted-foreground">
              Our survey partners help you define the right scope before design or construction begins, so you only commission the survey outputs your project actually needs.
            </p>
          </div>
          <InspectionCTA />
        </div>
      </section>

      <WhyChooseUs />
      <ProjectsPreview />
      <Testimonials />

      <section className="section-padding bg-background">
        <div className="container max-w-3xl">
          <div className="mb-8 text-center">
            <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Plan Your Budget
            </span>
            <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
              Survey Cost Guides
            </h2>
            <p className="text-muted-foreground">
              Typical UK pricing for land and drone surveys. Get a fixed quote by sharing your site and requirements with our survey partners.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/drain-costs/topographical-survey-cost"
              className="inline-flex items-center rounded-lg border border-primary bg-background px-5 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Topographical Survey Cost
            </Link>
            <Link
              href="/drain-costs/measured-building-survey-cost"
              className="inline-flex items-center rounded-lg border border-primary bg-background px-5 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Measured Building Survey Cost
            </Link>
            <Link
              href="/drain-costs/utility-survey-cost"
              className="inline-flex items-center rounded-lg border border-primary bg-background px-5 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Utility Survey Cost
            </Link>
            <Link
              href="/drain-costs/drone-survey-cost"
              className="inline-flex items-center rounded-lg border border-primary bg-background px-5 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Drone Survey Cost
            </Link>
          </div>
        </div>
      </section>

      <BlogPreview />
      <FAQ />
      <CTABanner />
    </>
  );
}
