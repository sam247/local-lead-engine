import type { Location, Service } from "engine";
import { alignedContractorTerritoryLocationIds } from "../../../engine/data/aligned-contractor-territory-locations";

const DRAINS_ALIGNED_SERVICE_SLUGS = new Set([
  "soakaway-installation",
  "attenuation-systems",
  "site-drainage",
  "surface-water-drainage",
  "suds-drainage",
  "cctv-drain-surveys",
]);

export function drainsAllowsServiceForLocation(locationId: string, serviceSlug: string): boolean {
  if (!alignedContractorTerritoryLocationIds.has(locationId)) return true;
  return DRAINS_ALIGNED_SERVICE_SLUGS.has(serviceSlug);
}

export function generateDrainsServiceLocationStaticParams(locations: Location[], services: Service[]) {
  return locations.flatMap((location) => {
    const eligible = services.filter((s) => drainsAllowsServiceForLocation(location.id, s.slug));
    return eligible.map((service) => ({
      serviceSlug: service.slug,
      locationSlug: location.id,
    }));
  });
}
