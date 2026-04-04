import { buildIntentArticle, type ScenarioArticleDefinition } from "engine";

const definitions: ScenarioArticleDefinition[] = [
  {
    slug: "when-do-you-need-a-topographical-survey",
    title: "When Do You Actually Need a Topographical Survey?",
    excerpt: "A decision-led guide explaining when topographical survey data becomes essential for planning, design, and early coordination.",
    date: "2024-01-15",
    image: "/images/blog/when-do-you-need-a-topographical-survey.jpg",
    category: "Planning",
    intent: "decision-making",
    serviceSlug: "topographical-survey",
    serviceTitle: "Topographical Survey",
    locationId: "london",
    locationName: "London",
    propertyType: "mixed-use redevelopment plot",
    specificIssue: "planning and early design moving ahead without reliable site levels",
    constraints: ["shared contractor access", "city-centre traffic controls"],
    issueSummary:
      "The decision point on a site like this is whether the design team can safely progress from existing plans and desktop information, or whether the missing site detail is already a programme risk.",
    handledSummary:
      "On this London plot, the practical answer was to survey before the planning set hardened. That allowed levels, drainage features, and site boundaries to be captured in a way the design team could actually use.",
    resultSummary:
      "The survey changed the quality of the design information, which is why the decision mattered. It replaced assumptions with a base the planning and coordination teams could rely on.",
    whenNeededSummary:
      "Topographical surveys are usually worth commissioning when planning, extension, or redevelopment work depends on actual levels, site features, and drainage layout rather than generalised record information.",
    relatedServiceLinks: [
      { href: "/utility-survey/london", label: "utility survey in London" },
      { href: "/measured-building-survey/london", label: "measured building survey in London" },
    ],
    guideLink: { href: "/survey-guides/survey-for-planning-permission", label: "what survey is needed for planning permission" },
    projectLink: { href: "/projects/topographical-survey-london-development-site", label: "topographical survey for constrained city-centre redevelopment site" },
  },
  {
    slug: "drone-surveys-vs-traditional-surveys",
    title: "Drone Survey vs Traditional Survey: Which One Fits the Brief?",
    excerpt: "A decision-making comparison showing when drone capture helps, when ground-based methods still win, and how to choose the right survey scope.",
    date: "2024-01-08",
    image: "/images/blog/drone-surveys-vs-traditional-surveys.jpg",
    category: "Decision",
    intent: "decision-making",
    serviceSlug: "measured-building-survey",
    serviceTitle: "Measured Building Survey",
    locationId: "richmond",
    locationName: "Richmond",
    propertyType: "period conversion with split-level layout",
    specificIssue: "choosing the right survey method before internal redesign",
    constraints: ["occupied flats", "tight internal access"],
    issueSummary:
      "On this kind of job, the real question is whether the information gap sits inside the building, across the external site, or in both. Drone capture is not a substitute for internal as-built work just because it is fast.",
    handledSummary:
      "The Richmond conversion needed internal accuracy first, so the measured building survey remained the core deliverable. Drone capture would only have added value if the external context or roof condition had also been part of the same brief.",
    resultSummary:
      "The result was a more efficient survey scope, not a more expensive one. Picking the right method kept the client from paying for attractive outputs that would not have solved the actual design problem.",
    whenNeededSummary:
      "This comparison is most useful when a project team is choosing methods and needs to match the survey to the real design question rather than a fashionable tool.",
    relatedServiceLinks: [
      { href: "/drone-survey/richmond", label: "drone survey in Richmond" },
      { href: "/topographical-survey/richmond", label: "topographical survey in Richmond" },
    ],
    guideLink: { href: "/survey-guides/survey-for-architectural-design", label: "surveys for architectural design" },
    projectLink: { href: "/projects/measured-building-survey-richmond-conversion", label: "measured building survey for Richmond period conversion" },
  },
  {
    slug: "survey-requirements-for-planning-permission",
    title: "What Survey Information Is Usually Needed for Planning Permission?",
    excerpt: "An explanatory article showing why planning teams often need more than one type of survey before a scheme can move forward cleanly.",
    date: "2023-12-20",
    image: "/images/blog/survey-requirements-for-planning-permission.jpg",
    category: "Planning",
    intent: "explanatory",
    serviceSlug: "utility-survey",
    serviceTitle: "Utility Survey",
    locationId: "chiswick",
    locationName: "Chiswick",
    propertyType: "rear garden extension site",
    specificIssue: "planning and excavation decisions with no reliable buried-services record",
    constraints: ["narrow side return", "boundary-sensitive excavation"],
    issueSummary:
      "On sites like this, the planning question is rarely solved by one drawing alone. External levels, existing structures, and buried services can all affect what the designer can safely draw and what the contractor can later excavate.",
    handledSummary:
      "The Chiswick example shows why the buried-services element mattered before the dig package moved ahead. Without that information, the planning-stage assumptions would have carried straight into a risky excavation sequence.",
    resultSummary:
      "The outcome was not just a cleaner planning file. It was a design package that made more sense when the project reached the groundworks stage.",
    whenNeededSummary:
      "This is usually relevant when planning and early contractor coordination overlap, especially on extensions and constrained domestic sites where buried services can change the practical build route.",
    relatedServiceLinks: [
      { href: "/topographical-survey/chiswick", label: "topographical survey in Chiswick" },
      { href: "/measured-building-survey/chiswick", label: "measured building survey in Chiswick" },
    ],
    guideLink: { href: "/survey-guides/survey-before-building-extension", label: "what survey is needed before an extension" },
    projectLink: { href: "/projects/utility-survey-chiswick-before-excavation", label: "utility survey before excavation in Chiswick" },
  },
  {
    slug: "how-much-does-a-land-survey-cost",
    title: "How Much Does a Land Survey Cost?",
    excerpt: "A cost-led article explaining which site factors widen survey quotes and why headline rates rarely tell the full story.",
    date: "2023-12-12",
    image: "/images/blog/how-much-does-a-land-survey-cost.jpg",
    category: "Cost",
    intent: "cost-related",
    serviceSlug: "utility-mapping-survey",
    serviceTitle: "Utility Mapping Survey",
    locationId: "wimbledon",
    locationName: "Wimbledon",
    propertyType: "active school campus",
    specificIssue: "phased refurbishment needing buried-service confidence before works start",
    constraints: ["term-time access windows", "safeguarding controls"],
    issueSummary:
      "Survey cost on a live site like this is driven by access rules, site spread, and the level of confidence the project needs from the result. A campus surveyed around safeguarding windows does not price like an empty plot with open access.",
    handledSummary:
      "The useful way to cost this kind of job is to look at how much of the site must be covered, what restrictions apply, and how the information will be used in the programme. Those factors matter more than generic headline rates.",
    resultSummary:
      "The cost conversation becomes more useful when the client can see why access rules, phased coverage, and output requirements affect the scope. That makes budget decisions more realistic.",
    whenNeededSummary:
      "This is most relevant when a client needs to budget before instruction and wants to understand what makes one survey brief simple and another much more involved.",
    relatedServiceLinks: [
      { href: "/utility-survey/wimbledon", label: "utility survey in Wimbledon" },
      { href: "/measured-building-survey/wimbledon", label: "measured building survey in Wimbledon" },
    ],
    guideLink: { href: "/survey-guides/utility-survey-cost", label: "what changes utility survey cost" },
    projectLink: { href: "/projects/utility-mapping-wimbledon-school-site", label: "utility mapping on active school site in Wimbledon" },
  },
  {
    slug: "when-to-use-a-drone-survey",
    title: "When Should You Use a Drone Survey Instead of Laser Scanning?",
    excerpt: "A decision-led guide explaining when drone capture adds value and when internal laser scanning is still the better fit.",
    date: "2023-12-01",
    image: "/images/blog/when-to-use-a-drone-survey.jpg",
    category: "Decision",
    intent: "decision-making",
    serviceSlug: "laser-scanning-survey",
    serviceTitle: "Laser Scanning Survey",
    locationId: "fulham",
    locationName: "Fulham",
    propertyType: "commercial unit undergoing fit-out",
    specificIssue: "complex internal geometry before MEP coordination",
    constraints: ["overnight possession only", "live shell-and-core environment"],
    issueSummary:
      "The Fulham example makes the boundary clear: drone capture is valuable where coverage, roof access, or broader external context is the question. It does not replace dense internal capture when the problem sits inside the unit geometry.",
    handledSummary:
      "Because the coordination risk was internal, laser scanning stayed the core method. Drone capture would have produced interesting external context, but it would not have solved the MEP coordination issue the fit-out team actually faced.",
    resultSummary:
      "The result was a survey scope matched to the real risk rather than a broader package built around the method with the most visual appeal.",
    whenNeededSummary:
      "This kind of comparison is useful when teams are deciding between survey methods and need to stay anchored to the design problem rather than the capture technology.",
    relatedServiceLinks: [
      { href: "/drone-survey/fulham", label: "drone survey in Fulham" },
      { href: "/measured-building-survey/fulham", label: "measured building survey in Fulham" },
    ],
    guideLink: { href: "/survey-guides/when-to-use-drone-surveys", label: "when drone surveys are actually worth using" },
    projectLink: { href: "/projects/laser-scanning-fulham-commercial-fitout", label: "laser scanning for Fulham commercial fit-out" },
  },
  {
    slug: "utility-survey-before-excavation",
    title: "Do You Need a Utility Survey Before Excavation?",
    excerpt: "A diagnostic guide explaining when buried-service or boundary uncertainty is high enough to justify a survey before the dig starts.",
    date: "2023-11-25",
    image: "/images/blog/utility-survey-before-excavation.jpg",
    category: "Diagnostic",
    intent: "diagnostic",
    serviceSlug: "utility-survey",
    serviceTitle: "Utility Survey",
    locationId: "kingston",
    locationName: "Kingston",
    propertyType: "semi-detached house with shared side access",
    specificIssue: "boundary and service uncertainty before fencing and extension works",
    constraints: ["shared access route with neighbour"],
    issueSummary:
      "The warning sign is not always a visible service. It is often a combination of incomplete records, work close to the boundary, and a dig route that would be expensive to reopen if the assumptions are wrong.",
    handledSummary:
      "The practical step is to check whether the excavation decision depends on buried-service confidence or measured boundary position. Where it does, the survey becomes a control measure rather than an optional extra.",
    resultSummary:
      "That is what makes the survey worthwhile: it lowers the chance of the project making an avoidable mistake before fencing, digging, or foundations lock the site into a harder route.",
    whenNeededSummary:
      "This guide is most useful before boundary-adjacent digging, extension work, or contractor mobilisation where the real risk is hidden information rather than obvious surface conditions.",
    relatedServiceLinks: [
      { href: "/topographical-survey/kingston", label: "topographical survey in Kingston" },
      { href: "/boundary-survey/kingston", label: "boundary survey in Kingston" },
    ],
    guideLink: { href: "/survey-guides/survey-before-property-development", label: "surveys needed before development work starts" },
    projectLink: { href: "/projects/utility-survey-chiswick-before-excavation", label: "utility survey before excavation on constrained extension site" },
  },
];

export const blogPosts = definitions.map((definition) =>
  buildIntentArticle(definition)
);

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}
