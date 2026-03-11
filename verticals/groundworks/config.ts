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
