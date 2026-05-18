export interface NavServiceLink {
  href: string;
  label: string;
  description?: string;
}

export interface NavGroup {
  title: string;
  links: NavServiceLink[];
}

export interface NavigationConfig {
  serviceGroups: NavGroup[];
  viewAllServicesHref: string;
  /** Default: "View All Services" */
  viewAllServicesLabel?: string;
  featuredLinks?: NavServiceLink[];
}
