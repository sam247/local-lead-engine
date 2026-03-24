import { notFound } from "next/navigation";
import { services, locations } from "@/lib/data";
import { getHeroImage } from "@/lib/images";
import { verticalConfig } from "@/config";
import { NearMePage } from "engine";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const serviceSlug = "drain-collapse-repair";
const pagePath = "/drain-collapse-near-me";

export async function generateMetadata(): Promise<Metadata> {
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) return { title: "Not Found" };
  return {
    title: `${service.title} Near Me | ${verticalConfig.siteName}`,
    description: `Find ${service.title.toLowerCase()} services near you. ${verticalConfig.siteName} covers London and surrounding areas with 24/7 emergency response. Free quotes available.`,
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
      trustBlockTitle="Why choose MainLine Drains"
      trustBlockPoints={[
        "Emergency response available",
        "Local engineers across the UK",
        "CCTV diagnostics and drain repair specialists",
      ]}
      conversionHeading="Need urgent drain repair?"
      secondaryCtaLabel={verticalConfig.heroSecondaryCtaText}
      secondaryCtaPath="/contact"
      callTrackVertical={verticalConfig.verticalId}
    />
  );
}
