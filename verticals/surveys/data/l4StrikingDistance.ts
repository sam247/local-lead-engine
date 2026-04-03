import {
  buildServiceLocationAnchor,
  getNeighbourLocationIds,
  locations,
  type LocationPageSupplementalSection,
} from "engine";

interface L4StrikingDistanceTarget {
  serviceSlug: string;
  locationSlug: string;
  serviceTitle: string;
  locationName: string;
  metaTitleOverride: string;
  introOverride: string;
  supplementalSections: LocationPageSupplementalSection[];
}

const TARGETS: Record<string, L4StrikingDistanceTarget> = {
  "utility-survey/barnet": {
    serviceSlug: "utility-survey",
    locationSlug: "barnet",
    serviceTitle: "Utility Survey",
    locationName: "Barnet",
    metaTitleOverride: "Utility Survey Barnet - Safer Dig Planning & Clear Site Data",
    introOverride:
      "A utility survey in Barnet is usually needed before excavation, drainage work, or design sign-off where buried services could affect safety, programme, or buildability. We help teams understand what is below ground, what level of confidence is needed, and how that scope affects survey cost and turnaround.",
    supplementalSections: [
      {
        heading: "How utility survey work is scoped",
        paragraphs: [
          "Most Barnet utility survey instructions begin with a review of available records, the proposed works area, and how the findings will be used by designers or contractors. That scoping stage matters because it decides whether the job needs a straightforward PAS 128-style locate, a coordinated topo overlay, or additional verification where risk is higher.",
          "On site, the survey normally combines electromagnetic locating, GPR coverage, and clear marking or drawings so teams can plan excavations with more confidence. The best outcome is not just data collection but usable information that helps avoid service strikes and last-minute redesign.",
        ],
        bullets: [
          "Match survey scope to excavation and design risk",
          "Combine records review with on-site detection methods",
          "Produce outputs that contractors can actually build from",
        ],
      },
      {
        heading: "What affects price and delivery time",
        paragraphs: [
          "Cost is influenced by survey area, congestion of existing services, access constraints, and whether the outputs need to tie into a wider topographical or measured survey package. Busy urban sites generally take longer to interpret and coordinate than open sites with simple access.",
          "If the survey is needed urgently before works start, the programme may also include faster mobilisation, traffic management considerations, or extra deliverables so the design team can issue information without delay.",
        ],
      },
    ],
  },
  "measured-building-survey/barnet": {
    serviceSlug: "measured-building-survey",
    locationSlug: "barnet",
    serviceTitle: "Measured Building Survey",
    locationName: "Barnet",
    metaTitleOverride: "Measured Building Survey Barnet - Accurate Plans & Planning-Ready Drawings",
    introOverride:
      "A measured building survey in Barnet gives architects, owners, and project managers reliable existing plans before design work moves forward. It is most useful when alterations, fit-outs, or refurbishment decisions depend on accurate dimensions rather than outdated drawings or site assumptions.",
    supplementalSections: [
      {
        heading: "What a good measured survey should deliver",
        paragraphs: [
          "The survey process usually starts with confirming which floor plans, elevations, roof information, or sections are required for the project. That definition is important because a planning submission, landlord pack, and construction drawing package do not all need the same level of detail.",
          "Once the required outputs are agreed, the building is captured methodically so the drawings reflect current site conditions, not legacy plans. For Barnet refurbishment projects, that clarity is often what lets consultants coordinate confidently and reduce redesign later.",
        ],
      },
      {
        heading: "What changes scope and budget",
        paragraphs: [
          "Scope is usually affected by building size, access to all rooms or roof areas, and whether extra detail is needed around facades, plant spaces, or irregular geometry. Older or altered buildings can take longer because the survey must capture variations accurately rather than average them out.",
          "Timescale also depends on the final deliverables. Simple floor plans can move faster than a broader package with elevations, sections, and coordinated CAD output for a full design team.",
        ],
        bullets: [
          "Define the drawing package before fieldwork starts",
          "Allow for access and complexity in older buildings",
          "Use the survey to reduce redesign and coordination risk",
        ],
      },
    ],
  },
  "drone-building-inspection/wandsworth": {
    serviceSlug: "drone-building-inspection",
    locationSlug: "wandsworth",
    serviceTitle: "Drone Building Inspection",
    locationName: "Wandsworth",
    metaTitleOverride: "Drone Building Inspection Wandsworth - Safe Access & Fast Reporting",
    introOverride:
      "A drone building inspection in Wandsworth helps you review roofs, facades, and high-level defects without scaffolding or disruptive access equipment where that is not yet justified. It is often the fastest way to confirm condition, prioritise repairs, and decide whether a more intrusive inspection is actually needed.",
    supplementalSections: [
      {
        heading: "When drone inspection is the practical option",
        paragraphs: [
          "This approach is especially useful when an early condition review is needed for maintenance planning, budget approval, or contractor tendering. On occupied sites, it can provide fast visual evidence while keeping disruption much lower than immediate scaffold access.",
          "A structured inspection should capture the right elevations and details, explain what can be confirmed visually, and make it clear where closer follow-up access may still be required. That is what turns imagery into a useful maintenance decision rather than just aerial footage.",
        ],
      },
      {
        heading: "What affects cost and reporting scope",
        paragraphs: [
          "Price is generally driven by building size, airspace or site restrictions, weather sensitivity, and how detailed the final reporting needs to be. A simple condition review for a single block is different from a larger estate, school, or commercial property with multiple elevations and roof zones.",
          "If the inspection feeds directly into repair budgeting, insurers, or consultant advice, the reporting scope often needs clearer defect tagging and issue summaries. Agreeing that output in advance helps keep the survey focused and useful.",
        ],
        bullets: [
          "Use drone access to confirm condition before major spend",
          "Decide early whether imagery alone is enough",
          "Match the report level to maintenance or tender decisions",
        ],
      },
    ],
  },
};

