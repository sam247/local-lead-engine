import Link from "next/link";
import { Button } from "./ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { SchemaMarkup } from "../schema/SchemaMarkup";
import { FAQSchema, type FAQItem } from "../schema/FAQSchema";
import { InspectionCTA } from "./InspectionCTA";
import { getImageAlt } from "../utils/imageAlt";
import type { CompanyInfo } from "../types";
import { TrackablePhoneLink } from "./TrackablePhoneLink";
import { QuoteFormPrimaryCta } from "./QuoteFormPrimaryCta";
import { getCtaVariant } from "../utils/ctaVariants";

export interface PillarGuideSection {
  id: string;
  title: string;
  intro: string;
  links: { label: string; href: string }[];
}

export interface PillarGuideProps {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  guidePath: string;
  sections: PillarGuideSection[];
  guideFaqs: FAQItem[];
  companyInfo: CompanyInfo;
  baseUrl: string;
  contactPath?: string;
  bottomCtaTitle?: string;
  bottomCtaBody?: string;
  /** Optional: render DiagnosisTool, CostEstimator, etc. between sections */
  extraSections?: { id: string; title: string; content: React.ReactNode }[];
  callTrackVertical: string;
  ctaVariants: readonly string[];
  /** When set, CTA auto-optimization keys off this service slug. */
  ctaBiasServiceSlug?: string | null;
}

export function PillarGuide({
  heroTitle,
  heroSubtitle,
  heroImage,
  guidePath,
  sections,
  guideFaqs,
  companyInfo,
  baseUrl,
  contactPath = "/contact",
  bottomCtaTitle = "Need Expert Help?",
  bottomCtaBody = "Contact us for a free inspection and no-obligation quote.",
  extraSections = [],
  callTrackVertical,
  ctaVariants,
  ctaBiasServiceSlug = null,
}: PillarGuideProps) {
  const quoteCtaSeed = `${callTrackVertical}-pillar${guidePath}`;
  const quoteCtaLabel = getCtaVariant(quoteCtaSeed, ctaVariants, {
    serviceSlug: ctaBiasServiceSlug ?? undefined,
  });
  const toc: { id: string; title: string }[] = [
    ...sections.map((s) => ({ id: s.id, title: s.title })),
    ...extraSections.map((s) => ({ id: s.id, title: s.title })),
  ];

  return (
    <>
      <SchemaMarkup
        type="Article"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          title: heroTitle,
          description: heroSubtitle,
          url: guidePath,
        }}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: heroTitle, url: guidePath },
          ],
        }}
      />
      <section className="relative bg-primary py-16 md:py-24">
        <div className="absolute inset-0">
          <img
          src={heroImage}
          alt={getImageAlt({ service: heroTitle, noLocationSuffix: "guide" })}
          className="h-full w-full object-cover opacity-20"
        />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">
              {heroTitle}
            </h1>
            <p className="mb-6 text-lg text-primary-foreground/80">{heroSubtitle}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <QuoteFormPrimaryCta
                contactPath={contactPath}
                size="lg"
                variant="secondary"
                ctaText={quoteCtaLabel}
                ctaSeed={quoteCtaSeed}
              >
                {quoteCtaLabel}
              </QuoteFormPrimaryCta>
              <TrackablePhoneLink
                phone={companyInfo.phone}
                vertical={callTrackVertical}
                serviceSlug={null}
                locationSlug={null}
                pagePath={guidePath}
                className="flex items-center gap-2 text-primary-foreground"
              >
                <Phone className="h-5 w-5" /> Call Now
              </TrackablePhoneLink>
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-border bg-secondary py-8">
        <div className="container">
          <h2 className="mb-4 font-display text-lg font-bold">In This Guide</h2>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
            {toc.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <ArrowRight className="h-3 w-3" /> {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-4xl space-y-16">
            {sections.map((section) => (
              <div key={section.id} id={section.id}>
                <h2 className="mb-4 font-display text-3xl font-bold">{section.title}</h2>
                <p className="mb-6 text-muted-foreground">{section.intro}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded border border-border p-3 text-sm transition-colors hover:border-primary"
                    >
                      {link.label} <ArrowRight className="ml-1 inline h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <InspectionCTA
              companyInfo={companyInfo}
              contactPath={contactPath}
              ctaText={quoteCtaLabel}
              ctaSeed={quoteCtaSeed}
              callTrackVertical={callTrackVertical}
              callTrackPagePath={guidePath}
            />
            {extraSections.map((s) => (
              <div key={s.id} id={s.id}>
                <h2 className="mb-4 font-display text-3xl font-bold">{s.title}</h2>
                {s.content}
              </div>
            ))}
          </div>
        </div>
      </section>
      <FAQSchema items={guideFaqs} title={`${heroTitle} FAQs`} />
      <section className="bg-primary py-16">
        <div className="container text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground">
            {bottomCtaTitle}
          </h2>
          <p className="mb-6 text-primary-foreground/80">{bottomCtaBody}</p>
          <QuoteFormPrimaryCta
            contactPath={contactPath}
            size="lg"
            variant="secondary"
            ctaText={quoteCtaLabel}
            ctaSeed={quoteCtaSeed}
          >
            {quoteCtaLabel}
          </QuoteFormPrimaryCta>
        </div>
      </section>
    </>
  );
}
