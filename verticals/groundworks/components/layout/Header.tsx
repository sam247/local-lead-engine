"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ResourcesMenu, getDefaultResourcesMenuLabels, getResourcesMenuFlatLinks } from "engine/components/navigation/ResourcesMenu";
import {
  ResponsiveNavShell,
  TrackablePhoneLink,
  QuoteFormPrimaryCta,
  getCtaVariant,
  inferServiceSlugForCtaBias,
  isPrefixPathActive,
} from "engine";
import { cn } from "@/lib/utils";
import { groundworksSectors } from "@/data/sectors";
import { navigationConfig } from "@/lib/navigationGroups";
import { services } from "@/lib/data";
import { verticalConfig } from "@/config";

const resourceLabels = getDefaultResourcesMenuLabels(verticalConfig.siteName);
const mobileResourceLinks = getResourcesMenuFlatLinks(verticalConfig.siteName);
const sectorsMobileLinks = [
  { href: "/sectors", label: "All sectors" },
  ...groundworksSectors.map((s) => ({ href: `/sectors/${s.slug}`, label: s.shortTitle })),
];
const HEADER_LOGO_WIDTH = 210;

const Header = () => {
  const pathname = usePathname();
  const headerQuoteSeed = `${verticalConfig.verticalId}-header-${pathname && pathname.length > 0 ? pathname : "/"}`;
  const headerQuoteLabel = getCtaVariant(headerQuoteSeed, verticalConfig.ctaVariants, {
    serviceSlug: inferServiceSlugForCtaBias(pathname, services),
  });

  const phoneContext = {
    page: pathname ?? "",
    voiceWebhookPath: "/api/twilio/voice",
    vertical: verticalConfig.verticalId,
  };

  const sectorsNavActive = isPrefixPathActive(pathname, "/sectors");

  const desktopCTAs = (
    <>
      <TrackablePhoneLink
        phone={verticalConfig.companyInfo.phone}
        vertical={verticalConfig.verticalId}
        serviceSlug={null}
        locationSlug={null}
        context={phoneContext}
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
    </>
  );

  return (
    <ResponsiveNavShell
      logo={
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo_black.svg"
            alt="Mainline Groundworks"
            width={HEADER_LOGO_WIDTH}
            height={24}
            className="h-6 w-[210px] object-contain object-left"
            priority
          />
        </Link>
      }
      navigationConfig={navigationConfig}
      pathname={pathname}
      mobileResourceLinks={mobileResourceLinks}
      desktopCTAs={desktopCTAs}
      mobileFooterCTAs={(closeMenu) => (
        <>
          <TrackablePhoneLink
            phone={verticalConfig.companyInfo.phone}
            vertical={verticalConfig.verticalId}
            serviceSlug={null}
            locationSlug={null}
            context={phoneContext}
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
            onAfterNavigate={closeMenu}
          >
            {headerQuoteLabel}
          </QuoteFormPrimaryCta>
        </>
      )}
      sectorsDesktopMenu={
        <NavigationMenu delayDuration={180}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "bg-transparent text-muted-foreground hover:text-primary",
                  sectorsNavActive && "text-primary",
                )}
              >
                Sectors
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[min(100vw-2rem,420px)] p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Markets & delivery
                  </p>
                  <ul className="grid max-h-[min(70vh,28rem)] gap-0.5 overflow-y-auto overscroll-y-contain pr-1">
                    {groundworksSectors.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/sectors/${s.slug}`}
                          className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/sectors"
                    className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
                  >
                    View all sectors →
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      }
      sectorsMobileLinks={sectorsMobileLinks}
      resourcesDesktopMenu={
        <NavigationMenu delayDuration={180}>
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
      }
    />
  );
};

export default Header;
