import { buildScenarioArticle, type ScenarioArticleDefinition } from "engine";

const definitions: ScenarioArticleDefinition[] = [
  {
    slug: "access-control-buying-guide",
    title: "How to Tell What an Office Entrance Actually Needs From Access Control in London",
    excerpt: "A decision-focused guide built around a live London office entrance, showing how to scope access control around workflow and audit needs rather than product features alone.",
    date: "2024-01-15",
    image: "/images/blog/access-control-buying-guide.jpg",
    category: "Access Control",
    intent: "decision-making",
    serviceSlug: "access-control-systems",
    serviceTitle: "Access Control Systems",
    locationId: "london",
    locationName: "London",
    propertyType: "multi-tenant office entrance",
    specificIssue: "an entry point still working physically but offering weak audit control",
    constraints: ["live reception desk", "tenant traffic through the day"],
    issueSummary:
      "The buying decision on a job like this is less about comparing hardware categories and more about deciding what the entrance actually needs to record, release, and manage day to day.",
    handledSummary:
      "On this office entrance, the right route came from the traffic pattern, user permissions, and audit expectation. That is why a scoped [access control systems in London](/access-control-systems/london) solution makes more sense than buying around brochure features.",
    resultSummary:
      "The useful outcome is a system brief that fits how the door is used, not just a list of devices. That gives the client a cleaner install and a more dependable working result.",
    whenNeededSummary:
      "This type of buying decision matters when the existing door still works but control, reporting, or user management no longer match the way the site actually operates.",
    relatedServiceLinks: [
      { href: "/security-system-integration/london", label: "security system integration in London" },
      { href: "/commercial-cctv-installation/london", label: "commercial CCTV installation in London" },
    ],
    guideLink: { href: "/access-control-guides/card-vs-biometric-access", label: "card access vs biometric access" },
    projectLink: { href: "/projects/office-door-access-control-london", label: "access control upgrade for central London office entrance" },
  },
  {
    slug: "cctv-vs-ip-cameras",
    title: "When an IP Upgrade Beats a Like-for-Like CCTV Swap in Chiswick",
    excerpt: "A decision-making comparison based on a Chiswick warehouse upgrade where image quality, playback use, and future expansion mattered more than just replacing cameras.",
    date: "2024-01-08",
    image: "/images/blog/cctv-vs-ip-cameras.jpg",
    category: "CCTV",
    intent: "decision-making",
    serviceSlug: "ip-camera-systems",
    serviceTitle: "IP Camera Systems",
    locationId: "chiswick",
    locationName: "Chiswick",
    propertyType: "warehouse with internal racking aisles",
    specificIssue: "legacy analogue coverage no longer giving usable playback",
    constraints: ["live picking operation", "high-level install positions"],
    issueSummary:
      "The real decision on a warehouse upgrade is whether the site only needs refreshed coverage or whether the client has outgrown the older recording and playback setup entirely.",
    handledSummary:
      "On this Chiswick site, the aisle coverage and evidence quality pushed the decision toward [IP camera systems in Chiswick](/ip-camera-systems/chiswick) rather than a like-for-like replacement. The point was to improve operational use, not just swap ageing devices.",
    resultSummary:
      "The site ended up with a more scalable platform and sharper operational coverage. That is the difference between an upgrade and a basic replacement programme.",
    whenNeededSummary:
      "This comparison is most useful when the existing CCTV still runs but no longer supports the way the site reviews incidents, tracks movement, or plans expansion.",
    relatedServiceLinks: [
      { href: "/commercial-cctv-installation/chiswick", label: "commercial CCTV installation in Chiswick" },
      { href: "/security-system-integration/chiswick", label: "security system integration in Chiswick" },
    ],
    guideLink: { href: "/cctv-guides/cctv-recording-and-retention", label: "CCTV recording and retention planning" },
    projectLink: { href: "/projects/chiswick-ip-camera-upgrade-warehouse", label: "IP camera upgrade for warehouse in Chiswick" },
  },
  {
    slug: "hospital-security-requirements",
    title: "What Causes Hospital Access and CCTV Projects to Become Complex",
    excerpt: "An explanatory article using a live campus-style control problem to show why healthcare security jobs become more complex than a standard office install.",
    date: "2023-12-20",
    image: "/images/blog/hospital-security-requirements.jpg",
    category: "Healthcare",
    intent: "explanatory",
    serviceSlug: "security-system-integration",
    serviceTitle: "Security System Integration",
    locationId: "kingston",
    locationName: "Kingston",
    propertyType: "multi-building campus reception and estate",
    specificIssue: "separate access and CCTV systems creating poor operator workflow",
    constraints: ["occupied estate", "handover without control-room downtime"],
    issueSummary:
      "Healthcare and campus-style sites become complex because they are rarely dealing with one entrance and one monitor. They are dealing with multiple workflows, event reviews, staff permissions, and continuity requirements across a live estate.",
    handledSummary:
      "That is why [security system integration in Kingston](/security-system-integration/kingston) work on a campus-style environment has to start with workflow and event handling, not just cabling diagrams.",
    resultSummary:
      "Once the operator workflow becomes clearer, the wider security design usually improves with it. That is often the real operational gain on healthcare-style jobs.",
    whenNeededSummary:
      "This is most useful when an estate already has hardware in place but the real problem is how separate systems behave together in daily use.",
    relatedServiceLinks: [
      { href: "/access-control-systems/kingston", label: "access control systems in Kingston" },
      { href: "/commercial-cctv-installation/kingston", label: "commercial CCTV installation in Kingston" },
    ],
    guideLink: { href: "/access-control-guides/door-vs-gate-access-control", label: "choosing the right access-control route" },
    projectLink: { href: "/projects/kingston-integrated-security-platform-upgrade", label: "integrated security platform refresh for Kingston campus" },
  },
  {
    slug: "perimeter-security-guide",
    title: "How to Tell if a Fence Line Needs Better Perimeter Security in Wimbledon",
    excerpt: "A diagnostic guide based on a Wimbledon facility boundary where alert quality and camera verification had drifted apart over time.",
    date: "2023-12-12",
    image: "/images/blog/perimeter-security-guide.jpg",
    category: "Perimeter",
    intent: "diagnostic",
    serviceSlug: "perimeter-security-systems",
    serviceTitle: "Perimeter Security Systems",
    locationId: "wimbledon",
    locationName: "Wimbledon",
    propertyType: "data-centre-style facility boundary",
    specificIssue: "boundary alerts and camera views no longer lining up cleanly",
    constraints: ["critical site security controls", "night-time testing"],
    issueSummary:
      "The warning sign on perimeter jobs is often not a complete system failure. It is inconsistent verification, nuisance events, and an alert pattern the control team no longer trusts.",
    handledSummary:
      "That is why the practical response is to review the alert zones and the camera coverage together. On a site like this, [perimeter security systems in Wimbledon](/perimeter-security-systems/wimbledon) only improve the result when detection and visual confirmation are aligned.",
    resultSummary:
      "The useful result is cleaner operational confidence, not just more hardware on the fence line. That is what separates a proper perimeter review from a device add-on exercise.",
    whenNeededSummary:
      "This guide matters when a site already has perimeter measures in place but the monitoring team can no longer trust what each alert actually means.",
    relatedServiceLinks: [
      { href: "/commercial-cctv-installation/wimbledon", label: "commercial CCTV installation in Wimbledon" },
      { href: "/security-system-integration/wimbledon", label: "security system integration in Wimbledon" },
    ],
    guideLink: { href: "/perimeter-security-guides/cctv-camera-placement-loading-bays-entrances", label: "camera placement around access points and loading areas" },
    projectLink: { href: "/projects/wimbledon-perimeter-detection-data-centre", label: "perimeter detection upgrade for Wimbledon data facility" },
  },
  {
    slug: "security-system-integration",
    title: "What Causes Separate Security Systems to Create More Work Than Value",
    excerpt: "An explanatory article about integration friction on live estates, showing why separate access and CCTV platforms often become an operator problem long before they become a technical failure.",
    date: "2023-12-01",
    image: "/images/blog/security-system-integration.jpg",
    category: "Integration",
    intent: "explanatory",
    serviceSlug: "security-system-integration",
    serviceTitle: "Security System Integration",
    locationId: "fulham",
    locationName: "Fulham",
    propertyType: "converted commercial unit with controlled secondary entrances",
    specificIssue: "separate access and monitoring steps creating operational friction",
    constraints: ["occupied unit", "secondary-door control points"],
    issueSummary:
      "Systems begin to lose value when operators have to switch platforms for routine events, permissions, and review tasks. The problem shows up in workflow before it shows up in hardware failure.",
    handledSummary:
      "That is why an integration review needs to start with the day-to-day sequence of access events, video checks, and user management. On live sites, [security system integration in Fulham](/security-system-integration/fulham) is really about removing friction from those routines.",
    resultSummary:
      "Once the workflow is simplified, the security stack usually becomes easier to manage and easier to scale. That is the operational result clients actually notice.",
    whenNeededSummary:
      "This explanation is most useful where systems still function independently but the site team has begun to feel the daily inefficiency of keeping them separate.",
    relatedServiceLinks: [
      { href: "/access-control-systems/fulham", label: "access control systems in Fulham" },
      { href: "/ip-camera-systems/fulham", label: "IP camera systems in Fulham" },
    ],
    guideLink: { href: "/cctv-guides/cctv-remote-viewing-setup", label: "remote viewing and system setup guidance" },
    projectLink: { href: "/projects/fulham-access-control-constrained-side-entrance", label: "constrained side-entrance access control in Fulham" },
  },
  {
    slug: "commercial-cctv-compliance",
    title: "How to Tell if a Rear-Yard CCTV Layout Is Leaving Compliance Gaps in Richmond",
    excerpt: "A diagnostic article based on a Richmond rear service yard where the client needed better evidence capture and a cleaner operating basis for commercial CCTV.",
    date: "2023-11-25",
    image: "/images/blog/commercial-cctv-compliance.jpg",
    category: "Compliance",
    intent: "diagnostic",
    serviceSlug: "commercial-cctv-installation",
    serviceTitle: "Commercial CCTV Installation",
    locationId: "richmond",
    locationName: "Richmond",
    propertyType: "service yard behind mixed-use premises",
    specificIssue: "rear-lane blind spots leaving undocumented movements and weak review quality",
    constraints: ["shared rear service lane", "tight cable route"],
    issueSummary:
      "The warning sign is often not the absence of cameras. It is the realisation that the risky part of the site sits in a blind spot, and the recordings are not actually useful when something needs reviewing.",
    handledSummary:
      "That is why compliance and evidence questions need to be tied back to layout. On this kind of site, [commercial CCTV installation in Richmond](/commercial-cctv-installation/richmond) has to cover the actual movement routes that matter, not just the easiest mounting positions.",
    resultSummary:
      "The practical result is more usable evidence and a layout that better supports review, incident response, and day-to-day management of the rear access route.",
    whenNeededSummary:
      "This guide is most useful when a business already has CCTV but realises the coverage or recording quality still leaves operational gaps around deliveries, staff access, or rear-lane movement.",
    relatedServiceLinks: [
      { href: "/ip-camera-systems/richmond", label: "IP camera systems in Richmond" },
      { href: "/security-system-integration/richmond", label: "security system integration in Richmond" },
    ],
    guideLink: { href: "/cctv-guides/cctv-planning-and-placement", label: "CCTV planning and placement" },
    projectLink: { href: "/projects/richmond-commercial-cctv-yard-coverage", label: "commercial CCTV coverage for service yard in Richmond" },
  },
];

export const blogPosts = definitions.map((definition) =>
  buildScenarioArticle(definition)
);

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}
