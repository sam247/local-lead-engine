import { GuidePage } from "engine";
import { verticalConfig } from "@/config";
import { howItWorksContent } from "@/data/standardGuidesContent";
import { StandardGuideInternalLinks } from "@/lib/standardGuideExtras";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: `${howItWorksContent.title} | ${verticalConfig.siteName}`,
  description: howItWorksContent.metaDescription,
};

export default function HowItWorksPage() {
  return (
    <GuidePage
      {...howItWorksContent}
      companyInfo={verticalConfig.companyInfo}
      baseUrl={verticalConfig.baseUrl}
      path="/how-it-works"
      afterSections={<StandardGuideInternalLinks />}
    />
  );
}
