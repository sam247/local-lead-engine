import { CheckCircle, Award, Users, Shield } from "lucide-react";
import { aboutTeam } from "@/lib/images";
import CTABanner from "@/components/sections/CTABanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "About Us | Mainline Surveys",
  description: "Learn about Mainline Surveys — professional land and drone surveying for architects, developers and property owners across the UK.",
  alternates: { canonical: "https://mainlinesurveys.co.uk/about" },
};

export default function AboutPage() {
  return (
    <>
      <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: "About Us", url: "/about" }] }} />
      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">About Mainline Surveys</h1>
            <p className="text-lg text-primary-foreground/80">Land and drone surveying for planning, development and construction across London and the South East.</p>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 font-display text-3xl font-bold">Our Story</h2>
              <p className="mb-4 text-muted-foreground">
                Mainline Surveys connects architects, developers and property owners with qualified land and drone survey partners across the UK for planning, development and construction projects.
              </p>
              <p className="mb-4 text-muted-foreground">
                We connect clients with RICS-linked survey partners who deliver topographical, measured building, utility and drone surveys for planning applications, extensions and development. Our reputation is built on clear scoping, transparent pricing and deliverables that fit straight into design workflows.
              </p>
              <p className="text-muted-foreground">
                Our network of qualified surveyors uses total stations, GNSS, laser scanning and drones to deliver accurate, planning-ready data across London and the South East.
              </p>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
              <img src={aboutTeam} alt="Mainline Surveys team" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>
      <section className="section-padding bg-secondary">
        <div className="container">
          <h2 className="mb-12 text-center font-display text-3xl font-bold">Our Values</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: CheckCircle, title: "Reliability", desc: "Clear turnaround and deliverables" },
              { icon: Shield, title: "Honesty", desc: "Transparent pricing, no hidden costs" },
              { icon: Users, title: "Expertise", desc: "RICS-linked, qualified surveyors" },
              { icon: Award, title: "Quality", desc: "Planning-ready CAD and BIM outputs" },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <item.icon className="mx-auto mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 font-display text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
