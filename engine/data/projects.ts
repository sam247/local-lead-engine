import type { Location, Service, VerticalConfig } from "../types";

export type JobType = "domestic" | "commercial";
export type JobUrgency = "urgent" | "planned";
export type JobComplexity = "simple" | "complex";
export type BlogIntent = "diagnostic" | "explanatory" | "cost-related" | "decision-making";

export interface ContentScenario {
  propertyType: string;
  specificIssue: string;
  constraints: string[];
  jobType: JobType;
  urgency: JobUrgency;
  complexityLevel: JobComplexity;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectDetailMedia {
  hero?: ProjectImage;
  inline?: ProjectImage;
  inlineCaption?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  locationId: string;
  service: string;
  serviceSlug: string;
  description: string;
  summary: string;
  problem: string[];
  solution: string[];
  outcome: string[];
  whenNeeded: string[];
  relatedServicesSection: string[];
  metaDescription: string;
  scenario: ContentScenario;
  equipmentOrMethod: string;
  timeTaken: string;
  imagePrompt: string;
  image: string;
  imageIndex: number;
  images?: ProjectImage[];
  outputSummary: string;
  detailMedia?: ProjectDetailMedia;
}

export interface ProjectScenarioDefinition {
  id: string;
  slug?: string;
  title?: string;
  scenario: ContentScenario;
  summary: string;
  problem: string[];
  solution: string[];
  outcome: string[];
  whenNeeded: string[];
  relatedServicesSection: string[];
  equipmentOrMethod?: string;
  timeTaken?: string;
  metaDescription?: string;
  images?: ProjectImage[];
  outputSummary?: string;
  detailMedia?: ProjectDetailMedia;
}

const PROPERTY_TYPES = [
  "hospital",
  "warehouse",
  "office building",
  "data centre",
  "school",
  "retail park",
  "industrial estate",
  "commercial property",
] as const;

const PROPERTY_TYPES_BY_VERTICAL: Record<string, readonly string[]> = {
  groundworks: [
    "housing development",
    "commercial office building",
    "warehouse",
    "industrial site",
    "hospital",
    "school",
    "retail park",
    "construction site",
  ],
};

function titleCase(str: string): string {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

const IMAGE_PROMPTS_BY_VERTICAL: Record<string, string[]> = {
  access: [
    "technician installing CCTV camera on building",
    "access control keypad on office door",
    "security control room with monitors",
    "perimeter security cameras at warehouse",
    "IP cameras in commercial corridor",
    "integrated access and CCTV in reception",
  ],
  drains: [
    "drain excavation trench with pipe",
    "CCTV drain inspection camera in pipe",
    "pipe relining equipment and liner",
    "high-pressure drain jetting equipment",
    "drain repair excavation and new pipe",
    "drainage engineer at manhole",
  ],
  surveys: [
    "survey tripod on construction site",
    "drone roof inspection in flight",
    "topographical survey equipment on site",
    "measured building survey laser scanner",
    "utility detection and mapping equipment",
    "drone survey over development site",
  ],
  groundworks: [
    "excavator digging foundations on construction site",
    "mini piling rig installing steel piles",
    "groundworks contractors installing drainage and foundations",
    "construction excavation trench for building foundations",
    "site clearance machinery clearing land",
    "concrete foundations being poured",
  ],
};

const DESCRIPTION_TEMPLATES_BY_VERTICAL: Record<string, string[]> = {
  access: [
    "Integrated access control and CCTV installation for a {property} in {location}. Completed to schedule with full handover and documentation.",
    "Full {service} for a {property} in {location}. Commissioned with remote access and ongoing support.",
    "Security system upgrade and integration at a {property} in {location}. Delivered on time with staff training.",
  ],
  drains: [
    "Full {service} for a {property} in {location}. Completed with CCTV report and reinstatement.",
    "Emergency drainage works and repair for a {property} in {location}. Same-day response and resolution.",
    "CCTV survey and subsequent repair for a {property} in {location}. No-dig solution where possible.",
  ],
  surveys: [
    "{service} for a {property} development in {location}. Planning-ready deliverables and full report.",
    "Site survey and mapping for a {property} in {location}. Delivered to programme with CAD outputs.",
    "Survey and verification for a {property} project in {location}. As-built and topographical data supplied.",
  ],
  groundworks: [
    "{service} for a {property} in {location}. Completed to programme with full handover.",
    "Groundworks and foundations for a {property} in {location}. Delivered on time with certification.",
    "Site preparation and {service} for a {property} in {location}. Quality assured and documented.",
  ],
};

const PROJECT_TITLE_TEMPLATE_BY_VERTICAL: Record<string, string> = {
  groundworks: "{service} for {property} – {location}",
};

/**
 * Deterministic shuffle using a simple seeded RNG. Same seed => same order.
 */
function seededShuffle<T>(array: T[], seed: number): T[] {
  const out = [...array];
  let s = seed;
  const next = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function createDefaultScenario(propertyType: string): ContentScenario {
  return {
    propertyType,
    specificIssue: "a site issue that needed a clear technical fix",
    constraints: ["site access"],
    jobType: propertyType.includes("office") || propertyType.includes("warehouse") || propertyType.includes("data centre") ? "commercial" : "domestic",
    urgency: "planned",
    complexityLevel: "simple",
  };
}

function createProjectSlug(serviceSlug: string, locationId: string): string {
  return `${serviceSlug}-${locationId}-project`;
}

function createFallbackMetaDescription(service: string, location: string, timeTaken: string) {
  return `${service} in ${location} completed with a clear scope, controlled delivery, and a practical result inside ${timeTaken}.`;
}

function createDefaultOutputSummary(verticalId: string, serviceTitle: string): string {
  if (verticalId === "surveys") return "CAD / Planning-ready drawings";
  if (verticalId === "access") return "Installation-ready scope and documented handover";
  if (verticalId === "groundworks") return "Programme-ready set-out and site handover";
  if (verticalId === "drains") return "First-visit diagnosis and repair outcome";
  return `${serviceTitle} completed with a documented handover`;
}

export function generateProjects(
  verticalConfig: VerticalConfig,
  locations: Location[],
  services: Service[]
): Project[] {
  const verticalId = verticalConfig.verticalId;
  const propertyTypes = PROPERTY_TYPES_BY_VERTICAL[verticalId] ?? PROPERTY_TYPES;
  const prompts = IMAGE_PROMPTS_BY_VERTICAL[verticalId] ?? IMAGE_PROMPTS_BY_VERTICAL.access;
  const templates = DESCRIPTION_TEMPLATES_BY_VERTICAL[verticalId] ?? DESCRIPTION_TEMPLATES_BY_VERTICAL.access;
  const titleTemplate = PROJECT_TITLE_TEMPLATE_BY_VERTICAL[verticalId];

  const combinations: { property: string; service: Service; location: Location }[] = [];
  let locIndex = 0;
  for (const prop of propertyTypes) {
    for (const service of services) {
      const location = locations[locIndex % locations.length];
      combinations.push({ property: titleCase(prop), service, location });
      locIndex++;
    }
  }

  const capped = combinations.slice(0, 30);

  return capped.map((combo, index) => {
    const { property, service, location } = combo;
    const title = titleTemplate
      ? titleTemplate
          .replace("{service}", service.title)
          .replace("{property}", property)
          .replace("{location}", location.name)
      : `${property} ${service.title} – ${location.name}`;
    const template = templates[index % templates.length];
    const description = template
      .replace("{property}", property.toLowerCase())
      .replace("{location}", location.name)
      .replace("{service}", service.title);

    const imagePrompt = prompts[index % prompts.length];
    return {
      id: `project-${verticalId}-${index + 1}`,
      slug: createProjectSlug(service.slug, location.id),
      title,
      location: location.name,
      locationId: location.id,
      service: service.title,
      serviceSlug: service.slug,
      description,
      summary: description,
      problem: [description],
      solution: [`We scoped ${service.title.toLowerCase()} around the live site conditions and kept the work aligned with the programme in ${location.name}.`],
      outcome: [`The job was completed with a clear handover, practical next steps, and a more reliable outcome for the property in ${location.name}.`],
      whenNeeded: [`This kind of job usually starts when a ${property.toLowerCase()} needs ${service.title.toLowerCase()} without adding avoidable delay or disruption.`],
      relatedServicesSection: [`For similar work, the next useful pages are the main [${service.title} in ${location.name}](/${service.slug}/${location.id}) page and other same-location services for neighbouring issues.`],
      metaDescription: createFallbackMetaDescription(service.title, location.name, "a standard programme"),
      scenario: createDefaultScenario(property.toLowerCase()),
      equipmentOrMethod: service.process[0] ?? "site survey",
      timeTaken: "a standard programme",
      imagePrompt,
      image: `/images/projects/project-${verticalId}-${index + 1}.jpg`,
      imageIndex: index,
      outputSummary: createDefaultOutputSummary(verticalId, service.title),
    };
  });
}

export function mergeProjectScenarioContent(
  projects: Project[],
  definitions: ProjectScenarioDefinition[]
): Project[] {
  return definitions.flatMap((definition) => {
    const base = projects.find((project) => project.id === definition.id);
    if (!base) return [];

    return [
      {
        ...base,
        slug: definition.slug ?? base.slug,
        title: definition.title ?? base.title,
        summary: definition.summary,
        description: definition.summary,
        problem: definition.problem,
        solution: definition.solution,
        outcome: definition.outcome,
        whenNeeded: definition.whenNeeded,
        relatedServicesSection: definition.relatedServicesSection,
        metaDescription:
          definition.metaDescription ??
          createFallbackMetaDescription(base.service, base.location, definition.timeTaken ?? base.timeTaken),
        scenario: definition.scenario,
        equipmentOrMethod: definition.equipmentOrMethod ?? base.equipmentOrMethod,
        timeTaken: definition.timeTaken ?? base.timeTaken,
        images: definition.images ?? base.images,
        outputSummary: definition.outputSummary ?? base.outputSummary,
        detailMedia: definition.detailMedia ?? base.detailMedia,
      },
    ];
  });
}

/**
 * Returns a deterministic homepage subset.
 */
export function getProjectsForHomepage(projects: Project[], seed?: number): Project[] {
  const s = seed ?? 42;
  return seededShuffle(projects, s).slice(0, 6);
}

export type PublishedProject = Project;
