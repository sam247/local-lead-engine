import {
  buildServiceLocationAnchor,
  getNeighbourLocationIds,
  locations,
  type LocationPageSupplementalSection,
} from "engine";
import { getCommercialOpportunityScore } from "@/lib/commercialOpportunity";

interface L4StrikingDistanceTarget {
  serviceSlug: string;
  locationSlug: string;
  serviceTitle: string;
  locationName: string;
  metaTitleOverride: string;
  introOverride: string;
  supplementalSections: LocationPageSupplementalSection[];
}

const TARGETS: Record<string, L4StrikingDistanceTarget> = {
  "cfa-piling/derby": {
    serviceSlug: "cfa-piling",
    locationSlug: "derby",
    serviceTitle: "CFA Piling",
    locationName: "Derby",
    metaTitleOverride: "CFA Piling Derby - Reliable Foundations & Safer Site Delivery",
    introOverride:
      "CFA piling in Derby is typically chosen when a project needs dependable foundation support with tighter control over vibration, spoil, or site access than alternative piling methods allow. We help teams understand where CFA piling is suitable, what pre-start information is needed, and how piling scope affects programme and cost.",
    supplementalSections: [
      {
        heading: "How CFA piling projects are usually planned",
        paragraphs: [
          "A practical CFA piling brief normally starts with ground information, structural loading requirements, and access assumptions for the piling rig and concrete supply. Those early inputs matter because piling method, pile layout, and working platform expectations all need to align before mobilisation.",
          "On Derby developments, the real value is often programme certainty. When the piling package is scoped properly, the foundation phase becomes easier to sequence with excavation, pile caps, and follow-on structural works instead of becoming a late design bottleneck.",
        ],
      },
      {
        heading: "What affects scope, risk, and budget",
        paragraphs: [
          "Cost depends on pile depth, diameter, quantity, ground conditions, and any constraints on site logistics or working hours. Projects with restricted access, variable strata, or tighter tolerances usually need more planning and verification than straightforward open sites.",
          "If ground risk is not yet well defined, additional investigation can be worthwhile because it reduces the chance of delays once the piling rig is on site. That up-front clarity often protects both budget and programme better than trying to solve uncertainty during delivery.",
        ],
        bullets: [
          "Align piling design, rig access, and platform requirements early",
          "Use ground information to reduce delivery risk",
          "Plan CFA scope with the wider foundation sequence in mind",
        ],
      },
    ],
  },
  "foundation-repair/brentwood": {
    serviceSlug: "foundation-repair",
    locationSlug: "brentwood",
    serviceTitle: "Foundation Repair",
    locationName: "Brentwood",
    metaTitleOverride: "Foundation Repair Brentwood - Reliable Structural Repairs & Clear Next Steps",
    introOverride:
      "Foundation repair in Brentwood is usually needed when cracking, movement, or repeat structural symptoms suggest the problem has gone beyond cosmetic maintenance. We help owners and project teams understand the likely cause, the appropriate repair route, and whether the issue needs immediate stabilisation or a planned remedial programme.",
    supplementalSections: [
      {
        heading: "What the repair process should clarify first",
        paragraphs: [
          "The first step is establishing whether movement is historic, progressive, or linked to drainage, trees, made ground, or wider structural change. That diagnosis stage matters because the best repair is not always the biggest intervention. Sometimes the right answer is targeted local repair, and sometimes the site needs a broader stabilisation strategy.",
          "For Brentwood properties and developments, a good scope should explain not only how the repair will be carried out but how the cause is being addressed. Without that, there is a risk of spending on remediation that does not stop the problem returning.",
        ],
      },
      {
        heading: "What drives cost and programme",
        paragraphs: [
          "Budget is usually shaped by accessibility, extent of damage, need for temporary works, and whether associated drainage or ground improvements are required alongside the structural repair. Internal finishes, external hardstanding, and neighbouring structures can all influence how disruptive the works become.",
          "Programme also depends on how much investigation is still needed before repair starts. If the mechanism of movement is not yet confirmed, spending time on the right evidence usually leads to a more reliable and better-controlled repair plan.",
        ],
        bullets: [
          "Confirm the cause before choosing the remedy",
          "Allow for associated drainage or ground issues in scope",
          "Use evidence-led repair planning to avoid repeat works",
        ],
      },
    ],
  },
  "enabling-works-contractors/ashford": {
    serviceSlug: "enabling-works-contractors",
    locationSlug: "ashford",
    serviceTitle: "Enabling Works Contractors",
    locationName: "Ashford",
    metaTitleOverride: "Enabling Works Contractors Ashford - Fast Site Prep & Clear Delivery Planning",
    introOverride:
      "Enabling works contractors in Ashford are usually brought in when a site needs early-stage preparation before the main build can start safely and efficiently. We help developers and principal contractors define what has to happen first, what can run in sequence, and how that early package affects overall programme certainty.",
    supplementalSections: [
      {
        heading: "What enabling works should achieve",
        paragraphs: [
          "A strong enabling package removes uncertainty before the main construction team commits to larger-scale delivery. That might include clearance, initial excavation, temporary access, drainage diversions, cut and fill preparation, or other early works needed to make the site buildable.",
          "In Ashford, the important point is usually sequencing. The package should be scoped so early works genuinely unlock the next phase rather than creating another layer of coordination issues. Clear interfaces with follow-on trades are what make the package commercially useful.",
        ],
      },
      {
        heading: "What changes the scope or cost",
        paragraphs: [
          "Cost is shaped by the amount of pre-construction risk still sitting on the site, including access constraints, contamination concerns, drainage requirements, and whether demolition or strip-out interfaces are involved. The more unknowns left unresolved, the more the package tends to expand during delivery.",
          "Urgency can also affect how the works are phased. If the site needs to reach a programme milestone quickly, prioritising the items that unlock foundations, piling, or incoming services can be more valuable than treating every early task as equal.",
        ],
        bullets: [
          "Use enabling works to unlock the main build sequence",
          "Prioritise tasks that remove programme blockers first",
          "Resolve access, drainage, and logistics issues up front",
        ],
      },
    ],
  },
  "cfa-piling/tunbridge-wells": {
    serviceSlug: "cfa-piling",
    locationSlug: "tunbridge-wells",
    serviceTitle: "CFA Piling",
    locationName: "Tunbridge Wells",
    metaTitleOverride: "CFA Piling Tunbridge Wells - Structural Foundation Packages & Contractor Quotes",
    introOverride:
      "CFA piling in Tunbridge Wells is commonly procured where projects need structurally reliable foundations with tighter site access control and cleaner programme sequencing than standard excavation-only solutions.",
    supplementalSections: [
      {
        heading: "Where CFA piling is commercially preferred",
        paragraphs: [
          "Developers and high-value extension teams in Tunbridge Wells often choose CFA piling where ground variability or neighbour sensitivity increases structural risk. The decision is usually made to protect foundation certainty, not just to satisfy minimum compliance.",
          "For commercial programme performance, piling scope should be aligned early with excavation, pile cap sequencing, and follow-on structural trades to avoid idle time and cost drift.",
        ],
        bullets: [
          "Use CFA piling where structural certainty outweighs shallow-foundation risk",
          "Align piling with excavation and foundation package sequencing",
          "Scope as a contractor package, not an isolated line item",
        ],
      },
    ],
  },
  "cfa-piling/maidstone": {
    serviceSlug: "cfa-piling",
    locationSlug: "maidstone",
    serviceTitle: "CFA Piling",
    locationName: "Maidstone",
    metaTitleOverride: "CFA Piling Maidstone - Contractor-Led Structural Foundation Delivery",
    introOverride:
      "CFA piling in Maidstone is often specified on structurally sensitive sites where project teams need predictable foundation delivery, reduced disruption, and clear handover into the wider groundworks package.",
    supplementalSections: [
      {
        heading: "Commercial scope and risk controls",
        paragraphs: [
          "On Maidstone projects, CFA piling usually carries the greatest value when framed as part of a broader structural package with excavation and foundation interfaces already mapped.",
          "Programme reliability improves when access assumptions, rig logistics, and concrete supply are resolved before mobilisation.",
        ],
      },
    ],
  },
  "mini-piling-contractors/ashford": {
    serviceSlug: "mini-piling-contractors",
    locationSlug: "ashford",
    serviceTitle: "Mini Piling Contractors",
    locationName: "Ashford",
    metaTitleOverride: "Mini Piling Contractors Ashford - Structural Extensions & Basement Foundation Support",
    introOverride:
      "Mini piling contractors in Ashford are typically engaged where extension, remodelling, or basement-adjacent work needs structural support on constrained sites with limited access and high programme sensitivity.",
    supplementalSections: [
      {
        heading: "Best-fit scenarios for Ashford projects",
        paragraphs: [
          "Mini piling is often preferred where extension loads, restricted access, or uncertain strata make conventional shallow foundations commercially risky.",
          "Where needed, mini piling can be coordinated with underpinning and excavation to deliver a complete structural package rather than fragmented procurement.",
        ],
      },
    ],
  },
  "piling-contractors/tonbridge": {
    serviceSlug: "piling-contractors",
    locationSlug: "tonbridge",
    serviceTitle: "Piling Contractors",
    locationName: "Tonbridge",
    metaTitleOverride: "Piling Contractors Tonbridge - Commercial & Structural Foundation Packages",
    introOverride:
      "Piling contractors in Tonbridge are often selected for structurally complex builds where programme certainty depends on reliable deep foundation delivery and integrated package sequencing.",
    supplementalSections: [
      {
        heading: "How to scope piling commercially",
        paragraphs: [
          "For Tonbridge developments and structural remodelling jobs, piling scope should be defined with excavation and foundation interfaces from the outset.",
          "A package-first approach reduces handover friction and protects budget against mid-programme ground surprises.",
        ],
      },
    ],
  },
  "bulk-earthworks/reigate": {
    serviceSlug: "bulk-earthworks",
    locationSlug: "reigate",
    serviceTitle: "Bulk Earthworks",
    locationName: "Reigate",
    metaTitleOverride: "Bulk Earthworks Reigate - Commercial Groundworks & Structural Site Preparation",
    introOverride:
      "Bulk earthworks in Reigate are most valuable when scoped as part of commercial structural groundworks, especially where enabling works, retaining elements, and foundation interfaces need coordinated delivery.",
    supplementalSections: [
      {
        heading: "From earthworks to structural readiness",
        paragraphs: [
          "Teams in Reigate commonly need earthworks tied directly to foundation and retaining wall requirements rather than treated as isolated volume movement.",
          "Groundworks value rises when cut/fill, access, and downstream package dependencies are managed under one delivery sequence.",
        ],
      },
    ],
  },
};

