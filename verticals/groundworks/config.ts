import { companyInfo } from "@/lib/data";
import type { VerticalConfig, HomepageTrustPointsSix } from "engine";

const homepageTrustPoints: HomepageTrustPointsSix = [
  { icon: "Shield", title: "Accredited contractors", description: "Fully insured groundworks teams with documented health and safety." },
  { icon: "Users", title: "Programme coordination", description: "Single accountability from enabling works through to handover." },
  { icon: "BadgeCheck", title: "Quality formation", description: "Piling, excavation and foundations delivered to specification." },
  { icon: "Clock", title: "Site-led sequencing", description: "Works planned around access, weather and main contractor milestones." },
  { icon: "Wrench", title: "Full groundworks scope", description: "Clearance, excavation, piling, drainage tie-ins and reinstatement." },
  { icon: "Headphones", title: "Commercial focus", description: "Housing, industrial, education and infrastructure projects UK-wide." },
];

/** Partner site for cross-vertical linking (surveys – topographical/measured before construction). */
export const partnerBaseUrl = "https://mainlinesurveys.co.uk";
export const partnerTopographicalSurveyPath = "/services/topographical-survey";

/** Partner site for drainage during groundworks. */
export const partnerDrainsBaseUrl = "https://mainlinedrains.co.uk";

const serviceTypesBySlug: Record<string, string[]> = {
  "groundworks-contractors": ["Piling", "Excavation", "Site clearance", "Foundations", "Enabling works"],
  underpinning: ["Mass concrete underpinning", "Piled underpinning (where specified)", "Bay sequencing", "Structural stabilisation"],
  "piling-contractors": ["Driven piles", "Bored piles", "Sheet piles", "Design coordination"],
  "cfa-piling": ["CFA continuous auger piling", "Low-vibration installation", "Urban and restricted sites", "Reinforcement to design"],
  "mini-piling-contractors": ["Section piles", "CFA mini piling", "Driven mini piles", "Pile caps"],
  "foundation-contractors": ["Strip foundations", "Pad foundations", "Raft foundations", "Piled foundations"],
  "foundation-repair": ["Crack and movement investigation", "Localised rebuilds", "Stabilisation details", "Engineer-specified repairs"],
  "concrete-repair": ["Spall and delamination repairs", "Reinforcement exposure treatment", "Structural patch repairs", "Finishing to specification"],
  "excavation-contractors": ["Bulk excavation", "Strip excavation", "Trenching", "Earthworks"],
  "site-clearance-contractors": ["Demolition", "Vegetation clearance", "Waste removal", "Site levelling"],
  "concrete-foundations": ["Reinforced concrete", "Mass concrete", "Ground beams", "Blinding"],
  "enabling-works-contractors": ["Access roads", "Temporary drainage", "Site fencing", "Temporary services"],
};

export const verticalConfig: VerticalConfig = {
  verticalId: "groundworks",
  siteName: "Mainline Groundworks",
  imageAltNoLocationSuffix: "groundworks service",
  baseUrl: "https://mainlinegroundworks.co.uk",
  primaryService: "Groundworks Contractors",
  industry: "groundworks",
  ctaVariants: [
    "Price your project",
    "Speak to a groundworks specialist",
    "Get foundation work quote",
  ] as const,
  problemLabel: "Groundworks",
  relatedServicesLabel: "Groundworks",
  serviceTypesBySlug,
  sectionIntros: {
    types: "Groundworks projects often involve several specialist disciplines depending on the requirements of the development. Contractors may focus on excavation, piling, drainage installation or foundation construction, often working together to prepare a site for structural works.",
    process: "We follow a structured approach from site assessment and design coordination through to setting out, excavation, piling and foundations, drainage and services, and reinstatement and handover. Each phase is planned and delivered to programme.",
    industries: "We work with developers, main contractors and clients across commercial and residential construction. Our groundworks teams have experience on housing, offices, warehouses, schools, healthcare and industrial sites throughout the UK.",
    benefits: "A single point of contact for groundworks simplifies coordination and accountability. We deliver to programme, are fully insured and accredited, and provide experienced teams and plant with quality-assured work and handover documentation.",
  },
  relatedServicesIntro:
    "Groundworks projects often involve several specialist disciplines depending on the size and complexity of the development. In addition to general groundworks contracting, clients frequently require services such as piling, excavation or foundation installation.",
  relatedLocationsIntro:
    "We deliver groundworks and related services across the UK. Select an area below for local information and contact options.",
  crossVerticalLinks: [
    { label: "Topographical surveys", url: `${partnerBaseUrl}${partnerTopographicalSurveyPath}` },
    { label: "Drainage installation", url: `${partnerDrainsBaseUrl}/services/drain-installation` },
  ],
  locationContextTemplate:
    "{locationName} and the wider {area} region see a mix of housing, commercial and infrastructure projects. Our {serviceTitle} teams work with developers and main contractors across the area, including in {nearbyTowns}. We deliver piling, excavation, foundations and site preparation to programme, with free no-obligation quotes for projects in and around {locationName}.",
  companyInfo: {
    name: companyInfo.name,
    phone: companyInfo.phone,
    email: companyInfo.email,
    address: companyInfo.address,
    hours: companyInfo.hours,
    social: companyInfo.social,
    aggregateRating: {
      ratingValue: 4.9,
      reviewCount: 120,
      bestRating: 5,
    },
  },
  homepageTrustPoints,
};
