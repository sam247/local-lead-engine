import { companyInfo } from "@/lib/data";
import type { VerticalConfig, HomepageTrustPointsSix } from "engine";

const homepageTrustPoints: HomepageTrustPointsSix = [
  { icon: "Shield", title: "Planning-ready data", description: "Accurate surveys and deliverables suitable for design and approval." },
  { icon: "Users", title: "Experienced survey partners", description: "Land, utility, measured building and drone capture under one roof." },
  { icon: "BadgeCheck", title: "Calibrated methods", description: "The right technique for your site, brief and output format." },
  { icon: "Clock", title: "Agreed programmes", description: "Clear milestones from brief through capture to delivery." },
  { icon: "Wrench", title: "Flexible outputs", description: "CAD, point clouds, BIM-ready data and reports as required." },
  { icon: "Headphones", title: "UK coverage", description: "Support for developments and infrastructure projects nationwide." },
];

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
  imageAltNoLocationSuffix: "surveying service",
  baseUrl: "https://mainlinesurveys.co.uk",
  primaryService: "Land & Drone Surveying",
  industry: "surveying",
  ctaVariants: [
    "Get a survey quote",
    "Speak to a surveyor",
    "Check survey availability",
  ] as const,
  problemLabel: "Survey Guides",
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
  relatedServicesIntro:
    "Survey requirements vary by project—from land and utility mapping to measured building and drone-based capture. In addition to the service above, we offer the following so you can find the right survey type and deliverables for planning, design or construction.",
  relatedLocationsIntro:
    "We deliver surveys across the UK. Select an area below for local information and contact options.",
  crossVerticalLinks: [
    { label: "CCTV drain surveys", url: `${partnerBaseUrl}${partnerDrainSurveyPath}` },
  ],
  locationContextTemplate:
    "{locationName} and the wider {area} region see residential, commercial and infrastructure projects that often need topographical, measured building or drone surveys. Our survey partners deliver planning-ready data across the area, including in {nearbyTowns}. Contact us for a free no-obligation quote for your project in or around {locationName}.",
  homepageTrustPoints,
  projectPageSidebar: {
    ctaHeading: "Get a survey quote",
    ctaSupportText: "Tell us the site, deliverable, and programme and we will price the right survey scope.",
    trustLine: "Used by developers, architects and contractors",
  },
  blogPageSidebar: {
    ctaHeading: "Get a survey quote",
    ctaSupportText: "Tell us the site, scope, and output you need and we will recommend the right survey route.",
    trustLine: "Used by developers, architects and contractors",
  },
};
