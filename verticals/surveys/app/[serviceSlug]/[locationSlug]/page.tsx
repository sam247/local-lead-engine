import { notFound, permanentRedirect } from "next/navigation";
import { services, locations, getRelevantTopicsForService } from "@/lib/data";
import { projects } from "@/data/projects";
import { getHeroImage, getProjectImage } from "@/lib/images";
import { verticalConfig } from "@/config";
import {
  LocationPage,
  getNeighbourLocationIds,
  buildLocationContextParagraph,
  pickRelatedServiceLocationLinks,
} from "engine";
import { buildLocationMetadata } from "engine";
import { pickSurveysL4MetaTitle } from "@/lib/surveysL4TitleTemplates";
import { hasNumericDuplicateSuffix, stripNumericDuplicateSuffix } from "@/lib/numericSlugSuffix";
import { getL4PriorityLocalLinks, getL4StrikingDistanceTarget } from "@/data/l4StrikingDistance";
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
function trimSidebarBullet(input: string, maxWords = 8) {
  const cleaned = input.trim().replace(/\s+/g, " ");
  const words = cleaned.split(/\s+/);
  if (words.length <= maxWords) return cleaned;

  const afterColon = cleaned.includes(":") ? cleaned.split(":").slice(1).join(":").trim() : cleaned;
  const commaPart = afterColon.split(",")[0]?.trim() ?? afterColon;
  const commaWords = commaPart.split(/\s+/).filter(Boolean);
  if (commaWords.length <= maxWords) return commaPart;

  return words.slice(0, maxWords).join(" ");
}

const RELATED_SERVICE_SLUGS_BY_SERVICE: Record<string, string[]> = {
  "topographical-survey": [
    "drone-topographical-survey",
    "drone-survey",
    "utility-survey",
    "utility-mapping-survey",
    "laser-scanning-survey",
  ],
  "measured-building-survey": [
    "laser-scanning-survey",
    "building-surveys",
    "drone-building-inspection",
    "topographical-survey",
    "party-wall-surveyors",
  ],
  "utility-survey": [
    "utility-mapping-survey",
    "topographical-survey",
    "drone-survey",
    "drone-construction-survey",
    "laser-scanning-survey",
  ],
  "utility-mapping-survey": [
    "utility-survey",
    "topographical-survey",
    "drone-survey",
    "drone-construction-survey",
    "laser-scanning-survey",
  ],
  "boundary-survey": [
    "topographical-survey",
    "measured-building-survey",
    "building-surveys",
    "party-wall-surveyors",
    "laser-scanning-survey",
  ],
  "laser-scanning-survey": [
    "measured-building-survey",
    "topographical-survey",
    "drone-survey",
    "drone-building-inspection",
    "building-surveys",
  ],
  "drone-survey": [
    "drone-topographical-survey",
    "drone-construction-survey",
    "topographical-survey",
    "utility-survey",
    "drone-building-inspection",
  ],
  "drone-roof-inspection": [
    "drone-building-inspection",
    "building-surveys",
    "measured-building-survey",
    "drone-survey",
    "laser-scanning-survey",
  ],
  "drone-building-inspection": [
    "drone-roof-inspection",
    "building-surveys",
    "measured-building-survey",
    "laser-scanning-survey",
    "drone-survey",
  ],
  "drone-topographical-survey": [
    "topographical-survey",
    "drone-survey",
    "utility-survey",
    "drone-construction-survey",
    "laser-scanning-survey",
  ],
  "drone-construction-survey": [
    "drone-survey",
    "topographical-survey",
    "utility-mapping-survey",
    "utility-survey",
    "drone-topographical-survey",
  ],
  "building-surveys": [
    "measured-building-survey",
    "drone-building-inspection",
    "drone-roof-inspection",
    "party-wall-surveyors",
    "laser-scanning-survey",
  ],
  "party-wall-surveyors": [
    "building-surveys",
    "measured-building-survey",
    "boundary-survey",
    "topographical-survey",
    "laser-scanning-survey",
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug, locationSlug } = params;
  const hasNumericSuffix = hasNumericDuplicateSuffix(locationSlug);
  const canonicalLocationSlug = hasNumericSuffix
    ? stripNumericDuplicateSuffix(locationSlug)
    : locationSlug;
  const service = services.find((s) => s.slug === serviceSlug);
  const location = locations.find((l) => l.id === canonicalLocationSlug);
  if (!service || !location) return { title: "Not Found" };
  const base = buildLocationMetadata(service, location, verticalConfig);
  return { ...base, title: pickSurveysL4MetaTitle(service, location) };
}

