import Link from "next/link";
import { notFound, permanentRedirect, redirect } from "next/navigation";
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
import { buildLocationMetadata, buildTopicLocationMetadata } from "engine";
import { pickAccessL4MetaTitle } from "@/lib/accessL4TitleTemplates";
import { getL4PriorityLocalLinks, getL4StrikingDistanceTarget } from "@/data/l4StrikingDistance";
import type { Location } from "engine";
import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  isTopicLocationSlug,
  isGlobalTopicSlugForLocation,
  getGlobalTopicCanonicalPath,
  getTopicForRouteSlug,
  getTopicLocationStaticParams,
  TOPIC_HUB_PATH,
} from "@/lib/topicLocationConfig";
import { TopicLocationPage } from "@/app/components/TopicLocationPage";
import CTABanner from "@/components/sections/CTABanner";
import { TrackablePhoneLink } from "engine";

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
function trimSidebarBullet(input: string, maxWords = 8) {
  const cleaned = input.trim().replace(/\s+/g, " ");
  const words = cleaned.split(/\s+/);
  if (words.length <= maxWords) return cleaned;

  // Prefer phrase boundaries before truncating mid-phrase.
  const afterColon = cleaned.includes(":") ? cleaned.split(":").slice(1).join(":").trim() : cleaned;
  const commaPart = afterColon.split(",")[0]?.trim() ?? afterColon;
  const commaWords = commaPart.split(/\s+/).filter(Boolean);
  if (commaWords.length <= maxWords) return commaPart;

  // Last resort: hard trim at word boundary.
  return words.slice(0, maxWords).join(" ");
}

const RELATED_SERVICE_SLUGS_BY_SERVICE: Record<string, string[]> = {
  "access-control-systems": [
    "commercial-cctv-installation",
    "security-system-integration",
    "ip-camera-systems",
    "perimeter-security-systems",
  ],
  "commercial-cctv-installation": [
    "ip-camera-systems",
    "access-control-systems",
    "security-system-integration",
    "perimeter-security-systems",
  ],
  "ip-camera-systems": [
    "commercial-cctv-installation",
    "security-system-integration",
    "access-control-systems",
    "perimeter-security-systems",
  ],
  "perimeter-security-systems": [
    "commercial-cctv-installation",
    "security-system-integration",
    "access-control-systems",
    "ip-camera-systems",
  ],
  "security-system-integration": [
    "access-control-systems",
    "commercial-cctv-installation",
    "ip-camera-systems",
    "perimeter-security-systems",
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug, locationSlug } = params;
  if (serviceSlug === "perimeter-security-guide") {
    return permanentRedirect("/perimeter-security-guides");
  }
  const hasNumericSuffix = /-(\d+)$/.test(locationSlug);
  const canonicalLocationSlug = hasNumericSuffix
    ? locationSlug.replace(/(-\d+)+$/, "")
    : locationSlug;
  const location = locations.find((l) => l.id === canonicalLocationSlug);
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
    return buildTopicLocationMetadata(
      {
        topicTitle: topic.title,
        topicSlug: serviceSlug,
        location,
        baseMetaDescription: topic.metaDescription,
      },
      verticalConfig
    );
  }

  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) return { title: "Not Found" };
  const base = buildLocationMetadata(service, location, verticalConfig);
  return { ...base, title: pickAccessL4MetaTitle(service, location) };
}

export default async function LocationRoute({ params }: Props) {
  const { serviceSlug, locationSlug } = params;
  if (serviceSlug === "perimeter-security-guide") {
    return permanentRedirect("/perimeter-security-guides");
  }
  const hasNumericSuffix = /-(\d+)$/.test(locationSlug);
  const canonicalLocationSlug = hasNumericSuffix
    ? locationSlug.replace(/(-\d+)+$/, "")
    : locationSlug;

  const isValidServiceSlug = services.some((s) => s.slug === serviceSlug);
  const isValidTopicRouteSlug = isTopicLocationSlug(serviceSlug);
  if (!isValidServiceSlug && !isValidTopicRouteSlug) notFound();

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
  const location = locations.find((l) => l.id === canonicalLocationSlug);
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

    const primaryServiceSlug = topic.relatedServiceSlugs[0] ?? null;
    const sidebarBullets = topic.sectorUseCases
      .slice(0, 5)
      .map((point) => trimSidebarBullet(point, 8))
      .slice(0, 5);

    return (
      <>
        <div className="container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TopicLocationPage
                topic={topic}
                location={location}
                topicSlug={serviceSlug}
                locationSlug={canonicalLocationSlug}
                topicHubPath={topicHubPath}
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
                serviceSlug={primaryServiceSlug}
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

  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) notFound();
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

  const introParagraph =
    strikingDistanceTarget?.introOverride ??
    `We provide ${service.title} across ${location.name} and ${location.area}. Our team offers design, installation and maintenance for commercial and public-sector sites, with free no-obligation site surveys and quotes.`;

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
        trustSectionTitle={`Trusted Security Engineers in ${location.name}`}
        trustPoints={trustPoints}
        introParagraph={introParagraph}
        extraServiceLocationLinks={extraServiceLocationLinks}
        priorityLocalLinks={priorityLocalLinks}
        supplementalSections={strikingDistanceTarget?.supplementalSections}
        nearbyAreasDescription={`Compare our ${service.title} in nearby areas.`}
        neighbourLocationsForContext={neighbourLocationsForContext}
        locationContextParagraph={locationContextParagraph}
        nearbyProjects={nearbyProjectsList.length > 0 ? nearbyProjectsList : undefined}
        relatedTopicLinks={relatedTopicLinks.length > 0 ? relatedTopicLinks : undefined}
        relatedTopicsSectionTitle={relatedTopicLinks.length > 0 ? `Security advice for businesses in ${location.name}` : undefined}
        callTrackVertical={verticalConfig.verticalId}
        ctaVariants={verticalConfig.ctaVariants}
        conversionAsideBullets={sidebarBullets}
      />
      <CTABanner />
    </>
  );
}
