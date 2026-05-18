"use client";

import Link from "next/link";
import { useMemo } from "react";
import { cn } from "../../utils/cn";
import type { NavGroup, NavServiceLink, NavigationConfig } from "./types";

function sortLinksCommercialFirst(links: NavServiceLink[]): NavServiceLink[] {
  return [...links].sort((a, b) => {
    const ap = a.commercialTier === "primary" ? 0 : 1;
    const bp = b.commercialTier === "primary" ? 0 : 1;
    return ap - bp;
  });
}

export interface MegaMenuContentProps {
  config: NavigationConfig;
  className?: string;
  linkClassName?: string;
}

export function MegaMenuContent({ config, className, linkClassName }: MegaMenuContentProps) {
  const viewAllLabel = config.viewAllServicesLabel ?? "View All Services";
  const sectionTitleCn = "mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground";
  const planningTitleCn = "mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/90";

  const sortedGroups = useMemo(
    () =>
      config.serviceGroups.map(
        (g): NavGroup => ({
          ...g,
          links: sortLinksCommercialFirst(g.links),
        })
      ),
    [config.serviceGroups]
  );

  const linkBase = cn(
    "block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    linkClassName
  );

  return (
    <div className={cn("w-[min(100vw-2rem,56rem)] p-4 md:p-5", className)}>
      {config.featuredLinks && config.featuredLinks.length > 0 && (
        <div className="mb-4 border-b border-border pb-4">
          <p className={sectionTitleCn}>Featured</p>
          <ul className="grid gap-1 sm:grid-cols-2">
            {config.featuredLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={cn(linkBase, "font-medium")}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(11rem, 1fr))",
        }}
      >
        {sortedGroups.map((group) => (
          <div key={group.title}>
            <p className={sectionTitleCn}>{group.title}</p>
            <ul className="space-y-0.5">
              {group.links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      linkBase,
                      item.commercialTier === "primary" ? "font-semibold text-foreground" : "font-medium text-foreground/95"
                    )}
                  >
                    <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span>{item.label}</span>
                      {item.microLabel ? (
                        <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                          {item.microLabel}
                        </span>
                      ) : null}
                    </span>
                    {item.description ? (
                      <span className="mt-0.5 block text-xs font-normal text-muted-foreground">{item.description}</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {config.planningSection && config.planningSection.links.length > 0 ? (
        <div className="mt-5 border-t border-border bg-muted/20 pt-4">
          <p className={planningTitleCn}>{config.planningSection.title}</p>
          <ul className="columns-1 gap-x-8 sm:columns-2">
            {config.planningSection.links.map((item) => (
              <li key={item.href} className="mb-1 break-inside-avoid">
                <Link href={item.href} className={cn(linkBase, "py-1 text-sm font-normal text-muted-foreground hover:text-foreground")}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-4 border-t border-border pt-4">
        <Link
          href={config.viewAllServicesHref}
          className={cn("inline-flex text-sm font-semibold text-primary hover:underline", linkClassName)}
        >
          {viewAllLabel} →
        </Link>
      </div>
    </div>
  );
}
