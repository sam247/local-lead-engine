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
    id: "project-groundworks-1",
    slug: "london-groundworks-basement-formation",
    title: "Groundworks package for constrained basement formation in London",
    scenario: {
      propertyType: "tight central London redevelopment plot",
      specificIssue: "a basement formation and drainage package on a restricted footprint",
      constraints: ["tight site access", "close neighbouring structures"],
      jobType: "commercial",
      urgency: "planned",
      complexityLevel: "complex",
    },
    summary:
      "This London groundworks package covered basement formation and early drainage on a restricted redevelopment plot where neighbouring structures and tight access shaped every stage of the works.",
    problem: [
      "The challenge was not just excavation depth; it was sequencing the package in a footprint that left little room for plant movement or material handling. With neighbouring structures close to the line of works, the early-stage excavation had to be tightly controlled.",
      "The client needed a package that would get the site ready for the next structural phase without creating avoidable delay in the early programme.",
    ],
    solution: [
      "We delivered [groundworks contractors in London](/groundworks-contractors/london) work with the excavation, formation prep, and early drainage package planned around the actual site logistics rather than a broad standard sequence.",
      "That meant tighter plant movements, controlled muck-away timing, and a package structure that kept the downstream structural works in mind from the outset.",
    ],
    outcome: [
      "The basement formation was handed over on a cleaner programme with the enabling drainage and formation package already aligned to the next trade. That reduced the chance of the site slipping in the first critical phase.",
    ],
    whenNeeded: [
      "This type of package is usually needed when a restricted urban site cannot afford a loose early-stage sequence and the groundworks need to support a tightly programmed build from day one.",
    ],
    relatedServicesSection: [
      "For comparable urban packages, start with [groundworks contractors in London](/groundworks-contractors/london), then review [excavation contractors in London](/excavation-contractors/london) where the dig strategy itself is the main risk driver.",
    ],
    equipmentOrMethod: "controlled formation and drainage sequencing",
    timeTaken: "a tightly programmed early-works package",
  },
  {
    id: "project-groundworks-2",
    slug: "richmond-underpinning-party-wall-constraints",
    title: "Underpinning under party-wall constraints in Richmond",
    scenario: {
      propertyType: "period terrace under alteration",
      specificIssue: "foundation strengthening beneath a party-wall-adjacent structure",
      constraints: ["party wall sequencing", "occupied neighbouring property"],
      jobType: "domestic",
      urgency: "planned",
      complexityLevel: "complex",
    },
    summary:
      "This Richmond underpinning project involved a period terrace where foundation strengthening had to be carried out under party-wall constraints and close neighbour occupancy.",
    problem: [
      "The core issue was structural support, but the real delivery challenge sat in the sequence: the works had to respect the party-wall arrangement and keep the adjoining property risk tightly controlled.",
      "Because of that, the client needed a methodical underpinning sequence rather than a rushed groundworks response.",
    ],
    solution: [
      "We carried out [underpinning in Richmond](/underpinning/richmond) with the excavation and placement sequence aligned to the structural design and the practical limits created by the party-wall condition.",
      "The works were kept measured and controlled so the support strategy remained the focus rather than forcing production speed where the site did not allow it.",
    ],
    outcome: [
      "The structure moved onto a more reliable footing for the next phase of alteration work, and the client had a clearer record of how the strengthening had been delivered under the constrained site conditions.",
    ],
    whenNeeded: [
      "Underpinning is typically needed where an existing structure requires deeper or stronger support and the site conditions make sequencing, neighbour impact, and structural control as important as the concrete itself.",
    ],
    relatedServicesSection: [
      "For comparable structural support jobs, compare [underpinning in Richmond](/underpinning/richmond) with [foundation contractors in Richmond](/foundation-contractors/richmond) when the scope moves from repair into new structural support work.",
    ],
    equipmentOrMethod: "phased underpinning sequence",
    timeTaken: "a staged structural works programme",
  },
  {
    id: "project-groundworks-3",
    slug: "chiswick-piling-tight-access-site",
    title: "Piling on tight-access Chiswick infill site",
    scenario: {
      propertyType: "tight infill development site",
      specificIssue: "foundation support on weak ground with limited rig access",
      constraints: ["narrow frontage", "restricted headroom"],
      jobType: "commercial",
      urgency: "planned",
      complexityLevel: "complex",
    },
    summary:
      "We delivered piling on this Chiswick infill site where the structural solution needed to suit weak ground conditions and a frontage that limited how the rig could be brought in.",
    problem: [
      "The project needed piled support, but the access and headroom restrictions ruled out treating the site like an open plot. Plant choice and setup had to be considered alongside the ground model, not after it.",
      "That made the job technically driven from the start rather than just an installation exercise.",
    ],
    solution: [
      "We completed [piling contractors in Chiswick](/piling-contractors/chiswick) work with the method chosen around the restricted site geometry as well as the support requirements. The installation sequence was planned to keep movement tight and avoid unnecessary rehandling on the frontage.",
      "This kept the piling operation workable inside the site limits instead of forcing the design into a method the access would not realistically support.",
    ],
    outcome: [
      "The site got the structural support it needed without the piling phase becoming the programme bottleneck. More importantly, the method stayed aligned to the real constraints rather than working against them.",
    ],
    whenNeeded: [
      "This type of job usually arises where the ground requires piled support but the site access is so limited that the install method has to be selected as carefully as the structural solution.",
    ],
    relatedServicesSection: [
      "For similar access-led foundation support jobs, start with [piling contractors in Chiswick](/piling-contractors/chiswick), then compare [mini piling contractors in Chiswick](/mini-piling-contractors/chiswick) where low headroom is the deciding constraint.",
    ],
    equipmentOrMethod: "restricted-access piling setup",
    timeTaken: "a programmed piling phase with controlled plant movement",
  },
  {
    id: "project-groundworks-4",
    slug: "wimbledon-cfa-piling-noise-sensitive-site",
    title: "CFA piling on noise-sensitive site in Wimbledon",
    scenario: {
      propertyType: "urban plot beside occupied neighbours",
      specificIssue: "a piling package needing lower vibration and controlled noise",
      constraints: ["noise-sensitive surroundings", "urban working window"],
      jobType: "commercial",
      urgency: "planned",
      complexityLevel: "complex",
    },
    summary:
      "This Wimbledon piling package was planned for an urban plot where neighbour sensitivity made vibration and noise control a live delivery issue from the start.",
    problem: [
      "The site needed piled support, but the surrounding occupation meant the chosen method had to respect vibration and working-hour constraints rather than just maximise production speed.",
      "That pushed the decision toward a method that could handle the ground requirements while sitting more comfortably within the urban constraints.",
    ],
    solution: [
      "We delivered [CFA piling in Wimbledon](/cfa-piling/wimbledon) with the method selected specifically for the lower-vibration urban context, then planned the installation sequence around the available working window.",
      "The focus was on controlled delivery and predictable site behaviour rather than brute-force production across a sensitive boundary condition.",
    ],
    outcome: [
      "The piling phase moved forward without turning neighbour sensitivity into a programme issue, and the client had a cleaner route into the next structural stage with the support package already in place.",
    ],
    whenNeeded: [
      "CFA piling becomes the right route when a site needs piled support but vibration, noise, or constrained urban conditions make a rougher install approach hard to justify.",
    ],
    relatedServicesSection: [
      "For similar urban foundation work, compare [CFA piling in Wimbledon](/cfa-piling/wimbledon) with [piling contractors in Wimbledon](/piling-contractors/wimbledon) if the site still needs a broader piling review.",
    ],
    equipmentOrMethod: "CFA piling on a controlled urban programme",
    timeTaken: "a phased piling window within site hours",
  },
  {
    id: "project-groundworks-5",
    slug: "kingston-mini-piling-emergency-support",
    title: "Mini piling response on constrained Kingston plot",
    scenario: {
      propertyType: "rear extension plot with restricted side access",
      specificIssue: "urgent foundation support after ground conditions changed on site",
      constraints: ["restricted side access", "programme pressure from live build"],
      jobType: "domestic",
      urgency: "urgent",
      complexityLevel: "complex",
    },
    summary:
      "This Kingston job moved quickly after the live build encountered ground conditions that made the original foundation assumption unworkable on a restricted-access extension plot.",
    problem: [
      "The contractor needed a support solution quickly, but the site only had restricted side access and low tolerance for larger plant movement. The issue became urgent because the live build could not sit idle while the foundation route was reconsidered.",
      "That meant the piling response had to suit both the ground conditions and the access reality on site.",
    ],
    solution: [
      "We carried out [mini piling contractors in Kingston](/mini-piling-contractors/kingston) work using an access-appropriate setup that could be brought through the side route without forcing major temporary changes to the plot.",
      "The install sequence was set around the urgent programme pressure so the contractor could move back onto the next structural stage as soon as the support package was complete.",
    ],
    outcome: [
      "The project recovered a usable programme after the ground issue surfaced, and the restricted-access site still received a support solution that matched the actual physical constraints.",
    ],
    whenNeeded: [
      "Mini piling is often the right answer when support requirements change quickly on a tight site and the access simply will not take a larger conventional setup.",
    ],
    relatedServicesSection: [
      "For comparable recovery jobs, start with [mini piling contractors in Kingston](/mini-piling-contractors/kingston), then compare [foundation contractors in Kingston](/foundation-contractors/kingston) once the site moves from support into the wider foundation package.",
    ],
    equipmentOrMethod: "restricted-access mini piling setup",
    timeTaken: "an urgent recovery phase on a live programme",
  },
  {
    id: "project-groundworks-6",
    slug: "foundation-contractors-fulham-rebuild",
    title: "Foundation package for Fulham rebuild plot",
    scenario: {
      propertyType: "urban rebuild plot",
      specificIssue: "new foundation construction tied to a tight downstream programme",
      constraints: ["tight plot storage", "coordinated handover to follow-on trades"],
      jobType: "commercial",
      urgency: "planned",
      complexityLevel: "simple",
    },
    summary:
      "We delivered the foundation package on this Fulham rebuild plot where the main concern was getting a clean handover into the next trade on a tight urban programme.",
    problem: [
      "The site did not present the same structural complexity as the other jobs, but it did demand clean sequencing and good coordination because storage, access, and downstream handover were all tight.",
      "Without a tidy foundation phase, the follow-on trades would have lost time almost immediately.",
    ],
    solution: [
      "We carried out [foundation contractors in Fulham](/foundation-contractors/fulham) work with the excavation, reinforcement, and pour sequence built around the handover dates rather than treated as an isolated package.",
      "That kept the output focused on programme reliability, which was what the client actually needed from the groundworks phase.",
    ],
    outcome: [
      "The foundation package was handed over in a condition the next trade could pick up immediately, reducing the risk of the early programme losing momentum on a tight city plot.",
    ],
    whenNeeded: [
      "Straightforward foundation work still matters when the key risk is programme continuity and the site does not have the slack for an untidy early handover.",
    ],
    relatedServicesSection: [
      "For similar handover-led packages, compare [foundation contractors in Fulham](/foundation-contractors/fulham) with [groundworks contractors in Fulham](/groundworks-contractors/fulham) if the surrounding site package also needs coordination.",
    ],
    equipmentOrMethod: "sequenced excavation, reinforcement, and pour package",
    timeTaken: "a planned foundation phase aligned to handover dates",
  },
];

export const projects = mergeProjectScenarioContent(generatedProjects, projectDefinitions);
export const publishedProjects = projects;
export const homepageProjects = publishedProjects.slice(0, 6);
