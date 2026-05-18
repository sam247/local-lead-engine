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
import { buildLocationMetadata } from "engine";
import { pickGroundworksL4MetaTitle } from "@/lib/groundworksL4TitleTemplates";
import { getL4PriorityLocalLinks, getL4StrikingDistanceTarget } from "@/data/l4StrikingDistance";
import type { Metadata } from "next";
import CTABanner from "@/components/sections/CTABanner";
import {
  isTopicLocationSlug,
  isGlobalTopicSlugForLocation,
  getGlobalTopicCanonicalPath,
  getTopicForRouteSlug,
  getTopicLocationStaticParams,
  getLocationScalableTopicSlugs,
} from "@/lib/topicLocationConfig";
import { TopicLocationPage } from "@/app/components/TopicLocationPage";
import { getCommercialOpportunityTier } from "@/lib/commercialOpportunity";
import {
  generateGroundworksServiceLocationStaticParams,
  generateGroundworksPrimaryNearMeStaticParams,
  mergeGroundworksL4StaticParams,
  groundworksAllowsServiceSlugForLocation,
  groundworksAllowsTopicSlugForLocation,
  isGroundworksStructuralClusterLocation,
} from "@/lib/controlledTerritoryGeneration";
import { getGroundworksEcosystemExternalLinks } from "@/lib/mainlineEcosystemLinks";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  const serviceLocationParams = generateGroundworksServiceLocationStaticParams(locations, services);
  const primaryNearMeParams = generateGroundworksPrimaryNearMeStaticParams(locations);
  const topicLocationParams = getTopicLocationStaticParams(locations).filter((param) =>
    groundworksAllowsTopicSlugForLocation(param.locationSlug, param.serviceSlug)
  );
  return mergeGroundworksL4StaticParams(
    serviceLocationParams,
    primaryNearMeParams,
    topicLocationParams
  );
}

type Props = { params: { serviceSlug: string; locationSlug: string } };

/** Avoid linking to service/topic × location pairs we do not statically generate on constrained towns. */
function filterGroundworksL4LinksForLocation<T extends { href: string }>(locationId: string, links: Array<T>): T[] {
  return links.filter((link) => {
    const m = link.href.match(/^\/([^/]+)\/([^/]+)$/);
    if (!m || m[2] !== locationId) return true;
    const first = m[1];
    if (isTopicLocationSlug(first)) return groundworksAllowsTopicSlugForLocation(locationId, first);
    return groundworksAllowsServiceSlugForLocation(locationId, first);
  });
}

function canonicalizeLocationSlug(raw: string): { canonical: string; hasNumericSuffix: boolean } {
  const hasNumericSuffix = /-(\d+)$/.test(raw);
  const canonical = hasNumericSuffix ? raw.replace(/(-\d+)+$/, "") : raw;
  return { canonical, hasNumericSuffix };
}

function logInvalidRoute(serviceSlug: string, locationSlug: string, reason?: string) {
  if (process.env.NODE_ENV === "development") {
    console.log("Invalid route:", serviceSlug, locationSlug, reason ?? "");
  }
}

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

