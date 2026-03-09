import { notFound } from "next/navigation";
import { services } from "@/lib/data";
import NearMePageContent from "@/components/pages/NearMePageContent";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const serviceSlug = "emergency-drainage";

export async function generateMetadata(): Promise<Metadata> {
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) return { title: "Not Found" };
  return { title: `${service.title} Near Me | Mainline Drains`, description: `Find ${service.title.toLowerCase()} near you. 24/7 emergency response.`, alternates: { canonical: `https://mainlinedrains.co.uk/emergency-drain-engineer-near-me` } };
}

export default function NearMePage() {
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) notFound();
  return <NearMePageContent serviceSlug={serviceSlug} />;
}
