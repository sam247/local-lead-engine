import type { HubData, InfoPageData } from "engine";
import { guidesPages } from "@/data/guides";
import { foundationProblems } from "@/data/foundationProblems";
import { groundConditionsPages } from "@/data/groundConditionsPages";
import { groundworksCostsPages } from "@/data/groundworksCostsPages";
import { sitePreparationPages } from "@/data/sitePreparationPages";
import { drivewayGroundworksPages } from "@/data/drivewayGroundworksPages";
import { constructionDrainagePages } from "@/data/constructionDrainagePages";

// Company info – used by config and layout
export const companyInfo = {
  name: "Mainline Groundworks",
  phone: "+44 1865 537995",
  email: "info@mainlinegroundworks.co.uk",
  address: "128 City Road, London, EC1V 2NX",
  hours: "Mon–Fri 8am–6pm, Sat 9am–1pm",
  social: {
    linkedin: "#",
    twitter: "#",
    facebook: "#",
  },
};

// Services (order: high-intent / core first for footer and list slices)
export const services = [
  {
    id: "groundworks-contractors",
    slug: "groundworks-contractors",
    title: "Groundworks Contractors",
    titleSingular: "Groundworks Contractor",
    shortDescription: "Full-service groundworks for commercial and residential construction.",
    description: "We deliver complete groundworks packages including piling, excavation, site clearance, foundations and enabling works. From housing developments to commercial and industrial projects across the UK.",
    benefits: ["Single point of contact for all groundworks", "Programme-driven delivery", "Fully insured and accredited", "Experienced teams and plant", "Quality assured work"],
    process: ["Site assessment and design coordination", "Setting out and excavation", "Piling and foundations as required", "Utilities and services", "Reinstatement and handover"],
    icon: "Shovel",
  },
  {
    id: "underpinning",
    slug: "underpinning",
    title: "Underpinning Contractors",
    titleSingular: "Underpinning Contractor",
    shortDescription: "Stabilise and strengthen existing foundations for movement, subsidence or structural upgrades.",
    description:
      "Underpinning deepens or widens existing foundations so the structure is supported where the ground or loading has changed. We work where there is structural movement, subsidence, or when you need to strengthen or extend foundations for alterations. Everything follows structural design with controlled sequencing and handover records.",
    benefits: [
      "Stabilises existing structures",
      "Suitable for extensions and structural changes",
      "Addresses foundation movement issues",
    ],
    process: [
      "Site assessment",
      "Structural evaluation",
      "Excavation and preparation",
      "Underpinning installation",
      "Structural stabilisation",
    ],
    icon: "Anchor",
  },
  {
    id: "piling-contractors",
    slug: "piling-contractors",
    title: "Piling Contractors",
    titleSingular: "Piling Contractor",
    shortDescription: "Piling for new builds, extensions and structural works on difficult or tight sites.",
    description:
      "Piling solutions for residential and commercial projects, including new builds, extensions and structural works. We choose approaches around ground conditions, access constraints and what the structure needs — not a one-size-fits-all rig on every job.",
    benefits: ["Handles complex soil conditions", "Suitable for restricted access", "Tailored foundation solutions"],
    process: ["Site assessment", "Method selection", "Installation", "Structural integration"],
    icon: "Layers",
  },
  {
    id: "cfa-piling",
    slug: "cfa-piling",
    title: "CFA Piling Contractors",
    titleSingular: "CFA Piling Contractor",
    shortDescription: "CFA piling for restricted sites and low-vibration urban work.",
    description:
      "Continuous Flight Auger (CFA) piling drills a bore and pumps concrete as the auger is withdrawn, forming a cast-in-place pile with low spoil and controlled vibration. It suits restricted sites, low-vibration environments and typical urban builds where neighbours and access matter.",
    benefits: ["Low noise and low vibration", "Ideal for urban environments", "Efficient installation"],
    process: ["Site assessment", "Auger drilling", "Concrete injection", "Reinforcement placement"],
    icon: "Drill",
  },
  {
    id: "mini-piling-contractors",
    slug: "mini-piling-contractors",
    title: "Mini Piling Contractors",
    titleSingular: "Mini Piling Contractor",
    shortDescription: "Section piles and CFA mini piling for low headroom and tight sites.",
    description: "Mini piling is ideal where access is limited or headroom is low. We install section piles and CFA mini piles for extensions, basements and constrained sites.",
    benefits: ["Low headroom capability", "Minimal spoil", "Quick to install", "Suitable for domestic and commercial", "Reduced disruption"],
    process: ["Site survey and access check", "Pile design and layout", "Installation with mini piling rig", "Pile caps and ground beams", "Testing and records"],
    icon: "CircleDot",
  },
  {
    id: "foundation-contractors",
    slug: "foundation-contractors",
    title: "Foundation Contractors",
    titleSingular: "Foundation Contractor",
    shortDescription: "Strip, pad, raft and piled foundations for all building types.",
    description: "We design and build strip foundations, pad foundations, raft foundations and piled foundations for housing, commercial and industrial projects.",
    benefits: ["Design or design-and-build", "All foundation types", "Engineered solutions", "Programme certainty", "Quality and compliance"],
    process: ["Ground review and design", "Setting out and excavation", "Reinforcement and concrete", "Curing and protection", "Handover and as-built"],
    icon: "Building2",
  },
  {
    id: "foundation-repair",
    slug: "foundation-repair",
    title: "Foundation Repair",
    titleSingular: "Foundation Repair",
    shortDescription: "Repair and stabilisation where foundations have failed, cracked or moved.",
    description:
      "Foundation issues show up as movement, cracking or loss of support. We work from investigation and structural input to repair, rebuild or stabilise foundation elements so loads are carried correctly again. Scopes are defined around the defect, not generic make-good.",
    benefits: ["Targets the real defect", "Aligned with structural design", "Clear reinstatement and records"],
    process: ["Assessment of movement and damage", "Engineer-led repair specification", "Break out and preparation", "Repair and stabilisation works", "Protection and handover"],
    icon: "Warehouse",
  },
  {
    id: "concrete-repair",
    slug: "concrete-repair",
    title: "Concrete Repair",
    titleSingular: "Concrete Repair",
    shortDescription: "Structural and non-structural concrete repairs for slabs, beams and elements.",
    description:
      "Spalled, cracked or carbonated concrete needs proper prep and compatible materials. We remove unsound concrete, treat reinforcement where specified and reinstate to a defined repair detail so performance and fire cover are maintained.",
    benefits: ["Repairs to specification", "Suitable for structural and facing concrete", "Documented quality"],
    process: ["Assessment and marking up", "Break out and substrate preparation", "Reinstatement and finishing", "Curing and records"],
    icon: "BrickWall",
  },
  {
    id: "excavation-contractors",
    slug: "excavation-contractors",
    title: "Excavation Contractors",
    titleSingular: "Excavation Contractor",
    shortDescription: "Bulk excavation, strip excavation and trenching for construction.",
    description: "We carry out bulk excavation, strip excavation and trenching for foundations, utility runs and structural formations. Machine and hand dig to programme with proper support and reinstatement.",
    benefits: ["Programme-led excavation", "Support and temporary works", "Spoil management", "Quality formation levels", "Safe working practices"],
    process: ["Setting out and levels", "Excavation to design", "Support and edge protection", "Formation preparation", "Backfill and compaction"],
    icon: "Mountain",
  },
  {
    id: "site-clearance-contractors",
    slug: "site-clearance-contractors",
    title: "Site Clearance Contractors",
    titleSingular: "Site Clearance Contractor",
    shortDescription: "Vegetation clearance, demolition and waste removal to prepare sites.",
    description: "We clear sites for development: vegetation, structures, hardstanding and arisings. Waste is removed and disposed of responsibly with documentation.",
    benefits: ["Full site strip capability", "Waste removed and recycled where possible", "Safe demolition and clearance", "Site ready for groundworks", "Documented disposal"],
    process: ["Site survey and scope", "Clearance and demolition", "Vegetation and topsoil strip", "Waste removal and tickets", "Handover of clear site"],
    icon: "TreePine",
  },
  {
    id: "concrete-foundations",
    slug: "concrete-foundations",
    title: "Concrete Foundations",
    titleSingular: "Concrete Foundation",
    shortDescription: "Reinforced and mass concrete foundations and ground beams.",
    description: "We supply and place reinforced concrete foundations, mass concrete, blinding and ground beams. All work to specification with testing and records.",
    benefits: ["Reinforced and mass concrete", "Blinding and ground beams", "Quality concrete supply", "Testing and cube records", "Smooth handover"],
    process: ["Formation preparation", "Reinforcement fixing", "Concrete order and pour", "Curing and protection", "Testing and documentation"],
    icon: "Box",
  },
  {
    id: "enabling-works-contractors",
    slug: "enabling-works-contractors",
    title: "Enabling Works Contractors",
    titleSingular: "Enabling Works Contractor",
    shortDescription: "Access roads, temporary drainage and site set-up before main works.",
    description: "Enabling works prepare the site for main construction: access roads, temporary drainage, fencing, hoardings and temporary services so the project can start on programme.",
    benefits: ["Site access and logistics", "Temporary drainage and services", "Fencing and security", "Early programme certainty", "Main contractor ready"],
    process: ["Site logistics plan", "Access and hardstanding", "Temporary drainage", "Fencing and hoardings", "Handover to main works"],
    icon: "HardHat",
  },
];

