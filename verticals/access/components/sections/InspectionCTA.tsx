import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Search } from "lucide-react";
import { companyInfo } from "@/lib/data";
import { verticalConfig } from "@/config";
import { TrackablePhoneLink } from "engine";

const InspectionCTA = () => {
  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary">
          <Search className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="mb-2 font-display text-xl font-bold">Need a Security Consultation?</h3>
          <p className="mb-4 text-muted-foreground">
            Whether you need a new access control system, CCTV upgrade or integrated security solution, our team will assess your site and recommend the right options. Get a free, no-obligation quote or book a site survey.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="highlight" size="lg" asChild>
              <Link href="/contact">Request Consultation</Link>
            </Button>
            <TrackablePhoneLink
              phone={companyInfo.phone}
              vertical={verticalConfig.verticalId}
              serviceSlug={null}
              locationSlug={null}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </TrackablePhoneLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionCTA;
