import { notFound } from "next/navigation";
import { services } from "@/lib/data";
import ServiceDetailContent from "@/components/pages/ServiceDetailContent";
import { verticalConfig } from "@/config";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  return services.map((s) => ({ serviceSlug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ serviceSlug: string }> }): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) return { title: "Not Found" };
  const displayTitle = service.titleSingular ?? service.title;
  const baseUrl = verticalConfig.baseUrl.replace(/\/$/, "");
  return {
    title: `${displayTitle} | ${verticalConfig.siteName}`,
    description: service.description.slice(0, 160),
    alternates: { canonical: `${baseUrl}/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ serviceSlug: string }> }) {
  const { serviceSlug } = await params;
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) notFound();
  return <ServiceDetailContent service={service} />;
}
