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
