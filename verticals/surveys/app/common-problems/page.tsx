import { GuidePage } from "engine";
import { verticalConfig } from "@/config";
import { commonProblemsContent } from "@/data/standardGuidesContent";
import { StandardGuideInternalLinks } from "@/lib/standardGuideExtras";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: `${commonProblemsContent.title} | ${verticalConfig.siteName}`,
  description: commonProblemsContent.metaDescription,
};

export default function CommonProblemsPage() {
  return (
    <GuidePage
      {...commonProblemsContent}
      companyInfo={verticalConfig.companyInfo}
      baseUrl={verticalConfig.baseUrl}
      path="/common-problems"
      afterSections={<StandardGuideInternalLinks />}
    />
  );
}
