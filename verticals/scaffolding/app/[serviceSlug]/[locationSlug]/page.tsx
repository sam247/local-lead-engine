import { notFound, permanentRedirect } from "next/navigation";
import { services, locations, getRelevantTopicsForService, RELATED_SERVICE_SLUGS_BY_SERVICE } from "@/lib/data";
import { getHeroImage } from "@/lib/images";
import { verticalConfig } from "@/config";
import {
  LocationPage,
  getNeighbourLocationIds,
  buildLocationContextParagraph,
  buildLocationMetadata,
} from "engine";
import type { Metadata } from "next";
import CTABanner from "@/components/sections/CTABanner";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  return services.flatMap((s) =>
    locations.map((l) => ({ serviceSlug: s.slug, locationSlug: l.id }))
  );
}

type Props = { params: { serviceSlug: string; locationSlug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug, locationSlug } = params;
  const hasNumericSuffix = /-(\d+)$/.test(locationSlug);
  const canonicalLocationSlug = hasNumericSuffix ? locationSlug.replace(/(-\d+)+$/, "") : locationSlug;
  const location = locations.find((l) => l.id === canonicalLocationSlug);
  if (!location) return { title: "Not Found" };
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) return { title: "Not Found" };
  const base = buildLocationMetadata(service, location, verticalConfig);
  return {
    ...base,
    title: `${service.title} in ${location.name} | ${verticalConfig.siteName}`,
  };
}

export default async function LocationRoute({ params }: Props) {
  const { serviceSlug, locationSlug } = params;

  const hasNumericSuffix = /-(\d+)$/.test(locationSlug);
  if (hasNumericSuffix) {
    const canonicalLocationSlug = locationSlug.replace(/(-\d+)+$/, "");
    const canonicalLocation = locations.find((l) => l.id === canonicalLocationSlug);
    if (canonicalLocation) {
      permanentRedirect(`/${serviceSlug}/${canonicalLocationSlug}`);
    }
  }

  const service = services.find((s) => s.slug === serviceSlug);
  const location = locations.find((l) => l.id === locationSlug);
  if (!service || !location) notFound();

  const sameAreaLocations = locations.filter((l) => l.area === location.area && l.id !== location.id);
  const neighbourIds = getNeighbourLocationIds(location.id, locations.map((l) => l.id));
  const nearbyLocations = neighbourIds
    .map((id) => locations.find((l) => l.id === id))
    .filter((l): l is NonNullable<typeof l> => l !== undefined);

  const serviceImage = getHeroImage({ serviceSlug: service.slug });

  const relatedTopicLinks = getRelevantTopicsForService(service.slug);

  // Build otherServices as Service[] ordered by the priority map, capped at 5
  const prioritySlugs = RELATED_SERVICE_SLUGS_BY_SERVICE[service.slug] ?? [];
  const otherServices = [
    ...prioritySlugs.map((slug) => services.find((s) => s.slug === slug)).filter((s): s is NonNullable<typeof s> => s !== undefined),
    ...services.filter((s) => s.slug !== service.slug && !prioritySlugs.includes(s.slug)),
  ].slice(0, 5);

  const locationContext = buildLocationContextParagraph(location, service, verticalConfig.locationContextTemplate ?? "");

  const pageFaqs = [
    {
      question: `Do you provide ${service.title.toLowerCase()} in ${location.name}?`,
      answer: `Yes — we provide ${service.title.toLowerCase()} across ${location.name} and the wider ${location.area} area. Contact us for a free, no-obligation quote.`,
    },
    {
      question: `How quickly can you mobilise scaffolding in ${location.name}?`,
      answer: `We typically mobilise within 48 hours for standard scaffolding work in ${location.name}. For emergency scaffolding we operate 24/7 and can respond within hours.`,
    },
    {
      question: `Are you NASC-accredited in ${location.name}?`,
      answer: `Yes. We work to NASC guidance and TG20 on all scaffolding across ${location.name} and ${location.area}. All structures are tagged, inspected and documented.`,
    },
  ];

  return (
    <>
      <LocationPage
        service={service}
        location={location}
        sameAreaLocations={sameAreaLocations}
        nearbyLocations={nearbyLocations}
        faqs={pageFaqs}
        heroImage={serviceImage}
        heroAlt={`${service.title} in ${location.name}`}
        companyInfo={verticalConfig.companyInfo}
        baseUrl={verticalConfig.baseUrl}
        locationContext={locationContext}
        relatedTopicLinks={relatedTopicLinks.length > 0 ? relatedTopicLinks : undefined}
        relatedTopicsSectionTitle={`Scaffolding guidance for ${location.name}`}
        otherServices={otherServices}
        callTrackVertical={verticalConfig.verticalId}
        sectionIntros={verticalConfig.sectionIntros}
        relatedServicesIntro={verticalConfig.relatedServicesIntro}
        relatedLocationsIntro={verticalConfig.relatedLocationsIntro}
      />
      <CTABanner />
    </>
  );
}
