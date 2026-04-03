import Link from "next/link";
import { CheckCircle, Users, Shield, CircleCheck } from "lucide-react";
import { aboutTeam } from "@/lib/images";
import { services } from "@/lib/data";
import { verticalConfig } from "@/config";
import CTABanner from "@/components/sections/CTABanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { GroupFooter, getServiceUrl } from "engine";
import { mainlineGroupLinksForSite } from "engine/data/mainline-group";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "About Us | Mainline Drains",
  description:
    "Mainline Drains is part of Mainline Group. Specialist drainage repair, CCTV surveys and emergency drainage across London and the UK.",
  alternates: { canonical: "https://mainlinedrains.co.uk/about" },
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
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">About Mainline Drains</h1>
            <p className="text-lg text-primary-foreground/80">
              Specialist drainage contractors for homes and businesses — from emergency response and blockage clearance to CCTV surveys, relining and commercial drainage. We focus on clear diagnosis, transparent pricing and work that is built to last.
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
                Mainline Drains delivers drainage repair, maintenance and survey services for residential and commercial clients. We work with property owners, facilities teams and contractors when drains fail, need investigation or require planned renewal.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Mainline Drains is part of the wider Mainline Group,</strong> delivering specialist drainage services across the UK alongside our survey, security and groundworks divisions.
              </p>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
              <img src={aboutTeam} alt="Mainline Drains team" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-bold">What we do</h2>
          <p className="mb-6 text-muted-foreground">
            Our services cover the full drainage lifecycle — emergency call-outs, jetting and unblocking, CCTV inspection, relining, excavation and commercial maintenance. Examples include:
          </p>
          <ul className="mb-6 grid gap-2 sm:grid-cols-2">
            {servicePreview.map((s) => (
              <li key={s.slug}>
                <Link href={getServiceUrl(s.slug)} className="text-sm text-primary hover:underline">
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
              <strong className="text-foreground">Brief and attendance.</strong> We clarify the issue, site access and urgency — including 24/7 emergency response where required.
            </li>
            <li>
              <strong className="text-foreground">Diagnosis and options.</strong> We use CCTV and on-site assessment where appropriate, then recommend proportionate repair or renewal options with clear pricing.
            </li>
            <li>
              <strong className="text-foreground">Delivery and handover.</strong> We complete agreed works safely, reinstate where needed and leave you with documentation suitable for insurance or compliance where relevant.
            </li>
          </ol>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-bold">Where we operate</h2>
          <p className="text-muted-foreground">
            We serve clients across London and the wider UK. Local service pages cover towns and areas we work in regularly; contact us to confirm coverage for your postcode or site.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-bold">Mainline Group</h2>
          <p className="mb-6 text-muted-foreground">
            Mainline Drains is one of five specialist divisions under Mainline Group. Other divisions cover land and measured building surveys, commercial security and access control, groundworks, and scaffolding. You are on the{" "}
            <strong className="text-foreground">Mainline Drains</strong> site; explore sister divisions below if your project spans drainage, surveys, site security, scaffolding or civils.
          </p>
          <GroupFooter
            items={groupLinks}
            variant="default"
            groupLinkUtmSource={verticalConfig.verticalId}
          />
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container">
          <h2 className="mb-12 text-center font-display text-3xl font-bold">What guides us</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: CheckCircle, title: "Reliability", desc: "24/7 when you need us most" },
              { icon: Shield, title: "Honesty", desc: "Transparent pricing, no hidden costs" },
              { icon: Users, title: "Expertise", desc: "Skilled, certified engineers" },
              { icon: CircleCheck, title: "Quality", desc: "Documented outcomes and guarantees where agreed" },
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
