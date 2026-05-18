"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { MegaMenuContent } from "./MegaMenuContent";
import { MobileAccordionMenu } from "./MobileAccordionMenu";
import type { NavigationConfig } from "./types";
import { isPathActiveForNavigationConfig, isPrefixPathActive } from "./navActiveUtils";

export type ResponsiveNavShellMobileResourceLink = { href: string; label: string };

export interface ResponsiveNavShellProps {
  logo: React.ReactNode;
  navigationConfig: NavigationConfig;
  pathname: string | null;
  /** Second desktop dropdown (Resources): pass a full Radix NavigationMenu subtree (list with item + trigger + content). */
  resourcesDesktopMenu: React.ReactNode;
  mobileResourceLinks: ResponsiveNavShellMobileResourceLink[];
  desktopCTAs: React.ReactNode;
  mobileFooterCTAs: React.ReactNode | ((closeMenu: () => void) => React.ReactNode);
  servicesTriggerLabel?: string;
  aboutHref?: string;
  /** Optional Sectors dropdown (Groundworks): full NavigationMenu subtree. */
  sectorsDesktopMenu?: React.ReactNode;
  /** Mobile flat links under a “Sectors” accordion. */
  sectorsMobileLinks?: ResponsiveNavShellMobileResourceLink[];
  /** Prefix for highlighting Sectors trigger (default `/sectors` when sectors links exist). */
  sectorsPathPrefix?: string;
  sectorsTriggerLabel?: string;
}

export function ResponsiveNavShell({
  logo,
  navigationConfig,
  pathname,
  resourcesDesktopMenu,
  mobileResourceLinks,
  desktopCTAs,
  mobileFooterCTAs,
  servicesTriggerLabel = "Services",
  aboutHref = "/about",
  sectorsDesktopMenu,
  sectorsMobileLinks,
  sectorsPathPrefix,
  sectorsTriggerLabel = "Sectors",
}: ResponsiveNavShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [resourcesOpen, setResourcesOpen] = React.useState(false);
  const [sectorsOpen, setSectorsOpen] = React.useState(false);

  const closeMobile = React.useCallback(() => {
    setMobileMenuOpen(false);
    setResourcesOpen(false);
    setSectorsOpen(false);
  }, []);

  const mobileFooter =
    typeof mobileFooterCTAs === "function" ? mobileFooterCTAs(closeMobile) : mobileFooterCTAs;
  const mobilePanelId = React.useId();
  const servicesActive = isPathActiveForNavigationConfig(pathname, navigationConfig);
  const aboutActive = pathname === aboutHref;
  const sectorsPrefix = sectorsPathPrefix ?? "/sectors";
  const sectorsNavActive =
    sectorsMobileLinks?.length || sectorsDesktopMenu
      ? isPrefixPathActive(pathname, sectorsPrefix)
      : false;

  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setResourcesOpen(false);
        setSectorsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between md:h-20">
        {logo}

        <nav className="hidden lg:flex lg:items-center lg:gap-1" aria-label="Main">
          <NavigationMenu delayDuration={180}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "bg-transparent px-3 py-2 text-sm font-medium hover:text-primary",
                    servicesActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {servicesTriggerLabel}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <MegaMenuContent config={navigationConfig} />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {sectorsDesktopMenu}

          <Link
            href={aboutHref}
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
              aboutActive ? "text-primary" : "text-muted-foreground",
            )}
          >
            About
          </Link>

          {resourcesDesktopMenu}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">{desktopCTAs}</div>

        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center lg:hidden"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-expanded={mobileMenuOpen}
          aria-controls={mobilePanelId}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen ? (
        <div
          id={mobilePanelId}
          className="border-t border-border bg-background lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav
            className="container max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-y-contain py-4"
            aria-label="Mobile main"
          >
            <MobileAccordionMenu
              config={navigationConfig}
              onNavigate={() => {
                setMobileMenuOpen(false);
                setResourcesOpen(false);
                setSectorsOpen(false);
              }}
            />

            {sectorsMobileLinks && sectorsMobileLinks.length > 0 ? (
              <div className="mt-1 border-t border-border pt-2">
                <button
                  type="button"
                  className={cn(
                    "flex min-h-[44px] w-full items-center justify-between text-sm font-medium",
                    sectorsNavActive ? "text-primary" : "text-foreground",
                  )}
                  onClick={() => {
                    setSectorsOpen(!sectorsOpen);
                    if (!sectorsOpen) setResourcesOpen(false);
                  }}
                  aria-expanded={sectorsOpen}
                >
                  {sectorsTriggerLabel}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform motion-reduce:transition-none",
                      sectorsOpen && "rotate-180"
                    )}
                    aria-hidden
                  />
                </button>
                {sectorsOpen ? (
                  <div className="ml-4 border-l border-border pl-4">
                    {sectorsMobileLinks.map((item) => (
                      <Link
                        key={`${item.href}-${item.label}`}
                        href={item.href}
                        className="block py-2 text-sm text-muted-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            <Link
              href={aboutHref}
              className="flex min-h-[44px] items-center text-sm font-medium text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            <div className="mt-1 border-t border-border pt-2">
              <button
                type="button"
                className="flex min-h-[44px] w-full items-center justify-between text-sm font-medium text-foreground"
                onClick={() => {
                  setResourcesOpen(!resourcesOpen);
                  if (!resourcesOpen) setSectorsOpen(false);
                }}
                aria-expanded={resourcesOpen}
              >
                Resources
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform motion-reduce:transition-none", resourcesOpen && "rotate-180")}
                  aria-hidden
                />
              </button>
              {resourcesOpen ? (
                <div className="ml-4 border-l border-border pl-4">
                  {mobileResourceLinks.map((item) => (
                    <Link
                      key={`${item.href}-${item.label}`}
                      href={item.href}
                      className="block py-2 text-sm text-muted-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">{mobileFooter}</div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
