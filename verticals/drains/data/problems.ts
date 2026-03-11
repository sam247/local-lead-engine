import type { ProblemData } from "engine";

export const drainProblems: ProblemData[] = [
  {
    slug: "blocked-outside-drain",
    title: "Blocked outside drain",
    causes:
      "Outside drains block when debris, leaves, grease, roots, or collapsed pipe sections restrict flow. Soap, fat, and food waste from kitchens can build up in gullies and runs. Tree roots are a common cause of blockages and partial collapses, especially in older clay pipes.",
    howFixed:
      "We usually start with a CCTV drain survey to locate the blockage and assess the pipe condition. High-pressure jetting clears soft blockages; root cutting or excavation may be needed for roots or structural damage. Relining can prevent root regrowth after clearing.",
    whenToCall:
      "Call a professional if multiple fixtures are slow, you notice foul smells, or water backs up from gullies or manholes. Recurring blockages often indicate a structural problem that needs surveying and repair.",
    relatedServiceSlugs: ["cctv-drain-surveys", "drain-unblocking", "drain-jetting", "drain-relining"],
    ctaMessage:
      "If you have a blocked outside drain or recurring drainage issues, our engineers can carry out a CCTV drain survey and clear or repair the problem.",
  },
  {
    slug: "drain-smell-in-garden",
    title: "Drain smell in garden",
    causes:
      "Foul smells in the garden usually mean wastewater is escaping from a damaged or collapsed drain. Cracks, displaced joints, or root damage allow sewage to leak into the soil; the smell can seep up through gaps in paving or planted areas. Blocked vents or dry traps can also cause odours.",
    howFixed:
      "A CCTV drain survey identifies the source of the leak. Depending on the damage, we repair by relining the pipe, excavating and replacing the failed section, or clearing blockages and fixing displaced joints.",
    whenToCall:
      "Call a professional if the smell is persistent, localised to one area, or worse after rain. Early repair prevents further damage and environmental issues.",
    relatedServiceSlugs: ["cctv-drain-surveys", "drain-collapse-repair", "drain-relining", "drain-excavation"],
    ctaMessage:
      "If you are experiencing a drain smell in your garden, our engineers can carry out a CCTV drain survey and recommend the right repair.",
  },
  {
    slug: "collapsed-drain-repair",
    title: "Collapsed drain repair",
    causes:
      "Drains collapse due to age, ground movement, tree root ingress, heavy traffic over shallow pipes, or damage during construction. Clay pipes are especially prone to cracking and collapse over time.",
    howFixed:
      "We use a CCTV survey to confirm the extent and position of the collapse. Repair options include excavation and replacement of the failed section, or relining where the pipe is still structurally suitable. We reinstate surfaces after work.",
    whenToCall:
      "Call a professional if you see sinkholes, persistent blockages, foul smells, or slow drainage from multiple outlets. Do not delay—collapses can worsen and cause subsidence or flooding.",
    relatedServiceSlugs: ["cctv-drain-surveys", "drain-collapse-repair", "drain-excavation", "drain-relining"],
    ctaMessage:
      "If you are experiencing a collapsed drain or drainage issue, our engineers can carry out a CCTV drain survey and repair.",
  },
  {
    slug: "slow-draining-outside-pipe",
    title: "Slow draining outside pipe",
    causes:
      "Slow flow in outside pipes is often caused by partial blockages (grease, roots, debris), a poor gradient, or a partial collapse. Build-up can develop over years and eventually restrict flow or cause backups.",
    howFixed:
      "A CCTV survey shows the condition and gradient of the pipe. We clear blockages with jetting or root cutting, and recommend relining or excavation if the pipe is damaged or incorrectly laid.",
    whenToCall:
      "Call a professional if the slow drainage is getting worse, affects multiple gullies, or is accompanied by smells or backups. Early intervention can avoid a full blockage or collapse.",
    relatedServiceSlugs: ["cctv-drain-surveys", "drain-jetting", "drain-unblocking", "drain-relining"],
    ctaMessage:
      "If you have a slow-draining outside pipe, our engineers can survey the drain and clear or repair it.",
  },
  {
    slug: "drain-overflow-in-garden",
    title: "Drain overflow in garden",
    causes:
      "Overflow in the garden usually means a blockage downstream, a collapsed or restricted pipe, or a surcharged system. Wastewater backs up and escapes at the lowest point—often a gully, manhole, or inspection chamber.",
    howFixed:
      "We locate the cause with a CCTV survey and then clear blockages by jetting or excavation. If the pipe has collapsed or failed, we repair or replace the section and reinstate the garden.",
    whenToCall:
      "Call a professional as soon as you notice overflow or pooling. Raw wastewater is a health hazard and can damage landscaping and foundations.",
    relatedServiceSlugs: ["cctv-drain-surveys", "emergency-drainage", "drain-unblocking", "drain-excavation"],
    ctaMessage:
      "If you have drain overflow in your garden, our engineers can carry out a CCTV drain survey and repair.",
  },
];

export function getDrainProblemBySlug(slug: string): ProblemData | undefined {
  return drainProblems.find((p) => p.slug === slug);
}
