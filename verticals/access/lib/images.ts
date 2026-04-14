const base = "/images";

const DEFAULT_HERO_SERVICE_SLUG = "access-control-systems";

export const serviceImages: Record<string, string> = {
  "access-control-systems": `${base}/services/access-control-systems.jpg`,
  "commercial-cctv-installation": `${base}/services/commercial-cctv-installation.jpg`,
  "ip-camera-systems": `${base}/services/ip-camera-systems.jpg`,
  "perimeter-security-systems": `${base}/services/perimeter-security-systems.jpg`,
  "security-system-integration": `${base}/services/security-system-integration.jpg`,
};

const projectImagePaths = [
  `${base}/projects/project-access-1.jpg`,
  `${base}/projects/project-access-2.jpg`,
  `${base}/projects/project-access-3.jpg`,
  `${base}/projects/project-access-4.jpg`,
  `${base}/projects/project-access-5.jpg`,
  `${base}/projects/project-access-6.jpg`,
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

/** Use post's dedicated image if set (and not placeholder), else fallback to index in blogImages. */
export function getBlogImage(
  post: { image?: string },
  index: number
): string {
  if (post.image && post.image !== "/placeholder.svg") return post.image;
  return blogImages[Math.abs(index) % blogImages.length] ?? blogImages[0];
}

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
