import type { InfoPageData } from "engine";

export const securityUpgradesGuidesPages: InfoPageData[] = [
  {
    slug: "analogue-to-ip-cctv-upgrade",
    title: "Analogue to IP CCTV upgrade",
    metaDescription: "Upgrading analogue CCTV to IP. When to upgrade, hybrid options and how we migrate your system.",
    intro: "Upgrading from analogue to IP CCTV improves resolution, remote access and integration. You can replace in stages using hybrid recorders that support both analogue and IP, or go full IP. This guide covers upgrade paths and what to expect.",
    signs: ["IP gives higher resolution and better evidence quality", "Hybrid NVRs let you add IP cameras gradually", "Existing cabling may be reused with adapters in some cases", "New IP cameras and NVR required for full upgrade", "We survey existing system and propose upgrade options"],
    diagnosis: "We assess your current cameras, cabling and recorder and recommend a full or phased upgrade. We can reuse some cabling or plan new runs for IP and PoE.",
    resolution: "We install new IP cameras and NVR (or hybrid), configure recording and remote access, and decommission old equipment. We train your team on the new system.",
    ctaText: "Ready to upgrade to IP CCTV? We can propose a phased or full upgrade.",
    relatedServices: ["commercial-cctv-installation", "ip-camera-systems", "security-system-integration"],
    relatedPages: [
      { slug: "security-system-analytics-upgrade", category: "security-upgrades", title: "Security system analytics upgrade" },
    ],
  },
  {
    slug: "security-system-analytics-upgrade",
    title: "Security system analytics upgrade",
    metaDescription: "Adding analytics to CCTV: motion, line crossing, people counting and intrusion detection. Upgrade guide.",
    intro: "Analytics add intelligence to CCTV: motion detection, line crossing, loitering, people counting and intrusion zones. Many IP cameras and VMS platforms support analytics; upgrading firmware or adding licences can unlock features without replacing hardware. This guide explains options and benefits.",
    signs: ["Motion and line-crossing analytics in many IP cameras and VMS", "People counting and heatmaps for retail or occupancy", "Reduced false alarms with smart detection", "Integration with access control and perimeter", "We configure analytics on existing or new systems"],
    diagnosis: "We review your cameras and VMS and recommend which analytics are available and useful for your site. We can enable built-in analytics or add dedicated analytics modules.",
    resolution: "We configure and tune analytics, set rules and alerts, and train your team on using the new features. We ensure analytics are aligned with your operational needs.",
    ctaText: "Want analytics on your CCTV? We can enable and configure them on your system.",
    relatedServices: ["commercial-cctv-installation", "ip-camera-systems", "security-system-integration"],
    relatedPages: [
      { slug: "analogue-to-ip-cctv-upgrade", category: "security-upgrades", title: "Analogue to IP CCTV upgrade" },
    ],
  },
];
