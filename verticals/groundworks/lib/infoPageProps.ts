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
import { getL4GuideTargetLinksForServices } from "@/data/l4StrikingDistance";

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
        seed: `groundworks:info:${category}:${page.slug}:primary`,
        maxLinks: 1,
      })
    : [];
  const featuredSecondaryLinks = secondaryRelatedService
    ? buildFeaturedServiceLocationLinks({
        service: secondaryRelatedService,
        locations,
        seed: `groundworks:info:${category}:${page.slug}:secondary`,
        maxLinks: 1,
      })
    : [];
  const strikingDistanceGuideLinks = getL4GuideTargetLinksForServices(page.relatedServices).slice(0, 2);
  const primaryServiceLocationLink = featuredPrimaryLinks[0]
    ? { href: featuredPrimaryLinks[0].href, linkText: featuredPrimaryLinks[0].label }
    : page.serviceLocationLink;
  const overriddenPrimaryServiceLocationLink = strikingDistanceGuideLinks[0] ?? primaryServiceLocationLink;
  const additionalServiceLocationLinks = [
    ...strikingDistanceGuideLinks.slice(1),
    ...featuredSecondaryLinks
      .map((link) => ({
        href: link.href,
        linkText: link.label,
      })),
  ]
    .map((link) => ({
      href: link.href,
      linkText: link.linkText,
    }))
    .filter((link, index, links) => link.href !== overriddenPrimaryServiceLocationLink?.href && links.findIndex((candidate) => candidate.href === link.href) === index);

  return {
    hub,
    page: {
      ...page,
      serviceLocationLink: overriddenPrimaryServiceLocationLink,
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
    relatedGuidesTitle: "Related Groundworks Guides",
    callTrackVertical: verticalConfig.verticalId,
  };
}
