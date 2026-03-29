export * from "./types";
export {
  handleCallClick,
  digitsFromPhone,
  type TrackCallClickContext,
} from "./lib/phone/handleCallClick";
export { TrackablePhoneLink, type TrackablePhoneLinkProps } from "./components/TrackablePhoneLink";
export { getVariantIndex } from "./lib/contentVariants";
export {
  getPageTier,
  getPageType,
  computeEmergencyEligible,
  maybeApplyEmergencyMonetisation,
  pageSeoDataAttrs,
  EMERGENCY_MODE_ENABLED,
  type PageTier,
  type PageType,
  type GetPageTierInput,
  type GetPageTypeInput,
} from "./lib/pageWeighting";
export * from "./utils";
export * from "./schema";
export * from "./validation";
export * from "./data/location-neighbours";
export { locations } from "./data/locations";
export * from "./data/projects";

export { BreadcrumbNav, type BreadcrumbNavProps, type BreadcrumbItem } from "./components/BreadcrumbNav";
export { LocationContext, type LocationContextProps } from "./components/LocationContext";
export { LocationPage, type LocationPageProps } from "./components/LocationPage";
export { NearbyAreas, type NearbyAreasProps } from "./components/NearbyAreas";
export { SectionIntro } from "./components/SectionIntro";
export { ProcessTimeline } from "./components/ProcessTimeline";
export { TrustReassuranceStrip } from "./components/TrustReassuranceStrip";
export { TrustStrip, type TrustStripProps, type TrustStripItem, type TrustStripIcon } from "./components/TrustStrip";
export { ActionPanel, type ActionPanelProps } from "./components/ActionPanel";
export { HubPage, type HubPageProps, type CrossSection, type PillarGuideLink } from "./components/HubPage";
export { InfoPage, type InfoPageProps, type RelatedPageLink } from "./components/InfoPage";
export { NearMePage, type NearMePageProps } from "./components/NearMePage";
export { PillarGuide, type PillarGuideProps, type PillarGuideSection } from "./components/PillarGuide";
export { MapEmbed, type MapEmbedProps } from "./components/MapEmbed";
export { InspectionCTA, type InspectionCTAProps } from "./components/InspectionCTA";
export { MidContentCTA, type MidContentCTAProps } from "./components/MidContentCTA";
export { ContentRelatedLinks, type ContentRelatedLinksProps } from "./components/ContentRelatedLinks";
export { CTABanner, type CTABannerProps } from "./components/CTABanner";
export { MainlineGroupLinks, type MainlineGroupLinksProps } from "./components/MainlineGroupLinks";
export { GroupFooter, type GroupFooterProps } from "./components/footer/GroupFooter";
export { TrustPoints, type TrustPointsProps } from "./components/home/TrustPoints";
export { HomepageArticles, type HomepageArticlesProps, type HomepageArticleCard } from "./components/home/HomepageArticles";
export {
  GuidePage,
  type GuidePageProps,
  type GuidePageParagraph,
  type GuidePagePrimaryCta,
  type GuidePageSection,
} from "./components/content/GuidePage";
export { GuidesHubPage, type GuidesHubPageProps, type GuidesHubCard } from "./components/content/GuidesHubPage";
export { FooterServiceAreaGroups, type FooterServiceAreaGroupsProps } from "./components/FooterServiceAreaGroups";
export { ServiceAreasHub, type ServiceAreasHubProps } from "./components/ServiceAreasHub";
export { ProblemCTA, type ProblemCTAProps } from "./components/ProblemCTA";
export { ProblemPage, type ProblemPageProps } from "./components/ProblemPage";
export {
  ProblemPreviewSection,
  type ProblemPreviewSectionProps,
  type ProblemPreviewItem,
} from "./components/ProblemPreviewSection";
export { ProjectCardWithLinks, type ProjectCardWithLinksProps, type ProjectForCard } from "./components/ProjectCardWithLinks";
export { RelatedLinks, type RelatedLinksProps } from "./components/RelatedLinks";
export { ServiceImageGallery, type ServiceImageGalleryProps } from "./components/ServiceImageGallery";
export { ServiceDetailContent, type ServiceDetailContentProps, type SymptomLink } from "./components/ServiceDetailContent";
export {
  TopicLocationPage,
  type TopicLocationPageProps,
  type TopicLocationProcessStep,
} from "./components/TopicLocationPage";
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./components/ui/card";
