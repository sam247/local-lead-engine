import type { ProblemData } from "engine";

export const foundationProblems: ProblemData[] = [
  {
    slug: "foundation-subsidence",
    title: "Foundation subsidence",
    causes:
      "Subsidence occurs when the ground beneath foundations moves or shrinks, often due to clay shrinkage in dry weather, soil washout from leaking drains, or mining. Trees close to the building can also cause localised subsidence by drawing moisture from the soil.",
    howFixed:
      "We work with structural engineers to stabilise foundations where needed — from underpinning and piling to repairing the cause (e.g. drain repairs). Ground investigation and monitoring determine the right solution. We deliver piling and foundation repairs to design.",
    whenToCall:
      "Call when you see new or worsening cracks, sticking doors or uneven floors. Early investigation (ground and drainage) helps identify the cause and the right fix before damage worsens.",
    relatedServiceSlugs: ["foundation-contractors", "piling-contractors", "mini-piling-contractors"],
    ctaMessage:
      "For foundation subsidence, we can carry out ground investigation and deliver piling or underpinning to your engineer's specification.",
  },
  {
    slug: "foundation-cracking",
    title: "Foundation cracking",
    causes:
      "Cracks in foundations can be caused by ground movement, shrinkage of concrete, inadequate design for the ground conditions, or damage during excavation. Fine cracks may be cosmetic; wider or progressive cracks need assessment.",
    howFixed:
      "We assess the cause with reference to ground conditions and design. Repairs range from crack injection and local reinforcement to partial or full foundation replacement. We work to the structural engineer's specification and provide certification.",
    whenToCall:
      "Call when you notice new cracks, cracks that are widening, or before extending or loading the building further. A structural survey and ground investigation will define the remedy.",
    relatedServiceSlugs: ["foundation-contractors", "concrete-foundations", "piling-contractors"],
    ctaMessage:
      "Need foundation crack assessment or repair? We work with engineers to deliver the right solution.",
  },
  {
    slug: "inadequate-foundation-design",
    title: "Inadequate foundation design",
    causes:
      "Foundations can be inadequate when they were designed for different ground conditions, when the building has been extended or loaded beyond the original design, or when the ground investigation was insufficient. Made ground, soft soils or variable strata often require a revised design.",
    howFixed:
      "We work from a revised design from your structural engineer, often following a new ground investigation. Solutions include piling, raft foundations or localised underpinning. We deliver to design with testing and certification.",
    whenToCall:
      "Call when a structural survey or purchase report flags foundation adequacy, or when you are planning an extension or change of use. Updated ground investigation and design come first.",
    relatedServiceSlugs: ["foundation-contractors", "piling-contractors", "mini-piling-contractors"],
    ctaMessage:
      "For inadequate or under-designed foundations, we deliver piling and foundation works to your engineer's specification.",
  },
];

export function getFoundationProblemBySlug(slug: string): ProblemData | undefined {
  return foundationProblems.find((p) => p.slug === slug);
}
