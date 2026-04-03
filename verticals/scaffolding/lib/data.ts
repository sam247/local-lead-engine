import type { HubData, InfoPageData } from "engine";
import { guidesPages } from "@/data/guides";
import { safetyPages } from "@/data/safetyPages";
import { costsPages } from "@/data/costsPages";

// Company info – used by config and layout
export const companyInfo = {
  name: "Mainline Scaffold",
  phone: "+44 1865 537996",
  email: "info@mainlinescaffold.co.uk",
  address: "128 City Road, London, EC1V 2NX",
  hours: "Mon–Fri 7am–6pm, Sat 8am–1pm",
  social: {
    linkedin: "#",
    twitter: "#",
    facebook: "#",
  },
};

// Services (order: high-intent / core first for footer and list slices)
export const services = [
  {
    id: "scaffolding-contractors",
    slug: "scaffolding-contractors",
    title: "Scaffolding Contractors",
    titleSingular: "Scaffolding Contractor",
    shortDescription: "Full-service scaffolding for domestic and commercial projects across the UK.",
    description:
      "We deliver complete scaffolding packages for new builds, refurbishments, maintenance works and emergency access. From domestic house scaffolding to multi-storey commercial facade access, our teams erect, inspect and strike safe, compliant structures to programme.",
    benefits: [
      "NASC accredited and fully insured",
      "Design and erect capability",
      "TG20 compliance on every structure",
      "Scaffold tags and inspection records as standard",
      "Handover certificates on completion",
    ],
    process: [
      "Site survey and structural design",
      "Erection to drawing and specification",
      "Scaffold tagging and documented inspection",
      "Adaptation and re-inspection during works",
      "Strike and site clearance on completion",
    ],
    whenNeeded:
      "Scaffolding is required whenever workers need safe, stable access to areas that cannot be reached from ground level — including roofs, facades, chimneys and upper floors.",
    workInvolves:
      "We design, erect, inspect and maintain scaffolding structures. Work includes tube and fitting, system scaffold and bespoke access solutions for residential and commercial clients.",
    icon: "HardHat",
  },
  {
    id: "domestic-scaffolding",
    slug: "domestic-scaffolding",
    title: "Domestic Scaffolding",
    titleSingular: "Domestic Scaffolding",
    shortDescription: "Safe, NASC-compliant scaffolding for house extensions, roofing and refurbishment works.",
    description:
      "Domestic scaffolding provides the platform for roof repairs, extensions, chimney works, window replacements and external maintenance on houses and flats. We erect and inspect all domestic scaffold structures and provide full handover certificates to homeowners and their contractors.",
    benefits: [
      "Suitable for all house types including terraced, semi-detached and detached",
      "Quick erection — typically one to two days",
      "Fully tagged and certified",
      "We work alongside your chosen builder or roofer",
      "Adaptable during the course of works",
    ],
    process: [
      "Site survey and access assessment",
      "Scaffold design and material selection",
      "Erection by trained operatives",
      "Pre-use inspection and tagging",
      "Adaptation if scope changes during works",
      "Strike and waste removal on completion",
    ],
    whenNeeded:
      "You need domestic scaffolding when your builder, roofer or maintenance contractor requires safe access above ground level — including for extensions, reroof works, chimney repairs and external rendering.",
    workInvolves:
      "We install house scaffolding structures to TG20 standards, issue scaffold tags and inspection records, and liaise with your tradespeople during the project.",
    icon: "Home",
  },
  {
    id: "commercial-scaffolding",
    slug: "commercial-scaffolding",
    title: "Commercial Scaffolding",
    titleSingular: "Commercial Scaffolding",
    shortDescription: "Multi-level access scaffolding for commercial buildings, facades and industrial sites.",
    description:
      "Commercial scaffolding supports maintenance contracts, facade refurbishments, industrial access and new-build construction. We provide bespoke scaffold designs for complex structures, provide documented inspection regimes and can manage scaffolding requirements for the duration of your contract.",
    benefits: [
      "Bespoke designs for complex facades and structures",
      "Documented inspection regime throughout",
      "Suitable for occupied buildings",
      "Minimum disruption to occupants and operations",
      "Programme-led delivery",
    ],
    process: [
      "Brief review and design sign-off",
      "Logistics and access planning",
      "Erection with minimum operational disruption",
      "Regular inspection and scaffold management",
      "Strike phased to programme",
    ],
    whenNeeded:
      "Commercial scaffolding is needed for facade maintenance, window and cladding replacement, flat and pitched roof access, and industrial maintenance where access platforms cannot be provided by mobile equipment alone.",
    workInvolves:
      "We design and erect multi-level scaffold systems, provide scaffold management services throughout the contract period, and issue full documentation on completion.",
    icon: "Building2",
  },
  {
    id: "roof-scaffolding",
    slug: "roof-scaffolding",
    title: "Roof Scaffolding",
    titleSingular: "Roof Scaffolding",
    shortDescription: "Safe access scaffolding for pitched and flat roof works on domestic and commercial buildings.",
    description:
      "Roof scaffolding provides safe working platforms for roofers carrying out repairs, replacements and new-build roofing. We erect scaffold structures that give safe edge protection and access to pitched and flat roofs, including valleys, dormers and skylights.",
    benefits: [
      "Full edge protection to current standards",
      "Suitable for pitched, flat and complex roof profiles",
      "Works alongside any roofing contractor",
      "Scaffold tags and inspection certification",
      "Temporary roofing available if required",
    ],
    process: [
      "Roof survey and scaffold design",
      "Foundation and base plate assessment",
      "Erection with edge protection",
      "Tagging and pre-use inspection",
      "Strike on roofing completion",
    ],
    whenNeeded:
      "Roof scaffolding is required for any roofing work where the roofer cannot work safely from ladders or access equipment alone — typically full reroof, large repairs, ridge and hip work, and skylight installation.",
    workInvolves:
      "We erect scaffold structures that provide safe access to all roof elevations and ridge lines, with edge protection, toe boards and loading bays as required by the scope of roofing works.",
    icon: "Triangle",
  },
  {
    id: "temporary-roofing",
    slug: "temporary-roofing",
    title: "Temporary Roofing",
    titleSingular: "Temporary Roofing",
    shortDescription: "Weatherproof temporary roof systems to protect buildings during major roof repairs and replacements.",
    description:
      "Temporary roofing provides a weathertight covering over an existing building when the permanent roof is stripped or unavailable during major works. We design and install temporary roof systems that allow roofing, structural and internal works to proceed in any weather conditions.",
    benefits: [
      "Fully weathertight for UK conditions",
      "Works can continue regardless of weather",
      "Protects building contents and structure",
      "Can span large roof profiles",
      "Integrated with scaffold structure",
    ],
    process: [
      "Structural assessment of existing roof",
      "Temporary roof design and load calculation",
      "Scaffold substructure erection",
      "Sheeting and weather protection installation",
      "Maintenance during works",
      "Strike on permanent roof completion",
    ],
    whenNeeded:
      "Temporary roofing is required when major roof works — including full strip and replacement, structural repairs or rafter replacement — will leave the building exposed for an extended period.",
    workInvolves:
      "We provide integrated scaffold and temporary roof packages, including structural sheeted roofs and proprietary temporary roof systems, all designed and inspected to current standards.",
    icon: "Cloud",
  },
  {
    id: "access-scaffolding",
    slug: "access-scaffolding",
    title: "Access Scaffolding",
    titleSingular: "Access Scaffolding",
    shortDescription: "Purpose-built scaffold access solutions including stair towers, birdcage and loading platforms.",
    description:
      "Access scaffolding covers a range of purpose-built structures beyond standard facade scaffold, including internal birdcage scaffolding for ceiling and roof work, stair towers for safe vertical access, and loading platforms for materials. We design solutions around your specific access requirements.",
    benefits: [
      "Bespoke design for unusual access requirements",
      "Internal and external access solutions",
      "Heavy loading platforms where required",
      "Integrated with existing scaffold structures",
      "Compliant with all working at height regulations",
    ],
    process: [
      "Access requirement review",
      "Structure design and load assessment",
      "Erection and inspection",
      "Loading bay and platform commissioning",
      "Integration with wider scaffold programme",
    ],
    whenNeeded:
      "Access scaffolding is needed when standard ladder or mobile access equipment cannot safely support the works — particularly for internal ceiling works, high-volume material movement, and complex multi-level access requirements.",
    workInvolves:
      "We design and build specialist access structures including birdcage scaffolding for internal works, stair access towers, cantilever and loading platforms, all compliant with working at height legislation.",
    icon: "Layers",
  },
  {
    id: "scaffolding-hire",
    slug: "scaffolding-hire",
    title: "Scaffolding Hire",
    titleSingular: "Scaffolding Hire",
    shortDescription: "Scaffold system and tube-and-fitting hire with delivery and collection.",
    description:
      "We supply scaffold systems, tube and fitting, boards, base plates and accessories for hire to qualified contractors who erect their own scaffolding. Hire packages are available on flexible terms with delivery and collection. All equipment is inspected, load-tested and compliant with current standards.",
    benefits: [
      "Clean, inspected equipment to BS standards",
      "Flexible hire periods",
      "Delivery and collection included",
      "Technical advice on quantities and configurations",
      "Rapid replacement of components if required",
    ],
    process: [
      "Scope and quantity assessment",
      "Equipment inspection and preparation",
      "Delivery to site",
      "Collection on completion",
      "Condition report on return",
    ],
    whenNeeded:
      "Scaffolding hire suits qualified scaffolding contractors and construction companies who supply their own labour but need to supplement their equipment pool for specific contracts.",
    workInvolves:
      "We manage inspection, preparation, delivery and collection of scaffold equipment including tube and fitting, system boards, standards, ledgers, base plates and safety accessories.",
    icon: "Package",
  },
  {
    id: "emergency-scaffolding",
    slug: "emergency-scaffolding",
    title: "Emergency Scaffolding",
    titleSingular: "Emergency Scaffolding",
    shortDescription: "24/7 emergency scaffold erection for storm damage, structural failures and insurance claims.",
    description:
      "We provide rapid-response emergency scaffolding for storm damage, structural movement, fire and flood incidents, and other situations requiring immediate access or propping. Our teams mobilise around the clock and work directly with insurers, loss adjusters and emergency contractors.",
    benefits: [
      "24/7 callout — including weekends and bank holidays",
      "Rapid mobilisation, typically within hours",
      "Experience working with insurers and loss adjusters",
      "Temporary propping and shoring capability",
      "Documentation and site reports provided",
    ],
    process: [
      "Emergency call received and assessed",
      "Team mobilised to site",
      "Hazard isolation and access provided",
      "Temporary propping or protection installed",
      "Full scaffold erected and certified",
      "Detailed site and cost report for insurers",
    ],
    whenNeeded:
      "Emergency scaffolding is needed following storm damage to roofs, structural movement, fire and flood events, or any situation where immediate safe access is required to protect the building or occupants.",
    workInvolves:
      "We provide emergency scaffold erection, temporary propping and structural protection, working alongside emergency services, loss adjusters and repair contractors.",
    icon: "Zap",
  },
  {
    id: "chimney-scaffolding",
    slug: "chimney-scaffolding",
    title: "Chimney Scaffolding",
    titleSingular: "Chimney Scaffolding",
    shortDescription: "Specialist chimney-head and chimney breast scaffolding for repairs, repointing and stack replacement.",
    description:
      "Chimney scaffolding is a specialist requirement that demands careful design to reach chimney heads, stacks and pots safely without overloading the roof structure. We provide chimney scaffolding for repointing, flaunching, lead flashing, pot and cowl replacement, and full chimney rebuilds on all property types.",
    benefits: [
      "Specialist chimney scaffold designs",
      "Suitable for all chimney types — single stack, multiple stacks, breast and shared stacks",
      "Roof structure loading calculations provided",
      "Works alongside any chimney contractor",
      "Fast erection for small-scope chimney repairs",
    ],
    process: [
      "Chimney survey and access assessment",
      "Scaffold design accounting for roof loading",
      "Erection with minimal roof tile disturbance",
      "Inspection and scaffold tag issued",
      "Strike on completion of chimney works",
    ],
    whenNeeded:
      "Chimney scaffolding is needed for any works to a chimney stack, pot, flaunching or flashing that cannot safely be reached from a ladder — including repointing, lead work, liner installation and full chimney rebuilds.",
    workInvolves:
      "We erect chimney-specific scaffold structures that provide safe working platforms at chimney-head level, accounting for roof pitch, load distribution and access constraints for any chimney type.",
    icon: "Flame",
  },
];

