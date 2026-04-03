import { HubPage, buildHubMetadata } from "engine";
import { getHubData } from "@/lib/data";
import { getHubPageProps } from "@/lib/hubPageProps";
import { verticalConfig } from "@/config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = false;

const category = "guides";

export function generateMetadata(): Metadata {
  const hub = getHubData(category);
  if (!hub) return { title: "Not Found" };
  return buildHubMetadata(hub, verticalConfig);
}

export default function ScaffoldingGuidesHubPage() {
  const props = getHubPageProps(category);
  if (!props) notFound();
  return <HubPage {...props} />;
}
