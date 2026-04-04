import Link from "next/link";
import { CheckCircle, ArrowRight, AlertTriangle } from "lucide-react";
import { SchemaMarkup } from "../schema/SchemaMarkup";
import { FAQSchema, type FAQItem } from "../schema/FAQSchema";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { MidContentCTA } from "./MidContentCTA";
import { InspectionCTA } from "./InspectionCTA";
import { CTABanner } from "./CTABanner";
import { ServiceImageGallery } from "./ServiceImageGallery";
import { Button } from "./ui/button";
import { SectionIntro } from "./SectionIntro";
import { ProcessTimeline } from "./ProcessTimeline";
import { TrustStrip } from "./TrustStrip";
import { ActionPanel } from "./ActionPanel";
import { QuoteFormPrimaryCta } from "./QuoteFormPrimaryCta";
import { getImageAlt } from "../utils/imageAlt";
import { KEY_SERVICE_DETAIL_LOCATION_IDS } from "../data/key-location-ids";
import { getVariantIndex } from "../lib/contentVariants";
import { getPageTier, pageSeoDataAttrs, type PageType } from "../lib/pageWeighting";
import { pickServiceDetailFeaturedLocations } from "../utils/pickFeaturedLocations";
import { getServiceUrl } from "../utils/serviceUrls";
import { buildFeaturedServiceLocationLinks } from "../utils/internalLinkTargets";
import type { Service, Location, VerticalConfig } from "../types";
import { getCtaVariant } from "../utils/ctaVariants";

function pickServiceDetailSidebarLocations(all: Location[]): Location[] {
  return all
    .filter((l) => KEY_SERVICE_DETAIL_LOCATION_IDS.includes(l.id))
    .sort((a, b) => a.id.localeCompare(b.id))
    .slice(0, 20);
}

const DEFAULT_INDUSTRIES = [
  "Hospitals",
  "Data centres",
  "Warehouses",
  "Office buildings",
  "Manufacturing sites",
  "Commercial property",
];

const CTA_BY_VERTICAL: Record<
  string,
  { discuss: string[]; request: string[]; sidebar: string[]; actionHeading: string[] }
> = {
  drains: {
    discuss: ["Get drainage advice", "Speak to our team about your drainage plans"],
    request: ["Request a drainage quote", "Get a drainage quote"],
    sidebar: ["Request a drainage quote", "Get a drainage quote"],
    actionHeading: ["Get drainage advice for your project", "Discuss your drainage project requirements"],
  },
  surveys: {
    discuss: ["Ask about the right survey", "Speak to our team about your survey needs"],
    request: ["Request a survey quote", "Get a survey quote"],
    sidebar: ["Request a survey quote", "Get a survey quote"],
    actionHeading: ["Ask about the right survey for your site", "Discuss your survey requirements"],
  },
  access: {
    discuss: ["Discuss your security requirements", "Speak to our team about your security plans"],
    request: ["Request a system quote", "Get a system quote"],
    sidebar: ["Request a system quote", "Get a system quote"],
    actionHeading: ["Discuss your security requirements", "Discuss your security project requirements"],
  },
  groundworks: {
    discuss: ["Get advice on your project", "Speak to our team about your plans"],
    request: ["Request a groundworks quote", "Get a groundworks quote"],
    sidebar: ["Request a groundworks quote", "Get a groundworks quote"],
    actionHeading: ["Get advice on your groundworks project", "Discuss your groundworks project requirements"],
  },
};

const SERVICE_EXTRA_HEADINGS = [
  "What affects cost and scope",
  "What affects cost and scope",
  "What affects cost and scope",
] as const;

const TYPICAL_SITUATIONS_SECTIONS = [
  {
    title: "When you might need this service",
    description:
      "These are the situations where this service typically adds the most value and helps prevent avoidable rework.",
  },
  {
    title: "When you might need this service",
    description:
      "Common triggers where structured scope and clear delivery keep projects on track and reduce repeat disruption.",
  },
  {
    title: "When you might need this service",
    description:
      "These scenarios are where commissioning work early tends to save time, cost, and disruption across the programme.",
  },
] as const;

