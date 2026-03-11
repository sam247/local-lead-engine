const base = "/images";

const DEFAULT_HERO_SERVICE_SLUG = "groundworks-contractors";

export const serviceImages: Record<string, string> = {
  "groundworks-contractors": `${base}/services/groundworks-contractors.jpg`,
  "piling-contractors": `${base}/services/piling-contractors.jpg`,
  "mini-piling-contractors": `${base}/services/mini-piling-contractors.jpg`,
  "excavation-contractors": `${base}/services/excavation-contractors.jpg`,
  "site-clearance-contractors": `${base}/services/site-clearance-contractors.jpg`,
  "foundation-contractors": `${base}/services/foundation-contractors.jpg`,
  "concrete-foundations": `${base}/services/concrete-foundations.jpg`,
  "enabling-works-contractors": `${base}/services/enabling-works-contractors.jpg`,
};

const projectImagePaths = [
  `${base}/projects/project-1.jpg`,
  `${base}/projects/project-2.jpg`,
  `${base}/projects/project-3.jpg`,
  `${base}/projects/project-4.jpg`,
  `${base}/projects/project-5.jpg`,
  `${base}/projects/project-6.jpg`,
];

export function getProjectImage(index: number): string {
  return projectImagePaths[Math.abs(index) % projectImagePaths.length] ?? projectImagePaths[0];
}

export const blogImages = [
  `${base}/blog/blog-1.jpg`,
  `${base}/blog/blog-2.jpg`,
  `${base}/blog/blog-3.jpg`,
];

export const heroBg = `${base}/hero-bg.jpg`;
export const aboutTeam = `${base}/about-team.jpg`;

/**
 * Resolves hero image path by service slug, then by category (via categoryImages), then default.
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
