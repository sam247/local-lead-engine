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
import { getServiceUrl, type RelatedPageLink } from "engine";

export function getInfoPageProps(category: string, slug: string) {
  const hub = getHubData(category);
  const pages = getCategoryPages(category);
  const page = pages.find((p) => p.slug === slug);
  if (!hub || !page) return null;

  const otherPages = pages.filter((p) => p.slug !== page.slug).slice(0, 4);
  const heroImage = getHeroImage({
    category,
    categoryImagesMap: categoryImages,
  });
  const heroAlt =
    categoryAltText[category] || `${page.title} - groundworks guide`;
  const pageFaqs = [
    {
      question: `What are the signs of ${page.title.toLowerCase()}?`,
      answer: page.signs.length > 0 ? page.signs.slice(0, 3).join(". ") + "." : page.intro.slice(0, 150) + "...",
    },
    {
      question: `How do you diagnose ${page.title.toLowerCase()}?`,
      answer: page.diagnosis.slice(0, 200) + "...",
    },
    {
      question: `How do you fix ${page.title.toLowerCase()}?`,
      answer: page.resolution.slice(0, 200) + "...",
    },
  ];

  const relatedPageLinks: RelatedPageLink[] = (page.relatedPages ?? []).map(
    (rp) => {
      const categoryHub = hubPages.find((h) => h.category === rp.category);
      const href =
        rp.category === "service"
          ? getServiceUrl(rp.slug)
          : categoryHub
            ? `${categoryHub.basePath}/${rp.slug}`
            : getServiceUrl(rp.slug);
      return { title: rp.title, href };
    }
  );

  return {
    hub,
    page,
    otherPages,
    heroImage,
    heroAlt,
    pageFaqs,
    companyInfo: verticalConfig.companyInfo,
    baseUrl: verticalConfig.baseUrl,
    relatedPageLinks,
    services,
    locations,
    hubPages,
    getCategoryPages,
    relatedGuidesTitle: "Related Groundworks Guides",
    callTrackVertical: verticalConfig.verticalId,
  };
}
