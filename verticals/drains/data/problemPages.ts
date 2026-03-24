import type { ProblemData } from "engine";
import { drainProblems as legacyDrainProblems } from "./problems";

export interface DrainProblemPage extends ProblemData {
  primaryServiceSlug: string;
  primaryServiceLabel: string;
}

const addedDrainProblemPages: DrainProblemPage[] = [
  {
    slug: "blocked-drains",
    title: "Blocked drains in your area",
    contextualOpening:
      "Blocked drains usually become urgent when wastewater starts backing up and normal use is disrupted. A blocked drains service in your area gives you a fast route from symptom to confirmed fix before repeat failures escalate.",
    causes:
      "Blocked drains are commonly caused by grease and wipes, debris accumulation, root ingress, and partially collapsed pipe sections that trap waste over time.",
    howFixed:
      "We inspect and clear the blockage using jetting or mechanical methods, then verify condition with CCTV where repeat risk is suspected and repair any structural causes found.",
    whenToCall:
      "Call when fixtures are backing up, outside gullies overflow, or blockages keep returning after temporary clearing.",
    relatedServiceSlugs: ["drain-unblocking", "drain-jetting", "cctv-drain-surveys"],
    ctaMessage: "Blocked drains now? Request a rapid inspection and get the right fix before disruption spreads.",
    quickChecks:
      "Check whether one outlet or multiple outlets are affected, and note any gurgling, foul smells, or overflow points.",
    seriousSigns:
      "Treat as urgent if sewage backs up indoors, external chambers overflow, or repeated blockages return quickly after clearing.",
    primaryServiceSlug: "drain-unblocking",
    primaryServiceLabel: "Drain unblocking",
  },
  {
    slug: "collapsed-drain",
    title: "Collapsed drain symptoms",
    contextualOpening:
      "Collapsed drain issues are usually identified when recurring failures stop being manageable with simple unblocking. Drain collapse repair in your area helps stabilise the problem before subsidence and surface damage become more expensive.",
    causes:
      "Common causes include aging pipe materials, root ingress, heavy loading over shallow runs, and ground movement that fractures or displaces joints.",
    howFixed:
      "We confirm collapse location via CCTV and deliver repair by excavation or suitable no-dig methods where structurally viable, followed by reinstatement.",
    whenToCall:
      "Call when you see sinkage, repeated blockages, foul odour persistence, or sudden multi-outlet drainage failure.",
    relatedServiceSlugs: ["drain-collapse-repair", "cctv-drain-surveys", "drain-excavation"],
    ctaMessage: "Suspect a collapsed drain? Book a survey and get a clear repair plan with timelines.",
    quickChecks: "Record where symptoms recur and whether they worsen after rainfall or heavy usage.",
    seriousSigns:
      "Escalate immediately if ground starts sinking, wastewater appears externally, or blockage recurrence accelerates.",
    primaryServiceSlug: "drain-collapse-repair",
    primaryServiceLabel: "Drain collapse repair",
  },
  {
    slug: "drain-flooding",
    title: "Drain flooding and overflow",
    contextualOpening:
      "Drain flooding is a high-intent trigger because it quickly becomes a hygiene and property-risk issue. Emergency drainage support in your area helps contain immediate risk and move straight into root-cause repair.",
    causes:
      "Flooding usually follows downstream blockage, partial collapse, root restriction, or surcharged runs where the system cannot discharge effectively.",
    howFixed:
      "We isolate and clear the immediate restriction, inspect with CCTV, and complete required repair so recurrence risk is reduced.",
    whenToCall:
      "Call as soon as standing wastewater, chamber overflow, or backflow appears in external or internal drainage points.",
    relatedServiceSlugs: ["emergency-drainage", "drain-unblocking", "cctv-drain-surveys"],
    ctaMessage: "Drain flooding now? Request emergency attendance and rapid diagnosis.",
    quickChecks: "Stop non-essential water use and record exact overflow points for faster on-site diagnosis.",
    seriousSigns:
      "Any wastewater flooding is urgent, especially near building thresholds, internal drains, or pedestrian areas.",
    primaryServiceSlug: "emergency-drainage",
    primaryServiceLabel: "Emergency drainage",
  },
  {
    slug: "slow-drainage",
    title: "Slow drainage across property",
    contextualOpening:
      "Slow drainage often looks minor at first but usually signals a developing restriction that will worsen under load. A CCTV drain survey in your area can confirm whether this is simple build-up or a structural defect needing repair.",
    causes:
      "Slow flow is commonly caused by partial blockage, root ingress, incorrect gradient, or localised pipe deformation.",
    howFixed:
      "We inspect and clear where possible, then repair structural defects with relining or excavation where condition requires it.",
    whenToCall:
      "Call when slow flow affects multiple outlets, worsens over weeks, or is paired with odour and gurgling.",
    relatedServiceSlugs: ["cctv-drain-surveys", "drain-jetting", "drain-relining"],
    ctaMessage: "Persistent slow drainage? Arrange a survey before it becomes a full blockage.",
    quickChecks:
      "Track which outlets are affected and whether symptoms worsen at peak usage times or after rain.",
    seriousSigns:
      "Treat as urgent when slowness spreads across fixtures, backups start, or previous clearing has not held.",
    primaryServiceSlug: "cctv-drain-surveys",
    primaryServiceLabel: "CCTV drain survey",
  },
  {
    slug: "tree-roots-in-drains",
    title: "Tree roots in drains",
    contextualOpening:
      "Root ingress issues often present as recurring blockage that never fully resolves. Drain root removal in your area helps stop repeat disruption and protect the pipe before collapse risk increases.",
    causes:
      "Roots exploit joints and cracks, then expand inside the drain run, trapping debris and accelerating pipe damage.",
    howFixed:
      "We confirm ingress by CCTV, remove roots mechanically and by jetting, and repair or reline vulnerable sections to reduce regrowth risk.",
    whenToCall:
      "Call when blockages recur in the same area, CCTV indicates root entry, or nearby mature trees align with the affected run.",
    relatedServiceSlugs: ["drain-root-removal", "cctv-drain-surveys", "drain-relining"],
    ctaMessage: "Recurring root blockage? Book root-removal and structural repair planning.",
    quickChecks: "Note repeat blockage locations and identify nearby trees along likely drain paths.",
    seriousSigns:
      "Urgent action is needed when recurring blockage frequency rises or CCTV shows structural cracking with root penetration.",
    primaryServiceSlug: "drain-root-removal",
    primaryServiceLabel: "Drain root removal",
  },
  {
    slug: "drain-smell-outside",
    title: "Drain smell outside property",
    contextualOpening:
      "Persistent outside drain smell is usually a symptom of leakage, blockage, or trapped gas pressure in the system. A CCTV drain survey in your area identifies the source so repair can be targeted instead of repeatedly masked.",
    causes:
      "Typical causes include failed seals, cracked runs, trapped waste, blocked vents, and partial collapses allowing foul gas or wastewater leakage.",
    howFixed:
      "We inspect the system, identify the exact defect, and complete the relevant repair from clearance and seal replacement to relining or section replacement.",
    whenToCall:
      "Call when odour is persistent, localised, and worsening, especially with visible wet patches or recurring drainage faults.",
    relatedServiceSlugs: ["cctv-drain-surveys", "drain-collapse-repair", "drain-relining"],
    ctaMessage: "Outside drain smell won’t clear? Book a survey and targeted repair recommendation.",
    quickChecks: "Check if odour is strongest near one access point and whether it worsens after rainfall.",
    seriousSigns:
      "Escalate if odour is intense, accompanied by ground dampness, or paired with repeated blockage and overflow.",
    primaryServiceSlug: "cctv-drain-surveys",
    primaryServiceLabel: "CCTV drain survey",
  },
];

const existingSlugs = new Set(legacyDrainProblems.map((p) => p.slug));
const uniqueAdded = addedDrainProblemPages.filter((p) => !existingSlugs.has(p.slug));

export const drainProblemPages: DrainProblemPage[] = [
  ...(legacyDrainProblems.map((p) => ({
    ...p,
    primaryServiceSlug: p.relatedServiceSlugs[0] ?? "drain-collapse-repair",
    primaryServiceLabel: "Drainage service",
  })) as DrainProblemPage[]),
  ...uniqueAdded,
];

export function getDrainProblemPageBySlug(slug: string): DrainProblemPage | undefined {
  return drainProblemPages.find((p) => p.slug === slug);
}
