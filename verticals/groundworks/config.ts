import { companyInfo } from "@/lib/data";
import type { VerticalConfig } from "engine";

/** Partner site for cross-vertical linking (surveys – topographical/measured before construction). */
export const partnerBaseUrl = "https://mainlinesurveys.co.uk";
export const partnerTopographicalSurveyPath = "/services/topographical-survey";

/** Partner site for drainage during groundworks. */
export const partnerDrainsBaseUrl = "https://mainlinedrains.co.uk";

const serviceTypesBySlug: Record<string, string[]> = {
  "groundworks-contractors": ["Piling", "Excavation", "Site clearance", "Foundations", "Enabling works"],
  "piling-contractors": ["Driven piles", "Bored piles", "Sheet piles", "Pile testing"],
  "mini-piling-contractors": ["Section piles", "CFA mini piling", "Driven mini piles", "Pile caps"],
  "excavation-contractors": ["Bulk excavation", "Strip excavation", "Trenching", "Earthworks"],
  "site-clearance-contractors": ["Demolition", "Vegetation clearance", "Waste removal", "Site levelling"],
  "foundation-contractors": ["Strip foundations", "Pad foundations", "Raft foundations", "Piled foundations"],
  "concrete-foundations": ["Reinforced concrete", "Mass concrete", "Ground beams", "Blinding"],
  "enabling-works-contractors": ["Access roads", "Temporary drainage", "Site fencing", "Temporary services"],
};

export const verticalConfig: VerticalConfig = {
  verticalId: "groundworks",
  siteName: "Mainline Groundworks",
  baseUrl: "https://mainlinegroundworks.co.uk",
  primaryService: "Groundworks Contractors",
  industry: "groundworks",
  heroSecondaryCtaText: "Get a Groundworks Quote",
  problemLabel: "Groundworks",
  relatedServicesLabel: "Groundworks",
  serviceTypesBySlug,
  sectionIntros: {
    types: "Groundworks projects often involve several specialist disciplines depending on the requirements of the development. Contractors may focus on excavation, piling, drainage installation or foundation construction, often working together to prepare a site for structural works.",
    process: "We follow a structured approach from site assessment and design coordination through to setting out, excavation, piling and foundations, drainage and services, and reinstatement and handover. Each phase is planned and delivered to programme.",
    industries: "We work with developers, main contractors and clients across commercial and residential construction. Our groundworks teams have experience on housing, offices, warehouses, schools, healthcare and industrial sites throughout the UK.",
    benefits: "A single point of contact for groundworks simplifies coordination and accountability. We deliver to programme, are fully insured and accredited, and provide experienced teams and plant with quality-assured work and handover documentation.",
  },
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
};
