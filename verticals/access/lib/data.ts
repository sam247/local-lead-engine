import type { HubData, InfoPageData } from "engine";
import { cctvProblems } from "@/data/cctvProblems";
import { cctvGuidesPages } from "@/data/cctvGuides";
import { accessControlGuidesPages } from "@/data/accessControlGuides";
import { perimeterSecurityGuidesPages } from "@/data/perimeterSecurityGuides";
import { dataCablingGuidesPages } from "@/data/dataCablingGuides";
import { securityUpgradesGuidesPages } from "@/data/securityUpgradesGuides";

// Services data
export const services = [
  {
    id: "access-control-systems",
    slug: "access-control-systems",
    title: "Access Control Systems",
    titleSingular: "Access Control System",
    shortDescription: "Professional access control design, installation and maintenance for commercial and public-sector sites.",
    description: "We design and install access control systems for offices, hospitals, data centres, warehouses and commercial buildings. From door entry and keypads to biometrics and integrated building management, we deliver solutions that secure premises and streamline access for staff and visitors.",
    benefits: [
      "Tailored to your site and risk profile",
      "Integration with CCTV and alarm systems",
      "Audit trails and reporting",
      "Scalable for multi-site and future expansion",
      "Ongoing support and maintenance"
    ],
    process: [
      "Site survey and requirements review",
      "System design and specification",
      "Installation and commissioning",
      "Staff training and handover",
      "Ongoing maintenance and support"
    ],
    icon: "Lock"
  },
  {
    id: "commercial-cctv-installation",
    slug: "commercial-cctv-installation",
    title: "Commercial CCTV Installation",
    titleSingular: "Commercial CCTV Installation",
    shortDescription: "HD and IP CCTV systems for monitoring, evidence and remote viewing.",
    description: "Our commercial CCTV installation service covers HD and IP camera systems for retail, offices, industrial sites and public buildings. We specify, install and maintain systems that meet your surveillance needs and comply with relevant standards.",
    benefits: [
      "HD and 4K options with remote viewing",
      "Recording, playback and export for evidence",
      "Integration with access control",
      "Indoor and outdoor coverage",
      "Maintenance and upgrades"
    ],
    process: [
      "Site survey and camera placement design",
      "Equipment selection and quote",
      "Installation and cabling",
      "Configuration and remote access setup",
      "Training and documentation"
    ],
    icon: "Camera"
  },
  {
    id: "ip-camera-systems",
    slug: "ip-camera-systems",
    title: "IP Camera Systems",
    titleSingular: "IP Camera System",
    shortDescription: "Network-based IP camera systems for scalable, high-quality surveillance.",
    description: "IP camera systems provide high-resolution video over your network with flexible recording, analytics and integration options. We design and install IP-based systems for single sites and multi-site estates.",
    benefits: [
      "High resolution and scalability",
      "Network-based recording and storage",
      "Integration with VMS and access control",
      "Remote viewing and management",
      "Future-proof and expandable"
    ],
    process: [
      "Network and bandwidth assessment",
      "Camera and NVR/VMS specification",
      "Installation and network configuration",
      "Recording and retention setup",
      "Handover and support"
    ],
    icon: "Video"
  },
  {
    id: "perimeter-security-systems",
    slug: "perimeter-security-systems",
    title: "Perimeter Security Systems",
    titleSingular: "Perimeter Security System",
    shortDescription: "Perimeter intrusion detection and surveillance for boundaries and outdoor areas.",
    description: "We design and install perimeter security systems including PIR, beam detection, fence sensors and CCTV for boundaries, yards and external areas. Ideal for data centres, warehouses, hospitals and commercial sites.",
    benefits: [
      "Early detection of intrusion",
      "Reduced false alarms with smart detection",
      "Integration with CCTV and access control",
      "Suitable for harsh outdoor environments",
      "Compliance with site requirements"
    ],
    process: [
      "Perimeter survey and risk assessment",
      "Detection and camera specification",
      "Installation and commissioning",
      "Integration with control room or VMS",
      "Testing and handover"
    ],
    icon: "Shield"
  },
  {
    id: "security-system-integration",
    slug: "security-system-integration",
    title: "Security System Integration",
    titleSingular: "Security System Integration",
    shortDescription: "Unified security platforms linking access, CCTV, alarms and monitoring.",
    description: "We integrate access control, CCTV, intruder alarms and monitoring into a single platform where appropriate. Integration improves visibility, reduces response times and simplifies management for facilities and security teams.",
    benefits: [
      "Single platform for access, CCTV and alarms",
      "Unified reporting and audit trails",
      "Faster response to incidents",
      "Easier management and training",
      "Scalable and upgradeable"
    ],
    process: [
      "Audit of existing systems",
      "Integration design and specification",
      "Installation and configuration",
      "Testing and commissioning",
      "Training and documentation"
    ],
    icon: "Network"
  }
];

