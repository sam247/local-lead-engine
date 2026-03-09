import { PillarGuide } from "engine";
import { verticalConfig } from "@/config";
import { getCollapsedDrainsGuideProps } from "@/lib/pillarGuideProps";
import DiagnosisTool from "@/components/sections/DiagnosisTool";
import CostEstimator from "@/components/sections/CostEstimator";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: `Collapsed Drains: The Complete Guide | ${verticalConfig.siteName}`,
  description:
    "Everything you need to know about collapsed drains — signs, causes, inspection methods, repair options, costs and insurance. Expert guide from Mainline Drains.",
  alternates: {
    canonical: `${verticalConfig.baseUrl}/collapsed-drains-complete-guide`,
  },
};

export default function CollapsedDrainsGuidePage() {
  const props = getCollapsedDrainsGuideProps();
  return (
    <PillarGuide
      {...props}
      extraSections={[
        { id: "diagnosis", title: "Diagnose Your Problem", content: <DiagnosisTool /> },
        { id: "estimator", title: "Estimate Your Costs", content: <CostEstimator /> },
      ]}
    />
  );
}
