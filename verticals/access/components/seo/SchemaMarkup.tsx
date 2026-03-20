import { companyInfo } from "@/lib/data";
import { verticalConfig } from "@/config";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SchemaMarkupProps {
  type: "Article" | "Service" | "LocalBusiness" | "BreadcrumbList";
  data?: {
    title?: string;
    description?: string;
    url?: string;
    datePublished?: string;
    breadcrumbs?: BreadcrumbItem[];
    serviceName?: string;
    serviceDescription?: string;
    areaServed?: string;
    geo?: { lat: number; lng: number };
  };
}

const baseUrl = verticalConfig.baseUrl;

const localBusinessBase = {
  "@type": "LocalBusiness",
  "@id": `${baseUrl}/#business`,
  name: companyInfo.name,
  telephone: companyInfo.phone,
  email: companyInfo.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Drainage Way",
    addressLocality: "London",
    postalCode: "SW1A 1AA",
    addressCountry: "GB",
  },
  url: baseUrl,
  openingHours: "Mo-Su 00:00-23:59",
  priceRange: "££",
};

const SchemaMarkup = ({ type, data = {} }: SchemaMarkupProps) => {
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
};

export default SchemaMarkup;
