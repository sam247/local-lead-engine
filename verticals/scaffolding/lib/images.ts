const base = "/images";

const DEFAULT_HERO_SERVICE_SLUG = "scaffolding-contractors";

export const serviceImages: Record<string, string> = {
  "scaffolding-contractors": `${base}/services/scaffolding-contractors.jpg`,
  "domestic-scaffolding": `${base}/services/domestic-scaffolding.jpg`,
  "commercial-scaffolding": `${base}/services/commercial-scaffolding.jpg`,
  "roof-scaffolding": `${base}/services/roof-scaffolding.jpg`,
  "temporary-roofing": `${base}/services/temporary-roofing.jpg`,
  "access-scaffolding": `${base}/services/access-scaffolding.jpg`,
  "scaffolding-hire": `${base}/services/scaffolding-hire.jpg`,
  "emergency-scaffolding": `${base}/services/emergency-scaffolding.jpg`,
  "chimney-scaffolding": `${base}/services/chimney-scaffolding.jpg`,
};

const projectImagePaths = [
  `${base}/projects/project-scaffolding-1.jpg`,
  `${base}/projects/project-scaffolding-2.jpg`,
  `${base}/projects/project-scaffolding-3.jpg`,
  `${base}/projects/project-scaffolding-4.jpg`,
  `${base}/projects/project-scaffolding-5.jpg`,
  `${base}/projects/project-scaffolding-6.jpg`,
];

/** Use project's dedicated image when available, else fallback to index in pool. */
export function getProjectImage(project: { image?: string; imageIndex?: number } | number, index?: number): string {
  const idx = typeof project === "number" ? project : (index ?? project.imageIndex ?? 0);
  if (typeof project === "object" && project.image) return project.image;
  return projectImagePaths[Math.abs(idx) % projectImagePaths.length] ?? projectImagePaths[0];
}

export const blogImages = [
  `${base}/blog/blog-1.jpg`,
  `${base}/blog/blog-2.jpg`,
  `${base}/blog/blog-3.jpg`,
];

export function getBlogImage(post: { image?: string }, index: number): string {
  if (post.image && post.image !== "/placeholder.svg") return post.image;
  return blogImages[Math.abs(index) % blogImages.length] ?? blogImages[0];
}

export const heroBg = `${base}/hero-bg.jpg`;
export const aboutTeam = `${base}/about-team.jpg`;

/**
 * Resolves hero image path by service slug, then by category map, then default.
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
