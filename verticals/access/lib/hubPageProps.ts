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

export function getHubPageProps(category: string) {
  const hub = getHubData(category);
  const pages = getCategoryPages(category);
  if (!hub || pages.length === 0) return null;

  const heroImage = getHeroImage({
    category,
    categoryImagesMap: categoryImages,
  });
  const heroAlt =
    categoryAltText[category] || `${hub.title} - ${verticalConfig.siteName}`;
  const keyServices = services.slice(0, 3);

  return {
    hub,
    pages,
    heroImage,
    heroAlt,
    crossSections: [],
    keyServices,
    featuredLocations: locations,
    companyInfo: verticalConfig.companyInfo,
    baseUrl: verticalConfig.baseUrl,
    callTrackVertical: verticalConfig.verticalId,
    ctaVariants: verticalConfig.ctaVariants,
    ctaBannerSeed: `${hub.category}-${hub.basePath}`,
  };
}
