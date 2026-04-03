import type { MetadataRoute } from "next";
import { verticalConfig } from "@/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${verticalConfig.baseUrl}/sitemap.xml`,
  };
}
