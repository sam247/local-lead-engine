import { locations, services } from "@/lib/data";

type CostBand = {
  label: string;
  range: string;
  description: string;
};

type ExampleJob = {
  title: string;
  range: string;
};

type CostFaq = {
  question: string;
  answer: string;
};

type RelatedLink = {
  title: string;
  href: string;
};

const PREFERRED_LOCATION_IDS = ["london", "manchester", "birmingham"] as const;
const PREFERRED_SERVICE_SLUGS = ["groundworks-contractors", "piling-contractors", "foundation-contractors", "excavation-contractors"] as const;

function getOrderedLocations() {
  const selected = new Set<string>();
  const ordered = [];
  for (const id of PREFERRED_LOCATION_IDS) {
    const location = locations.find((item) => item.id === id);
    if (location) {
      selected.add(location.id);
      ordered.push(location);
    }
  }
  for (const location of locations) {
    if (!selected.has(location.id)) ordered.push(location);
  }
  return ordered;
}

function getOrderedServices() {
  const selected = new Set<string>();
  const ordered = [];
  for (const slug of PREFERRED_SERVICE_SLUGS) {
    const service = services.find((item) => item.slug === slug);
    if (service) {
      selected.add(service.slug);
      ordered.push(service);
    }
  }
  for (const service of services) {
    if (!selected.has(service.slug)) ordered.push(service);
  }
  return ordered;
}

export function getCompaniesCostLinks(maxLinks = 5): RelatedLink[] {
  const links: RelatedLink[] = [];
  const seen = new Set<string>();
  const orderedServices = getOrderedServices();
  const orderedLocations = getOrderedLocations();

  for (const service of orderedServices) {
    for (const location of orderedLocations) {
      const href = `/${service.slug}/${location.id}`;
      if (seen.has(href)) continue;
      seen.add(href);
      links.push({
        title: `${service.title} in ${location.name}`,
        href,
      });
      if (links.length >= maxLinks) return links;
    }
  }

  return links;
}

export const companiesCostPage = {
  titleEntity: "Groundwork",
  h1: "How Much Do Groundwork Companies Cost in the UK?",
  intro:
    "Groundwork company pricing depends on design scope, ground conditions, and access for plant and materials. Smaller enabling works can be quoted quickly, while piling and foundation packages are priced against site-specific requirements.",
  typicalCostsTitle: "Typical costs",
  typicalCosts: [
    { label: "Small jobs", range: "GBP900 to GBP3,000", description: "Minor excavation, drainage tie-ins, and smaller domestic groundwork tasks." },
    { label: "Medium jobs", range: "GBP4,000 to GBP18,000", description: "Foundation prep, mini piling, and combined excavation plus concrete works." },
    { label: "Large projects", range: "GBP20,000+", description: "Full groundwork packages including piling, foundations, and enabling works for larger sites." },
  ] as CostBand[],
  costFactorsTitle: "What affects groundwork company cost",
  costFactors: ["Location and labour rates", "Site access, obstructions, and ground conditions", "Project size and structural specification", "Programme urgency and sequencing constraints", "Materials, plant hire, and specialist equipment"],
  exampleJobsTitle: "Example jobs",
  exampleJobs: [
    { title: "Mini piling for extension in London", range: "GBP5,500 to GBP14,000" },
    { title: "Excavation and foundation prep in Manchester", range: "GBP3,500 to GBP11,000" },
    { title: "Groundworks package for new build in Birmingham", range: "GBP22,000 to GBP65,000" },
  ] as ExampleJob[],
  quotesTitle: "When to get quotes",
  quotesBody:
    "Groundworks estimates can move significantly once levels, access limits, and ground risks are confirmed. Taking multiple quotes gives you a clearer view of method, programme, and what is included in the contractor scope.",
  ctaTitle: "Get quotes from vetted groundwork contractors near you",
  ctaBullets: ["Compare local teams with relevant civils experience", "Price your scope against real site constraints", "Choose contractors with clear programme and delivery detail"],
  faqs: [
    {
      question: "Why do groundwork quotes vary so much between contractors?",
      answer: "Differences usually come from assumptions around ground risk, excavation quantities, access, and inclusions such as reinstatement.",
    },
    {
      question: "Do I need a site investigation before requesting final pricing?",
      answer: "For many projects, yes. Ground data improves price accuracy and helps avoid late variations.",
    },
    {
      question: "Should I compare groundwork quotes by total price alone?",
      answer: "No. Compare methods, exclusions, programme allowances, and who carries design or temporary works responsibility.",
    },
  ] as CostFaq[],
};
