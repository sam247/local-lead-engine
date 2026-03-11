import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustBadgeStrip from "@/components/sections/TrustBadgeStrip";
import Stats from "@/components/sections/Stats";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { verticalConfig } from "@/config";

export const metadata: Metadata = {
  title: "Mainline Groundworks | Piling, Excavation & Foundation Contractors UK",
  description: "Commercial groundworks contractors providing piling, excavation, site clearance and foundation construction across the UK.",
  alternates: { canonical: verticalConfig.baseUrl },
};

export default function HomePage() {
  return (
    <>
      <SchemaMarkup type="LocalBusiness" data={{ areaServed: "UK" }} />
      <Hero />
      <TrustBadgeStrip />
      <Stats />
      <ServicesGrid />

      <section className="section-padding bg-background">
        <div className="container max-w-3xl text-center">
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Need a Groundworks Quote?
          </h2>
          <p className="mb-6 text-muted-foreground">
            Send us your site details and project requirements. We will come back with a detailed quote and programme.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>
      </section>

      <WhyChooseUs />
      <ProjectsPreview />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}
