export interface CompanyInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
  };
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  /** Optional singular form for metadata and H1 (e.g. "CCTV Drain Survey"). Falls back to title. */
  titleSingular?: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  process: string[];
  icon: string;
}

export interface Location {
  id: string;
  name: string;
  area: string;
  lat: number;
  lng: number;
  nearbyTowns?: string[];
  propertyTypes?: string;
}

export interface HubData {
  category: string;
  basePath: string;
  title: string;
  subtitle: string;
  metaDescription: string;
}

export interface InfoPageData {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  signs: string[];
  diagnosis: string;
  resolution: string;
  ctaText: string;
  relatedServices: string[];
  relatedPages?: { slug: string; category: string; title: string }[];
}

export interface VerticalConfig {
  /** Identifier for analytics, reporting, and cross-vertical linking (e.g. "drains", "surveys", "access"). */
  verticalId: string;
  siteName: string;
  baseUrl: string;
  primaryService?: string;
  industry?: string;
  /** Optional action-oriented label for hero/secondary CTA (e.g. "Book CCTV Drain Survey"). */
  heroSecondaryCtaText?: string;
  /** Optional label for problem/guide hub breadcrumb (e.g. "Drain Problems", "Access Problems"). Falls back to "Problems" in ProblemPage. */
  problemLabel?: string;
  companyInfo: CompanyInfo;
  /** Per-service list of "types" for Service Detail "Types of {Service Name}" section. Key = service slug. */
  serviceTypesBySlug?: Record<string, string[]>;
  /** Override for "Industries We Work With" section. If absent, engine uses a default list. */
  industries?: string[];
  /** Optional list for "Trusted Systems and Equipment" section (e.g. manufacturers, product lines). */
  trustedEquipment?: string[];
  /** Short label for sidebar "Related X Services" (e.g. "Drain" → "Related Drain Services"). Falls back to siteName. */
  relatedServicesLabel?: string;
  /** Optional intro paragraphs for service detail sections (before each list). ~40–80 words each. */
  sectionIntros?: {
    types?: string;
    process?: string;
    industries?: string;
    benefits?: string;
  };
}

export interface ProblemData {
  slug: string;
  title: string;
  causes: string;
  howFixed: string;
  whenToCall: string;
  relatedServiceSlugs: string[];
  ctaMessage: string;
}
