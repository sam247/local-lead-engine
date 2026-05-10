import { NextResponse } from "next/server";
import { services, locations } from "@/lib/data";
import { verticalConfig } from "@/config";
import { buildUrlset } from "@/lib/sitemapXml";
import { generateGroundworksServiceLocationStaticParams } from "@/lib/controlledTerritoryGeneration";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const baseUrl = verticalConfig.baseUrl.replace(/\/$/, "");
  const lastmod = new Date();
  const entries: { url: string; lastmod: Date; changefreq: "monthly"; priority: number }[] = [];
  for (const { serviceSlug, locationSlug } of generateGroundworksServiceLocationStaticParams(
    locations,
    services
  )) {
    entries.push({
      url: `${baseUrl}/${serviceSlug}/${locationSlug}`,
      lastmod,
      changefreq: "monthly",
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
