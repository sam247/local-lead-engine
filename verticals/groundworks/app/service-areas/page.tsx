import { ServiceAreasHub } from "engine";
import { locations } from "@/lib/data";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const PRIMARY_SERVICE_SLUG = "groundworks-contractors";

export const metadata: Metadata = {
  title: "Service Areas | Mainline Groundworks",
  description:
    "Groundworks services across the UK. Find piling, excavation, foundations and site preparation in your area.",
  alternates: { canonical: "https://mainlinegroundworks.co.uk/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <ServiceAreasHub
      primaryServiceSlug={PRIMARY_SERVICE_SLUG}
      locations={locations}
      heroTitle="Groundworks & Civil Engineering Across the UK"
      heroSubtitle="Piling, excavation, foundations, site clearance and enabling works in major towns and cities."
      introTitle="Coverage by region"
      introBody="Key groundworks locations grouped by region. Follow a link for local context on piling, foundations, excavation and site preparation in that area."
      browseMoreHref="/groundworks-contractors-near-me"
      browseMoreLabel="Find groundworks contractors near you"
    />
  );
}
