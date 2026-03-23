import type { GuidePageSection, FAQItem } from "engine";

export const guidesHubIntro =
  "These guides explain how surveys are commissioned, what affects cost, and how deliverables are produced. Content is general information and not a substitute for a written quote.";

export const howItWorksContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "How land and building surveys work",
  metaDescription: "How survey projects progress from brief to delivery for UK sites.",
  intro:
    "Surveys turn site conditions into usable data for design, planning and construction. This page outlines a typical workflow from your first enquiry through to issued drawings or models.",
  sections: [
    {
      heading: "Brief and feasibility",
      paragraphs: [
        "We confirm outputs (e.g. topo, measured survey, utility trace), accuracy requirements and programme. The right method depends on site size, vegetation, access and what downstream teams need.",
      ],
    },
    {
      heading: "Site visit and capture",
      paragraphs: [
        "Teams attend with appropriate instruments—total station, GNSS, scanner or drone where permitted. Safety, airspace and permissions are checked in advance.",
      ],
    },
    {
      heading: "Processing and QA",
      paragraphs: [
        "Data is reduced, checked and drafted to agreed scales and layers. Internal QA reduces errors before you receive files or reports.",
      ],
    },
    {
      heading: "Delivery",
      paragraphs: [
        "You receive CAD, PDF, point cloud or other agreed formats. Revisions may follow design-stage updates or site changes.",
      ],
    },
  ],
};

export const processContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Our survey process",
  metaDescription: "Typical steps for commissioning a survey with Mainline Surveys.",
  intro: "A clear process keeps scope, cost and dates aligned with your planning or construction programme.",
  sections: [
    { heading: "Enquiry", paragraphs: ["We capture site address, proposed outputs and deadline drivers."] },
    { heading: "Quote and instruction", paragraphs: ["Fees reflect method, area, deliverables and risk. Work starts after written instruction."] },
    { heading: "Fieldwork", paragraphs: ["Capture is scheduled around access and weather where relevant."] },
    { heading: "Office production", paragraphs: ["Drafting, modelling and checks against the brief."] },
    { heading: "Issue", paragraphs: ["Electronic issue with revision policy noted in the quote."] },
  ],
};

export const commonProblemsContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Common survey challenges",
  metaDescription: "Typical site and brief issues that affect land and drone surveys.",
  intro: "Understanding these factors early avoids rework and programme slips.",
  sections: [
    { heading: "Vegetation and season", paragraphs: ["Heavy cover can limit GNSS and drone photogrammetry; winter clears sightlines on some sites."] },
    { heading: "Access and safety", paragraphs: ["Live railways, highways or working sites need permits and escorts."] },
    { heading: "Utility uncertainty", paragraphs: ["Records may be incomplete; GPR reduces risk but cannot guarantee every service."] },
  ],
};

export const costGuideContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Survey cost guide",
  metaDescription: "Drivers of survey pricing without example figures.",
  intro: "Quotes reflect area, method, accuracy, deliverable format and site constraints—not a one-size table.",
  sections: [
    { heading: "What affects cost", paragraphs: ["Site extent, density of detail, need for drone vs ground-only, and BIM level required."] },
    { heading: "Typical project types", paragraphs: ["Residential extensions, greenfield development, infrastructure corridors, roof and facade inspections."] },
    { heading: "Site factors", paragraphs: ["Parking, inductions, night working and travel distance."] },
    { heading: "Access constraints", paragraphs: ["Confined courtyards, live retail and rail corridors need extra planning."] },
    { heading: "Next steps", paragraphs: ["Send a red-line boundary, desired outputs and programme; we will propose method and fee."] },
  ],
};

export const insuranceContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Insurance and surveys",
  metaDescription: "General notes on professional cover and survey-related claims.",
  intro: "Survey firms carry professional indemnity; your project insurance may require named deliverables.",
  sections: [
    { heading: "Professional indemnity", paragraphs: ["Our work is covered under standard PI terms; certificates available on request."] },
    { heading: "Site insurance", paragraphs: ["Contractors’ all-risk and public liability on site remain separate from survey scope."] },
  ],
};

export const legalContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Legal and boundaries",
  metaDescription: "High-level notes on boundaries and survey limitations—not legal advice.",
  intro: "Surveyors interpret evidence; only courts or tribunals determine legal boundaries.",
  sections: [
    { heading: "Boundary surveys", paragraphs: ["We can plot features and deed dimensions; disputed lines need solicitor input."] },
    { heading: "Copyright", paragraphs: ["Deliverables are licensed for the agreed project; redistribution may need written consent."] },
  ],
};

export const homeownersContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Homeowners and buyers",
  metaDescription: "When domestic clients typically need surveys.",
  intro: "Extensions, loft conversions and purchases often need measured or topographical data.",
  sections: [
    { heading: "Before you build", paragraphs: ["Architects need accurate floor plans and levels for planning and structure."] },
    { heading: "When buying", paragraphs: ["Understanding boundaries and levels supports conveyancing and future works."] },
  ],
};

export const faqPageItems: FAQItem[] = [
  { question: "How long does a survey take?", answer: "It depends on site size and method. We quote programme with every fee proposal." },
  { question: "Can you fly a drone on my site?", answer: "Subject to airspace, permissions and weather. We confirm during booking." },
  { question: "What files do I receive?", answer: "Typically DWG/DXF/PDF or point cloud formats as agreed in the brief." },
];
