import { buildIntentArticle, type ScenarioArticleDefinition } from "engine";

const definitions: ScenarioArticleDefinition[] = [
  {
    slug: "signs-of-drain-collapse",
    title: "How to Tell if a Drain Has Collapsed",
    excerpt: "A diagnostic guide explaining the signs that point to structural drain failure rather than a routine blockage.",
    date: "2024-01-15",
    image: "/images/blog/signs-of-drain-collapse.jpg",
    category: "Diagnostic",
    intent: "diagnostic",
    serviceSlug: "drain-collapse-repair",
    serviceTitle: "Drain Collapse Repair",
    locationId: "london",
    locationName: "London",
    propertyType: "basement office beneath a Victorian townhouse",
    specificIssue: "foul backing-up and floor-level damp from a collapsed clay section",
    constraints: ["occupied basement rooms", "neighbouring utility runs"],
    issueSummary:
      "The useful signs were not dramatic at first: repeated foul smells, slower discharge under load, and damp at basement level after use rather than after rainfall alone.",
    handledSummary:
      "The first practical step was a targeted CCTV check to confirm whether the symptoms came from a blockage or a structural failure. Once the camera showed the collapsed section, the scope could move straight into a controlled repair plan.",
    resultSummary:
      "The example matters because it shows when the symptoms move beyond maintenance and into structural failure. That difference is what turns a general drainage problem into a collapse repair decision.",
    whenNeededSummary:
      "A diagnostic check like this is usually needed when slow drainage, smells, and localised damp keep presenting together on an older run, especially below ground-floor or basement level.",
    relatedServiceLinks: [
      { href: "/cctv-drain-surveys/london", label: "CCTV drain surveys in London" },
      { href: "/drain-relining/london", label: "drain relining in London" },
    ],
    guideLink: { href: "/drainage-guides/what-does-a-cctv-drain-survey-show", label: "what a CCTV drain survey actually shows" },
    projectLink: { href: "/projects/collapsed-clay-pipe-london-townhouse", label: "collapsed clay pipe beneath townhouse forecourt" },
    faq: [
      { question: "What usually points to a collapse rather than a simple blockage?", answer: "Repeated foul smells, persistent slow discharge, local settlement, or basement-level backing-up after previous clearing work are the signs that usually justify a structural survey rather than another routine clear." },
      { question: "Do all collapsed drains need full excavation?", answer: "Not always. The survey decides that. Some defects can be lined, but a fully collapsed section or a void affecting the surface above normally pushes the job toward excavation and replacement." },
    ],
  },
  {
    slug: "drain-relining-vs-excavation",
    title: "Drain Relining vs Excavation: Which Route Fits the Site?",
    excerpt: "A decision-making article explaining when trenchless repair makes sense and when excavation is still the right answer.",
    date: "2024-01-08",
    image: "/images/blog/drain-relining-vs-excavation.jpg",
    category: "Decision",
    intent: "decision-making",
    serviceSlug: "drain-relining",
    serviceTitle: "Drain Relining",
    locationId: "richmond",
    locationName: "Richmond",
    propertyType: "basement flat in a period conversion",
    specificIssue: "a cracked branch drain beneath shared internal access",
    constraints: ["shared hallway route", "pipe run beneath neighbouring property"],
    issueSummary:
      "On this kind of site, the question is not which method sounds better in theory. The question is whether the pipe is still open enough to line and whether excavation would create a disproportionate amount of disruption.",
    handledSummary:
      "The practical route is to survey first, then compare access, structural condition, and reinstatement risk. In this Richmond case, the branch condition supported relining, so the site avoided tearing through shared finishes to reach the pipe.",
    resultSummary:
      "The useful outcome is a decision based on pipe condition and site constraints rather than habit. That is why trenchless work often makes sense on conversions, but not every damaged run is a lining candidate.",
    whenNeededSummary:
      "This comparison is most relevant when the site is constrained, the property is occupied, or the drain sits below finished floors or shared access where open excavation becomes a wider building issue.",
    relatedServiceLinks: [
      { href: "/cctv-drain-surveys/richmond", label: "CCTV drain surveys in Richmond" },
      { href: "/drain-excavation/richmond", label: "drain excavation in Richmond" },
    ],
    guideLink: { href: "/drainage-guides/cctv-drain-survey-cost", label: "what affects CCTV drain survey cost" },
    projectLink: { href: "/projects/richmond-basement-flat-drain-relining", label: "drain relining for basement flat in Richmond" },
  },
  {
    slug: "cctv-drain-survey-guide",
    title: "What Does a CCTV Drain Survey Actually Show?",
    excerpt: "An explanatory guide showing what CCTV footage reveals, what it changes in the decision, and when a survey is worth booking.",
    date: "2023-12-20",
    image: "/images/blog/cctv-drain-survey-guide.jpg",
    category: "Explanatory",
    intent: "explanatory",
    serviceSlug: "cctv-drain-surveys",
    serviceTitle: "CCTV Drain Surveys",
    locationId: "chiswick",
    locationName: "Chiswick",
    propertyType: "Edwardian family house",
    specificIssue: "uncertain drainage condition before exchange",
    constraints: ["short vendor access window"],
    issueSummary:
      "What matters on an older house is not just whether the pipe flows on the day. Buyers usually need to understand materials, previous patch repairs, and whether the defects are maintenance items or structural issues.",
    handledSummary:
      "The survey process works because it gives the decision maker a view inside the run rather than another assumption based on age and symptoms. On this site, the useful output was the footage and the defect locations, not a generic reassurance that the drains had been checked.",
    resultSummary:
      "The result was a clearer purchase decision and a better basis for pricing follow-up work. That is the practical value of CCTV on older stock: it converts uncertainty into something that can actually be scoped.",
    whenNeededSummary:
      "This is most useful before purchase, before major refurbishment, or after repeat symptoms where the same run keeps being cleared without anybody confirming the condition inside the pipe.",
    relatedServiceLinks: [
      { href: "/drain-collapse-repair/chiswick", label: "drain collapse repair in Chiswick" },
      { href: "/drain-relining/chiswick", label: "drain relining in Chiswick" },
    ],
    guideLink: { href: "/drainage-guides/what-does-a-cctv-drain-survey-show", label: "what a CCTV drain survey shows" },
    projectLink: { href: "/projects/chiswick-prepurchase-cctv-drain-survey", label: "pre-purchase CCTV survey on Edwardian house in Chiswick" },
  },
  {
    slug: "preventing-blocked-drains",
    title: "What Usually Causes Repeated Blocked Drains?",
    excerpt: "An explanatory article showing why recurring blockages come back when the underlying restriction sits deeper in the system.",
    date: "2023-12-12",
    image: "/images/blog/preventing-blocked-drains.jpg",
    category: "Explanatory",
    intent: "explanatory",
    serviceSlug: "blocked-drains",
    serviceTitle: "Blocked Drains",
    locationId: "fulham",
    locationName: "Fulham",
    propertyType: "mansion flat with shared branch connection",
    specificIssue: "repeat kitchen and bathroom blockages returning after basic clearing",
    constraints: ["shared resident access", "noise-sensitive morning working window"],
    issueSummary:
      "The repeated pattern usually tells you the problem is deeper than a trap or local waste pipe. On older shared branch connections, the blockage often reforms because the underlying restriction was never checked properly after the last clear.",
    handledSummary:
      "The practical route is to clear the line, then confirm whether the branch itself remains sound. That is why repeat-blockage jobs often need more than a quick reactive visit if the same flat keeps showing the same symptoms.",
    resultSummary:
      "The benefit of treating it properly is not just getting flow back for a day. It is understanding whether the client needs maintenance, a camera check, or a more structural repair route before the problem repeats again.",
    whenNeededSummary:
      "This kind of explanation is most relevant when a flat, conversion, or shared stack keeps presenting the same symptom after domestic cleaning attempts or basic contractor attendance.",
    relatedServiceLinks: [
      { href: "/drain-unblocking/fulham", label: "drain unblocking in Fulham" },
      { href: "/cctv-drain-surveys/fulham", label: "CCTV drain surveys in Fulham" },
    ],
    guideLink: { href: "/drainage-guides/why-do-my-drains-smell", label: "why drains smell when the branch line is failing" },
    projectLink: { href: "/projects/fulham-blocked-drain-mansion-flat", label: "blocked drain clearance for mansion flat in Fulham" },
  },
  {
    slug: "tree-root-drain-damage",
    title: "How to Tell if Tree Roots Are Causing Drain Damage",
    excerpt: "A diagnostic article showing how root-related damage presents and why repeat clearing is not enough when the entry point is still open.",
    date: "2023-12-01",
    image: "/images/blog/tree-root-drain-damage.jpg",
    category: "Diagnostic",
    intent: "diagnostic",
    serviceSlug: "drain-root-removal",
    serviceTitle: "Drain Root Removal",
    locationId: "wimbledon",
    locationName: "Wimbledon",
    propertyType: "detached family house with mature planting",
    specificIssue: "repeat slow drainage caused by root ingress on an older run",
    constraints: ["mature landscaping", "run crossing beneath hardstanding"],
    issueSummary:
      "Root problems usually show up as a pattern: repeat slow drainage, partial clearing that never lasts, and footage or excavation later confirming the entry point at a joint or crack in the run.",
    handledSummary:
      "The useful process is to confirm the ingress point, remove the root mass, and then decide whether the line still needs relining or replacement. Otherwise the same run often blocks again once the roots regrow.",
    resultSummary:
      "The key result is clarity on whether the job is maintenance-only or structural. That is the step people often miss when they treat root-related work as just another blockage call.",
    whenNeededSummary:
      "This diagnostic route is usually needed on older lines close to mature trees, especially where the property keeps seeing slow drainage and previous clearing work has only bought a short reprieve.",
    relatedServiceLinks: [
      { href: "/drain-relining/wimbledon", label: "drain relining in Wimbledon" },
      { href: "/cctv-drain-surveys/wimbledon", label: "CCTV drain surveys in Wimbledon" },
    ],
    guideLink: { href: "/drainage-guides/drain-condition-reports", label: "how a drain condition report informs the repair scope" },
  },
  {
    slug: "emergency-drainage-what-to-do",
    title: "What to Do First During a Drainage Emergency",
    excerpt: "A practical emergency guide showing what needs to happen first when the priority is getting the site safe and back into use.",
    date: "2023-11-25",
    image: "/images/blog/emergency-drainage-what-to-do.jpg",
    category: "Emergency",
    intent: "diagnostic",
    serviceSlug: "emergency-drainage",
    serviceTitle: "Emergency Drainage",
    locationId: "kingston",
    locationName: "Kingston",
    propertyType: "restaurant unit with rear kitchen",
    specificIssue: "a kitchen flood caused by a blocked foul line during service",
    constraints: ["rear alley access only", "same-shift trading pressure"],
    issueSummary:
      "In an emergency like this, the first useful distinction is between a contained blockage that can be cleared quickly and a wider issue that needs follow-up structural work after the immediate risk is under control.",
    handledSummary:
      "The practical order is to make the area safe, restore flow if possible, and then decide whether the line needs a post-clearance survey before the site goes back to normal trading. That sequence matters more than broad emergency advice.",
    resultSummary:
      "The best result on an emergency job is not just getting water away for the next hour. It is restoring safe use and leaving the client with enough information to stop the same failure repeating under the next heavy load.",
    whenNeededSummary:
      "This advice is most relevant where the site cannot wait for a planned appointment and the immediate priority is safe recovery rather than a full technical explanation on the first visit.",
    relatedServiceLinks: [
      { href: "/drain-jetting/kingston", label: "drain jetting in Kingston" },
      { href: "/cctv-drain-surveys/kingston", label: "CCTV drain surveys in Kingston" },
    ],
    guideLink: { href: "/drainage-guides/how-long-does-a-drain-survey-take", label: "how quickly a follow-up drain survey can be arranged" },
    projectLink: { href: "/projects/kingston-emergency-flooded-kitchen-drainage", label: "emergency drainage response for flooded kitchen in Kingston" },
  },
];

export const blogPosts = definitions.map((definition) =>
  buildIntentArticle(definition)
);

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}