/** 3–5 related service hubs per L4 page; diversified to avoid A↔B-only loops. */
const RELATED_SERVICE_SLUGS_BY_SERVICE: Record<string, string[]> = {
  "groundworks-contractors": [
    "commercial-groundworks",
    "earthworks",
    "site-preparation-services",
    "excavation-contractors",
    "foundation-contractors",
    "enabling-works-contractors",
    "concrete-foundations",
  ],
  "commercial-groundworks": [
    "groundworks-contractors",
    "enabling-works-contractors",
    "roads-and-sewers",
    "earthworks",
    "foundation-contractors",
  ],
  earthworks: [
    "commercial-groundworks",
    "bulk-earthworks",
    "excavation-contractors",
    "roads-and-sewers",
    "groundworks-contractors",
  ],
  "roads-and-sewers": [
    "commercial-groundworks",
    "attenuation-systems",
    "enabling-works-contractors",
    "earthworks",
    "groundworks-contractors",
  ],
  "attenuation-systems": [
    "roads-and-sewers",
    "commercial-groundworks",
    "enabling-works-contractors",
    "excavation-contractors",
    "groundworks-contractors",
  ],
  underpinning: [
    "foundation-repair",
    "foundation-contractors",
    "mini-piling-contractors",
    "piling-contractors",
    "structural-groundworks-consultation",
  ],
  "piling-contractors": [
    "mini-piling-contractors",
    "cfa-piling",
    "foundation-contractors",
    "ground-investigation-services",
    "concrete-foundations",
  ],
  "cfa-piling": [
    "piling-contractors",
    "mini-piling-contractors",
    "foundation-contractors",
    "ground-investigation-services",
    "concrete-foundations",
  ],
  "mini-piling-contractors": [
    "piling-contractors",
    "cfa-piling",
    "foundation-contractors",
    "underpinning",
    "ground-investigation-services",
  ],
  "foundation-contractors": [
    "concrete-foundations",
    "piling-contractors",
    "ground-investigation-services",
    "underpinning",
    "excavation-contractors",
  ],
  "foundation-repair": [
    "underpinning",
    "foundation-contractors",
    "concrete-repair",
    "foundation-remedial-work",
    "piling-contractors",
  ],
  "foundation-depth-issues": [
    "foundation-repair",
    "underpinning",
    "foundation-contractors",
    "ground-investigation-services",
    "piling-contractors",
  ],
  "building-regs-foundation-compliance": [
    "foundation-contractors",
    "structural-groundworks-consultation",
    "foundation-remedial-work",
    "foundation-repair",
    "enabling-works-contractors",
  ],
  "clay-soil-foundation-problems": [
    "foundation-contractors",
    "tree-impact-foundations",
    "piling-contractors",
    "underpinning",
    "ground-investigation-services",
  ],
  "tree-impact-foundations": [
    "clay-soil-foundation-problems",
    "foundation-depth-issues",
    "foundation-contractors",
    "underpinning",
    "mini-piling-contractors",
  ],
  "foundation-remedial-work": [
    "foundation-repair",
    "underpinning",
    "foundation-contractors",
    "building-regs-foundation-compliance",
    "concrete-repair",
  ],
  "underpinning-advice": [
    "underpinning",
    "foundation-depth-issues",
    "foundation-contractors",
    "foundation-repair",
    "structural-groundworks-consultation",
  ],
  "structural-groundworks-consultation": [
    "ground-investigation-services",
    "foundation-contractors",
    "piling-contractors",
    "building-regs-foundation-compliance",
    "enabling-works-contractors",
  ],
  "ground-investigation-services": [
    "soil-bearing-capacity-testing",
    "plate-load-testing",
    "foundation-contractors",
    "piling-contractors",
    "structural-groundworks-consultation",
  ],
  "soil-bearing-capacity-testing": [
    "plate-load-testing",
    "ground-investigation-services",
    "foundation-contractors",
    "piling-contractors",
    "mini-piling-contractors",
  ],
  "plate-load-testing": [
    "incremental-plate-load-testing",
    "soil-bearing-capacity-testing",
    "ground-investigation-services",
    "foundation-contractors",
    "piling-contractors",
  ],
  "incremental-plate-load-testing": [
    "plate-load-testing",
    "soil-bearing-capacity-testing",
    "ground-investigation-services",
    "foundation-contractors",
    "piling-contractors",
  ],
  "concrete-repair": [
    "foundation-repair",
    "concrete-foundations",
    "foundation-contractors",
    "foundation-remedial-work",
    "groundworks-contractors",
  ],
  "excavation-contractors": [
    "site-clearance-contractors",
    "muck-away-services",
    "foundation-contractors",
    "enabling-works-contractors",
    "bulk-earthworks",
  ],
  "site-clearance-contractors": [
    "site-preparation-services",
    "excavation-contractors",
    "muck-away-services",
    "enabling-works-contractors",
    "groundworks-contractors",
  ],
  "muck-away-services": [
    "excavation-contractors",
    "site-clearance-contractors",
    "bulk-earthworks",
    "groundworks-contractors",
    "enabling-works-contractors",
  ],
  "bulk-earthworks": [
    "excavation-contractors",
    "site-preparation-services",
    "muck-away-services",
    "groundworks-contractors",
    "enabling-works-contractors",
  ],
  "site-preparation-services": [
    "site-clearance-contractors",
    "enabling-works-contractors",
    "groundworks-contractors",
    "excavation-contractors",
    "bulk-earthworks",
  ],
  "concrete-foundations": [
    "foundation-contractors",
    "piling-contractors",
    "mini-piling-contractors",
    "underpinning",
    "excavation-contractors",
  ],
  "enabling-works-contractors": [
    "site-preparation-services",
    "site-clearance-contractors",
    "excavation-contractors",
    "foundation-contractors",
    "groundworks-contractors",
  ],
};

