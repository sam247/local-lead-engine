import Link from "next/link";
import { Button } from "./ui/button";
import { Phone, Search } from "lucide-react";
import type { CompanyInfo } from "../types";
import type { PageTier, PageType } from "../lib/pageWeighting";
import { pageSeoDataAttrs } from "../lib/pageWeighting";
import { TrackablePhoneLink } from "./TrackablePhoneLink";

export interface InspectionCTAProps {
  companyInfo: CompanyInfo;
  contactPath?: string;
  heading?: string;
  body?: string;
  ctaText?: string;
  /** When set, phone taps are tracked before opening the dialer */
  callTrackVertical?: string;
  callTrackServiceSlug?: string | null;
  callTrackLocationSlug?: string | null;
  callTrackPagePath?: string;
  pageTier?: PageTier;
  pageType?: PageType;
}

export function InspectionCTA({
  companyInfo,
  contactPath = "/contact",
  heading = "Get a Free Quote",
  body = "Contact us for a no-obligation quote or to discuss your project. We'll advise on the best approach and provide clear pricing.",
  ctaText = "Get a Quote",
  callTrackVertical,
  callTrackServiceSlug = null,
  callTrackLocationSlug = null,
  callTrackPagePath,
  pageTier,
  pageType,
}: InspectionCTAProps) {
  return (
    <div
      className="rounded-lg border border-primary/20 bg-primary/5 p-6 md:p-8"
      {...pageSeoDataAttrs(pageTier, pageType)}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary">
          <Search className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="mb-2 font-display text-xl font-bold">{heading}</h3>
          <p className="mb-4 text-muted-foreground">{body}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="highlight" size="lg" asChild>
              <Link href={contactPath}>{ctaText}</Link>
            </Button>
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
              {companyInfo.phone}
            </TrackablePhoneLink>
          </div>
        </div>
      </div>
    </div>
  );
}
