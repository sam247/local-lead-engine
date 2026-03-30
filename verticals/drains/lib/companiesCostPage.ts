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
const PREFERRED_SERVICE_SLUGS = ["drain-unblocking", "cctv-drain-surveys", "drain-relining", "drain-collapse-repair"] as const;

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
  titleEntity: "Drainage",
  h1: "How Much Do Drainage Companies Cost in the UK?",
  intro:
    "Drainage company costs usually depend on access, urgency, and the repair method needed. Minor unblocking can be priced quickly, while collapsed drains or relining projects need site-specific quotes from local contractors.",
  typicalCostsTitle: "Typical costs",
  typicalCosts: [
    { label: "Small jobs", range: "GBP150 to GBP450", description: "Simple unblocking, short jetting visits, and minor call-outs during normal hours." },
    { label: "Medium jobs", range: "GBP600 to GBP2,000", description: "CCTV diagnosis, planned relining sections, and repeat visits where access is straightforward." },
    { label: "Large projects", range: "GBP2,500+", description: "Excavation-led repairs, collapsed drain sections, reinstatement, and complex multi-point failures." },
  ] as CostBand[],
  costFactorsTitle: "What affects drainage company cost",
  costFactors: ["Location and travel coverage", "Access constraints and site conditions", "Scale of repair and pipe length", "Urgency and out-of-hours response", "Materials, liner systems, and specialist equipment"],
  exampleJobsTitle: "Example jobs",
  exampleJobs: [
    { title: "Emergency drain unblocking in London", range: "GBP180 to GBP420" },
    { title: "CCTV drain survey for recurring blockage in Manchester", range: "GBP250 to GBP650" },
    { title: "Drain relining for cracked section in Birmingham", range: "GBP900 to GBP2,400" },
  ] as ExampleJob[],
  quotesTitle: "When to get quotes",
  quotesBody:
    "Drainage estimates vary because underlying defects are often only confirmed after inspection. Getting at least two or three quotes helps you compare method, scope, and reinstatement details, not just headline price.",
  ctaTitle: "Get quotes from vetted drainage contractors near you",
  ctaBullets: ["Compare local contractors who cover your postcode", "Get pricing matched to your site conditions", "Move from diagnosis to booked works faster"],
  faqs: [
    {
      question: "Do drainage companies charge more for emergency callouts?",
      answer: "Yes, urgent and out-of-hours attendance is usually priced higher than planned weekday appointments.",
    },
    {
      question: "Is a CCTV survey worth doing before major repairs?",
      answer: "In most cases yes, because it confirms fault location and reduces the risk of pricing the wrong repair method.",
    },
    {
      question: "Should I compare like-for-like scope when reviewing quotes?",
      answer: "Always. Confirm whether excavation, reinstatement, waste disposal, and follow-up checks are included.",
    },
  ] as CostFaq[],
};
