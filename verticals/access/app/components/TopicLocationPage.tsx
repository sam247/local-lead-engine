import { TopicLocationPage as EngineTopicLocationPage } from "engine/components";
import type { ProgrammaticTopic } from "@/data/programmaticTopicTypes";
import type { Location } from "engine";
import { TOPIC_HUB_PATH, TOPIC_PAGE_SERVICES } from "@/lib/topicLocationConfig";
import { verticalConfig } from "@/config";
import { getHeroImage } from "@/lib/images";

type Props = {
  topic: ProgrammaticTopic;
  location: Location;
  topicSlug: string;
  locationSlug: string;
  topicHubPath: string;
};

export function TopicLocationPage({
  topic,
  location, // kept for route compatibility
  topicSlug,
  locationSlug,
  topicHubPath,
}: Props) {
  const primaryServiceSlug = topic.relatedServiceSlugs[0];
  const primaryServiceLocationPath = primaryServiceSlug ? `/${primaryServiceSlug}/${locationSlug}` : null;
  const resolvedHubPath = topicHubPath || TOPIC_HUB_PATH[topic.slug] || "/cctv-guides";
  const heroImageSrc = getHeroImage({
    serviceSlug: primaryServiceSlug || "access-control-systems",
  });
  const semanticRelatedSlugs = [
    ...topic.relatedServiceSlugs,
    "commercial-cctv-installation",
    "access-control-systems",
    "perimeter-security-systems",
    "ip-camera-systems",
  ];
  const relatedServiceLinks = Array.from(new Set(semanticRelatedSlugs))
    .map((slug) => TOPIC_PAGE_SERVICES.find((service) => service.slug === slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service))
    .slice(0, 5)
    .map((service) => ({ slug: service.slug, title: service.title }));
  const faqItems = (() => {
    if (topic.slug.includes("cabling") || topic.slug.includes("structured") || topic.slug.includes("data-cabling")) {
      return [
        {
          question: `What cabling standard is best for projects in ${location.name}?`,
          answer: `Most projects in ${location.name} use Cat6 or higher, based on bandwidth targets, route constraints, and future capacity plans.`,
        },
        {
          question: `Do you test and certify structured cabling in ${location.name}?`,
          answer: `Yes. We deliver installation with testing and handover outputs so networks can be commissioned with fewer issues.`,
        },
        {
          question: `Can installation be phased to reduce disruption in ${location.name}?`,
          answer: `Yes. We can sequence works around operations, out-of-hours access windows, and dependency planning.`,
        },
      ];
    }
    if (topic.slug.includes("access-control") || topic.slug.includes("gate-access")) {
      return [
        {
          question: `Can access control in ${location.name} integrate with existing systems?`,
          answer: `Yes. We scope integration with existing credentials, door hardware, and security workflows before installation begins.`,
        },
        {
          question: `How do you set fail-safe and fail-secure rules in ${location.name}?`,
          answer: `We align fail-state strategy to building use, fire/life safety requirements, and operational needs for the site.`,
        },
        {
          question: `Do you provide audit trail and user policy support in ${location.name}?`,
          answer: `Yes. We support practical user grouping, permissions design, and handover guidance for day-to-day control.`,
        },
      ];
    }
    return [
      {
        question: `What affects CCTV and security scope in ${location.name}?`,
        answer: `Coverage goals, integration requirements, access windows, and operational constraints are the primary drivers in ${location.name}.`,
      },
      {
        question: `Can systems be installed with minimal operational downtime in ${location.name}?`,
        answer: `Yes. We plan installation sequencing and cutover windows to keep disruption low and programme certainty high.`,
      },
      {
        question: `Do you provide testing and handover support in ${location.name}?`,
        answer: `Yes. We validate core workflows and provide structured handover so teams can adopt the system confidently.`,
      },
    ];
  })();
  const processStepsDetailed = [
    {
      title: "Site and requirements review",
      outcome: `Security objectives, constraints, and delivery priorities are defined for ${location.name}.`,
    },
    {
      title: "Scope and system planning",
      outcome: "System architecture, installation approach, and integration requirements are agreed.",
    },
    {
      title: "Installation and configuration",
      outcome: "Core infrastructure and devices are installed to match site operations.",
    },
    {
      title: "Testing and handover",
      outcome: "Coverage, access rules, and user workflows are validated before sign-off.",
    },
  ];

  return (
    <EngineTopicLocationPage
      topicTitle={topic.title}
      topicSlug={topicSlug}
      location={location}
      locationSlug={locationSlug}
      heroImageSrc={heroImageSrc}
      heroImageAlt={`${topic.title} in ${location.name}`}
      topicHubPath={resolvedHubPath}
      contextualOpening={`${topic.intro} In ${location.name} and ${location.area}, this is usually considered where operations, risk, and compliance need to be aligned before installation decisions are locked in.`}
      whenNeeded={`This is typically needed when businesses are comparing options for site coverage, access control, and integration, especially during refurbishments, relocations, or operational upgrades where delayed decisions can increase risk.`}
      workInvolves={topic.explanation}
      commonScenarios={topic.commonProblems}
      costComplexity={`Cost and complexity are mainly influenced by site access, scale of coverage, integration with existing systems, and operational constraints such as installation windows and business continuity requirements in ${location.name}.`}
      typicalUseCases={topic.sectorUseCases}
      processStepsDetailed={processStepsDetailed}
      bodyContextLine={`We deliver ${topic.title.toLowerCase()} work across ${location.name} and ${location.area}, and this often sits alongside broader service scopes such as ${TOPIC_PAGE_SERVICES[0]?.title.toLowerCase() || "security upgrades"} and access control deployment.`}
      servicesHeading="Security services"
      servicesIntro={`We offer the following security and access services in ${location.name} and ${location.area}. Each links to the service page for your area.`}
      serviceLinks={TOPIC_PAGE_SERVICES.map((service) => ({ slug: service.slug, title: service.title }))}
      relatedServiceLinks={relatedServiceLinks}
      localProofHeading={`Projects across ${location.area} and surrounding areas`}
      localProofBody={`We support businesses across ${location.name} and nearby areas with scoped security delivery plans that align installation sequencing, operations, and handover requirements.`}
      faqItems={faqItems}
      primaryCtaText={topic.ctaText}
      primaryCtaHref={primaryServiceLocationPath ?? "/contact"}
      secondaryCtaText={`View topic guide: ${topic.title}`}
      secondaryCtaHref={resolvedHubPath}
      contactPath="/contact"
      ctaVariants={verticalConfig.ctaVariants}
      quoteCtaBiasServiceSlug={primaryServiceSlug ?? null}
    />
  );
}