// Locations: single source of truth in engine; do not redefine in verticals.
export { locations } from "../../../engine/data/locations";

// Stats
export const stats = [
  { value: "500+", label: "Sites Secured" },
  { value: "24/7", label: "Support Available" },
  { value: "30+", label: "Expert Engineers" },
  { value: "99%", label: "Customer Satisfaction" }
];

// Testimonials
export const testimonials = [
  {
    quote: "Mainline Access designed and installed our access control and CCTV across three buildings. Professional from start to finish and the system has been fault-free.",
    author: "James Richardson",
    role: "Facilities Manager",
    company: "London"
  },
  {
    quote: "We needed perimeter security and CCTV for our data centre. Mainline Access delivered on time and integrated everything with our existing systems.",
    author: "Sarah Mitchell",
    role: "Site Manager",
    company: "Reading"
  },
  {
    quote: "We use Mainline Access across our commercial portfolio. Their engineers are knowledgeable and the support is excellent.",
    author: "Michael Chen",
    role: "Property Manager",
    company: "Apex Property Management"
  }
];

// FAQ data
export const faqs = [
  {
    question: "What is included in an access control system?",
    answer: "Access control typically includes door controllers, readers (card, fob or biometric), door strikes or locks, and software for managing users and permissions. We design systems to suit your site size, risk level and integration needs."
  },
  {
    question: "How much does commercial CCTV installation cost?",
    answer: "Costs depend on the number of cameras, resolution, recording storage and any integration with access control or alarms. We provide free, no-obligation quotes after a site survey so you know exactly what to expect."
  },
  {
    question: "Can you integrate with our existing security systems?",
    answer: "Yes. We integrate access control, CCTV and alarms with existing systems where possible, and can recommend upgrades or replacement when needed. We work with major brands and open protocols."
  },
  {
    question: "What areas do you cover?",
    answer: "We operate across London and surrounding areas, including Richmond, Chiswick, Wimbledon, Kingston, Manchester, Birmingham and many more. Contact us to confirm coverage in your location."
  },
  {
    question: "Do you offer maintenance and support?",
    answer: "Yes. We offer planned maintenance contracts and 24/7 support for critical sites. Our engineers can attend for faults, upgrades and expansion as your requirements change."
  },
  {
    question: "What industries do you work with?",
    answer: "We work with hospitals, data centres, warehouses, offices, retail, education and public-sector sites. Each sector has specific requirements and we tailor our solutions accordingly."
  }
];

