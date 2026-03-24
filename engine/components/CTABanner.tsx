import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import type { CompanyInfo } from "../types";

export interface CTABannerProps {
  companyInfo: CompanyInfo;
  contactPath?: string;
  heading?: string;
  body?: string;
  ctaText?: string;
}

export function CTABanner({
  companyInfo,
  contactPath = "/contact",
  heading = "Need project guidance?",
  body = "Share your site details and priorities. We will outline a practical scope, likely timeline, and next steps.",
  ctaText = "Request a site visit",
}: CTABannerProps) {
  return (
    <section className="bg-secondary py-16 text-primary md:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-primary md:text-4xl">
            {heading}
          </h2>
          <p className="mb-8 text-lg text-primary">{body}</p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="highlight" className="text-base" asChild>
              <Link href={contactPath}>
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
