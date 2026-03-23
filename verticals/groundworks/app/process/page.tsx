import { GuidePage } from "engine";
import { verticalConfig } from "@/config";
import { processContent } from "@/data/standardGuidesContent";
import { StandardGuideInternalLinks } from "@/lib/standardGuideExtras";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: `${processContent.title} | ${verticalConfig.siteName}`,
  description: processContent.metaDescription,
};

export default function ProcessPage() {
  return (
    <GuidePage
      {...processContent}
      companyInfo={verticalConfig.companyInfo}
      baseUrl={verticalConfig.baseUrl}
      path="/process"
      afterSections={<StandardGuideInternalLinks />}
    />
  );
}
