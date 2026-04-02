import type { Metadata } from "next";
import { verticalConfig } from "@/config";
import CostPageTemplate from "@/components/CostPageTemplate";
import CTABanner from "@/components/sections/CTABanner";
import { companiesCostPage, getCompaniesCostLinks } from "@/lib/companiesCostPage";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  const title = `How Much Do ${companiesCostPage.titleEntity} Companies Cost in the UK? | ${verticalConfig.siteName}`;
  const description =
    "Access control company pricing guidance for commercial sites, with practical ranges, quote planning, and local contractor links.";
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
    { label: "CCTV installation services", href: "/cctv-installation" },
    ...(relatedLinks[0] ? [{ label: relatedLinks[0].title, href: relatedLinks[0].href }] : []),
    ...(relatedLinks[1] ? [{ label: relatedLinks[1].title, href: relatedLinks[1].href }] : []),
    { label: "Request a local quote", href: "/contact" },
  ];

  return (
    <>
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
        relatedLinksTitle="Popular access control services by location"
        relatedLinks={relatedLinks}
        faqs={companiesCostPage.faqs}
      />
      <CTABanner />
    </>
  );
}
