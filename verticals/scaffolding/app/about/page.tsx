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
  title: `About Us | ${verticalConfig.siteName}`,
  description:
    "Mainline Scaffold is part of Mainline Group. NASC accredited scaffolding contractors for domestic and commercial projects across the UK.",
  alternates: { canonical: `${verticalConfig.baseUrl}/about` },
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
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">
              About Mainline Scaffold
            </h1>
            <p className="text-lg text-primary-foreground/80">
              NASC accredited scaffolding contractors for domestic, commercial and specialist projects. We design, erect, inspect and certify scaffolding structures to TG20 standards.
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
                Mainline Scaffold provides domestic and commercial scaffolding for homeowners, builders, main contractors and facilities managers. We handle everything from a single chimney scaffold to multi-level commercial maintenance contracts.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Mainline Scaffold is part of the wider Mainline Group,</strong> delivering specialist scaffolding across the UK alongside our drainage, surveying, groundworks and security divisions.
              </p>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
              <img src={aboutTeam} alt="Mainline Scaffold team" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-bold">What we do</h2>
          <p className="mb-6 text-muted-foreground">Our services cover the full range of scaffolding requirements:</p>
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
              <strong className="text-foreground">Survey and design.</strong> We visit the site, assess access requirements and design the scaffold structure to TG20 or bespoke standard.
            </li>
            <li>
              <strong className="text-foreground">Erection and certification.</strong> Our CISRS-trained teams erect the structure, carry out the pre-use inspection and issue a scaffold tag before handover.
            </li>
            <li>
              <strong className="text-foreground">Ongoing inspection.</strong> We re-inspect at the required intervals and issue updated inspection records throughout the project.
            </li>
            <li>
              <strong className="text-foreground">Strike and handover.</strong> We strike on completion, remove all materials and issue a final handover certificate.
            </li>
          </ol>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-bold">Accreditation and compliance</h2>
          <p className="text-muted-foreground">
            We are NASC accredited and work to TG20 on all scaffolding structures. All our operatives hold current CISRS cards. We carry public liability and employer's liability insurance and provide full documentation — scaffold tags, inspection records and handover certificates — on every project.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-bold">Mainline Group</h2>
          <p className="mb-6 text-muted-foreground">
            Mainline Scaffold is one of five specialist divisions under Mainline Group. Other divisions cover drainage, surveying, groundworks and commercial security. You are on the{" "}
            <strong className="text-foreground">Mainline Scaffold</strong> site; sister divisions are linked below.
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
              { icon: CheckCircle, title: "Safety first", desc: "TG20 compliance on every structure" },
              { icon: Shield, title: "Accountability", desc: "Full documentation as standard" },
              { icon: Users, title: "Reliability", desc: "Programme-led delivery" },
              { icon: CircleCheck, title: "Quality", desc: "NASC accredited workmanship" },
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
