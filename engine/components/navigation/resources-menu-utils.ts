export interface ResourcesMenuLabels {
  /** First link under GUIDES (e.g. site-specific "Guides" label). */
  guides: string;
  faq: string;
  costGuide: string;
  allServices: string;
  insurance: string;
  legal: string;
  homeowners: string;
}

const DEFAULT_LABELS: ResourcesMenuLabels = {
  guides: "Guides",
  faq: "FAQ",
  costGuide: "Cost Guide",
  allServices: "All Services",
  insurance: "Insurance",
  legal: "Legal",
  homeowners: "Homeowners",
};

/** Wording-only: first Guides row uses `{siteName} Guides`. */
export function getDefaultResourcesMenuLabels(siteName: string): ResourcesMenuLabels {
  return { ...DEFAULT_LABELS, guides: `${siteName} Guides` };
}

/** Same order as the desktop menu for mobile accordions. */
export function getResourcesMenuFlatLinks(siteName: string): { href: string; label: string }[] {
  const l = getDefaultResourcesMenuLabels(siteName);
  return [
    { href: "/guides", label: l.guides },
    { href: "/faq", label: l.faq },
    { href: "/cost", label: l.costGuide },
    { href: "/services", label: l.allServices },
    { href: "/insurance", label: l.insurance },
    { href: "/legal", label: l.legal },
    { href: "/homeowners", label: l.homeowners },
  ];
}
