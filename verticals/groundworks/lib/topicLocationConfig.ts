/**
 * Topic × location pages for Groundworks.
 * Route slugs must not overlap with service slugs (groundworks-contractors, piling-contractors, etc.).
 */

import { services } from "@/lib/data";
import type { Location } from "engine";

export type TopicLocationTopic = {
  title: string;
  intro: string;
  commonProblems: string[];
  howSolved: string;
  typicalScenarios: string[];
  primaryServiceSlug: string;
  ctaText: string;
};

/** Route slugs used for topic×location URLs. Must not overlap with service slugs. */
export const TOPIC_LOCATION_SLUGS = [
  "foundation-settlement",
  "foundation-underpinning",
  "piling-foundations",
  "ground-investigation",
  "soil-testing-services",
  "site-clearance-muck-away",
  "bulk-excavation-services",
  "retaining-wall-construction",
  "soakaway-installation",
  "surface-water-drainage",
  "foundation-cost-per-metre",
  "groundworks-cost-new-build",
  "driveway-groundworks",
  "car-park-groundworks",
  "concrete-hardstanding",
  "site-preparation-contractors",
  "groundworks-for-extensions",
  "groundworks-for-new-builds",
  "groundworks-for-developments",
  "groundworks-and-enabling-works",
] as const;

