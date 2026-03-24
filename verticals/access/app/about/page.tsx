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
  title: "About Us | Mainline Access",
  description:
    "Mainline Access is part of Mainline Group. Commercial access control, CCTV and integrated security for UK sites.",
  alternates: { canonical: "https://mainlineaccess.co.uk/about" },
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
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">About Mainline Access</h1>
            <p className="text-lg text-primary-foreground/80">
              Commercial access control, CCTV, perimeter protection and system integration for offices, logistics, healthcare and critical sites. We design and deliver proportionate security that fits your operations and compliance needs.
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
                Mainline Access supplies and supports electronic security for commercial and public-sector clients — from door access and intercom to IP cameras, perimeter detection and unified monitoring platforms.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Mainline Access is part of the wider Mainline Group,</strong> delivering specialist security and access services across the UK alongside our drainage, surveying and groundworks divisions.
              </p>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
              <img src={aboutTeam} alt="Mainline Access team" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-bold">What we do</h2>
          <p className="mb-6 text-muted-foreground">
            Our services cover access, video, perimeter and integration. Examples include:
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
              <strong className="text-foreground">Discovery and design.</strong> We review site layout, risk, IT constraints and standards, then propose hardware and software that match your brief.
            </li>
            <li>
              <strong className="text-foreground">Installation and commissioning.</strong> Our engineers install, configure and test systems, including handover documentation and user training as agreed.
            </li>
            <li>
              <strong className="text-foreground">Support and evolution.</strong> We provide ongoing support options and can extend systems as sites grow or requirements change.
            </li>
          </ol>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-bold">Where we operate</h2>
          <p className="text-muted-foreground">
            We work UK-wide, with strong coverage in London and the South East. Contact us to discuss national roll-outs or single-site projects.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-bold">Mainline Group</h2>
          <p className="mb-6 text-muted-foreground">
            Mainline Access is one of four specialist divisions under Mainline Group. Other divisions cover drainage, land and building surveys, and groundworks. You are on the{" "}
            <strong className="text-foreground">Mainline Access</strong> site; related divisions are linked below.
          </p>
          <GroupFooter items={groupLinks} variant="default" />
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container">
          <h2 className="mb-12 text-center font-display text-3xl font-bold">What guides us</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: CheckCircle, title: "Reliability", desc: "Engineered for uptime and support" },
              { icon: Shield, title: "Honesty", desc: "Clear options and pricing" },
              { icon: Users, title: "Expertise", desc: "Commercial security specialists" },
              { icon: CircleCheck, title: "Quality", desc: "Tested handover and documentation" },
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
