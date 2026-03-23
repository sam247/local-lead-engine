import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustBadgeStrip from "@/components/sections/TrustBadgeStrip";
import Stats from "@/components/sections/Stats";
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
  title: "Mainline Access | Commercial Access Control and Security Systems",
  description: "Access control, CCTV and integrated security systems for hospitals, data centres, warehouses and commercial buildings. Request a security consultation.",
  alternates: { canonical: "https://mainlineaccess.co.uk" },
};

export default function HomePage() {
  return (
    <>
      <SchemaMarkup type="LocalBusiness" data={{ areaServed: "London and surrounding areas" }} />
      <Hero />
      <TrustBadgeStrip />
      <Stats />
      <ServicesGrid />

      <section className="section-padding bg-background">
        <div className="container max-w-3xl">
          <div className="mb-6 text-center">
            <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
              Planning a Security Upgrade?
            </h2>
            <p className="text-muted-foreground">
              Speak to our team first to review site risks, compliance needs and integration options before you request a final system quotation.
            </p>
          </div>
          <InspectionCTA />
        </div>
      </section>

      <WhyChooseUs />
      <ProjectsPreview />
      <Testimonials />
      <BlogPreview />
      <FAQ />
      <CTABanner />
    </>
  );
}
