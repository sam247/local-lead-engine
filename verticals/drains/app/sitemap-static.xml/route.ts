import { NextResponse } from "next/server";
import { verticalConfig } from "@/config";
import { buildUrlset } from "@/lib/sitemapXml";
import { drainProblems } from "@/data/problems";
import { projects } from "@/data/projects";
import { blogPosts } from "@/lib/blogData";

export const dynamic = "force-static";
export const revalidate = false;

const standardGuidePaths = [
  "/guides",
  "/how-it-works",
  "/process",
  "/common-problems",
  "/companies-cost",
  "/faq",
  "/insurance",
  "/legal",
  "/homeowners",
];

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
  "/privacy",
  "/terms",
  ...standardGuidePaths,
  ...drainProblems.map((p) => `/drain-problems/${p.slug}`),
];

const nearMePaths = [
  "/drain-collapse-near-me",
  "/drain-survey-near-me",
  "/emergency-drain-engineer-near-me",
  "/drain-unblocking-near-me",
  "/collapsed-drain-repair-near-me",
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
    ...nearMePaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastmod,
      changefreq: "monthly" as const,
      priority: 0.7,
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
