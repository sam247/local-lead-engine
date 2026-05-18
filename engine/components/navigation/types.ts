/** Optional emphasis for high-intent commercial rows (subtle weight + ordering). */
export type NavLinkCommercialTier = "primary" | "default";

export interface NavServiceLink {
  href: string;
  label: string;
  description?: string;
  commercialTier?: NavLinkCommercialTier;
  /** Small muted tag (e.g. Commercial, Infrastructure) — keep short. */
  microLabel?: string;
}

export interface NavGroup {
  title: string;
  links: NavServiceLink[];
}

/** Informational / planning links shown below commercial columns (optional). */
export interface NavigationPlanningSection {
  title: string;
  links: NavServiceLink[];
}

export interface NavigationConfig {
  serviceGroups: NavGroup[];
  /** Guides, costs and diagnosis content — rendered below commercial service columns when set. */
  planningSection?: NavigationPlanningSection;
  viewAllServicesHref: string;
  /** Default: "View All Services" */
  viewAllServicesLabel?: string;
  featuredLinks?: NavServiceLink[];
}
