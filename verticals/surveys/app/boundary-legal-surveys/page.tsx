import { notFound } from "next/navigation";
import { getHubData, getCategoryPages } from "@/lib/data";
import { HubPage } from "engine";
import { buildHubMetadata } from "engine";
import { verticalConfig } from "@/config";
import { getHubPageProps } from "@/lib/hubPageProps";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const category = "legal";

export async function generateMetadata(): Promise<Metadata> {
  const hub = getHubData(category);
  if (!hub) return { title: "Not Found" };
  return buildHubMetadata(hub, verticalConfig);
}

export default function HubPageRoute() {
  const hub = getHubData(category);
  const pages = getCategoryPages(category);
  if (!hub || pages.length === 0) notFound();
  const props = getHubPageProps(category);
  if (!props) notFound();
  return <HubPage {...props} />;
}
