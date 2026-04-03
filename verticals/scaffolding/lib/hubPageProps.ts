import {
  getCategoryPages,
  getHubData,
  hubPages,
  services,
  locations,
  categoryImages,
  categoryAltText,
} from "@/lib/data";
import { getHeroImage } from "@/lib/images";
import { verticalConfig } from "@/config";
import type { CrossSection } from "engine";

function categorisePages(category: string): CrossSection[] {
  return hubPages
    .filter((h) => h.category !== category)
    .map((hub) => ({
      label: hub.title,
      pages: getCategoryPages(hub.category)
        .slice(0, 3)
        .map((p) => ({
          slug: p.slug,
          title: p.title,
          intro: p.intro,
          basePath: hub.basePath,
        })),
    }))
    .filter((s) => s.pages.length > 0);
}

export function getHubPageProps(category: string) {
  const hub = getHubData(category);
  const pages = getCategoryPages(category);
  if (!hub || pages.length === 0) return null;

  const keyServices = services.slice(0, 3);
  const heroImage = getHeroImage({
    category,
    categoryImagesMap: categoryImages,
  });
  const heroAlt =
    categoryAltText[category] || `${hub.title} — scaffolding services`;
  const crossSections = categorisePages(category);

  return {
    hub,
    pages,
    heroImage,
    heroAlt,
    crossSections,
    keyServices,
    featuredLocations: locations,
    companyInfo: verticalConfig.companyInfo,
    baseUrl: verticalConfig.baseUrl,
    callTrackVertical: verticalConfig.verticalId,
  };
}
