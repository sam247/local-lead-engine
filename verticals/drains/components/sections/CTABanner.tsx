import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="py-16 md:py-20 bg-secondary text-primary">
      <div className="container">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl text-primary">
            Get a drainage quote today
          </h2>
          <p className="text-lg text-primary/90">
            Fast response from local specialists. No obligation.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="highlight" className="text-base" asChild>
              <Link href="/contact">
                Request a Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>);

};

export default CTABanner;