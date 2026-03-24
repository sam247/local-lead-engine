import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "./ui/button";
import type { CompanyInfo } from "../types";
import { TrackablePhoneLink } from "./TrackablePhoneLink";

interface ActionPanelProps {
  companyInfo: CompanyInfo;
  contactPath?: string;
  heading: string;
  body: string;
  ctaText: string;
  className?: string;
  callTrackVertical?: string;
  callTrackServiceSlug?: string | null;
  callTrackLocationSlug?: string | null;
  callTrackPagePath?: string;
}

export function ActionPanel({
  companyInfo,
  contactPath = "/contact",
  heading,
  body,
  ctaText,
  className,
  callTrackVertical,
  callTrackServiceSlug = null,
  callTrackLocationSlug = null,
  callTrackPagePath,
}: ActionPanelProps) {
  const phoneDigits = companyInfo.phone.replace(/\s/g, "");
  const telHref = `tel:${phoneDigits}`;
  return (
    <div className={className ?? "mb-8 rounded-lg border border-border bg-secondary/40 p-6"}>
      <h3 className="mb-2 font-display text-xl font-bold">{heading}</h3>
      <p className="mb-4 text-muted-foreground">{body}</p>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button asChild variant="highlight">
          <Link href={contactPath}>{ctaText}</Link>
        </Button>
        {callTrackVertical ? (
          <TrackablePhoneLink
            phone={companyInfo.phone}
            vertical={callTrackVertical}
            serviceSlug={callTrackServiceSlug}
            locationSlug={callTrackLocationSlug}
            pagePath={callTrackPagePath}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <Phone className="h-4 w-4" />
            {companyInfo.phone}
          </TrackablePhoneLink>
        ) : (
          <a href={telHref} className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            <Phone className="h-4 w-4" />
            {companyInfo.phone}
          </a>
        )}
      </div>
    </div>
  );
}