// Locations: single source of truth in engine; do not redefine in verticals.
import { locations } from "../../../engine/data/locations";
export { locations };

// Level 2 = service hubs (/services, /services/[slug]). Level 3 = topic hubs (e.g. /foundation-problems, /ground-conditions). Level 4 = service×location (/[serviceSlug]/[locationId]).
export const hubPages: HubData[] = [
  {
    category: "guides",
    basePath: "/guides",
    title: "Groundworks Guides",
    subtitle: "Costs, processes and advice for piling, foundations, excavation and site preparation.",
    metaDescription:
      "Expert guides on piling costs, foundation types, excavation, site clearance and enabling works. UK groundworks advice from Mainline Groundworks.",
  },
  {
    category: "foundation-problems",
    basePath: "/foundation-problems",
    title: "Foundation Problems",
    subtitle: "Subsidence, cracking and inadequate design — causes and how we fix them.",
    metaDescription: "Foundation problems: subsidence, cracking, inadequate design. Expert diagnosis and repair from Mainline Groundworks.",
  },
  {
    category: "ground-conditions",
    basePath: "/ground-conditions",
    title: "Ground Conditions",
    subtitle: "Made ground, soft soils and when piling is needed.",
    metaDescription: "Ground conditions for construction: made ground, soft soils, when piling is needed. UK groundworks advice from Mainline Groundworks.",
  },
  {
    category: "groundworks-costs",
    basePath: "/groundworks-costs",
    title: "Groundworks Costs",
    subtitle: "Cost overview and budgeting for piling, foundations and site preparation.",
    metaDescription: "Groundworks costs: piling, foundations, excavation and site clearance. Cost overview from Mainline Groundworks.",
  },
  {
    category: "site-preparation",
    basePath: "/site-preparation",
    title: "Site Preparation",
    subtitle: "Surveys, clearance and enabling works before main construction.",
    metaDescription: "Site preparation for construction: surveys, clearance, enabling works. UK guide from Mainline Groundworks.",
  },
  {
    category: "driveway-groundworks",
    basePath: "/driveway-groundworks",
    title: "Driveway Groundworks",
    subtitle: "Sub-base, drainage and construction for domestic driveways.",
    metaDescription: "Driveway groundworks: sub-base, drainage and construction. Domestic driveway advice from Mainline Groundworks.",
  },
  {
    category: "construction-drainage",
    basePath: "/construction-drainage",
    title: "Construction Drainage",
    subtitle: "Build-over, connections and drainage surveys for construction.",
    metaDescription: "Construction drainage: build-over agreements, connections and surveys. UK guide from Mainline Groundworks.",
  },
];