function getTargetEntries() {
  return Object.values(TARGETS).sort((a, b) => {
    const aScore = getCommercialOpportunityScore(`${a.serviceSlug} ${a.metaTitleOverride} ${a.introOverride}`);
    const bScore = getCommercialOpportunityScore(`${b.serviceSlug} ${b.metaTitleOverride} ${b.introOverride}`);
    return bScore - aScore;
  });
}

export function getL4StrikingDistanceTarget(serviceSlug: string, locationSlug: string) {
  return TARGETS[`${serviceSlug}/${locationSlug}`];
}

export function getL4GuideTargetLinksForServices(serviceSlugs: string[]) {
  const seen = new Set<string>();
  return getTargetEntries().reduce<Array<{ href: string; linkText: string }>>((links, target) => {
    if (!serviceSlugs.includes(target.serviceSlug)) return links;
    const href = `/${target.serviceSlug}/${target.locationSlug}`;
    if (seen.has(href)) return links;
    seen.add(href);
    links.push({
      href,
      linkText: buildServiceLocationAnchor(target.serviceTitle, target.locationName),
    });
    return links;
  }, []);
}

export function getL4PriorityLocalLinks(
  currentServiceSlug: string,
  currentLocationSlug: string,
  priorityByService: Record<string, string[]>
) {
  const allLocationIds = locations.map((location) => location.id);
  const links: Array<{ href: string; label: string }> = [];
  const seen = new Set<string>();

  for (const target of getTargetEntries()) {
    const href = `/${target.serviceSlug}/${target.locationSlug}`;
    const label = buildServiceLocationAnchor(target.serviceTitle, target.locationName);
    const relatedServiceDonors = (priorityByService[target.serviceSlug] ?? []).slice(0, 2);
    const nearbyDonors = getNeighbourLocationIds(target.locationSlug, allLocationIds).slice(0, 2);
    const isSameLocationDonor =
      currentLocationSlug === target.locationSlug && relatedServiceDonors.includes(currentServiceSlug);
    const isNearbyDonor =
      currentServiceSlug === target.serviceSlug && nearbyDonors.includes(currentLocationSlug);

    if ((isSameLocationDonor || isNearbyDonor) && !seen.has(href) && href !== `/${currentServiceSlug}/${currentLocationSlug}`) {
      seen.add(href);
      links.push({ href, label });
    }
  }

  return links;
}
