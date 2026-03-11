import { companyInfo } from "@/lib/data";
import type { VerticalConfig } from "engine";

/** Partner site for cross-vertical linking (surveys). */
export const partnerBaseUrl = "https://mainlinesurveys.co.uk";
export const partnerTopographicalSurveyPath = "/services/topographical-survey";

const serviceTypesBySlug: Record<string, string[]> = {
  "drain-collapse-repair": ["Traditional excavation and repair", "Pipe relining where suitable", "Patch repair", "Section replacement"],
  "drain-relining": ["CIPP (cured-in-place pipe)", "UV cure liners", "Point repair sleeves", "Full-length relining"],
  "cctv-drain-surveys": ["Pre-purchase drain surveys", "Post-repair verification", "Routine condition surveys", "Blockage and defect mapping"],
  "drain-excavation": ["Open-cut excavation", "Trench repair", "Pipe replacement", "Surface reinstatement"],
  "emergency-drainage": ["24/7 emergency call-out", "Blockage clearance", "Flood response", "Same-day repair"],
  "blocked-drains": ["High-pressure jetting", "Electro-mechanical clearing", "Rodding", "CCTV investigation"],
  "drain-jetting": ["Residential jetting", "Commercial jetting", "Pre-survey cleaning", "Root and debris clearance"],
  "drain-root-removal": ["Mechanical root cutting", "Jetting and cutting", "Pre-relining clearance", "Ongoing maintenance"],
  "drain-unblocking": ["Internal clearing", "Jetting", "Rodding", "CCTV diagnosis"],
  "drain-pipe-replacement": ["Section replacement", "Full run replacement", "New connection installation", "Material upgrade (clay to plastic)"],
  "commercial-drainage": ["Scheduled maintenance", "Compliance surveys", "Kitchen and trade waste", "Emergency contract response"],
};

export const verticalConfig: VerticalConfig = {
  verticalId: "drains",
  siteName: "Mainline Drains",
  baseUrl: "https://mainlinedrains.co.uk",
  primaryService: "Drain Collapse Repair",
  industry: "drainage",
  heroSecondaryCtaText: "Book CCTV Drain Survey",
  problemLabel: "Drain Problems",
  relatedServicesLabel: "Drain",
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
