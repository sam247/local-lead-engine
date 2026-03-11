import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { companyInfo } from "@/lib/data";

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

          <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="highlight" className="text-base" asChild>
              <Link href="/contact">
                Get a Free Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row text-primary">
            <a
              href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 transition-colors hover:text-primary-foreground">
              
              <Phone className="h-5 w-5" />
              Call Now
            </a>
            <a
              href={`mailto:${companyInfo.email}`}
              className="flex items-center gap-2 transition-colors hover:text-primary-foreground">
              
              <Mail className="h-5 w-5" />
              {companyInfo.email}
            </a>
          </div>
        </div>
      </div>
    </section>);

};

export default CTABanner;