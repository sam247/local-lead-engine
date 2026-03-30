import { NextResponse } from "next/server";
import { verticalConfig } from "@/config";
import { buildUrlset } from "@/lib/sitemapXml";

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
  "/access-control-systems-near-me",
  "/services",
  "/contact",
  "/projects",
  "/blog",
  "/industries",
  "/privacy",
  "/terms",
  ...standardGuidePaths,
];

export async function GET() {
  const baseUrl = verticalConfig.baseUrl.replace(/\/$/, "");
  const lastmod = new Date();
  const entries = staticPaths.map((path) => ({
    url: path === "" ? baseUrl : `${baseUrl}${path}`,
    lastmod,
    changefreq: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const xml = buildUrlset(entries);
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