export default async function LocationRoute({ params }: Props) {
  const { serviceSlug, locationSlug } = params;
  const hasNumericSuffix = hasNumericDuplicateSuffix(locationSlug);
  const canonicalLocationSlug = hasNumericSuffix
    ? stripNumericDuplicateSuffix(locationSlug)
    : locationSlug;
  const service = services.find((s) => s.slug === serviceSlug);
  if (hasNumericSuffix) {
    const canonicalLocationExists = locations.some((l) => l.id === canonicalLocationSlug);
    if (service && canonicalLocationExists) {
      if (process.env.NODE_ENV === "development") {
        console.log(
          "[Redirect] Duplicate location slug:",
          locationSlug,
          "->",
          canonicalLocationSlug
        );
      }
      permanentRedirect(`/${serviceSlug}/${canonicalLocationSlug}`);
    }
  }
  const location = locations.find((l) => l.id === canonicalLocationSlug);
  if (!service || !location) notFound();
  const strikingDistanceTarget = getL4StrikingDistanceTarget(service.slug, location.id);

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
      answer: `Yes, we provide comprehensive ${service.title.toLowerCase()} services throughout ${location.name} and surrounding areas in ${location.area}.`,
    },
    {
      question: `How quickly can you carry out a ${service.title.toLowerCase()} in ${location.name}?`,
      answer: `Turnaround depends on site size and scope. We typically schedule site visits within a few days and deliver drawings within a week for standard projects in ${location.name} and ${location.area}.`,
    },
    {
      question: `Do you offer free quotes in ${location.name}?`,
      answer: `Yes. We provide free, no-obligation survey quotes for projects in ${location.name}. Share your site and requirements and we'll match you with a survey partner.`,
    },
    {
      question: `How much does a ${service.title.toLowerCase()} cost in ${location.name}?`,
      answer: `Costs depend on site size, complexity and deliverables. Our survey partners provide fixed quotes once scope is clear. See our cost guides for typical ranges.`,
    },
    {
      question: `Do I need a survey for planning in ${location.name}?`,
      answer: `Most planning applications need an up-to-date topographical survey and often a measured building survey. Our partners in ${location.name} and ${location.area} deliver planning-ready drawings.`,
    },
    {
      question: `Can you do drone surveys in ${location.name}?`,
      answer: `Yes. We connect you with qualified drone survey providers for ${location.name} and ${location.area} — ideal for large sites, roof inspections and progress monitoring.`,
    },
  ].slice(0, 5);

  const trustPoints = [
    "Survey partners across " + location.area,
    "Fixed-price quotes where possible",
    "RICS-linked and qualified surveyors",
    "CAD and BIM deliverables",
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

  const introParagraph =
    strikingDistanceTarget?.introOverride ??
    `We provide ${service.title} across ${location.name} and ${location.area}. Our survey partners deliver accurate, planning-ready data for residential and commercial projects, with free no-obligation quotes.`;

  const relatedTopicLinks = getRelevantTopicsForService(service.slug);
  const extraServiceLocationLinks = pickRelatedServiceLocationLinks({
    currentServiceSlug: service.slug,
    services,
    location,
    priorityByService: RELATED_SERVICE_SLUGS_BY_SERVICE,
    maxLinks: 3,
  }).map((link) => ({ href: link.href, children: link.label }));
  const priorityLocalLinks = getL4PriorityLocalLinks(
    service.slug,
    location.id,
    RELATED_SERVICE_SLUGS_BY_SERVICE
  );

  const sidebarBullets = trustPoints.map((point) => trimSidebarBullet(point, 8)).slice(0, 5);

  return (
    <>
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
        trustSectionTitle={`Trusted survey partners in ${location.name}`}
        trustPoints={trustPoints}
        diagnosisGuidePath="/do-i-need-a-drain-survey"
        introParagraph={introParagraph}
        extraServiceLocationLinks={extraServiceLocationLinks}
        priorityLocalLinks={priorityLocalLinks}
        supplementalSections={strikingDistanceTarget?.supplementalSections}
        nearbyAreasDescription={`Compare our ${service.title} in nearby areas.`}
        neighbourLocationsForContext={neighbourLocationsForContext}
        locationContextParagraph={locationContextParagraph}
        nearbyProjects={nearbyProjectsList.length > 0 ? nearbyProjectsList : undefined}
        relatedTopicLinks={relatedTopicLinks.length > 0 ? relatedTopicLinks : undefined}
        callTrackVertical={verticalConfig.verticalId}
        ctaVariants={verticalConfig.ctaVariants}
        conversionAsideBullets={sidebarBullets}
      />
      <CTABanner />
    </>
  );
}
