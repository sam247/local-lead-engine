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
const PREFERRED_SERVICE_SLUGS = ["topographical-survey", "measured-building-survey", "utility-survey", "drone-survey"] as const;

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
  titleEntity: "Surveying",
  h1: "How Much Do Surveying Companies Cost in the UK?",
  intro:
    "Surveying company costs are driven by scope, accuracy requirements, and site complexity. Straightforward plot surveys can be priced quickly, while utility mapping or multi-output measured surveys need detailed quote assumptions.",
  typicalCostsTitle: "Typical costs",
  typicalCosts: [
    { label: "Small jobs", range: "GBP400 to GBP1,200", description: "Basic topographical or boundary work on smaller sites with simple access." },
    { label: "Medium jobs", range: "GBP1,300 to GBP4,500", description: "Measured building or utility survey scopes requiring more field and CAD time." },
    { label: "Large projects", range: "GBP5,000+", description: "Complex multi-disciplinary survey packages across larger or constrained sites." },
  ] as CostBand[],
  costFactorsTitle: "What affects surveying company cost",
  costFactors: ["Location and travel logistics", "Access restrictions and site conditions", "Survey area, detail level, and deliverables", "Urgency and programme deadlines", "Equipment requirements such as GPR, laser scanning, or drone capture"],
  exampleJobsTitle: "Example jobs",
  exampleJobs: [
    { title: "Topographical survey for planning in London", range: "GBP650 to GBP1,800" },
    { title: "Measured building survey in Manchester", range: "GBP1,200 to GBP3,900" },
    { title: "Utility mapping survey for development in Birmingham", range: "GBP2,200 to GBP6,500" },
  ] as ExampleJob[],
  quotesTitle: "When to get quotes",
  quotesBody:
    "Survey prices vary based on the required output, tolerance, and constraints on site. Requesting multiple quotes helps you compare not only fees but also methodology, turnaround, and deliverable quality.",
  ctaTitle: "Get quotes from vetted surveying contractors near you",
  ctaBullets: ["Compare survey teams by scope and deliverables", "Confirm realistic turnaround times before tender", "Book local specialists for your project type"],
  faqs: [
    {
      question: "Do surveying companies price by day rate or fixed scope?",
      answer: "Both are common. Many firms provide fixed prices where scope and outputs are clearly defined.",
    },
    {
      question: "Why does utility survey pricing vary so much?",
      answer: "Complexity changes with congestion, access, and confidence level requirements for detected services.",
    },
    {
      question: "Should I request sample deliverables before appointing a surveyor?",
      answer: "Yes, reviewing sample outputs helps confirm drawing standards and data quality before you proceed.",
    },
  ] as CostFaq[],
};
