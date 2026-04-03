import Link from "next/link";
import { Button } from "./ui/button";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { SchemaMarkup } from "../schema/SchemaMarkup";
import { FAQSchema, type FAQItem } from "../schema/FAQSchema";
import { InspectionCTA } from "./InspectionCTA";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { MapEmbed } from "./MapEmbed";
import { LocationContext } from "./LocationContext";
import { NearbyAreas } from "./NearbyAreas";
import { SectionIntro } from "./SectionIntro";
import { TrustReassuranceStrip } from "./TrustReassuranceStrip";
import { TrustStrip } from "./TrustStrip";
import { ActionPanel } from "./ActionPanel";
import { TrackablePhoneLink } from "./TrackablePhoneLink";
import { getVariantIndex } from "../lib/contentVariants";
import { getPageTier, pageSeoDataAttrs, type PageType } from "../lib/pageWeighting";
import { locations as allLocationsDataset } from "../data/locations";
import { getCountyPeerLocationIds, getUkGroupingForLocationId } from "../data/uk-location-hierarchy";
import type { Service, Location, CompanyInfo } from "../types";

const LOCATION_ABOUT_LABELS = ["Learn more about our team", "How we work with clients"] as const;

const INTRO_VARIANTS = [
  (serviceTitle: string, locationName: string) => [
    `${serviceTitle} focuses on assessing requirements and delivering the right scope for each property or site in ${locationName}.`,
    "It is used when work needs to be planned clearly, delivered safely, and aligned with practical constraints such as access, sequencing, or condition.",
    "The outcome is a dependable solution with fewer repeat issues and clearer next steps for owners, project teams, and facilities managers.",
  ],
  (serviceTitle: string, locationName: string) => [
    `Many projects in ${locationName} start with a practical problem rather than a clear method, and ${serviceTitle} helps define the right route forward.`,
    "It is often used when recurring issues, repair decisions, or planned works need evidence-based scoping before major commitments are made.",
    "This approach helps reduce uncertainty, limit disruption, and achieve a more reliable long-term result.",
  ],
  (serviceTitle: string, locationName: string) => [
    `When a project moves from early planning into delivery, ${serviceTitle} provides a structured way to scope and execute work in ${locationName}.`,
    "It is commonly used across new-builds, remedial programmes, and upgrades where technical choices affect programme, cost, and ongoing performance.",
    "The goal is to resolve the underlying need with a practical method that fits the site and the intended outcome.",
  ],
] as const;

const WHEN_NEEDED_VARIANTS = [
  {
    first:
      "This service is typically commissioned when early signs point to a wider issue, when work needs to be planned before construction starts, or when existing systems are no longer performing as expected.",
    second:
      "It is also common on extension and redevelopment projects where practical constraints, permissions, or sequencing need to be considered before work begins.",
    third:
      "For residential owners and commercial teams alike, getting clear advice at this stage helps avoid repeat disruption, controls costs, and leads to a more reliable long-term result.",
  },
  {
    first:
      "Most projects start with a practical problem: recurring faults, visible deterioration, or uncertainty about the right method before committing to work.",
    second:
      "The same service is often used during new-build and major refurbishment phases, where design choices, planning requirements, and site conditions affect what can be done safely and efficiently.",
    third:
      "Whether the priority is compliance, stability, or restoring normal operation quickly, early scoping usually prevents avoidable delays and rework.",
  },
  {
    first:
      "People usually request this service when a property or site needs dependable performance, when repairs become more frequent, or when a planned project requires the right groundwork before later stages begin.",
    second:
      "It is equally relevant where structural movement, access limits, or planning expectations make a straightforward fix unrealistic without a proper assessment first.",
    third:
      "In practice, a clear plan from the start gives owners, facilities teams, and contractors a safer path to completion with fewer surprises during delivery.",
  },
] as const;

const LOCATION_CONTEXT_VARIANTS = [
  (locationName: string, area: string, serviceTitle: string) =>
    `${locationName} in ${area} includes a mix of site conditions and project constraints, so delivery usually depends on choosing the right method early. We plan ${serviceTitle.toLowerCase()} work around local access and programme requirements to keep disruption manageable and outcomes reliable.`,
  (locationName: string, area: string, serviceTitle: string) =>
    `Projects in ${locationName} and the wider ${area} area often involve different property types, priorities, and timelines. We scope ${serviceTitle.toLowerCase()} work to those conditions so the solution remains practical during delivery and dependable after handover.`,
  (locationName: string, area: string, serviceTitle: string) =>
    `In ${locationName}, project requirements can vary by site condition, building type, and sequencing needs across other trades. Our ${serviceTitle.toLowerCase()} approach is structured to fit those local realities while maintaining clear decisions from assessment to completion.`,
] as const;

const NEARBY_ANCHOR_VARIANTS = [
  "similar work in {location}",
  "see related work in {location}",
  "view nearby options in {location}",
] as const;

const SERVICE_ANCHOR_VARIANTS = [
  "related services for this type of work",
  "alternative approaches to this project",
  "compare options for {service}",
] as const;

const LOCATION_EXTRA_HEADINGS = [
  "Things to consider before starting",
  "What to plan before starting this work",
  "Before you begin",
] as const;

const COST_COMPLEXITY_HEADINGS = [
  "What affects cost and scope",
  "What affects cost and scope",
  "What affects cost and scope",
] as const;

const WHEN_NEEDED_SECTION_HEADINGS = [
  "When you might need this service",
  "When you might need this service",
  "When you might need this service",
] as const;

const PROCESS_SECTION_INTROS = [
  {
    title: "How the service works",
    description:
      "Our process is designed to keep things straightforward: define the issue, explain your options clearly, carry out the right work, and confirm everything before handover.",
  },
  {
    title: "How the service works",
    description:
      "Delivery is structured so scope, dependencies, and sign-off stay clear from the first assessment through to handover.",
  },
  {
    title: "How the service works",
    description:
      "You should expect a defined path from assessment to completion, with practical options explained before work begins.",
  },
] as const;

