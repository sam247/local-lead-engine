export { getServiceUrl, getLegacyServiceUrl, isServiceHubPath, inferServiceSlugForCtaBias } from "./serviceUrls";
export { cn } from "./cn";
export { getImageAlt, type GetImageAltParams } from "./imageAlt";
export { buildLocationContextParagraph, type BuildLocationContextParams } from "./locationContext";
export {
  clampMetaTitle,
  maybeAddNearMeMetaTitle,
  clampMetaDescription,
  buildLocationMetadata,
  buildServiceHubMetadata,
  buildProblemMetadata,
  buildTopicLocationMetadata,
  type TopicLocationMetaInput,
  buildHubMetadata,
  buildInfoMetadata,
} from "./metadata";
export { buildSitemapEntries, type SitemapConfig } from "./sitemap";
export { trackEvent } from "./trackEvent";
export { pickHomepageArticleCards, type BlogPostLike, type GuideFallbackLike } from "./homepageArticles";
export {
  buildGuideInternalLinksWithLocations,
  GuideInternalLinksBlock,
  type GuideInternalLinksModel,
} from "./guideInternalLinks";
export { pickServiceDetailFeaturedLocations } from "./pickFeaturedLocations";
export {
  buildServiceLocationAnchor,
  pickRelatedServiceLocationLinks,
  pickFeaturedLocationsForInternalLinks,
  buildFeaturedServiceLocationLinks,
  type InternalLinkTarget,
} from "./internalLinkTargets";
export { hashCode, getCtaVariant, type GetCtaVariantOptions } from "./ctaVariants";
export {
  QUOTE_FORM_ELEMENT_ID,
  handlePrimaryCtaClick,
  LAST_CTA_TEXT_KEY,
  LAST_CTA_SEED_KEY,
  getLastCtaFromSession,
} from "./quoteFormCta";
