import { TopicLocationPage as EngineTopicLocationPage } from "engine/components";
import type { TopicLocationTopic } from "@/lib/topicLocationConfig";
import type { Location } from "engine";
import { TOPIC_PAGE_SERVICES } from "@/lib/topicLocationConfig";
import { verticalConfig } from "@/config";

type Props = {
  topic: TopicLocationTopic;
  location: Location;
  topicSlug: string;
  locationSlug: string;
};

export function TopicLocationPage({
  topic,
  location, // kept for route compatibility
  topicSlug,
  locationSlug,
}: Props) {
  const primaryServiceLocationPath = `/${topic.primaryServiceSlug}/${locationSlug}`;
  const processStepsDetailed = [
    {
      title: "Site review and scope definition",
      outcome: `Ground conditions, access limits, and project priorities are confirmed for ${location.name}.`,
    },
    {
      title: "Method and programme planning",
      outcome: "Delivery sequence, plant requirements, and dependencies are agreed before mobilisation.",
    },
    {
      title: "Groundworks delivery",
      outcome: "Core excavation, preparation, and supporting work are completed to the agreed scope.",
    },
    {
      title: "Quality checks and handover",
      outcome: "Completed work is verified so downstream construction can proceed with confidence.",
    },
  ];

  return (
    <EngineTopicLocationPage
      topicTitle={topic.title}
      topicSlug={topicSlug}
      location={location}
      locationSlug={locationSlug}
      topicHubPath="/guides"
      contextualOpening={`${topic.intro} In ${location.name} and ${location.area}, this is most relevant when projects need a clear technical route before construction sequencing is finalised.`}
      whenNeeded={`This is typically required during early planning, redevelopment, or remedial phases where site constraints and design decisions directly affect delivery risk, programme certainty, and commercial outcomes.`}
      workInvolves={topic.howSolved}
      commonScenarios={topic.commonProblems}
      costComplexity={`Cost and complexity are influenced by access logistics, work scale, ground conditions, disposal requirements, and project coordination factors such as temporary works, approvals, and programme interfaces in ${location.name}.`}
      typicalUseCases={topic.typicalScenarios}
      processStepsDetailed={processStepsDetailed}
      bodyContextLine={`We deliver ${topic.title.toLowerCase()} and related groundworks across ${location.name} and ${location.area}, with project scope aligned to downstream packages and handover requirements.`}
      servicesHeading="Groundworks services"
      servicesIntro={`We offer the following groundworks services in ${location.name} and ${location.area}. Each links to the service page for your area.`}
      serviceLinks={TOPIC_PAGE_SERVICES.map((service) => ({ slug: service.slug, title: service.title }))}
      primaryCtaText={topic.ctaText}
      primaryCtaHref={primaryServiceLocationPath}
      secondaryCtaText="Contact us for a quote"
      secondaryCtaHref="/contact"
      contactQuoteText={`contact ${verticalConfig.companyInfo.name} for a quote`}
      companyName={verticalConfig.companyInfo.name}
    />
  );
}
