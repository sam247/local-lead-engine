import { notFound } from "next/navigation";
import { getHubData, getCategoryPages } from "@/lib/data";
import HubPageContent from "@/components/pages/HubPageContent";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const category = "costs";

export async function generateMetadata(): Promise<Metadata> {
  const hub = getHubData(category);
  if (!hub) return { title: "Not Found" };
  return { title: `${hub.title} | Mainline Drains`, description: hub.metaDescription, alternates: { canonical: `https://mainlinedrains.co.uk${hub.basePath}` } };
}

export default function HubPage() {
  const hub = getHubData(category);
  const pages = getCategoryPages(category);
  if (!hub || pages.length === 0) notFound();
  return <HubPageContent category={category} />;
}
