import type { MetadataRoute } from "next";
import type { Service, Location, HubData, InfoPageData, VerticalConfig } from "../types";

export interface SitemapConfig {
  baseUrl: string;
  staticPaths: string[];
  nearMePaths: string[];
  services: Service[];
  locations: Location[];
  hubPages: HubData[];
  getCategoryPages: (category: string) => InfoPageData[];
  serviceDetailPath?: (slug: string) => string;
}

export function buildSitemapEntries(config: SitemapConfig): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const { baseUrl, staticPaths, nearMePaths, services, locations, hubPages, getCategoryPages } =
    config;
  const serviceDetailPath = config.serviceDetailPath ?? ((slug: string) => `/services/${slug}`);

  for (const path of staticPaths) {
    entries.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "weekly",
      priority: path === "" ? 1 : 0.8,
    });
  }

  for (const service of services) {
    entries.push({
      url: `${baseUrl}${serviceDetailPath(service.slug)}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const service of services) {
    for (const location of locations) {
      entries.push({
        url: `${baseUrl}/${service.slug}/${location.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  for (const hub of hubPages) {
    entries.push({
      url: `${baseUrl}${hub.basePath}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  for (const hub of hubPages) {
    const pages = getCategoryPages(hub.category);
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}${hub.basePath}/${page.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  for (const path of nearMePaths) {
    entries.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
