import type { GuidePageSection, FAQItem } from "engine";

export const guidesHubIntro =
  "Guides covering how groundworks packages are delivered, cost drivers, and typical risks. Use them alongside topic articles for piling, foundations and site preparation.";

export const howItWorksContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "How groundworks packages work",
  metaDescription: "Typical delivery model for piling, excavation and foundations on UK construction sites.",
  intro:
    "Groundworks tie together enabling works, earthworks, piling or foundations, drainage interfaces and reinstatement. Coordination with the main contractor programme is central.",
  sections: [
    {
      heading: "Pre-start",
      paragraphs: [
        "Drawings, ground investigation and permits are reviewed. Temporary works and haul routes are agreed before plant arrives.",
      ],
    },
    {
      heading: "Setting out and cut",
      paragraphs: [
        "Engineers set grid and levels. Bulk cut or fill proceeds to formation design levels with validation checks.",
      ],
    },
    {
      heading: "Structures below ground",
      paragraphs: [
        "Piles, ground beams, rafts or strip footings follow the structural design. Concrete and reinforcement are tested to specification.",
      ],
    },
    {
      heading: "Interfaces",
      paragraphs: [
        "Drainage, services and subfloor preparation are coordinated before follow-on trades start.",
      ],
    },
  ],
};

export const processContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Our groundworks process",
  metaDescription: "Steps from award to handover for Mainline Groundworks.",
  intro: "Clear stages help main contractors plan inspections and follow-on trades.",
  sections: [
    { heading: "Mobilisation", paragraphs: ["Site setup, welfare, fencing and inductions."] },
    { heading: "Earthworks", paragraphs: ["Excavation, stockpile and cart away or reuse as agreed."] },
    { heading: "Substructure", paragraphs: ["Piling, foundations and ground beams to structural drawings."] },
    { heading: "Backfill and compaction", paragraphs: ["Layers tested where specification demands."] },
    { heading: "Handover", paragraphs: ["Surveys, test records and O&M information issued."] },
  ],
};

export const commonProblemsContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Common groundworks challenges",
  metaDescription: "Ground conditions, weather and access issues on civils sites.",
  intro: "Identifying these early supports realistic programmes and contingencies.",
  sections: [
    { heading: "Ground variability", paragraphs: ["GI boreholes may miss local soft spots; probe and reassess where needed."] },
    { heading: "Water ingress", paragraphs: ["Dewatering and temporary drainage protect excavations."] },
    { heading: "Logistics", paragraphs: ["Spoil removal, concrete pours and piling plant need sequenced road access."] },
  ],
};

export const costGuideContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Groundworks cost guide",
  metaDescription: "Drivers of groundworks pricing without indicative figures.",
  intro: "Quotes reflect quantities, plant choice, temporary works, disposal routes and programme risk.",
  sections: [
    { heading: "What affects cost", paragraphs: ["Cut/fill volumes, piling type, concrete grade, steel tonnage and testing regime."] },
    { heading: "Typical project types", paragraphs: ["Residential slabs, commercial rafts, basement boxes, industrial slabs on piles."] },
    { heading: "Site factors", paragraphs: ["Contaminated soils, asbestos in hardstanding, restricted working hours."] },
    { heading: "Access constraints", paragraphs: ["City centre sites, rail interfaces and live adjacent buildings."] },
    { heading: "Next steps", paragraphs: ["Share drawings, GI reports and programme; we will price the defined scope."] },
  ],
};

export const insuranceContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Insurance and groundworks",
  metaDescription: "General notes on contractors’ cover and third-party risk.",
  intro: "CAR, PL and employer’s liability are standard; specific endorsements may apply near utilities.",
  sections: [
    { heading: "Third-party liability", paragraphs: ["Damage to adjacent property or services must be reported and managed under policy terms."] },
    { heading: "Professional indemnity", paragraphs: ["Design-and-build elements may carry separate PI requirements."] },
  ],
};

export const legalContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Legal and contracts",
  metaDescription: "High-level contract themes for civils packages—not legal advice.",
  intro: "NEC, JCT and bespoke forms allocate risk differently; read your particular terms.",
  sections: [
    { heading: "Variations", paragraphs: ["Changed ground conditions or design changes should be instructed in writing."] },
    { heading: "Utilities", paragraphs: ["Statutory undertaker requirements affect programme and cost."] },
  ],
};

export const homeownersContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Homeowners and small developments",
  metaDescription: "When domestic clients meet groundworks contractors.",
  intro: "Extensions and self-builds still need structural design, permits and competent supervision.",
  sections: [
    { heading: "Design responsibility", paragraphs: ["Engineer-designed foundations are matched to ground investigation."] },
    { heading: "Party walls", paragraphs: ["Neighbouring structures may require notices and monitoring."] },
  ],
};

export const faqPageItems: FAQItem[] = [
  { question: "Do you design piles?", answer: "We work with structural engineers and can deliver design-and-build where agreed." },
  { question: "Can you work in winter?", answer: "Yes, with adjusted methods for concrete curing and ground stability." },
  { question: "Do you take muck away?", answer: "Yes, with licensed disposal and waste tickets as required." },
];
