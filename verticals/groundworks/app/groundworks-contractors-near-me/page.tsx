import { notFound } from "next/navigation";
import { services, locations } from "@/lib/data";
import { getHeroImage } from "@/lib/images";
import { verticalConfig } from "@/config";
import { groundworksAllowsServiceSlugForLocation } from "@/lib/controlledTerritoryGeneration";
import { NearMePage } from "engine";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const serviceSlug = "groundworks-contractors";
const pagePath = "/groundworks-contractors-near-me";
const WAVE1_MICRO_LOCATION_IDS = new Set(["chislehurst", "sidcup", "bickley", "mottingham", "new-eltham"]);

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
  const nearMeLocations = locations.filter((loc) =>
    groundworksAllowsServiceSlugForLocation(loc.id, serviceSlug)
  );
  const orderedLocations = [...nearMeLocations].sort((a, b) => {
    const aWave1 = WAVE1_MICRO_LOCATION_IDS.has(a.id) ? 1 : 0;
    const bWave1 = WAVE1_MICRO_LOCATION_IDS.has(b.id) ? 1 : 0;
    if (aWave1 !== bWave1) return aWave1 - bWave1;
    return a.name.localeCompare(b.name);
  });
  return (
    <NearMePage
      service={service}
      locations={orderedLocations}
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
      ctaVariants={verticalConfig.ctaVariants}
      callTrackVertical={verticalConfig.verticalId}
    />
  );
}
