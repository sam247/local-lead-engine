import { notFound, permanentRedirect } from "next/navigation";
import { services } from "@/lib/data";
import ServiceDetailContent from "@/components/pages/ServiceDetailContent";
import { verticalConfig } from "@/config";
import { buildServiceHubMetadata } from "engine";
import type { Metadata } from "next";
import {
  isTopicLocationSlug,
  getTopicForRouteSlug,
  TOPIC_LOCATION_SLUGS,
} from "@/lib/topicLocationConfig";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  const serviceParams = services.map((s) => ({ serviceSlug: s.slug }));
  const topicParams = TOPIC_LOCATION_SLUGS.map((serviceSlug) => ({ serviceSlug }));
  return [...serviceParams, ...topicParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) {
    if (isTopicLocationSlug(serviceSlug)) {
      return { title: "Redirecting" };
    }
    return { title: "Not Found" };
  }
  return buildServiceHubMetadata(service, verticalConfig);
}

export default async function RootServiceHubPage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = await params;
  const service = services.find((s) => s.slug === serviceSlug);
  if (service) {
    return <ServiceDetailContent service={service} />;
  }
  if (isTopicLocationSlug(serviceSlug)) {
    const topic = getTopicForRouteSlug(serviceSlug);
    const primary = topic?.primaryServiceSlug;
    if (!primary) notFound();
    permanentRedirect(`/${primary}`);
  }
  notFound();
}
