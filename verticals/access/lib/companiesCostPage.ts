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
const PREFERRED_SERVICE_SLUGS = ["access-control-systems", "commercial-cctv-installation", "perimeter-security-systems", "security-system-integration"] as const;

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
  titleEntity: "Access Control",
  h1: "How Much Do Access Control Companies Cost in the UK?",
  intro:
    "Access control company costs depend on building layout, hardware specification, and integration scope. Single-entry upgrades can be quoted quickly, while multi-door commercial systems are priced against site surveys and technical requirements.",
  typicalCostsTitle: "Typical costs",
  typicalCosts: [
    { label: "Small jobs", range: "GBP1,000 to GBP3,500", description: "Single or low-door-count access control installations with straightforward wiring." },
    { label: "Medium jobs", range: "GBP4,000 to GBP15,000", description: "Commercial CCTV and access packages across multiple doors or zones." },
    { label: "Large projects", range: "GBP18,000+", description: "Integrated access, CCTV, and perimeter systems across larger sites or estates." },
  ] as CostBand[],
  costFactorsTitle: "What affects access control company cost",
  costFactors: ["Location and engineer coverage", "Site access, cabling routes, and existing infrastructure", "Project scale and number of controlled points", "Urgency and phased deployment requirements", "Hardware specification, software licensing, and integration complexity"],
  exampleJobsTitle: "Example jobs",
  exampleJobs: [
    { title: "Access control upgrade for office in London", range: "GBP2,200 to GBP6,800" },
    { title: "Commercial CCTV installation in Manchester", range: "GBP3,500 to GBP12,000" },
    { title: "Integrated perimeter and access system in Birmingham", range: "GBP14,000 to GBP38,000" },
  ] as ExampleJob[],
  quotesTitle: "When to get quotes",
  quotesBody:
    "Security system pricing varies based on door schedules, recording requirements, and integration with existing platforms. Getting multiple quotes helps you compare coverage, support terms, and lifecycle value rather than only installation cost.",
  ctaTitle: "Get quotes from vetted access control contractors near you",
  ctaBullets: ["Compare local security specialists by scope", "Align pricing with your compliance and risk requirements", "Move from survey to approved installation with clear options"],
  faqs: [
    {
      question: "Do access control companies usually include software and licensing?",
      answer: "Some quotes include licensing and support, while others separate those costs. Always check line-item breakdowns.",
    },
    {
      question: "Can I combine CCTV and access control in one quote?",
      answer: "Yes, many contractors price bundled packages and integration works in a single commercial proposal.",
    },
    {
      question: "What should I compare when reviewing access control quotes?",
      answer: "Compare hardware tier, warranty, support cover, commissioning scope, and any integration exclusions.",
    },
  ] as CostFaq[],
};
