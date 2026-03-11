"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { locations, services } from "@/lib/data";

const NAV_SERVICE_SLUGS = ["access-control-systems", "commercial-cctv-installation", "ip-camera-systems"];
const navServices = services.filter((s) => NAV_SERVICE_SLUGS.includes(s.slug));
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { trackEvent } from "engine";
import { cn } from "@/lib/utils";

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
        {/* Logo – mobile ~20% larger (h-6) than before (h-5), same across verticals */}
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

        {/* Desktop Navigation */}
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

          {/* Locations Dropdown */}
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
                          href="/service-areas"
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

          {/* Industries & Resources */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-primary">
                  Industries
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[320px] p-4">
                    <ul className="space-y-1">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/industries" className="block rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent">All Industries</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/industries/hospital-security-systems" className="block rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent">Hospital Security</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/industries/data-centre-security" className="block rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent">Data Centre Security</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/industries/warehouse-security" className="block rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent">Warehouse Security</Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/industries/commercial-building-security" className="block rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent">Commercial Buildings</Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

        </nav>

        {/* CTA Button */}
        <div className="hidden items-center gap-4 lg:flex">
          <a href="tel:02012345678" className="flex items-center gap-2 text-sm font-medium text-primary" onClick={() => trackEvent("call_button_click")}>
            <Phone className="h-4 w-4" />
            Call Now
          </a>
          <Button asChild>
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex min-h-[44px] min-w-[44px] items-center justify-center lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container py-4">
            
            {navServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="flex min-h-[44px] items-center text-sm font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>{s.title}</Link>
            ))}
            <Link href="/industries" className="flex min-h-[44px] items-center text-sm font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>Industries</Link>

            {/* Mobile Locations Accordion */}
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
                    <Link key={loc.id} href={`/access-control-systems/${loc.id}`} className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
                      {loc.name}
                    </Link>
                  ))}
                  <Link href="/service-areas" className="block py-2 text-sm font-medium text-primary" onClick={() => setMobileMenuOpen(false)}>
                    View All Areas →
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Industries Accordion */}
            <div>
              <button
                className="flex min-h-[44px] w-full items-center justify-between text-sm font-medium text-foreground"
                onClick={() => setResourcesOpen(!resourcesOpen)}
              >
                Industries
                <ChevronDown className={cn("h-4 w-4 transition-transform", resourcesOpen && "rotate-180")} />
              </button>
              {resourcesOpen && (
                <div className="ml-4 border-l border-border pl-4">
                  <Link href="/industries" className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>All Industries</Link>
                  <Link href="/industries/hospital-security-systems" className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Hospital Security</Link>
                  <Link href="/industries/data-centre-security" className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Data Centre Security</Link>
                  <Link href="/access-problems/access-control-system-cost" className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Guides &amp; Costs</Link>
                  <Link href="/services" className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>All Services</Link>
                </div>
              )}
            </div>

            

            <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
              <a href="tel:02012345678" className="flex items-center gap-2 text-sm font-medium text-primary" onClick={() => trackEvent("call_button_click")}>
                <Phone className="h-4 w-4" />
                Call Now
              </a>
              <Button asChild className="w-full">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Get a Quote</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
