import { notFound } from "next/navigation";
import { services, locations } from "@/lib/data";
import { getHeroImage } from "@/lib/images";
import { verticalConfig } from "@/config";
import { NearMePage } from "engine";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const serviceSlug = "scaffolding-contractors";
const pagePath = "/scaffolding-contractors-near-me";

export async function generateMetadata(): Promise<Metadata> {
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) return { title: "Not Found" };
  return {
    title: `${service.title} Near Me | ${verticalConfig.siteName}`,
    description: `Find scaffolding contractors near you. ${verticalConfig.siteName} provides NASC accredited domestic and commercial scaffolding across the UK. Free quotes — rapid mobilisation.`,
    alternates: { canonical: `${verticalConfig.baseUrl}${pagePath}` },
  };
}

export default function NearMeRoute() {
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) notFound();
  const otherServices = services.filter((s) => s.slug !== service.slug);
  const serviceImage = getHeroImage({ serviceSlug: service.slug });
  const nearMeIntro =
    "We cover domestic, commercial and specialist scaffolding across the UK — pick your area below for local coverage and contact options.";
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
        "NASC accredited scaffolding contractors",
        "TG20-compliant structures with full inspection records",
        "Handover certificates issued on every project",
      ]}
      conversionHeading="Need scaffolding? Get a free quote"
      ctaVariants={verticalConfig.ctaVariants}
      callTrackVertical={verticalConfig.verticalId}
    />
  );
}
