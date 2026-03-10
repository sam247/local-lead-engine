import { PillarGuide } from "engine";
import { verticalConfig } from "@/config";
import { getCollapsedDrainsGuideProps } from "@/lib/pillarGuideProps";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: `Survey Guides | ${verticalConfig.siteName}`,
  description:
    "When you need a survey, which type to choose, and how much it costs. Planning, development and construction. Expert guide from Mainline Surveys.",
  alternates: {
    canonical: `${verticalConfig.baseUrl}/collapsed-drains-complete-guide`,
  },
};

export default function CollapsedDrainsGuidePage() {
  const props = getCollapsedDrainsGuideProps();
  return <PillarGuide {...props} />;
}
