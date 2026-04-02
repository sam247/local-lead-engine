import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyInfo } from "@/lib/data";
import { verticalConfig } from "@/config";
import { TrackablePhoneLink } from "engine";

type CostBand = {
  label: string;
  range: string;
  description: string;
};

type ExampleJob = {
  title: string;
  range: string;
};

type CtaLink = {
  label: string;
  href: string;
};

type CostPageLink = {
  title: string;
  href: string;
};

type CostFaq = {
  question: string;
  answer: string;
};

export type CostPageTemplateProps = {
  h1: string;
  intro: string;
  typicalCostsTitle: string;
  typicalCosts: CostBand[];
  costFactorsTitle: string;
  costFactors: string[];
  exampleJobsTitle: string;
  exampleJobs: ExampleJob[];
  quotesTitle: string;
  quotesBody: string;
  ctaTitle: string;
  ctaBullets: string[];
  ctaLinks: CtaLink[];
  relatedLinksTitle: string;
  relatedLinks: CostPageLink[];
  faqs?: CostFaq[];
};

export default function CostPageTemplate({
  h1,
  intro,
  typicalCostsTitle,
  typicalCosts,
  costFactorsTitle,
  costFactors,
  exampleJobsTitle,
  exampleJobs,
  quotesTitle,
  quotesBody,
  ctaTitle,
  ctaBullets,
  ctaLinks,
  relatedLinksTitle,
  relatedLinks,
  faqs = [],
}: CostPageTemplateProps) {
  return (
    <>
      <section className="border-b border-border/60 bg-muted/40 py-10">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">{h1}</h1>
            <p className="text-base text-muted-foreground md:text-lg">{intro}</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">Get a quote</Link>
              </Button>
              <TrackablePhoneLink
                phone={companyInfo.phone}
                vertical={verticalConfig.verticalId}
                serviceSlug={null}
                locationSlug={null}
                pagePath="/companies-cost"
                source="cta"
                context={{
                  page: "/companies-cost",
                  voiceWebhookPath: "/api/twilio/voice",
                  vertical: verticalConfig.verticalId,
                }}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Phone className="h-4 w-4" />
                {companyInfo.phone}
              </TrackablePhoneLink>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container">
          <h2 className="mb-6 font-display text-2xl font-bold md:text-3xl">{typicalCostsTitle}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {typicalCosts.map((band) => (
              <div key={band.label} className="rounded-lg border border-border bg-background p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{band.label}</p>
                <p className="mt-1 text-lg font-semibold text-foreground">{band.range}</p>
                <p className="mt-2 text-sm text-muted-foreground">{band.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10 bg-secondary">
        <div className="container">
          <h2 className="mb-5 font-display text-2xl font-bold md:text-3xl">{costFactorsTitle}</h2>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            {costFactors.map((factor) => (
              <li key={factor}>{factor}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container">
          <h2 className="mb-5 font-display text-2xl font-bold md:text-3xl">{exampleJobsTitle}</h2>
          <div className="space-y-4">
            {exampleJobs.map((job) => (
              <div key={job.title} className="border-b border-border/60 pb-4 last:border-0 last:pb-0">
                <p className="font-medium text-foreground">{job.title}</p>
                <p className="text-sm text-muted-foreground">{job.range}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10 bg-secondary">
        <div className="container">
          <h2 className="mb-4 font-display text-2xl font-bold md:text-3xl">{quotesTitle}</h2>
          <p className="text-muted-foreground">{quotesBody}</p>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container">
          <h2 className="mb-4 font-display text-2xl font-bold md:text-3xl">{ctaTitle}</h2>
          <ul className="mb-6 list-disc space-y-2 pl-5 text-muted-foreground">
            {ctaBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            {ctaLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10 bg-secondary">
        <div className="container">
          <h2 className="mb-5 font-display text-2xl font-bold md:text-3xl">{relatedLinksTitle}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {relatedLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-primary transition-colors hover:text-primary/80">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {faqs.length > 0 ? (
        <section className="py-8 md:py-10">
          <div className="container">
            <h2 className="mb-5 font-display text-2xl font-bold md:text-3xl">Frequently asked pricing questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-lg border border-border bg-background p-5">
                  <h3 className="font-semibold text-foreground">{faq.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
