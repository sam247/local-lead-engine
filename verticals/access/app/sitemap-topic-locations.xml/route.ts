import { NextResponse } from "next/server";
import { locations } from "@/lib/data";
import { verticalConfig } from "@/config";
import { getLocationScalableTopicSlugs } from "@/lib/topicLocationConfig";
import { buildUrlset } from "@/lib/sitemapXml";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const baseUrl = verticalConfig.baseUrl.replace(/\/$/, "");
  const lastmod = new Date();
  const entries: { url: string; lastmod: Date; changefreq: "weekly"; priority: number }[] = [];

  for (const topicSlug of getLocationScalableTopicSlugs()) {
    for (const loc of locations) {
      entries.push({
        url: `${baseUrl}/${topicSlug}/${loc.id}`,
        lastmod,
        changefreq: "weekly",
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
