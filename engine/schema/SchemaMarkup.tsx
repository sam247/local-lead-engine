import type { CompanyInfo } from "../types";

interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SchemaMarkupProps {
  type: "Article" | "Service" | "LocalBusiness" | "BreadcrumbList";
  companyInfo: CompanyInfo;
  baseUrl: string;
  data?: {
    title?: string;
    description?: string;
    url?: string;
    datePublished?: string;
    breadcrumbs?: BreadcrumbItem[];
    serviceName?: string;
    serviceDescription?: string;
    areaServed?: string;
    serviceType?: string;
    geo?: { lat: number; lng: number };
  };
}

export function SchemaMarkup({ type, companyInfo, baseUrl, data = {} }: SchemaMarkupProps) {
  const localBusinessBase = {
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#business`,
    name: companyInfo.name,
    telephone: companyInfo.phone,
    email: companyInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyInfo.address.split(",")[0] ?? companyInfo.address,
      addressLocality: companyInfo.address.split(",").slice(1).join(",").trim() || "London",
      addressCountry: "GB",
    },
    url: baseUrl,
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "££",
  };

  let schema: object;

  switch (type) {
    case "Article":
      schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.title,
        description: data.description,
        url: data.url ? `${baseUrl}${data.url}` : undefined,
        publisher: {
          "@type": "Organization",
          name: companyInfo.name,
          url: baseUrl,
        },
        datePublished: data.datePublished || new Date().toISOString().split("T")[0],
      };
      break;

    case "Service":
      schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: data.serviceName || data.title,
        description: data.serviceDescription || data.description,
        provider: localBusinessBase,
        areaServed: {
          "@type": "Place",
          name: data.areaServed || "London",
        },
        ...(data.serviceType && { serviceType: data.serviceType }),
        url: data.url ? `${baseUrl}${data.url}` : undefined,
      };
      break;

    case "LocalBusiness":
      schema = {
        "@context": "https://schema.org",
        ...localBusinessBase,
        ...(data.geo && {
          geo: {
            "@type": "GeoCoordinates",
            latitude: data.geo.lat,
            longitude: data.geo.lng,
          },
        }),
        ...(data.areaServed && {
          areaServed: {
            "@type": "Place",
            name: data.areaServed,
          },
        }),
        ...(data.serviceType && { serviceType: data.serviceType }),
        ...(companyInfo.aggregateRating && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: companyInfo.aggregateRating.ratingValue,
            reviewCount: companyInfo.aggregateRating.reviewCount,
            bestRating: companyInfo.aggregateRating.bestRating ?? 5,
          },
        }),
      };
      break;

    case "BreadcrumbList":
      schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: (data.breadcrumbs || []).map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${baseUrl}${item.url}`,
        })),
      };
      break;

    default:
      return null;
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
