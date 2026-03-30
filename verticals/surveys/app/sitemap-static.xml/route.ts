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
  "/services",
  "/contact",
  "/projects",
  "/blog",
  "/collapsed-drains-complete-guide",
  "/survey-guides",
  "/do-i-need-a-drain-survey",
  "/drain-survey-cost",
  "/drainage-faq",
  "/contractors",
  "/privacy",
  "/terms",
  ...standardGuidePaths,
];

const nearMePaths = ["/topographical-survey-near-me"];

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
  ];
  const xml = buildUrlset(entries);
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