const SERVICE_PROCESS_SECTION_INTROS = [
  {
    title: "How the service works",
    description:
      "Each stage is structured to keep decisions clear and delivery predictable from first assessment to sign-off.",
  },
  {
    title: "How the service works",
    description:
      "Delivery follows a defined path so scope, dependencies, and handover expectations stay aligned throughout.",
  },
  {
    title: "How the service works",
    description:
      "You should see practical options explained early, then structured delivery through to completion and verification.",
  },
] as const;

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

const SERVICE_DETAIL_ABOUT_LABELS = ["Learn more about our team", "How we work with clients"] as const;
const LAYOUT_VARIANTS = ["A", "B", "C"] as const;

function buildProcessOutcome(step: string): string {
  const lowered = step.toLowerCase();
  if (lowered.includes("survey") || lowered.includes("inspect") || lowered.includes("assess")) {
    return "Requirements and constraints are confirmed before commitments are made.";
  }
  if (lowered.includes("plan") || lowered.includes("design") || lowered.includes("scope")) {
    return "The right method, sequence, and dependencies are agreed for predictable delivery.";
  }
  if (lowered.includes("install") || lowered.includes("repair") || lowered.includes("deliver")) {
    return "Core works are completed against agreed scope and programme.";
  }
  if (lowered.includes("test") || lowered.includes("handover") || lowered.includes("report")) {
    return "Completion is validated and handed over with clear next steps.";
  }
  return "This stage improves certainty and reduces avoidable rework.";
}

function buildFaqItems(service: Service, verticalId: string, variantIndex: number): FAQItem[] {
  const title = service.titleSingular ?? service.title;
  const processHint = service.process[0]?.toLowerCase() ?? "an initial assessment";
  const family = getServiceFamily(service);
  const familyHints: Record<typeof family, string> = {
    drains: "drain condition, access to runs, and whether related repair work is needed",
    surveys: "required outputs, site access, and level of detail needed for project decisions",
    access: "site operations, integration scope, and access constraints during installation",
    groundworks: "ground conditions, logistics, and dependencies with other construction packages",
    generic: "site conditions, access constraints, and project scope",
  };
  const variants = [
    [
      {
        question: `What affects the scope of ${title.toLowerCase()}?`,
        answer: `Scope is set by project requirements, site constraints, and what is needed to deliver a reliable long-term result.`,
      },
      {
        question: `What should be prepared before ${title.toLowerCase()} starts?`,
        answer: `Prepare access details, confirm constraints, and align dependencies so ${processHint} can move straight into clear delivery planning.`,
      },
      {
        question: `What typically influences programme length?`,
        answer: `Programme length mainly reflects complexity, access windows, and the amount of supporting work around the core service.`,
      },
    ],
    [
      {
        question: `How is the right approach selected for ${title.toLowerCase()}?`,
        answer: `The approach is selected from site findings and project goals so the method matches practical conditions rather than assumptions.`,
      },
      {
        question: `What can change the amount of work involved?`,
        answer: `Work volume can change with existing condition, required outcomes, and whether related elements need to be addressed together.`,
      },
      {
        question: `What should teams align on before delivery?`,
        answer: `Teams should align on access, sequencing, responsibilities, and handover expectations before the main works begin.`,
      },
    ],
    [
      {
        question: `What practical factors should be reviewed first?`,
        answer: `Review ${familyHints[family]} early to keep scope realistic and avoid unnecessary rework.`,
      },
      {
        question: `How can project risk be reduced before starting?`,
        answer: `Risk is reduced by confirming scope, constraints, and sequencing before committing to delivery dates.`,
      },
      {
        question: `When should requirements be finalised?`,
        answer: `Requirements are best finalised during initial planning so the chosen method can be delivered consistently from start to handover.`,
      },
    ],
  ] as const;
  return [...variants[variantIndex]];
}

