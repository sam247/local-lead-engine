"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { locations } from "@/lib/data";
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
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo_black.svg"
            alt="Mainline Surveys"
            width={84}
            height={24}
            className="h-5 w-auto sm:h-6"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:gap-1">
          <Link
            href="/services/topographical-survey"
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
              isActive("/services/topographical-survey") ? "text-primary" : "text-muted-foreground"
            )}
          >
            Topographical
          </Link>
          <Link
            href="/services/drone-survey"
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
              isActive("/services/drone-survey") ? "text-primary" : "text-muted-foreground"
            )}
          >
            Drone Survey
          </Link>
          <Link
            href="/services/measured-building-survey"
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
              isActive("/services/measured-building-survey") ? "text-primary" : "text-muted-foreground"
            )}
          >
            Measured Building
          </Link>

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
                            href={`/topographical-survey/${loc.id}`}
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
                          href="/drain-collapse-near-me"
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

          {/* Resources Dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-primary">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4">
                    <div className="mb-3">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Guides</p>
                      <ul className="space-y-1">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/drainage-guides" className="block rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent">Survey Guides</Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/drainage-faq" className="block rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent">Survey FAQ</Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/drain-costs" className="block rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent">Survey Costs</Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </div>
                    <div className="mb-3 border-t border-border pt-3">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Services</p>
                      <ul className="space-y-1">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/services" className="block rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent">All Services</Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </div>
                    <div className="border-t border-border pt-3">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Information</p>
                      <ul className="grid grid-cols-2 gap-1">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/drain-costs" className="block rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent">Costs</Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/drain-insurance" className="block rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent">Insurance</Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/drain-responsibility" className="block rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent">Legal</Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/homebuyer-drainage" className="block rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent">Homebuyers</Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </div>
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
          className="lg:hidden"
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
            
            <Link href="/services/topographical-survey" className="block py-3 text-sm font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>Topographical Survey</Link>
            <Link href="/services/drone-survey" className="block py-3 text-sm font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>Drone Survey</Link>
            <Link href="/services/measured-building-survey" className="block py-3 text-sm font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>Measured Building Survey</Link>

            {/* Mobile Locations Accordion */}
            <div>
              <button
                className="flex w-full items-center justify-between py-3 text-sm font-medium text-foreground"
                onClick={() => setLocationsOpen(!locationsOpen)}
              >
                Locations
                <ChevronDown className={cn("h-4 w-4 transition-transform", locationsOpen && "rotate-180")} />
              </button>
              {locationsOpen && (
                <div className="ml-4 border-l border-border pl-4">
                  {topLocations.map((loc) => (
                    <Link key={loc.id} href={`/topographical-survey/${loc.id}`} className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
                      {loc.name}
                    </Link>
                  ))}
                  <Link href="/drain-collapse-near-me" className="block py-2 text-sm font-medium text-primary" onClick={() => setMobileMenuOpen(false)}>
                    View All Areas →
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Resources Accordion */}
            <div>
              <button
                className="flex w-full items-center justify-between py-3 text-sm font-medium text-foreground"
                onClick={() => setResourcesOpen(!resourcesOpen)}
              >
                Resources
                <ChevronDown className={cn("h-4 w-4 transition-transform", resourcesOpen && "rotate-180")} />
              </button>
              {resourcesOpen && (
                <div className="ml-4 border-l border-border pl-4">
                  <Link href="/drainage-guides" className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Survey Guides</Link>
                  <Link href="/drainage-faq" className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Survey FAQ</Link>
                  <Link href="/drain-survey-cost" className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Survey Costs</Link>
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
