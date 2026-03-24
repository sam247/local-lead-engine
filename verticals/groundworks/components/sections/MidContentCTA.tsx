import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, HardHat } from "lucide-react";
import { companyInfo } from "@/lib/data";
import { verticalConfig } from "@/config";
import { TrackablePhoneLink } from "engine";

interface MidContentCTAProps {
  message?: string;
  buttonText?: string;
  buttonLink?: string;
}

const MidContentCTA = ({
  message = "Need expert groundworks for your next project? Get a detailed quote from our experienced team.",
  buttonText = "Get a Groundworks Quote",
  buttonLink = "/contact",
}: MidContentCTAProps) => {
  return (
    <div className="my-8 rounded-lg border-2 border-primary/20 bg-primary/5 p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <HardHat className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="mb-4 font-medium">{message}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="default" variant="highlight" asChild>
              <Link href={buttonLink}>{buttonText}</Link>
            </Button>
            <TrackablePhoneLink
              phone={companyInfo.phone}
              vertical={verticalConfig.verticalId}
              serviceSlug={null}
              locationSlug={null}
              className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Phone className="h-4 w-4" /> Call Now
            </TrackablePhoneLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidContentCTA;
