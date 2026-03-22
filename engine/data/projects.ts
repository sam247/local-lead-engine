import type { Location, Service, VerticalConfig } from "../types";

export interface Project {
  id: string;
  title: string;
  location: string;
  locationId?: string;
  service: string;
  serviceSlug: string;
  description: string;
  imagePrompt: string;
  image: string;
  imageIndex: number;
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
      title,
      location: location.name,
      locationId: location.id,
      service: service.title,
      serviceSlug: service.slug,
      description,
      imagePrompt,
      image: `/images/projects/project-${verticalId}-${index + 1}.jpg`,
      /** 0-based slot matching asset `{verticalId}-{index+1}.jpg` in project-place-images (30 distinct images per vertical). */
      imageIndex: index,
    };
  });
}

/**
 * Returns 6 projects for homepage display. Deterministic shuffle so SSG is stable.
 */
export function getProjectsForHomepage(projects: Project[], seed?: number): Project[] {
  const s = seed ?? 42;
  return seededShuffle(projects, s).slice(0, 6);
}
