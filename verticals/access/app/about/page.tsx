import { CheckCircle, Award, Users, Shield } from "lucide-react";
import { aboutTeam } from "@/lib/images";
import CTABanner from "@/components/sections/CTABanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "About Us | Mainline Access",
  description: "Learn about Mainline Access — commercial access control and security systems for hospitals, data centres, warehouses and commercial buildings.",
  alternates: { canonical: "https://mainlineaccess.co.uk/about" },
};

export default function AboutPage() {
  return (
    <>
      <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: "About Us", url: "/about" }] }} />
      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">About Mainline Access</h1>
            <p className="text-lg text-primary-foreground/80">Commercial access control and security systems — trusted by hospitals, data centres and commercial sites.</p>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 font-display text-3xl font-bold">Our Story</h2>
              <p className="mb-4 text-muted-foreground">
                Mainline Access was founded to provide commercial and public-sector sites with professional access control and security systems they can rely on — from hospitals and data centres to warehouses and offices.
              </p>
              <p className="mb-4 text-muted-foreground">
                We design, install and maintain access control, CCTV and integrated security solutions across London and the UK. Our reputation is built on transparent pricing, reliable support, and systems that meet your site and compliance requirements.
              </p>
              <p className="text-muted-foreground">
                Today, our team of experienced security engineers works with facilities and IT teams to deliver access control, IP cameras, perimeter security and unified platforms that scale with your needs.
              </p>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
              <img src={aboutTeam} alt="Mainline Access team" className="h-full w-full object-cover" />
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
