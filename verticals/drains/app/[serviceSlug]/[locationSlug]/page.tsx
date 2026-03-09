import { notFound } from "next/navigation";
import { services, locations } from "@/lib/data";
import { serviceImages } from "@/lib/images";
import { verticalConfig } from "@/config";
import { LocationPage } from "engine";
import { buildLocationMetadata } from "engine";
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
  return buildLocationMetadata(service, location, verticalConfig);
}

export default async function LocationRoute({ params }: Props) {
  const { serviceSlug, locationSlug } = params;
  const service = services.find((s) => s.slug === serviceSlug);
  const location = locations.find((l) => l.id === locationSlug);
  if (!service || !location) notFound();

  const sameAreaLocations = locations.filter(
    (l) => l.id !== location.id && l.area === location.area
  );
  const nearbyLocations =
    sameAreaLocations.length >= 4
      ? sameAreaLocations.slice(0, 8)
      : [
          ...sameAreaLocations,
          ...locations.filter(
            (l) => l.id !== location.id && l.area !== location.area
          ),
        ].slice(0, 8);

  const localFaqs = [
    {
      question: `Do you provide ${service.title.toLowerCase()} in ${location.name}?`,
      answer: `Yes, we provide comprehensive ${service.title.toLowerCase()} services throughout ${location.name} and surrounding areas in ${location.area}.`,
    },
    {
      question: `How quickly can you respond to a drainage emergency in ${location.name}?`,
      answer: `Our emergency team typically arrives in ${location.name} within 1-2 hours, operating 24/7 including weekends and bank holidays.`,
    },
    {
      question: `Do you offer free quotes in ${location.name}?`,
      answer: `Absolutely. We provide free, no-obligation CCTV surveys and quotes for all ${location.name} drainage projects.`,
    },
  ];

  const otherServices = services.filter((s) => s.id !== service.id);
  const serviceImage =
    serviceImages[service.slug] ?? "/images/services/drain-collapse-repair.jpg";

  return (
    <LocationPage
      service={service}
      location={location}
      serviceSlug={serviceSlug}
      locationSlug={locationSlug}
      sameAreaLocations={sameAreaLocations}
      nearbyLocations={nearbyLocations}
      localFaqs={localFaqs}
      companyInfo={verticalConfig.companyInfo}
      otherServices={otherServices}
      baseUrl={verticalConfig.baseUrl}
      serviceImage={serviceImage}
      contactPath="/contact"
    />
  );
}
