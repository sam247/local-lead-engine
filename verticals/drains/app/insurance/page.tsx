import { GuidePage } from "engine";
import { verticalConfig } from "@/config";
import { insuranceContent } from "@/data/standardGuidesContent";
import { StandardGuideInternalLinks } from "@/lib/standardGuideExtras";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: `${insuranceContent.title} | ${verticalConfig.siteName}`,
  description: insuranceContent.metaDescription,
};

export default function InsurancePage() {
  return (
    <GuidePage
      {...insuranceContent}
      companyInfo={verticalConfig.companyInfo}
      baseUrl={verticalConfig.baseUrl}
      path="/insurance"
      afterSections={<StandardGuideInternalLinks />}
    />
  );
}
