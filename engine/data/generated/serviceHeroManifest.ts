export type ServiceHeroManifestEntry = {
  imageUrl: string;
  query: string;
  source: "unsplash";
  unsplashId?: string;
  updatedAt: string;
};

export type ServiceHeroManifest = Record<string, Record<string, ServiceHeroManifestEntry>>;

/**
 * Build-time generated service hero image manifest.
 * Regenerate via: npm run images:service-heroes
 */
export const SERVICE_HERO_MANIFEST: ServiceHeroManifest = {
  "drains": {},
  "surveys": {},
  "access": {},
  "groundworks": {},
  "scaffolding": {}
};