const TYPICAL_PROJECTS_HEADINGS = [
  "Where this service is used",
  "Where this service is used",
  "Where this service is used",
] as const;

/** Stronger default opening when vertical does not pass introParagraph (area reduces near-duplicate openings). */
const OPENING_PRIMARY_VARIANTS = [
  (serviceTitle: string, locationName: string, area: string) =>
    `${serviceTitle} in ${locationName} is typically needed when a site faces access limits, programme pressure, or repeat issues that need a durable fix. Whether you are planning ahead or responding to an active problem, understanding your options helps you move forward with confidence.`,
  (serviceTitle: string, locationName: string, area: string) =>
    `${serviceTitle} in ${locationName} usually matters when decisions on method, timing, and scope affect cost, safety, or long-term performance. From early feasibility to urgent response, a clear plan helps you avoid rework and unnecessary disruption.`,
  (serviceTitle: string, locationName: string, area: string) =>
    `${serviceTitle} in ${locationName} is often commissioned when stakeholders need dependable outcomes and a delivery route that fits local constraints. Whatever stage you are at, the right next step starts with a practical assessment of what the site needs.`,
  (serviceTitle: string, locationName: string, area: string) =>
    `Across ${locationName} and the wider ${area} area, ${serviceTitle.toLowerCase()} is commonly scoped when programme pressure, access limits, or recurring faults make a clear technical route essential. Getting aligned on scope early usually saves time and avoids repeat disruption.`,
  (serviceTitle: string, locationName: string, area: string) =>
    `When you need ${serviceTitle.toLowerCase()} in ${locationName}, the decision point is often practical: site constraints in ${area}, sequencing with other works, and how much certainty you need before committing budget. A structured assessment helps you choose a delivery path that fits the property and timeline.`,
  (serviceTitle: string, locationName: string, area: string) =>
    `Understanding your options for ${serviceTitle.toLowerCase()} in ${locationName} matters before work starts. Properties and sites around ${area} frequently need this when reliability, compliance, or handover requirements mean a generic fix is unlikely to hold up long term.`,
] as const;

const TONE_LEAD_VARIANTS: Record<
  "drains" | "surveys" | "access" | "groundworks" | "generic",
  readonly [string, string, string]
> = {
  drains: [
    "Most enquiries for this involve recurring disruption or urgent reliability issues that need a durable fix.",
    "Local teams usually get involved when flow problems, repeat callouts, or planned upgrades need a scoped method rather than a short-term patch.",
    "The common thread is reducing repeat disruption: clear diagnosis, practical sequencing, and work sized to the real fault condition.",
  ],
  access: [
    "Most enquiries for this involve risk reduction, compliance confidence, and dependable day-to-day security performance.",
    "Projects often start when coverage gaps, access failures, or integration limits create operational exposure that needs a defined upgrade path.",
    "Typical drivers are user safety, audit expectations, and keeping day-to-day operations running while improvements are delivered.",
  ],
  surveys: [
    "Most enquiries for this involve decision-grade reporting that can be relied on for planning and delivery.",
    "Teams usually need outputs that align to programme gates, design coordination, or purchase decisions where assumptions are costly.",
    "The focus is turning site conditions into evidence stakeholders can act on without rework later in the programme.",
  ],
  groundworks: [
    "Most enquiries for this involve early programme planning, site constraints, and buildability before major spend.",
    "Common triggers are ground risk, logistics limits, or dependencies with structural packages that need sequencing agreed up front.",
    "Getting scope and method aligned early usually protects programme certainty when conditions on site are variable.",
  ],
  generic: [
    "Most enquiries for this involve reducing uncertainty before committing to project delivery.",
    "Teams typically want a clear scope, realistic sequencing, and a delivery route that fits site constraints.",
    "The aim is to avoid assumptions that turn into avoidable delays once work is underway.",
  ],
};

const LAYOUT_VARIANTS = ["A", "B", "C"] as const;

function getServiceFamily(service: Service): "drains" | "surveys" | "access" | "groundworks" | "generic" {
  const slug = service.slug.toLowerCase();
  const title = service.title.toLowerCase();
  if (slug.includes("survey") || title.includes("survey")) return "surveys";
  if (slug.includes("drain") || slug.includes("drainage") || title.includes("drain")) return "drains";
  if (
    slug.includes("access") ||
    slug.includes("cctv") ||
    slug.includes("security") ||
    slug.includes("camera") ||
    title.includes("access") ||
    title.includes("security")
  ) {
    return "access";
  }
  if (
    slug.includes("groundworks") ||
    slug.includes("piling") ||
    slug.includes("excavation") ||
    slug.includes("foundation") ||
    slug.includes("enabling") ||
    slug.includes("underpinning") ||
    slug.includes("concrete-repair")
  ) {
    return "groundworks";
  }
  return "generic";
}