function problemDataToInfoPageData(p: {
  slug: string;
  title: string;
  causes: string;
  howFixed: string;
  whenToCall: string;
  ctaMessage: string;
  relatedServiceSlugs: string[];
}): InfoPageData {
  return {
    slug: p.slug,
    title: p.title,
    metaDescription: p.causes.slice(0, 155) + (p.causes.length > 155 ? "..." : ""),
    intro: p.causes,
    signs: [],
    diagnosis: p.howFixed,
    resolution: p.whenToCall,
    ctaText: p.ctaMessage,
    relatedServices: p.relatedServiceSlugs,
  };
}

export const getCategoryPages = (category: string): InfoPageData[] => {
  switch (category) {
    case "guides":
      return guidesPages;
    case "foundation-problems":
      return foundationProblems.map(problemDataToInfoPageData);
    case "ground-conditions":
      return groundConditionsPages;
    case "groundworks-costs":
      return groundworksCostsPages;
    case "site-preparation":
      return sitePreparationPages;
    case "driveway-groundworks":
      return drivewayGroundworksPages;
    case "construction-drainage":
      return constructionDrainagePages;
    default:
      return [];
  }
};

export const getHubData = (category: string): HubData | undefined => {
  return hubPages.find((h) => h.category === category);
};

const GROUNDWORKS_SERVICE_TO_TOPIC_CATEGORIES: Record<string, string[]> = {
  "foundation-contractors": ["foundation-problems", "ground-conditions", "groundworks-costs"],
  "groundworks-contractors": ["groundworks-costs", "site-preparation", "guides"],
  "piling-contractors": ["ground-conditions", "groundworks-costs", "guides"],
  "cfa-piling": ["ground-conditions", "groundworks-costs", "guides"],
  "mini-piling-contractors": ["ground-conditions", "groundworks-costs", "guides"],
  "underpinning": ["foundation-problems", "groundworks-costs", "guides"],
  "foundation-repair": ["foundation-problems", "groundworks-costs", "guides"],
  "concrete-repair": ["foundation-problems", "groundworks-costs", "guides"],
  "excavation-contractors": ["site-preparation", "groundworks-costs", "guides"],
  "site-clearance-contractors": ["site-preparation", "groundworks-costs"],
  "concrete-foundations": ["foundation-problems", "ground-conditions", "groundworks-costs"],
  "enabling-works-contractors": ["site-preparation", "construction-drainage", "guides"],
};

