/**
 * Canonical URLs for Mainline Group operating divisions (cross-vertical entity layer).
 * Exception to the usual “no vertical URLs in engine” rule — see AGENTS.md (engine/data).
 */
export const MAINLINE_GROUP_DIVISIONS = [
  { name: "Mainline Drains", baseUrl: "https://mainlinedrains.co.uk" },
  { name: "Mainline Surveys", baseUrl: "https://mainlinesurveys.co.uk" },
  { name: "Mainline Access", baseUrl: "https://mainlineaccess.co.uk" },
  { name: "Mainline Groundworks", baseUrl: "https://mainlinegroundworks.co.uk" },
  { name: "Mainline Scaffold", baseUrl: "https://mainlinescaffold.co.uk" },
] as const;

export type MainlineGroupLinkItem = {
  name: string;
  href: string;
  isCurrent: boolean;
};

function normalizeSiteBaseUrl(url: string): string {
  return url.replace(/\/$/, "").toLowerCase();
}

/** Build division links for footer/about; marks the site matching `siteBaseUrl` as current. */
export function mainlineGroupLinksForSite(siteBaseUrl: string): MainlineGroupLinkItem[] {
  const norm = normalizeSiteBaseUrl(siteBaseUrl);
  return MAINLINE_GROUP_DIVISIONS.map((d) => ({
    name: d.name,
    href: d.baseUrl,
    isCurrent: normalizeSiteBaseUrl(d.baseUrl) === norm,
  }));
}
