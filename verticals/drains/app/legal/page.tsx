import { GuidePage } from "engine";
import { verticalConfig } from "@/config";
import { legalContent } from "@/data/standardGuidesContent";
import { StandardGuideInternalLinks } from "@/lib/standardGuideExtras";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: `${legalContent.title} | ${verticalConfig.siteName}`,
  description: legalContent.metaDescription,
};

export default function LegalPage() {
  return (
    <GuidePage
      {...legalContent}
      companyInfo={verticalConfig.companyInfo}
      baseUrl={verticalConfig.baseUrl}
      path="/legal"
      afterSections={<StandardGuideInternalLinks />}
    />
  );
}