const COMMERCIAL_TOPIC_SLUGS_BY_SERVICE: Record<string, string[]> = {
  "groundworks-contractors": [
    "groundworks-for-developments",
    "groundworks-and-enabling-works",
    "bulk-excavation-services",
    "retaining-wall-construction",
  ],
  "foundation-contractors": [
    "foundation-underpinning",
    "piling-foundations",
    "foundation-settlement",
    "groundworks-for-extensions",
  ],
  "mini-piling-contractors": ["piling-foundations", "foundation-underpinning", "groundworks-for-extensions"],
  "piling-contractors": ["piling-foundations", "foundation-underpinning", "groundworks-for-developments"],
  "cfa-piling": ["piling-foundations", "groundworks-for-developments"],
  "enabling-works-contractors": ["groundworks-and-enabling-works", "groundworks-for-developments", "bulk-excavation-services"],
  "excavation-contractors": ["bulk-excavation-services", "groundworks-for-developments", "retaining-wall-construction"],
  "commercial-groundworks": [
    "groundworks-for-developments",
    "groundworks-and-enabling-works",
    "bulk-excavation-services",
    "retaining-wall-construction",
  ],
  earthworks: ["bulk-excavation-services", "groundworks-for-developments", "groundworks-and-enabling-works"],
  "roads-and-sewers": ["groundworks-and-enabling-works", "groundworks-for-developments", "soakaway-installation"],
  "attenuation-systems": ["soakaway-installation", "groundworks-and-enabling-works", "groundworks-for-developments"],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug, locationSlug } = params;

  if (!serviceSlug?.trim() || !locationSlug?.trim()) {
    logInvalidRoute(serviceSlug ?? "", locationSlug ?? "", "empty slug");
    notFound();
  }

  const { canonical: canonicalLocationSlug } = canonicalizeLocationSlug(locationSlug);
  const location = locations.find((l) => l.id === canonicalLocationSlug);
  if (!location) {
    logInvalidRoute(serviceSlug, locationSlug, "unknown location");
    notFound();
  }

  if (isTopicLocationSlug(serviceSlug)) {
    if (isGlobalTopicSlugForLocation(serviceSlug)) {
      const canonicalTopicPath = getGlobalTopicCanonicalPath(serviceSlug);
      if (!canonicalTopicPath) {
        logInvalidRoute(serviceSlug, locationSlug, "unknown global topic");
        notFound();
      }
      return {
        title: "Redirecting",
        alternates: { canonical: `${verticalConfig.baseUrl.replace(/\/$/, "")}${canonicalTopicPath}` },
      };
    }
    const topic = getTopicForRouteSlug(serviceSlug);
    if (!topic) {
      logInvalidRoute(serviceSlug, locationSlug, "unknown topic");
      notFound();
    }
    if (!groundworksAllowsTopicSlugForLocation(canonicalLocationSlug, serviceSlug)) {
      logInvalidRoute(serviceSlug, locationSlug, "topic not generated for location");
      notFound();
    }
    const baseUrl = verticalConfig.baseUrl.replace(/\/$/, "");
    const title = `${topic.title} in ${location.name} | ${verticalConfig.siteName}`;
    const description =
      topic.intro.slice(0, 120) +
      ` We provide ${topic.title.toLowerCase()} across ${location.name} and ${location.area}.`;
    const canonical = `${baseUrl}/${serviceSlug}/${canonicalLocationSlug}`;
    return { title, description, alternates: { canonical } };
  }

  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) {
    logInvalidRoute(serviceSlug, locationSlug, "unknown service");
    notFound();
  }
  if (!groundworksAllowsServiceSlugForLocation(canonicalLocationSlug, service.slug)) {
    logInvalidRoute(serviceSlug, locationSlug, "service not generated for location");
    notFound();
  }

  const base = buildLocationMetadata(service, location, verticalConfig);
  const withTitle = { ...base, title: pickGroundworksL4MetaTitle(service, location) };
  const baseUrl = verticalConfig.baseUrl.replace(/\/$/, "");
  const canonical = `${baseUrl}/${serviceSlug}/${canonicalLocationSlug}`;
  return {
    ...withTitle,
    alternates: { ...withTitle.alternates, canonical },
  };
}

