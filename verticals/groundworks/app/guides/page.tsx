import { GuidesHubPage } from "engine";
import { verticalConfig } from "@/config";
import { guidesHubIntro } from "@/data/standardGuidesContent";
import { guidesHubTopicCard } from "@/lib/guidesHub";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const cards = [
  { title: "How it works", description: "Typical sequence from enquiry to completion.", href: "/how-it-works" },
  { title: "Process", description: "Steps we follow on groundworks packages.", href: "/process" },
  { title: "Common problems", description: "Ground conditions and logistics challenges.", href: "/common-problems" },
  { title: "Cost guide", description: "What drives pricing—without speculative figures.", href: "/companies-cost" },
  { title: "FAQ", description: "Answers to common questions.", href: "/faq" },
  guidesHubTopicCard,
];

export const metadata: Metadata = {
  title: `Groundworks Guides | ${verticalConfig.siteName}`,
  description: guidesHubIntro.slice(0, 155),
};

export default function GuidesIndexPage() {
  return (
    <GuidesHubPage
      h1="Groundworks guides"
      intro={guidesHubIntro}
      cards={cards}
      companyInfo={verticalConfig.companyInfo}
      baseUrl={verticalConfig.baseUrl}
    />
  );
}
