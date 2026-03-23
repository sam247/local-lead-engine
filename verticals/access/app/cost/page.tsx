import { GuidePage } from "engine";
import { verticalConfig } from "@/config";
import { costGuideContent } from "@/data/standardGuidesContent";
import { StandardGuideInternalLinks } from "@/lib/standardGuideExtras";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: `${costGuideContent.title} | ${verticalConfig.siteName}`,
  description: costGuideContent.metaDescription,
};

export default function CostGuidePage() {
  return (
    <GuidePage
      {...costGuideContent}
      companyInfo={verticalConfig.companyInfo}
      baseUrl={verticalConfig.baseUrl}
      path="/cost"
      afterSections={<StandardGuideInternalLinks />}
    />
  );
}