// Locations: single source of truth in engine; do not redefine in verticals.
export { locations } from "../../../engine/data/locations";

// Hub pages for topic hubs (L3)
export const hubPages: HubData[] = [
  {
    category: "guides",
    basePath: "/scaffolding-guides",
    title: "Scaffolding Guides",
    subtitle: "Practical guides to scaffolding types, costs and what to expect.",
    metaDescription: "Scaffolding guides covering types of scaffold, domestic and commercial access, costs and safety — from Mainline Scaffold.",
  },
  {
    category: "safety",
    basePath: "/scaffold-safety-guides",
    title: "Scaffold Safety Guides",
    subtitle: "Safety standards, inspection requirements and compliance for scaffold users.",
    metaDescription: "Scaffold safety guides covering TG20, working at height regulations, inspection requirements and insurance-backed repairs — from Mainline Scaffold.",
  },
  {
    category: "costs",
    basePath: "/scaffolding-costs",
    title: "Scaffolding Costs",
    subtitle: "Cost guides for domestic, commercial and specialist scaffolding.",
    metaDescription: "Scaffolding cost guides — how much does scaffolding cost for roof works, extensions, chimney repairs and commercial maintenance? Mainline Scaffold.",
  },
];

export function getHubData(category: string): HubData | undefined {
  return hubPages.find((h) => h.category === category);
}

