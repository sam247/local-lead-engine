import { resolveServiceHeroImage } from "engine";
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

const projectImagePaths = [
  `${base}/projects/project-1.jpg`,
  `${base}/projects/project-2.jpg`,
  `${base}/projects/project-3.jpg`,
  `${base}/projects/project-4.jpg`,
  `${base}/projects/project-5.jpg`,
  `${base}/projects/project-6.jpg`,
];

/** Stable index from project id so the same project always gets the same image and duplicates are minimised. */
function projectIdToPoolIndex(id: string, poolLength: number): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h % poolLength;
}

/**
 * Resolve project image: dedicated project.image when set, else pool by stable id-based index.
 * Uses project id to pick a pool image so the same project always shows the same image and
 * different projects get different images where possible (no duplicate images per project).
 */
export function getProjectImage(project: { id?: string; image?: string; imageIndex?: number } | number, index?: number): string {
  if (typeof project === "number") {
    return projectImagePaths[Math.abs(project) % projectImagePaths.length] ?? projectImagePaths[0];
  }
  if (project.image) return project.image;
  const poolLen = projectImagePaths.length;
  const idx = project.id != null ? projectIdToPoolIndex(project.id, poolLen) : (index ?? project.imageIndex ?? 0);
  return projectImagePaths[Math.abs(idx) % poolLen] ?? projectImagePaths[0];
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
 * Resolves hero image path by service slug, then by category map, with deterministic
 * build-time Unsplash manifest support and stable local fallback.
 */
export function getHeroImage(options: {
  serviceSlug?: string;
  category?: string;
  categoryImagesMap?: Record<string, string>;
}): string {
  const { serviceSlug, category, categoryImagesMap } = options;
  const mappedSlug = category && categoryImagesMap ? categoryImagesMap[category] : undefined;
  const candidateSlug = serviceSlug ?? mappedSlug;
  return resolveServiceHeroImage({
    verticalId: "drains",
    serviceSlug: candidateSlug,
    defaultServiceSlug: DEFAULT_HERO_SERVICE_SLUG,
    localServiceImages: serviceImages,
  });
}
