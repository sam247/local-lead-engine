import { ServiceAreasHub } from "engine";
import { locations } from "@/lib/data";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const PRIMARY_SERVICE_SLUG = "access-control-systems";

export const metadata: Metadata = {
  title: "Service Areas | Mainline Access",
  description:
    "Access control and security systems across the UK. Find security installation and support in your area.",
  alternates: { canonical: "https://mainlineaccess.co.uk/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <ServiceAreasHub
      primaryServiceSlug={PRIMARY_SERVICE_SLUG}
      locations={locations}
      heroTitle="Security & Access Control Across the UK"
      heroSubtitle="Access control, CCTV and integrated security systems in towns and cities nationwide."
      introTitle="Coverage by region"
      introBody="See where we deliver access and security work, grouped by region. Each area page explains local coverage and how to scope your installation."
      browseMoreHref="/access-control-systems-near-me"
      browseMoreLabel="Find access control near you"
    />
  );
}
