import type { InfoPageData } from "engine";

export const groundworksCostsPages: InfoPageData[] = [
  {
    slug: "groundworks-cost-overview",
    title: "Groundworks cost overview",
    metaDescription: "Groundworks costs: piling, foundations, excavation and site clearance. Cost overview for UK projects.",
    intro: "Groundworks costs depend on the type of work (piling, foundations, excavation, clearance), site conditions and programme. This guide gives an overview of what drives cost and how to budget. Detailed cost guides for each trade are available in our main guides section.",
    signs: ["Piling: from around £150–600 per linear metre depending on type", "Strip and pad foundations: from around £150–250 per m²", "Excavation: typically £15–45 per m³", "Site clearance: from £500–2,000+ depending on scope", "Ground investigation and design are additional"],
    diagnosis: "We quote from your drawings, site visit and programme. Ground conditions and access have a big impact on final cost.",
    resolution: "We provide fixed-price quotes where possible and deliver to programme with full documentation. Get in touch with your project details for a tailored quote.",
    ctaText: "Need a groundworks quote? Send us your design and site details.",
    relatedServices: ["groundworks-contractors", "piling-contractors", "foundation-contractors"],
    relatedPages: [
      { slug: "piling-cost", category: "guides", title: "Piling Cost Guide" },
      { slug: "foundation-cost", category: "guides", title: "Foundation Cost Guide" },
    ],
  },
  {
    slug: "budgeting-for-groundworks",
    title: "Budgeting for groundworks",
    metaDescription: "How to budget for groundworks: surveys, design, piling, foundations and contingency.",
    intro: "Budgeting for groundworks should allow for surveys, ground investigation, structural design, the main works (clearance, excavation, piling or foundations) and a contingency for unknowns. This guide helps you plan the budget and get quotes at the right stage.",
    signs: ["Surveys and ground investigation: typically £1,500–5,000+", "Structural design: varies with project size", "Main works: quoted after design and site visit", "Contingency: 10–15% for groundworks is common", "Programme and access affect cost"],
    diagnosis: "We advise on the right sequence: survey and ground investigation first, then design, then our quote for the works. Early engagement helps avoid surprises.",
    resolution: "We provide clear quotes and work to programme. We can work with your designer or engineer to align scope and budget.",
    ctaText: "Planning your groundworks budget? Contact us for advice and a quote.",
    relatedServices: ["groundworks-contractors", "foundation-contractors", "piling-contractors"],
    relatedPages: [
      { slug: "groundworks-cost-overview", category: "groundworks-costs", title: "Groundworks cost overview" },
      { slug: "excavation-cost", category: "guides", title: "Excavation Cost" },
    ],
  },
];
