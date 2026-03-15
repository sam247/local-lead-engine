import type { InfoPageData } from "engine";

export const dataCablingGuidesPages: InfoPageData[] = [
  {
    slug: "structured-cabling-for-cctv",
    title: "Structured cabling for CCTV",
    metaDescription: "Structured cabling for CCTV and access control. Cat6, PoE and cable runs for commercial security systems.",
    intro: "CCTV and access control rely on structured cabling for power and data. Cat6 and Cat6a support high-resolution IP cameras and PoE (Power over Ethernet), reducing separate power runs. This guide covers cable choice, routing and standards for security installations.",
    signs: ["Cat6/Cat6a for IP cameras and access control", "PoE for cameras and some readers reduces power cabling", "Cable runs planned to avoid interference and damage", "Testing and certification for warranty and performance", "We install structured cabling for security systems"],
    diagnosis: "We plan cable routes from equipment locations to cameras and readers, specify cable type and PoE where appropriate, and allow for future expansion. We follow structured cabling standards.",
    resolution: "We install, label and test all cabling and provide test results. Cabling is documented so that future changes or faults are easy to trace.",
    ctaText: "Need cabling for CCTV or access control? We design and install structured cabling.",
    relatedServices: ["commercial-cctv-installation", "ip-camera-systems", "access-control-systems", "security-system-integration"],
    relatedPages: [
      { slug: "poe-for-cctv-and-access", category: "data-cabling-guides", title: "PoE for CCTV and access" },
    ],
  },
  {
    slug: "poe-for-cctv-and-access",
    title: "PoE for CCTV and access",
    metaDescription: "Power over Ethernet for CCTV and access control. PoE standards, switches and installation guide.",
    intro: "Power over Ethernet (PoE) supplies power and data over a single cable to IP cameras and many access control readers. It simplifies installation and reduces cabling. This guide explains PoE standards, switch choice and what to plan for when specifying security systems.",
    signs: ["PoE (802.3af) and PoE+ (802.3at) for most cameras and readers", "High-power PoE for PTZ or heated cameras", "PoE switches must match device power budget", "Cable length and quality affect power delivery", "We specify and install PoE infrastructure"],
    diagnosis: "We calculate total power requirement for your cameras and readers and specify PoE switches and cabling. We allow for cable length and future additions.",
    resolution: "We install PoE switches and cabling so that cameras and readers are powered from the same cable as data. We test and document the installation.",
    ctaText: "Planning PoE for your CCTV or access system? We can specify and install the infrastructure.",
    relatedServices: ["commercial-cctv-installation", "ip-camera-systems", "access-control-systems"],
    relatedPages: [
      { slug: "structured-cabling-for-cctv", category: "data-cabling-guides", title: "Structured cabling for CCTV" },
    ],
  },
];
