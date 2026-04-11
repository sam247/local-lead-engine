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
import { buildLocationMetadata } from "engine";
import { pickGroundworksL4MetaTitle } from "@/lib/groundworksL4TitleTemplates";
import { getL4PriorityLocalLinks, getL4StrikingDistanceTarget } from "@/data/l4StrikingDistance";
import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import CTABanner from "@/components/sections/CTABanner";
import { TrackablePhoneLink } from "engine";
import {
  isTopicLocationSlug,
  isGlobalTopicSlugForLocation,
  getGlobalTopicCanonicalPath,
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
    "site-preparation-services",
    "excavation-contractors",
    "foundation-contractors",
    "enabling-works-contractors",
    "concrete-foundations",
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
                  serviceSlug={topic.primaryServiceSlug}
                  locationSlug={location.id}
                  source="cta"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Phone className="h-4 w-4" /> Call Now
                </TrackablePhoneLink>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {topic.typicalScenarios
                    .slice(0, 5)
                    .map((point) => trimSidebarBullet(point, 8))
                    .slice(0, 5)
                    .map((point) => (
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
  if (!service) {
    logInvalidRoute(serviceSlug, locationSlug, "unknown service");
    notFound();
  }

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
      url: `/projects/${p.slug}`,
    }));

  const introParagraph =
    strikingDistanceTarget?.introOverride ??
    `We provide ${service.title} across ${location.name} and ${location.area}. Our team delivers piling, underpinning, foundation repair, concrete works and wider site preparation for commercial and residential projects, with free no-obligation quotes.`;

  const relatedTopicLinks = getRelevantTopicsForService(service.slug);
  const relatedProblemPageLinks = (() => {
    const links = relatedTopicLinks
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
        diagnosisGuidePath="/guides/groundworks-process"
        introParagraph={introParagraph}
        extraServiceLocationLinks={extraServiceLocationLinks}
        priorityLocalLinks={priorityLocalLinks}
        supplementalSections={strikingDistanceTarget?.supplementalSections}
        nearbyAreasDescription={`Compare our ${service.title} in nearby areas.`}
        neighbourLocationsForContext={neighbourLocationsForContext}
        locationContextParagraph={locationContextParagraph}
        nearbyProjects={nearbyProjectsList.length > 0 ? nearbyProjectsList : undefined}
        relatedTopicLinks={relatedTopicLinks.length > 0 ? relatedTopicLinks : undefined}
        serviceHubHref={(slug) => `/services/${slug}`}
        relatedServiceHubLinks={relatedServiceHubLinks}
        relatedProblemPageLinks={relatedProblemPageLinks}
        callTrackVertical={verticalConfig.verticalId}
        ctaVariants={verticalConfig.ctaVariants}
        conversionAsideBullets={sidebarBullets}
      />
      <CTABanner />
    </>
  );
}
