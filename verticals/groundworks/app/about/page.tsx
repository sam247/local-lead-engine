import Link from "next/link";
import { CheckCircle, Users, Shield, CircleCheck } from "lucide-react";
import { aboutTeam } from "@/lib/images";
import { services } from "@/lib/data";
import { verticalConfig } from "@/config";
import CTABanner from "@/components/sections/CTABanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { MainlineGroupLinks } from "engine";
import { mainlineGroupLinksForSite } from "engine/data/mainline-group";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "About Us | Mainline Groundworks",
  description:
    "Mainline Groundworks is part of Mainline Group. Piling, excavation, foundations and site preparation for UK construction projects.",
  alternates: { canonical: "https://mainlinegroundworks.co.uk/about" },
};

const groupLinks = mainlineGroupLinksForSite(verticalConfig.baseUrl);
const servicePreview = services.slice(0, 6);

export default function AboutPage() {
  return (
    <>
      <SchemaMarkup
        type="BreadcrumbList"
        data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: "About Us", url: "/about" }] }}
      />
      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">About Mainline Groundworks</h1>
            <p className="text-lg text-primary-foreground/80">
              Groundworks contractors for housing, commercial and industrial projects — piling, excavation, site clearance, foundations and enabling works. We align with programme, design information and site constraints from the outset.
            </p>
            <p className="mt-3 text-sm text-primary-foreground/70">Part of Mainline Group.</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 font-display text-3xl font-bold">Who we are</h2>
              <p className="mb-4 text-muted-foreground">
                Mainline Groundworks delivers civils and substructure packages for developers and main contractors — from reduced dig and piling through to drainage interfaces, slabs and enabling works.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Mainline Groundworks is part of the wider Mainline Group,</strong> delivering specialist groundworks across the UK alongside our drainage, surveying and security divisions.
              </p>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
              <img src={aboutTeam} alt="Mainline Groundworks team" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-bold">What we do</h2>
          <p className="mb-6 text-muted-foreground">
            Our services span the groundworks package. Examples include:
          </p>
          <ul className="mb-6 grid gap-2 sm:grid-cols-2">
            {servicePreview.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-sm text-primary hover:underline">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/services" className="text-sm font-medium text-primary hover:underline">
            View all services →
          </Link>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-bold">How we work</h2>
          <ol className="list-decimal space-y-3 pl-5 text-muted-foreground">
            <li>
              <strong className="text-foreground">Pre-start and planning.</strong> We review drawings, ground conditions, access and programme, then agree method and milestones with your team.
            </li>
            <li>
              <strong className="text-foreground">Delivery on site.</strong> We execute excavation, piling, foundations and related works with appropriate plant, temporary works and safety controls.
            </li>
            <li>
              <strong className="text-foreground">Handover.</strong> We complete agreed tolerances, surveys where required and hand over to follow-on trades in a clean, documented state.
            </li>
          </ol>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-bold">Where we operate</h2>
          <p className="text-muted-foreground">
            We undertake projects across the UK — from regional housing sites to commercial and industrial schemes. Contact us to discuss your location and programme.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-bold">Mainline Group</h2>
          <p className="mb-6 text-muted-foreground">
            Mainline Groundworks is one of four specialist divisions under Mainline Group. Other divisions cover drainage, surveying, and commercial security. You are on the{" "}
            <strong className="text-foreground">Mainline Groundworks</strong> site; sister divisions are linked below.
          </p>
          <MainlineGroupLinks items={groupLinks} variant="inline" />
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container">
          <h2 className="mb-12 text-center font-display text-3xl font-bold">What guides us</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: CheckCircle, title: "Reliability", desc: "Programme-led delivery" },
              { icon: Shield, title: "Honesty", desc: "Straightforward communication" },
              { icon: Users, title: "Expertise", desc: "Experienced site teams" },
              { icon: CircleCheck, title: "Quality", desc: "Specification-led workmanship" },
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
