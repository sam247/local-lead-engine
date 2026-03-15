import type { InfoPageData } from "engine";

export const sitePreparationPages: InfoPageData[] = [
  {
    slug: "site-preparation-overview",
    title: "Site preparation overview",
    metaDescription: "Site preparation for construction: surveys, clearance and enabling works. UK guide.",
    intro: "Site preparation gets the site ready for main construction. It typically includes topographical and utility surveys, site clearance, strip and enabling works such as access, temporary drainage and fencing. Getting preparation right reduces risk and keeps the programme on track.",
    signs: ["Topographical survey for levels and features", "Utility survey to avoid service strikes", "Clearance of vegetation and structures", "Access roads and hardstanding", "Temporary drainage and fencing", "Handover to main contractor"],
    diagnosis: "We plan site preparation with you and any surveyors or designers. Surveys inform the sequence and reduce the chance of rework or delays.",
    resolution: "We deliver clearance and enabling works to programme. We can coordinate with surveyors and the main contractor so the site is ready on day one.",
    ctaText: "Need site preparation? We can clear the site and deliver enabling works.",
    relatedServices: ["site-clearance-contractors", "enabling-works-contractors", "groundworks-contractors"],
    relatedPages: [
      { slug: "enabling-works-explained", category: "site-preparation", title: "Enabling works explained" },
      { slug: "groundworks-process", category: "guides", title: "Groundworks Process" },
    ],
  },
  {
    slug: "enabling-works-explained",
    title: "Enabling works explained",
    metaDescription: "What are enabling works? Access, temporary drainage and site set-up before main construction.",
    intro: "Enabling works are the set-up activities that allow main construction to start. They include access roads and hardstanding, temporary drainage, fencing and hoardings, and sometimes temporary services. We deliver enabling works so your main contractor can start on programme.",
    signs: ["Access for plant and deliveries", "Temporary drainage to prevent flooding", "Fencing and hoardings for security", "Temporary services if required", "Site ready for main works"],
    diagnosis: "We plan enabling works with your programme and site layout. We allow for access, drainage and any early services needed.",
    resolution: "We deliver enabling works to an agreed programme and hand over a site that is ready for the main build. We work with main contractors and project managers.",
    ctaText: "Plan enabling works for your project.",
    relatedServices: ["enabling-works-contractors", "groundworks-contractors", "site-clearance-contractors"],
    relatedPages: [
      { slug: "site-preparation-overview", category: "site-preparation", title: "Site preparation overview" },
      { slug: "what-are-enabling-works", category: "guides", title: "What Are Enabling Works?" },
    ],
  },
];
