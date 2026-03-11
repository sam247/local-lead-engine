import { companyInfo } from "@/lib/data";
import type { VerticalConfig } from "engine";

/** Partner site for cross-vertical linking (surveys). */
export const partnerBaseUrl = "https://mainlinesurveys.co.uk";
export const partnerTopographicalSurveyPath = "/services/topographical-survey";

export const verticalConfig: VerticalConfig = {
  siteName: "Mainline Drains",
  baseUrl: "https://mainlinedrains.co.uk",
  primaryService: "Drain Collapse Repair",
  industry: "drainage",
  /** Action-oriented label for hero/secondary CTA (contact link). */
  heroSecondaryCtaText: "Book CCTV Drain Survey",
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
