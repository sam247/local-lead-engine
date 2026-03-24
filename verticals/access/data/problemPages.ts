import type { ProblemData } from "engine";
import { cctvProblems as legacyCctvProblems } from "./cctvProblems";
import { accessProblems as legacyAccessProblems } from "./problems";

export interface AccessProblemPage extends ProblemData {
  primaryServiceSlug: string;
  primaryServiceLabel: string;
  hub: "cctv-problems" | "access-problems";
}

const addedAccessProblemPages: AccessProblemPage[] = [
  {
    slug: "unauthorised-access-risk",
    title: "Unauthorised access risk",
    contextualOpening:
      "Unauthorised access risk usually becomes commercially critical when accountability gaps appear across doors, zones, or user permissions. Access control systems in your area provide auditable control before incidents escalate into operational loss.",
    causes:
      "Risk commonly increases when legacy key systems are unmanaged, permissions are broad, user churn is high, and entry points are not centrally monitored.",
    howFixed:
      "We assess entry points, define role-based access policy, and implement controlled access with reporting so teams can monitor and enforce site security.",
    whenToCall:
      "Call when key control is inconsistent, access logs are missing, or incident concerns are rising around restricted areas.",
    relatedServiceSlugs: ["access-control-systems", "security-system-integration"],
    ctaMessage: "Concerned about unauthorised access? Request a site review and access-control upgrade plan.",
    quickChecks: "List uncontrolled doors, shared credentials, and areas lacking audit visibility.",
    seriousSigns:
      "Urgent action is needed when repeated unauthorised entry events are reported or access privileges cannot be traced.",
    primaryServiceSlug: "access-control-systems",
    primaryServiceLabel: "Access control systems",
    hub: "access-problems",
  },
  {
    slug: "poor-cctv-coverage",
    title: "Poor CCTV coverage",
    contextualOpening:
      "Poor CCTV coverage reduces evidential value exactly when incidents need review. Commercial CCTV installation in your area restores practical coverage around risk zones before security blind periods grow.",
    causes:
      "Coverage gaps are usually caused by poor camera placement, changed site layout, weak lens specification, or missing overlap at key access routes.",
    howFixed:
      "We complete a coverage audit, redesign camera positioning/specification, and implement upgrades with tested visibility across critical paths.",
    whenToCall:
      "Call when incidents are missed on footage, key zones are not visible, or image quality is inadequate for review.",
    relatedServiceSlugs: ["commercial-cctv-installation", "ip-camera-systems"],
    ctaMessage: "Need stronger CCTV coverage? Book a coverage survey and camera redesign plan.",
    quickChecks: "Map no-view areas and review whether camera views still align with current movement routes.",
    seriousSigns:
      "Escalate urgently when incident footage is unusable, no record exists for key entry points, or coverage loss affects compliance.",
    primaryServiceSlug: "commercial-cctv-installation",
    primaryServiceLabel: "Commercial CCTV installation",
    hub: "cctv-problems",
  },
  {
    slug: "blind-spots-security",
    title: "Security blind spots",
    contextualOpening:
      "Security blind spots often sit in exactly the areas where incidents are least tolerated. IP camera systems in your area can close those blind zones with clearer, scalable monitoring.",
    causes:
      "Blind spots are often created by obstructed sightlines, camera angle drift, poor lens choice, or expansion of site use beyond original design.",
    howFixed:
      "We identify blind zones, optimise camera type and placement, and verify improved visibility with walk-through testing.",
    whenToCall:
      "Call when high-risk routes, loading zones, or perimeter transitions are not fully visible in live or recorded views.",
    relatedServiceSlugs: ["ip-camera-systems", "commercial-cctv-installation", "security-system-integration"],
    ctaMessage: "Blind spots creating risk? Arrange a camera layout review and close visibility gaps.",
    quickChecks: "List incident-prone zones with weak coverage and note lighting conditions by time window.",
    seriousSigns:
      "Urgency increases when repeated events occur in unmonitored zones or where incident reconstruction is impossible.",
    primaryServiceSlug: "ip-camera-systems",
    primaryServiceLabel: "IP camera systems",
    hub: "cctv-problems",
  },
  {
    slug: "outdated-access-control",
    title: "Outdated access control",
    contextualOpening:
      "Outdated access control creates friction and risk when permissions, reporting, and reliability no longer match site operations. Access control system modernisation in your area improves control before legacy faults become operational downtime.",
    causes:
      "Common issues include unsupported hardware, limited credential controls, poor audit logging, and failed integration with modern security workflows.",
    howFixed:
      "We assess current infrastructure, define upgrade path, and deliver staged replacement or integration to improve resilience and control without avoidable disruption.",
    whenToCall:
      "Call when failures are recurring, reporting is limited, or expansion plans require role-based control and modern integration.",
    relatedServiceSlugs: ["access-control-systems", "security-system-integration"],
    ctaMessage: "Legacy access system holding operations back? Book an upgrade assessment.",
    quickChecks: "Track outages, unsupported components, and areas where user permissions cannot be controlled reliably.",
    seriousSigns:
      "Treat as urgent when access failures affect business continuity or security incidents cannot be audited.",
    primaryServiceSlug: "access-control-systems",
    primaryServiceLabel: "Access control systems",
    hub: "access-problems",
  },
  {
    slug: "site-security-breach-risk",
    title: "Site security breach risk",
    contextualOpening:
      "Breach risk usually rises when perimeter, CCTV, and access systems are not operating as one coordinated control layer. Security system integration in your area helps teams respond faster and reduce exposure before a major incident occurs.",
    causes:
      "Risk increases with fragmented systems, inconsistent monitoring, delayed incident response, and uncontrolled handoffs between perimeter and building access.",
    howFixed:
      "We unify core security systems, improve event correlation, and implement an incident-ready operational model with clear escalation routes.",
    whenToCall:
      "Call when near misses are increasing, incident response is slow, or multiple systems exist without integrated control.",
    relatedServiceSlugs: ["security-system-integration", "perimeter-security-systems", "commercial-cctv-installation"],
    ctaMessage: "High breach concern? Request an integrated security review and response plan.",
    quickChecks: "Review incident logs, response times, and where event handoff between systems fails.",
    seriousSigns:
      "Urgent intervention is needed when repeated near misses occur or when incident response cannot establish reliable evidence trails.",
    primaryServiceSlug: "security-system-integration",
    primaryServiceLabel: "Security system integration",
    hub: "access-problems",
  },
];

const toPrimary = (p: ProblemData, hub: "cctv-problems" | "access-problems"): AccessProblemPage => ({
  ...p,
  primaryServiceSlug: p.relatedServiceSlugs[0] ?? "security-system-integration",
  primaryServiceLabel: "Security service",
  hub,
});

const allLegacy = [
  ...legacyCctvProblems.map((p) => toPrimary(p, "cctv-problems")),
  ...legacyAccessProblems.map((p) => toPrimary(p, "access-problems")),
];
const legacySlugSet = new Set(allLegacy.map((p) => p.slug));
const uniqueAdded = addedAccessProblemPages.filter((p) => !legacySlugSet.has(p.slug));

export const accessProblemPages: AccessProblemPage[] = [...allLegacy, ...uniqueAdded];
export const cctvProblemPages = accessProblemPages.filter((p) => p.hub === "cctv-problems");
export const accessControlProblemPages = accessProblemPages.filter((p) => p.hub === "access-problems");

export function getAccessProblemPageBySlug(slug: string): AccessProblemPage | undefined {
  return accessProblemPages.find((p) => p.slug === slug);
}
