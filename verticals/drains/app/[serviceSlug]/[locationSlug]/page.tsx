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
import { pickDrainsL4MetaTitle } from "@/lib/drainsL4TitleTemplates";
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
  "drain-collapse-repair": [
    "cctv-drain-surveys",
    "drain-excavation",
    "drain-pipe-replacement",
    "drain-relining",
    "emergency-drainage",
  ],
  "drain-relining": [
    "cctv-drain-surveys",
    "drain-root-removal",
    "drain-collapse-repair",
    "drain-pipe-replacement",
    "drain-excavation",
  ],
  "cctv-drain-surveys": [
    "drain-collapse-repair",
    "drain-relining",
    "blocked-drains",
    "drain-unblocking",
    "drain-excavation",
  ],
  "drain-excavation": [
    "drain-collapse-repair",
    "drain-pipe-replacement",
    "cctv-drain-surveys",
    "drain-relining",
    "emergency-drainage",
  ],
  "emergency-drainage": [
    "blocked-drains",
    "drain-unblocking",
    "cctv-drain-surveys",
    "drain-collapse-repair",
    "drain-jetting",
  ],
  "blocked-drains": [
    "drain-unblocking",
    "drain-jetting",
    "cctv-drain-surveys",
    "drain-root-removal",
    "emergency-drainage",
  ],
  "drain-jetting": [
    "blocked-drains",
    "drain-unblocking",
    "drain-root-removal",
    "cctv-drain-surveys",
    "commercial-drainage",
  ],
  "drain-root-removal": [
    "drain-jetting",
    "drain-relining",
    "blocked-drains",
    "cctv-drain-surveys",
    "drain-unblocking",
  ],
  "drain-unblocking": [
    "blocked-drains",
    "drain-jetting",
    "cctv-drain-surveys",
    "emergency-drainage",
    "drain-root-removal",
  ],
  "drain-pipe-replacement": [
    "drain-excavation",
    "drain-collapse-repair",
    "cctv-drain-surveys",
    "drain-relining",
    "emergency-drainage",
  ],
  "commercial-drainage": [
    "drain-jetting",
    "blocked-drains",
    "emergency-drainage",
    "cctv-drain-surveys",
    "drain-unblocking",
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
  const hasNumericSuffix = /-(\d+)$/.test(locationSlug);
  const canonicalLocationSlug = hasNumericSuffix
    ? locationSlug.replace(/(-\d+)+$/, "")
    : locationSlug;
  const service = services.find((s) => s.slug === serviceSlug);
  const location = locations.find((l) => l.id === canonicalLocationSlug);
  if (!service || !location) return { title: "Not Found" };
  const base = buildLocationMetadata(service, location, verticalConfig);
  return { ...base, title: pickDrainsL4MetaTitle(service, location) };
}

export default async function LocationRoute({ params }: Props) {
  const { serviceSlug, locationSlug } = params;
  const hasNumericSuffix = /-(\d+)$/.test(locationSlug);
  const canonicalLocationSlug = hasNumericSuffix
    ? locationSlug.replace(/(-\d+)+$/, "")
    : locationSlug;
  if (hasNumericSuffix) {
    const canonicalLocationExists = locations.some((l) => l.id === canonicalLocationSlug);
    if (canonicalLocationExists) {
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
  const service = services.find((s) => s.slug === serviceSlug);
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
      question: `How quickly can you respond to a drainage emergency in ${location.name}?`,
      answer: `Our emergency team typically arrives in ${location.name} within 1-2 hours, operating 24/7 including weekends and bank holidays.`,
    },
    {
      question: `Do you offer free quotes in ${location.name}?`,
      answer: `Absolutely. We provide free, no-obligation CCTV surveys and quotes for all ${location.name} drainage projects.`,
    },
    {
      question: `How much does drain repair cost in ${location.name}?`,
      answer: `Costs vary by job: simple repairs from around £1,500, with deeper or more complex work in ${location.name} and ${location.area} typically £3,000–£8,000+. We provide fixed-price quotes after a CCTV survey.`,
    },
    {
      question: `Do I need a drain survey in ${location.name}?`,
      answer: `A CCTV drain survey is recommended before repair work in ${location.name}. It confirms the problem, extent, and best fix—and we use it to give you an accurate quote.`,
    },
    {
      question: `Can tree roots cause blocked drains in ${location.name}?`,
      answer: `Yes. Tree roots are a common cause of blockages and damage in ${location.name} and ${location.area}. We can remove roots and reline pipes to prevent regrowth.`,
    },
  ].slice(0, 5);

  const trustPoints = [
    "Years of experience serving " + location.area,
    "24/7 emergency availability",
    "Fully insured engineers",
    "CCTV inspection technology",
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

  const introParagraph = `We provide ${service.title} across ${location.name} and ${location.area}. Our team offers expert diagnosis, repair, and maintenance for residential and commercial properties, with 24/7 emergency cover and free no-obligation quotes.`;

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
              trustSectionTitle={`Trusted Drain Engineers in ${location.name}`}
              trustPoints={trustPoints}
              diagnosisGuidePath="/collapsed-drains-complete-guide"
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
                className="flex items-center gap-2 text-primary"
              >
                <Phone className="h-4 w-4" /> Call now
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
