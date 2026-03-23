import { notFound } from "next/navigation";
import { services, locations, getRelevantTopicsForService } from "@/lib/data";
import { projects } from "@/data/projects";
import { getHeroImage, getProjectImage } from "@/lib/images";
import { verticalConfig } from "@/config";
import { LocationPage, getNeighbourLocationIds, buildLocationContextParagraph } from "engine";
import { buildLocationMetadata } from "engine";
import type { Metadata } from "next";
import {
  isTopicLocationSlug,
  getTopicForRouteSlug,
  getTopicLocationStaticParams,
} from "@/lib/topicLocationConfig";
import { TopicLocationPage } from "@/app/components/TopicLocationPage";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  const serviceLocationParams = services.flatMap((s) =>
    locations.map((l) => ({ serviceSlug: s.slug, locationSlug: l.id }))
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
    const topic = getTopicForRouteSlug(serviceSlug);
    if (!topic) return { title: "Not Found" };
    const title = `${topic.title} in ${location.name} | ${verticalConfig.siteName}`;
    const description =
      topic.intro.slice(0, 120) +
      ` We provide ${topic.title.toLowerCase()} across ${location.name} and ${location.area}.`;
    const canonical = `${verticalConfig.baseUrl}/${serviceSlug}/${locationSlug}`;
    return { title, description, alternates: { canonical } };
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
    const topic = getTopicForRouteSlug(serviceSlug);
    if (!topic) notFound();
    return (
      <TopicLocationPage
        topic={topic}
        location={location}
        topicSlug={serviceSlug}
        locationSlug={locationSlug}
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
      answer: `Yes, we provide ${service.title.toLowerCase()} throughout ${location.name} and ${location.area} for commercial and residential projects.`,
    },
    {
      question: `Do you offer quotes for groundworks in ${location.name}?`,
      answer: `Yes. We provide free, no-obligation quotes for groundworks in ${location.name}. Send us your site details and we will come back with a detailed quote.`,
    },
    {
      question: `What groundworks do you do in ${location.name}?`,
      answer: `We deliver piling (including CFA), underpinning, foundation repair, concrete repair, excavation, site clearance, foundations, concrete foundations and enabling works in ${location.name} and ${location.area}.`,
    },
    {
      question: `How long do groundworks take in ${location.name}?`,
      answer: `Programme depends on the scope. We work to your schedule and provide clear timelines when we quote. Contact us for a programme for your project in ${location.name}.`,
    },
    {
      question: `Are you insured for groundworks in ${location.name}?`,
      answer: `Yes. We are fully insured and accredited for groundworks. We can provide documentation when you request a quote in ${location.name}.`,
    },
  ].slice(0, 5);

  const trustPoints = [
    "Years of experience in " + location.area,
    "Fully insured and accredited",
    "Programme-led delivery",
    "Quality assured and certified",
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

  const introParagraph = `We provide ${service.title} across ${location.name} and ${location.area}. Our team delivers piling, underpinning, foundation repair, concrete works and wider site preparation for commercial and residential projects, with free no-obligation quotes.`;

  const relatedTopicLinks = getRelevantTopicsForService(service.slug);

  const extraServiceLocationLinks =
    service.slug === "piling-contractors" || service.slug === "foundation-contractors"
      ? [
          { href: `/underpinning/${location.id}`, children: `Underpinning in ${location.name}` },
          { href: `/foundation-repair/${location.id}`, children: `Foundation repair in ${location.name}` },
        ]
      : service.slug === "foundation-repair"
        ? [{ href: `/underpinning/${location.id}`, children: `Underpinning in ${location.name}` }]
        : undefined;

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
      trustSectionTitle={`Trusted Groundworks Contractors in ${location.name}`}
      trustPoints={trustPoints}
      diagnosisGuidePath="/guides/groundworks-process"
      introParagraph={introParagraph}
      extraServiceLocationLinks={extraServiceLocationLinks}
      nearbyAreasDescription={`Compare our ${service.title} in nearby areas.`}
      neighbourLocationsForContext={neighbourLocationsForContext}
      locationContextParagraph={locationContextParagraph}
      nearbyProjects={nearbyProjectsList.length > 0 ? nearbyProjectsList : undefined}
      relatedTopicLinks={relatedTopicLinks.length > 0 ? relatedTopicLinks : undefined}
    />
  );
}
