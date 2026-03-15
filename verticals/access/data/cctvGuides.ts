import type { InfoPageData } from "engine";

export const cctvGuidesPages: InfoPageData[] = [
  {
    slug: "cctv-planning-and-placement",
    title: "CCTV planning and placement",
    metaDescription: "How to plan and place CCTV cameras for coverage, evidence and compliance. Expert guide for commercial sites.",
    intro: "Planning and placement determine how effective your CCTV system is. Coverage gaps, poor angles and wrong lens choice lead to blind spots and unusable footage. This guide covers how to plan camera positions, choose lens types and avoid common mistakes.",
    signs: ["Site survey before specifying cameras", "Cover entry points, corridors and high-value areas", "Avoid backlight and reflective surfaces", "Match lens (wide/narrow) to distance and detail needed", "Consider lighting and IR range for 24/7 coverage"],
    diagnosis: "We carry out a site survey and produce a coverage plan showing recommended camera positions, lens types and coverage zones. This ensures you get the right number and type of cameras for your site.",
    resolution: "We install cameras to the agreed plan and verify coverage on site. We can adjust positions and settings during commissioning so that key areas are properly covered and footage is usable for evidence.",
    ctaText: "Need a CCTV coverage plan? Request a site survey and we will recommend positions and equipment.",
    relatedServices: ["commercial-cctv-installation", "ip-camera-systems"],
    relatedPages: [
      { slug: "cctv-recording-and-retention", category: "cctv-guides", title: "CCTV recording and retention" },
      { slug: "cctv-remote-viewing-setup", category: "cctv-guides", title: "CCTV remote viewing setup" },
    ],
  },
  {
    slug: "cctv-recording-and-retention",
    title: "CCTV recording and retention",
    metaDescription: "CCTV recording and retention: how long to keep footage, storage options and compliance for business CCTV.",
    intro: "Recording duration and retention depend on your compliance requirements, storage capacity and how you use the footage. Getting the balance right avoids running out of space while keeping evidence long enough for incidents and audits.",
    signs: ["Typical retention: 30–90 days for general business", "Longer retention for high-risk or regulated sites", "Motion-only recording extends retention", "Storage size depends on resolution, frame rate and camera count", "Data protection rules apply to personal data in footage"],
    diagnosis: "We advise on retention periods and storage sizing based on your camera count, resolution and compliance needs. We can configure motion-only or continuous recording and set low-disk alerts.",
    resolution: "We specify and install NVRs with adequate storage, set retention and overwrite policies, and ensure your setup meets your operational and data protection requirements.",
    ctaText: "Need help with CCTV storage and retention? We can size and configure your system.",
    relatedServices: ["commercial-cctv-installation", "ip-camera-systems", "security-system-integration"],
    relatedPages: [
      { slug: "cctv-planning-and-placement", category: "cctv-guides", title: "CCTV planning and placement" },
      { slug: "cctv-remote-viewing-setup", category: "cctv-guides", title: "CCTV remote viewing setup" },
    ],
  },
  {
    slug: "cctv-remote-viewing-setup",
    title: "CCTV remote viewing setup",
    metaDescription: "How to set up secure remote viewing for business CCTV. Apps, VPN and best practice.",
    intro: "Remote viewing lets you check live footage and playback from another location. Setup must be secure to avoid unauthorised access and to comply with data protection. This guide covers app-based viewing, VPN options and secure configuration.",
    signs: ["Mobile and desktop apps from NVR or camera manufacturer", "Secure setup: avoid default passwords and open ports", "VPN or cloud relay for extra security", "Port forwarding or router configuration often required", "We configure and test remote access as part of installation"],
    diagnosis: "We configure remote access using the manufacturer's app or client software and set up your network and NVR so that access is secure. We test from outside the site to confirm it works.",
    resolution: "Once configured, you can view live and recorded footage from phones, tablets or PCs. We provide simple instructions and can support with any future network or router changes.",
    ctaText: "Need secure remote access to your CCTV? We configure and test it for you.",
    relatedServices: ["commercial-cctv-installation", "ip-camera-systems", "security-system-integration"],
    relatedPages: [
      { slug: "cctv-planning-and-placement", category: "cctv-guides", title: "CCTV planning and placement" },
      { slug: "cctv-recording-and-retention", category: "cctv-guides", title: "CCTV recording and retention" },
    ],
  },
];
