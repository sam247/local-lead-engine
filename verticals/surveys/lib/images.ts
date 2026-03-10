const base = "/images";

const DEFAULT_HERO_SERVICE_SLUG = "topographical-survey";

export const serviceImages: Record<string, string> = {
  "topographical-survey": `${base}/services/topographical-survey.jpg`,
  "measured-building-survey": `${base}/services/measured-building-survey.jpg`,
  "utility-survey": `${base}/services/utility-survey.jpg`,
  "utility-mapping-survey": `${base}/services/utility-survey.jpg`,
  "boundary-survey": `${base}/services/boundary-survey.jpg`,
  "laser-scanning-survey": `${base}/services/laser-scanning-survey.jpg`,
  "drone-survey": `${base}/services/drone-survey.jpg`,
  "drone-roof-inspection": `${base}/services/drone-survey.jpg`,
  "drone-building-inspection": `${base}/services/drone-survey.jpg`,
  "drone-topographical-survey": `${base}/services/drone-survey.jpg`,
  "drone-construction-survey": `${base}/services/drone-survey.jpg`,
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
