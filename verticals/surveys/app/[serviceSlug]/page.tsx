import { notFound } from "next/navigation";
import { services } from "@/lib/data";
import ServiceDetailContent from "@/components/pages/ServiceDetailContent";
import { verticalConfig } from "@/config";
import { buildServiceHubMetadata } from "engine";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  return services.map((s) => ({ serviceSlug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) return { title: "Not Found" };
  return buildServiceHubMetadata(service, verticalConfig);
}

export default async function RootServiceHubPage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = await params;
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) notFound();
  return <ServiceDetailContent service={service} />;
}
