import type { GuidePageSection, FAQItem } from "engine";

export const guidesHubIntro =
  "These guides describe how security and access projects are structured, what affects cost, and common questions. Information is general and site-specific design requires a survey.";

export const howItWorksContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "How security and access projects work",
  metaDescription: "Typical flow for access control, CCTV and integrated systems on commercial sites.",
  intro:
    "Commercial security work usually moves from risk review and design through installation, commissioning and handover. Integration with existing building systems is often a key constraint.",
  sections: [
    {
      heading: "Discovery and standards",
      paragraphs: [
        "We capture operational hours, visitor flows, compliance drivers and IT constraints. Standards and insurer requirements shape camera retention, access levels and monitoring.",
      ],
    },
    {
      heading: "Design and procurement",
      paragraphs: [
        "Hardware and software are selected for maintainability and future expansion. Cabling routes, IDF locations and power are coordinated before install dates.",
      ],
    },
    {
      heading: "Installation and testing",
      paragraphs: [
        "Work is phased to minimise disruption. Doors, networks and head-end equipment are tested before go-live.",
      ],
    },
    {
      heading: "Training and handover",
      paragraphs: [
        "Administrators receive training; as-built drawings and licences are transferred according to the contract.",
      ],
    },
  ],
};

export const processContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Our security installation process",
  metaDescription: "Steps from survey to handover for Mainline Access projects.",
  intro: "A structured process keeps compliance, integration and programme visible to stakeholders.",
  sections: [
    { heading: "Site survey", paragraphs: ["We confirm cable routes, wireless feasibility, mounting points and power."] },
    { heading: "Design sign-off", paragraphs: ["Drawings and bill of materials agreed before ordering long-lead items."] },
    { heading: "Install", paragraphs: ["Civil, electrical and low-voltage trades coordinated on site."] },
    { heading: "Commission", paragraphs: ["Devices enrolled, rules tested, recordings verified."] },
    { heading: "Handover", paragraphs: ["Documentation, warranties and support contacts issued."] },
  ],
};

export const commonProblemsContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Common security project issues",
  metaDescription: "Typical constraints on access and CCTV programmes.",
  intro: "Early visibility of these topics reduces rework and delay.",
  sections: [
    { heading: "Legacy systems", paragraphs: ["Older panels or NVRs may limit integration; migration paths are scoped in design."] },
    { heading: "Network capacity", paragraphs: ["PoE switch capacity and VLAN design must match camera counts and bitrates."] },
    { heading: "Operational change", paragraphs: ["New access rules and badging workflows need owner buy-in before go-live."] },
  ],
};

export const costGuideContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Security and access cost guide",
  metaDescription: "Factors that drive quotes for CCTV and access systems—no price ranges.",
  intro: "Costs follow scope, performance tier, cabling distances, integration depth and support term.",
  sections: [
    { heading: "What affects cost", paragraphs: ["Door count, camera count, analytics, storage period, monitoring and software licences."] },
    { heading: "Typical project types", paragraphs: ["Single-site refresh, multi-door access, campus CCTV, data centre hardening."] },
    { heading: "Site factors", paragraphs: ["Height work, out-of-hours access, specialist containment and containment fire-rating."] },
    { heading: "Access constraints", paragraphs: ["Live hospitals and retail need sequenced shutdowns and hygiene protocols."] },
    { heading: "Next steps", paragraphs: ["Share floor plans, risk drivers and IT policies; we will propose options and fee."] },
  ],
};

export const insuranceContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Insurance and security systems",
  metaDescription: "General notes on insurer expectations for commercial security.",
  intro: "Policies may specify minimum standards for intruder, CCTV or access logging.",
  sections: [
    { heading: "Evidence retention", paragraphs: ["Retention periods should match policy wording and GDPR obligations."] },
    { heading: "Accredited maintenance", paragraphs: ["Some policies expect documented servicing; confirm with your broker."] },
  ],
};

export const legalContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Legal, privacy and compliance",
  metaDescription: "High-level compliance themes for CCTV and access—not legal advice.",
  intro: "UK GDPR, DPA 2018 and surveillance codes affect signage, purpose limitation and retention.",
  sections: [
    { heading: "CCTV signage", paragraphs: ["Operators must inform people of recording where required by law and guidance."] },
    { heading: "Access logs", paragraphs: ["Personal data in access logs needs lawful basis and retention policy."] },
  ],
};

export const homeownersContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Homeowners and small sites",
  metaDescription: "When domestic or small commercial clients use professional security installers.",
  intro: "We focus on commercial work; smaller projects may still benefit from structured design and warranty-backed install.",
  sections: [
    { heading: "Scoping", paragraphs: ["Clarify doors, cameras and remote viewing needs before hardware selection."] },
    { heading: "Ongoing costs", paragraphs: ["Cloud licences, SIMs and maintenance should be budgeted beyond day-one install."] },
  ],
};

export const faqPageItems: FAQItem[] = [
  { question: "Do you maintain systems after install?", answer: "Yes. We offer maintenance tailored to your estate and SLA needs." },
  { question: "Can you integrate with our existing CCTV?", answer: "Often yes, depending on platform age and APIs; we assess during design." },
  { question: "Which sectors do you cover?", answer: "Healthcare, data centres, logistics, offices and other commercial environments UK-wide." },
];
