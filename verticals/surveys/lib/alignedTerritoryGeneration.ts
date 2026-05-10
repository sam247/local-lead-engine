import type { Location, Service } from "engine";
import { alignedContractorTerritoryLocationIds } from "../../../engine/data/aligned-contractor-territory-locations";

const SURVEYS_ALIGNED_SERVICE_SLUGS = new Set([
  "topographical-survey",
  "utility-survey",
  "measured-building-survey",
  "boundary-survey",
  "building-surveys",
  "utility-mapping-survey",
]);

export function surveysAllowsServiceForLocation(locationId: string, serviceSlug: string): boolean {
  if (!alignedContractorTerritoryLocationIds.has(locationId)) return true;
  return SURVEYS_ALIGNED_SERVICE_SLUGS.has(serviceSlug);
}

export function generateSurveysServiceLocationStaticParams(locations: Location[], services: Service[]) {
  return locations.flatMap((location) => {
    const eligible = services.filter((s) => surveysAllowsServiceForLocation(location.id, s.slug));
    return eligible.map((service) => ({
      serviceSlug: service.slug,
      locationSlug: location.id,
    }));
  });
}
