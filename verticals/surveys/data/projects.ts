import {
  generateProjects,
  mergeProjectScenarioContent,
  type ProjectScenarioDefinition,
} from "engine";
import { verticalConfig } from "@/config";
import { locations, services } from "@/lib/data";

const generatedProjects = generateProjects(verticalConfig, locations, services);

const projectDefinitions: ProjectScenarioDefinition[] = [
  {
    id: "project-surveys-1",
    slug: "topographical-survey-london-development-site",
    title: "Topographical survey for constrained city-centre redevelopment site",
    scenario: {
      propertyType: "mixed-use redevelopment plot",
      specificIssue: "a planning-stage topographical survey with restricted access windows",
      constraints: ["live city-centre traffic management", "shared contractor access"],
      jobType: "commercial",
      urgency: "planned",
      complexityLevel: "complex",
    },
    summary:
      "This London survey job covered a mixed-use redevelopment plot where the design team needed a planning-ready topographical base without disrupting the live city-centre access route.",
    problem: [
      "The site was active, tight, and bounded by neighbouring service yards, so the survey needed to pick up levels, boundaries, drainage features, and street furniture without treating the area like an empty site. Access windows were short and had to work around other contractors.",
      "A generic measured walk-round would not have captured enough hard detail for the planning set, so the client needed proper control and a clean CAD output from the first visit.",
    ],
    solution: [
      "We carried out [topographical survey in London](/topographical-survey/london) work using total-station control backed by GNSS where the street geometry allowed it. The survey team split the capture sequence so the busy frontage and the internal yard could be picked up in separate windows.",
      "That kept the fieldwork tight while still producing the detail the design team needed for levels, boundaries, drainage features, and tie-in points.",
    ],
    outcome: [
      "The engineer received a planning-ready base without needing a return visit for missed detail. That gave the design team a workable model of the site early enough to keep the submission programme moving.",
    ],
    whenNeeded: [
      "This kind of survey is usually needed when a project is moving into planning or early design and the site is too constrained for assumptions about levels, boundaries, or drainage to be reliable.",
    ],
    relatedServicesSection: [
      "For comparable city-centre survey work, start with [topographical survey in London](/topographical-survey/london), then look at [utility survey in London](/utility-survey/london) if buried services may affect the design.",
    ],
    equipmentOrMethod: "total-station control with supplementary GNSS",
    timeTaken: "one field shift with same-week CAD delivery",
    outputSummary: "CAD / Planning-ready drawings",
    detailMedia: {
      inlineCaption: "Survey data capture in constrained city-centre conditions",
    },
  },
  {
    id: "project-surveys-2",
    slug: "measured-building-survey-richmond-conversion",
    title: "Measured building survey for Richmond period conversion",
    scenario: {
      propertyType: "period conversion with split-level layout",
      specificIssue: "an as-built survey before internal reconfiguration",
      constraints: ["occupied flats", "tight stair access"],
      jobType: "domestic",
      urgency: "planned",
      complexityLevel: "complex",
    },
    summary:
      "We surveyed this Richmond conversion ahead of internal reconfiguration works where the architect needed reliable as-built information from an occupied split-level property.",
    problem: [
      "The building had irregular floor levels, later alterations, and limited access through narrow stairs, so the survey needed to capture enough internal control without disrupting residents. Existing agent plans were too loose for design use.",
      "Because the project was still at concept stage, the client wanted practical drawings quickly rather than an over-modeled output that would slow the programme.",
    ],
    solution: [
      "We completed a [measured building survey in Richmond](/measured-building-survey/richmond) using internal control and laser capture in the tighter rooms, then tied the elevations and key structural features back into the main drawing set.",
      "That gave the architect coordinated plans, elevations, and key sections without revisiting every room multiple times.",
    ],
    outcome: [
      "The design team had dependable as-built information for the reconfiguration options, and the client avoided pushing a concept scheme forward on inaccurate dimensions. The survey also reduced the risk of late-stage changes once structural drawings started.",
    ],
    whenNeeded: [
      "Measured building surveys are usually needed before extensions, conversions, or internal layout changes where older stock and later alterations make existing drawings unreliable.",
    ],
    relatedServicesSection: [
      "If the scope also needs outside levels or boundary control, pair [measured building survey in Richmond](/measured-building-survey/richmond) with [topographical survey in Richmond](/topographical-survey/richmond).",
    ],
    equipmentOrMethod: "internal control and laser capture",
    timeTaken: "one site visit and short-turnaround drawing package",
  },
  {
    id: "project-surveys-3",
    slug: "utility-survey-chiswick-before-excavation",
    title: "Utility survey before excavation in Chiswick",
    scenario: {
      propertyType: "rear garden extension site",
      specificIssue: "unknown buried services before drainage and foundation excavation",
      constraints: ["limited rear access", "neighbour-sensitive boundary line"],
      jobType: "domestic",
      urgency: "planned",
      complexityLevel: "complex",
    },
    summary:
      "This Chiswick survey was commissioned before extension groundworks where the contractor needed buried services traced before any excavation started in the rear garden.",
    problem: [
      "The rear plot had a narrow side return and no reliable service drawings, so there was a real risk of opening trial holes in the wrong place. The boundary line also sat close to neighbouring runs, which made cautious planning essential.",
      "Because the extension programme was already fixed, the client needed the utility information quickly enough to avoid pushing back the dig date.",
    ],
    solution: [
      "We delivered a [utility survey in Chiswick](/utility-survey/chiswick) using detection and trace work along the proposed dig corridor, then tied the findings into the site plan so the contractor could sequence excavation safely.",
      "The survey highlighted where the line could proceed as planned and where offsets or hand-dig controls were needed close to the boundary.",
    ],
    outcome: [
      "The contractor went into the excavation phase with a defined dig strategy instead of guessing from partial records. That reduced strike risk and helped the client keep the extension programme intact.",
    ],
    whenNeeded: [
      "This type of survey is normally worth doing before any excavation where service records are weak, rear access is tight, or the dig line sits close to boundaries and existing drainage.",
    ],
    relatedServicesSection: [
      "If the design also needs finished levels and hard detail, combine [utility survey in Chiswick](/utility-survey/chiswick) with [topographical survey in Chiswick](/topographical-survey/chiswick).",
    ],
    equipmentOrMethod: "service detection and trace survey",
    timeTaken: "a short site visit before the groundworks start",
  },
  {
    id: "project-surveys-4",
    slug: "utility-mapping-wimbledon-school-site",
    title: "Utility mapping on active school site in Wimbledon",
    scenario: {
      propertyType: "active school campus",
      specificIssue: "buried service mapping ahead of phased refurbishment",
      constraints: ["term-time safeguarding", "survey windows outside pupil movement"],
      jobType: "commercial",
      urgency: "planned",
      complexityLevel: "complex",
    },
    summary:
      "We mapped services across this Wimbledon school site before phased refurbishment where the works team needed reliable underground information without disrupting term-time use.",
    problem: [
      "The main challenge was not just buried services; it was carrying out the survey on a live campus with safeguarding controls and timed access between movement periods. The client needed enough confidence in the mapping to sequence the refurbishment safely.",
      "Existing records were incomplete and could not be relied on for contractor issue drawings.",
    ],
    solution: [
      "We completed [utility mapping survey in Wimbledon](/utility-mapping-survey/wimbledon) work in controlled windows, focusing first on the proposed work zones and then on the main campus links that affected later phases.",
      "By sequencing the work around the campus routine, the survey still delivered the coverage needed for the refurbishment team without creating unnecessary disruption on site.",
    ],
    outcome: [
      "The project team had a clearer buried-services picture for phasing and permit planning, which reduced risk before the first strip-out package started. The survey also gave the client a better permanent record than the inherited drawings.",
    ],
    whenNeeded: [
      "Projects like this usually need mapping when live sites are moving into refurbishment and buried-service uncertainty could affect phasing, safety controls, or contractor access.",
    ],
    relatedServicesSection: [
      "For similar phasing work, compare [utility mapping survey in Wimbledon](/utility-mapping-survey/wimbledon) with [measured building survey in Wimbledon](/measured-building-survey/wimbledon) if the internal refurbishment package also needs accurate as-built drawings.",
    ],
    equipmentOrMethod: "phased utility mapping under controlled access windows",
    timeTaken: "a programmed survey visit around site operating hours",
  },
  {
    id: "project-surveys-5",
    slug: "boundary-survey-kingston-title-check",
    title: "Boundary survey before title issue review in Kingston",
    scenario: {
      propertyType: "semi-detached house with shared side access",
      specificIssue: "unclear rear boundary position before fencing and extension planning",
      constraints: ["shared access route with neighbour"],
      jobType: "domestic",
      urgency: "planned",
      complexityLevel: "simple",
    },
    summary:
      "This Kingston boundary survey was needed before fencing and extension planning where the owner needed a clear measured position of the rear boundary line.",
    problem: [
      "The issue was not an active dispute yet, but the owner needed evidence before building works and new fencing made the boundary harder to revisit. Shared side access meant the survey had to be practical and low disruption.",
      "Historic plans gave only a general position, which was not enough for a contractor or adviser to rely on.",
    ],
    solution: [
      "We carried out a [boundary survey in Kingston](/boundary-survey/kingston), tied the visible features into measured control, and set out the information in a way the owner could use when reviewing the title plan position against the physical boundary.",
      "That kept the output focused on decision-making rather than overcomplicating a relatively contained residential site.",
    ],
    outcome: [
      "The owner had a measured basis for the next conversation before committing to fencing and extension works. That made the planning stage more straightforward and reduced the risk of avoidable boundary disagreement later.",
    ],
    whenNeeded: [
      "Boundary surveys are usually worth commissioning before fencing, extensions, or title review where the physical boundary and the paper record do not appear to align cleanly.",
    ],
    relatedServicesSection: [
      "If the same site also needs design levels and external detail, [boundary survey in Kingston](/boundary-survey/kingston) can sit alongside [topographical survey in Kingston](/topographical-survey/kingston).",
    ],
    equipmentOrMethod: "measured boundary control survey",
    timeTaken: "one short residential site visit",
  },
  {
    id: "project-surveys-6",
    slug: "laser-scanning-fulham-commercial-fitout",
    title: "Laser scanning for Fulham commercial fit-out",
    scenario: {
      propertyType: "commercial unit undergoing fit-out",
      specificIssue: "complex internal geometry ahead of MEP coordination",
      constraints: ["overnight access only", "live shell-and-core environment"],
      jobType: "commercial",
      urgency: "planned",
      complexityLevel: "complex",
    },
    summary:
      "We scanned this Fulham commercial unit before fit-out where the design team needed dependable internal geometry for MEP coordination inside a live shell-and-core environment.",
    problem: [
      "The unit had enough irregular soffit, structural, and service detail that conventional tape-based checks would have left too many coordination risks. Access was only available overnight while the wider building works stayed live.",
      "That meant the capture method had to be efficient enough to gather the right detail in one window rather than relying on repeat visits.",
    ],
    solution: [
      "We delivered a [laser scanning survey in Fulham](/laser-scanning-survey/fulham), capturing the internal structure and tie-in points needed for the fit-out team, then processed the point-cloud output into a coordinated drawing base.",
      "The scanning sequence was organised around the limited overnight possession so the core geometry was secured in a single visit.",
    ],
    outcome: [
      "The fit-out team had a far more dependable basis for coordination, which reduced the risk of clashes once services and finishes moved into detailed design. The client also avoided burning programme on repeated ad hoc measurement visits.",
    ],
    whenNeeded: [
      "Laser scanning is usually the right move where the internal geometry is too dense or irregular for conventional spot measurement, especially when access is restricted to short possession windows.",
    ],
    relatedServicesSection: [
      "For similar fit-out preparation, compare [laser scanning survey in Fulham](/laser-scanning-survey/fulham) with [measured building survey in Fulham](/measured-building-survey/fulham) if the deliverable only needs a lighter as-built package.",
    ],
    equipmentOrMethod: "laser scanning with coordinated point-cloud processing",
    timeTaken: "a single overnight possession",
  },
];

export const projects = mergeProjectScenarioContent(generatedProjects, projectDefinitions);
export const publishedProjects = projects;
export const homepageProjects = publishedProjects.slice(0, 6);
