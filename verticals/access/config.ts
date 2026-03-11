import { companyInfo } from "@/lib/data";
import type { VerticalConfig } from "engine";

/** Partner site for cross-vertical linking (surveys). */
export const partnerBaseUrl = "https://mainlinesurveys.co.uk";
export const partnerTopographicalSurveyPath = "/services/topographical-survey";

/** Partner site for cross-vertical linking (drains). */
export const partnerDrainsBaseUrl = "https://mainlinedrains.co.uk";

export const verticalConfig: VerticalConfig = {
  verticalId: "access",
  siteName: "Mainline Access",
  baseUrl: "https://mainlineaccess.co.uk",
  primaryService: "Access Control Systems",
  industry: "Commercial access control and security systems",
  heroSecondaryCtaText: "Get Security System Quote",
  problemLabel: "Access Problems",
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
