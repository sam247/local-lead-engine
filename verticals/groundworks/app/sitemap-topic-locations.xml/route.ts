import { NextResponse } from "next/server";
import { locations } from "@/lib/data";
import { verticalConfig } from "@/config";
import { getTopicLocationStaticParams } from "@/lib/topicLocationConfig";
import { groundworksAllowsTopicSlugForLocation } from "@/lib/controlledTerritoryGeneration";
import { buildUrlset } from "@/lib/sitemapXml";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const baseUrl = verticalConfig.baseUrl.replace(/\/$/, "");
  const lastmod = new Date();
  const entries: { url: string; lastmod: Date; changefreq: "weekly"; priority: number }[] = [];

  for (const { serviceSlug: topicSlug, locationSlug } of getTopicLocationStaticParams(locations)) {
    if (!groundworksAllowsTopicSlugForLocation(locationSlug, topicSlug)) continue;
    entries.push({
      url: `${baseUrl}/${topicSlug}/${locationSlug}`,
      lastmod,
      changefreq: "weekly",
      priority: 0.6,
    });
  }

  const xml = buildUrlset(entries);
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