const TOPIC_DATA: Record<(typeof TOPIC_LOCATION_SLUGS)[number], TopicLocationTopic> = {
  "foundation-settlement": {
    title: "Foundation settlement",
    intro: "Foundation settlement can cause cracking, sticking doors and uneven floors. Identifying the cause and the right fix requires ground investigation and often structural input.",
    commonProblems: [
      "Clay shrinkage in dry weather",
      "Drainage washout under foundations",
      "Tree roots removing moisture",
      "Variable or made ground",
      "Mining or previous excavation",
    ],
    howSolved:
      "We work from the structural engineer's specification to stabilise foundations — underpinning, piling or repairing the cause (e.g. drains). Ground investigation and monitoring define the solution.",
    typicalScenarios: [
      "Subsidence repair and underpinning",
      "Piling to bypass poor strata",
      "Drainage repair and foundation support",
      "Monitoring before and after works",
    ],
    primaryServiceSlug: "foundation-contractors",
    ctaText: "Get a quote for foundation repair",
  },
  "foundation-underpinning": {
    title: "Foundation underpinning",
    intro: "Underpinning extends or deepens existing foundations to stabilise a building. It is used for subsidence repair, extensions and where existing foundations are inadequate.",
    commonProblems: [
      "Subsidence or movement",
      "Shallow foundations in reactive clay",
      "Extension needing deeper foundations",
      "Change of use increasing load",
      "Drainage or tree-related movement",
    ],
    howSolved:
      "We deliver mass concrete underpinning or mini piling underpinning to the structural engineer's design. We work in bays, maintain support and provide certification.",
    typicalScenarios: [
      "Domestic subsidence repair",
      "Extension tie-in with underpinning",
      "Commercial building stabilisation",
      "Party wall and neighbour coordination",
    ],
    primaryServiceSlug: "foundation-contractors",
    ctaText: "Get an underpinning quote",
  },
  "piling-foundations": {
    title: "Piling foundations",
    intro: "Piling is used when the ground cannot support shallow foundations. Driven, bored and mini piling suit different ground conditions, loads and access constraints.",
    commonProblems: [
      "Made ground or fill",
      "Soft or compressible soils",
      "High water table",
      "Variable ground across the site",
      "Contaminated or mining-affected land",
    ],
    howSolved:
      "We install the piling type specified by your structural engineer — driven, bored, mini or sheet piling. We deliver to design with load testing and certification.",
    typicalScenarios: [
      "New build on poor ground",
      "Extension on piling",
      "Basement and restricted access",
      "Retaining and slope stability",
    ],
    primaryServiceSlug: "piling-contractors",
    ctaText: "Get a piling quote",
  },
  "ground-investigation": {
    title: "Ground investigation",
    intro: "Ground investigation identifies strata, water table and contamination so foundations can be designed correctly. Trial pits and boreholes inform the structural engineer's choice of foundation type.",
    commonProblems: [
      "Unknown ground conditions",
      "Brownfield or former industrial site",
      "Variable strata across the plot",
      "High water table or drainage concerns",
      "Warranty or lender requiring a report",
    ],
    howSolved:
      "We use the ground investigation report to deliver the foundation type specified — strip, raft or piling. We do not carry out the investigation; we build from the design it informs.",
    typicalScenarios: [
      "New build foundation design",
      "Extension on unknown existing ground",
      "Piling or raft specification",
      "Remediation and contamination",
    ],
    primaryServiceSlug: "groundworks-contractors",
    ctaText: "Get a groundworks quote",
  },
  "soil-testing-services": {
    title: "Soil testing services",
    intro: "Soil testing forms part of ground investigation. Lab testing of samples from trial pits or boreholes provides parameters for foundation design. We deliver foundations to the design that follows from testing.",
    commonProblems: [
      "Bearing capacity unknown",
      "Sulphate or contamination risk",
      "Settlement or shrink–swell concern",
      "Design requires soil parameters",
      "Planning or warranty conditions",
    ],
    howSolved:
      "We build the foundation type specified after soil testing — strip, raft or piling. We work with your engineer and ground investigation contractor.",
    typicalScenarios: [
      "New build after soil survey",
      "Extension on reactive clay",
      "Commercial or industrial project",
      "Adoption and building control",
    ],
    primaryServiceSlug: "foundation-contractors",
    ctaText: "Get a foundation quote",
  },
  "site-clearance-muck-away": {
    title: "Site clearance and muck-away",
    intro: "Site clearance removes vegetation, structures and obstructions; muck-away is the excavation and disposal of spoil. Getting the site clear and levels right is the first step before groundworks.",
    commonProblems: [
      "Vegetation and trees to remove",
      "Existing structures or foundations",
      "Spoil to excavate and dispose",
      "Need for reuse or segregation",
      "Access for plant and lorries",
    ],
    howSolved:
      "We clear the site and remove or redistribute spoil to programme. We provide waste transfer notes and leave the site ready for foundations and drainage.",
    typicalScenarios: [
      "New build site strip",
      "Demolition and clearance",
      "Cut and fill balance",
      "Topsoil strip and stockpile",
    ],
    primaryServiceSlug: "site-clearance-contractors",
    ctaText: "Get a site clearance quote",
  },
  "bulk-excavation-services": {
    title: "Bulk excavation services",
    intro: "Bulk excavation removes large volumes of soil for basements, pools or level changes. We deliver excavation with support where needed and manage spoil and disposal.",
    commonProblems: [
      "Basement or underground structure",
      "Swimming pool or large pit",
      "Significant level change",
      "Support needed for deep excavation",
      "Spoil to remove or reuse",
    ],
    howSolved:
      "We excavate to the required level with temporary support if specified. We manage water, provide disposal documentation and leave a clean formation for the next phase.",
    typicalScenarios: [
      "Basement excavation",
      "Pool and landscaping",
      "Cut and fill for development",
      "Platform and hardstanding",
    ],
    primaryServiceSlug: "excavation-contractors",
    ctaText: "Get an excavation quote",
  },
  "retaining-wall-construction": {
    title: "Retaining wall construction",
    intro: "Retaining walls hold back soil and create level changes. They can be block, concrete or reinforced. We build to the structural engineer's design with drainage and certification.",
    commonProblems: [
      "Slope to retain",
      "Level change in garden or plot",
      "Support for driveway or access",
      "Drainage behind the wall",
      "Building control or warranty approval",
    ],
    howSolved:
      "We construct retaining walls to design with the specified foundations, reinforcement and weep holes or drainage. We provide certification for building control.",
    typicalScenarios: [
      "Garden and landscape retaining",
      "Driveway and access levels",
      "Highway and boundary walls",
      "Commercial and industrial sites",
    ],
    primaryServiceSlug: "groundworks-contractors",
    ctaText: "Get a retaining wall quote",
  },
  "soakaway-installation": {
    title: "Soakaway installation",
    intro: "Soakaways dispose of surface water by infiltration. They are often used where connection to the main drain is not possible or preferred. We install to design with the correct size and connections.",
    commonProblems: [
      "Surface water to dispose of",
      "No or limited connection to main drain",
      "Percolation test may be needed",
      "Planning or building control conditions",
      "Adoption or maintenance",
    ],
    howSolved:
      "We excavate, install the soakaway (crates or rubble) and connect the drainage. We commission and provide documentation for building control or adoption.",
    typicalScenarios: [
      "New build surface water",
      "Driveway and hardstanding drainage",
      "Extension and roof drainage",
      "SuDS and attenuation",
    ],
    primaryServiceSlug: "groundworks-contractors",
    ctaText: "Get a soakaway quote",
  },
  "surface-water-drainage": {
    title: "Surface water drainage",
    intro: "Surface water drainage carries rainwater from roofs and hardstanding to a soakaway or main drain. We install runs, gullies and connections to the design.",
    commonProblems: [
      "New surface water runs required",
      "Gullies and connections",
      "Soakaway or main drain connection",
      "Fall and pipe size from design",
      "Testing and adoption",
    ],
    howSolved:
      "We deliver surface water drainage to design with testing. We coordinate with building control and water company where we connect to the public system.",
    typicalScenarios: [
      "New build drainage",
      "Extension and roof drainage",
      "Driveway and car park drainage",
      "Adoption and S104",
    ],
    primaryServiceSlug: "groundworks-contractors",
    ctaText: "Get a drainage quote",
  },
  "foundation-cost-per-metre": {
    title: "Foundation cost per metre",
    intro: "Foundation costs are often expressed per linear metre for strip foundations or per metre run for piling. Costs depend on depth, ground conditions and design. We quote from your drawings and site.",
    commonProblems: [
      "Budgeting for strip or piling",
      "Comparing foundation types",
      "Extension or new build cost",
      "Ground conditions affecting price",
      "Design not yet finalised",
    ],
    howSolved:
      "We provide fixed-price quotes from your foundation design and site visit. We deliver to design with certification and clear documentation.",
    typicalScenarios: [
      "New build foundations",
      "Extension foundations",
      "Underpinning and repair",
      "Piling and ground beams",
    ],
    primaryServiceSlug: "foundation-contractors",
    ctaText: "Get a foundation quote",
  },
  "groundworks-cost-new-build": {
    title: "Groundworks cost for new build",
    intro: "Groundworks for a new build include site clearance, excavation, foundations and often drainage. Cost depends on size, ground conditions and design. We quote from your drawings and site visit.",
    commonProblems: [
      "Budgeting for full groundworks package",
      "Site clearance and strip",
      "Foundations and drainage",
      "Contingency for poor ground",
      "Programme and access",
    ],
    howSolved:
      "We deliver the full groundworks package to programme — clearance, excavation, foundations and drainage. We provide clear quotes and documentation.",
    typicalScenarios: [
      "Single dwelling new build",
      "Small development",
      "Custom and self-build",
      "Commercial new build",
    ],
    primaryServiceSlug: "groundworks-contractors",
    ctaText: "Get a groundworks quote",
  },
  "driveway-groundworks": {
    title: "Driveway groundworks",
    intro: "Driveway groundworks include excavation, sub-base and drainage. A proper base prevents settlement and ponding. We deliver the groundworks so your chosen surface is laid on a stable, drained base.",
    commonProblems: [
      "Sub-base depth and compaction",
      "Drainage and fall",
      "Dropped kerb and consent",
      "Soakaway or connection",
      "Ready for block, tarmac or resin",
    ],
    howSolved:
      "We excavate, install sub-base and drainage to the correct depth and specification. We leave a level formation ready for your surfacing contractor.",
    typicalScenarios: [
      "Domestic driveway",
      "Double driveway and turning",
      "Resin and block paving",
      "EV charging and ducts",
    ],
    primaryServiceSlug: "groundworks-contractors",
    ctaText: "Get a driveway groundworks quote",
  },
  "car-park-groundworks": {
    title: "Car park groundworks",
    intro: "Car park groundworks include excavation, sub-base and drainage to support traffic loading. We deliver the base and drainage so surfacing can be laid to the correct specification.",
    commonProblems: [
      "Sub-base for car and HGV loading",
      "Drainage for large areas",
      "Levels and fall",
      "Edge restraint and kerbs",
      "Adoption or private maintenance",
    ],
    howSolved:
      "We build the sub-base and drainage to the design for the intended traffic. We leave the formation ready for tarmac, block or resin surfacing.",
    typicalScenarios: [
      "Commercial car park",
      "Residential parking",
      "Retail and office parking",
      "EV and accessible bays",
    ],
    primaryServiceSlug: "groundworks-contractors",
    ctaText: "Get a car park groundworks quote",
  },
  "concrete-hardstanding": {
    title: "Concrete hardstanding",
    intro: "Concrete hardstanding provides a durable surface for parking, storage and plant. We deliver excavation, sub-base and concrete to the design with proper joints and finish.",
    commonProblems: [
      "Loading and thickness",
      "Drainage and fall",
      "Joints and movement",
      "Finish and slip resistance",
      "Building control where applicable",
    ],
    howSolved:
      "We excavate, install sub-base and place concrete to the specified thickness and finish. We provide quality concrete and certification.",
    typicalScenarios: [
      "Domestic parking",
      "Commercial yard",
      "Plant and machinery area",
      "Access and turning",
    ],
    primaryServiceSlug: "concrete-foundations",
    ctaText: "Get a concrete hardstanding quote",
  },
  "site-preparation-contractors": {
    title: "Site preparation contractors",
    intro: "Site preparation gets the site ready for main construction: surveys, clearance, strip and enabling works such as access, temporary drainage and fencing. We deliver so the main contractor can start on programme.",
    commonProblems: [
      "Topographical and utility surveys",
      "Clearance and strip",
      "Access roads and hardstanding",
      "Temporary drainage",
      "Fencing and compound",
    ],
    howSolved:
      "We plan and deliver site preparation to programme. We coordinate with surveyors and the main contractor so the site is ready on day one.",
    typicalScenarios: [
      "New build enabling works",
      "Development site set-up",
      "Demolition and clearance",
      "Piling platform and access",
    ],
    primaryServiceSlug: "enabling-works-contractors",
    ctaText: "Get a site preparation quote",
  },
  "groundworks-for-extensions": {
    title: "Groundworks for extensions",
    intro: "Extension groundworks include foundations, drainage and often tie-in to existing. Strip foundations are common where ground is good; mini piling or raft may be specified on poor ground. We deliver to the structural engineer's design.",
    commonProblems: [
      "Foundation type for extension",
      "Existing foundation depth unknown",
      "Drainage and connections",
      "Movement joint or tie-in",
      "Building control approval",
    ],
    howSolved:
      "We deliver extension foundations and drainage to design. We work with your structural engineer and coordinate with the existing building.",
    typicalScenarios: [
      "Domestic rear or side extension",
      "Two-storey extension",
      "Kitchen and living extension",
      "Annexe and outbuilding",
    ],
    primaryServiceSlug: "foundation-contractors",
    ctaText: "Get an extension groundworks quote",
  },
  "groundworks-for-new-builds": {
    title: "Groundworks for new builds",
    intro: "New build groundworks typically run from site clearance through to foundations and drainage. We deliver the substructure so the superstructure can start on programme, with full documentation for warranty and building control.",
    commonProblems: [
      "Full package from strip to drainage",
      "Ground conditions and design",
      "Programme and handover",
      "Warranty and certification",
      "Services and connections",
    ],
    howSolved:
      "We deliver the complete groundworks package to programme. We coordinate with the structural engineer and main contractor and provide as-built and certification.",
    typicalScenarios: [
      "Single dwelling",
      "Small development",
      "Self-build and custom",
      "Commercial new build",
    ],
    primaryServiceSlug: "groundworks-contractors",
    ctaText: "Get a new build groundworks quote",
  },
  "groundworks-for-developments": {
    title: "Groundworks for developments",
    intro: "Development groundworks cover multiple plots or phases. We deliver site-wide preparation, foundations and drainage to programme, with coordination for adoption and main contractor handover.",
    commonProblems: [
      "Phased programme",
      "Adoption and S104/S38",
      "Site-wide drainage and levels",
      "Multiple plot foundations",
      "Main contractor interface",
    ],
    howSolved:
      "We deliver development groundworks to programme with clear phasing and handover. We provide documentation for adoption and warranty.",
    typicalScenarios: [
      "Small housing development",
      "Commercial plot development",
      "Mixed-use and regeneration",
      "Infrastructure and adoption",
    ],
    primaryServiceSlug: "groundworks-contractors",
    ctaText: "Get a development groundworks quote",
  },
  "groundworks-and-enabling-works": {
    title: "Groundworks and enabling works",
    intro: "Enabling works prepare the site for main groundworks: access, temporary drainage, fencing and compound. We deliver enabling works so groundworks can start on programme, then complete the full package.",
    commonProblems: [
      "Access for plant and deliveries",
      "Temporary drainage",
      "Fencing and security",
      "Site compound and welfare",
      "Handover to main works",
    ],
    howSolved:
      "We deliver enabling works first where needed, then full groundworks — clearance, excavation, foundations and drainage. Single point of contact for the substructure.",
    typicalScenarios: [
      "Greenfield site set-up",
      "Brownfield and constrained access",
      "Multi-phase project",
      "Main contractor early works",
    ],
    primaryServiceSlug: "enabling-works-contractors",
    ctaText: "Get a groundworks and enabling quote",
  },
};

export function isTopicLocationSlug(slug: string): boolean {
  return TOPIC_LOCATION_SLUGS.includes(slug as (typeof TOPIC_LOCATION_SLUGS)[number]);
}

export function getTopicForRouteSlug(routeSlug: string): TopicLocationTopic | undefined {
  return TOPIC_DATA[routeSlug as (typeof TOPIC_LOCATION_SLUGS)[number]];
}

/** Services to list under "Groundworks services in {location}". */
export const TOPIC_PAGE_SERVICES = services;

export function getTopicLocationStaticParams(locations: Location[]) {
  return TOPIC_LOCATION_SLUGS.flatMap((topicSlug) =>
    locations.map((loc) => ({ serviceSlug: topicSlug, locationSlug: loc.id }))
  );
}
