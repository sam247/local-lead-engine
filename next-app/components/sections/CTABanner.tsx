import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="py-16 md:py-20 bg-secondary text-primary">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl text-primary">
            Need a Drainage Expert?
          </h2>
          <p className="mb-8 text-lg text-primary">
            Get in touch today for a free, no-obligation quote. Our team is ready to help with all your drainage needs — 24/7.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="highlight" className="text-base" asChild>
              <Link href="/contact">
                Get a Free Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>);

};

export default CTABanner;