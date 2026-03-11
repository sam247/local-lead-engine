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