// Blog posts — imagePrompt must exactly match the blog topic for image regeneration
export const blogPosts = [
  {
    id: "access-control-buying-guide",
    title: "Access Control Buying Guide for Commercial Buildings",
    excerpt: "What to consider when specifying access control for offices, warehouses and multi-site premises.",
    date: "2024-01-15",
    image: "/images/blog/access-control-buying-guide.jpg",
    imagePrompt: "Commercial building entrance with access control keypad and door reader, office or warehouse security, UK, realistic photo",
    category: "Advice"
  },
  {
    id: "cctv-vs-ip-cameras",
    title: "CCTV vs IP Cameras: Which Is Right for Your Site?",
    excerpt: "A comparison of analogue HD and IP camera systems to help you choose the right solution.",
    date: "2024-01-08",
    image: "/images/blog/cctv-vs-ip-cameras.jpg",
    imagePrompt: "CCTV and IP cameras mounted on building exterior, security camera comparison, commercial site surveillance, UK, realistic photo",
    category: "Technical"
  },
  {
    id: "hospital-security-requirements",
    title: "Hospital Security Systems: Requirements and Best Practice",
    excerpt: "Key considerations for access control and CCTV in healthcare environments.",
    date: "2023-12-20",
    image: "/images/blog/hospital-security-requirements.jpg",
    imagePrompt: "Hospital or healthcare building entrance with access control and CCTV, secure reception, UK healthcare security, realistic photo",
    category: "Guides"
  },
  {
    id: "perimeter-security-guide",
    title: "Perimeter Security for Data Centres and Warehouses",
    excerpt: "How to protect boundaries with detection and CCTV integration.",
    date: "2023-12-12",
    image: "/images/blog/perimeter-security-guide.jpg",
    imagePrompt: "Perimeter security: fence line with detection and CCTV cameras, data centre or warehouse boundary, UK, realistic photo",
    category: "Advice"
  },
  {
    id: "security-system-integration",
    title: "Integrating Access Control, CCTV and Alarms",
    excerpt: "Benefits of a unified security platform and what to plan for.",
    date: "2023-12-01",
    image: "/images/blog/security-system-integration.jpg",
    imagePrompt: "Unified security control room or panel showing access control, CCTV and alarms integrated, commercial building, UK, realistic photo",
    category: "Technical"
  },
  {
    id: "commercial-cctv-compliance",
    title: "CCTV Compliance and Data Protection",
    excerpt: "What you need to know about signage, retention and data protection for business CCTV.",
    date: "2023-11-25",
    image: "/images/blog/commercial-cctv-compliance.jpg",
    imagePrompt: "CCTV in use sign and security camera at business entrance, data protection compliant signage, UK commercial CCTV, realistic photo",
    category: "Guides"
  }
];

// Company info (public Twilio inbound; set NEXT_PUBLIC_PHONE_NUMBER in deploy)
const publicPhone = (process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "").trim();
export const companyInfo = {
  name: "Mainline Access",
  phone: publicPhone,
  email: "info@mainlineaccess.co.uk",
  address: "128 City Road, London, EC1V 2NX",
  hours: "Mon–Fri 8am–6pm, 24/7 emergency callout support",
  social: {
    linkedin: "#",
    twitter: "#",
    facebook: "#"
  }
};

// Why choose us
export const whyChooseUs = [
  {
    title: "24/7 Support",
    description: "Round-the-clock support for contract clients and critical sites.",
    icon: "Siren"
  },
  {
    title: "Integrated Systems",
    description: "Access control, CCTV and alarms designed to work together.",
    icon: "Camera"
  },
  {
    title: "Industry Experience",
    description: "Specialist experience across healthcare, data centres, warehouses and commercial.",
    icon: "Shield"
  },
  {
    title: "Transparent Pricing",
    description: "Honest, upfront quotes with no hidden costs.",
    icon: "PoundSterling"
  },
  {
    title: "Fully Guaranteed",
    description: "All work guaranteed and backed for your peace of mind.",
    icon: "ShieldCheck"
  },
  {
    title: "Local Expertise",
    description: "Experienced across London and the UK for commercial and public-sector sites.",
    icon: "MapPin"
  }
];

