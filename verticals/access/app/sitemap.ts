import type { MetadataRoute } from "next";
import { buildSitemapEntries } from "engine";
import { services, locations, hubPages, getCategoryPages } from "@/lib/data";
import { accessProblems } from "@/data/problems";
import { industries } from "@/data/industries";
import { verticalConfig } from "@/config";

const staticPaths = [
  "",
  "/about",
  "/service-areas",
  "/services",
  "/contact",
  "/projects",
  "/blog",
  "/industries",
  ...industries.map((i) => `/industries/${i.slug}`),
  ...accessProblems.map((p) => `/access-problems/${p.slug}`),
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
