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
            <p className="text-lg text-primary-foreground/80">London&apos;s trusted drainage experts — fast, reliable, and available 24/7.</p>
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
                We&apos;ve repaired over 15,000 drains across London, from emergency collapsed drain repairs in Chelsea to commercial drainage surveys in the City. Our reputation is built on fast response times, transparent pricing, and work that lasts.
              </p>
              <p className="text-muted-foreground">
                Today, our team of 30+ experienced drainage engineers operates 24/7, equipped with the latest CCTV, jetting, and relining technology to handle any drainage challenge.
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
              { icon: CheckCircle, title: "Reliability", desc: "24/7 when you need us most" },
              { icon: Shield, title: "Honesty", desc: "Transparent pricing, no hidden costs" },
              { icon: Users, title: "Expertise", desc: "Skilled, certified engineers" },
              { icon: Award, title: "Quality", desc: "Insurance-backed guarantees" },
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
