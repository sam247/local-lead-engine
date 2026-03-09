import Link from "next/link";
import { Button } from "./ui/button";
import { Phone, Mail, ArrowRight } from "lucide-react";
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
  heading = "Need an Expert?",
  body = "Get in touch today for a free, no-obligation quote. Our team is ready to help — 24/7.",
  ctaText = "Get a Free Quote",
}: CTABannerProps) {
  return (
    <section className="bg-secondary py-16 text-primary md:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-primary md:text-4xl">
            {heading}
          </h2>
          <p className="mb-8 text-lg text-primary">{body}</p>

          <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="highlight" className="text-base" asChild>
              <Link href={contactPath}>
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 text-primary sm:flex-row">
            <a
              href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 transition-colors hover:text-primary-foreground"
            >
              <Phone className="h-5 w-5" />
              {companyInfo.phone}
            </a>
            <a
              href={`mailto:${companyInfo.email}`}
              className="flex items-center gap-2 transition-colors hover:text-primary-foreground"
            >
              <Mail className="h-5 w-5" />
              {companyInfo.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
