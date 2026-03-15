import type { InfoPageData } from "engine";

export const perimeterSecurityGuidesPages: InfoPageData[] = [
  {
    slug: "perimeter-detection-types",
    title: "Perimeter detection types",
    metaDescription: "PIR, beams, fence sensors and CCTV for perimeter security. Detection types explained for commercial sites.",
    intro: "Perimeter security uses detection to alert before an intruder reaches the building. Options include PIR sensors, beam systems, fence-mounted sensors and CCTV with analytics. This guide explains each type and how they integrate with CCTV and access control.",
    signs: ["PIR and beam detection: trigger on movement or beam break", "Fence sensors: detect climbing or cutting of fence", "CCTV analytics: line crossing, loitering, zone intrusion", "Integration with VMS and access control for response", "We design layered perimeter solutions"],
    diagnosis: "We survey your boundary, access points and risk level, then recommend detection types and camera positions. We allow for false-alarm reduction and integration with your existing systems.",
    resolution: "We install detection and CCTV as specified, integrate with your control room or VMS, and commission and test so that alerts are reliable and actionable.",
    ctaText: "Need perimeter detection? We design and install systems for boundaries and outdoor areas.",
    relatedServices: ["perimeter-security-systems", "commercial-cctv-installation", "security-system-integration"],
    relatedPages: [
      { slug: "cctv-and-perimeter-integration", category: "perimeter-security-guides", title: "CCTV and perimeter integration" },
    ],
  },
  {
    slug: "cctv-and-perimeter-integration",
    title: "CCTV and perimeter integration",
    metaDescription: "How to integrate CCTV with perimeter detection for verification and evidence. Best practice for commercial security.",
    intro: "Integrating CCTV with perimeter detection means cameras can verify alarms and provide evidence. When a detector triggers, the VMS can show the relevant camera view, record the event and support a coordinated response. This guide covers integration options and benefits.",
    signs: ["Detection trigger can switch VMS to the right camera view", "Recording on alarm reduces storage and speeds review", "CCTV evidence supports incident response and prosecution", "Single platform for access, CCTV and perimeter", "We integrate detection with existing or new CCTV"],
    diagnosis: "We review your detection and CCTV setup and recommend integration (e.g. VMS rules, alarm inputs, PTZ presets). We ensure alarms and footage are linked so operators can verify and act quickly.",
    resolution: "We configure the VMS and detection so that perimeter alarms bring up the right cameras and recordings. We train your team on using the integrated system.",
    ctaText: "Want CCTV to work with your perimeter detection? We can integrate and commission.",
    relatedServices: ["perimeter-security-systems", "commercial-cctv-installation", "security-system-integration"],
    relatedPages: [
      { slug: "perimeter-detection-types", category: "perimeter-security-guides", title: "Perimeter detection types" },
    ],
  },
];
