import type { Metadata } from "next";
import { verticalConfig } from "@/config";
import CostPageTemplate from "@/components/CostPageTemplate";
import { companiesCostPage, getCompaniesCostLinks } from "@/lib/companiesCostPage";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  const title = `How Much Do ${companiesCostPage.titleEntity} Companies Cost in the UK? | ${verticalConfig.siteName}`;
  const description =
    "Commercial groundwork company cost guidance with realistic pricing bands, quote advice, and links to local contractor pages.";
  return {
    title,
    description,
    alternates: {
      canonical: `${verticalConfig.baseUrl}/companies-cost`,
    },
  };
}

export default function CompaniesCostPage() {
  const relatedLinks = getCompaniesCostLinks(5);
  const ctaLinks = [
    ...(relatedLinks[0] ? [{ label: relatedLinks[0].title, href: relatedLinks[0].href }] : []),
    ...(relatedLinks[1] ? [{ label: relatedLinks[1].title, href: relatedLinks[1].href }] : []),
    { label: "Request a local quote", href: "/contact" },
  ];

  return (
    <CostPageTemplate
      h1={companiesCostPage.h1}
      intro={companiesCostPage.intro}
      typicalCostsTitle={companiesCostPage.typicalCostsTitle}
      typicalCosts={companiesCostPage.typicalCosts}
      costFactorsTitle={companiesCostPage.costFactorsTitle}
      costFactors={companiesCostPage.costFactors}
      exampleJobsTitle={companiesCostPage.exampleJobsTitle}
      exampleJobs={companiesCostPage.exampleJobs}
      quotesTitle={companiesCostPage.quotesTitle}
      quotesBody={companiesCostPage.quotesBody}
      ctaTitle={companiesCostPage.ctaTitle}
      ctaBullets={companiesCostPage.ctaBullets}
      ctaLinks={ctaLinks}
      relatedLinksTitle="Popular groundwork services by location"
      relatedLinks={relatedLinks}
      faqs={companiesCostPage.faqs}
    />
  );
}
