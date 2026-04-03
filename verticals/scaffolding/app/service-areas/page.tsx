import { ServiceAreasHub } from "engine";
import { locations } from "@/lib/data";
import { verticalConfig } from "@/config";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: `Service Areas | ${verticalConfig.siteName}`,
  description: "Scaffolding services across the UK. Find domestic, commercial and specialist scaffolding contractors in your area.",
  alternates: { canonical: `${verticalConfig.baseUrl}/service-areas` },
};

export default function ServiceAreasPage() {
  return (
    <ServiceAreasHub
      primaryServiceSlug="scaffolding-contractors"
      locations={locations}
      heroTitle="Scaffolding Contractors Across the UK"
      heroSubtitle="Domestic, commercial and specialist scaffolding in major towns and cities."
      introTitle="Coverage by region"
      introBody="Key scaffolding locations grouped by region. Follow a link for local information and contact options for scaffolding in that area."
      browseMoreHref="/scaffolding-contractors-near-me"
      browseMoreLabel="Find scaffolding contractors near you"
    />
  );
}
