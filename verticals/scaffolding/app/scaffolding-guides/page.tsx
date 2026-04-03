import { HubPage } from "engine";
import { getHubData, getCategoryPages } from "@/lib/data";
import { verticalConfig } from "@/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = false;

const category = "guides";

export function generateMetadata(): Metadata {
  const hub = getHubData(category);
  if (!hub) return { title: "Not Found" };
  return {
    title: `${hub.title} | ${verticalConfig.siteName}`,
    description: hub.metaDescription,
    alternates: { canonical: `${verticalConfig.baseUrl}${hub.basePath}` },
  };
}

export default function ScaffoldingGuidesHubPage() {
  const hub = getHubData(category);
  if (!hub) notFound();
  const pages = getCategoryPages(category);
  return (
    <HubPage
      hub={hub}
      pages={pages}
      companyInfo={verticalConfig.companyInfo}
      baseUrl={verticalConfig.baseUrl}
    />
  );
}
