import { notFound, redirect } from "next/navigation";
import { services, locations, getRelevantTopicsForService } from "@/lib/data";
import { projects } from "@/data/projects";
import { getHeroImage, getProjectImage } from "@/lib/images";
import { verticalConfig } from "@/config";
import { LocationPage, getNeighbourLocationIds, buildLocationContextParagraph } from "engine";
import { buildLocationMetadata } from "engine";
import type { Location } from "engine";
import type { Metadata } from "next";
import {
  isTopicLocationSlug,
  isGlobalTopicSlugForLocation,
  getGlobalTopicCanonicalPath,
  getTopicForRouteSlug,
  getTopicLocationStaticParams,
  TOPIC_HUB_PATH,
} from "@/lib/topicLocationConfig";
import { TopicLocationPage } from "@/app/components/TopicLocationPage";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  const serviceLocationParams = services.flatMap((s) =>
    locations.map((l: Location) => ({ serviceSlug: s.slug, locationSlug: l.id }))
  );
  const topicLocationParams = getTopicLocationStaticParams(locations);
  return [...serviceLocationParams, ...topicLocationParams];
}

type Props = { params: { serviceSlug: string; locationSlug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug, locationSlug } = params;
  const location = locations.find((l) => l.id === locationSlug);
  if (!location) return { title: "Not Found" };

  if (isTopicLocationSlug(serviceSlug)) {
    if (isGlobalTopicSlugForLocation(serviceSlug)) {
      const canonicalTopicPath = getGlobalTopicCanonicalPath(serviceSlug);
      if (!canonicalTopicPath) return { title: "Not Found" };
      return {
        title: "Redirecting",
        alternates: { canonical: `${verticalConfig.baseUrl}${canonicalTopicPath}` },
      };
    }
    const topic = getTopicForRouteSlug(serviceSlug);
    if (!topic) return { title: "Not Found" };
    const title = `${topic.title} in ${location.name} | Business Security Systems`;
    const metaDescription =
      topic.metaDescription.slice(0, 140) +
      ` We provide ${topic.title.toLowerCase()} across ${location.name} and ${location.area}.`;
    const canonical = `${verticalConfig.baseUrl}/${serviceSlug}/${locationSlug}`;
    return {
      title,
      description: metaDescription,
      alternates: { canonical },
    };
  }

  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) return { title: "Not Found" };
  return buildLocationMetadata(service, location, verticalConfig);
}

