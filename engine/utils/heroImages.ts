import { SERVICE_HERO_MANIFEST } from "../data/generated/serviceHeroManifest";

const GENERIC_FALLBACK_HERO =
  "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80";

type ResolveServiceHeroImageInput = {
  verticalId: string;
  serviceSlug?: string;
  defaultServiceSlug: string;
  localServiceImages: Record<string, string>;
};

/**
 * Deterministic hero image resolver:
 * 1) build-time Unsplash manifest,
 * 2) vertical local static map,
 * 3) generic global fallback.
 */
export function resolveServiceHeroImage({
  verticalId,
  serviceSlug,
  defaultServiceSlug,
  localServiceImages,
}: ResolveServiceHeroImageInput): string {
  const slug = (serviceSlug ?? "").trim();
  const fromManifest =
    slug.length > 0 ? SERVICE_HERO_MANIFEST[verticalId]?.[slug]?.imageUrl : undefined;
  if (fromManifest) return fromManifest;

  if (slug.length > 0 && localServiceImages[slug]) {
    return localServiceImages[slug];
  }

  const defaultFromManifest = SERVICE_HERO_MANIFEST[verticalId]?.[defaultServiceSlug]?.imageUrl;
  if (defaultFromManifest) return defaultFromManifest;

  return localServiceImages[defaultServiceSlug] ?? GENERIC_FALLBACK_HERO;
}