function buildFaqItems(service: Service, location: Location, variantIndex: number): FAQItem[] {
  const title = service.titleSingular ?? service.title;
  const processHint = service.process[0]?.toLowerCase() ?? "an initial assessment";
  const variants = [
    [
      {
        question: `How long does ${title.toLowerCase()} take in ${location.name}?`,
        answer: `Timescales depend on scope and site access, but most projects begin with ${processHint} so the programme can be planned clearly.`,
      },
      {
        question: `When is ${title.toLowerCase()} typically required?`,
        answer: `${title} is usually needed when a project has recurring issues, planned upgrades, or site constraints that require a structured method.`,
      },
      {
        question: `What should I consider before starting ${title.toLowerCase()}?`,
        answer: `Key considerations are site condition, access constraints, sequencing with other works, and how much scope is needed for a reliable result.`,
      },
    ],
    [
      {
        question: `How quickly can ${title.toLowerCase()} be completed?`,
        answer: `Completion speed is driven by complexity and access, so the work is usually scoped first to confirm practical timing.`,
      },
      {
        question: `Do I need ${title.toLowerCase()} for my project?`,
        answer: `If your site has performance issues, planned redevelopment, or uncertain requirements, ${title.toLowerCase()} helps define the right approach.`,
      },
      {
        question: `What affects the cost of ${title.toLowerCase()}?`,
        answer: `Cost is mainly influenced by project scope, site conditions, access, and whether supporting works are needed alongside the core service.`,
      },
    ],
    [
      {
        question: `How long should I allow for ${title.toLowerCase()} in ${location.name}?`,
        answer: `Allow enough time for initial assessment and delivery planning, as programme length varies with site complexity and logistics.`,
      },
      {
        question: `When should ${title.toLowerCase()} be planned?`,
        answer: `It is best planned early when project decisions can still be adjusted around site conditions and sequencing.`,
      },
      {
        question: `What practical factors should be checked first?`,
        answer: `Before starting, confirm access, constraints, dependencies with other trades, and the level of work needed to avoid repeat disruption.`,
      },
    ],
  ] as const;
  return [...variants[variantIndex]];
}

function buildExtraSectionParagraph(service: Service, family: ReturnType<typeof getServiceFamily>): string[] {
  const processHint = service.process.slice(0, 2).join(" then ").toLowerCase();
  const generic =
    "Before work begins, confirm access constraints, programme expectations, and how this scope fits with any related works so delivery can stay efficient.";
  const byFamily: Record<ReturnType<typeof getServiceFamily>, string[]> = {
    drains: [
      `Drainage projects are smoother when access points, likely disruption, and sequencing are agreed early; most jobs start with ${processHint || "a clear assessment process"} to avoid repeat callouts.`,
      "Check whether nearby surfaces, property access, and any concurrent building works could affect repair sequencing before starting.",
      generic,
    ],
    surveys: [
      `Survey work is more useful when required outputs, coverage areas, and delivery format are confirmed before capture begins, usually from ${processHint || "a clear survey brief"}.`,
      "Define project milestones in advance so data collection and reporting align with planning, design, or construction deadlines.",
      generic,
    ],
    access: [
      `Security and access projects benefit from early agreement on operational requirements, user flows, and integration needs, typically following ${processHint || "initial requirements review"}.`,
      "Clarify access windows, live-site constraints, and interfaces with existing systems before installation starts.",
      generic,
    ],
    groundworks: [
      `Groundworks programmes perform better when site constraints, logistics, and dependencies are set out before mobilisation, often beginning with ${processHint || "an early site assessment"}.`,
      "Plan around site access, sequencing with structural packages, and temporary works requirements to reduce downstream delays.",
      generic,
    ],
    generic: [generic, generic, generic],
  };
  return byFamily[family];
}

function inferProjectTypes(service: Service): { intro: string; items: string[] } {
  const slug = service.slug.toLowerCase();
  const title = service.title.toLowerCase();
  const isSurvey = slug.includes("survey") || title.includes("survey");
  const isDrain =
    slug.includes("drain") ||
    slug.includes("drainage") ||
    title.includes("drain") ||
    title.includes("drainage");
  const isAccess =
    slug.includes("access") ||
    slug.includes("cctv") ||
    slug.includes("security") ||
    slug.includes("camera") ||
    title.includes("access") ||
    title.includes("security");
  const isGroundworks =
    slug.includes("groundworks") ||
    slug.includes("piling") ||
    slug.includes("excavation") ||
    slug.includes("foundation") ||
    slug.includes("enabling") ||
    slug.includes("underpinning") ||
    slug.includes("concrete-repair");

  if (isSurvey) {
    return {
      intro:
        "We support survey scopes from early feasibility through to delivery, with outputs aligned to planning, design, and compliance expectations.",
      items: [
        "Property purchase surveys where hidden constraints need to be identified early",
        "Planning and pre-construction submissions requiring reliable site data",
        "Construction-stage surveys for setting out, verification, and reporting",
        "Compliance and record deliverables to support approvals and handover",
      ],
    };
  }

  if (isAccess) {
    return {
      intro:
        "Our teams deliver practical security scopes that match how each site is used day to day, from single buildings to multi-area estates.",
      items: [
        "Commercial premises that need controlled access and monitored coverage",
        "Industrial and logistics sites with perimeter and operational risk points",
        "Shared access environments where user groups need different permissions",
        "Managed properties requiring upgrades, integration, or phased rollouts",
      ],
    };
  }

  if (isGroundworks) {
    return {
      intro:
        "Groundworks scopes are planned around sequencing, buildability, and long-term site performance so later construction stages can proceed confidently.",
      items: [
        "New-build developments requiring coordinated early-phase site works",
        "Extensions where existing structures and services influence methodology",
        "Site preparation and enabling activities before main construction",
        "Redevelopment projects involving clearance, excavation, and foundations",
      ],
    };
  }

  if (isDrain) {
    return {
      intro:
        "Drainage work is often commissioned when performance drops suddenly or when a broader project needs dependable drainage before handover.",
      items: [
        "Emergency callouts where flow failure or backing up needs rapid response",
        "Investigations and inspections to confirm root cause before repair",
        "Targeted repairs or replacements to restore reliable operation",
        "Commercial drainage scopes with planned maintenance requirements",
      ],
    };
  }

  return {
    intro:
      "Projects are scoped to match site conditions, project goals, and the practical constraints of delivery.",
    items: [
      "Planned works where early technical advice improves decision making",
      "Repair and renewal projects requiring clear options and sequencing",
      "Compliance-led scopes with documented process and handover",
      "Mixed-use properties needing coordination across multiple priorities",
    ],
  };
}