function buildExtraSectionParagraph(
  service: Service,
  family: ReturnType<typeof getServiceFamily>
): string[] {
  const byFamily: Record<ReturnType<typeof getServiceFamily>, string[]> = {
    drains: [
      "Drainage cost and timing usually depend on drain condition, access to the affected run, and whether supporting repair or reinstatement is required alongside the core work.",
      "For drainage projects, programme certainty improves when access constraints and any adjacent remedial works are scoped before delivery begins.",
      "The biggest drainage timeline drivers are site access, defect complexity, and how much surrounding work is needed to complete the fix properly.",
    ],
    surveys: [
      "Survey timelines are influenced by site access, required level of detail, and the format/turnaround expected for deliverables used in planning or design.",
      "Survey scope can vary with project stage, data specification, and constraints on capture windows, all of which affect delivery pace.",
      "For survey projects, complexity, access permissions, and reporting requirements are the main factors shaping programme and effort.",
    ],
    access: [
      "Security project timelines usually reflect site operations, installation access windows, and integration complexity with existing systems.",
      "Access and security scope can expand when integration, phased rollout needs, or live-site constraints require additional coordination.",
      "The main influences on delivery are site condition, system complexity, and how installation is sequenced to minimise operational disruption.",
    ],
    groundworks: [
      "Groundworks programmes are mainly influenced by ground conditions, site logistics, and sequencing with structural or utility packages.",
      "Groundworks scope and timing can shift with access constraints, enabling requirements, and the complexity of supporting site preparation activities.",
      "For groundworks projects, complexity, mobilisation constraints, and interdependencies with adjacent trades are key delivery factors.",
    ],
    generic: [
      "Cost and timeline are typically influenced by site conditions, access constraints, complexity, and total scope required for a complete outcome.",
      "Project duration and effort usually vary with site access, level of complexity, and how this scope interacts with related works.",
      "The most common programme drivers are site constraints, delivery complexity, and the amount of coordinated work needed around the core service.",
    ],
  };
  return byFamily[family];
}

export interface SymptomLink {
  slug: string;
  path: string;
  title: string;
}

export interface ServiceDetailContentProps {
  service: Service;
  services: Service[];
  locations: Location[];
  verticalConfig: VerticalConfig;
  heroImageSrc: string;
  contactPath?: string;
  servicesPath?: string;
  /** Path for this and related service hub pages. Default: `${servicesPath}/${slug}`. */
  servicePageHref?: (serviceSlug: string) => string;
  locationLinkPath?: (serviceSlug: string, locationId: string) => string;
  symptomLinks?: SymptomLink[];
  faqs?: FAQItem[];
  firstCtaMessage?: string;
  firstCtaButtonText?: string;
  firstCtaButtonLink?: string;
  secondCtaHeading?: string;
  secondCtaBody?: string;
  secondCtaButtonText?: string;
  galleryImages?: { src: string; alt?: string }[];
  overviewExtra?: React.ReactNode;
  /** Optional image block shown after Overview (before Types section). */
  overviewImage?: { src: string; alt: string };
  /** Optional override for the symptom/related-links section heading (e.g. "Related guides" for surveys). */
  symptomLinksSectionTitle?: string;
  /** Optional list of problem/issue pages to link to (e.g. "Drain problems we solve"). Rendered as crawlable links. */
  problemLinks?: { path: string; label: string }[];
  /** Optional heading for the problem links section (e.g. "Drain problems we solve"). */
  problemLinksSectionTitle?: string;
  /** Optional internal link count for page tiering (service hubs are tier1 regardless). */
  inlinkCount?: number | null;
}

