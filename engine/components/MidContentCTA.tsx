import Link from "next/link";
import { Button } from "./ui/button";
import { Phone, Camera } from "lucide-react";
import type { CompanyInfo } from "../types";

export interface MidContentCTAProps {
  companyInfo: CompanyInfo;
  message?: string;
  buttonText?: string;
  buttonLink?: string;
}

export function MidContentCTA({
  companyInfo,
  message = "Think you may have an issue? A professional inspection will give you a definitive answer.",
  buttonText = "Book an Inspection",
  buttonLink = "/contact",
}: MidContentCTAProps) {
  return (
    <div className="my-8 rounded-lg border-2 border-primary/20 bg-primary/5 p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Camera className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="mb-4 font-medium">{message}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="default" variant="highlight" asChild>
              <Link href={buttonLink}>{buttonText}</Link>
            </Button>
            <a
              href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Phone className="h-4 w-4" /> {companyInfo.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
