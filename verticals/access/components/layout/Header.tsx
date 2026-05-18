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
import {
  ResourcesMenu,
  getDefaultResourcesMenuLabels,
  getResourcesMenuFlatLinks,
  insertResourcesLinksAfterHref,
} from "engine/components/navigation/ResourcesMenu";
import { ResponsiveNavShell, TrackablePhoneLink, QuoteFormPrimaryCta, getCtaVariant, inferServiceSlugForCtaBias } from "engine";
import { navigationConfig } from "@/lib/navigationGroups";
import { services } from "@/lib/data";
import { verticalConfig } from "@/config";

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
  [...ACCESS_INDUSTRIES_RESOURCE_LINKS],
);
const HEADER_LOGO_WIDTH = 210;

const Header = () => {
  const pathname = usePathname();
  const headerQuoteSeed = `${verticalConfig.verticalId}-header-${pathname && pathname.length > 0 ? pathname : "/"}`;
  const headerQuoteLabel = getCtaVariant(headerQuoteSeed, verticalConfig.ctaVariants, {
    serviceSlug: inferServiceSlugForCtaBias(pathname, services),
  });

  const desktopCTAs = (
    <>
      <TrackablePhoneLink
        phone={verticalConfig.companyInfo.phone}
        vertical={verticalConfig.verticalId}
        serviceSlug={null}
        locationSlug={null}
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
            alt="Mainline Access"
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
      resourcesDesktopMenu={
        <NavigationMenu delayDuration={180}>
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
      }
    />
  );
};

export default Header;
