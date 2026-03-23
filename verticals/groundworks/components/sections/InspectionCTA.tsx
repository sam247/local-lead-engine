import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, ClipboardCheck } from "lucide-react";
import { companyInfo } from "@/lib/data";

const InspectionCTA = () => {
  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary">
          <ClipboardCheck className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="mb-2 font-display text-xl font-bold">Need a Professional Site Assessment?</h3>
          <p className="mb-4 text-muted-foreground">
            Planning a construction project or concerned about ground conditions? Our experienced engineers carry out thorough site assessments to evaluate soil stability, foundation requirements, and access logistics — so your project starts on solid ground.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="highlight" size="lg" asChild>
              <Link href="/contact">Book a Site Assessment</Link>
            </Button>
            <a
              href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionCTA;
