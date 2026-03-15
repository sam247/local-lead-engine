import type { MetadataRoute } from "next";
import { buildSitemapEntries } from "engine";
import { services, locations, hubPages, getCategoryPages } from "@/lib/data";
import { verticalConfig } from "@/config";

const staticPaths = [
  "",
  "/about",
  "/service-areas",
  "/services",
  "/contact",
  "/projects",
  "/blog",
  "/guides",
  "/contractors",
  "/privacy",
  "/terms",
];

const nearMePaths: string[] = [];

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries({
    baseUrl: verticalConfig.baseUrl,
    staticPaths,
    nearMePaths,
    services,
    locations,
    hubPages,
    getCategoryPages,
    serviceDetailPath: (slug) => `/services/${slug}`,
  });
}
