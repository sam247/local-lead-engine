import {
  buildServiceLocationAnchor,
  getNeighbourLocationIds,
  locations,
  type LocationPageSupplementalSection,
} from "engine";

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
  "drain-excavation/ealing": {
    serviceSlug: "drain-excavation",
    locationSlug: "ealing",
    serviceTitle: "Drain Excavation",
    locationName: "Ealing",
    metaTitleOverride: "Drain Excavation Ealing - Reliable Repairs & Clear Next Steps",
    introOverride:
      "Drain excavation in Ealing is usually the right option when a collapsed run, failed patch repair, or inaccessible defect needs a lasting fix. We help property owners and site teams understand what needs exposing, how reinstatement is managed, and what will affect cost before work starts.",
    supplementalSections: [
      {
        heading: "How excavation work is usually planned",
        paragraphs: [
          "Most Ealing excavation jobs start with a CCTV survey and tracing so the damaged section can be isolated before any digging begins. That early diagnosis matters because it avoids opening more of the driveway, garden, or service yard than the repair actually needs.",
          "Once the defect and depth are confirmed, the next step is agreeing access, spoil removal, traffic or parking constraints, and how surfaces will be reinstated. On tighter West London plots, that planning stage often makes the difference between a controlled repair and a longer, more disruptive programme.",
        ],
        bullets: [
          "Pinpoint the failed section before excavation starts",
          "Plan access, spoil handling, and reinstatement together",
          "Coordinate around shared drives, paving, and utility runs",
        ],
      },
      {
        heading: "What affects scope and cost in Ealing",
        paragraphs: [
          "Cost is shaped by depth, surface finish, and how easy it is to reach the damaged section safely. Excavation beneath hard landscaping, extensions, or narrow side access usually needs more labour and reinstatement than a straightforward run in open ground.",
          "Urgency also changes scope. If the drain failure is causing flooding, foul smells, or repeated blockages, temporary protection and faster mobilisation may be needed to keep the property usable while the permanent repair is completed.",
        ],
      },
    ],
  },
  "drain-jetting/dartford": {
    serviceSlug: "drain-jetting",
    locationSlug: "dartford",
    serviceTitle: "Drain Jetting",
    locationName: "Dartford",
    metaTitleOverride: "Drain Jetting Dartford - Fast Clearance & Reliable Flow",
    introOverride:
      "Drain jetting in Dartford is often the quickest way to restore flow when repeat blockages, grease build-up, or silted runs keep causing disruption. We use it when a stronger clean is needed than rodding alone, with clear advice on whether the line only needs clearing or a deeper repair check.",
    supplementalSections: [
      {
        heading: "When jetting is the right next step",
        paragraphs: [
          "Jetting is usually recommended where drains are still passable but heavily restricted by scale, grease, or compacted debris. On residential and commercial sites in Dartford, it is commonly used after recurring slow drainage, backing-up gullies, or repeat callouts show that a basic clearance has not solved the root build-up.",
          "The process is straightforward: assess the line, choose the correct nozzle and pressure, clear the obstruction, and confirm the run is flowing properly afterwards. If the blockage pattern suggests a structural defect, a CCTV check can then show whether damage or root ingress is contributing to the problem.",
        ],
      },
      {
        heading: "What changes the cost or scope",
        paragraphs: [
          "Pricing is usually driven by access, pipe length, and how severe the build-up is. Longer commercial runs, lines with multiple access points, or jobs that need follow-on camera work will usually take longer than a simple domestic jetting visit.",
          "Urgent attendance can also affect scope. If wastewater is backing up internally or outside drainage is affecting operations, the first priority is restoring safe flow quickly and then confirming whether further cleaning or repair work is needed to stop the issue returning.",
        ],
      },
    ],
  },
  "cctv-drain-surveys/ilford": {
    serviceSlug: "cctv-drain-surveys",
    locationSlug: "ilford",
    serviceTitle: "CCTV Drain Survey",
    locationName: "Ilford",
    metaTitleOverride: "CCTV Drain Survey Ilford - Fast Diagnosis & Clear Reporting",
    introOverride:
      "A CCTV drain survey in Ilford gives you a clear view of what is happening inside the line before you commit to repair work. It is especially useful when drainage problems keep returning, a purchase needs evidence, or you need to understand whether the issue is a blockage, collapse, or displaced joint.",
    supplementalSections: [
      {
        heading: "What the survey process should clarify",
        paragraphs: [
          "The value of a CCTV survey is not just the footage. A useful survey should confirm the pipe condition, defect position, likely cause, and what type of repair is proportionate. That is what helps owners, buyers, and property managers move from uncertainty to an informed next step.",
          "In Ilford, surveys are often arranged before excavation, relining, or purchase negotiations so the scope is based on evidence rather than assumptions. If the problem only affects one section, the report helps keep any follow-on work focused and easier to budget.",
        ],
        bullets: [
          "Confirm whether the issue is structural or maintenance-related",
          "Record the exact position of defects before repair work",
          "Support quotes, reporting, and next-step decisions",
        ],
      },
      {
        heading: "What affects price and reporting scope",
        paragraphs: [
          "Cost usually depends on access points, run length, and whether the survey needs formal reporting for insurance, legal, or purchase purposes. A short domestic line is different from surveying several access chambers or tracing a more complex underground route.",
          "If the drainage layout is unclear, additional tracing can be worthwhile because it stops later repair work becoming a guess. That extra clarity is often what saves time and unnecessary excavation once the findings are reviewed.",
        ],
      },
    ],
  },
};

function getTargetEntries() {
  return Object.values(TARGETS);
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
