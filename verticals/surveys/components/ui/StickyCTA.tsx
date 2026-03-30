"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { digitsFromPhone, handleCallClick } from "engine";
import { companyInfo } from "@/lib/data";
import { verticalConfig } from "@/config";
import { usePathname } from "next/navigation";
import { useSelectedIssue } from "@/components/context/SelectedIssueContext";
import type { StickyCtaConfig } from "@/lib/stickyCtaConfig";

export function StickyCTA({ defaultText, issueMap, ctaPrimary, ctaSecondary }: StickyCtaConfig) {
  const { selectedIssue } = useSelectedIssue();
  const pathname = usePathname();

  const displayText =
    selectedIssue && issueMap?.[selectedIssue] ? issueMap[selectedIssue] : defaultText;

  const digits = digitsFromPhone(companyInfo.phone);
  const page_path = pathname ?? "";
  const verticalId = verticalConfig.verticalId;

  const callContext = {
    page_path,
    service_slug: null as string | null,
    location_slug: null as string | null,
    vertical: verticalId,
    source: "inline" as const,
  };

  const onCallClick = (e: MouseEvent<HTMLAnchorElement>) => {
    window.gtag?.("event", "cta_click", {
      type: "call",
      source: "sticky_bar",
      issue_slug: selectedIssue || "none",
      message: displayText,
      vertical: verticalId,
    });
    handleCallClick(e, digits, callContext);
  };

  const onFormClick = () => {
    window.gtag?.("event", "cta_click", {
      type: "form",
      source: "sticky_bar",
      issue_slug: selectedIssue || "none",
      message: displayText,
      vertical: verticalId,
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex flex-col items-center gap-3 py-3 md:min-h-[52px] md:flex-row md:items-center md:justify-between md:gap-3 md:py-2.5">
        <span
          key={displayText}
          className="max-w-md text-center text-sm font-semibold leading-snug text-foreground transition-opacity duration-200 md:min-w-0 md:flex-1 md:text-left md:line-clamp-2"
        >
          {displayText}
        </span>
        <div className="flex w-full max-w-md shrink-0 justify-center gap-2 sm:max-w-none md:w-auto md:justify-end">
          <Button variant="highlight" asChild className="min-w-0 flex-1 sm:flex-none">
            <a href={`tel:${digits}`} className="gap-2" onClick={onCallClick}>
              <Phone className="h-4 w-4 shrink-0" />
              {ctaPrimary}
            </a>
          </Button>
          <Button asChild className="min-w-0 flex-1 sm:flex-none">
            <Link href="/contact" className="gap-2" onClick={onFormClick}>
              {ctaSecondary}
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