const MAX_TOPIC_LINKS = 6;
const MAX_PER_CATEGORY = 2;

export function getRelevantTopicsForService(serviceSlug: string): { title: string; href: string }[] {
  const categories = GROUNDWORKS_SERVICE_TO_TOPIC_CATEGORIES[serviceSlug];
  if (!categories?.length) return [];
  const out: { title: string; href: string }[] = [];
  for (const category of categories) {
    const hub = getHubData(category);
    const pages = getCategoryPages(category);
    if (!hub || !pages.length) continue;
    const taken = pages.slice(0, MAX_PER_CATEGORY);
    for (const page of taken) {
      out.push({ title: page.title, href: `${hub.basePath}/${page.slug}` });
      if (out.length >= MAX_TOPIC_LINKS) return out;
    }
  }
  return out;
}

export const stats: { value: string; label: string }[] = [
  { value: "500+", label: "Projects Completed" },
  { value: "25+", label: "Years Experience" },
  { value: "UK-wide", label: "Coverage" },
  { value: "100%", label: "Client Focus" },
];

export const testimonials: { quote: string; author: string; role: string; company: string }[] = [
  { quote: "Mainline Groundworks delivered our piling and foundations on programme. Professional and easy to work with.", author: "David M.", role: "Project Manager", company: "Birmingham" },
  { quote: "Site clearance and enabling works were completed ahead of schedule. We use them on every project now.", author: "Sarah L.", role: "Developer", company: "Manchester" },
  { quote: "Mini piling in a tight access site — no issues. Clear communication and proper certification.", author: "James K.", role: "Contractor", company: "Leeds" },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "What groundworks services do you offer?",
    answer:
      "We offer piling (including CFA and mini piling), underpinning, foundation repair, concrete repair, excavation, site clearance, new foundations, concrete foundations and enabling works for commercial and residential projects across the UK.",
  },
  {
    question: "Do you work on housing developments?",
    answer:
      "Yes. We deliver groundworks packages for housing developments including site clearance, excavation, piling, underpinning, strip and raft foundations, and utility and service connections where required.",
  },
  { question: "How do I get a quote?", answer: "Contact us with your site address, project type and any drawings or specifications. We will arrange a site visit and provide a detailed quote." },
  { question: "What areas do you cover?", answer: "We operate across the UK including London, Birmingham, Manchester, Leeds, Bristol and many other towns and cities. Contact us to confirm coverage for your area." },
  { question: "Do you need a survey before groundworks?", answer: "Many projects benefit from a topographical or utility survey before groundworks to map the site and avoid clashes. We can work with your surveyor or recommend one." },
];

