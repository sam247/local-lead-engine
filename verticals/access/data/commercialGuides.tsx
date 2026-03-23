import Link from "next/link";
import type { GuidePageProps, GuidePageSection, Service, Location } from "engine";
import { pickServiceDetailFeaturedLocations } from "engine";

const SERVICES_PATH = "/services";

export type AccessCommercialGuideSlug =
  | "hospital-security-system-requirements"
  | "data-centre-perimeter-security";

export interface AccessCommercialGuideDefinition {
  slug: AccessCommercialGuideSlug;
  title: string;
  metaDescription: string;
  intro: string;
  sections: GuidePageSection[];
  /** Service slugs for the related-services list (typically two or three; resolved against `services`). */
  relatedServiceSlugs: readonly string[];
  /** Primary service slug for service × location links in “Areas we cover”. */
  primaryServiceSlugForAreas: string;
  primaryCta: GuidePageProps["primaryCta"];
}

const hospitalGuide: AccessCommercialGuideDefinition = {
  slug: "hospital-security-system-requirements",
  title: "Hospital security systems in the UK: requirements, zoning and delivery",
  metaDescription:
    "Practical guide for NHS trusts and private healthcare: access control, CCTV, audit trails, pharmacy and critical zones. How to specify and procure hospital security without blocking clinical flow.",
  intro:
    "This guide is for estates, security and IT leads planning or upgrading security in NHS and private hospitals across the UK. It explains what typically needs to be specified, which standards and operational constraints matter, and how to avoid common specification mistakes that delay handover or create compliance gaps.",
  relatedServiceSlugs: ["access-control-systems", "commercial-cctv-installation", "security-system-integration"],
  primaryServiceSlugForAreas: "access-control-systems",
  primaryCta: {
    heading: "Plan hospital security with a site-specific design",
    body: "We survey acute and community sites, align with your policies and contractors, and quote fixed-scope work for access, CCTV and integration—without generic packages.",
    buttonHref: "/contact",
    buttonLabel: "Request security consultation",
  },
  sections: [
    {
      heading: "What this involves",
      paragraphs: [
        <>
          Hospital security is rarely a single product: it is a layered mix of{" "}
          <Link href={`${SERVICES_PATH}/access-control-systems`} className="text-primary hover:underline">
            access control
          </Link>{" "}
          on staff, visitor and service routes,{" "}
          <Link href={`${SERVICES_PATH}/commercial-cctv-installation`} className="text-primary hover:underline">
            CCTV
          </Link>{" "}
          in public, clinical support and high-risk areas, intruder signalling where required, and often{" "}
          <Link href={`${SERVICES_PATH}/security-system-integration`} className="text-primary hover:underline">
            integration
          </Link>{" "}
          with alarms, nurse call or building management so events are visible on one operational picture. Pharmacy, theatres, maternity, mental health and paediatric zones usually need tighter rules than general wards: time-based access, escorted visitor routes, and cameras placed to support incident review without capturing unnecessary clinical detail.
        </>,
        "Scoping also covers contractor and out-of-hours access, loading bays, car parks, and links to existing trust-wide cards or identity systems. In refurbishment, you are often retrofitting around live clinical space, asbestos constraints, listed fabric and phased handover—so cabling routes, wireless options and temporary doors need to be planned as part of the same programme, not bolted on after M&E sign-off.",
        "Commissioning usually includes witness testing with clinical areas empty, coordination with fire damper and door-drop tests, and zone-by-zone sign-off before production credentials are loaded. Major incident and lockdown plans should name who can override doors, how duress alarms reach security, and how police or ambulance access is managed without leaving critical routes unsecured.",
      ],
    },
    {
      heading: "Key requirements",
      paragraphs: [
        "In the UK, procurement is usually run against trust security policies, fire strategy, data protection (including DPIAs where cameras could capture identifiable patients), and NHS digital or IG requirements where systems touch the network. You should expect demand for role-based access, anti-passback on sensitive doors, configurable access levels by shift, and audit exports after incidents or investigations.",
        "CCTV retention periods, viewing permissions and signage must be agreed with privacy and clinical governance: blanket recording inside clinical rooms is rarely acceptable. Access readers should survive heavy use and infection-control cleaning; IP65 or equivalent and vandal-resistant housings are common on public routes. Resilience matters: if the access server or network fails, doors must fail-safe or fail-secure in line with the fire strategy, not leave wards unlocked by default.",
        "Integration expectations often include synchronising cardholders from HR or active directory (where approved), linking alarms to the security control room, and providing evidence packs for CQC or police disclosure within agreed timescales. Early agreement on naming conventions, VLANs and cyber hardening avoids rework when IT security review lands late in the project.",
        "Wayfinding and emergency egress must stay coherent when doors are locked: push-to-exit hardware, clear signage and staffed override paths should be written into major incident plans so security measures never contradict the fire strategy or trap staff in smoke-filled zones.",
      ],
    },
    {
      heading: "Common problems",
      paragraphs: [
        "We frequently see legacy standalone controllers that cannot scale when a new wing opens, or mixed vendors that refuse to talk to each other, forcing duplicate databases and manual updates. Cheap readers on critical doors fail within months; proprietary lock hardware then locks you to one supplier for every spare part.",
        "CCTV designs copied from retail or offices often miss corridor junction coverage, create glare in brightly lit atria, or leave night-time blind spots on A&E approaches. Poor microphone or audio policy on IP cameras can create GDPR headaches. Access schedules that are too coarse—one rule for the whole site—lead to tailgating and “tailor-made” workarounds like wedged doors.",
        "Late engagement of security specialists means containment, cable routes and IDF space are undersized; then cameras are mounted where they fit, not where they evidence incidents. Finally, training and handover are skipped: staff do not know how to grant temporary access or export audit trails when the SIU asks at 2 a.m.",
      ],
    },
    {
      heading: "How we approach this",
      paragraphs: [
        "1. Discovery and survey — We walk the site with estates and security, confirm zones, flow, hours, existing cards and network readiness, and flag fire, infection-control and privacy constraints before we commit hardware.",
        "2. Design and documentation — We produce a zone matrix, door schedule, camera coverage plan and integration outline aligned to your policies. Where needed we support DPIA and IG paperwork with technical descriptions only—you retain clinical and legal sign-off.",
        "3. Installation and staging — We phase work to minimise disruption to clinical areas, coordinate with main contractors for containment and power, test failover and duress paths, and keep an as-built record of device IDs and VLANs.",
        "4. Commissioning, training and support — We hand over with administrator training, defined audit procedures, and optional maintenance so firmware, certificates and backups stay current after go-live.",
      ],
    },
  ],
};

