import { ServiceAreasHub } from "engine";
import { locations } from "@/lib/data";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const PRIMARY_SERVICE_SLUG = "topographical-survey";

export const metadata: Metadata = {
  title: "Service Areas | Mainline Surveys",
  description:
    "Land and drone survey services across the UK. Find topographical, measured building, utility and drone surveys in your area.",
  alternates: { canonical: "https://mainlinesurveys.co.uk/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <ServiceAreasHub
      primaryServiceSlug={PRIMARY_SERVICE_SLUG}
      locations={locations}
      heroTitle="Land & Drone Survey Services Across the UK"
      heroSubtitle="Topographical, measured building, utility and drone surveys in towns and cities nationwide."
      introTitle="Coverage by region"
      introBody="Explore areas we survey, grouped by region. Each link leads to local survey context and next steps for your site or project."
      browseMoreHref="/topographical-survey-near-me"
      browseMoreLabel="Find topographical survey near you"
    />
  );
}
