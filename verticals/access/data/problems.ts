import type { ProblemData } from "engine";

export const accessProblems: ProblemData[] = [
  {
    slug: "access-control-system-cost",
    title: "Access control system cost",
    causes:
      "Costs for access control systems depend on the number of doors, reader type (card, fob, biometric), integration with CCTV or alarms, and whether you need cloud or on-premise software. Labour and cabling also vary by site size and existing infrastructure.",
    howFixed:
      "We carry out a site survey and specify a system to match your requirements and budget. Options range from standalone door controllers to fully integrated systems with audit trails and remote management. We provide fixed-price quotes after the survey.",
    whenToCall:
      "Call a professional when you are planning a new installation, upgrade or expansion. Early specification helps avoid costly changes later and ensures compatibility with existing security or building systems.",
    relatedServiceSlugs: ["access-control-systems", "security-system-integration", "commercial-cctv-installation"],
    ctaMessage:
      "For a tailored access control quote and design, request a security consultation. We survey your site and provide a fixed-price proposal.",
  },
  {
    slug: "commercial-cctv-installation-cost",
    title: "Commercial CCTV installation cost",
    causes:
      "Commercial CCTV costs depend on the number of cameras, resolution (HD, 4K), recording storage, night performance, and whether you need remote viewing, analytics or integration with access control. Cabling and labour vary with site size and access.",
    howFixed:
      "We specify and install CCTV systems to match your coverage and budget. We can integrate with existing recorders or access control and provide remote viewing and retention to suit your needs. Quotes are provided after a site survey.",
    whenToCall:
      "Call a professional when you need a new system, additional cameras or an upgrade. A site survey ensures correct placement and avoids under- or over-specification.",
    relatedServiceSlugs: ["commercial-cctv-installation", "ip-camera-systems", "security-system-integration"],
    ctaMessage:
      "For a commercial CCTV quote, request a security consultation. We survey your site and recommend camera positions and equipment.",
  },
  {
    slug: "hospital-security-system-requirements",
    title: "Hospital security system requirements",
    causes:
      "Hospitals need access control and CCTV that support NHS and healthcare compliance, audit trails, restricted zones (e.g. pharmacy, IT), and integration with alarm and building systems. Staff and visitor flow must be managed without hindering clinical operations.",
    howFixed:
      "We design and install access control and CCTV for healthcare environments, with attention to compliance, zoning and audit requirements. Systems can integrate with existing security and BMS. We work with facilities and security teams to align with policy.",
    whenToCall:
      "Call a professional when planning a new build, refurbishment or security upgrade. Early involvement helps ensure the system meets operational and compliance requirements.",
    relatedServiceSlugs: ["access-control-systems", "commercial-cctv-installation", "security-system-integration"],
    ctaMessage:
      "For hospital and healthcare security systems, request a security consultation. We can survey your site and outline a compliant, practical solution.",
  },
  {
    slug: "data-centre-perimeter-security",
    title: "Data centre perimeter security",
    causes:
      "Data centres require perimeter intrusion detection, access control and CCTV that meet contractual and compliance requirements. Layered security typically includes fence or boundary detection, controlled entry (e.g. mantrap), badging and full surveillance with recording and audit.",
    howFixed:
      "We design and install perimeter security, access control and CCTV for data centres. Solutions include detection systems, access control with mantrap options, and IP camera systems with integration to BMS or monitoring. We work with facilities teams to minimise disruption.",
    whenToCall:
      "Call a professional when specifying or upgrading data centre security. Early design input ensures the solution meets compliance and operational needs.",
    relatedServiceSlugs: ["perimeter-security-systems", "access-control-systems", "ip-camera-systems", "security-system-integration"],
    ctaMessage:
      "For data centre perimeter and access security, request a security consultation. We survey your site and propose a layered solution.",
  },
  {
    slug: "how-many-cameras-for-commercial-building",
    title: "How many cameras for commercial building",
    causes:
      "The number of cameras needed depends on entry and exit points, corridors, receptions, loading areas, perimeters and any high-value or high-risk zones. Coverage, resolution and recording duration also affect the design and cost.",
    howFixed:
      "We carry out a site survey and recommend camera count, positions and specification. We take into account blind spots, lighting, recording retention and any integration with access control. You receive a clear proposal with coverage plan and fixed price.",
    whenToCall:
      "Call a professional when planning a new system or extension. A survey ensures you get the right coverage without over- or under-specifying.",
    relatedServiceSlugs: ["commercial-cctv-installation", "ip-camera-systems", "security-system-integration"],
    ctaMessage:
      "To determine how many cameras your commercial building needs, request a security consultation. We survey your site and provide a coverage plan and quote.",
  },
];

export function getAccessProblemBySlug(slug: string): ProblemData | undefined {
  return accessProblems.find((p) => p.slug === slug);
}