export function ServiceDetailContent({
  service,
  services,
  locations,
  verticalConfig,
  heroImageSrc,
  contactPath = "/contact",
  servicesPath = "/services",
  servicePageHref: servicePageHrefProp,
  locationLinkPath = (slug, id) => `/${slug}/${id}`,
  symptomLinks = [],
  faqs = [],
  firstCtaMessage,
  firstCtaButtonText,
  firstCtaButtonLink = "/contact",
  secondCtaHeading,
  secondCtaBody,
  secondCtaButtonText,
  galleryImages = [],
  overviewExtra,
  overviewImage,
  symptomLinksSectionTitle,
  problemLinks = [],
  problemLinksSectionTitle,
  inlinkCount,
}: ServiceDetailContentProps) {
  const seoPageType: PageType = "service";
  const pageTier = getPageTier({ inlinks: inlinkCount ?? null, pageType: seoPageType });
  const rootSeoAttrs = pageSeoDataAttrs(pageTier, seoPageType);
  const hrefForService = servicePageHrefProp ?? getServiceUrl;
  const displayTitle = service.titleSingular ?? service.title;
  const serviceTypes = verticalConfig.serviceTypesBySlug?.[service.slug] ?? [];
  const industries = verticalConfig.industries ?? DEFAULT_INDUSTRIES;
  const trustedEquipment = verticalConfig.trustedEquipment ?? [];
  const sectionIntros = verticalConfig.sectionIntros ?? {};
  const heroImageAlt =
    getImageAlt({
      service: displayTitle,
      noLocationSuffix: verticalConfig.imageAltNoLocationSuffix,
    });
  const relatedSidebarLabel = verticalConfig.relatedServicesLabel
    ? `Related ${verticalConfig.relatedServicesLabel} Services`
    : `Related ${verticalConfig.siteName} Services`;
  const ctaCopy = CTA_BY_VERTICAL[verticalConfig.verticalId] ?? {
    discuss: ["Discuss your requirements"],
    request: ["Request a quote"],
    sidebar: ["Request a quote"],
    actionHeading: [`Discuss your ${displayTitle.toLowerCase()} requirements`],
  };
  const overviewDescriptionsExtended = [
    `${displayTitle} is typically needed when site conditions, programme pressure, or repeat issues make a clear technical route essential before work starts. The aim is a durable outcome with fewer surprises during delivery and after handover.`,
    `Teams commission ${displayTitle.toLowerCase()} when they need dependable performance, evidence-led decisions, and a delivery plan that fits real access and sequencing constraints.`,
    `Whether you are planning ahead or responding to an active issue, ${displayTitle.toLowerCase()} helps turn uncertainty into scoped work with predictable timing and clear next steps.`,
    `Before committing to ${displayTitle.toLowerCase()}, teams often need alignment on access, dependencies, and what a complete outcome looks like. This service is structured to make those decisions explicit early.`,
    `The scope of ${displayTitle.toLowerCase()} varies by site, but the objective is consistent: reduce ambiguity, choose a practical method, and deliver a result that holds up under real operating conditions.`,
  ];
  const overviewVariant = getVariantIndex(
    `overview:${verticalConfig.verticalId}:${service.slug}`,
    overviewDescriptionsExtended.length
  );
  const whenUsedVariant = getVariantIndex(
    `when-used:${verticalConfig.verticalId}:${service.slug}`,
    3
  );
  const reassuranceVariant = getVariantIndex(
    `reassurance:${verticalConfig.verticalId}:${service.slug}`,
    3
  );
  const ctaVariant = getVariantIndex(`cta:${verticalConfig.verticalId}:${service.slug}`, 2);
  const faqVariant = getVariantIndex(`${service.slug}:${verticalConfig.verticalId}-faq`, 3);
  const extraVariant = getVariantIndex(`${service.slug}:${verticalConfig.verticalId}-extra`, 3);
  const aboutLinkVariant = getVariantIndex(`about:svc:${service.slug}`, SERVICE_DETAIL_ABOUT_LABELS.length);
  const typicalSituationsSectionIndex = getVariantIndex(
    `svc-typical-intro:${service.slug}`,
    TYPICAL_SITUATIONS_SECTIONS.length
  );
  const processIntroIndex = getVariantIndex(`svc-process-intro:${service.slug}`, SERVICE_PROCESS_SECTION_INTROS.length);
  const layoutVariantIndex = getVariantIndex(`layout:service:${service.slug}`, LAYOUT_VARIANTS.length);
  const layoutVariant = LAYOUT_VARIANTS[layoutVariantIndex];
  const isProcessEarly = layoutVariant === "C";
  const processSteps = service.process.filter(Boolean).slice(0, 5);
  const generatedFaqs = buildFaqItems(service, verticalConfig.verticalId, faqVariant);
  const shouldAppendOneFaq = faqs.length >= 3;
  const mergedFaqs = [...faqs, ...(shouldAppendOneFaq ? generatedFaqs.slice(0, 1) : generatedFaqs.slice(0, 2))].slice(0, 5);
  const serviceFamily = getServiceFamily(service);
  const extraParagraph = buildExtraSectionParagraph(service, serviceFamily)[extraVariant];
  const whenUsedParagraphs = [
    [
      "This service is commonly used when existing conditions create uncertainty around cost, scope, or programme and a clear technical route is needed before committing to work.",
      "It is also commissioned during upgrades, refurbishments, and new-build stages where sequencing, access, and compliance requirements must be addressed early to avoid delays.",
    ],
    [
      "Most clients request this service when recurring issues, changing site requirements, or planned development work make a straightforward fix unlikely without proper assessment.",
      "It is particularly useful where project teams need clear options, documented next steps, and a delivery plan that aligns with other trades and milestones.",
    ],
    [
      "Teams usually bring in this service when the priority is reliable outcomes over short-term patching, especially on sites where conditions can change quickly.",
      "It is frequently part of broader project scopes involving planning, remedial work, or staged improvements where decisions need to be practical and evidence-led.",
    ],
  ][whenUsedVariant];
  const overviewDescriptions = overviewDescriptionsExtended;
  const reassuranceCopy = [
    "Our approach focuses on selecting the right method based on site conditions and project requirements, then documenting each stage so decisions stay clear throughout delivery.",
    "We prioritise method selection around real site constraints and project goals, with clear documentation to keep delivery aligned from start to finish.",
    "Each project is delivered using the most suitable method for site conditions and requirements, supported by clear reporting at every stage.",
  ];
  const discussCta = ctaCopy.discuss[ctaVariant % ctaCopy.discuss.length];
  const quoteCtaSeed = `${verticalConfig.verticalId}-service-hub-${service.slug}`;
  const quoteCtaLabel = getCtaVariant(quoteCtaSeed, verticalConfig.ctaVariants, {
    serviceSlug: service.slug,
  });
  const actionHeading = ctaCopy.actionHeading[ctaVariant % ctaCopy.actionHeading.length];
  const openingLeadCandidates = [
    `In practice, that means balancing programme, cost certainty, and delivery constraints before site works begin, so decisions stay practical through to completion.`,
    `Enquiries usually arrive when stakeholders need a clear route from symptoms or requirements through to implementation, without avoidable rework.`,
    `Operational pressure or tight sequencing often makes a generic fix too risky; structured scope and delivery reduce that exposure.`,
    `From first conversation to handover, the focus stays on what the site needs, what can be delivered safely, and how to avoid repeat issues after the main works finish.`,
    `That usually translates into clearer procurement decisions: fewer assumptions, better-aligned trades, and a documented path if priorities change mid-programme.`,
  ];
  const openingLeadIndex = getVariantIndex(`svc-opening-lead:${service.slug}`, openingLeadCandidates.length);
  const openingLead = openingLeadCandidates[openingLeadIndex];
  const earlyLocationLinks = buildFeaturedServiceLocationLinks({
    service,
    locations,
    seed: `${verticalConfig.verticalId}:${service.slug}:service-early-links`,
    maxLinks: 3,
  });
  const earlyLocationHrefs = new Set(earlyLocationLinks.map((link) => link.href));

  const typicalSituationsSection = TYPICAL_SITUATIONS_SECTIONS[typicalSituationsSectionIndex];
  const processIntroPick = SERVICE_PROCESS_SECTION_INTROS[processIntroIndex];

  const processSection =
    processSteps.length > 0 ? (
      <>
        <SectionIntro
          title={processIntroPick.title}
          description={sectionIntros.process ?? processIntroPick.description}
          headingLevel="h2"
        />
        <ol className="mb-8 space-y-3">
          {processSteps.map((step, idx) => (
            <li key={`${step}-${idx}`} className="rounded-lg border border-border bg-secondary/40 p-4">
              <p className="font-medium">
                Step {idx + 1}: {step}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">What this step delivers: {buildProcessOutcome(step)}</p>
            </li>
          ))}
        </ol>
      </>
    ) : null;

  if (process.env.NODE_ENV !== "production") {
    const estimatedOpeningWords = `${overviewDescriptions[overviewVariant]} ${service.description} ${openingLead}`
      .trim()
      .split(/\s+/).length;
    const estimatedPrimarySections = 7;
    if (estimatedOpeningWords < 45 || estimatedPrimarySections > 7) {
      console.warn("[page-quality-warning]", {
        pageType: "service",
        variant: layoutVariant,
        serviceSlug: service.slug,
        estimatedOpeningWords,
        estimatedPrimarySections,
      });
    }
  }

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: servicesPath },
    { name: service.title, url: hrefForService(service.slug) },
  ];

  return (
    <div className="contents" {...rootSeoAttrs}>
      <SchemaMarkup
        type="Service"
        companyInfo={verticalConfig.companyInfo}
        baseUrl={verticalConfig.baseUrl}
        data={{
          serviceName: service.title,
          serviceDescription: service.description,
          url: hrefForService(service.slug),
          areaServed: "London and surrounding areas",
          serviceType: service.title,
        }}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        companyInfo={verticalConfig.companyInfo}
        baseUrl={verticalConfig.baseUrl}
        data={{ breadcrumbs }}
      />

      <section className="relative bg-primary py-16 md:py-24" data-layout-variant={layoutVariant}>
        <div className="absolute inset-0">
          <img src={heroImageSrc} alt={heroImageAlt} className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <BreadcrumbNav items={breadcrumbs} variant="inverse" />
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">
              {displayTitle}
            </h1>
            <p className="text-lg text-primary-foreground/80">{service.shortDescription}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/30 py-4 md:py-5" aria-label="Trust signals">
        <div className="container">
          <TrustStrip className="mx-auto max-w-4xl" />
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="mb-4 text-muted-foreground">{overviewDescriptions[overviewVariant]}</p>
              <p className="mb-4 text-muted-foreground">{service.description}</p>
              <p className="mb-4 text-muted-foreground">{openingLead}</p>
              {earlyLocationLinks.length > 0 && (
                <p className="mb-8 text-muted-foreground">
                  Explore recent demand for this service in{" "}
                  {earlyLocationLinks.map((link, index) => (
                    <span key={link.href}>
                      {index > 0 && (index === earlyLocationLinks.length - 1 ? " and " : ", ")}
                      <Link href={link.href} className="text-primary hover:underline">
                        {link.label}
                      </Link>
                    </span>
                  ))}
                  .
                </p>
              )}
              <p className="mb-8 text-sm text-muted-foreground">
                <Link href="/about" className="text-primary hover:underline">
                  {SERVICE_DETAIL_ABOUT_LABELS[aboutLinkVariant]}
                </Link>
              </p>
              {overviewExtra && <div className="mb-8">{overviewExtra}</div>}
              {overviewImage && (
                <figure className="mb-8 overflow-hidden rounded-lg border border-border shadow-sm">
                  <img
                    src={overviewImage.src}
                    alt={overviewImage.alt}
                    className="h-auto w-full object-cover"
                  />
                </figure>
              )}
              <SectionIntro
                title={`When you might need ${displayTitle}`}
                description={typicalSituationsSection.description}
                headingLevel="h2"
              />
              <div className="mb-8 space-y-4 text-muted-foreground">
                <p>{whenUsedParagraphs[0]}</p>
                <p>
                  {whenUsedParagraphs[1]} At this stage, teams usually need clear commercial options before committing
                  to delivery windows and budgets.
                </p>
                {(() => {
                  const other = services.find((s) => s.slug !== service.slug);
                  return (
                    other && (
                      <p>
                        If your scope includes adjacent packages, compare{" "}
                        <Link href={hrefForService(other.slug)} className="text-primary hover:underline">
                          related services
                        </Link>{" "}
                        before finalising programme and procurement.
                      </p>
                    )
                  );
                })()}
                {(() => {
                  const si = getVariantIndex(`svc-early-guide:${service.slug}`, 3);
                  if (symptomLinks.length > 0) {
                    const sym = symptomLinks[si % symptomLinks.length]!;
                    return (
                      <p>
                        For a deeper read on related issues, see{" "}
                        <Link href={sym.path} className="text-primary hover:underline">
                          {sym.title}
                        </Link>
                        .
                      </p>
                    );
                  }
                  if (problemLinks.length > 0) {
                    const prob = problemLinks[si % problemLinks.length]!;
                    return (
                      <p>
                        For a deeper read on related issues, see{" "}
                        <Link href={prob.path} className="text-primary hover:underline">
                          {prob.label}
                        </Link>
                        .
                      </p>
                    );
                  }
                  return null;
                })()}
              </div>

              {serviceTypes.length > 0 && (
                <>
                  <SectionIntro
                    title={`Where ${displayTitle} is used`}
                    description={
                      sectionIntros.types ??
                      "These grouped scenarios explain where this work is typically commissioned and why scope can differ by site and objective."
                    }
                    headingLevel="h2"
                  />
                  <ul className="mb-8 list-disc space-y-2 pl-6 text-muted-foreground">
                    {serviceTypes.map((type, i) => (
                      <li key={i}>{type}</li>
                    ))}
                  </ul>
                </>
              )}

              <MidContentCTA
                companyInfo={verticalConfig.companyInfo}
                message={firstCtaMessage}
                buttonText={firstCtaButtonText ?? quoteCtaLabel}
                buttonLink={firstCtaButtonLink}
                buttonCtaSeed={firstCtaButtonText ? `${quoteCtaSeed}:mid-first` : quoteCtaSeed}
                callTrackVertical={verticalConfig.verticalId}
                callTrackServiceSlug={service.slug}
                callTrackLocationSlug={null}
                pageTier={pageTier}
                pageType={seoPageType}
              />

              {symptomLinks.length > 0 && (
                <>
                  <SectionIntro
                    title={symptomLinksSectionTitle ?? `Signs you may need ${service.title}`}
                    description="If you notice these signs, acting early usually keeps costs down and reduces operational disruption."
                    headingLevel="h2"
                  />
                  <ul className="mb-8 space-y-2">
                    {symptomLinks.map((s) => (
                      <li key={s.slug} className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
                        <Link href={s.path} className="text-primary hover:underline">
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {problemLinks.length > 0 && problemLinksSectionTitle && (
                <>
                  <SectionIntro
                    title={problemLinksSectionTitle}
                    description="These related issues often lead to this service being commissioned as part of a complete fix."
                    headingLevel="h2"
                  />
                  <ul className="mb-8 space-y-2">
                    {problemLinks.map((link) => (
                      <li key={link.path}>
                        <Link href={link.path} className="text-primary hover:underline">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {isProcessEarly && processSection}
              <div className="mb-8 rounded-lg border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
                {reassuranceCopy[reassuranceVariant]}
              </div>
              <div className="mb-8">
                <h2 className="mb-3 font-display text-xl font-bold">
                  {SERVICE_EXTRA_HEADINGS[extraVariant]}
                </h2>
                <p className="text-muted-foreground">{extraParagraph}</p>
              </div>
              {!isProcessEarly && processSection}

              <SectionIntro
                title="Industries We Work With"
                description={
                  sectionIntros.industries ??
                  "Our teams adapt this service to the compliance, access, and operational constraints of each environment."
                }
                headingLevel="h2"
              />
              <ul className="mb-8 list-disc space-y-2 pl-6 text-muted-foreground">
                {industries.map((ind, i) => (
                  <li key={i}>{ind}</li>
                ))}
              </ul>

              {trustedEquipment.length > 0 && (
                <>
                  <SectionIntro
                    title="Trusted Systems and Equipment"
                    description="We use proven systems and tools selected for reliability, maintainability, and suitability to each job."
                    headingLevel="h2"
                  />
                  <ul className="mb-8 list-disc space-y-2 pl-6 text-muted-foreground">
                    {trustedEquipment.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {galleryImages.length > 0 && (
                <ServiceImageGallery
                  images={galleryImages}
                  imageAltFallback={() =>
                    getImageAlt({
                      service: displayTitle,
                      noLocationSuffix: verticalConfig.imageAltNoLocationSuffix,
                    })
                  }
                />
              )}

              <SectionIntro
                title="What to expect"
                description={
                  sectionIntros.benefits ??
                  "The outcomes below reflect what clients typically gain when this service is scoped and delivered correctly."
                }
                headingLevel="h2"
              />
              <ul className="mb-8 space-y-2">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {(() => {
                const otherServices = services.filter((s) => s.slug !== service.slug);
                const featuredLocations = pickServiceDetailFeaturedLocations(
                  locations,
                  service.slug,
                  verticalConfig.verticalId
                ).filter((location) => !earlyLocationHrefs.has(locationLinkPath(service.slug, location.id)));
                const showRelatedServices =
                  otherServices.length > 0 && verticalConfig.relatedServicesIntro;
                const showRelatedLocations = featuredLocations.length > 0;
                if (!showRelatedServices && !showRelatedLocations) return null;
                return (
                  <div className="mb-8 space-y-8">
                    {showRelatedServices && (
                      <>
                        <SectionIntro
                          title={relatedSidebarLabel}
                          description={
                            verticalConfig.relatedServicesIntro ??
                            "Explore related services that are commonly scoped together for better overall outcomes."
                          }
                          headingLevel="h2"
                        />
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {otherServices.slice(0, 8).map((s) => (
                            <Link
                              key={s.id}
                              href={hrefForService(s.slug)}
                              className="group rounded-lg border border-border bg-background p-4 transition-all hover:border-primary hover:shadow-md"
                            >
                              <h3 className="mb-1 font-display text-lg font-semibold group-hover:text-primary">
                                {s.title}
                              </h3>
                              {s.shortDescription && (
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {s.shortDescription}
                                </p>
                              )}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                    {showRelatedLocations && (
                      <div
                        className={
                          showRelatedServices ? "mt-14 space-y-8" : "space-y-8"
                        }
                      >
                        <SectionIntro
                          title={`${service.title} areas we cover`}
                          description={
                            verticalConfig.relatedLocationsIntro ??
                            "Browse local coverage to find the nearest team for this service."
                          }
                          headingLevel="h2"
                        />
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          {featuredLocations.map((loc) => (
                            <Link
                              key={loc.id}
                              href={locationLinkPath(service.slug, loc.id)}
                              className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-primary transition-all hover:border-primary hover:shadow-md hover:underline"
                            >
                              {service.title} {loc.name}
                              <ArrowRight className="h-4 w-4 shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              <InspectionCTA
                companyInfo={verticalConfig.companyInfo}
                contactPath={contactPath}
                heading={secondCtaHeading}
                body={secondCtaBody}
                ctaText={secondCtaButtonText ?? quoteCtaLabel}
                ctaSeed={secondCtaButtonText ? `${quoteCtaSeed}:inspection` : quoteCtaSeed}
                callTrackVertical={verticalConfig.verticalId}
                callTrackServiceSlug={service.slug}
                callTrackLocationSlug={null}
                pageTier={pageTier}
                pageType={seoPageType}
              />
              <ActionPanel
                companyInfo={verticalConfig.companyInfo}
                contactPath={contactPath}
                heading={actionHeading}
                body="Share your site details and goals. We will recommend the right scope and provide a clear quote."
                ctaText={discussCta.replace("quote", "site visit")}
                ctaSeed={`${quoteCtaSeed}:action-discuss`}
                callTrackVertical={verticalConfig.verticalId}
                callTrackServiceSlug={service.slug}
                callTrackLocationSlug={null}
                pageTier={pageTier}
                pageType={seoPageType}
              />
            </div>

            <div className="space-y-6">
              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">{relatedSidebarLabel}</h3>
                <ul className="space-y-2">
                  {services
                    .filter((s) => s.slug !== service.slug)
                    .slice(0, 6)
                    .map((s) => (
                      <li key={s.id}>
                        <Link
                          href={hrefForService(s.slug)}
                          className="text-sm text-primary hover:underline"
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Areas We Cover</h3>
                <p className="mb-3 text-xs text-muted-foreground">
                  Key towns and cities — see service areas for full coverage.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {pickServiceDetailSidebarLocations(locations).map((loc) => (
                    <Link
                      key={loc.id}
                      href={locationLinkPath(service.slug, loc.id)}
                      className="text-sm text-primary hover:underline"
                    >
                      {loc.name} <ArrowRight className="inline h-3 w-3" />
                    </Link>
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  <Link href="/service-areas" className="text-primary hover:underline">
                    All service areas →
                  </Link>
                </p>
              </div>
              <QuoteFormPrimaryCta
                contactPath={contactPath}
                className="w-full"
                variant="highlight"
                size="default"
                ctaText={quoteCtaLabel}
                ctaSeed={quoteCtaSeed}
              >
                {quoteCtaLabel}
              </QuoteFormPrimaryCta>
            </div>
          </div>
        </div>
      </section>

      {mergedFaqs.length > 0 && (
        <FAQSchema items={mergedFaqs} title="Frequently Asked Questions" />
      )}

      <CTABanner
        companyInfo={verticalConfig.companyInfo}
        contactPath={contactPath}
        heading={secondCtaHeading}
        body={secondCtaBody}
        ctaText={secondCtaButtonText ?? quoteCtaLabel}
        ctaSeed={secondCtaButtonText ? `${quoteCtaSeed}:banner` : quoteCtaSeed}
        pageTier={pageTier}
        pageType={seoPageType}
      />
    </div>
  );
}
