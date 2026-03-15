import type { InfoPageData } from "engine";

export const accessControlGuidesPages: InfoPageData[] = [
  {
    slug: "door-vs-gate-access-control",
    title: "Door vs gate access control",
    metaDescription: "Door and gate access control: differences, hardware and when to use each. Guide for commercial sites.",
    intro: "Access control for doors and gates uses similar credentials and software but different hardware. Doors typically use electric locks or strikes; gates use motors, barriers or turnstiles. This guide explains the options and how we specify the right solution.",
    signs: ["Doors: keypad, card or biometric reader plus electric lock or strike", "Gates: same credentials with gate motor, barrier or turnstile", "Integration with CCTV and intercom common for both", "Power and cabling requirements differ for gates", "We design for doors, gates and vehicle access"],
    diagnosis: "We assess your entry points and traffic (pedestrian vs vehicle), then specify readers, locks or gate hardware and any integration with CCTV or intercom. We provide a single system where possible.",
    resolution: "We install and commission door and gate access control with one credential system where required. Training and documentation are included so you can manage users and permissions.",
    ctaText: "Need access control for doors or gates? We survey your site and propose a solution.",
    relatedServices: ["access-control-systems", "perimeter-security-systems", "security-system-integration"],
    relatedPages: [
      { slug: "card-vs-biometric-access", category: "access-control-guides", title: "Card vs biometric access" },
    ],
  },
  {
    slug: "card-vs-biometric-access",
    title: "Card vs biometric access",
    metaDescription: "Card, fob and biometric access control compared. Pros, cons and when to use each for commercial security.",
    intro: "Access control can use cards or fobs, biometrics (fingerprint, face) or a combination. Choice depends on security level, user numbers, hygiene and budget. This guide compares the options and typical use cases.",
    signs: ["Cards and fobs: easy to issue, revoke and replace; can be lost or shared", "Biometrics: no card to carry; higher security; hygiene and privacy considerations", "Hybrid: card plus biometric for high-security zones", "Cloud vs on-premise software affects management", "We specify and install all common reader types"],
    diagnosis: "We discuss your security level, user groups and any compliance requirements, then recommend card, biometric or hybrid. We can phase rollout (e.g. cards first, biometric for critical areas).",
    resolution: "We install the chosen reader types, configure user groups and permissions, and train your team on adding and removing users. We support cloud and on-premise management platforms.",
    ctaText: "Choosing between card and biometric access? We can recommend and install the right option.",
    relatedServices: ["access-control-systems", "security-system-integration"],
    relatedPages: [
      { slug: "door-vs-gate-access-control", category: "access-control-guides", title: "Door vs gate access control" },
    ],
  },
];
