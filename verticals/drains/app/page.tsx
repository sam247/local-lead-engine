import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustBadgeStrip from "@/components/sections/TrustBadgeStrip";
import Stats from "@/components/sections/Stats";
import DrainDamageSigns from "@/components/sections/DrainDamageSigns";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import Testimonials from "@/components/sections/Testimonials";
import BlogPreview from "@/components/sections/BlogPreview";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import InspectionCTA from "@/components/sections/InspectionCTA";
import CostEstimator from "@/components/sections/CostEstimator";

export const metadata: Metadata = {
  title: "Mainline Drains | Expert Drain Repair & Drainage Solutions London",
  description: "London's trusted drainage experts. 24/7 emergency drain repair, CCTV surveys, drain relining and blocked drain clearance across London.",
  alternates: { canonical: "https://mainlinedrains.co.uk" },
};

export default function HomePage() {
  return (
    <>
      <SchemaMarkup type="LocalBusiness" data={{ areaServed: "London and surrounding areas" }} />
      <Hero />
      <TrustBadgeStrip />
      <Stats />
      <DrainDamageSigns />
      <ServicesGrid />

      <section className="section-padding bg-background">
        <div className="container max-w-3xl">
          <div className="mb-6 text-center">
            <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
              Think Your Drain May Be Damaged?
            </h2>
            <p className="text-muted-foreground">
              A professional CCTV drain survey can diagnose the problem without excavation — often during the same visit. Don&apos;t wait for the issue to get worse.
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
              Estimate Your Drain Repair Costs
            </h2>
            <p className="text-muted-foreground">
              Get an instant price estimate before booking an inspection. Select your problem type, pipe location and depth.
            </p>
          </div>
          <CostEstimator />
        </div>
      </section>

      <BlogPreview />
      <FAQ />
      <CTABanner />
    </>
  );
}
