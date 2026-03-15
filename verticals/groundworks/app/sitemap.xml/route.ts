import { NextResponse } from "next/server";
import { verticalConfig } from "@/config";
import { buildSitemapIndex } from "@/lib/sitemapXml";

export const dynamic = "force-static";
export const revalidate = false;

const SEGMENTS = [
  "sitemap-services.xml",
  "sitemap-service-locations.xml",
  "sitemap-topics.xml",
  "sitemap-static.xml",
] as const;

export async function GET() {
  const baseUrl = verticalConfig.baseUrl.replace(/\/$/, "");
  const lastmod = new Date();
  const entries = SEGMENTS.map((path) => ({
    loc: `${baseUrl}/${path}`,
    lastmod,
  }));
  const xml = buildSitemapIndex(entries);
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
