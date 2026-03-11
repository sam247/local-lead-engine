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

export interface HubData {
  category: string;
  basePath: string;
  title: string;
  subtitle: string;
  metaDescription: string;
}
