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