const dataCentreGuide: AccessCommercialGuideDefinition = {
  slug: "data-centre-perimeter-security",
  title: "Data centre perimeter security: layers, access and surveillance in the UK",
  metaDescription:
    "How to design perimeter, access and CCTV for UK colocation and enterprise data centres: mantraps, PIDs, visitor audit, and avoiding weak links that fail customer or insurer scrutiny.",
  intro:
    "Written for operators, facilities managers and clients specifying colocation or enterprise data halls in the UK. It sets out how perimeter, access and surveillance layers fit together, what auditors and insurers typically look for, and where projects go wrong so you can brief contractors with clear, testable outcomes.",
  relatedServiceSlugs: ["perimeter-security-systems", "access-control-systems", "ip-camera-systems"],
  primaryServiceSlugForAreas: "perimeter-security-systems",
  primaryCta: {
    heading: "Specify perimeter and access as one programme",
    body: "We combine boundary detection, controlled entry and IP surveillance so your site stands up to customer audits and operational reality—not just drawing-board checklists.",
    buttonHref: "/contact",
    buttonLabel: "Request security consultation",
  },
  sections: [
    {
      heading: "What this involves",
      paragraphs: [
        <>
          A credible data centre security story starts at the boundary: fence or wall line, vehicle gates, and{" "}
          <Link href={`${SERVICES_PATH}/perimeter-security-systems`} className="text-primary hover:underline">
            perimeter intrusion detection
          </Link>{" "}
          or CCTV analytics that raise events to monitoring staff. Inside that, visitor and contractor routes are separated from white space through{" "}
          <Link href={`${SERVICES_PATH}/access-control-systems`} className="text-primary hover:underline">
            access control
          </Link>{" "}
          —often including mantraps, interlocks, biometric or dual authentication for data hall entry, and strict rules for tailgating.{" "}
          <Link href={`${SERVICES_PATH}/ip-camera-systems`} className="text-primary hover:underline">
            IP cameras
          </Link>{" "}
          cover approach paths, mantraps, corridors and loading areas with retention and export workflows that match your customer contracts.
        </>,
        "Supporting systems include visitor management with pre-registration, contractor badges with expiry, and logging that ties card or biometric events to CCTV timestamps for investigations. Many operators also need integration with DCIM or ticketing so work orders open and close doors under change control. For edge or modular sites, power and connectivity for perimeter devices must be engineered for the same uptime tier as the hall itself.",
        "Meet-me rooms, shared loading docks and landlord-controlled cores blur accountability: the specification should state which party owns alarms on shared doors, how visitor badges work across landlord and tenant systems, and how rack delivery is supervised from gate to cage.",
      ],
    },
    {
      heading: "Key requirements",
      paragraphs: [
        "Customer and insurer expectations usually reference layered access, visitor audit trails, camera coverage of entry choke points, and evidence retention aligned to contract SLAs. UK GDPR and the CCTV code of practice still apply to staff and visitors on site: signage, retention limits and lawful basis for monitoring should be documented even when the primary driver is physical security.",
        "Cyber requirements increasingly mirror logical security: hardened cameras and controllers, no default credentials, segmented VLANs, and patch windows that do not take every NVR offline at once. Perimeter devices need lightning and surge protection, battery or generator-backed power where the standard demands it, and maintenance access that does not require shutting the mantrap for half a day.",
        "Operational procedures matter as much as hardware: how guards verify tailgating alarms, how escorted access is recorded, and how lost badges are revoked in minutes. Your specification should name response times, test frequencies for interlocks, and who signs off after penetration tests or red-team exercises.",
        "Multi-tenant colocation often needs cage-level access and logging on top of building security; contracts should say who issues credentials, how footage requests are approved, and how long audit exports are kept when customers churn.",
      ],
    },
    {
      heading: "Common problems",
      paragraphs: [
        "Perimeter sensors that false-alarm in wind and wildlife get ignored within weeks; guards silence zones and insurers lose confidence. Cheap beam kits without anti-masking or alignment discipline are a frequent culprit. Mantraps specified without clear failure modes can trap people during fire evacuations if the fire strategy and access logic are not coordinated.",
        "CCTV with wide-angle-only lenses misses faces at lobby distance; 4K everywhere without storage planning forces brutal compression that ruins evidential quality. Separate access and CCTV vendors blaming each other for integration gaps leave you with two silos and no correlated timeline when a rack goes missing.",
        "Visitor systems that are manual spreadsheets at busy sites create queues, shared PINs and unlogged tailgating. Finally, maintenance is underfunded: firmware drifts, TLS certificates expire on bridges, and doors drift out of adjustment until an audit finds a reader that has been taped over “temporarily” for months.",
      ],
    },
    {
      heading: "How we approach this",
      paragraphs: [
        "1. Threat and operations workshop — We align on who you protect against (casual theft, insider, activist, nation-state), your customer audit templates, and how your NOC or guarding team will actually respond to alarms.",
        "2. Layered design — We specify perimeter, lobby, mantrap and hall entry as one sequence with defined test points, camera fields of view, and access rules per role. Integration points to VMS, SIEM or ticketing are named early.",
        "3. Build and integration — We install and commission with phased testing: perimeter first, then access, then VMS correlation. We document VLANs, device inventory and failover behaviour for handover packs.",
        "4. Handover and optimisation — We train security and facilities on daily operations, tune analytics to reduce false positives, and agree a maintenance plan for patches, lens cleaning and interlock testing.",
      ],
    },
  ],
};