export function getCategoryPages(category: string): InfoPageData[] {
  switch (category) {
    case "guides":
      return guidesPages;
    case "safety":
      return safetyPages;
    case "costs":
      return costsPages;
    default:
      return [];
  }
}

// Service-to-topic category mapping for the "Helpful guidance" block on L4 pages
const SCAFFOLDING_SERVICE_TO_TOPIC_CATEGORIES: Record<string, string[]> = {
  "scaffolding-contractors": ["guides", "costs", "safety"],
  "domestic-scaffolding": ["guides", "costs", "safety"],
  "commercial-scaffolding": ["guides", "costs", "safety"],
  "roof-scaffolding": ["guides", "costs", "safety"],
  "temporary-roofing": ["safety", "guides", "costs"],
  "access-scaffolding": ["guides", "safety", "costs"],
  "scaffolding-hire": ["costs", "guides", "safety"],
  "emergency-scaffolding": ["safety", "guides", "costs"],
  "chimney-scaffolding": ["safety", "costs", "guides"],
};

const MAX_TOPIC_LINKS = 6;
const MAX_PER_CATEGORY = 2;

export function getRelevantTopicsForService(serviceSlug: string): { title: string; href: string }[] {
  const categories = SCAFFOLDING_SERVICE_TO_TOPIC_CATEGORIES[serviceSlug];
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

// Related services map – explicit for all 9 services (used on L4 pages)
export const RELATED_SERVICE_SLUGS_BY_SERVICE: Record<string, string[]> = {
  "scaffolding-contractors": [
    "domestic-scaffolding",
    "commercial-scaffolding",
    "roof-scaffolding",
    "access-scaffolding",
    "emergency-scaffolding",
  ],
  "domestic-scaffolding": [
    "roof-scaffolding",
    "chimney-scaffolding",
    "access-scaffolding",
    "scaffolding-hire",
    "scaffolding-contractors",
  ],
  "commercial-scaffolding": [
    "scaffolding-contractors",
    "access-scaffolding",
    "temporary-roofing",
    "emergency-scaffolding",
    "scaffolding-hire",
  ],
  "roof-scaffolding": [
    "domestic-scaffolding",
    "chimney-scaffolding",
    "temporary-roofing",
    "access-scaffolding",
    "scaffolding-contractors",
  ],
  "temporary-roofing": [
    "roof-scaffolding",
    "emergency-scaffolding",
    "commercial-scaffolding",
    "scaffolding-contractors",
    "access-scaffolding",
  ],
  "access-scaffolding": [
    "scaffolding-contractors",
    "commercial-scaffolding",
    "scaffolding-hire",
    "domestic-scaffolding",
    "emergency-scaffolding",
  ],
  "scaffolding-hire": [
    "scaffolding-contractors",
    "access-scaffolding",
    "domestic-scaffolding",
    "commercial-scaffolding",
    "temporary-roofing",
  ],
  "emergency-scaffolding": [
    "scaffolding-contractors",
    "temporary-roofing",
    "roof-scaffolding",
    "commercial-scaffolding",
    "access-scaffolding",
  ],
  "chimney-scaffolding": [
    "roof-scaffolding",
    "domestic-scaffolding",
    "access-scaffolding",
    "scaffolding-contractors",
    "scaffolding-hire",
  ],
};

// Category images for InfoPage hero resolution
export const categoryImages: Record<string, string> = {
  guides: "scaffolding-contractors",
  safety: "scaffolding-contractors",
  costs: "scaffolding-hire",
};

export const categoryAltText: Record<string, string> = {
  guides: "Scaffolding guide",
  safety: "Scaffold safety guide",
  costs: "Scaffolding cost guide",
};

// Homepage content
export const stats = [
  { value: "1,500+", label: "Projects completed" },
  { value: "98%", label: "Client satisfaction" },
  { value: "48hrs", label: "Average mobilisation" },
  { value: "100%", label: "NASC compliant" },
];

export const testimonials = [
  {
    id: "t1",
    name: "James R.",
    role: "Property Owner",
    content:
      "Mainline Scaffold had the scaffold up within 24 hours of calling. Clean, compliant and the roofers were happy with the access. Would use again without hesitation.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Sarah M.",
    role: "Site Manager",
    content:
      "We use Mainline for all our commercial maintenance contracts. Their scaffold management throughout a long contract is first-class — inspection records always up to date.",
    rating: 5,
  },
  {
    id: "t3",
    name: "David K.",
    role: "Roofing Contractor",
    content:
      "As a roofing contractor I need scaffolders who work to my programme, not theirs. Mainline Scaffold consistently deliver on time and the structures are always compliant.",
    rating: 5,
  },
];

export const faqs = [
  {
    question: "How much does scaffolding cost?",
    answer:
      "Scaffolding costs depend on the size of the structure, access requirements, duration and location. Domestic scaffolding for a standard house typically ranges from £500 to £2,000 or more depending on scope. Contact us for a free, no-obligation quote.",
  },
  {
    question: "How long does scaffolding take to erect?",
    answer:
      "Most domestic scaffolding is erected in one to two days. Larger commercial structures may take several days depending on size and complexity. We agree programme dates before start and work to your schedule.",
  },
  {
    question: "Do you provide scaffold inspection certificates?",
    answer:
      "Yes. All our scaffold structures are tagged and accompanied by a scaffold inspection record. On completion we issue a full handover certificate as standard on every project.",
  },
  {
    question: "Can you provide emergency scaffolding?",
    answer:
      "Yes. We operate a 24/7 emergency callout service for storm damage, structural incidents and insurance-related access. We mobilise within hours and work directly with insurers and loss adjusters.",
  },
  {
    question: "Are you NASC accredited?",
    answer:
      "Yes. We work to NASC guidance and TG20 on all scaffolding structures. Our operatives are CISRS-trained and all scaffolding is erected, inspected and documented to current standards.",
  },
];

export const blogPosts: { id: string; title: string; excerpt: string }[] = [];
