import { NextResponse } from "next/server";
import { hubPages, getCategoryPages } from "@/lib/data";
import { verticalConfig } from "@/config";
import { buildUrlset } from "@/lib/sitemapXml";
import { surveyProblemPages } from "@/data/problemPages";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const baseUrl = verticalConfig.baseUrl.replace(/\/$/, "");
  const lastmod = new Date();
  const entries: { url: string; lastmod: Date; changefreq: "weekly" | "monthly"; priority: number }[] = [];
  const seen = new Set<string>();

  const addEntry = (url: string, changefreq: "weekly" | "monthly", priority: number) => {
    if (seen.has(url)) return;
    seen.add(url);
    entries.push({ url, lastmod, changefreq, priority });
  };

  for (const hub of hubPages) {
    const pages = getCategoryPages(hub.category);
    if (!pages.length) continue;

    addEntry(`${baseUrl}${hub.basePath}`, "weekly", 0.8);

    for (const page of pages) {
      addEntry(`${baseUrl}${hub.basePath}/${page.slug}`, "monthly", 0.6);
    }
  }
  for (const page of surveyProblemPages) {
    addEntry(`${baseUrl}/drain-problems/${page.slug}`, "monthly", 0.6);
  }

  const xml = buildUrlset(entries);
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
