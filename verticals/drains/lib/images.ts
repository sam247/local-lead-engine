const base = "/images";

const DEFAULT_HERO_SERVICE_SLUG = "drain-collapse-repair";

export const serviceImages: Record<string, string> = {
  "drain-collapse-repair": `${base}/services/drain-collapse-repair.jpg`,
  "drain-relining": `${base}/services/drain-relining.jpg`,
  "cctv-drain-surveys": `${base}/services/cctv-drain-surveys.jpg`,
  "drain-excavation": `${base}/services/drain-excavation.jpg`,
  "emergency-drainage": `${base}/services/emergency-drainage.jpg`,
  "blocked-drains": `${base}/services/blocked-drains.jpg`,
  "drain-jetting": `${base}/services/drain-jetting.jpg`,
  "drain-root-removal": `${base}/services/drain-root-removal.jpg`,
  "drain-unblocking": `${base}/services/drain-unblocking.jpg`,
  "drain-pipe-replacement": `${base}/services/drain-pipe-replacement.jpg`,
  "commercial-drainage": `${base}/services/commercial-drainage.jpg`,
};

export const projectImages = [
  `${base}/projects/project-1.jpg`,
  `${base}/projects/project-2.jpg`,
  `${base}/projects/project-3.jpg`,
  `${base}/projects/project-4.jpg`,
  `${base}/projects/project-5.jpg`,
  `${base}/projects/project-6.jpg`,
];

export const blogImages = [
  `${base}/blog/blog-1.jpg`,
  `${base}/blog/blog-2.jpg`,
  `${base}/blog/blog-3.jpg`,
];

export const heroBg = `${base}/hero-bg.jpg`;
export const aboutTeam = `${base}/about-team.jpg`;

/**
 * Resolves hero image path by service slug, then by category (via categoryImages), then default.
 * Use for location pages (serviceSlug), hub/info pages (category), or fallback.
 */
export function getHeroImage(options: {
  serviceSlug?: string;
  category?: string;
  categoryImagesMap?: Record<string, string>;
}): string {
  const { serviceSlug, category, categoryImagesMap } = options;
  if (serviceSlug && serviceImages[serviceSlug]) {
    return serviceImages[serviceSlug];
  }
  if (category && categoryImagesMap) {
    const slug = categoryImagesMap[category];
    if (slug && serviceImages[slug]) return serviceImages[slug];
  }
  return serviceImages[DEFAULT_HERO_SERVICE_SLUG] ?? `${base}/services/${DEFAULT_HERO_SERVICE_SLUG}.jpg`;
}