export default async function LocationRoute({ params }: Props) {
  const { serviceSlug, locationSlug } = params;

  if (!serviceSlug?.trim() || !locationSlug?.trim()) {
    logInvalidRoute(serviceSlug ?? "", locationSlug ?? "", "empty slug");
    notFound();
  }

  const { canonical: canonicalLocationSlug, hasNumericSuffix } = canonicalizeLocationSlug(locationSlug);

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
  if (!location) {
    logInvalidRoute(serviceSlug, locationSlug, "unknown location");
    notFound();
  }

  if (isTopicLocationSlug(serviceSlug)) {
    if (isGlobalTopicSlugForLocation(serviceSlug)) {
      const canonicalTopicPath = getGlobalTopicCanonicalPath(serviceSlug);
      if (!canonicalTopicPath) {
        logInvalidRoute(serviceSlug, locationSlug, "unknown global topic");
        notFound();
      }
      redirect(canonicalTopicPath);
    }
    const topic = getTopicForRouteSlug(serviceSlug);
    if (!topic) {
      logInvalidRoute(serviceSlug, locationSlug, "unknown topic");
      notFound();
    }
    if (!groundworksAllowsTopicSlugForLocation(canonicalLocationSlug, serviceSlug)) {
      const fallbackService = topic.primaryServiceSlug;
      if (
        fallbackService &&
        groundworksAllowsServiceSlugForLocation(canonicalLocationSlug, fallbackService)
      ) {
        permanentRedirect(`/${fallbackService}/${canonicalLocationSlug}`);
      }
      logInvalidRoute(serviceSlug, locationSlug, "topic not generated for location");
      notFound();
    }
    return (
      <>
        <TopicLocationPage
          topic={topic}
          location={location}
          topicSlug={serviceSlug}
          locationSlug={canonicalLocationSlug}
        />
        <CTABanner />
      </>
    );
  }

  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) {
    logInvalidRoute(serviceSlug, locationSlug, "unknown service");
    notFound();
  }
  if (!groundworksAllowsServiceSlugForLocation(canonicalLocationSlug, service.slug)) {
    logInvalidRoute(serviceSlug, locationSlug, "service not generated for location");
    notFound();
  }

  const strikingDistanceTarget = getL4StrikingDistanceTarget(service.slug, location.id);

  const allowsNearby = (l: (typeof locations)[number]) =>
    groundworksAllowsServiceSlugForLocation(l.id, service.slug);
  const sameAreaLocations = locations.filter(
    (l) => l.id !== location.id && l.area === location.area && allowsNearby(l)
  );
  const nearbyLocations =
    sameAreaLocations.length >= 4
      ? sameAreaLocations.slice(0, 8)
      : [
          ...sameAreaLocations,
          ...locations.filter(
            (l) => l.id !== location.id && l.area !== location.area && allowsNearby(l)
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

  const otherServices = services.filter(
    (s) => s.id !== service.id && groundworksAllowsServiceSlugForLocation(location.id, s.slug)
  );
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
      url: `/projects/${p.slug}`,
    }));

  const introParagraph =
    strikingDistanceTarget?.introOverride ??
    `We provide ${service.title} across ${location.name} and ${location.area}. Our team delivers piling, underpinning, foundation repair, concrete works and wider site preparation for commercial and residential projects, with free no-obligation quotes.`;

  const relatedTopicLinks = getRelevantTopicsForService(service.slug);
  const allowedTopicSlugs = new Set(getLocationScalableTopicSlugs());
  const commercialTopicLocationLinks = (COMMERCIAL_TOPIC_SLUGS_BY_SERVICE[service.slug] ?? [])
    .filter(
      (topicSlug) =>
        allowedTopicSlugs.has(topicSlug) && groundworksAllowsTopicSlugForLocation(location.id, topicSlug)
    )
    .map((topicSlug) => ({
      title: `${topicSlug
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")} in ${location.name}`,
      href: `/${topicSlug}/${location.id}`,
    }));
  const mergedRelatedTopicLinks = [...relatedTopicLinks, ...commercialTopicLocationLinks].filter(
    (item, index, arr) => arr.findIndex((x) => x.href === item.href) === index
  );
  const relatedProblemPageLinks = (() => {
    const links = mergedRelatedTopicLinks
      .filter((l) => l.href.startsWith("/foundation-problems/"))
      .slice(0, 2)
      .map((l) => ({ href: l.href, title: l.title }));
    return links.length > 0 ? links : undefined;
  })();
  const relatedServiceHubLinks = (() => {
    const slugs = RELATED_SERVICE_SLUGS_BY_SERVICE[service.slug] ?? [];
    const seen = new Set<string>();
    const out: { href: string; title: string }[] = [];
    for (const slug of slugs) {
      if (out.length >= 5) break;
      if (seen.has(slug)) continue;
      const s = services.find((x) => x.slug === slug);
      if (!s) continue;
      seen.add(slug);
      out.push({ title: s.title, href: `/services/${s.slug}` });
    }
    return out.length > 0 ? out : undefined;
  })();
  const extraServiceLocationLinks = filterGroundworksL4LinksForLocation(
    location.id,
    pickRelatedServiceLocationLinks({
      currentServiceSlug: service.slug,
      services,
      location,
      priorityByService: RELATED_SERVICE_SLUGS_BY_SERVICE,
      maxLinks: 3,
    }).map((link) => ({ href: link.href, children: link.label }))
  );
  const priorityLocalLinks = filterGroundworksL4LinksForLocation(
    location.id,
    getL4PriorityLocalLinks(service.slug, location.id, RELATED_SERVICE_SLUGS_BY_SERVICE)
  );

  const sidebarBullets = trustPoints.map((point) => trimSidebarBullet(point, 8)).slice(0, 5);
  const isStructuralClusterArea = isGroundworksStructuralClusterLocation(location);
  const opportunityTier = getCommercialOpportunityTier(`${service.slug} ${location.area} ${location.name}`);
  const reinforcedIntroParagraph =
    isStructuralClusterArea && (opportunityTier === "very_high" || opportunityTier === "high")
      ? `${introParagraph} We prioritise structural and commercial groundworks in ${location.name}, including basement excavation, foundation and piling packages, retaining wall scopes, and enabling works for extension or development-led projects.`
      : introParagraph;

  if (
    isStructuralClusterArea &&
    (service.slug === "excavation-contractors" ||
      service.slug === "foundation-contractors" ||
      service.slug === "mini-piling-contractors" ||
      service.slug === "piling-contractors" ||
      service.slug === "enabling-works-contractors")
  ) {
    localFaqs.unshift({
      question: `Can you quote structural groundworks packages in ${location.name} for extensions or development sites?`,
      answer: `Yes. We can scope excavation, foundations, piling, retaining structures, and enabling works as a coordinated contractor package in ${location.name} to support quote-ready commercial decisions.`,
    });
  }

  return (
    <>
      <LocationPage
        service={service}
        location={location}
        serviceSlug={serviceSlug}
        locationSlug={canonicalLocationSlug}
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
        introParagraph={reinforcedIntroParagraph}
        extraServiceLocationLinks={extraServiceLocationLinks}
        priorityLocalLinks={priorityLocalLinks}
        supplementalSections={strikingDistanceTarget?.supplementalSections}
        nearbyAreasDescription={`Compare our ${service.title} in nearby areas.`}
        neighbourLocationsForContext={neighbourLocationsForContext}
        locationContextParagraph={locationContextParagraph}
        nearbyProjects={nearbyProjectsList.length > 0 ? nearbyProjectsList : undefined}
        relatedTopicLinks={mergedRelatedTopicLinks.length > 0 ? mergedRelatedTopicLinks : undefined}
        serviceHubHref={(slug) => `/services/${slug}`}
        relatedServiceHubLinks={relatedServiceHubLinks}
        relatedProblemPageLinks={relatedProblemPageLinks}
        callTrackVertical={verticalConfig.verticalId}
        ctaVariants={verticalConfig.ctaVariants}
        conversionAsideBullets={sidebarBullets}
        ecosystemExternalLinks={
          getGroundworksEcosystemExternalLinks({
            locationId: canonicalLocationSlug,
            locationName: location.name,
            serviceSlug: service.slug,
          }) ?? undefined
        }
      />
      <CTABanner />
    </>
  );
}
