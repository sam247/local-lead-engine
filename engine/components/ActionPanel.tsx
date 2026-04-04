import { Phone } from "lucide-react";
import { Button } from "./ui/button";
import { QuoteFormPrimaryCta } from "./QuoteFormPrimaryCta";
import type { CompanyInfo } from "../types";
import type { PageTier, PageType } from "../lib/pageWeighting";
import { pageSeoDataAttrs } from "../lib/pageWeighting";
import { TrackablePhoneLink } from "./TrackablePhoneLink";

export interface ActionPanelProps {
  companyInfo: CompanyInfo;
  contactPath?: string;
  heading: string;
  body: string;
  ctaText: string;
  /** Same seed passed to getCtaVariant for this label (when applicable). */
  ctaSeed?: string;
  className?: string;
  callTrackVertical?: string;
  callTrackServiceSlug?: string | null;
  callTrackLocationSlug?: string | null;
  callTrackPagePath?: string;
  pageTier?: PageTier;
  pageType?: PageType;
}

export function ActionPanel({
  companyInfo,
  contactPath = "/contact",
  heading,
  body,
  ctaText,
  ctaSeed,
  className,
  callTrackVertical,
  callTrackServiceSlug = null,
  callTrackLocationSlug = null,
  callTrackPagePath,
  pageTier,
  pageType,
}: ActionPanelProps) {
  return (
    <div
      className={className ?? "mb-8 rounded-lg border border-border bg-secondary/40 p-6"}
      {...pageSeoDataAttrs(pageTier, pageType)}
    >
      <h3 className="mb-2 font-display text-xl font-bold">{heading}</h3>
      <p className="mb-4 text-muted-foreground">{body}</p>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <QuoteFormPrimaryCta
          contactPath={contactPath}
          variant="highlight"
          size="default"
          ctaText={ctaText}
          ctaSeed={ctaSeed}
        >
          {ctaText}
        </QuoteFormPrimaryCta>
        <TrackablePhoneLink
          phone={companyInfo.phone}
          vertical={callTrackVertical ?? ""}
          serviceSlug={callTrackServiceSlug}
          locationSlug={callTrackLocationSlug}
          pagePath={callTrackPagePath}
          source="cta"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </TrackablePhoneLink>
      </div>
    </div>
  );
}
