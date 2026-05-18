"use client";

import * as React from "react";
import Link from "next/link";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";
import type { NavigationConfig, NavServiceLink } from "./types";

function sortLinksCommercialFirst(links: NavServiceLink[]): NavServiceLink[] {
  return [...links].sort((a, b) => {
    const ap = a.commercialTier === "primary" ? 0 : 1;
    const bp = b.commercialTier === "primary" ? 0 : 1;
    return ap - bp;
  });
}

export interface MobileAccordionMenuProps {
  config: NavigationConfig;
  onNavigate?: () => void;
  className?: string;
}

export function MobileAccordionMenu({ config, onNavigate, className }: MobileAccordionMenuProps) {
  const [openKey, setOpenKey] = React.useState<string | null>(config.serviceGroups[0]?.title ?? null);
  const [planningOpen, setPlanningOpen] = React.useState(false);
  const viewAllLabel = config.viewAllServicesLabel ?? "View All Services";
  const hasPlanning = Boolean(config.planningSection?.links.length);

  return (
    <div className={cn("space-y-1", className)}>
      {config.featuredLinks && config.featuredLinks.length > 0 && (
        <div className="pb-2">
          <p className="px-1 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Featured</p>
          <ul>
            {config.featuredLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-[44px] items-center text-sm font-medium text-foreground"
                  onClick={onNavigate}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {config.serviceGroups.map((group, index) => {
        const key = `${group.title}-${index}`;
        const open = openKey === key;
        const links = sortLinksCommercialFirst(group.links);
        return (
          <CollapsiblePrimitive.Root
            key={key}
            open={open}
            onOpenChange={(next) => {
              setOpenKey(next ? key : null);
              if (next) setPlanningOpen(false);
            }}
          >
            <CollapsiblePrimitive.Trigger
              className="flex min-h-[44px] w-full items-center justify-between rounded-md px-1 text-left text-sm font-medium text-foreground hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-expanded={open}
            >
              {group.title}
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform motion-reduce:transition-none",
                  open && "rotate-180"
                )}
                aria-hidden
              />
            </CollapsiblePrimitive.Trigger>
            <CollapsiblePrimitive.Content className="overflow-hidden">
              <ul className="ml-1 border-l border-border py-1 pl-3">
                {links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex min-h-[44px] flex-wrap items-center gap-x-2 text-sm text-muted-foreground hover:text-foreground",
                        item.commercialTier === "primary" && "font-semibold text-foreground/90"
                      )}
                      onClick={onNavigate}
                    >
                      <span>{item.label}</span>
                      {item.microLabel ? (
                        <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{item.microLabel}</span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </CollapsiblePrimitive.Content>
          </CollapsiblePrimitive.Root>
        );
      })}
      <Link
        href={config.viewAllServicesHref}
        className="flex min-h-[44px] items-center text-sm font-semibold text-primary"
        onClick={onNavigate}
      >
        {viewAllLabel} →
      </Link>

      {hasPlanning && config.planningSection ? (
        <div className="border-t border-border pt-2">
          <CollapsiblePrimitive.Root
            open={planningOpen}
            onOpenChange={(next) => {
              setPlanningOpen(next);
              if (next) setOpenKey(null);
            }}
          >
            <CollapsiblePrimitive.Trigger
              className="flex min-h-[44px] w-full items-center justify-between rounded-md px-1 text-left text-sm font-medium text-muted-foreground hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-expanded={planningOpen}
            >
              {config.planningSection.title}
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform motion-reduce:transition-none",
                  planningOpen && "rotate-180"
                )}
                aria-hidden
              />
            </CollapsiblePrimitive.Trigger>
            <CollapsiblePrimitive.Content className="overflow-hidden">
              <ul className="ml-1 border-l border-border py-1 pl-3">
                {config.planningSection.links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex min-h-[44px] items-center text-sm text-muted-foreground hover:text-foreground"
                      onClick={onNavigate}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </CollapsiblePrimitive.Content>
          </CollapsiblePrimitive.Root>
        </div>
      ) : null}
    </div>
  );
}
