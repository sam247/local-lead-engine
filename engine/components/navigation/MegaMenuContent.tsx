"use client";

import Link from "next/link";
import { cn } from "../../utils/cn";
import type { NavigationConfig } from "./types";

export interface MegaMenuContentProps {
  config: NavigationConfig;
  className?: string;
  linkClassName?: string;
}

export function MegaMenuContent({ config, className, linkClassName }: MegaMenuContentProps) {
  const viewAllLabel = config.viewAllServicesLabel ?? "View All Services";
  const sectionTitleCn = "mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground";
  const linkCn = cn(
    "block rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    linkClassName
  );

  return (
    <div className={cn("w-[min(100vw-2rem,52rem)] p-4 md:p-5", className)}>
      {config.featuredLinks && config.featuredLinks.length > 0 && (
        <div className="mb-4 border-b border-border pb-4">
          <p className={sectionTitleCn}>Featured</p>
          <ul className="grid gap-1 sm:grid-cols-2">
            {config.featuredLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkCn}>
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
        {config.serviceGroups.map((group) => (
          <div key={group.title}>
            <p className={sectionTitleCn}>{group.title}</p>
            <ul className="space-y-0.5">
              {group.links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkCn}>
                    <span className="block">{item.label}</span>
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
