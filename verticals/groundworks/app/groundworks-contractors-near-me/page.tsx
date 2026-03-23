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
    description: `Find ${service.title.toLowerCase()} near you. ${verticalConfig.siteName} delivers piling, excavation, foundations and site preparation across the UK. Free quotes.`,
    alternates: { canonical: `${verticalConfig.baseUrl}${pagePath}` },
  };
}

export default function NearMeRoute() {
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) notFound();
  const otherServices = services.filter((s) => s.slug !== service.slug);
  const serviceImage = getHeroImage({ serviceSlug: service.slug });
  return (
    <NearMePage
      service={service}
      locations={locations}
      companyInfo={verticalConfig.companyInfo}
      serviceImage={serviceImage}
      otherServices={otherServices}
      baseUrl={verticalConfig.baseUrl}
      pagePath={pagePath}
      introParagraph={verticalConfig.relatedLocationsIntro}
      sectionTitle={`${service.title} by Location`}
      trustBlockTitle={`Why choose ${verticalConfig.siteName}`}
      trustBlockPoints={[
        "Fully insured groundworks teams with documented health and safety",
        "Single accountability from enabling works through to handover",
        "Piling, excavation and foundations delivered to specification",
      ]}
      conversionHeading="Planning a groundworks package?"
      secondaryCtaLabel={verticalConfig.heroSecondaryCtaText}
      secondaryCtaPath="/contact"
    />
  );
}
