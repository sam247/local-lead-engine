import { notFound } from "next/navigation";
import { services, locations } from "@/lib/data";
import LocationPageContent from "@/components/pages/LocationPageContent";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  return services.flatMap((s) =>
    locations.map((l) => ({ serviceSlug: s.slug, locationSlug: l.id }))
  );
}

type Props = { params: { serviceSlug: string; locationSlug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug, locationSlug } = params;
  const service = services.find((s) => s.slug === serviceSlug);
  const location = locations.find((l) => l.id === locationSlug);
  if (!service || !location) return { title: "Not Found" };
  const title = `${service.title} in ${location.name} | Mainline Drains`;
  const description = `Professional ${service.title.toLowerCase()} services in ${location.name}, ${location.area}. Trusted local drainage experts. 24/7 emergency response. Free quotes available.`;
  return {
    title,
    description,
    alternates: { canonical: `https://mainlinedrains.co.uk/${serviceSlug}/${locationSlug}` },
  };
}

export default async function LocationPage({ params }: Props) {
  const { serviceSlug, locationSlug } = params;
  const service = services.find((s) => s.slug === serviceSlug);
  const location = locations.find((l) => l.id === locationSlug);
  if (!service || !location) notFound();
  return (
    <LocationPageContent
      service={service}
      location={location}
      serviceSlug={serviceSlug}
      locationSlug={locationSlug}
    />
  );
}
