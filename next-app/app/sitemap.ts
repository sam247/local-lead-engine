import type { MetadataRoute } from "next";
import { services, locations, hubPages, getCategoryPages } from "@/lib/data";

const baseUrl = "https://mainlinedrains.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPaths = [
    "",
    "/about",
    "/services",
    "/contact",
    "/projects",
    "/blog",
    "/collapsed-drains-complete-guide",
    "/drainage-guides",
    "/do-i-need-a-drain-survey",
    "/drain-survey-cost",
    "/drainage-faq",
    "/contractors",
  ];
  for (const path of staticPaths) {
    entries.push({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.8 });
  }

  // Service detail pages
  for (const service of services) {
    entries.push({ url: `${baseUrl}/services/${service.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 });
  }

  // Location pages (services × locations)
  for (const service of services) {
    for (const location of locations) {
      entries.push({
        url: `${baseUrl}/${service.slug}/${location.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    }
  }

  // Hub index pages
  for (const hub of hubPages) {
    entries.push({ url: `${baseUrl}${hub.basePath}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 });
  }

  // Info pages (hub basePath + slug)
  for (const hub of hubPages) {
    const pages = getCategoryPages(hub.category);
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}${hub.basePath}/${page.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    }
  }

  // Near-me pages
  const nearMePaths = [
    "/drain-collapse-near-me",
    "/drain-survey-near-me",
    "/emergency-drain-engineer-near-me",
    "/drain-unblocking-near-me",
    "/collapsed-drain-repair-near-me",
  ];
  for (const path of nearMePaths) {
    entries.push({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 });
  }

  return entries;
}
