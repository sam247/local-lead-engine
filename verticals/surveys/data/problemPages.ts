import type { ProblemData } from "engine";

export interface SurveyProblemPage extends ProblemData {
  primaryServiceSlug: string;
  primaryServiceLabel: string;
}

export const surveyProblemPages: SurveyProblemPage[] = [
  {
    slug: "boundary-dispute",
    title: "Boundary dispute survey",
    contextualOpening:
      "Boundary dispute survey work is usually commissioned when property owners need defensible evidence before legal positions harden. A boundary survey in your area gives you a clear measured baseline that supports practical resolution rather than prolonged argument.",
    causes:
      "Boundary disputes usually start when fence lines, walls, driveways, or title plan interpretations do not match what is on site. Historic alterations, missing markers, and conflicting documents are common triggers.",
    howFixed:
      "We carry out a measured boundary survey, compare the findings to available title information, and provide clear drawings suitable for solicitor and surveyor review. The output helps both sides move toward evidence-led resolution.",
    whenToCall:
      "Call when a neighbour challenge, sale process, extension design, or legal correspondence raises uncertainty around boundary position. Early survey evidence usually prevents escalating cost and delay.",
    relatedServiceSlugs: ["boundary-survey", "topographical-survey"],
    ctaMessage: "Need clarity on a disputed boundary? Request a site survey and get measured evidence for the next legal step.",
    quickChecks:
      "Gather title plans, recent conveyancing documents, and any historic photos showing boundary features. Mark where disagreement starts and where physical markers differ from paperwork.",
    seriousSigns:
      "Treat the issue as urgent when legal letters have started, planned building works are blocked, or a sale is at risk because boundary position cannot be agreed.",
    primaryServiceSlug: "boundary-survey",
    primaryServiceLabel: "Boundary survey",
  },
  {
    slug: "unknown-utilities",
    title: "Unknown utilities on site",
    contextualOpening:
      "Unknown utility risk is one of the fastest ways to stall excavation and increase project exposure. A utility survey gives teams in your area a safer dig strategy before construction activity escalates.",
    causes:
      "Utility uncertainty happens when records are incomplete, legacy services were never updated, or prior alterations were undocumented. On older or redeveloped land, unknown cables and pipes are common.",
    howFixed:
      "We run utility detection and mapping using EML and GPR, correlate findings with records, and issue coordinated drawings so engineers and contractors can plan around real constraints.",
    whenToCall:
      "Call before excavation, drainage installation, piling, or service diversions. It is typically required when programme risk and safety obligations need to be reduced before ground is broken.",
    relatedServiceSlugs: ["utility-survey", "utility-mapping-survey", "topographical-survey"],
    ctaMessage: "Before digging, request a utility mapping survey to reduce strike risk and protect programme certainty.",
    quickChecks:
      "Collect utility records, previous as-built plans, and known service entry points. Identify high-risk work zones where live services could intersect planned excavation.",
    seriousSigns:
      "Escalate urgently when project teams are ready to excavate without verified service mapping, or when record packs conflict with what is visible on site.",
    primaryServiceSlug: "utility-survey",
    primaryServiceLabel: "Utility survey",
  },
  {
    slug: "structural-movement",
    title: "Structural movement survey support",
    contextualOpening:
      "Structural movement concerns usually emerge when cracks, distortion, or level changes start affecting confidence in the building. Measured survey evidence helps teams in your area move from concern to an actionable remediation plan.",
    causes:
      "Movement can be linked to foundation change, moisture variation, drainage defects, adjacent works, or differential settlement between building elements. The trigger is often visible cracking that worsens over time.",
    howFixed:
      "We deliver measured and topographical survey data to support structural assessment, enabling engineers to diagnose movement patterns and define targeted repair or stabilisation options.",
    whenToCall:
      "Call when cracks are widening, floor levels appear to shift, or an engineer requests verified measurements before design decisions are made.",
    relatedServiceSlugs: ["measured-building-survey", "topographical-survey", "utility-survey"],
    ctaMessage: "Concerned about movement? Arrange a measured survey so your engineer can specify the right next step.",
    quickChecks:
      "Record crack positions, note dates of visible change, and identify whether movement appears localised or affecting multiple areas.",
    seriousSigns:
      "Treat as urgent when cracking accelerates, openings distort quickly, or movement affects safety, occupancy, or insurance timelines.",
    primaryServiceSlug: "measured-building-survey",
    primaryServiceLabel: "Measured building survey",
  },
  {
    slug: "survey-required-planning",
    title: "Survey required for planning",
    contextualOpening:
      "Planning-stage projects frequently stall because required survey evidence is missing or incomplete. A planning-ready survey package in your area helps avoid avoidable planning delays and redesign cycles.",
    causes:
      "Planning constraints are often triggered by missing topographical context, unclear boundary data, unresolved utility constraints, or insufficient existing-condition information in submitted drawings.",
    howFixed:
      "We scope and deliver the required survey outputs for planning teams, including topographical, boundary, and utility context where needed, so submissions are based on verified site data.",
    whenToCall:
      "Call when planning consultants request measured site information, when pre-app feedback flags missing technical context, or when revisions are recurring due to data gaps.",
    relatedServiceSlugs: ["topographical-survey", "boundary-survey", "utility-mapping-survey"],
    ctaMessage:
      "Need planning-ready survey outputs? Request a site survey package aligned to your consultant’s submission requirements.",
    quickChecks:
      "Confirm submission checklist items, map requested drawing outputs, and identify where site conditions are currently assumed rather than measured.",
    seriousSigns:
      "Escalate quickly when planning deadlines are close, redesign costs are rising, or authorities have requested additional site evidence.",
    primaryServiceSlug: "topographical-survey",
    primaryServiceLabel: "Topographical survey",
  },
  {
    slug: "drainage-layout-unknown",
    title: "Drainage layout unknown",
    contextualOpening:
      "When drainage layout is unclear, design and construction decisions become higher risk very quickly. A utility and drainage mapping survey gives teams in your area a reliable basis for planning, excavation, and build sequencing.",
    causes:
      "Unknown drainage routes are common on altered sites, older properties, and developments with incomplete records. Missing chamber data and undocumented diversions are typical causes.",
    howFixed:
      "We map drainage and utility routes, verify key connections where possible, and provide coordinated outputs that reduce design assumptions before works begin.",
    whenToCall:
      "Call before groundworks, extensions, or utility coordination where drainage unknowns could create clashes, rework, or approval delays.",
    relatedServiceSlugs: ["utility-mapping-survey", "utility-survey", "topographical-survey"],
    ctaMessage: "Unclear drainage routes? Book a mapping survey to define layout before design or excavation commitments.",
    quickChecks:
      "Compile drainage records, identify known inspection points, and note any recurring blockage or flooding positions that suggest undocumented routes.",
    seriousSigns:
      "Treat as urgent when drainage conflicts are already impacting design sign-off, excavation start dates, or build-over approvals.",
    primaryServiceSlug: "utility-mapping-survey",
    primaryServiceLabel: "Utility mapping survey",
  },
  {
    slug: "pre-purchase-issues",
    title: "Pre-purchase survey issues",
    contextualOpening:
      "Pre-purchase issues can turn into expensive liabilities when site and building data is unclear before exchange. A targeted survey in your area helps buyers understand risk, scope likely remediation, and negotiate with confidence.",
    causes:
      "Issues usually arise from unclear boundaries, undocumented utilities, hidden level constraints, or building measurement discrepancies discovered late in due diligence.",
    howFixed:
      "We deliver focused pre-purchase survey outputs so buyers and advisors can assess constraints, quantify likely follow-on work, and make evidence-led decisions before completion.",
    whenToCall:
      "Call when a purchase is conditional on further technical evidence, when legal advisors request site clarity, or when findings could affect valuation and negotiation.",
    relatedServiceSlugs: ["measured-building-survey", "topographical-survey", "boundary-survey"],
    ctaMessage: "Need clearer pre-purchase risk visibility? Arrange a focused survey before committing to exchange.",
    quickChecks:
      "List lender and solicitor information requests, review any flagged survey concerns, and prioritise areas likely to affect cost or legal position.",
    seriousSigns:
      "Escalate when exchange deadlines are close, major unknowns remain unresolved, or survey concerns could materially affect value or deal viability.",
    primaryServiceSlug: "measured-building-survey",
    primaryServiceLabel: "Measured building survey",
  },
];

export function getSurveyProblemPageBySlug(slug: string): SurveyProblemPage | undefined {
  return surveyProblemPages.find((p) => p.slug === slug);
}
