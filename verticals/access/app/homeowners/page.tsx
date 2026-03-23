import { GuidePage } from "engine";
import { verticalConfig } from "@/config";
import { homeownersContent } from "@/data/standardGuidesContent";
import { StandardGuideInternalLinks } from "@/lib/standardGuideExtras";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: `${homeownersContent.title} | ${verticalConfig.siteName}`,
  description: homeownersContent.metaDescription,
};

export default function HomeownersPage() {
  return (
    <GuidePage
      {...homeownersContent}
      companyInfo={verticalConfig.companyInfo}
      baseUrl={verticalConfig.baseUrl}
      path="/homeowners"
      afterSections={<StandardGuideInternalLinks />}
    />
  );
}
