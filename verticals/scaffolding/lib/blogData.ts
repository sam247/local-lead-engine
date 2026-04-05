import { buildIntentArticle, type ScenarioArticleDefinition } from "engine";

const definitions: ScenarioArticleDefinition[] = [
  {
    slug: "when-house-scaffolding-is-worth-booking",
    title: "When House Scaffolding Is Worth Booking Before the Builder Starts",
    excerpt:
      "A decision guide explaining when domestic work moves beyond ladders and short-term access and needs a proper scaffold setup.",
    date: "2024-01-18",
    image: "/images/blog/blog-1.jpg",
    category: "Decision",
    intent: "decision-making",
    serviceSlug: "domestic-scaffolding",
    serviceTitle: "Domestic Scaffolding",
    locationId: "richmond",
    locationName: "Richmond",
    propertyType: "Victorian house with rear extension and reroof works",
    specificIssue: "the point where domestic works need a stable scaffold rather than ad hoc ladder access",
    constraints: ["tight side access", "occupied property"],
    issueSummary:
      "On domestic jobs, the real decision is usually about sequence and safety rather than price alone. Once trades need repeated roof-edge access, material handling, or longer working duration, ladders stop being a realistic answer.",
    handledSummary:
      "The practical check is to look at how long the work will run, whether more than one elevation is involved, and whether the contractor needs both access and loading space. For similar residential work, start with [domestic scaffolding in Richmond](/domestic-scaffolding/richmond).",
    resultSummary:
      "Making the decision early tends to keep the build cleaner and more predictable. It avoids late access changes once the builder or roofer is already on site and committed to a programme.",
    whenNeededSummary:
      "This is most relevant for extensions, reroofs, chimney repairs, and external refurbishment where repeated upper-level access is part of the job rather than a one-off task.",
    relatedServiceLinks: [
      { href: "/roof-scaffolding/richmond", label: "roof scaffolding in Richmond" },
      { href: "/chimney-scaffolding/richmond", label: "chimney scaffolding in Richmond" },
    ],
    guideLink: {
      href: "/scaffolding-guides/domestic-scaffolding-for-extensions",
      label: "domestic scaffolding for home extensions",
    },
    projectLink: {
      href: "/projects/richmond-domestic-reroof-scaffold",
      label: "Richmond domestic reroof scaffold project",
    },
  },
  {
    slug: "what-actually-changes-scaffolding-cost",
    title: "What Actually Changes the Cost of Scaffolding",
    excerpt:
      "A cost guide explaining which site factors widen scaffold quotes and which ones matter less than clients expect.",
    date: "2024-01-12",
    image: "/images/blog/blog-2.jpg",
    category: "Cost",
    intent: "cost-related",
    serviceSlug: "scaffolding-contractors",
    serviceTitle: "Scaffolding Contractors",
    locationId: "london",
    locationName: "London",
    propertyType: "mixed domestic and commercial sites",
    specificIssue: "why scaffold prices move so much between apparently similar jobs",
    constraints: ["restricted loading windows", "height and complexity differences"],
    issueSummary:
      "Scaffold cost is rarely about one headline number. Height, programme duration, loading space, working lifts, weather protection, and access restrictions all affect the final quote more than a simple property label does.",
    handledSummary:
      "The clearest way to scope cost is to tie the quote back to the real access need, the building form, and the duration of use. For a local starting point, use [scaffolding contractors in London](/scaffolding-contractors/london).",
    resultSummary:
      "That usually gives clients a quote they can actually compare. It also stops price conversations being distorted by missing site details that only surface once the contractor arrives.",
    whenNeededSummary:
      "This kind of cost breakdown is most useful when a client is budgeting early, comparing contractor quotes, or trying to understand why one scaffold package is materially different from another.",
    relatedServiceLinks: [
      { href: "/commercial-scaffolding/london", label: "commercial scaffolding in London" },
      { href: "/temporary-roofing/london", label: "temporary roofing in London" },
    ],
    guideLink: {
      href: "/scaffolding-costs/how-much-does-scaffolding-cost",
      label: "how much scaffolding costs in the UK",
    },
    projectLink: {
      href: "/projects/london-commercial-facade-access-scaffold",
      label: "central London facade scaffold example",
    },
  },
  {
    slug: "when-temporary-roofing-is-the-right-call",
    title: "When Temporary Roofing Is the Right Call and When It Is Not",
    excerpt:
      "A decision article showing when a scaffold alone is enough and when weather protection needs to be part of the access package.",
    date: "2024-01-08",
    image: "/images/blog/blog-3.jpg",
    category: "Decision",
    intent: "decision-making",
    serviceSlug: "temporary-roofing",
    serviceTitle: "Temporary Roofing",
    locationId: "kingston",
    locationName: "Kingston",
    propertyType: "occupied residential building during major roof works",
    specificIssue: "deciding whether the roof will be exposed long enough to need weather protection",
    constraints: ["winter programme", "occupied property"],
    issueSummary:
      "The decision usually comes down to exposure time, weather risk, and what sits below the roof once the covering is removed. A scaffold gives access, but it does not protect the building on its own when the programme leaves the structure open.",
    handledSummary:
      "The practical route is to map the strip-out sequence against likely exposure periods and decide whether a temporary roof avoids more disruption than it adds. For local planning, start with [temporary roofing in Kingston](/temporary-roofing/kingston).",
    resultSummary:
      "When the call is made early, the roofing programme tends to run more cleanly. The client avoids stop-start weather delays and the repair contractor avoids working around improvised covering measures.",
    whenNeededSummary:
      "This article is most useful on full reroofs, structural roof repairs, insurance-backed works, and any scheme where the building will be open for more than a very short weather window.",
    relatedServiceLinks: [
      { href: "/roof-scaffolding/kingston", label: "roof scaffolding in Kingston" },
      { href: "/emergency-scaffolding/kingston", label: "emergency scaffolding in Kingston" },
    ],
    guideLink: {
      href: "/scaffold-safety-guides/temporary-roofing-during-roof-repairs",
      label: "temporary roofing during roof repairs",
    },
    projectLink: {
      href: "/projects/kingston-temporary-roof-winter-reroof",
      label: "Kingston temporary roof project",
    },
  },
  {
    slug: "how-to-tell-if-you-need-chimney-scaffolding",
    title: "How to Tell if You Need Proper Chimney Scaffolding",
    excerpt:
      "A diagnostic guide explaining when chimney work needs a purpose-built scaffold rather than a roofer working from short-duration access.",
    date: "2023-12-28",
    image: "/images/blog/blog-1.jpg",
    category: "Diagnostic",
    intent: "diagnostic",
    serviceSlug: "chimney-scaffolding",
    serviceTitle: "Chimney Scaffolding",
    locationId: "chiswick",
    locationName: "Chiswick",
    propertyType: "terraced house with shared chimney stack",
    specificIssue: "identifying when chimney repairs require a dedicated working platform",
    constraints: ["party-wall roof position", "limited room around the stack"],
    issueSummary:
      "The signs are usually straightforward: the work needs both hands free at chimney-head height, the stack needs access on more than one face, or the load and duration go beyond what a roofer can do safely from a ladder or simple roof access setup.",
    handledSummary:
      "The practical check is to review the scope of masonry, flashing, or pot work and then decide whether the contractor needs a platform around the stack itself. For a local route, use [chimney scaffolding in Chiswick](/chimney-scaffolding/chiswick).",
    resultSummary:
      "That early distinction prevents the common mistake of treating chimney repairs as minor roof access when the real issue is stable working room around the stack. It usually saves time as much as it improves safety.",
    whenNeededSummary:
      "This guide is most relevant for repointing, flaunching repairs, lead flashing work, liner installation, and full chimney-head rebuilds on terraced or semi-detached properties.",
    relatedServiceLinks: [
      { href: "/roof-scaffolding/chiswick", label: "roof scaffolding in Chiswick" },
      { href: "/domestic-scaffolding/chiswick", label: "domestic scaffolding in Chiswick" },
    ],
    guideLink: {
      href: "/scaffold-safety-guides/when-chimney-scaffolding-is-needed",
      label: "when chimney scaffolding is needed",
    },
    projectLink: {
      href: "/projects/chiswick-chimney-scaffold-shared-stack",
      label: "Chiswick chimney scaffold example",
    },
  },
  {
    slug: "how-commercial-scaffolding-works-on-occupied-buildings",
    title: "How Commercial Scaffolding Works on Occupied Buildings",
    excerpt:
      "An explanatory article covering phased access, inspections, and the extra planning needed when the building stays live during works.",
    date: "2023-12-20",
    image: "/images/blog/blog-2.jpg",
    category: "Explanatory",
    intent: "explanatory",
    serviceSlug: "commercial-scaffolding",
    serviceTitle: "Commercial Scaffolding",
    locationId: "london",
    locationName: "London",
    propertyType: "occupied office and mixed-use buildings",
    specificIssue: "maintaining safe facade access while the building remains in use",
    constraints: ["live entrances", "pedestrian and delivery coordination"],
    issueSummary:
      "Commercial scaffold work becomes more complex when the building is occupied because the access package has to work around entrances, deliveries, public routes, and ongoing inspection obligations rather than simply providing height access.",
    handledSummary:
      "The best approach is normally phased scaffold planning tied to the contractor programme, with access protection and adaptation dates agreed in advance. For local commercial access planning, start with [commercial scaffolding in London](/commercial-scaffolding/london).",
    resultSummary:
      "That tends to protect the programme and reduce the number of disruptive scaffold changes later. It also gives the building team a clearer route for communication with tenants, occupants, and site management.",
    whenNeededSummary:
      "This matters most on facade refurbishment, maintenance contracts, window replacement, and cladding packages where the building cannot simply be shut down for access works.",
    relatedServiceLinks: [
      { href: "/access-scaffolding/london", label: "access scaffolding in London" },
      { href: "/scaffolding-contractors/london", label: "scaffolding contractors in London" },
    ],
    guideLink: {
      href: "/scaffolding-guides/commercial-scaffold-access-for-maintenance",
      label: "commercial scaffold access for maintenance and refurbishment",
    },
    projectLink: {
      href: "/projects/london-commercial-facade-access-scaffold",
      label: "central London commercial scaffold project",
    },
  },
  {
    slug: "when-emergency-scaffolding-becomes-necessary",
    title: "When Emergency Scaffolding Becomes Necessary",
    excerpt:
      "A diagnostic guide to the situations where access cannot wait for a planned booking and the first priority is making the site safe.",
    date: "2023-12-10",
    image: "/images/blog/blog-3.jpg",
    category: "Diagnostic",
    intent: "diagnostic",
    serviceSlug: "emergency-scaffolding",
    serviceTitle: "Emergency Scaffolding",
    locationId: "twickenham",
    locationName: "Twickenham",
    propertyType: "storm-damaged residential and small commercial buildings",
    specificIssue: "working out when urgent scaffold access is needed to stabilise the situation",
    constraints: ["out-of-hours response", "weather exposure and safety risk"],
    issueSummary:
      "Emergency scaffolding is usually about safe recovery rather than convenience. The clearest signs are unstable roof elements, loss-adjuster or repair access that cannot wait, or a risk of the damage worsening before a planned scaffold date would be realistic.",
    handledSummary:
      "The right sequence is to make the building safe, create controlled access for inspection or temporary works, and then transition into a compliant scaffold arrangement for the next repair stage. For a local example, start with [emergency scaffolding in Twickenham](/emergency-scaffolding/twickenham).",
    resultSummary:
      "When that sequence is handled properly, the client avoids the gap between emergency attendance and real access planning. It also helps insurers, roofers, and surveyors move faster because the site is already stabilised.",
    whenNeededSummary:
      "This guide is most useful after storm damage, structural movement, fire-related access needs, or any incident where delay would increase risk to the building or the people around it.",
    relatedServiceLinks: [
      { href: "/temporary-roofing/twickenham", label: "temporary roofing in Twickenham" },
      { href: "/roof-scaffolding/twickenham", label: "roof scaffolding in Twickenham" },
    ],
    guideLink: {
      href: "/scaffold-safety-guides/scaffolding-for-insurance-funded-repairs",
      label: "scaffolding for insurance-funded repairs",
    },
    projectLink: {
      href: "/projects/twickenham-emergency-storm-damage-scaffold",
      label: "Twickenham emergency scaffold response",
    },
  },
];

export const blogPosts = definitions.map((definition) => buildIntentArticle(definition));

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}
