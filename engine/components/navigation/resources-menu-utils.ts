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

export type ResourcesMenuFlatLink = { href: string; label: string };

/** Same order as the desktop menu for mobile accordions. */
export function getResourcesMenuFlatLinks(siteName: string): ResourcesMenuFlatLink[] {
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

/** Insert extra links immediately after the first entry with `afterHref` (e.g. industries after All Services). */
export function insertResourcesLinksAfterHref(
  links: ResourcesMenuFlatLink[],
  afterHref: string,
  insert: ResourcesMenuFlatLink[]
): ResourcesMenuFlatLink[] {
  if (insert.length === 0) return links;
  const idx = links.findIndex((l) => l.href === afterHref);
  if (idx === -1) return [...links, ...insert];
  return [...links.slice(0, idx + 1), ...insert, ...links.slice(idx + 1)];
}
