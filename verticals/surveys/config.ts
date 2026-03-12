import { companyInfo } from "@/lib/data";
import type { VerticalConfig } from "engine";

/** Partner site for cross-vertical linking (drains). */
export const partnerBaseUrl = "https://mainlinedrains.co.uk";
export const partnerDrainSurveyPath = "/services/cctv-drain-surveys";

const serviceTypesBySlug: Record<string, string[]> = {
  "topographical-survey": ["Site level surveys", "Contour and detail surveys", "Volume surveys", "As-built surveys"],
  "measured-building-survey": ["Floor plans", "Elevations and sections", "Point cloud to CAD", "BIM-ready deliverables"],
  "utility-survey": ["Utility mapping", "GPR and EML location", "Record comparison", "Pre-excavation surveys"],
  "utility-mapping-survey": ["Underground utility detection", "Conflict mapping", "Service plans", "Adoption records"],
  "boundary-survey": ["Boundary definition", "Party wall surveys", "Land registry plans", "Dispute resolution"],
  "laser-scanning-survey": ["3D point cloud capture", "Building as-built", "Heritage and facades", "Clash detection"],
  "drone-survey": ["Aerial mapping", "Orthophoto and DTM", "Volumetric surveys", "Progress monitoring"],
  "drone-roof-inspection": ["Roof condition surveys", "Thermal inspection", "High-level access", "Maintenance reporting"],
  "drone-building-inspection": ["Facade and elevation capture", "Accessible roof survey", "Defect mapping", "Inspection reports"],
  "drone-topographical-survey": ["Large-area topo", "Cut and fill", "Stockpile volumes", "Site progress"],
  "drone-construction-survey": ["Progress documentation", "Earthworks verification", "Stockpile measurement", "As-built capture"],
};

export const verticalConfig: VerticalConfig = {
  verticalId: "surveys",
  siteName: "Mainline Surveys",
  baseUrl: "https://mainlinesurveys.co.uk",
  primaryService: "Land & Drone Surveying",
  industry: "surveying",
  relatedServicesLabel: "Survey",
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
    types: "Survey services cover a wide range of deliverables, from land and utility mapping to measured building and drone-based capture. Depending on your project, we provide the right method and output format for planning, design or construction.",
    process: "We take a project-led approach: from your brief and site visit through to data capture, processing and delivery. You receive clear deliverables—CAD, point clouds, reports—on an agreed programme with no surprises.",
    industries: "We work with developers, architects, contractors and public-sector clients. Our surveys support residential and commercial development, infrastructure, heritage projects and land management across the UK.",
    benefits: "Working with an experienced survey provider means accurate, planning-ready data and consistent quality. We deliver on programme, use calibrated equipment and provide documentation suitable for design and approval.",
  },
};
