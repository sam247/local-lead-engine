import type { MetadataRoute } from "next";
import { buildSitemapEntries } from "engine";
import { services, locations, hubPages, getCategoryPages } from "@/lib/data";
import { drainProblems } from "@/data/problems";
import { verticalConfig } from "@/config";

const staticPaths = [
  "",
  "/about",
  "/service-areas",
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
  ...drainProblems.map((p) => `/drain-problems/${p.slug}`),
];

const nearMePaths = [
  "/drain-collapse-near-me",
  "/drain-survey-near-me",
  "/emergency-drain-engineer-near-me",
  "/drain-unblocking-near-me",
  "/collapsed-drain-repair-near-me",
];

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
