const base = "/images";

const DEFAULT_HERO_SERVICE_SLUG = "access-control-systems";

export const serviceImages: Record<string, string> = {
  "access-control-systems": `${base}/services/access-control-systems.jpg`,
  "commercial-cctv-installation": `${base}/services/commercial-cctv-installation.jpg`,
  "ip-camera-systems": `${base}/services/ip-camera-systems.jpg`,
  "perimeter-security-systems": `${base}/services/perimeter-security-systems.jpg`,
  "security-system-integration": `${base}/services/security-system-integration.jpg`,
};

export const projectImages = [
  `${base}/projects/project-1.jpg`,
  `${base}/projects/project-2.jpg`,
  `${base}/projects/project-3.jpg`,
  `${base}/projects/project-4.jpg`,
  `${base}/projects/project-5.jpg`,
  `${base}/projects/project-6.jpg`,
];

/** Security/access-themed blog images (no drainage). Replace with local assets from data/images.ts prompts when ready. */
export const blogImages = [
  "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80", // security camera / access control
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80", // CCTV / surveillance
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80", // office security / keycard
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
