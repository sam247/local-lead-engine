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
  "commercial-cctv-installation/teddington": {
    serviceSlug: "commercial-cctv-installation",
    locationSlug: "teddington",
    serviceTitle: "Commercial CCTV Installation",
    locationName: "Teddington",
    metaTitleOverride: "Commercial CCTV Installation Teddington - Reliable Coverage & Faster Response",
    introOverride:
      "Commercial CCTV installation in Teddington is usually commissioned when a site needs clearer coverage, stronger incident evidence, or an upgrade from ageing analogue equipment. We help businesses define the right camera layout, recording approach, and installation scope before budget is committed.",
    supplementalSections: [
      {
        heading: "How a CCTV installation project is usually structured",
        paragraphs: [
          "The process typically starts with a site review so entry points, circulation areas, blind spots, and operational priorities can be mapped properly. That early planning matters because a camera count alone does not tell you whether the system will actually support investigations, deterrence, and day-to-day monitoring.",
          "For Teddington sites, the useful conversation is usually about outcome first: what needs to be seen, how long footage should be retained, and whether the CCTV needs to tie into access control or wider monitoring. Once that is clear, the hardware and install scope become much easier to size accurately.",
        ],
      },
      {
        heading: "What affects cost, scope, and urgency",
        paragraphs: [
          "Budget is influenced by camera quantity, cabling routes, storage requirements, lighting conditions, and whether existing infrastructure can be reused. Retrofit work in occupied buildings can also increase scope if access has to be phased around staff, visitors, or trading hours.",
          "Urgency tends to rise when there has already been an incident, insurance pressure, or concern about staff safety. In those cases, a fast but properly scoped rollout helps avoid buying a system that still leaves critical areas uncovered.",
        ],
        bullets: [
          "Start with coverage outcomes, not camera numbers alone",
          "Allow for retention, lighting, and cabling complexity",
          "Plan around live operations to reduce disruption",
        ],
      },
    ],
  },
  "access-control-systems/isleworth": {
    serviceSlug: "access-control-systems",
    locationSlug: "isleworth",
    serviceTitle: "Access Control Systems",
    locationName: "Isleworth",
    metaTitleOverride: "Access Control Systems Isleworth - Secure Entry & Clear Upgrade Planning",
    introOverride:
      "Access control systems in Isleworth are often upgraded when keys are hard to manage, shared doors need better control, or audit visibility has become a security gap. We help businesses choose a practical system that matches the building, the user groups, and the level of control they actually need.",
    supplementalSections: [
      {
        heading: "When access control becomes the right next step",
        paragraphs: [
          "The trigger is usually operational rather than technical. Doors are being shared by too many users, permissions are difficult to revoke, or managers need a clearer record of who has been granted access to which areas. That is when moving from unmanaged entry to a controlled system starts saving time as well as reducing risk.",
          "On Isleworth sites with multiple entrances or mixed-use space, the best setup normally balances security, convenience, and administration. That could mean standalone door control, networked readers, or integration with CCTV and intercom depending on how the building is used.",
        ],
      },
      {
        heading: "What drives cost and project scope",
        paragraphs: [
          "Scope depends on the number of doors, lock types, power availability, credential method, and whether the system needs central software, reporting, or integration with other security tools. Retrofit works also vary depending on door condition and how much wiring can be concealed cleanly.",
          "If the project is urgent because of staff changes, compliance concerns, or a recent access issue, the rollout may need to prioritise critical doors first. A phased plan can often improve security quickly while leaving room for later expansion.",
        ],
        bullets: [
          "Define user groups and permission levels before design",
          "Check door hardware and power constraints early",
          "Phase urgent upgrades without losing long-term flexibility",
        ],
      },
    ],
  },
  "security-system-integration/stevenage": {
    serviceSlug: "security-system-integration",
    locationSlug: "stevenage",
    serviceTitle: "Security System Integration",
    locationName: "Stevenage",
    metaTitleOverride: "Security System Integration Stevenage - Joined-Up Control & Safer Operations",
    introOverride:
      "Security system integration in Stevenage is most valuable when CCTV, access control, alarms, or intercoms are working in isolation and slowing down response. We help sites create a joined-up setup that improves visibility, reduces manual work, and makes security events easier to manage.",
    supplementalSections: [
      {
        heading: "What integration work should solve",
        paragraphs: [
          "The goal is usually not just adding new equipment. It is making sure the existing systems support quicker decisions, clearer incident handling, and simpler day-to-day administration. If operators are switching between platforms or manually matching footage to access events, integration is often the missing step.",
          "For Stevenage offices, warehouses, and multi-tenant premises, the practical scope may involve linking door events to video, improving central monitoring, or consolidating user management. A good brief focuses on those operational outcomes first and then defines the most sensible technical path.",
        ],
      },
      {
        heading: "What affects budget and delivery scope",
        paragraphs: [
          "Cost usually depends on the age and compatibility of existing systems, licensing, network readiness, and whether the project includes hardware replacement as well as software integration. Legacy equipment can still be workable, but it often needs more careful planning to avoid wasted spend.",
          "Project scope can also grow if the site wants phased migration, reporting improvements, or multiple stakeholder groups brought into one workflow. Getting those requirements clear at the start helps keep the integration programme realistic and easier to approve.",
        ],
        bullets: [
          "Clarify operational pain points before choosing tools",
          "Check existing platform compatibility early",
          "Plan phased migration where older systems are still live",
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
