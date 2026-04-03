/**
 * Shared XML serialisation for sitemap index and urlset segments.
 * Namespace: http://www.sitemaps.org/schemas/sitemap/0.9
 */

const NS = "http://www.sitemaps.org/schemas/sitemap/0.9";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatLastMod(d: Date): string {
  return d.toISOString();
}

export type SitemapIndexEntry = {
  loc: string;
  lastmod?: Date;
};

export function buildSitemapIndex(entries: SitemapIndexEntry[]): string {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<sitemapindex xmlns="${NS}">`,
    ...entries.map((e) => {
      const loc = escapeXml(e.loc);
      const lastmod = e.lastmod ? `\n    <lastmod>${escapeXml(formatLastMod(e.lastmod))}</lastmod>` : "";
      return `  <sitemap>\n    <loc>${loc}</loc>${lastmod}\n  </sitemap>`;
    }),
    "</sitemapindex>",
  ];
  return lines.join("\n");
}

export type UrlsetEntry = {
  url: string;
  lastmod?: Date;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
};

export function buildUrlset(entries: UrlsetEntry[]): string {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<urlset xmlns="${NS}">`,
    ...entries.map((e) => {
      const loc = escapeXml(e.url);
      const lastmod = e.lastmod ? `\n    <lastmod>${escapeXml(formatLastMod(e.lastmod))}</lastmod>` : "";
      const changefreq = e.changefreq ? `\n    <changefreq>${e.changefreq}</changefreq>` : "";
      const priority = e.priority !== undefined ? `\n    <priority>${e.priority}</priority>` : "";
      return `  <url>\n    <loc>${loc}</loc>${lastmod}${changefreq}${priority}\n  </url>`;
    }),
    "</urlset>",
  ];
  return lines.join("\n");
}
