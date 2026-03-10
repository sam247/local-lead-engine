import { notFound } from "next/navigation";
import { services, locations } from "@/lib/data";
import { getHeroImage } from "@/lib/images";
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
    {
      question: `How much does drain repair cost in ${location.name}?`,
      answer: `Costs vary by job: simple repairs from around £1,500, with deeper or more complex work in ${location.name} and ${location.area} typically £3,000–£8,000+. We provide fixed-price quotes after a CCTV survey.`,
    },
    {
      question: `Do I need a drain survey in ${location.name}?`,
      answer: `A CCTV drain survey is recommended before repair work in ${location.name}. It confirms the problem, extent, and best fix—and we use it to give you an accurate quote.`,
    },
    {
      question: `Can tree roots cause blocked drains in ${location.name}?`,
      answer: `Yes. Tree roots are a common cause of blockages and damage in ${location.name} and ${location.area}. We can remove roots and reline pipes to prevent regrowth.`,
    },
  ].slice(0, 5);

  const trustPoints = [
    "Years of experience serving " + location.area,
    "24/7 emergency availability",
    "Fully insured engineers",
    "CCTV inspection technology",
  ];

  const otherServices = services.filter((s) => s.id !== service.id);
  const serviceImage = getHeroImage({ serviceSlug: service.slug });

  const introParagraph = `We provide ${service.title} across ${location.name} and ${location.area}. Our team offers expert diagnosis, repair, and maintenance for residential and commercial properties, with 24/7 emergency cover and free no-obligation quotes.`;

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
      trustSectionTitle={`Trusted Drain Engineers in ${location.name}`}
      trustPoints={trustPoints}
      diagnosisGuidePath="/collapsed-drains-complete-guide"
      introParagraph={introParagraph}
      nearbyAreasDescription={`Compare our ${service.title} in nearby areas.`}
    />
  );
}
