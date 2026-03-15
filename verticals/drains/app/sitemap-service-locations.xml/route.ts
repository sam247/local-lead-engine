import { NextResponse } from "next/server";
import { services, locations } from "@/lib/data";
import { verticalConfig } from "@/config";
import { buildUrlset } from "@/lib/sitemapXml";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const baseUrl = verticalConfig.baseUrl.replace(/\/$/, "");
  const lastmod = new Date();
  const entries: { url: string; lastmod: Date; changefreq: "monthly"; priority: number }[] = [];
  for (const service of services) {
    for (const loc of locations) {
      entries.push({
        url: `${baseUrl}/${service.slug}/${loc.id}`,
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
