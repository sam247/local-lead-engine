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
import { buildFeaturedServiceLocationLinks, getServiceUrl, type RelatedPageLink } from "engine";

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
  const heroAlt = categoryAltText[category] || `${page.title} - scaffolding guide`;

  const pageFaqs = [
    {
      question: `What are the key points about ${page.title.toLowerCase()}?`,
      answer: page.signs.length > 0 ? page.signs.slice(0, 3).join(". ") + "." : page.intro.slice(0, 150) + "...",
    },
    {
      question: `How do scaffolding contractors approach ${page.title.toLowerCase()}?`,
      answer: page.diagnosis.slice(0, 200) + "...",
    },
    {
      question: `What is the recommended approach for ${page.title.toLowerCase()}?`,
      answer: page.resolution.slice(0, 200) + "...",
    },
  ];

  const relatedPageLinks: RelatedPageLink[] = (page.relatedPages ?? []).map((rp) => {
    const categoryHub = hubPages.find((h) => h.category === rp.category);
    const href =
      rp.category === "service"
        ? getServiceUrl(rp.slug)
        : categoryHub
          ? `${categoryHub.basePath}/${rp.slug}`
          : getServiceUrl(rp.slug);
    return { title: rp.title, href };
  });

  const primaryRelatedService = page.relatedServices[0]
    ? services.find((service) => service.slug === page.relatedServices[0])
    : undefined;
  const secondaryRelatedService = page.relatedServices[1]
    ? services.find((service) => service.slug === page.relatedServices[1])
    : undefined;

  const featuredPrimaryLinks = primaryRelatedService
    ? buildFeaturedServiceLocationLinks({
        service: primaryRelatedService,
        locations,
        seed: `scaffolding:info:${category}:${page.slug}:primary`,
        maxLinks: 1,
      })
    : [];
  const featuredSecondaryLinks = secondaryRelatedService
    ? buildFeaturedServiceLocationLinks({
        service: secondaryRelatedService,
        locations,
        seed: `scaffolding:info:${category}:${page.slug}:secondary`,
        maxLinks: 1,
      })
    : [];

  const primaryServiceLocationLink = featuredPrimaryLinks[0]
    ? { href: featuredPrimaryLinks[0].href, linkText: featuredPrimaryLinks[0].label }
    : page.serviceLocationLink;

  const additionalServiceLocationLinks = featuredSecondaryLinks
    .map((link) => ({ href: link.href, linkText: link.label }))
    .filter(
      (link, index, links) =>
        link.href !== primaryServiceLocationLink?.href &&
        links.findIndex((candidate) => candidate.href === link.href) === index
    );

  return {
    hub,
    page: {
      ...page,
      serviceLocationLink: primaryServiceLocationLink,
      additionalServiceLocationLinks,
    },
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
    relatedGuidesTitle: "Related Scaffolding Guides",
    callTrackVertical: verticalConfig.verticalId,
    ctaVariants: verticalConfig.ctaVariants,
  };
}
