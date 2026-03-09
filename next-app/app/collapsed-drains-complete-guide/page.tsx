import PillarGuideContent from "@/components/pages/PillarGuideContent";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "Collapsed Drains: The Complete Guide | Mainline Drains",
  description: "Everything you need to know about collapsed drains — signs, causes, inspection methods, repair options, costs and insurance. Expert guide from Mainline Drains.",
  alternates: { canonical: "https://mainlinedrains.co.uk/collapsed-drains-complete-guide" },
};

export default function CollapsedDrainsGuidePage() {
  return <PillarGuideContent />;
}
