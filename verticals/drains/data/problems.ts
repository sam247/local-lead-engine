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
    quickChecks:
      "Check that gullies and grates are clear of leaves and debris. Run taps and flush toilets to see if the blockage affects one outlet or several. If only one drain is slow, the issue may be local; if multiple fixtures are affected, the blockage is likely in a shared run.",
    seriousSigns:
      "Recurring blockages after clearing, foul smells that persist, or water backing up from manholes or gullies can indicate a partial collapse, root ingress, or broken pipe. These need a CCTV survey and proper repair, not just another clear-out.",
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
    quickChecks:
      "Note whether the smell is in one spot or across the garden, and if it gets worse after rain or when you run water. Check that inspection chamber covers and gullies are sealed and that no traps have run dry. Avoid pouring chemicals down the drain; they rarely fix a physical leak.",
    seriousSigns:
      "A strong, persistent smell in one area often points to a crack or collapse letting sewage into the soil. Sinkholes, unusually green or soggy patches, or smell that worsens after rain suggest a broken pipe that needs locating and repairing.",
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
    quickChecks:
      "Look for sinkholes, dips or cracks in paving, or patches of grass that stay unusually green. Check if multiple sinks, toilets or gullies are slow or backing up. If only one fixture is affected, the issue may be local; multiple outlets suggest a shared run problem.",
    seriousSigns:
      "Sinkholes, sewage on the ground, or a sudden drop in drainage across several fixtures are strong signs of a collapse. Recurring blockages and foul smells that persist after clearing also suggest structural failure. These need a CCTV survey and repair, not just unblocking.",
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
    quickChecks:
      "Run water in the affected gully or outlet and time how long it takes to clear. Check if other outside drains are also slow. Remove any visible leaves or debris from grates. If the problem has appeared gradually and is getting worse, build-up or partial collapse is likely.",
    seriousSigns:
      "Slow drainage that is worsening, affecting more than one gully, or accompanied by foul smells or gurgling suggests a partial collapse, root blockage, or damaged pipe. Recurring slowness after a quick clear-out also points to a structural or gradient issue that needs surveying.",
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
    quickChecks:
      "Avoid using sinks, toilets and washing machines until the overflow is investigated. Note where the water is appearing—gully, manhole or chamber—and whether it happens when you run water. Do not try to clear pooled wastewater yourself; it is a health risk.",
    seriousSigns:
      "Any overflow of wastewater into the garden is serious. It can indicate a blockage, a collapsed pipe, or a surcharged system. The sooner it is surveyed and repaired, the less risk to health, landscaping and foundations. Treat it as urgent and get a professional assessment.",
  },
];

export function getDrainProblemBySlug(slug: string): ProblemData | undefined {
  return drainProblems.find((p) => p.slug === slug);
}
