"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { trackEvent } from "engine";
import { companyInfo } from "@/lib/data";

const StickyEmergencyBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex items-center justify-between gap-3 py-2.5">
        <span className="hidden text-sm font-semibold text-foreground md:block">
          24/7 Emergency Drain Engineers
        </span>
        <div className="flex w-full items-center gap-2 md:w-auto">
          <Button variant="highlight" size="sm" asChild className="flex-1 md:flex-none">
            <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`} className="gap-2" onClick={() => trackEvent("call_button_click")}>
              <Phone className="h-4 w-4" />
              <span className="md:hidden">Call Now</span>
              <span className="hidden md:inline">Call Now</span>
            </a>
          </Button>
          <Button size="sm" asChild className="flex-1 md:flex-none">
            <Link href="/contact" className="gap-2">
              Request Inspection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyEmergencyBar;