function getTargetEntries() {
  return Object.values(TARGETS);
}

export function getL4StrikingDistanceTarget(serviceSlug: string, locationSlug: string) {
  return TARGETS[`${serviceSlug}/${locationSlug}`];
}

export function getL4GuideTargetLinksForServices(serviceSlugs: string[]) {
  const seen = new Set<string>();
  return getTargetEntries().reduce<Array<{ href: string; linkText: string }>>((links, target) => {
    if (!serviceSlugs.includes(target.serviceSlug)) return links;
    const href = `/${target.serviceSlug}/${target.locationSlug}`;
    if (seen.has(href)) return links;
    seen.add(href);
    links.push({
      href,
      linkText: buildServiceLocationAnchor(target.serviceTitle, target.locationName),
    });
    return links;
  }, []);
}

export function getL4PriorityLocalLinks(
  currentServiceSlug: string,
  currentLocationSlug: string,
  priorityByService: Record<string, string[]>
) {
  const allLocationIds = locations.map((location) => location.id);
  const links: Array<{ href: string; label: string }> = [];
  const seen = new Set<string>();

  for (const target of getTargetEntries()) {
    const href = `/${target.serviceSlug}/${target.locationSlug}`;
    const label = buildServiceLocationAnchor(target.serviceTitle, target.locationName);
    const relatedServiceDonors = (priorityByService[target.serviceSlug] ?? []).slice(0, 2);
    const nearbyDonors = getNeighbourLocationIds(target.locationSlug, allLocationIds).slice(0, 2);
    const isSameLocationDonor =
      currentLocationSlug === target.locationSlug && relatedServiceDonors.includes(currentServiceSlug);
    const isNearbyDonor =
      currentServiceSlug === target.serviceSlug && nearbyDonors.includes(currentLocationSlug);

    if ((isSameLocationDonor || isNearbyDonor) && !seen.has(href) && href !== `/${currentServiceSlug}/${currentLocationSlug}`) {
      seen.add(href);
      links.push({ href, label });
    }
  }

  return links;
}
