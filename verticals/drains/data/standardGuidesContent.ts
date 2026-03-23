import type { GuidePageSection } from "engine";
import type { FAQItem } from "engine";

export const guidesHubIntro =
  "These guides explain how we work, what affects pricing, typical processes, and common questions. They are for general information and do not replace a site-specific quote.";

export const howItWorksContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "How drainage work works",
  metaDescription: "How Mainline Drains approaches surveys, diagnosis and repair from first contact to completion.",
  intro:
    "This page explains how drainage projects usually progress when you work with us: what happens first, how decisions are made, and what you can expect at each stage. It applies to domestic and commercial sites across the UK.",
  sections: [
    {
      heading: "What this guide is for",
      paragraphs: [
        "Use it to understand the typical sequence for CCTV surveys, repairs, relining and emergency call-outs. Your project may vary depending on access, pipe condition and urgency.",
      ],
    },
    {
      heading: "Initial contact and scope",
      paragraphs: [
        "We capture your location, symptoms and any known history. For many jobs we recommend a CCTV survey before quoting repair work so the scope is based on evidence rather than guesswork.",
      ],
    },
    {
      heading: "On-site assessment and options",
      paragraphs: [
        "Our engineers assess access, safety and the most appropriate method—jetting, lining, excavation or a combination. We explain options in plain language before work proceeds.",
      ],
    },
    {
      heading: "Delivery and documentation",
      paragraphs: [
        "Work is completed to agreed standards with photos, reports or certification where relevant. Reinstatement is discussed upfront where excavation is required.",
      ],
    },
  ],
};

export const processContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Our drainage process",
  metaDescription: "The typical steps from enquiry through survey, repair and handover for drainage services.",
  intro:
    "Our process is designed to keep decisions clear: understand the problem, confirm it with survey where needed, agree the right fix, then deliver with minimal disruption.",
  sections: [
    {
      heading: "Enquiry and scheduling",
      paragraphs: [
        "We agree a visit window and any access requirements. Emergency jobs are prioritised where flooding or complete failure is reported.",
      ],
    },
    {
      heading: "Diagnosis",
      paragraphs: [
        "CCTV or other inspection methods are used to locate defects, blockages or collapse. Findings drive the repair method and quote.",
      ],
    },
    {
      heading: "Repair or maintenance",
      paragraphs: [
        "We carry out jetting, lining, patch repair or excavation as specified. Complex sites may need phased work or coordination with other trades.",
      ],
    },
    {
      heading: "Handover",
      paragraphs: [
        "You receive outcomes in writing where applicable, plus recommendations for ongoing maintenance or insurance documentation if required.",
      ],
    },
  ],
};

export const commonProblemsContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Common drainage problems",
  metaDescription: "Typical drain and sewer issues UK property owners encounter and how professionals address them.",
  intro:
    "Drainage problems range from repeat blockages to pipe collapse and root ingress. Recognising patterns early usually reduces damage and cost.",
  sections: [
    {
      heading: "Blockages and slow drains",
      paragraphs: [
        "Fat build-up, foreign objects and partial collapses often show as slow runs or gurgling. High-pressure jetting or mechanical clearing may be appropriate after inspection.",
      ],
    },
    {
      heading: "Structural damage and collapse",
      paragraphs: [
        "Subsidence, age and ground movement can crack or displace pipes. These cases may need excavation and replacement or relining depending on depth and access.",
      ],
    },
    {
      heading: "Odours and vent issues",
      paragraphs: [
        "Traps, vents or defective seals can allow smells into the property. CCTV helps distinguish drain defects from internal plumbing issues.",
      ],
    },
  ],
};

export const costGuideContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Drainage cost guide",
  metaDescription: "What drives drainage survey and repair costs without speculative pricing figures.",
  intro:
    "Costs depend on site factors, access, pipe depth and the repair method. We do not publish fixed price lists because every job is different; this guide explains what typically influences quotes.",
  sections: [
    {
      heading: "What affects cost",
      paragraphs: [
        "Pipe material and condition, depth, length of affected run, need for CCTV, traffic management, and whether excavation or relining is appropriate all affect the total.",
      ],
    },
    {
      heading: "Typical project types",
      paragraphs: [
        "Single localised repairs, full run replacement, pre-purchase surveys, commercial maintenance contracts and emergency call-outs each have different cost drivers.",
      ],
    },
    {
      heading: "Site factors",
      paragraphs: [
        "Parking, internal access, shared sewers, insurance involvement and reinstatement (tarmac, paving, internal floors) can add time and complexity.",
      ],
    },
    {
      heading: "Access constraints",
      paragraphs: [
        "Confined spaces, basements and live commercial sites may require additional safety measures or out-of-hours working, which affects scheduling and cost.",
      ],
    },
    {
      heading: "Next steps",
      paragraphs: [
        "Share your address, symptoms and any prior reports. We can recommend whether a survey is needed first and provide a written quote for the agreed scope.",
      ],
    },
  ],
};

export const insuranceContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Insurance and drainage",
  metaDescription: "How insurance may relate to drain damage, surveys and claims—general information only.",
  intro:
    "Policies differ widely. This guide outlines common themes; always check your policy wording and insurer requirements.",
  sections: [
    {
      heading: "When insurers may be involved",
      paragraphs: [
        "Sudden damage, subsidence-linked pipe failure or shared drain issues sometimes fall under buildings cover. Wear and tear or lack of maintenance is often excluded.",
      ],
    },
    {
      heading: "Evidence and reports",
      paragraphs: [
        "CCTV surveys and written specifications are frequently requested to support claims. We can provide technical reporting where we have carried out the inspection.",
      ],
    },
  ],
};

export const legalContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Legal and responsibility",
  metaDescription: "High-level notes on drain ownership and responsibility—not legal advice.",
  intro:
    "Who maintains which drain depends on location, adoption status and deeds. This page is an overview; seek professional advice for disputes.",
  sections: [
    {
      heading: "Private vs public sewers",
      paragraphs: [
        "Drains within your boundary may be private until they connect to a public sewer. Adoption and transfer records affect maintenance duty.",
      ],
    },
    {
      heading: "Shared drains",
      paragraphs: [
        "Flats and terraces often share runs. Repairs may need agreement across multiple parties or management companies.",
      ],
    },
  ],
};

export const homeownersContent: { title: string; metaDescription: string; intro: string; sections: GuidePageSection[] } = {
  title: "Homeowners and buyers",
  metaDescription: "Drainage considerations for homeowners and those purchasing property in the UK.",
  intro:
    "Understanding drain condition before purchase or after moving in helps avoid unexpected repair bills.",
  sections: [
    {
      heading: "Pre-purchase surveys",
      paragraphs: [
        "A CCTV drain survey can reveal defects not visible in a standard building inspection, especially for older properties.",
      ],
    },
    {
      heading: "After you move in",
      paragraphs: [
        "Keep records of maintenance, know where inspection chambers are, and address slow drains early before they become emergencies.",
      ],
    },
  ],
};

export const faqPageItems: FAQItem[] = [
  {
    question: "Do you cover emergencies?",
    answer: "Yes. We provide emergency drainage response for urgent blockages and failures subject to availability in your area.",
  },
  {
    question: "Do I need a CCTV survey before repair?",
    answer: "Often yes, so the repair method matches the actual defect. In some simple blockage cases clearance may be attempted first; your engineer will advise.",
  },
  {
    question: "Do you work on commercial sites?",
    answer: "Yes. We deliver drainage services for commercial, industrial and residential clients across the UK.",
  },
];
