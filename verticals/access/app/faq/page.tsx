import { GuidePage, FAQSchemaJsonLd } from "engine";
import { verticalConfig } from "@/config";
import { faqPageItems } from "@/data/standardGuidesContent";
import { StandardGuideInternalLinks } from "@/lib/standardGuideExtras";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const sections = faqPageItems.map((q) => ({
  heading: q.question,
  paragraphs: [q.answer],
}));

export const metadata: Metadata = {
  title: `FAQ | ${verticalConfig.siteName}`,
  description: "Common questions about drainage surveys, repairs and emergency call-outs.",
};

export default function FaqPage() {
  return (
    <>
      <FAQSchemaJsonLd items={faqPageItems} />
      <GuidePage
        title="FAQ"
        metaDescription="Common questions about drainage surveys, repairs and emergency call-outs."
        intro="Quick answers about how we work, surveys and emergencies. For project-specific advice, contact us with your address and symptoms."
        sections={sections}
        companyInfo={verticalConfig.companyInfo}
        baseUrl={verticalConfig.baseUrl}
        path="/faq"
        afterSections={<StandardGuideInternalLinks />}
      />
    </>
  );
}