export default async function LocationRoute({ params }: Props) {
  const { serviceSlug, locationSlug } = params;
  const location = locations.find((l) => l.id === locationSlug);
  if (!location) notFound();

  if (isTopicLocationSlug(serviceSlug)) {
    if (isGlobalTopicSlugForLocation(serviceSlug)) {
      const canonicalTopicPath = getGlobalTopicCanonicalPath(serviceSlug);
      if (!canonicalTopicPath) notFound();
      redirect(canonicalTopicPath);
    }
    const topic = getTopicForRouteSlug(serviceSlug);
    if (!topic) notFound();
    const topicHubPath = TOPIC_HUB_PATH[topic.slug] ?? "/cctv-guides";
    return (
      <TopicLocationPage
        topic={topic}
        location={location}
        topicSlug={serviceSlug}
        locationSlug={locationSlug}
        topicHubPath={topicHubPath}
      />
    );
  }

  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) notFound();

  const sameAreaLocations = locations.filter(
    (l) => l.id !== location.id && l.area === location.area
  );
  const nearbyLocations =
    sameAreaLocations.length >= 4
      ? sameAreaLocations.slice(0, 8)
      : [
          ...sameAreaLocations,
          ...locations.filter(
            (l) => l.id !== location.id && l.area !== location.area
          ),
        ].slice(0, 8);

  const localFaqs = [
    {
      question: `Do you provide ${service.title.toLowerCase()} in ${location.name}?`,
      answer: `Yes, we provide ${service.title.toLowerCase()} throughout ${location.name} and ${location.area} for commercial and public-sector sites.`,
    },
    {
      question: `Do you offer free quotes in ${location.name}?`,
      answer: `Yes. We provide free, no-obligation site surveys and quotes for ${location.name} security projects.`,
    },
    {
      question: `Can you integrate with our existing security systems in ${location.name}?`,
      answer: `We integrate access control and CCTV with existing systems where possible and recommend upgrades when needed. We work with major brands and open protocols.`,
    },
    {
      question: `Do you offer maintenance and support in ${location.area}?`,
      answer: `Yes. We offer planned maintenance and support for sites across ${location.name} and ${location.area}.`,
    },
    {
      question: `What industries do you work with in ${location.name}?`,
      answer: `We work with hospitals, data centres, warehouses, offices and commercial buildings across ${location.name} and the UK.`,
    },
  ].slice(0, 5);

  const trustPoints = [
    "Years of experience serving " + location.area,
    "Commercial and public-sector specialists",
    "Fully insured engineers",
    "Integration with existing systems",
  ];

  const otherServices = services.filter((s) => s.id !== service.id);
  const serviceImage = getHeroImage({ serviceSlug: service.slug });

  const neighbourIds = getNeighbourLocationIds(location.id, locations.map((l) => l.id));
  const neighbourLocationsForContext = neighbourIds
    .map((id) => locations.find((l) => l.id === id))
    .filter((l): l is NonNullable<typeof l> => l != null)
    .slice(0, 8);

  const displayTitle = service.titleSingular ?? service.title;
  const nearbyTowns =
    location.nearbyTowns && location.nearbyTowns.length > 0
      ? location.nearbyTowns
      : neighbourLocationsForContext.map((l) => l.name).slice(0, 5);
  const locationContextParagraph =
    verticalConfig.locationContextTemplate
      ? buildLocationContextParagraph(verticalConfig.locationContextTemplate, {
          serviceTitle: displayTitle,
          locationName: location.name,
          area: location.area,
          nearbyTowns,
        })
      : undefined;

  const eligibleProjectIds = new Set([location.id, ...neighbourIds]);
  const nearbyProjectsList = projects
    .filter((p) => p.locationId && eligibleProjectIds.has(p.locationId))
    .slice(0, 3)
    .map((p, i) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      image: getProjectImage(p, i),
      url: `/projects#${p.id}`,
    }));

  const introParagraph = `We provide ${service.title} across ${location.name} and ${location.area}. Our team offers design, installation and maintenance for commercial and public-sector sites, with free no-obligation site surveys and quotes.`;

  const relatedTopicLinks = getRelevantTopicsForService(service.slug);

  return (
    <LocationPage
      service={service}
      location={location}
      serviceSlug={serviceSlug}
      locationSlug={locationSlug}
      sameAreaLocations={sameAreaLocations}
      nearbyLocations={nearbyLocations}
      localFaqs={localFaqs}
      companyInfo={verticalConfig.companyInfo}
      otherServices={otherServices}
      baseUrl={verticalConfig.baseUrl}
      serviceImage={serviceImage}
      contactPath="/contact"
      trustSectionTitle={`Trusted Security Engineers in ${location.name}`}
      trustPoints={trustPoints}
      introParagraph={introParagraph}
      nearbyAreasDescription={`Compare our ${service.title} in nearby areas.`}
      neighbourLocationsForContext={neighbourLocationsForContext}
      locationContextParagraph={locationContextParagraph}
      nearbyProjects={nearbyProjectsList.length > 0 ? nearbyProjectsList : undefined}
      relatedTopicLinks={relatedTopicLinks.length > 0 ? relatedTopicLinks : undefined}
      relatedTopicsSectionTitle={relatedTopicLinks.length > 0 ? `Security advice for businesses in ${location.name}` : undefined}
      callTrackVertical={verticalConfig.verticalId}
    />
  );
}
