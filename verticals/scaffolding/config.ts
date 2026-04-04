import { companyInfo } from "@/lib/data";
import type { VerticalConfig, HomepageTrustPointsSix } from "engine";

const homepageTrustPoints: HomepageTrustPointsSix = [
  { icon: "BadgeCheck", title: "NASC accredited contractors", description: "We work to NASC guidance and TG20 throughout every project." },
  { icon: "Shield", title: "Fully insured", description: "Public liability and employer's liability in place on all scaffolding works." },
  { icon: "Clock", title: "Rapid mobilisation", description: "Typical response within 48 hours for standard access and emergency works." },
  { icon: "Wrench", title: "Design and erect capability", description: "We design and build bespoke scaffolding structures from first enquiry." },
  { icon: "CheckCircle", title: "Compliance-focused", description: "TG20 compliance checks, scaffold tags, and documented inspections on every contract." },
  { icon: "FileCheck", title: "Handover certificates on every project", description: "Full inspection records and handover documentation provided as standard." },
];

/** Partner site for drainage works during construction */
export const partnerDrainsBaseUrl = "https://mainlinedrains.co.uk";

/** Partner site for groundworks during construction */
export const partnerGroundworksBaseUrl = "https://mainlinegroundworks.co.uk";

const serviceTypesBySlug: Record<string, string[]> = {
  "scaffolding-contractors": ["Tube and fitting scaffolding", "System scaffolding", "Temporary access platforms", "Design and erect packages"],
  "domestic-scaffolding": ["House scaffolding for extensions", "Roof access scaffolding", "Chimney scaffolding", "Single-span domestic platforms"],
  "commercial-scaffolding": ["Multi-level facade access", "Industrial scaffolding", "Maintenance access solutions", "Suspended scaffolding"],
  "roof-scaffolding": ["Pitched roof access", "Flat roof platforms", "Skylight and dormer access", "Valley gutter scaffolding"],
  "temporary-roofing": ["Temporary roof sheeting", "Weather-protection during works", "Full building envelope protection", "Crane-compatible temporary roofs"],
  "access-scaffolding": ["Stair towers", "Loading platforms", "Birdcage scaffolding", "Cantilever scaffolding"],
  "scaffolding-hire": ["Scaffold system hire", "Independent bay scaffolding", "Tower scaffold hire", "Tube and fitting hire packages"],
  "emergency-scaffolding": ["24/7 emergency callout", "Rapid propping and shoring", "Storm-damage scaffolding", "Insurance-backed emergency access"],
  "chimney-scaffolding": ["Chimney-head scaffolding", "Chimney breast access", "Stack and pot replacement access", "Terraced and semi-detached chimney solutions"],
};

export const verticalConfig: VerticalConfig = {
  verticalId: "scaffolding",
  siteName: "Mainline Scaffold",
  imageAltNoLocationSuffix: "scaffolding service",
  baseUrl: "https://mainlinescaffold.co.uk",
  primaryService: "Scaffolding Contractors",
  industry: "scaffolding",
  ctaVariants: [
    "Get scaffold pricing",
    "Speak to a scaffolding team",
    "Check scaffold availability",
  ] as const,
  problemLabel: "Scaffolding",
  relatedServicesLabel: "Scaffolding",
  serviceTypesBySlug,
  sectionIntros: {
    types: "Scaffolding projects vary in scope from single-storey domestic access to multi-level commercial facade work. Contractors may specialise in domestic, commercial, industrial or specialist chimney and temporary roofing work, often combining services to meet project requirements.",
    process: "We follow a structured approach from site survey and design through to erection, inspection, adaptation during works, and final strike. Each stage is documented with scaffold tags, inspection records and handover certificates.",
    industries: "We work with homeowners, main contractors, developers, housing associations and facility managers across residential, commercial and industrial sectors. Our scaffolding teams have experience on domestic refurbishments, commercial maintenance contracts and new-build developments.",
    benefits: "A single scaffolding contractor for the whole project simplifies programme management. We deliver NASC-compliant structures, provide full handover documentation, and maintain scaffolds for the duration of works.",
  },
  relatedServicesIntro:
    "Scaffolding projects often involve several related services depending on the scope of works. Homeowners and main contractors frequently need access scaffolding, temporary roofing, specialist chimney scaffolding or scaffold hire in combination.",
  relatedLocationsIntro:
    "We erect scaffolding across the UK. Select an area below for local information and contact options.",
  crossVerticalLinks: [
    { label: "Drainage services", url: `${partnerDrainsBaseUrl}/services/commercial-drainage` },
    { label: "Groundworks contractors", url: `${partnerGroundworksBaseUrl}/services/groundworks-contractors` },
  ],
  locationContextTemplate:
    "{locationName} and the wider {area} region see a range of domestic and commercial building projects requiring scaffolding. Our {serviceTitle} teams work across {locationName} including {nearbyTowns}, providing safe, NASC-compliant scaffolding structures with free no-obligation quotes.",
  companyInfo: {
    name: companyInfo.name,
    phone: companyInfo.phone,
    email: companyInfo.email,
    address: companyInfo.address,
    hours: companyInfo.hours,
    social: companyInfo.social,
    aggregateRating: {
      ratingValue: 4.9,
      reviewCount: 98,
      bestRating: 5,
    },
  },
  homepageTrustPoints,
  projectPageSidebar: {
    ctaHeading: "Get scaffold pricing",
    ctaSupportText: "Share the access need, property type, and programme and we will scope the right scaffold setup.",
    trustLine: "Used by homeowners, contractors and developers",
  },
};
