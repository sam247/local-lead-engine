import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { services, locations, getRelevantTopicsForService } from "@/lib/data";
import { projects } from "@/data/projects";
import { getHeroImage, getProjectImage } from "@/lib/images";
import { verticalConfig } from "@/config";
import {
  LocationPage,
  getNeighbourLocationIds,
  buildLocationContextParagraph,
  getVariantIndex,
} from "engine";
import { buildLocationMetadata } from "engine";
import { pickSurveysL4MetaTitle } from "@/lib/surveysL4TitleTemplates";
import { hasNumericDuplicateSuffix, stripNumericDuplicateSuffix } from "@/lib/numericSlugSuffix";
import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import CTABanner from "@/components/sections/CTABanner";
import { TrackablePhoneLink } from "engine";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  return services.flatMap((s) =>
    locations.map((l) => ({ serviceSlug: s.slug, locationSlug: l.id }))
  );
}

type Props = { params: { serviceSlug: string; locationSlug: string } };
type ServiceItem = (typeof services)[number];

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

function buildServiceLocationLinkLabel(serviceTitle: string, locationName: string) {
  const dedupedTitle = serviceTitle.replace(/\b(services?)\s+\1\b/gi, "$1").trim();
  if (new RegExp(`\\b${locationName}\\b`, "i").test(dedupedTitle)) return dedupedTitle;
  const withLocation = `${dedupedTitle} in ${locationName}`;
  return withLocation.length <= 60 ? withLocation : dedupedTitle;
}

function buildExtraServiceLocationLinks(service: ServiceItem, locationId: string, locationName: string) {
  const otherServices = services.filter((candidate) => candidate.slug !== service.slug);
  const inlineRelatedIndex = getVariantIndex(`inline-links:${service.slug}:${locationId}`, 3);
  const inlineRelatedService = otherServices[inlineRelatedIndex % otherServices.length];
  const excludedSlugs = new Set([service.slug, inlineRelatedService?.slug]);
  const selected = new Set<string>();
  const orderedCandidates = RELATED_SERVICE_SLUGS_BY_SERVICE[service.slug] ?? [];
  const candidateServices = [
    ...orderedCandidates
      .map((slug) => services.find((candidate) => candidate.slug === slug))
      .filter((candidate): candidate is ServiceItem => candidate != null),
    ...services,
  ];

  return candidateServices.reduce<{ href: string; children: string }[]>((links, candidate) => {
    if (links.length >= 3) return links;
    if (excludedSlugs.has(candidate.slug) || selected.has(candidate.slug)) return links;
    selected.add(candidate.slug);
    links.push({
      href: `/${candidate.slug}/${locationId}`,
      children: buildServiceLocationLinkLabel(candidate.title, locationName),
    });
    return links;
  }, []);
}

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

  const introParagraph = `We provide ${service.title} across ${location.name} and ${location.area}. Our survey partners deliver accurate, planning-ready data for residential and commercial projects, with free no-obligation quotes.`;

  const relatedTopicLinks = getRelevantTopicsForService(service.slug);
  const extraServiceLocationLinks = buildExtraServiceLocationLinks(
    service,
    location.id,
    location.name
  );

  const sidebarBullets = trustPoints.map((point) => trimSidebarBullet(point, 8)).slice(0, 5);

  return (
    <>
      <div className="container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
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
              nearbyAreasDescription={`Compare our ${service.title} in nearby areas.`}
              neighbourLocationsForContext={neighbourLocationsForContext}
              locationContextParagraph={locationContextParagraph}
              nearbyProjects={nearbyProjectsList.length > 0 ? nearbyProjectsList : undefined}
              relatedTopicLinks={relatedTopicLinks.length > 0 ? relatedTopicLinks : undefined}
              callTrackVertical={verticalConfig.verticalId}
            />
          </div>
          <aside className="lg:col-span-1 lg:sticky lg:top-24">
            <div className="space-y-4 rounded-xl border border-border bg-card p-5">
              <h2 className="font-display text-lg font-semibold text-foreground">Get a quote</h2>
              <Button asChild>
                <Link href="/contact">Get a quote</Link>
              </Button>
              <TrackablePhoneLink
                phone={verticalConfig.companyInfo.phone}
                vertical={verticalConfig.verticalId}
                serviceSlug={service.slug}
                locationSlug={location.id}
                source="cta"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <Phone className="h-4 w-4" /> Call Now
              </TrackablePhoneLink>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {sidebarBullets.slice(0, 5).map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
      <CTABanner />
    </>
  );
}