function buildProcessOutcome(step: string, service: Service, location: Location): string {
  const lowered = step.toLowerCase();
  if (lowered.includes("survey") || lowered.includes("assessment") || lowered.includes("inspect")) {
    return `You get a clear technical baseline for ${service.title.toLowerCase()} decisions in ${location.name}.`;
  }
  if (lowered.includes("plan") || lowered.includes("design") || lowered.includes("scope")) {
    return "Delivery scope, method, and sequencing are agreed before operational work starts.";
  }
  if (lowered.includes("install") || lowered.includes("repair") || lowered.includes("excavat") || lowered.includes("deliver")) {
    return "Core works are completed in line with site constraints and project priorities.";
  }
  if (lowered.includes("test") || lowered.includes("handover") || lowered.includes("report")) {
    return "Completion is validated with clear sign-off and next-step guidance.";
  }
  return `This step keeps ${service.title.toLowerCase()} delivery predictable and aligned to project requirements.`;
}

const locationBreadcrumbs = (
  serviceTitle: string,
  serviceSlug: string,
  locationName: string,
  serviceSlugParam: string,
  locationSlugParam: string
) => [
  { name: "Home", url: "/" },
  { name: serviceTitle, url: `/${serviceSlug}` },
  { name: `${serviceTitle} in ${locationName}`, url: `/${serviceSlugParam}/${locationSlugParam}` },
];

export interface LocationPageProps {
  service: Service;
  location: Location;
  serviceSlug: string;
  locationSlug: string;
  sameAreaLocations: Location[];
  nearbyLocations: Location[];
  localFaqs: FAQItem[];
  companyInfo: CompanyInfo;
  otherServices: Service[];
  baseUrl: string;
  serviceImage: string;
  contactPath?: string;
  /** Optional trust section: title and bullet points (e.g. "Trusted Drain Engineers in Camden"). */
  trustSectionTitle?: string;
  trustPoints?: string[];
  /** Path to diagnosis tool page (e.g. /collapsed-drains-complete-guide). Button links to path#diagnosis. */
  diagnosisGuidePath?: string;
  /** Show map embed in sidebar. Default true when location has coordinates. */
  showMap?: boolean;
  /** Optional intro paragraph describing the service in this location (above main content). */
  introParagraph?: string;
  /** Optional extra links to other services in this location (e.g. high-intent cross-sell). */
  extraServiceLocationLinks?: { href: string; children: string }[];
  /** Optional description for the "Nearby Areas We Serve" block (e.g. "Compare our {service} in nearby areas"). */
  nearbyAreasDescription?: string;
  /** Up to 5 neighbour locations for local context block and "Nearby service areas" links. When provided, LocationContext and NearbyAreas are rendered after the intro paragraph. */
  neighbourLocationsForContext?: Location[];
  /** Optional 60–100 word paragraph for the Location Context section (H2 + paragraph). When provided, LocationContext uses it instead of the default short text. */
  locationContextParagraph?: string;
  /** Optional 2–3 projects near this location for "Recent Projects Near {Location}" block. Each url typically points to /projects or /projects#id. */
  nearbyProjects?: Array<{ id: string; title: string; description: string; image: string; url: string }>;
  /** Optional topic links for "Helpful guidance" block (4–6 links to topic pages). When provided, section is rendered above FAQ. */
  relatedTopicLinks?: { title: string; href: string }[];
  /** Optional heading for the related topics block. Default: "Helpful guidance related to this service". */
  relatedTopicsSectionTitle?: string;
  /** Optional intro paragraph for the related topics block. */
  relatedTopicsSectionIntro?: string;
  /** Vertical id for call-click analytics (e.g. verticalConfig.verticalId). */
  callTrackVertical: string;
  /** Optional internal link count for page tiering (future crawl/analytics feed). */
  inlinkCount?: number | null;
  /**
   * When set (e.g. trust bullets from the vertical), renders a “Get a quote” card at the top of the
   * sticky sidebar above the map — avoids a second outer column beside LocationPage.
   */
  conversionAsideTitle?: string;
  conversionAsideBullets?: string[];
}

