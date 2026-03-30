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
      <div className="container flex min-h-[52px] items-center justify-between gap-2 py-2.5 sm:gap-3">
        <span
          key={displayText}
          className="min-w-0 flex-1 text-sm font-semibold leading-snug text-foreground transition-opacity duration-200 md:line-clamp-2"
        >
          {displayText}
        </span>
        <div className="flex shrink-0 items-center gap-2 md:w-auto">
          <Button variant="highlight" asChild className="flex-1 md:flex-none">
            <a href={`tel:${digits}`} className="gap-2" onClick={onCallClick}>
              <Phone className="h-4 w-4 shrink-0" />
              <span className="md:hidden">{ctaPrimary}</span>
              <span className="hidden md:inline">{ctaPrimary}</span>
            </a>
          </Button>
          <Button asChild className="flex-1 md:flex-none">
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
