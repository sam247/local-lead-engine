import { NextResponse } from "next/server";
import { hubPages, getCategoryPages } from "@/lib/data";
import { verticalConfig } from "@/config";
import { buildUrlset } from "@/lib/sitemapXml";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const baseUrl = verticalConfig.baseUrl.replace(/\/$/, "");
  const lastmod = new Date();
  const entries: { url: string; lastmod: Date; changefreq: "weekly" | "monthly"; priority: number }[] = [];

  for (const hub of hubPages) {
    entries.push({
      url: `${baseUrl}${hub.basePath}`,
      lastmod,
      changefreq: "weekly",
      priority: 0.8,
    });
    const pages = getCategoryPages(hub.category);
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}${hub.basePath}/${page.slug}`,
        lastmod,
        changefreq: "monthly",
        priority: 0.6,
      });
    }
  }

  const xml = buildUrlset(entries);
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
