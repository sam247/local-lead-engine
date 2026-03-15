import type { InfoPageData } from "engine";

export const groundConditionsPages: InfoPageData[] = [
  {
    slug: "made-ground-and-fill",
    title: "Made ground and fill",
    metaDescription: "Building on made ground and fill. Ground investigation and foundation options for development on fill.",
    intro: "Made ground is soil or material that has been placed by human activity rather than left naturally. It can be variable, poorly compacted or contaminated. Building on made ground usually requires a ground investigation and foundations designed for the conditions — often piling or raft foundations.",
    signs: ["Variable stiffness and strength across the site", "Possible contamination from previous use", "Settlement risk if not properly addressed", "Ground investigation needed before design", "Piling or raft often specified"],
    diagnosis: "A ground investigation (trial pits, boreholes, lab testing) identifies the depth and nature of the made ground and the suitable foundation type. We work from the report and structural design.",
    resolution: "We install piling, raft or other foundations specified for made ground. We follow the design and provide certification. Good construction practice and quality control reduce settlement risk.",
    ctaText: "Building on made ground? We deliver foundations to your engineer's specification.",
    relatedServices: ["piling-contractors", "foundation-contractors", "groundworks-contractors"],
    relatedPages: [
      { slug: "soft-soils-and-foundations", category: "ground-conditions", title: "Soft soils and foundations" },
      { slug: "when-is-piling-required", category: "guides", title: "When Is Piling Required?" },
    ],
  },
  {
    slug: "soft-soils-and-foundations",
    title: "Soft soils and foundations",
    metaDescription: "Foundations on soft soils. When piling or raft foundations are needed and how we deliver them.",
    intro: "Soft or compressible soils cannot safely support conventional strip or pad foundations. A ground investigation will recommend piling, raft foundations or ground improvement. We install the foundation type specified by your structural engineer.",
    signs: ["Low bearing capacity from soil testing", "Peat, silt or very soft clay", "Raft or piling specified in design", "Need for minimal settlement", "Ground improvement sometimes an option"],
    diagnosis: "The structural engineer uses the ground investigation report to choose the foundation type. We then quote and deliver to the design, with testing and certification as required.",
    resolution: "We install piling (driven, bored or mini piling) or raft foundations to design. We work with the specified depths and loads and provide documentation for building control.",
    ctaText: "Need foundations on soft ground? We deliver piling and rafts to design.",
    relatedServices: ["piling-contractors", "mini-piling-contractors", "foundation-contractors"],
    relatedPages: [
      { slug: "made-ground-and-fill", category: "ground-conditions", title: "Made ground and fill" },
      { slug: "when-is-piling-required", category: "guides", title: "When Is Piling Required?" },
    ],
  },
  {
    slug: "when-piling-is-needed",
    title: "When piling is needed",
    metaDescription: "When do you need piling? Ground conditions and building types that require piled foundations.",
    intro: "Piling is needed when the ground cannot support shallow foundations, when loads are high, or when minimal settlement is required. Made ground, soft soils, contaminated land and slope stability are common reasons. This guide summarises when piling is specified and what to expect.",
    signs: ["Ground investigation recommends piling", "Strip or pad foundations would be too large or unstable", "High loads or sensitive structures", "Contaminated or variable ground", "Minimum disturbance or vibration limits"],
    diagnosis: "A structural engineer specifies piling from the ground investigation and structural design. We then install the chosen piling type (driven, bored, mini or sheet) to the design.",
    resolution: "We deliver piling to design with load testing and certification. We work across the UK for housing, commercial and infrastructure projects.",
    ctaText: "Have a piling specification? Get a quote from us.",
    relatedServices: ["piling-contractors", "mini-piling-contractors", "foundation-contractors"],
    relatedPages: [
      { slug: "made-ground-and-fill", category: "ground-conditions", title: "Made ground and fill" },
      { slug: "piling-cost", category: "guides", title: "Piling Cost Guide" },
    ],
  },
];
