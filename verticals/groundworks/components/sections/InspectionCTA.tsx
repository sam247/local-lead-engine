import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, ClipboardCheck } from "lucide-react";
import { companyInfo } from "@/lib/data";
import { verticalConfig } from "@/config";
import { TrackablePhoneLink } from "engine";

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
            <TrackablePhoneLink
              phone={companyInfo.phone}
              vertical={verticalConfig.verticalId}
              serviceSlug={null}
              locationSlug={null}
              context={{
                voiceWebhookPath: "/api/twilio/voice",
                vertical: verticalConfig.verticalId,
              }}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Phone className="h-4 w-4" />
              {companyInfo.phone}
            </TrackablePhoneLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionCTA;
