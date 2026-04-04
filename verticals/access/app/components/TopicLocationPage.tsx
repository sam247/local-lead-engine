import { TopicLocationPage as EngineTopicLocationPage } from "engine/components";
import type { ProgrammaticTopic } from "@/data/programmaticTopicTypes";
import type { Location } from "engine";
import { TOPIC_HUB_PATH, TOPIC_PAGE_SERVICES } from "@/lib/topicLocationConfig";
import { verticalConfig } from "@/config";

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
