import type { InfoPageData } from "./types";

export const legalPages: InfoPageData[] = [
  {
    slug: "shared-drains-between-neighbours",
    title: "Shared Drains Between Neighbours",
    metaDescription: "Understanding shared drains between neighbours. Responsibilities, disputes and how to resolve drainage problems affecting multiple properties.",
    intro: "Shared drains — pipes that serve more than one property — are one of the most common sources of neighbour disputes about drainage. Since the 2011 Private Sewer Transfer, most shared drains in England and Wales became the responsibility of the local water company. However, understanding which drains are shared and who maintains them can still cause confusion and conflict between neighbours.",
    signs: [
      "A single drain pipe runs across or between two or more properties",
      "Multiple properties connect to the same manhole before the public sewer",
      "Drainage problems at one property affect the neighbour's drains",
      "Disagreements about who should pay for drain repairs",
      "Blocked drains repeatedly caused by usage from adjacent properties",
      "No clear documentation showing which drains are private vs shared"
    ],
    diagnosis: "We conduct a CCTV drain survey with drain tracing to map the full drainage layout across both properties. This clearly shows which pipes serve only one property (private — owner's responsibility) and which are shared (usually water company's since 2011). We reference official sewer maps and provide an annotated drainage plan.",
    resolution: "If the drain is shared and was in existence before July 2011, it's almost certainly the water company's responsibility. We help you report it with supporting CCTV evidence. If the drain is genuinely private (serving only your property), we provide repair quotes. For ongoing disputes, our drainage plans provide definitive evidence of pipe ownership.",
    ctaText: "Dispute about shared drains? Let us survey and map the system to clarify responsibility.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair", "drain-excavation"],
    relatedPages: [
      { slug: "shared-drain-responsibility", category: "insurance", title: "Shared Drain Responsibility UK" },
      { slug: "drain-mapping", category: "inspection", title: "Drain Mapping" },
      { slug: "drain-repair-cost", category: "costs", title: "Drain Repair Cost" },
      { slug: "drain-relining-vs-excavation", category: "repair-methods", title: "Relining vs Excavation" }
    ]
  },
  {
    slug: "drain-boundary-responsibility",
    title: "Drain Boundary Responsibility",
    metaDescription: "Who is responsible for drains at property boundaries? Understanding drainage responsibility where properties meet.",
    intro: "Drainage responsibility at property boundaries can be confusing, especially where pipes cross from one property to another or run along shared boundary lines. Knowing where your drainage responsibility ends and someone else's begins can save you thousands of pounds in repair costs you shouldn't be paying.",
    signs: [
      "Drain pipe crosses from your property into a neighbour's land",
      "Manhole or junction sits exactly on the property boundary",
      "Drainage problem originates on neighbouring land but affects your property",
      "Tree roots from a neighbour's tree damaging drains on your property",
      "Shared access to manholes or inspection chambers on the boundary",
      "Uncertainty about whether a lateral drain is private or adopted"
    ],
    diagnosis: "We use CCTV surveys combined with drain tracing and GPS mapping to determine the exact position of pipes relative to property boundaries. We cross-reference with Land Registry plans, water company sewer maps, and local authority records to provide a definitive answer on responsibility.",
    resolution: "Our detailed drainage plan clearly marks which pipes are your responsibility, which are shared, and which belong to the water company. This evidence resolves boundary disputes, supports insurance claims, and ensures you only pay for repairs on pipes you actually own.",
    ctaText: "Confused about drain boundary responsibility? Get a definitive answer with our survey.",
    relatedServices: ["cctv-drain-surveys", "drain-excavation", "drain-collapse-repair"],
    relatedPages: [
      { slug: "who-is-responsible", category: "insurance", title: "Who Is Responsible?" },
      { slug: "sewer-responsibility-uk", category: "insurance", title: "Sewer Responsibility UK" },
      { slug: "drain-tracing", category: "inspection", title: "Drain Tracing" },
      { slug: "drain-mapping", category: "inspection", title: "Drain Mapping" }
    ]
  },
  {
    slug: "can-tree-roots-damage-neighbour-drains",
    title: "Can Tree Roots Damage Neighbour's Drains?",
    metaDescription: "Can your tree roots damage a neighbour's drains? Legal responsibility, prevention and repair options when tree roots cross boundaries.",
    intro: "Tree roots don't respect property boundaries. If your tree's roots extend into a neighbour's property and damage their drainage system, you could be held legally liable for the repair costs. Equally, if a neighbour's tree is damaging your drains, understanding your rights is essential for resolving the situation.",
    signs: [
      "Large trees growing near the property boundary",
      "Neighbour experiencing recurring drain blockages near your trees",
      "CCTV survey showing root ingress from trees on adjacent property",
      "Drain damage in the area closest to boundary trees",
      "Previous root-related drainage problems on either property",
      "Fast-growing species like willows, poplars, or oaks near drain runs"
    ],
    diagnosis: "We conduct CCTV surveys on both sides of the boundary (with permission) to determine which roots are causing damage and which trees they belong to. Our drain tracing shows the pipe route relative to tree positions, and we can identify root species from CCTV footage in many cases.",
    resolution: "We remove roots from inside the pipe using mechanical cutting and jetting, then reline the affected sections to prevent re-entry. For legal disputes, our survey report provides evidence of which tree caused the damage, supporting claims against the tree owner's insurance or directly.",
    ctaText: "Tree root damage crossing boundaries? We survey, clear and repair — with evidence for claims.",
    relatedServices: ["drain-root-removal", "drain-relining", "cctv-drain-surveys"],
    relatedPages: [
      { slug: "tree-roots-in-drains", category: "causes", title: "Tree Roots in Drains" },
      { slug: "drain-root-removal", category: "service", title: "Drain Root Removal" },
      { slug: "drain-relining-cost", category: "costs", title: "Drain Relining Cost" },
      { slug: "how-drain-relining-works", category: "repair-methods", title: "How Drain Relining Works" }
    ]
  }
];