export const blogPosts: Array<{ id: string; title: string; excerpt: string; date: string; image: string; imagePrompt?: string; category: string }> = [];

export const whyChooseUs: { title: string; description: string; icon: string }[] = [
  { title: "Experienced Teams", description: "Qualified operatives and modern plant for piling, excavation and foundations across the UK.", icon: "Users" },
  { title: "Programme Led", description: "We work to your programme with clear planning and communication from start to finish.", icon: "Calendar" },
  { title: "Fully Insured", description: "Comprehensive insurance and accreditation so your project is in safe hands.", icon: "Shield" },
  { title: "Quality Assured", description: "Testing, certification and handover documentation for every project.", icon: "CheckCircle" },
];

function buildRelatedGuideLinksByService(): Record<string, { slug: string; path: string; title: string }[]> {
  const map: Record<string, { slug: string; path: string; title: string }[]> = {};
  const serviceToGuides: Record<string, string[]> = {
    "groundworks-contractors": ["groundworks-process", "construction-site-preparation", "what-are-enabling-works"],
    "piling-contractors": ["piling-cost", "types-of-piling", "when-is-piling-required"],
    "cfa-piling": ["types-of-piling", "piling-cost", "when-is-piling-required"],
    "mini-piling-contractors": ["mini-piling-cost", "types-of-piling", "when-is-piling-required"],
    "underpinning": ["foundation-cost", "groundworks-process", "types-of-piling"],
    "foundation-repair": ["foundation-cost", "groundworks-process", "concrete-foundations-cost"],
    "concrete-repair": ["concrete-foundations-cost", "foundation-cost", "groundworks-process"],
    "excavation-contractors": ["excavation-cost", "groundworks-process"],
    "site-clearance-contractors": ["site-clearance-cost", "construction-site-preparation"],
    "foundation-contractors": ["foundation-cost", "groundworks-process", "concrete-foundations-cost"],
    "concrete-foundations": ["concrete-foundations-cost", "foundation-cost"],
    "enabling-works-contractors": ["what-are-enabling-works", "construction-site-preparation"],
  };
  for (const [slug, guideSlugs] of Object.entries(serviceToGuides)) {
    map[slug] = guideSlugs
      .filter((s) => guidesPages.some((g) => g.slug === s))
      .map((s) => {
        const g = guidesPages.find((p) => p.slug === s);
        return g ? { slug: g.slug, path: `/guides/${g.slug}`, title: g.title } : null;
      })
      .filter((x): x is { slug: string; path: string; title: string } => x !== null);
  }
  return map;
}

export const relatedGuideLinksByService = buildRelatedGuideLinksByService();

