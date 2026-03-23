"use client";

import Link from "next/link";
import { cn } from "../../utils/cn";
import type { ResourcesMenuLabels } from "./resources-menu-utils";

export type { ResourcesMenuLabels } from "./resources-menu-utils";
export { getDefaultResourcesMenuLabels, getResourcesMenuFlatLinks } from "./resources-menu-utils";

const DEFAULT_LABELS: ResourcesMenuLabels = {
  guides: "Guides",
  faq: "FAQ",
  costGuide: "Cost Guide",
  allServices: "All Services",
  insurance: "Insurance",
  legal: "Legal",
  homeowners: "Homeowners",
};

export interface ResourcesMenuProps {
  labels?: Partial<ResourcesMenuLabels>;
  className?: string;
  /** Use with vertical NavigationMenuLink asChild */
  linkClassName?: string;
}

const LINK_HREFS = {
  guides: "/guides",
  faq: "/faq",
  cost: "/cost",
  services: "/services",
  insurance: "/insurance",
  legal: "/legal",
  homeowners: "/homeowners",
} as const;

/**
 * Fixed Resources dropdown body: GUIDES (3) + SERVICES (1) + INFORMATION (3).
 * Same structure for every vertical; only labels vary.
 */
export function ResourcesMenu({ labels: labelsPartial, className, linkClassName }: ResourcesMenuProps) {
  const labels = { ...DEFAULT_LABELS, ...labelsPartial };
  const linkCn = cn(
    "block rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent focus:bg-accent",
    linkClassName
  );
  const sectionTitleCn = "mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground";

  return (
    <div className={cn("w-[400px] p-4", className)}>
      <div className="mb-3">
        <p className={sectionTitleCn}>Guides</p>
        <ul className="space-y-1">
          <li>
            <Link href={LINK_HREFS.guides} className={linkCn}>
              {labels.guides}
            </Link>
          </li>
          <li>
            <Link href={LINK_HREFS.faq} className={linkCn}>
              {labels.faq}
            </Link>
          </li>
          <li>
            <Link href={LINK_HREFS.cost} className={linkCn}>
              {labels.costGuide}
            </Link>
          </li>
        </ul>
      </div>
      <div className="mb-3 border-t border-border pt-3">
        <p className={sectionTitleCn}>Services</p>
        <ul className="space-y-1">
          <li>
            <Link href={LINK_HREFS.services} className={linkCn}>
              {labels.allServices}
            </Link>
          </li>
        </ul>
      </div>
      <div className="border-t border-border pt-3">
        <p className={sectionTitleCn}>Information</p>
        <ul className="grid grid-cols-2 gap-1">
          <li>
            <Link href={LINK_HREFS.insurance} className={linkCn}>
              {labels.insurance}
            </Link>
          </li>
          <li>
            <Link href={LINK_HREFS.legal} className={linkCn}>
              {labels.legal}
            </Link>
          </li>
          <li className="col-span-2">
            <Link href={LINK_HREFS.homeowners} className={linkCn}>
              {labels.homeowners}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
