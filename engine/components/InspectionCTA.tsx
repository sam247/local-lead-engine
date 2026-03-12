import Link from "next/link";
import { Button } from "./ui/button";
import { Phone, Search } from "lucide-react";
import type { CompanyInfo } from "../types";

export interface InspectionCTAProps {
  companyInfo: CompanyInfo;
  contactPath?: string;
  heading?: string;
  body?: string;
  ctaText?: string;
}

export function InspectionCTA({
  companyInfo,
  contactPath = "/contact",
  heading = "Get a Free Quote",
  body = "Contact us for a no-obligation quote or to discuss your project. We'll advise on the best approach and provide clear pricing.",
  ctaText = "Get a Quote",
}: InspectionCTAProps) {
  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 md:p-8">
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
            <a
              href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Phone className="h-4 w-4" />
              {companyInfo.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