export const serviceFaqsBySlug: Record<string, { question: string; answer: string }[]> = {
  "groundworks-contractors": [
    {
      question: "What is included in a groundworks package?",
      answer:
        "A full groundworks package typically includes site clearance, excavation, piling or foundations, utility and service runs, and enabling works such as access and temporary site services. We tailor the scope to your project.",
    },
  ],
  "piling-contractors": [
    { question: "When is piling required?", answer: "Piling is required when the ground cannot support conventional strip or pad foundations — for example on made ground, soft soils or where loads are high. A structural engineer will specify piling from the ground investigation." },
  ],
  "mini-piling-contractors": [
    { question: "What is mini piling?", answer: "Mini piling uses smaller rigs and section or CFA piles, ideal for low headroom, tight access or domestic projects. It provides the same load-bearing function as conventional piling where space is limited." },
  ],
  "excavation-contractors": [
    { question: "How deep can you excavate?", answer: "We carry out excavation to the depths required by your design, with appropriate support and edge protection. Bulk, strip and trench excavation are all within our capability." },
  ],
  "site-clearance-contractors": [
    { question: "Do you remove trees?", answer: "We can clear vegetation and remove trees as part of site clearance where required, subject to any tree preservation orders or planning conditions. We advise checking with your planning consultant first." },
  ],
  "foundation-contractors": [
    { question: "What types of foundations do you build?", answer: "We build strip foundations, pad foundations, raft foundations and piled foundations. The type is determined by the structural engineer and ground conditions." },
  ],
  "concrete-foundations": [
    { question: "Do you supply concrete?", answer: "Yes. We arrange quality-assured concrete supply and place reinforced and mass concrete for foundations, ground beams and blinding." },
  ],
  "enabling-works-contractors": [
    { question: "What are enabling works?", answer: "Enabling works prepare the site for main construction: access roads, temporary drainage, fencing, hoardings and temporary services so that the main contractor can start on programme." },
  ],
  "cfa-piling": [
    {
      question: "When is CFA piling used?",
      answer:
        "CFA piling is often chosen on urban or noise-sensitive sites and where vibration must be kept down. Your structural engineer will confirm it suits the loads and ground model for your project.",
    },
  ],
  underpinning: [
    {
      question: "Do I need underpinning or foundation repair?",
      answer:
        "Underpinning usually means extending or deepening foundations to stabilise the building. Foundation repair can cover localised fixes. A structural engineer defines the right method after assessment.",
    },
  ],
  "foundation-repair": [
    {
      question: "Can you work from a structural engineer's report?",
      answer: "Yes. We scope and price from engineer drawings and specifications, and agree sequencing and protection before work starts.",
    },
  ],
  "concrete-repair": [
    {
      question: "What concrete repairs do you take on?",
      answer: "We repair spalled, cracked and specified structural concrete elements, including prep, reinforcement treatment where required, and reinstatement to the agreed detail.",
    },
  ],
};

export const guidesIndexFeatured: { title: string; description: string; href: string; iconKey: "BookOpen" | "HelpCircle" }[] = [
  { title: "Piling cost guide", description: "What affects piling costs and how to budget.", href: "/guides/piling-cost", iconKey: "BookOpen" },
  { title: "Foundation costs", description: "Strip, pad, raft and piled foundation costs.", href: "/guides/foundation-cost", iconKey: "BookOpen" },
  { title: "Groundworks process", description: "How a typical groundworks project runs.", href: "/guides/groundworks-process", iconKey: "HelpCircle" },
];

export const guidesIndexNearMe: { title: string; href: string }[] = locations.slice(0, 8).map((loc) => ({
  title: `Groundworks in ${loc.name}`,
  href: `/groundworks-contractors/${loc.id}`,
}));

export const categoryAltText: Record<string, string> = {
  guides: "Groundworks guides and cost advice",
  "foundation-problems": "Foundation problems and repair",
  "ground-conditions": "Ground conditions for construction",
  "groundworks-costs": "Groundworks cost guides",
  "site-preparation": "Site preparation and enabling works",
  "driveway-groundworks": "Driveway groundworks",
  "construction-drainage": "Construction drainage",
};

export const categoryImages: Record<string, string> = {
  guides: "groundworks-contractors",
  "foundation-problems": "foundation-contractors",
  "ground-conditions": "piling-contractors",
  "groundworks-costs": "groundworks-contractors",
  "site-preparation": "site-clearance-contractors",
  "driveway-groundworks": "groundworks-contractors",
  "construction-drainage": "excavation-contractors",
};
