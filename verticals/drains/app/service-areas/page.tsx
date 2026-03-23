import { ServiceAreasHub } from "engine";
import { locations } from "@/lib/data";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const PRIMARY_SERVICE_SLUG = "drain-collapse-repair";

export const metadata: Metadata = {
  title: "Service Areas | Mainline Drains",
  description:
    "Drainage services across the UK. Find drain repair, CCTV surveys and emergency drainage in your area.",
  alternates: { canonical: "https://mainlinedrains.co.uk/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <ServiceAreasHub
      primaryServiceSlug={PRIMARY_SERVICE_SLUG}
      locations={locations}
      heroTitle="Drainage Services Across the UK"
      heroSubtitle="Expert drain repair, CCTV surveys and emergency drainage in towns and cities nationwide."
      introTitle="Coverage by region"
      introBody="Browse key towns and cities we cover, grouped by region. Each link opens local drainage information and how to get a quote for your area."
      browseMoreHref="/drain-collapse-near-me"
      browseMoreLabel="Find drain collapse repair near you"
    />
  );
}
