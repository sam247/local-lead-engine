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
  sectionIntros: {
    types: "Drainage work can involve several approaches depending on the issue and site. We offer everything from surveys and diagnosis to excavation, relining and emergency response, so you get the right solution for your property.",
    process: "We follow a clear, structured approach from first contact to completion. Every job starts with understanding the problem, then we recommend the most appropriate method and deliver with full documentation and reinstatement where needed.",
    industries: "We work with domestic and commercial clients across the UK. Our teams are experienced in residential properties, offices, retail, healthcare, education and industrial sites, with the right equipment and insurance for each sector.",
    benefits: "Working with a single drainage specialist simplifies scheduling and accountability. We deliver to programme, provide written reports and certification where required, and our engineers are fully insured and trained.",
  },
};
