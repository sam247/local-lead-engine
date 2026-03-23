"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { locations, services } from "@/lib/data";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  ResourcesMenu,
  getDefaultResourcesMenuLabels,
  getResourcesMenuFlatLinks,
  insertResourcesLinksAfterHref,
} from "engine/components/navigation/ResourcesMenu";
import { trackEvent } from "engine/utils";
import { verticalConfig } from "@/config";
import { cn } from "@/lib/utils";

const NAV_SERVICE_SLUGS = ["access-control-systems", "commercial-cctv-installation", "ip-camera-systems"];
const navServices = services.filter((s) => NAV_SERVICE_SLUGS.includes(s.slug));

const resourceLabels = getDefaultResourcesMenuLabels(verticalConfig.siteName);

const ACCESS_INDUSTRIES_RESOURCE_LINKS = [
  { href: "/industries", label: "All Industries" },
  { href: "/industries/hospital-security-systems", label: "Hospital Security" },
  { href: "/industries/data-centre-security", label: "Data Centre Security" },
  { href: "/industries/warehouse-security", label: "Warehouse Security" },
  { href: "/industries/commercial-building-security", label: "Commercial Buildings" },
] as const;

const mobileResourceLinks = insertResourcesLinksAfterHref(
  getResourcesMenuFlatLinks(verticalConfig.siteName),
  "/services",
  [...ACCESS_INDUSTRIES_RESOURCE_LINKS]
);

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const topLocations = locations.slice(0, 8);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo_black.svg"
            alt="Mainline Access"
            width={84}
            height={24}
            className="h-6 w-auto sm:h-6"
            priority
          />
        </Link>

        <nav className="hidden lg:flex lg:items-center lg:gap-1">
          {navServices.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                isActive(`/services/${s.slug}`) ? "text-primary" : "text-muted-foreground"
              )}
            >
              {s.title}
            </Link>
          ))}
          <Link
            href="/about"
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
              isActive("/about") ? "text-primary" : "text-muted-foreground"
            )}
          >
            About
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-primary">
                  Locations
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[320px] gap-1 p-4 md:grid-cols-2">
                    {topLocations.map((loc) => (
                      <li key={loc.id}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/access-control-systems/${loc.id}`}
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent focus:bg-accent"
                          >
                            <div className="text-sm font-medium">{loc.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                    <li className="col-span-2 border-t border-border pt-1">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/access-control-systems-near-me"
                          className="block select-none rounded-md p-3 text-sm font-medium text-primary no-underline outline-none transition-colors hover:bg-accent focus:bg-accent"
                        >
                          View All Areas →
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-primary">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ResourcesMenu labels={resourceLabels} industriesLinks={[...ACCESS_INDUSTRIES_RESOURCE_LINKS]} />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:02012345678"
            className="flex items-center gap-2 text-sm font-medium text-primary"
            onClick={() => trackEvent("call_button_click")}
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
          <Button asChild>
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>

        <button
          className="flex min-h-[44px] min-w-[44px] items-center justify-center lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container py-4">
            {navServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="flex min-h-[44px] items-center text-sm font-medium text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {s.title}
              </Link>
            ))}
            <Link
              href="/about"
              className="flex min-h-[44px] items-center text-sm font-medium text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            <div>
              <button
                className="flex min-h-[44px] w-full items-center justify-between text-sm font-medium text-foreground"
                onClick={() => setLocationsOpen(!locationsOpen)}
              >
                Locations
                <ChevronDown className={cn("h-4 w-4 transition-transform", locationsOpen && "rotate-180")} />
              </button>
              {locationsOpen && (
                <div className="ml-4 border-l border-border pl-4">
                  {topLocations.map((loc) => (
                    <Link
                      key={loc.id}
                      href={`/access-control-systems/${loc.id}`}
                      className="block py-2 text-sm text-muted-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {loc.name}
                    </Link>
                  ))}
                  <Link
                    href="/access-control-systems-near-me"
                    className="block py-2 text-sm font-medium text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    View All Areas →
                  </Link>
                </div>
              )}
            </div>

            <div>
              <button
                className="flex min-h-[44px] w-full items-center justify-between text-sm font-medium text-foreground"
                onClick={() => setResourcesOpen(!resourcesOpen)}
              >
                Resources
                <ChevronDown className={cn("h-4 w-4 transition-transform", resourcesOpen && "rotate-180")} />
              </button>
              {resourcesOpen && (
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
              )}
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
              <a
                href="tel:02012345678"
                className="flex items-center gap-2 text-sm font-medium text-primary"
                onClick={() => trackEvent("call_button_click")}
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
              <Button asChild className="w-full">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Get a Quote
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
