import { TopicLocationPage as EngineTopicLocationPage } from "engine/components";
import type { TopicLocationTopic } from "@/lib/topicLocationConfig";
import type { Location } from "engine";
import { TOPIC_PAGE_SERVICES, getTopicHubPathForRouteSlug } from "@/lib/topicLocationConfig";
import { verticalConfig } from "@/config";
import { getHeroImage } from "@/lib/images";

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
  const heroServiceSlugByTopic: Record<string, string> = {
    "retaining-wall-construction": "foundation-contractors",
    "soakaway-installation": "excavation-contractors",
    "surface-water-drainage": "groundworks-contractors",
    "foundation-underpinning": "foundation-contractors",
    "foundation-settlement": "foundation-contractors",
    "piling-foundations": "piling-contractors",
    "bulk-excavation-services": "excavation-contractors",
    "site-clearance-muck-away": "site-clearance-contractors",
  };
  const heroImageSrc = getHeroImage({
    serviceSlug: heroServiceSlugByTopic[topicSlug] || topic.primaryServiceSlug || "groundworks-contractors",
  });
  const relatedClusterByTopic: Record<string, string[]> = {
    "foundation-underpinning": [
      "foundation-contractors",
      "mini-piling-contractors",
      "piling-contractors",
      "foundation-repair",
    ],
    "piling-foundations": [
      "piling-contractors",
      "mini-piling-contractors",
      "cfa-piling",
      "foundation-contractors",
    ],
    "bulk-excavation-services": [
      "earthworks",
      "commercial-groundworks",
      "excavation-contractors",
      "groundworks-contractors",
      "foundation-contractors",
      "enabling-works-contractors",
    ],
    "groundworks-for-developments": [
      "commercial-groundworks",
      "roads-and-sewers",
      "groundworks-contractors",
      "enabling-works-contractors",
      "foundation-contractors",
      "excavation-contractors",
    ],
    "groundworks-and-enabling-works": [
      "commercial-groundworks",
      "enabling-works-contractors",
      "roads-and-sewers",
      "groundworks-contractors",
      "site-preparation-services",
      "excavation-contractors",
    ],
    "retaining-wall-construction": [
      "groundworks-contractors",
      "excavation-contractors",
      "foundation-contractors",
      "concrete-foundations",
    ],
    "soakaway-installation": [
      "attenuation-systems",
      "groundworks-contractors",
      "roads-and-sewers",
      "excavation-contractors",
      "site-clearance-contractors",
      "foundation-contractors",
    ],
  };
  const relatedServiceSlugs = relatedClusterByTopic[topicSlug] || [
    topic.primaryServiceSlug,
    "groundworks-contractors",
    "foundation-contractors",
    "excavation-contractors",
  ];
  const relatedServiceLinks = relatedServiceSlugs
    .map((slug) => TOPIC_PAGE_SERVICES.find((service) => service.slug === slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service))
    .map((service) => ({ slug: service.slug, title: service.title }));
  const faqByTopic: Record<string, Array<{ question: string; answer: string }>> = {
    "foundation-underpinning": [
      {
        question: `Can you quote foundation underpinning packages for structural movement in ${location.name}?`,
        answer: `Yes. We quote underpinning as a scoped structural package in ${location.name}, including sequencing, temporary support assumptions, and integration with related excavation or piling where needed.`,
      },
      {
        question: `Is underpinning in ${location.name} suitable for extension and basement projects?`,
        answer: `It can be. Where extension or basement works affect existing support, underpinning may be specified to maintain structural stability and programme certainty.`,
      },
      {
        question: `Do you deliver underpinning for commercial properties in ${location.name}?`,
        answer: `Yes. We support both residential and commercial underpinning works where structural design calls for deeper or strengthened foundations.`,
      },
    ],
    "piling-foundations": [
      {
        question: `Do you provide piling foundation packages for constrained sites in ${location.name}?`,
        answer: `Yes. We deliver piling foundation packages in ${location.name} for restricted-access, basement-adjacent, and structurally complex sites where shallow foundations are unsuitable.`,
      },
      {
        question: `Can piling in ${location.name} be combined with excavation and enabling works?`,
        answer: `Yes. For commercial and development projects, we coordinate piling with excavation, temporary works assumptions, and enabling scopes to protect programme outcomes.`,
      },
      {
        question: `How do you choose between mini piling and other piling types in ${location.name}?`,
        answer: `The structural design, load requirements, and site constraints determine the method. We align delivery with the engineer's specification and site logistics.`,
      },
    ],
    "bulk-excavation-services": [
      {
        question: `Do you handle basement excavation packages in ${location.name}?`,
        answer: `Yes. We deliver bulk and basement excavation in ${location.name} with spoil strategy, sequence planning, and formation handover aligned to structural follow-on works.`,
      },
      {
        question: `Can bulk excavation be procured as part of a full commercial groundworks package?`,
        answer: `Yes. We regularly bundle bulk excavation with enabling works, foundations, and drainage for commercial and development programmes.`,
      },
      {
        question: `What typically affects excavation programme risk in ${location.name}?`,
        answer: `Access, disposal logistics, temporary support constraints, and downstream structural interfaces are the main programme variables.`,
      },
    ],
    "groundworks-for-developments": [
      {
        question: `Do you deliver phased commercial groundworks packages in ${location.name}?`,
        answer: `Yes. We deliver phased development groundworks in ${location.name}, covering enabling, excavation, foundations, and drainage with coordinated handover points.`,
      },
      {
        question: `Can you support extension and remodelling-led development sites in ${location.name}?`,
        answer: `Yes. We support extension-led and mixed-use remodelling schemes where structural package sequencing and ground risk control are key.`,
      },
      {
        question: `How do you manage programme certainty for multi-plot works in ${location.name}?`,
        answer: `We use phased delivery planning, interface control, and clear documentation so each plot or phase can progress without avoidable groundworks bottlenecks.`,
      },
    ],
    "groundworks-and-enabling-works": [
      {
        question: `Can enabling works in ${location.name} be integrated with structural groundworks delivery?`,
        answer: `Yes. We run enabling and structural groundworks as a coordinated package where project teams need one delivery path from early works through foundations and excavation.`,
      },
      {
        question: `Do you provide commercial enabling works for programme-critical starts in ${location.name}?`,
        answer: `Yes. We support commercial programme starts with access, temporary drainage, site setup, and early structural groundwork sequencing.`,
      },
      {
        question: `Can you quote a single package for enabling, excavation, and foundations in ${location.name}?`,
        answer: `Yes. We provide single-package scopes for aligned commercial projects to simplify procurement and improve handover certainty.`,
      },
    ],
    "retaining-wall-construction": [
      {
        question: `Do I need building control approval for retaining walls in ${location.name}?`,
        answer: `Approval requirements depend on wall height, loading, and local constraints. We coordinate delivery to design so approval and certification requirements are clear before construction starts in ${location.name}.`,
      },
      {
        question: `What affects retaining wall construction costs in ${location.name}?`,
        answer: `Ground conditions, excavation depth, reinforcement requirements, drainage detail, and access logistics are the main cost drivers across ${location.area}.`,
      },
      {
        question: `Do retaining walls in ${location.name} need drainage behind the wall?`,
        answer: `In most cases yes. Drainage design behind the wall helps manage hydrostatic pressure and supports long-term wall performance.`,
      },
      {
        question: `Can you construct retaining walls for driveways and level changes in ${location.name}?`,
        answer: `Yes. We deliver retaining wall groundworks for domestic and commercial level changes, access routes, and boundary constraints in ${location.name}.`,
      },
      {
        question: `How long does retaining wall construction usually take in ${location.name}?`,
        answer: `Programme varies by scope and sequencing, but we set out a clear method and timeline before mobilisation so downstream works can proceed predictably.`,
      },
    ],
    "soakaway-installation": [
      {
        question: `When is a soakaway required for projects in ${location.name}?`,
        answer: `A soakaway is typically used where surface water cannot be discharged to a suitable drain connection or where the design calls for infiltration-based disposal.`,
      },
      {
        question: `Do we need a percolation test before soakaway installation in ${location.name}?`,
        answer: `Often yes. Percolation testing helps confirm infiltration suitability and supports final sizing and compliance decisions for the proposed soakaway.`,
      },
      {
        question: `What drives soakaway installation costs in ${location.name}?`,
        answer: `Excavation depth, soil conditions, crate/rubble design, access, spoil handling, and connection complexity generally drive cost in ${location.area}.`,
      },
      {
        question: `Can soakaway systems be used for driveways and roof drainage in ${location.name}?`,
        answer: `Yes, soakaways are commonly used for driveway and roof runoff where ground conditions and design criteria are suitable.`,
      },
      {
        question: `Do you provide commissioning and building-control documentation in ${location.name}?`,
        answer: `Yes. We provide handover documentation relevant to the agreed scope so compliance and downstream coordination remain clear.`,
      },
    ],
  };
  const faqItems =
    faqByTopic[topicSlug] || [
      {
        question: `What is the best way to plan ${topic.title.toLowerCase()} in ${location.name}?`,
        answer: `Start by defining scope, constraints, and programme interfaces, then align method planning before mobilisation so delivery risk is reduced.`,
      },
      {
        question: `What usually affects costs for ${topic.title.toLowerCase()} in ${location.name}?`,
        answer: `Access, ground conditions, temporary works, and sequencing with other packages are the most common cost and programme variables.`,
      },
      {
        question: `Can you coordinate documentation and handover in ${location.name}?`,
        answer: `Yes. We keep project decisions and handover outputs structured so teams can move into the next phase with confidence.`,
      },
    ];
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
  const topicHubPath = getTopicHubPathForRouteSlug(topicSlug);

  return (
    <EngineTopicLocationPage
      topicTitle={topic.title}
      topicSlug={topicSlug}
      location={location}
      locationSlug={locationSlug}
      heroImageSrc={heroImageSrc}
      heroImageAlt={`${topic.title} in ${location.name}`}
      topicHubPath={topicHubPath}
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
      relatedServiceLinks={relatedServiceLinks}
      localProofHeading={`Projects across ${location.area} and surrounding areas`}
      localProofBody={`We deliver ${topic.title.toLowerCase()} scopes across ${location.name} and neighbouring areas where teams need a clear programme route before downstream construction phases.`}
      faqItems={faqItems}
      primaryCtaText={topic.ctaText}
      primaryCtaHref={primaryServiceLocationPath}
      secondaryCtaText="Contact us for a quote"
      secondaryCtaHref="/contact"
      contactPath="/contact"
      ctaVariants={verticalConfig.ctaVariants}
      quoteCtaBiasServiceSlug={topic.primaryServiceSlug}
    />
  );
}
