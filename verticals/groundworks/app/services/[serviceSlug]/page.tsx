import { notFound, permanentRedirect } from "next/navigation";
import { services } from "@/lib/data";
import ServiceDetailContent from "@/components/pages/ServiceDetailContent";
import { verticalConfig } from "@/config";
import { buildServiceHubMetadata } from "engine";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

function canonicalizeServiceSlug(rawSlug: string): string {
  return rawSlug.replace(/-\d+$/, "");
}

export async function generateStaticParams() {
  return services.map((s) => ({ serviceSlug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ serviceSlug: string }> }): Promise<Metadata> {
  const { serviceSlug: rawServiceSlug } = await params;
  const canonicalServiceSlug = canonicalizeServiceSlug(rawServiceSlug);
  const service = services.find((s) => s.slug === canonicalServiceSlug);
  if (!service) return { title: "Not Found" };
  return buildServiceHubMetadata(service, verticalConfig);
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ serviceSlug: string }> }) {
  const { serviceSlug: rawServiceSlug } = await params;
  const canonicalServiceSlug = canonicalizeServiceSlug(rawServiceSlug);
  if (canonicalServiceSlug !== rawServiceSlug) {
    const canonicalService = services.find((s) => s.slug === canonicalServiceSlug);
    if (canonicalService) {
      permanentRedirect(`/services/${canonicalServiceSlug}`);
    }
  }
  const service = services.find((s) => s.slug === canonicalServiceSlug);
  if (!service) notFound();
  return <ServiceDetailContent service={service} />;
}
