import Link from "next/link";
import type { PageTier, PageType } from "../lib/pageWeighting";
import { pageSeoDataAttrs } from "../lib/pageWeighting";
import { Button } from "./ui/button";
import { QuoteFormPrimaryCta } from "./QuoteFormPrimaryCta";

export interface ProblemCTAProps {
  message: string;
  serviceLinks: { slug: string; label: string }[];
  basePath?: string;
  contactPath?: string;
  /** Primary quote button label (e.g. from getCtaVariant). */
  quoteCtaLabel?: string;
  quoteCtaSeed?: string;
  pageTier?: PageTier;
  pageType?: PageType;
}

export function ProblemCTA({
  message,
  serviceLinks,
  basePath = "/services",
  contactPath = "/contact",
  quoteCtaLabel = "Get a Free Quote",
  quoteCtaSeed,
  pageTier,
  pageType,
}: ProblemCTAProps) {
  return (
    <div
      className="rounded-lg border border-primary/20 bg-primary/5 p-6 md:p-8"
      {...pageSeoDataAttrs(pageTier, pageType)}
    >
      <p className="mb-4 text-muted-foreground">{message}</p>
      <div className="flex flex-wrap gap-3">
        {serviceLinks.map(({ slug, label }) => (
          <Button key={slug} variant="outline" size="sm" asChild>
            <Link href={`${basePath}/${slug}`}>{label}</Link>
          </Button>
        ))}
        <QuoteFormPrimaryCta
          contactPath={contactPath}
          variant="highlight"
          size="default"
          ctaText={quoteCtaLabel}
          ctaSeed={quoteCtaSeed}
        >
          {quoteCtaLabel}
        </QuoteFormPrimaryCta>
      </div>
    </div>
  );
}
