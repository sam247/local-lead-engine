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

/** Survey/drone/land-themed project images (no drainage). Index 0–5 for project cards. */
const PROJECT_IMAGE_URLS = [
  "https://images.unsplash.com/photo-1474487548417-809cb4be70cd?w=800&q=80", // drone / aerial
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80", // land survey
  "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&q=80", // topographic / map
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80", // construction survey
  "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80", // drone
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80", // site survey
];

export function getProjectImage(index: number): string {
  return PROJECT_IMAGE_URLS[Math.abs(index) % PROJECT_IMAGE_URLS.length] ?? PROJECT_IMAGE_URLS[0];
}

/** Survey/land/drone-themed blog images (no drainage). Replace with local assets when ready. */
export const blogImages = [
  "https://images.unsplash.com/photo-1474487548417-809cb4be70cd?w=800&q=80", // drone / aerial
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80", // land survey / planning
  "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&q=80", // topographic / map
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
