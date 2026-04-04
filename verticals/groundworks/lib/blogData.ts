import { buildIntentArticle, type ScenarioArticleDefinition } from "engine";

const definitions: ScenarioArticleDefinition[] = [
  {
    slug: "when-is-piling-required-on-an-urban-site",
    title: "How to Tell if a Site Actually Needs Piling",
    excerpt: "A diagnostic article explaining the signs that a foundation strategy has moved beyond straightforward trench fill or shallow foundations.",
    date: "2024-01-15",
    image: "/images/blog/blog-1.jpg",
    category: "Piling",
    intent: "diagnostic",
    serviceSlug: "groundworks-contractors",
    serviceTitle: "Groundworks Contractors",
    locationId: "london",
    locationName: "London",
    propertyType: "tight redevelopment plot",
    specificIssue: "an early groundworks package where shallow foundation assumptions were no longer reliable",
    constraints: ["tight access", "close neighbouring structures"],
    issueSummary:
      "The giveaway on a site like this is usually not one dramatic symptom. It is the combination of limited footing options, structural load requirements, and an urban footprint that leaves little room for the wrong decision.",
    handledSummary:
      "The practical response is to review the support strategy before the site locks into excavation and formation work. On a constrained plot, [groundworks contractors in London](/groundworks-contractors/london) need to plan around the build sequence as well as the ground conditions.",
    resultSummary:
      "The value of making the call early is that the piling decision can be integrated into the programme instead of becoming an expensive correction once the dig has already started.",
    whenNeededSummary:
      "This question matters when the site is tight, the structure is demanding, or the early design information suggests that shallow support could be unreliable or inefficient.",
    relatedServiceLinks: [
      { href: "/piling-contractors/london", label: "piling contractors in London" },
      { href: "/excavation-contractors/london", label: "excavation contractors in London" },
    ],
    guideLink: { href: "/guides/when-is-piling-required", label: "when piling is required" },
    projectLink: { href: "/projects/london-groundworks-basement-formation", label: "groundworks package for constrained basement formation in London" },
  },
  {
    slug: "what-causes-underpinning-to-be-needed",
    title: "What Usually Causes a Scheme to Need Underpinning?",
    excerpt: "An explanatory guide showing why structural change, foundation limits, and sequencing often push a job toward underpinning.",
    date: "2024-01-08",
    image: "/images/blog/blog-2.jpg",
    category: "Underpinning",
    intent: "explanatory",
    serviceSlug: "underpinning",
    serviceTitle: "Underpinning",
    locationId: "richmond",
    locationName: "Richmond",
    propertyType: "period terrace under alteration",
    specificIssue: "existing foundations no longer matching the structural demand of the planned works",
    constraints: ["party wall sequencing", "occupied adjoining property"],
    issueSummary:
      "Underpinning is usually needed because the structural demand changes or the existing support proves weaker than the next stage of work can safely rely on. On terrace alterations, the sequence and neighbour relationship often matter as much as the structural detail.",
    handledSummary:
      "That is why [underpinning in Richmond](/underpinning/richmond) needs to be treated as a phased support exercise rather than a generic concrete operation. The practical method has to work with the structural design and the site controls at the same time.",
    resultSummary:
      "The real result is a support strategy that lets the wider alteration move forward with better control, rather than a one-off fix that ignores the rest of the sequence.",
    whenNeededSummary:
      "This is most useful when extension, conversion, or structural change work starts raising questions about whether the existing foundation arrangement still suits the scheme.",
    relatedServiceLinks: [
      { href: "/foundation-contractors/richmond", label: "foundation contractors in Richmond" },
      { href: "/groundworks-contractors/richmond", label: "groundworks contractors in Richmond" },
    ],
    guideLink: { href: "/guides/foundation-cost", label: "what drives foundation cost" },
    projectLink: { href: "/projects/richmond-underpinning-party-wall-constraints", label: "underpinning under party-wall constraints in Richmond" },
  },
  {
    slug: "how-much-does-tight-access-piling-cost",
    title: "What Actually Changes the Cost of Tight-Access Piling?",
    excerpt: "A cost-led article explaining why restricted access, rig choice, and site geometry often matter more than pile count alone.",
    date: "2023-12-20",
    image: "/images/blog/blog-3.jpg",
    category: "Cost",
    intent: "cost-related",
    serviceSlug: "piling-contractors",
    serviceTitle: "Piling Contractors",
    locationId: "chiswick",
    locationName: "Chiswick",
    propertyType: "tight infill development site",
    specificIssue: "piled support needed on weak ground with restricted rig access",
    constraints: ["narrow frontage", "restricted headroom"],
    issueSummary:
      "Tight-access piling cost is rarely driven by the pile count alone. Access method, rig choice, setup time, and site handling often have just as much influence on the programme and price.",
    handledSummary:
      "That is why a proper [piling contractors in Chiswick](/piling-contractors/chiswick) quote has to reflect the real access and install geometry, not just the structural demand on paper.",
    resultSummary:
      "Once the access reality is priced in properly, the client can compare methods on a more honest basis and avoid under-scoping the package at tender stage.",
    whenNeededSummary:
      "This matters when a site already points toward piled support but the frontage, headroom, or logistics make it obvious that the install will not behave like a simple open-site job.",
    relatedServiceLinks: [
      { href: "/mini-piling-contractors/chiswick", label: "mini piling contractors in Chiswick" },
      { href: "/groundworks-contractors/chiswick", label: "groundworks contractors in Chiswick" },
    ],
    guideLink: { href: "/guides/piling-cost", label: "what drives piling cost" },
    projectLink: { href: "/projects/chiswick-piling-tight-access-site", label: "piling on tight-access Chiswick infill site" },
  },
  {
    slug: "when-to-use-cfa-piling",
    title: "When Is CFA Piling the Better Fit?",
    excerpt: "A decision-making article showing when CFA piling suits noise-sensitive or more tightly controlled urban sites.",
    date: "2023-12-12",
    image: "/images/blog/blog-1.jpg",
    category: "CFA Piling",
    intent: "decision-making",
    serviceSlug: "cfa-piling",
    serviceTitle: "CFA Piling",
    locationId: "wimbledon",
    locationName: "Wimbledon",
    propertyType: "urban plot beside occupied neighbours",
    specificIssue: "a piling package needing lower vibration and more predictable urban behaviour",
    constraints: ["noise-sensitive surroundings", "controlled working window"],
    issueSummary:
      "The decision on a site like this is not whether piling is required. It is whether the chosen method behaves well enough within the urban constraints to keep the job moving.",
    handledSummary:
      "That is why [CFA piling in Wimbledon](/cfa-piling/wimbledon) becomes the right route when the piling requirement is clear but vibration, noise, or site sensitivity make other methods harder to justify.",
    resultSummary:
      "The method choice matters because it affects neighbour impact, programme reliability, and how well the piling phase fits inside an urban delivery plan.",
    whenNeededSummary:
      "This is most useful when piled support is already likely but the site is too sensitive for a louder or more disruptive install method to be the default choice.",
    relatedServiceLinks: [
      { href: "/piling-contractors/wimbledon", label: "piling contractors in Wimbledon" },
      { href: "/foundation-contractors/wimbledon", label: "foundation contractors in Wimbledon" },
    ],
    guideLink: { href: "/guides/types-of-piling", label: "how piling types differ on site" },
    projectLink: { href: "/projects/wimbledon-cfa-piling-noise-sensitive-site", label: "CFA piling on noise-sensitive site in Wimbledon" },
  },
  {
    slug: "how-to-tell-if-mini-piling-is-the-right-option",
    title: "How to Tell if Mini Piling Is the Right Recovery Option",
    excerpt: "A diagnostic guide explaining when access limits and programme pressure make mini piling the more practical recovery route.",
    date: "2023-12-01",
    image: "/images/blog/blog-2.jpg",
    category: "Mini Piling",
    intent: "diagnostic",
    serviceSlug: "mini-piling-contractors",
    serviceTitle: "Mini Piling Contractors",
    locationId: "kingston",
    locationName: "Kingston",
    propertyType: "rear extension plot with restricted side access",
    specificIssue: "a live build needing urgent support after the ground conditions changed",
    constraints: ["restricted side access", "live programme pressure"],
    issueSummary:
      "The signs usually appear when the foundation route changes faster than the site can absorb, and the access is too tight for a larger piling response to be practical.",
    handledSummary:
      "That is why the decision often turns on access and recovery speed together. On a site like this, [mini piling contractors in Kingston](/mini-piling-contractors/kingston) are useful because the support method fits the physical limits of the plot.",
    resultSummary:
      "The useful result is not just technical support. It is a route that lets the job recover without a much bigger access or programme problem developing around it.",
    whenNeededSummary:
      "This is most relevant when a live domestic or tight-plot scheme suddenly needs a support rethink and the site cannot realistically absorb a larger piling arrangement.",
    relatedServiceLinks: [
      { href: "/piling-contractors/kingston", label: "piling contractors in Kingston" },
      { href: "/foundation-contractors/kingston", label: "foundation contractors in Kingston" },
    ],
    guideLink: { href: "/guides/mini-piling-cost", label: "what affects mini piling cost" },
    projectLink: { href: "/projects/kingston-mini-piling-emergency-support", label: "mini piling response on constrained Kingston plot" },
  },
  {
    slug: "when-a-foundation-package-needs-more-than-a-simple-pour",
    title: "When a Foundation Package Needs More Than a Simple Pour",
    excerpt: "An explanatory guide showing why apparently straightforward foundation work still depends on sequencing, handover, and site logistics.",
    date: "2023-11-25",
    image: "/images/blog/blog-3.jpg",
    category: "Foundations",
    intent: "explanatory",
    serviceSlug: "foundation-contractors",
    serviceTitle: "Foundation Contractors",
    locationId: "fulham",
    locationName: "Fulham",
    propertyType: "urban rebuild plot",
    specificIssue: "new foundations tied closely to downstream trade handover",
    constraints: ["tight plot storage", "programme-sensitive handover"],
    issueSummary:
      "Foundation work becomes more involved when the real risk is not the pour itself but how the excavation, reinforcement, and handover sequence fit into a compressed site programme.",
    handledSummary:
      "That is why [foundation contractors in Fulham](/foundation-contractors/fulham) need to think beyond the concrete element and into the wider logistics and follow-on trade sequence from the start.",
    resultSummary:
      "The benefit is a cleaner handover into the next package, which is often the thing that decides whether the early programme keeps moving or starts slipping immediately.",
    whenNeededSummary:
      "This explanation is most useful when a site looks simple on paper but the real challenge sits in urban logistics, storage, and tightly linked downstream trades.",
    relatedServiceLinks: [
      { href: "/groundworks-contractors/fulham", label: "groundworks contractors in Fulham" },
      { href: "/excavation-contractors/fulham", label: "excavation contractors in Fulham" },
    ],
    guideLink: { href: "/guides/foundation-cost", label: "what affects foundation cost" },
    projectLink: { href: "/projects/foundation-contractors-fulham-rebuild", label: "foundation package for Fulham rebuild plot" },
  },
];

export const blogPosts = definitions.map((definition) =>
  buildIntentArticle(definition)
);

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}