const COMMERCIAL_GUIDES: AccessCommercialGuideDefinition[] = [hospitalGuide, dataCentreGuide];

export function getAccessCommercialGuideBySlug(slug: string): AccessCommercialGuideDefinition | undefined {
  return COMMERCIAL_GUIDES.find((g) => g.slug === slug);
}

export function getAllAccessCommercialGuideSlugs(): AccessCommercialGuideSlug[] {
  return COMMERCIAL_GUIDES.map((g) => g.slug);
}

/** Short descriptions for `/guides` hub cards (H1 titles are longer for SEO on the guide itself). */
export const accessCommercialGuideHubCards: { title: string; description: string; href: string }[] = [
  {
    title: "Hospital security systems",
    description: "Zoning, access, CCTV and integration for NHS and private healthcare sites in the UK.",
    href: "/access-problems/hospital-security-system-requirements",
  },
  {
    title: "Data centre perimeter security",
    description: "Layers, mantraps, detection and surveillance for colocation and enterprise facilities.",
    href: "/access-problems/data-centre-perimeter-security",
  },
];

export function buildAccessCommercialGuidePageProps(
  guide: AccessCommercialGuideDefinition,
  services: Service[],
  locations: Location[]
): Omit<GuidePageProps, "companyInfo" | "baseUrl"> {
  const path = `/access-problems/${guide.slug}`;
  const relatedServices = guide.relatedServiceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => s != null)
    .map((s) => ({ href: `${SERVICES_PATH}/${s.slug}`, label: s.title }));

  const primary = services.find((s) => s.slug === guide.primaryServiceSlugForAreas);
  const featured = pickServiceDetailFeaturedLocations(
    locations,
    `${guide.slug}-commercial-guide`,
    "access"
  );
  const areasWeCover =
    primary && featured.length > 0
      ? featured.map((loc) => ({
          href: `/${primary.slug}/${loc.id}`,
          label: `${primary.title} — ${loc.name}`,
        }))
      : [];

  return {
    title: guide.title,
    metaDescription: guide.metaDescription,
    intro: guide.intro,
    sections: guide.sections,
    path,
    breadcrumbParent: { name: "Guides", href: "/guides" },
    relatedServices,
    areasWeCover,
    areasWeCoverIntro:
      "We work on commercial and public-sector sites across London and major UK locations. Representative areas:",
    primaryCta: guide.primaryCta,
    footerTeaser: (
      <>
        Prefer email first?{" "}
        <Link href="/contact" className="font-medium text-primary hover:underline">
          Contact us
        </Link>{" "}
        with your site and programme—we will respond with next steps.
      </>
    ),
  };
}
