import {
  generateProjects,
  mergeProjectScenarioContent,
  type ProjectScenarioDefinition,
} from "engine";
import { verticalConfig } from "@/config";
import { locations, services } from "@/lib/data";

const generatedProjects = generateProjects(verticalConfig, locations, services);

const projectDefinitions: ProjectScenarioDefinition[] = [
  {
    id: "project-access-1",
    slug: "office-door-access-control-london",
    title: "Access control upgrade for central London office entrance",
    scenario: {
      propertyType: "multi-tenant office entrance",
      specificIssue: "an outdated fob entry system with no reliable audit trail",
      constraints: ["live reception desk", "install window outside tenant peak hours"],
      jobType: "commercial",
      urgency: "planned",
      complexityLevel: "simple",
    },
    summary:
      "This London job involved replacing an outdated office entry setup where the client needed reliable access control without shutting the reception area during the working day.",
    problem: [
      "The existing entry system was still opening the door, but there was no dependable audit trail and the release hardware had become inconsistent. Because the entrance served multiple tenants, even a short outage had to be planned around building traffic.",
      "The client wanted a cleaner access setup without turning a straightforward front-door upgrade into a long disruption at reception.",
    ],
    solution: [
      "We delivered [access control systems in London](/access-control-systems/london) work by replacing the reader, controller, and lock interface in a controlled evening window, then testing user permissions before the morning open.",
      "The commissioning sequence was kept tight so the door moved from old hardware to the new system in one visit rather than leaving the entrance on a temporary arrangement overnight.",
    ],
    outcome: [
      "The reception team had a working audit trail and a more dependable entry point from the next business day. The client also had a clearer base for future expansion if more doors are added later.",
    ],
    whenNeeded: [
      "This kind of job usually starts when an entry point still operates but the control, reporting, or hardware reliability no longer matches how the building is being used day to day.",
    ],
    relatedServicesSection: [
      "For comparable front-door upgrades, start with [access control systems in London](/access-control-systems/london), then compare [security system integration in London](/security-system-integration/london) if the entrance needs to tie back into wider site security.",
    ],
    equipmentOrMethod: "reader and controller replacement with evening commissioning",
    timeTaken: "one out-of-hours install window",
  },
  {
    id: "project-access-2",
    slug: "richmond-commercial-cctv-yard-coverage",
    title: "Commercial CCTV coverage for service yard in Richmond",
    scenario: {
      propertyType: "service yard behind mixed-use premises",
      specificIssue: "blind spots around deliveries and rear access",
      constraints: ["tight cable route", "shared rear service lane"],
      jobType: "commercial",
      urgency: "planned",
      complexityLevel: "simple",
    },
    summary:
      "We installed CCTV coverage on this Richmond service yard where recurring blind spots around deliveries were leaving the rear access route poorly covered.",
    problem: [
      "The client had front-of-house coverage but nothing dependable over the delivery yard and service lane, which meant incidents and vehicle movements were effectively undocumented. Cable routes were tight because the rear elevation already carried existing services.",
      "The aim was to improve evidence capture without turning the install into a disruptive rewiring exercise across occupied space.",
    ],
    solution: [
      "We completed [commercial CCTV installation in Richmond](/commercial-cctv-installation/richmond) with camera positions focused on the rear gate, loading area, and lane approach rather than simply adding more devices for the sake of it.",
      "The routeing used the cleanest available cable path through the service area so the system could be commissioned in one pass without reopening finishes elsewhere.",
    ],
    outcome: [
      "The rear access route moved from partial visibility to usable recorded coverage, and the client had a far clearer record of delivery traffic and out-of-hours movement.",
    ],
    whenNeeded: [
      "This sort of work is usually needed when a site already has some CCTV but the practical risk sits in a rear lane, yard, or delivery zone that the existing layout never covered properly.",
    ],
    relatedServicesSection: [
      "For similar rear-access coverage, compare [commercial CCTV installation in Richmond](/commercial-cctv-installation/richmond) with [IP camera systems in Richmond](/ip-camera-systems/richmond) if the client needs wider network-based expansion.",
    ],
    equipmentOrMethod: "targeted rear-yard camera installation",
    timeTaken: "one install day with same-day setup",
  },
  {
    id: "project-access-3",
    slug: "chiswick-ip-camera-upgrade-warehouse",
    title: "IP camera upgrade for warehouse in Chiswick",
    scenario: {
      propertyType: "warehouse with internal racking aisles",
      specificIssue: "aging analogue coverage and weak playback quality",
      constraints: ["live picking operation", "high-level install positions"],
      jobType: "commercial",
      urgency: "planned",
      complexityLevel: "complex",
    },
    summary:
      "This Chiswick warehouse project focused on upgrading ageing analogue coverage where playback quality and aisle visibility were no longer good enough for operations.",
    problem: [
      "The old system was producing video, but it was not giving the client a reliable record through the aisles or loading areas. Because the warehouse was live, access equipment and install timing had to fit around picking operations rather than shutting whole zones down.",
      "The job also needed to account for high-level mounting and the network path back to recording.",
    ],
    solution: [
      "We rolled out [IP camera systems in Chiswick](/ip-camera-systems/chiswick) with the new coverage planned around the operational choke points rather than a like-for-like device swap. Install sequencing was split around the warehouse routine so high-level work could be done safely without blocking active aisles for long periods.",
      "That approach improved image quality and gave the client a cleaner path into future system expansion.",
    ],
    outcome: [
      "The warehouse team moved onto a sharper, more usable recording setup with better evidence through the aisles and loading area. The upgrade also gave the client a more scalable base than the previous analogue estate.",
    ],
    whenNeeded: [
      "An upgrade like this is usually needed when legacy CCTV is still running but the image quality, playback reliability, or expansion options no longer fit the way the site operates.",
    ],
    relatedServicesSection: [
      "For similar upgrades, start with [IP camera systems in Chiswick](/ip-camera-systems/chiswick), then review [security system integration in Chiswick](/security-system-integration/chiswick) if access and alarms also need to be tied in.",
    ],
    equipmentOrMethod: "high-level IP camera replacement and commissioning",
    timeTaken: "phased install across one operational day",
  },
  {
    id: "project-access-4",
    slug: "wimbledon-perimeter-detection-data-centre",
    title: "Perimeter detection upgrade for Wimbledon data facility",
    scenario: {
      propertyType: "data-centre-style facility boundary",
      specificIssue: "gaps in perimeter detection around the fence line",
      constraints: ["critical site security controls", "night-time testing"],
      jobType: "commercial",
      urgency: "planned",
      complexityLevel: "complex",
    },
    summary:
      "We upgraded perimeter coverage on this Wimbledon facility where the client needed cleaner fence-line detection and better camera verification on a security-sensitive site.",
    problem: [
      "The site already had layers of security, but the boundary detection and visual verification were not aligned well enough to give the control team confidence in every alert. Testing had to be carried out at night to avoid interfering with normal site operation.",
      "Because this was a critical site, the works also needed tight change control and staged commissioning.",
    ],
    solution: [
      "We delivered [perimeter security systems in Wimbledon](/perimeter-security-systems/wimbledon) work by tightening the detection layout and aligning the cameras with the actual alert zones rather than relying on the older generic coverage pattern.",
      "Commissioning and walk tests were carried out in controlled evening windows so the site team could sign off the response logic before the system was handed back.",
    ],
    outcome: [
      "The client ended up with cleaner boundary alerting and better visual confirmation, which reduced nuisance events and gave the monitoring team a more workable perimeter setup.",
    ],
    whenNeeded: [
      "This kind of upgrade usually comes up when a site already has perimeter kit in place but the real-world alerting and camera response no longer line up well enough for operational use.",
    ],
    relatedServicesSection: [
      "For similar boundary upgrades, compare [perimeter security systems in Wimbledon](/perimeter-security-systems/wimbledon) with [commercial CCTV installation in Wimbledon](/commercial-cctv-installation/wimbledon) if the visual coverage also needs redesign.",
    ],
    equipmentOrMethod: "perimeter detection realignment and night testing",
    timeTaken: "staged evening commissioning",
  },
  {
    id: "project-access-5",
    slug: "kingston-integrated-security-platform-upgrade",
    title: "Integrated security platform refresh for Kingston campus",
    scenario: {
      propertyType: "multi-building campus reception and estate",
      specificIssue: "standalone access and CCTV systems that no longer worked cleanly together",
      constraints: ["live occupied estate", "handover without control-room downtime"],
      jobType: "commercial",
      urgency: "planned",
      complexityLevel: "complex",
    },
    summary:
      "This Kingston project centred on a campus estate where access and CCTV were running separately and the client wanted a cleaner day-to-day security workflow.",
    problem: [
      "The issue was not a lack of hardware; it was the friction created by separate systems, duplicated operator steps, and inconsistent event review. The control room could not afford downtime while the integration work was phased in.",
      "That meant the migration had to be staged carefully so live security coverage stayed intact while the new workflow came online.",
    ],
    solution: [
      "We delivered [security system integration in Kingston](/security-system-integration/kingston) by auditing the existing estate, mapping the practical event flows, and bringing the core monitoring and access events into a more unified operating pattern.",
      "The switchover was staged so the control team could keep working while the new integrated processes were tested building by building.",
    ],
    outcome: [
      "The site moved onto a simpler operating workflow with less duplication between systems and a clearer audit trail for incidents. That was the real value of the project, not just the fact that more devices were connected together.",
    ],
    whenNeeded: [
      "Integration projects like this are usually needed when separate security platforms have become an operational drag rather than a technical asset, especially across estates with multiple entrances or buildings.",
    ],
    relatedServicesSection: [
      "For similar estate-wide upgrades, start with [security system integration in Kingston](/security-system-integration/kingston), then review [access control systems in Kingston](/access-control-systems/kingston) if door control also needs renewing during the same programme.",
    ],
    equipmentOrMethod: "phased system audit, integration, and staged handover",
    timeTaken: "a phased programme without control-room downtime",
  },
  {
    id: "project-access-6",
    slug: "fulham-access-control-constrained-side-entrance",
    title: "Constrained side-entrance access control in Fulham",
    scenario: {
      propertyType: "converted commercial unit with side entrance",
      specificIssue: "unauthorised side-door use and poor access logging",
      constraints: ["tight side passage", "work beside occupied unit"],
      jobType: "commercial",
      urgency: "planned",
      complexityLevel: "simple",
    },
    summary:
      "We secured a problematic side entrance on this Fulham conversion where staff access was being managed informally and there was no dependable record of who had used the door.",
    problem: [
      "The side entrance sat in a narrow passage and could not be worked on like a wide main lobby door. The client needed the route controlled properly, but the occupied unit next to the passage meant the install had to stay compact and tidy.",
      "The issue was operational rather than dramatic, but it had already created enough uncertainty around access and key control to need a proper fix.",
    ],
    solution: [
      "We completed [access control systems in Fulham](/access-control-systems/fulham) work around the side entrance using hardware and routing that suited the narrow passage rather than forcing a bulkier setup into the space.",
      "The commissioning was done with the unit still occupied, so the access route remained usable while the new permissions and logging were brought online.",
    ],
    outcome: [
      "The client gained a controlled side entrance with usable access records and less day-to-day ambiguity around who could use the route. Just as importantly, the install was completed without turning the passage into a longer disruption.",
    ],
    whenNeeded: [
      "Contained access control jobs like this are often needed where secondary entrances or side passages have become a weak point simply because they were never given the same control as the main entry.",
    ],
    relatedServicesSection: [
      "For similar secondary-door work, compare [access control systems in Fulham](/access-control-systems/fulham) with [security system integration in Fulham](/security-system-integration/fulham) if the new door needs to feed events back into wider monitoring.",
    ],
    equipmentOrMethod: "compact side-entrance access hardware and live commissioning",
    timeTaken: "one contained site visit",
  },
];

export const projects = mergeProjectScenarioContent(generatedProjects, projectDefinitions);
export const publishedProjects = projects;
export const homepageProjects = publishedProjects.slice(0, 6);
