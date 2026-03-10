import { companyInfo } from "@/lib/data";
import type { VerticalConfig } from "engine";

export const verticalConfig: VerticalConfig = {
  siteName: "Mainline Surveys",
  baseUrl: "https://mainlinesurveys.co.uk",
  primaryService: "Land & Drone Surveying",
  industry: "surveying",
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
