"use client";

import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { QuoteFormPrimaryCta, getCtaVariant, inferServiceSlugForCtaBias } from "engine";
import { services } from "@/lib/data";
import { verticalConfig } from "@/config";

const CTABanner = () => {
  const pathname = usePathname();
  const pagePath = pathname && pathname.length > 0 ? pathname : "/";
  const ctaSeed = `${verticalConfig.verticalId}-${pagePath}`;
  const ctaLabel = getCtaVariant(ctaSeed, verticalConfig.ctaVariants, {
    serviceSlug: inferServiceSlugForCtaBias(pathname, services),
  });

  return (
    <section className="py-16 md:py-20 bg-secondary text-primary">
      <div className="container">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl text-primary">
            Get a scaffolding quote today
          </h2>
          <p className="text-lg text-primary/90">
            Fast response from accredited scaffolding contractors. No obligation.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <QuoteFormPrimaryCta
              contactPath="/contact"
              size="lg"
              variant="highlight"
              className="text-base"
              ctaText={ctaLabel}
              ctaSeed={ctaSeed}
            >
              <span className="inline-flex items-center">
                {ctaLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </QuoteFormPrimaryCta>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
