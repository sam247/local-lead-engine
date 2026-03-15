import type { ProblemData } from "engine";

export const cctvProblems: ProblemData[] = [
  {
    slug: "cctv-blind-spots",
    title: "CCTV blind spots",
    causes:
      "Blind spots occur when camera placement leaves areas without coverage. Common causes include poor site survey, obstructions, incorrect lens choice, or cameras mounted too high or at wrong angles. Coverage gaps can allow incidents to go unrecorded.",
    howFixed:
      "We carry out a coverage survey and recommend camera positions, lens types and angles to eliminate blind spots. We can add or relocate cameras and adjust mounting height and angle. Post-installation we verify coverage with a walk-through test.",
    whenToCall:
      "Call when planning a new system, after a missed incident, or when layout changes have created new blind spots. A site survey identifies gaps and the most cost-effective fix.",
    relatedServiceSlugs: ["commercial-cctv-installation", "ip-camera-systems", "security-system-integration"],
    ctaMessage:
      "To fix CCTV blind spots, request a coverage survey. We identify gaps and recommend camera positions and equipment.",
  },
  {
    slug: "poor-cctv-night-vision",
    title: "Poor CCTV night vision",
    causes:
      "Poor night vision is usually due to insufficient infrared (IR) range, overexposure from nearby lights, reflective surfaces, or cameras not suited to low-light conditions. Older analogue cameras often perform poorly at night compared with modern IP units.",
    howFixed:
      "We assess the site lighting and camera specification, then recommend upgrades such as cameras with better IR range, correct mounting to avoid backlight, or supplementary lighting where needed. We can replace or reposition cameras and tune settings.",
    whenToCall:
      "Call when night footage is too dark, washed out or unusable for evidence. Upgrading key cameras or adding lighting often resolves the issue without replacing the whole system.",
    relatedServiceSlugs: ["commercial-cctv-installation", "ip-camera-systems"],
    ctaMessage:
      "For better night vision, we can survey your site and recommend camera upgrades or lighting improvements.",
  },
  {
    slug: "cctv-storage-full",
    title: "CCTV storage full",
    causes:
      "Storage fills when retention is set too long for the available disk space, when resolution or frame rate was increased without adding storage, or when extra cameras were added without expanding the recorder. Motion-only recording can extend retention.",
    howFixed:
      "We review your recording settings, retention requirements and storage capacity. We can add or replace hard drives, reduce retention or resolution where appropriate, or recommend a dedicated NVR with larger capacity. We also set up alerts for low disk space.",
    whenToCall:
      "Call when the recorder is constantly full, overwriting too soon, or when you have added cameras and need more capacity. We size storage to match your retention and camera count.",
    relatedServiceSlugs: ["commercial-cctv-installation", "ip-camera-systems", "security-system-integration"],
    ctaMessage:
      "Running out of CCTV storage? We can expand capacity or optimise settings to match your retention needs.",
  },
  {
    slug: "cctv-remote-access-issues",
    title: "CCTV remote access issues",
    causes:
      "Remote access fails due to incorrect port forwarding, firewall rules, router or NVR settings, or because the system was never set up for secure remote viewing. Dynamic IP changes or ISP restrictions can also block access.",
    howFixed:
      "We configure remote access securely: we set up port forwarding or VPN where appropriate, configure the NVR and router, and test viewing from outside the network. We use secure methods and avoid leaving unnecessary ports open.",
    whenToCall:
      "Call when you cannot view cameras from another location or when remote access has stopped working after a router or network change. We diagnose and restore secure access.",
    relatedServiceSlugs: ["commercial-cctv-installation", "ip-camera-systems", "security-system-integration"],
    ctaMessage:
      "Need reliable remote access to your CCTV? We configure and test secure remote viewing for your system.",
  },
];

export function getCctvProblemBySlug(slug: string): ProblemData | undefined {
  return cctvProblems.find((p) => p.slug === slug);
}