export function LocationPage({
  service,
  location,
  serviceSlug,
  locationSlug,
  nearbyLocations,
  localFaqs,
  companyInfo,
  otherServices,
  baseUrl,
  serviceImage,
  contactPath = "/contact",
  trustSectionTitle,
  trustPoints,
  diagnosisGuidePath,
  showMap = true,
  introParagraph,
  extraServiceLocationLinks,
  nearbyAreasDescription,
  neighbourLocationsForContext,
  locationContextParagraph,
  nearbyProjects,
  relatedTopicLinks,
  relatedTopicsSectionTitle,
  relatedTopicsSectionIntro,
  callTrackVertical,
  inlinkCount,
  conversionAsideTitle = "Get a quote",
  conversionAsideBullets,
}: LocationPageProps) {
  const showMapEmbed = showMap && typeof location.lat === "number" && typeof location.lng === "number";
  const displayTitle = service.titleSingular ?? service.title;
  const seoPageType: PageType = "service_location";
  const pageTier = getPageTier({ inlinks: inlinkCount ?? null, pageType: seoPageType });
  const rootSeoAttrs = pageSeoDataAttrs(pageTier, seoPageType);

  const allLocIds = allLocationsDataset.map((l) => l.id);
  const ukGroup = getUkGroupingForLocationId(location.id);
  const countyPeerIds = getCountyPeerLocationIds(location.id, 6, allLocIds);
  const countyPeerLocations = countyPeerIds
    .map((id) => allLocationsDataset.find((l) => l.id === id))
    .filter((l): l is Location => l != null);

  const mergedNearby = (() => {
    const seen = new Set<string>([location.id]);
    const out: Location[] = [];
    for (const l of countyPeerLocations) {
      if (seen.has(l.id)) continue;
      seen.add(l.id);
      out.push(l);
    }
    for (const l of nearbyLocations) {
      if (out.length >= 8) break;
      if (seen.has(l.id)) continue;
      seen.add(l.id);
      out.push(l);
    }
    if (out.length > 0) return out;
    return nearbyLocations.slice(0, 8);
  })();

  const countyLineVariant = getVariantIndex(`county-line:${service.slug}:${location.id}`, 3);
  const countyContextTemplates = ukGroup
    ? [
        `This area sits within ${ukGroup.countyName}, where we support projects across ${location.name} and nearby centres for both residential and commercial clients.`,
        `${location.name} is part of ${ukGroup.countyName} in ${ukGroup.regionName}; local work often spans mixed housing stock, commercial premises, and sites with varied access conditions.`,
        `Within ${ukGroup.countyName}, ${location.name} is one of the areas we serve with structured delivery and consistent standards across comparable projects.`,
      ]
    : [];
  const introVariantIndex = getVariantIndex(`intro:${service.slug}:${location.id}`, INTRO_VARIANTS.length);
  const whenNeededVariantIndex = getVariantIndex(
    `when-needed:${service.slug}:${location.id}`,
    WHEN_NEEDED_VARIANTS.length
  );
  const projectVariantIndex = getVariantIndex(`projects:${service.slug}:${location.id}`, 3);
  const locationContextVariantIndex = getVariantIndex(
    `location-context:${service.slug}:${location.id}`,
    LOCATION_CONTEXT_VARIANTS.length
  );
  const linksVariantIndex = getVariantIndex(`inline-links:${service.slug}:${location.id}`, 3);
  const faqVariantIndex = getVariantIndex(`${service.slug}:${location.id}-faq`, 3);
  const extraVariantIndex = getVariantIndex(`${service.slug}:${location.id}-extra`, 3);
  const aboutLinkVariantIndex = getVariantIndex(`about:loc:${serviceSlug}:${locationSlug}`, LOCATION_ABOUT_LABELS.length);
  const layoutVariantIndex = getVariantIndex(`layout:location:${serviceSlug}:${locationSlug}`, LAYOUT_VARIANTS.length);
  const layoutVariant = LAYOUT_VARIANTS[layoutVariantIndex];
  const isWhenNeededEarly = layoutVariant === "B";
  const isProcessEarly = layoutVariant === "C";

  const whenNeededHeadingIndex = getVariantIndex(
    `when-needed-h2:${service.slug}:${location.id}`,
    WHEN_NEEDED_SECTION_HEADINGS.length
  );
  const processIntroVariantIndex = getVariantIndex(
    `process-intro:${service.slug}:${location.id}`,
    PROCESS_SECTION_INTROS.length
  );
  const typicalProjectsHeadingIndex = getVariantIndex(
    `typical-projects-h2:${service.slug}:${location.id}`,
    TYPICAL_PROJECTS_HEADINGS.length
  );
  const earlyTopicLinks = relatedTopicLinks?.slice(0, 2) ?? [];

  const introLines = INTRO_VARIANTS[introVariantIndex](displayTitle, location.name);
  const openingPrimaryVariantIndex = getVariantIndex(
    `opening-primary:${service.slug}:${location.id}`,
    OPENING_PRIMARY_VARIANTS.length
  );
  const openingPrimary = OPENING_PRIMARY_VARIANTS[openingPrimaryVariantIndex](
    displayTitle,
    location.name,
    location.area
  );
  const processIntroConfig = PROCESS_SECTION_INTROS[processIntroVariantIndex];
  const whenNeeded = WHEN_NEEDED_VARIANTS[whenNeededVariantIndex];
  const generatedFaqs = buildFaqItems(service, location, faqVariantIndex);
  const shouldAppendSingleFaq = localFaqs.length >= 3;
  const appendedFaqs = shouldAppendSingleFaq ? generatedFaqs.slice(0, 1) : generatedFaqs;
  const combinedLocalFaqs = [...localFaqs, ...appendedFaqs].slice(0, 5);
  const serviceFamily = getServiceFamily(service);
  const toneLeadVariantIndex = getVariantIndex(`tone-lead:${service.slug}:${location.id}`, 3);
  const toneLeadPool = TONE_LEAD_VARIANTS[serviceFamily];
  const toneLead = toneLeadPool[toneLeadVariantIndex % toneLeadPool.length];
  const extraParagraph = buildExtraSectionParagraph(service, serviceFamily)[extraVariantIndex];
  const projectTypes = inferProjectTypes(service);
  const fallbackLocationContext =
    LOCATION_CONTEXT_VARIANTS[locationContextVariantIndex](location.name, location.area, displayTitle);
  const activeLocationContext = locationContextParagraph ?? fallbackLocationContext;
  const earlyServiceLinkHrefs = new Set((extraServiceLocationLinks ?? []).map((link) => link.href));
  const earlyTopicLinkHrefs = new Set(earlyTopicLinks.map((link) => link.href));
  const remainingOtherServices = otherServices.filter(
    (candidate) => !earlyServiceLinkHrefs.has(`/${candidate.slug}/${location.id}`)
  );
  const remainingTopicLinks = (relatedTopicLinks ?? []).filter((link) => !earlyTopicLinkHrefs.has(link.href));
  const relatedServicePool = remainingOtherServices.length > 0 ? remainingOtherServices : otherServices;
  const relatedService = relatedServicePool[linksVariantIndex % Math.max(relatedServicePool.length, 1)];
  const nearbyLocation = mergedNearby[linksVariantIndex % Math.max(mergedNearby.length, 1)];
  const nearbyAnchorText = NEARBY_ANCHOR_VARIANTS[linksVariantIndex].replace(
    "{location}",
    nearbyLocation?.name ?? "nearby areas"
  );
  const serviceAnchorTemplate = SERVICE_ANCHOR_VARIANTS[(linksVariantIndex + 1) % SERVICE_ANCHOR_VARIANTS.length];
  const serviceAnchorText = serviceAnchorTemplate.replace(
    "{service}",
    relatedService?.title?.toLowerCase() ?? "related services"
  );
  const defaultTrustPoints = [
    `Local expertise in ${location.area}`,
    "Clear communication from quote to completion",
    "Fully insured teams with professional standards",
    "Practical solutions tailored to your property",
  ];
  const activeTrustPoints =
    trustPoints && trustPoints.length > 0 ? trustPoints : defaultTrustPoints;

  const whenNeededSection = (
    <div className="mb-8">
      <h2 className="mb-3 font-display text-xl font-bold">
        {`When you might need ${displayTitle}`}
      </h2>
      <div className="space-y-4 text-muted-foreground">
        <p>{whenNeeded.first}</p>
        <p>
          {whenNeeded.second} In decision-stage terms, this is often where teams move from broad options into method
          selection, sequencing, and budget alignment.
        </p>
        <p>{whenNeeded.third}</p>
      </div>
    </div>
  );

  const processStepsForPage = service.process.filter(Boolean).slice(0, 5);
  const processSection =
    processStepsForPage.length > 0 ? (
      <>
        <SectionIntro title={processIntroConfig.title} description={processIntroConfig.description} headingLevel="h2" />
        <ol className="mb-8 space-y-3">
          {processStepsForPage.map((step, idx) => (
            <li key={`${step}-${idx}`} className="rounded-lg border border-border bg-secondary/40 p-4">
              <p className="font-medium">
                Step {idx + 1}: {step}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                What this step delivers: {buildProcessOutcome(step, service, location)}
              </p>
            </li>
          ))}
        </ol>
      </>
    ) : null;

  if (process.env.NODE_ENV !== "production") {
    const estimatedOpeningWords = `${introParagraph ?? openingPrimary} ${introLines[1] ?? ""} ${introLines[2] ?? ""} ${toneLead}`
      .trim()
      .split(/\s+/).length;
    const estimatedPrimarySections = 7;
    if (estimatedOpeningWords < 45 || estimatedPrimarySections > 7) {
      console.warn("[page-quality-warning]", {
        pageType: "location",
        variant: layoutVariant,
        serviceSlug,
        locationSlug,
        estimatedOpeningWords,
        estimatedPrimarySections,
      });
    }
  }

  return (
    <div className="contents" {...rootSeoAttrs}>
      <SchemaMarkup
        type="LocalBusiness"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          areaServed: `${location.name}, ${location.area}`,
          geo: { lat: location.lat, lng: location.lng },
          serviceType: service.title,
        }}
      />
      <SchemaMarkup
        type="Service"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          serviceName: service.title,
          serviceDescription: service.description,
          areaServed: `${location.name}, ${location.area}`,
          url: `/${serviceSlug}/${locationSlug}`,
        }}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          breadcrumbs: locationBreadcrumbs(displayTitle, service.slug, location.name, serviceSlug, locationSlug),
        }}
      />

      <section
        className="relative overflow-hidden bg-primary pt-10 pb-14 md:pt-16 md:pb-24"
        data-layout-variant={layoutVariant}
      >
        <div className="absolute inset-0">
          <img
            src={serviceImage}
            alt={`${displayTitle} engineer working in ${location.name}, ${location.area}`}
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-primary/65 to-primary/80" />
        </div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex flex-col items-center gap-4">
              <BreadcrumbNav
                items={locationBreadcrumbs(displayTitle, service.slug, location.name, serviceSlug, locationSlug)}
                variant="inverse"
              />
              <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">
                {displayTitle} in {location.name}
              </h1>
              <p className="text-lg text-primary-foreground/80">
                Trusted {service.title.toLowerCase()} experts serving {location.name} and {location.area}.
              </p>
            </div>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="highlight" className="shadow-md ring-2 ring-primary-foreground/20" asChild>
                <Link href={contactPath}>Get a Free Quote</Link>
              </Button>
              <TrackablePhoneLink
                phone={companyInfo.phone}
                vertical={callTrackVertical}
                serviceSlug={service.slug}
                locationSlug={location.id}
                className="hidden sm:inline-flex items-center gap-2 text-primary-foreground hover:underline"
              >
                <Phone className="h-5 w-5" /> Call Now
              </TrackablePhoneLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/30 py-4 md:py-5" aria-label="Trust signals">
        <div className="container">
          <TrustStrip className="mx-auto max-w-4xl" />
        </div>
      </section>

      {diagnosisGuidePath && (
        <section className="border-b border-border bg-secondary/30 py-6">
          <div className="container">
            <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-6">
              <p className="text-muted-foreground">Not sure what&apos;s wrong with your drains?</p>
              <Button asChild variant="outline" size="sm">
                <Link href={`${diagnosisGuidePath}#diagnosis`}>Use our free diagnosis tool</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      <section className="section-padding">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-6 max-w-prose space-y-5 text-muted-foreground">
                {ukGroup && (
                  <p>
                    We cover the wider {ukGroup.regionName} area, including {ukGroup.countyName}.
                  </p>
                )}
                <p>{introParagraph?.trim() ? introParagraph.trim() : openingPrimary}</p>
                <p>{toneLead}</p>
                {extraServiceLocationLinks && extraServiceLocationLinks.length > 0 && (
                  <p className="text-muted-foreground">
                    {extraServiceLocationLinks.map((link, i) => (
                      <span key={link.href}>
                        {i > 0 && (i === extraServiceLocationLinks.length - 1 ? " and " : ", ")}
                        <Link href={link.href} className="text-primary hover:underline">
                          {link.children}
                        </Link>
                      </span>
                    ))}
                    .
                  </p>
                )}
                {earlyTopicLinks.length > 0 && (
                  <p>
                    For related guidance, see{" "}
                    {earlyTopicLinks.map((link, index) => (
                      <span key={link.href}>
                        {index > 0 && (index === earlyTopicLinks.length - 1 ? " and " : ", ")}
                        <Link href={link.href} className="text-primary hover:underline">
                          {link.title}
                        </Link>
                      </span>
                    ))}
                    .
                  </p>
                )}
                {(nearbyLocation || relatedService) && (
                  <p>
                    {nearbyLocation && (
                      <>
                        You can also review{" "}
                        <Link href={`/${service.slug}/${nearbyLocation.id}`} className="text-primary hover:underline">
                          {nearbyAnchorText}
                        </Link>
                        {relatedService ? ", or explore " : "."}
                      </>
                    )}
                    {relatedService && (
                      <>
                        <Link href={`/${relatedService.slug}/${location.id}`} className="text-primary hover:underline">
                          {serviceAnchorText}
                        </Link>
                        .
                      </>
                    )}
                  </p>
                )}
                <p>{introLines[1]}</p>
                <p>{introLines[2]}</p>
                {ukGroup && (
                  <>
                    <p>
                      We provide {displayTitle.toLowerCase()} across {ukGroup.regionName}, including{" "}
                      {location.name} and the wider {ukGroup.countyName} area, for typical residential and
                      commercial project requirements.
                    </p>
                    <p>{countyContextTemplates[countyLineVariant]}</p>
                  </>
                )}
              </div>
              {neighbourLocationsForContext && neighbourLocationsForContext.length > 0 && (
                <>
                  <LocationContext
                    serviceTitle={displayTitle}
                    locationName={location.name}
                    locationArea={location.area}
                    neighbourNames={neighbourLocationsForContext.map((l) => l.name)}
                    contextParagraph={locationContextParagraph}
                  />
                  <NearbyAreas
                    serviceSlug={serviceSlug}
                    serviceTitle={displayTitle}
                    neighbourLocations={neighbourLocationsForContext.slice(0, 8).map((l) => ({ id: l.id, name: l.name }))}
                  />
                </>
              )}
              {isWhenNeededEarly && whenNeededSection}
              <div className="mb-8">
                <h2 className="mb-3 font-display text-xl font-bold">
                  {`Where ${displayTitle} is used`}
                </h2>
                <p className="mb-4 text-muted-foreground">
                  {
                    [
                      projectTypes.intro,
                      `Typical ${displayTitle.toLowerCase()} scopes include planned works, urgent priorities, and multi-stage projects where delivery needs to stay coordinated.`,
                      `The examples below reflect common ${displayTitle.toLowerCase()} briefs and show how project requirements can vary by site and objective.`,
                    ][projectVariantIndex]
                  }
                </p>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  {projectTypes.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-8">
                <h2 className="mb-3 font-display text-xl font-bold">
                  {COST_COMPLEXITY_HEADINGS[extraVariantIndex]}
                </h2>
                <p className="text-muted-foreground">
                  Cost and complexity are shaped by site access, work scale, and technical constraints in{" "}
                  {location.name}. Programme certainty also depends on local logistics, sequencing with other trades,
                  and any compliance or operational requirements that affect delivery windows.
                </p>
              </div>
              <div className="mb-8">
                <h2 className="mb-3 font-display text-xl font-bold">Project context in {location.name}</h2>
                <p className="text-muted-foreground">{activeLocationContext}</p>
              </div>
              {!isWhenNeededEarly && whenNeededSection}
              {isProcessEarly && processSection}
              <p className="mb-8 text-muted-foreground">{service.description}</p>
              <p className="mb-8 text-sm text-muted-foreground">
                <Link href="/about" className="text-primary hover:underline">
                  {LOCATION_ABOUT_LABELS[aboutLinkVariantIndex]}
                </Link>
              </p>

              {location.nearbyTowns && location.nearbyTowns.length > 0 && (
                <div className="mb-8 rounded-lg bg-secondary p-4">
                  <h2 className="mb-2 font-display text-lg font-bold">We Also Cover</h2>
                  <p className="text-sm text-muted-foreground">
                    {location.nearbyTowns.join(", ")} and surrounding areas in {location.area}.
                  </p>
                </div>
              )}

              {location.propertyTypes && (
                <div className="mb-8">
                  <h2 className="mb-2 font-display text-lg font-bold">
                    Common Property Types in {location.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">{location.propertyTypes}</p>
                </div>
              )}

              <SectionIntro
                title={`Why choose us for ${displayTitle.toLowerCase()} in ${location.name}?`}
                description={`When you need ${displayTitle.toLowerCase()} locally, you need clear advice, dependable delivery, and a team that understands the practical constraints in ${location.name} and ${location.area}.`}
                headingLevel="h2"
              />
              <TrustReassuranceStrip
                points={activeTrustPoints}
                title={trustSectionTitle ?? "What you can expect"}
              />

              {!isProcessEarly && processSection}

              {nearbyProjects && nearbyProjects.length > 0 && (
                <>
                  <h2 className="mb-4 font-display text-xl font-bold">
                    Recent Projects Near {location.name}
                  </h2>
                  <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {nearbyProjects.slice(0, 3).map((project) => (
                      <Link
                        key={project.id}
                        href={project.url}
                        className="group rounded-lg border border-border bg-background overflow-hidden transition-all hover:border-primary hover:shadow-md"
                      >
                        <div className="aspect-video w-full overflow-hidden bg-muted">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="mb-1 font-display font-semibold group-hover:text-primary">
                            {project.title}
                          </h4>
                          <p className="line-clamp-2 text-sm text-muted-foreground">
                            {project.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
              <div className="mb-8">
                <h2 className="mb-3 font-display text-xl font-bold">
                  {LOCATION_EXTRA_HEADINGS[extraVariantIndex]}
                </h2>
                <p className="text-muted-foreground">{extraParagraph}</p>
              </div>

              <ActionPanel
                companyInfo={companyInfo}
                contactPath={contactPath}
                heading={`Need guidance before starting ${displayTitle.toLowerCase()} work?`}
                body={`Share your site details and priorities in ${location.name}; we will recommend the right scope, likely timeline, and practical next step.`}
                ctaText="Get project advice"
                callTrackVertical={callTrackVertical}
                callTrackServiceSlug={service.slug}
                callTrackLocationSlug={location.id}
                pageTier={pageTier}
                pageType={seoPageType}
              />

              <ActionPanel
                companyInfo={companyInfo}
                contactPath={contactPath}
                heading={`Need ${displayTitle.toLowerCase()} in ${location.name}?`}
                body="Tell us what you need and we will advise on the right approach, timeline, and next step for your property."
                ctaText="Get pricing for your site"
                callTrackVertical={callTrackVertical}
                callTrackServiceSlug={service.slug}
                callTrackLocationSlug={location.id}
                pageTier={pageTier}
                pageType={seoPageType}
              />
              <InspectionCTA
                companyInfo={companyInfo}
                contactPath={contactPath}
                callTrackVertical={callTrackVertical}
                callTrackServiceSlug={service.slug}
                callTrackLocationSlug={location.id}
                pageTier={pageTier}
                pageType={seoPageType}
              />
            </div>

            <div className="space-y-6 lg:sticky lg:top-24 h-fit">
              {conversionAsideBullets && conversionAsideBullets.length > 0 && (
                <div className="space-y-4 rounded-xl border border-border bg-card p-5">
                  <h2 className="font-display text-lg font-semibold text-foreground">{conversionAsideTitle}</h2>
                  <Button asChild>
                    <Link href={contactPath}>Get a quote</Link>
                  </Button>
                  <TrackablePhoneLink
                    phone={companyInfo.phone}
                    vertical={callTrackVertical}
                    serviceSlug={service.slug}
                    locationSlug={location.id}
                    source="cta"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Phone className="h-4 w-4" /> Call Now
                  </TrackablePhoneLink>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {conversionAsideBullets.slice(0, 5).map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {showMapEmbed && (
                <div className="rounded-lg overflow-hidden">
                  <MapEmbed
                    lat={location.lat}
                    lng={location.lng}
                    height={250}
                    title={`Map of ${location.name}, ${location.area}`}
                  />
                </div>
              )}
              <div className="rounded-lg bg-secondary p-6">
                <h2 className="mb-4 font-display text-lg font-bold">Contact Us</h2>
                <div className="space-y-3">
                <TrackablePhoneLink
                  phone={companyInfo.phone}
                  vertical={callTrackVertical}
                  serviceSlug={service.slug}
                  locationSlug={location.id}
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Phone className="h-4 w-4" /> Call Now
                </TrackablePhoneLink>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" /> {companyInfo.email}
                  </a>
                </div>
                <Button asChild className="mt-4 w-full" variant="highlight">
                  <Link href={contactPath}>Get a Free Quote</Link>
                </Button>
              </div>

              <div className="rounded-lg bg-secondary p-6">
                <h2 className="mb-4 font-display text-lg font-bold">Nearby Areas We Cover</h2>
                <p className="mb-3 text-xs text-muted-foreground">
                  We also provide {service.title.toLowerCase()} in these areas:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {mergedNearby.slice(0, 8).map((loc) => (
                    <Link
                      key={loc.id}
                      href={`/${service.slug}/${loc.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {loc.name} <ArrowRight className="inline h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-secondary p-6">
                <p className="mb-2 text-sm text-muted-foreground">
                  <Link href={`/${service.slug}`} className="text-primary hover:underline">
                    View {displayTitle} overview
                  </Link>
                </p>
                <p className="text-sm text-muted-foreground">
                  <Link href="/services" className="text-primary hover:underline">
                    All services
                  </Link>
                </p>
              </div>

              {remainingOtherServices.length > 0 && (
                <div className="rounded-lg bg-secondary p-6">
                  <h2 className="mb-4 font-display text-lg font-bold">Other Services</h2>
                  <p className="mb-3 text-xs text-muted-foreground">
                    If your project needs more than one service, compare relevant options available in {location.name}.
                  </p>
                  <div className="space-y-2">
                    {remainingOtherServices.map((s) => (
                      <Link
                        key={s.id}
                        href={`/${s.slug}/${location.id}`}
                        className="block text-sm text-primary hover:underline"
                      >
                        {s.title} in {location.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {remainingTopicLinks.length > 0 && (
        <section className="bg-secondary/50 py-12">
          <div className="container">
            <h2 className="mb-4 font-display text-2xl font-bold text-center">
              {relatedTopicsSectionTitle ?? "Helpful guidance related to this service"}
            </h2>
            <p className="mb-6 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
              {relatedTopicsSectionIntro ??
                "These guides explain common issues, planning considerations, and practical decisions related to this service."}
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {remainingTopicLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-primary hover:underline"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQSchema items={combinedLocalFaqs} title="Frequently Asked Questions" />

      <section className="bg-secondary/50 py-12">
        <div className="container">
          <h2 className="mb-6 font-display text-2xl font-bold text-center">
            Nearby Areas We Serve
          </h2>
          <p className="mb-4 text-center text-sm text-muted-foreground">
            {nearbyAreasDescription ??
              `Compare ${displayTitle.toLowerCase()} options in nearby towns and cities around ${location.name}.`}
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {mergedNearby.slice(0, 8).map((loc) => (
              <Link
                key={loc.id}
                href={`/${service.slug}/${loc.id}`}
                className="text-primary hover:underline"
              >
                {displayTitle} in {loc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {remainingOtherServices.length > 0 && (
        <section className="section-padding pt-0">
          <div className="container">
            <h2 className="mb-6 font-display text-2xl font-bold text-center">
              Services in this area
            </h2>
            <p className="mb-4 text-center text-sm text-muted-foreground">
              Explore related services that are often commissioned alongside this work in {location.name}.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {remainingOtherServices.map((s) => (
                <Link
                  key={s.id}
                  href={`/${s.slug}/${location.id}`}
                  className="text-primary hover:underline"
                >
                  {s.title} in {location.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-primary py-16">
        <div className="container text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground">
            Need {displayTitle} in {location.name}?
          </h2>
          <p className="mb-6 text-primary-foreground/80">
            Contact us today for a free, no-obligation quote.
          </p>
          <Button size="lg" variant="highlight" asChild>
            <Link href={contactPath}>Get Your Free Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
