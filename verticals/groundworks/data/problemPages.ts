import type { ProblemData } from "engine";
import { foundationProblems as legacyFoundationProblems } from "./foundationProblems";

export interface GroundworksProblemPage extends ProblemData {
  primaryServiceSlug: string;
  primaryServiceLabel: string;
}

const addedGroundworksProblemPages: GroundworksProblemPage[] = [
  {
    slug: "subsidence-repair",
    title: "Subsidence repair planning",
    contextualOpening:
      "Subsidence repair decisions are usually made under pressure when movement starts affecting structural confidence. Foundation contractors in your area can coordinate investigation-led repair before damage and cost exposure escalate.",
    causes:
      "Subsidence can be triggered by soil shrink-swell movement, drainage washout, tree influence, historical ground instability, or foundation inadequacy.",
    howFixed:
      "We work from engineering diagnosis to deliver stabilisation methods such as underpinning, piling, or targeted foundation repair aligned to site constraints.",
    whenToCall:
      "Call when cracks are widening, differential movement appears, or a structural report flags active ground-related movement.",
    relatedServiceSlugs: ["foundation-contractors", "piling-contractors", "underpinning"],
    ctaMessage: "Need a subsidence repair route? Arrange a site review and engineering-led next-step plan.",
    quickChecks: "Log crack growth patterns, movement timing, and any drainage or ground changes around affected zones.",
    seriousSigns:
      "Escalate urgently when movement is progressing quickly, openings distort, or occupancy/safety concerns are increasing.",
    primaryServiceSlug: "foundation-contractors",
    primaryServiceLabel: "Foundation contractors",
  },
  {
    slug: "waterlogged-ground",
    title: "Waterlogged ground before construction",
    contextualOpening:
      "Waterlogged ground can quickly derail early programme milestones if not addressed before main works. Groundworks contractors in your area can define practical dewatering and formation strategy before mobilisation risk grows.",
    causes:
      "Typical causes include high water table, poor site drainage, impermeable strata, and ineffective temporary drainage planning.",
    howFixed:
      "We assess site conditions and deliver controlled drainage, dewatering, excavation sequencing, and foundation preparation aligned to design intent.",
    whenToCall:
      "Call before excavation starts, or immediately when standing water is persistent and formation stability is compromised.",
    relatedServiceSlugs: ["groundworks-contractors", "excavation-contractors", "foundation-contractors"],
    ctaMessage: "Waterlogged site conditions? Book an early site visit to protect programme and buildability.",
    quickChecks:
      "Map standing water zones, note drainage outfalls, and identify whether saturation worsens after moderate rainfall.",
    seriousSigns:
      "Urgent intervention is needed when formation integrity drops, excavation flooding repeats, or planned start dates are at risk.",
    primaryServiceSlug: "groundworks-contractors",
    primaryServiceLabel: "Groundworks contractors",
  },
  {
    slug: "poor-soil-bearing-capacity",
    title: "Poor soil bearing capacity",
    contextualOpening:
      "Poor bearing capacity becomes commercially significant when design assumptions no longer match real ground performance. Piling contractors in your area provide a viable path where shallow foundation solutions are no longer suitable.",
    causes:
      "Low bearing capacity is commonly linked to soft strata, made ground, variable fill, high moisture content, or underestimated loading conditions.",
    howFixed:
      "We deliver piling or engineered foundation solutions to structural design, with site preparation and quality control to support long-term stability.",
    whenToCall:
      "Call when geotechnical findings indicate weak strata, settlement risk is high, or design teams are revising foundation strategy.",
    relatedServiceSlugs: ["piling-contractors", "mini-piling-contractors", "foundation-contractors"],
    ctaMessage: "Ground not carrying load? Request a piling-led solution review with site-specific options.",
    quickChecks:
      "Review GI recommendations, identify high-load zones, and confirm where shallow foundation assumptions are no longer valid.",
    seriousSigns:
      "Escalate when settlement indicators are already present or when revised design is delaying procurement decisions.",
    primaryServiceSlug: "piling-contractors",
    primaryServiceLabel: "Piling contractors",
  },
  {
    slug: "foundation-cracking",
    title: "Foundation cracking response",
    contextualOpening:
      "Foundation cracking often starts as a local defect but can become a broader stability concern without early diagnosis. Foundation repair support in your area helps teams act before repair scope and disruption widen.",
    causes:
      "Cracking can result from movement, loading mismatch, poor detailing, curing defects, or underlying soil instability.",
    howFixed:
      "We work to engineer-defined repair strategy, from local structural repair to broader stabilisation where movement drivers require deeper intervention.",
    whenToCall:
      "Call when cracks are progressing, appearing across multiple zones, or linked to observable movement in adjacent building elements.",
    relatedServiceSlugs: ["foundation-repair", "foundation-contractors", "underpinning"],
    ctaMessage: "Noticing foundation cracking? Arrange a structural-groundworks review before damage escalates.",
    quickChecks: "Track crack width changes over time and record any linked door/floor alignment issues.",
    seriousSigns:
      "Urgent action is needed when crack growth is active, structural distortion appears, or crack patterns indicate movement rather than shrinkage.",
    primaryServiceSlug: "foundation-repair",
    primaryServiceLabel: "Foundation repair",
  },
  {
    slug: "foundations-too-shallow",
    title: "Foundations too shallow",
    contextualOpening:
      "Shallow foundations can turn into a structural risk once movement, frost exposure or added load starts to matter. Foundation depth issues in your area are best assessed before a repair route is chosen.",
    causes:
      "Foundations may be too shallow because the original build did not account for frost depth, soil conditions, nearby trees or later changes to the structure. Older extensions and altered buildings are especially vulnerable.",
    howFixed:
      "We review the structure and ground conditions with an engineer, then deliver underpinning, piling or local remedial work to the agreed design so the foundation reaches the required depth.",
    whenToCall:
      "Call when an inspection flags shallow founding, when cracking suggests inadequate depth, or before loading the structure further.",
    relatedServiceSlugs: ["foundation-depth-issues", "underpinning-advice", "foundation-remedial-work"],
    ctaMessage: "Foundations look too shallow? Arrange an engineer-led depth review before the issue grows.",
    quickChecks: "Record crack patterns, any seasonal movement, and whether nearby trees or frost exposure are present.",
    seriousSigns:
      "Escalate quickly when movement is progressing, doors or floors are changing level, or the foundation depth is visibly below expected support.",
    primaryServiceSlug: "foundation-depth-issues",
    primaryServiceLabel: "Foundation depth issues",
  },
  {
    slug: "extension-not-building-regs-compliant",
    title: "Extension not building regs compliant",
    contextualOpening:
      "When an extension foundation scheme fails building control checks, the fix usually needs a practical review rather than a cosmetic patch. Building regs foundation compliance support helps define the next step.",
    causes:
      "The issue may stem from insufficient depth, missing design input, undocumented changes or ground conditions not matching the approved details.",
    howFixed:
      "We review the drawings, site condition and engineer input, then carry out the remedial foundation or structural groundworks needed to align the extension with building regulations.",
    whenToCall:
      "Call when building control queries the foundation work, when sign-off is blocked, or when the extension needs remedial foundation support.",
    relatedServiceSlugs: ["building-regs-foundation-compliance", "structural-groundworks-consultation", "foundation-contractors"],
    ctaMessage: "Extension compliance issue? Book a practical foundation review before sign-off delays mount.",
    quickChecks: "Check the approved drawings, note any site changes, and record exactly what building control has queried.",
    seriousSigns:
      "Treat as urgent when the extension cannot be signed off, when access for follow-on works is limited, or when structural movement is active.",
    primaryServiceSlug: "building-regs-foundation-compliance",
    primaryServiceLabel: "Building regs foundation compliance",
  },
  {
    slug: "foundation-near-tree-clay-soil",
    title: "Foundation near tree and clay soil",
    contextualOpening:
      "Tree influence on clay soils can change moisture levels and push foundations into movement long before the problem is obvious. Clay soil foundation problems are best assessed with a site-specific review.",
    causes:
      "Nearby trees, reactive clay and shallow founding can combine to create shrink-swell movement, local settlement or seasonal cracking.",
    howFixed:
      "We coordinate with the engineer to confirm the risk, then deliver solutions such as deeper foundations, underpinning, piling or remedial work depending on the structure and ground model.",
    whenToCall:
      "Call when cracking appears near trees, when the site sits on clay, or when the structure is showing seasonal movement.",
    relatedServiceSlugs: ["clay-soil-foundation-problems", "tree-impact-foundations", "soil-bearing-capacity-testing"],
    ctaMessage: "Tree and clay soil risk? Arrange a foundation review before movement becomes structural.",
    quickChecks: "Note tree species, distance to the building, seasonal crack changes and any changes in moisture or drainage.",
    seriousSigns:
      "Escalate quickly when crack widths are changing, floors are moving, or the tree influence appears to be driving active movement.",
    primaryServiceSlug: "clay-soil-foundation-problems",
    primaryServiceLabel: "Clay soil foundation problems",
  },
  {
    slug: "house-foundation-advice",
    title: "House foundation advice",
    contextualOpening:
      "House foundation advice is most useful when you need a clear next step before committing to a repair or new foundation route. Structural groundworks consultation helps turn the symptoms into a practical plan.",
    causes:
      "Advice is usually needed because the foundation depth is uncertain, the ground conditions are variable, or a survey has highlighted movement or compliance risk.",
    howFixed:
      "We review the available drawings, symptoms and site conditions, then direct you toward the right investigation, testing or remedial foundation route.",
    whenToCall:
      "Call before starting an extension, after a survey raises concerns, or whenever you need a practical route from symptoms to remedial work.",
    relatedServiceSlugs: ["structural-groundworks-consultation", "ground-investigation-services", "foundation-contractors"],
    ctaMessage: "Need clear house foundation advice? Arrange a review before the project moves on.",
    quickChecks: "Gather drawings, survey notes, photos of cracks or movement, and any building control correspondence.",
    seriousSigns:
      "Escalate when movement is getting worse, a survey flags structural risk, or you need a formal next-step plan for a live project.",
    primaryServiceSlug: "structural-groundworks-consultation",
    primaryServiceLabel: "Structural groundworks consultation",
  },
  {
    slug: "unstable-ground-construction",
    title: "Unstable ground for construction",
    contextualOpening:
      "Unstable ground risk is typically identified when early-stage works expose inconsistent or unsafe formation behavior. Groundworks contractors in your area can move the project from uncertainty to controlled delivery planning.",
    causes:
      "Instability can be driven by variable fill, weak strata, groundwater interaction, historical disturbance, or incomplete pre-construction investigation.",
    howFixed:
      "We align with engineering recommendations to deliver stabilisation, controlled excavation, temporary works coordination, and suitable foundation implementation.",
    whenToCall:
      "Call when excavation conditions are variable, temporary works risk is increasing, or engineering teams request revised buildability sequencing.",
    relatedServiceSlugs: ["groundworks-contractors", "excavation-contractors", "enabling-works-contractors"],
    ctaMessage: "Unstable formation conditions? Book a groundworks planning visit to define safe next steps.",
    quickChecks:
      "Document where formation performance varies and identify whether instability correlates with depth, moisture, or historical made ground.",
    seriousSigns:
      "Escalate immediately when excavation support risk rises or when instability is affecting safety and programme continuity.",
    primaryServiceSlug: "groundworks-contractors",
    primaryServiceLabel: "Groundworks contractors",
  },
  {
    slug: "site-drainage-issues",
    title: "Site drainage issues during build",
    contextualOpening:
      "Site drainage issues can quickly undermine programme, access, and downstream quality if left unresolved. Excavation and groundworks teams in your area can define practical drainage correction before repeated delays set in.",
    causes:
      "Common causes include poor falls, temporary drainage gaps, blocked runs, saturation in key work zones, and uncoordinated drainage sequencing.",
    howFixed:
      "We diagnose flow and formation constraints, then implement corrected drainage paths, excavation adjustments, and phased fixes to restore workable site conditions.",
    whenToCall:
      "Call when water pooling affects access, excavation sequencing, concrete prep quality, or productivity across critical path activities.",
    relatedServiceSlugs: ["excavation-contractors", "groundworks-contractors", "enabling-works-contractors"],
    ctaMessage: "Drainage problems affecting build progress? Request a site drainage assessment and recovery plan.",
    quickChecks:
      "Map persistent pooling points and check whether temporary drainage routes align with active workfronts.",
    seriousSigns:
      "Urgency increases when drainage failure repeatedly halts work or starts affecting structural and quality-critical tasks.",
    primaryServiceSlug: "excavation-contractors",
    primaryServiceLabel: "Excavation contractors",
  },
];

const existingSlugs = new Set(legacyFoundationProblems.map((p) => p.slug));
const uniqueAdded = addedGroundworksProblemPages.filter((p) => !existingSlugs.has(p.slug));

export const groundworksProblemPages: GroundworksProblemPage[] = [
  ...(legacyFoundationProblems.map((p) => ({
    ...p,
    primaryServiceSlug: p.relatedServiceSlugs[0] ?? "foundation-contractors",
    primaryServiceLabel: "Groundworks service",
  })) as GroundworksProblemPage[]),
  ...uniqueAdded,
];

export function getGroundworksProblemPageBySlug(slug: string): GroundworksProblemPage | undefined {
  return groundworksProblemPages.find((p) => p.slug === slug);
}
