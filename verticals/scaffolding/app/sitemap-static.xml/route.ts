import { NextResponse } from "next/server";
import { verticalConfig } from "@/config";
import { buildUrlset } from "@/lib/sitemapXml";
import { projects } from "@/data/projects";
import { blogPosts } from "@/lib/blogData";

export const dynamic = "force-static";
export const revalidate = false;

const staticPaths = [
  "",
  "/about",
  "/service-areas",
  "/scaffolding-contractors-near-me",
  "/services",
  "/contact",
  "/projects",
  "/blog",
  "/contractors",
  "/privacy",
  "/terms",
  "/scaffolding-guides",
  "/scaffold-safety-guides",
  "/scaffolding-costs",
];

export async function GET() {
  const baseUrl = verticalConfig.baseUrl.replace(/\/$/, "");
  const lastmod = new Date();
  const entries = [
    ...staticPaths.map((path) => ({
      url: path === "" ? baseUrl : `${baseUrl}${path}`,
      lastmod,
      changefreq: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastmod,
      changefreq: "monthly" as const,
      priority: 0.65,
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastmod,
      changefreq: "monthly" as const,
      priority: 0.65,
    })),
  ];
  const xml = buildUrlset(entries);
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
