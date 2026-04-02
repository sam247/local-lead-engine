import {
  getCategoryPages,
  getHubData,
  hubPages,
  services,
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
  const pillarGuides =
    category === "cctv-guides"
      ? [{ title: "CCTV installation services", href: "/cctv-installation" }]
      : undefined;

  return {
    hub,
    pages,
    heroImage,
    heroAlt,
    crossSections: [],
    keyServices,
    companyInfo: verticalConfig.companyInfo,
    baseUrl: verticalConfig.baseUrl,
    pillarGuides,
    callTrackVertical: verticalConfig.verticalId,
  };
}
