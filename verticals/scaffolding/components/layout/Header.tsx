"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ResourcesMenu, getDefaultResourcesMenuLabels, getResourcesMenuFlatLinks } from "engine/components/navigation/ResourcesMenu";
import {
  getServiceUrl,
  isServiceHubPath,
  TrackablePhoneLink,
  QuoteFormPrimaryCta,
  getCtaVariant,
  inferServiceSlugForCtaBias,
} from "engine";
import { verticalConfig } from "@/config";
import { cn } from "@/lib/utils";

const resourceLabels = getDefaultResourcesMenuLabels(verticalConfig.siteName);
const mobileResourceLinks = getResourcesMenuFlatLinks(verticalConfig.siteName);
const HEADER_LOGO_WIDTH = 210;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const pathname = usePathname();

  const headerQuoteSeed = `${verticalConfig.verticalId}-header-${pathname && pathname.length > 0 ? pathname : "/"}`;
  const headerQuoteLabel = getCtaVariant(headerQuoteSeed, verticalConfig.ctaVariants, {
    serviceSlug: inferServiceSlugForCtaBias(pathname, services),
  });

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo_black.svg"
            alt="Mainline Scaffold"
            width={HEADER_LOGO_WIDTH}
            height={24}
            className="h-6 w-[210px] object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:gap-1">
          <Link
            href={getServiceUrl("scaffolding-contractors")}
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
              isServiceHubPath(pathname, "scaffolding-contractors") ? "text-primary" : "text-muted-foreground"
            )}
          >
            Scaffolding
          </Link>
          <Link
            href={getServiceUrl("domestic-scaffolding")}
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
              isServiceHubPath(pathname, "domestic-scaffolding") ? "text-primary" : "text-muted-foreground"
            )}
          >
            Domestic
          </Link>
          <Link
            href={getServiceUrl("commercial-scaffolding")}
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
              isServiceHubPath(pathname, "commercial-scaffolding") ? "text-primary" : "text-muted-foreground"
            )}
          >
            Commercial
          </Link>
          <Link
            href="/about"
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
              isActive("/about") ? "text-primary" : "text-muted-foreground"
            )}
          >
            About
          </Link>

          {/* Resources Dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-primary">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ResourcesMenu labels={resourceLabels} />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* CTA Button */}
        <div className="hidden items-center gap-4 lg:flex">
          <TrackablePhoneLink
            phone={verticalConfig.companyInfo.phone}
            vertical={verticalConfig.verticalId}
            serviceSlug={null}
            locationSlug={null}
            context={{
              page: pathname ?? "",
              voiceWebhookPath: "/api/twilio/voice",
              vertical: verticalConfig.verticalId,
            }}
            className="flex items-center gap-2 text-sm font-medium text-primary"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </TrackablePhoneLink>
          <QuoteFormPrimaryCta
            contactPath="/contact"
            variant="default"
            size="default"
            ctaText={headerQuoteLabel}
            ctaSeed={headerQuoteSeed}
          >
            {headerQuoteLabel}
          </QuoteFormPrimaryCta>
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
            <Link href={getServiceUrl("scaffolding-contractors")} className="flex min-h-[44px] items-center text-sm font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>Scaffolding</Link>
            <Link href={getServiceUrl("domestic-scaffolding")} className="flex min-h-[44px] items-center text-sm font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>Domestic</Link>
            <Link href={getServiceUrl("commercial-scaffolding")} className="flex min-h-[44px] items-center text-sm font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>Commercial</Link>
            <Link href="/about" className="flex min-h-[44px] items-center text-sm font-medium text-foreground" onClick={() => setMobileMenuOpen(false)}>About</Link>

            {/* Mobile Resources Accordion */}
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
                      key={item.href}
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
              <TrackablePhoneLink
                phone={verticalConfig.companyInfo.phone}
                vertical={verticalConfig.verticalId}
                serviceSlug={null}
                locationSlug={null}
                context={{
                  page: pathname ?? "",
                  voiceWebhookPath: "/api/twilio/voice",
                  vertical: verticalConfig.verticalId,
                }}
                className="flex items-center gap-2 text-sm font-medium text-primary"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </TrackablePhoneLink>
              <QuoteFormPrimaryCta
                contactPath="/contact"
                variant="default"
                size="default"
                className="w-full"
                ctaText={headerQuoteLabel}
                ctaSeed={headerQuoteSeed}
                onAfterNavigate={() => setMobileMenuOpen(false)}
              >
                {headerQuoteLabel}
              </QuoteFormPrimaryCta>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