// Level 2 = service hubs (/services, /services/[slug]). Level 3 = topic hubs (e.g. /cctv-problems, /cctv-guides). Level 4 = service×location (/[serviceSlug]/[locationId]).
export const hubPages: HubData[] = [
  {
    category: "cctv-problems",
    basePath: "/cctv-problems",
    title: "CCTV Problems",
    subtitle: "Common CCTV issues, causes and how we fix them.",
    metaDescription: "CCTV problems and solutions: blind spots, poor night vision, storage full, remote access. Expert diagnosis and fix from Mainline Access.",
  },
  {
    category: "cctv-guides",
    basePath: "/cctv-guides",
    title: "CCTV Guides",
    subtitle: "Planning, placement, recording and remote viewing for business CCTV.",
    metaDescription: "CCTV guides: planning and placement, recording and retention, remote viewing. Commercial CCTV advice from Mainline Access.",
  },
  {
    category: "access-control-guides",
    basePath: "/access-control-guides",
    title: "Access Control Guides",
    subtitle: "Door vs gate, card vs biometric and system choice for commercial access control.",
    metaDescription: "Access control guides: door and gate systems, card and biometric readers. Commercial access control advice from Mainline Access.",
  },
  {
    category: "perimeter-security-guides",
    basePath: "/perimeter-security-guides",
    title: "Perimeter Security Guides",
    subtitle: "Detection types and CCTV integration for boundaries and outdoor areas.",
    metaDescription: "Perimeter security guides: detection types, CCTV integration. Commercial perimeter security from Mainline Access.",
  },
  {
    category: "data-cabling-guides",
    basePath: "/data-cabling-guides",
    title: "Data Cabling Guides",
    subtitle: "Structured cabling and PoE for CCTV and access control.",
    metaDescription: "Data cabling guides: structured cabling, PoE for CCTV and access control. Installation advice from Mainline Access.",
  },
  {
    category: "security-upgrades",
    basePath: "/security-upgrades",
    title: "Security System Upgrades",
    subtitle: "Analogue to IP CCTV, analytics and system upgrades.",
    metaDescription: "Security upgrade guides: analogue to IP CCTV, analytics and system upgrades. Commercial security from Mainline Access.",
  },
];

function problemDataToInfoPageData(p: { slug: string; title: string; causes: string; howFixed: string; whenToCall: string; ctaMessage: string; relatedServiceSlugs: string[] }): InfoPageData {
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
    case "cctv-problems":
      return cctvProblems.map(problemDataToInfoPageData);
    case "cctv-guides":
      return cctvGuidesPages;
    case "access-control-guides":
      return accessControlGuidesPages;
    case "perimeter-security-guides":
      return perimeterSecurityGuidesPages;
    case "data-cabling-guides":
      return dataCablingGuidesPages;
    case "security-upgrades":
      return securityUpgradesGuidesPages;
    default:
      return [];
  }
};

export const getHubData = (category: string): HubData | undefined =>
  hubPages.find((h) => h.category === category);

const ACCESS_SERVICE_TO_TOPIC_CATEGORIES: Record<string, string[]> = {
  "commercial-cctv-installation": ["cctv-problems", "cctv-guides", "data-cabling-guides"],
  "ip-camera-systems": ["cctv-guides", "data-cabling-guides", "security-upgrades"],
  "access-control-systems": ["access-control-guides", "data-cabling-guides"],
  "perimeter-security-systems": ["perimeter-security-guides", "cctv-guides"],
  "security-system-integration": ["access-control-guides", "cctv-guides", "security-upgrades"],
};

const MAX_TOPIC_LINKS = 6;
const MAX_PER_CATEGORY = 2;

export function getRelevantTopicsForService(serviceSlug: string): { title: string; href: string }[] {
  const categories = ACCESS_SERVICE_TO_TOPIC_CATEGORIES[serviceSlug];
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

export const categoryImages: Record<string, string> = {
  "access-control-systems": "access-control-systems",
  "commercial-cctv-installation": "commercial-cctv-installation",
  "ip-camera-systems": "ip-camera-systems",
  "perimeter-security-systems": "perimeter-security-systems",
  "security-system-integration": "security-system-integration",
  "cctv-problems": "commercial-cctv-installation",
  "cctv-guides": "commercial-cctv-installation",
  "access-control-guides": "access-control-systems",
  "perimeter-security-guides": "perimeter-security-systems",
  "data-cabling-guides": "commercial-cctv-installation",
  "security-upgrades": "commercial-cctv-installation",
};

export const categoryAltText: Record<string, string> = {
  "access-control-systems": "Access control system installation for commercial premises",
  "commercial-cctv-installation": "Commercial CCTV installation",
  "ip-camera-systems": "IP camera system for surveillance",
  "perimeter-security-systems": "Perimeter security systems",
  "security-system-integration": "Integrated security system",
  "cctv-problems": "CCTV problems and solutions",
  "cctv-guides": "CCTV planning and installation guides",
  "access-control-guides": "Access control guides",
  "perimeter-security-guides": "Perimeter security guides",
  "data-cabling-guides": "Data cabling for security systems",
  "security-upgrades": "Security system upgrades",
};
