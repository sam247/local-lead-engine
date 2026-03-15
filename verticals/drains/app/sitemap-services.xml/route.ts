import { NextResponse } from "next/server";
import { services } from "@/lib/data";
import { verticalConfig } from "@/config";
import { buildUrlset } from "@/lib/sitemapXml";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const baseUrl = verticalConfig.baseUrl.replace(/\/$/, "");
  const lastmod = new Date();
  const entries = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastmod,
    changefreq: "monthly" as const,
    priority: 0.7,
  }));
  const xml = buildUrlset(entries);
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
