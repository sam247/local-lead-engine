/** Primary canonical path for service hub pages (internal links). */
export function getServiceUrl(slug: string): string {
  return `/${slug}`;
}

/** Legacy service hub path; sitemaps and external references may still use this. */
export function getLegacyServiceUrl(slug: string): string {
  return `/services/${slug}`;
}

/** True when the pathname is either the primary or legacy service hub for this slug. */
export function isServiceHubPath(pathname: string | null, slug: string): boolean {
  if (!pathname) return false;
  return pathname === getServiceUrl(slug) || pathname === getLegacyServiceUrl(slug);
}

/** First path segment that matches a known service slug, for CTA performance bias. */
export function inferServiceSlugForCtaBias(
  pathname: string | null | undefined,
  services: readonly { slug: string }[]
): string {
  const slugs = new Set(services.map((s) => s.slug));
  const segs = String(pathname ?? "/")
    .split("/")
    .filter(Boolean);
  if (segs[0] === "services" && segs[1] && slugs.has(segs[1])) return segs[1];
  if (segs[0] && slugs.has(segs[0])) return segs[0];
  return services[0]?.slug ?? "";
}
