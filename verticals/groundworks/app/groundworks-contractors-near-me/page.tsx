import { notFound } from "next/navigation";
import { services, locations } from "@/lib/data";
import { getHeroImage } from "@/lib/images";
import { verticalConfig } from "@/config";
import { NearMePage } from "engine";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const serviceSlug = "groundworks-contractors";
const pagePath = "/groundworks-contractors-near-me";

export async function generateMetadata(): Promise<Metadata> {
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) return { title: "Not Found" };
  return {
    title: `${service.title} Near Me | ${verticalConfig.siteName}`,
    description: `Find ${service.title.toLowerCase()} near you. ${verticalConfig.siteName} delivers piling, underpinning, foundation repair, concrete works and site preparation across the UK. Free quotes.`,
    alternates: { canonical: `${verticalConfig.baseUrl}${pagePath}` },
  };
}

export default function NearMeRoute() {
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) notFound();
  const otherServices = services.filter((s) => s.slug !== service.slug);
  const serviceImage = getHeroImage({ serviceSlug: service.slug });
  const nearMeIntro =
    "We cover piling (including CFA), underpinning, foundation repair and concrete works nationwide — pick your area below for local coverage and contact options.";
  return (
    <NearMePage
      service={service}
      locations={locations}
      companyInfo={verticalConfig.companyInfo}
      serviceImage={serviceImage}
      otherServices={otherServices}
      baseUrl={verticalConfig.baseUrl}
      pagePath={pagePath}
      introParagraph={nearMeIntro}
      sectionTitle={`${service.title} areas we cover`}
      trustBlockTitle={`Why choose ${verticalConfig.siteName}`}
      trustBlockPoints={[
        "Fully insured teams for structural groundworks, piling and repairs",
        "Single accountability from enabling works through to handover",
        "Underpinning, foundation repair and concrete work delivered to specification",
      ]}
      conversionHeading="Planning a groundworks package?"
      secondaryCtaLabel={verticalConfig.heroSecondaryCtaText}
      secondaryCtaPath="/contact"
      callTrackVertical={verticalConfig.verticalId}
    />
  );
}
