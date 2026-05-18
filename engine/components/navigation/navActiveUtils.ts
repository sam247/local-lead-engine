import type { NavigationConfig } from "./types";

function collectHrefs(config: NavigationConfig): string[] {
  const hrefs: string[] = [config.viewAllServicesHref];
  for (const g of config.serviceGroups) {
    for (const l of g.links) hrefs.push(l.href);
  }
  for (const l of config.featuredLinks ?? []) hrefs.push(l.href);
  for (const l of config.planningSection?.links ?? []) hrefs.push(l.href);
  return hrefs;
}

/**
 * True when the current path should highlight the Services mega trigger
 * (service hub, service×location, or a topic/guide URL listed in config).
 */
export function isPathActiveForNavigationConfig(pathname: string | null, config: NavigationConfig): boolean {
  if (!pathname) return false;
  for (const href of collectHrefs(config)) {
    if (pathname === href) return true;
    const parts: string[] = href.split("/").filter(Boolean);
    if (parts.length === 1) {
      const slug: string = parts[0]!;
      if (pathname === `/${slug}` || pathname.startsWith(`/${slug}/`)) return true;
    } else if (pathname.startsWith(`${href}/`) || pathname === href) {
      return true;
    }
  }
  return false;
}

/** Active when pathname is exactly `prefix` or under `prefix/` (prefix must start with `/`). */
export function isPrefixPathActive(pathname: string | null, prefix: string): boolean {
  if (!pathname || !prefix.startsWith("/")) return false;
  const base = prefix.replace(/\/$/, "");
  return pathname === base || pathname.startsWith(`${base}/`);
}
