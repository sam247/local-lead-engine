import { alignedContractorTerritoryLocationIds } from "../../../engine/data/aligned-contractor-territory-locations";
import type { Location, Service } from "engine";

export const STRATEGIC_MICRO_LOCATION_IDS = new Set([
  "chislehurst",
  "sidcup",
  "bickley",
  "mottingham",
  "new-eltham",
]);

const STRATEGIC_MICRO_SERVICE_SLUGS = new Set([
  "commercial-groundworks",
  "earthworks",
  "roads-and-sewers",
  "attenuation-systems",
  "excavation-contractors",
  "foundation-contractors",
  "mini-piling-contractors",
  "piling-contractors",
  "enabling-works-contractors",
]);

const STRATEGIC_MICRO_TOPIC_SLUGS = new Set([
  "bulk-excavation-services",
  "piling-foundations",
  "foundation-underpinning",
  "retaining-wall-construction",
  "groundworks-for-extensions",
  "groundworks-for-developments",
  "groundworks-and-enabling-works",
]);

/** Groundworks commercial/structural L4 slugs permitted on appendix territory IDs. */
const ALIGNED_CONTRACTOR_SERVICE_SLUGS = new Set([
  "foundation-contractors",
  "underpinning",
  "piling-contractors",
  "mini-piling-contractors",
  "excavation-contractors",
  "enabling-works-contractors",
  "commercial-groundworks",
  "earthworks",
  "roads-and-sewers",
  "attenuation-systems",
  "ground-investigation-services",
]);

const ALIGNED_CONTRACTOR_TOPIC_SLUGS = new Set([
  "foundation-underpinning",
  "piling-foundations",
  "retaining-wall-construction",
  "bulk-excavation-services",
  "groundworks-for-extensions",
  "groundworks-for-developments",
  "groundworks-and-enabling-works",
  "ground-investigation",
  "soil-testing-services",
]);

export function isStrategicMicroLocation(locationId: string): boolean {
  return STRATEGIC_MICRO_LOCATION_IDS.has(locationId);
}

export function groundworksAllowsServiceSlugForLocation(locationId: string, serviceSlug: string): boolean {
  if (STRATEGIC_MICRO_LOCATION_IDS.has(locationId)) {
    return STRATEGIC_MICRO_SERVICE_SLUGS.has(serviceSlug);
  }
  if (alignedContractorTerritoryLocationIds.has(locationId)) {
    return ALIGNED_CONTRACTOR_SERVICE_SLUGS.has(serviceSlug);
  }
  return true;
}

export function groundworksAllowsTopicSlugForLocation(locationId: string, topicSlug: string): boolean {
  if (STRATEGIC_MICRO_LOCATION_IDS.has(locationId)) {
    return STRATEGIC_MICRO_TOPIC_SLUGS.has(topicSlug);
  }
  if (alignedContractorTerritoryLocationIds.has(locationId)) {
    return ALIGNED_CONTRACTOR_TOPIC_SLUGS.has(topicSlug);
  }
  return true;
}

export function generateGroundworksServiceLocationStaticParams(locations: Location[], services: Service[]) {
  return locations.flatMap((location) => {
    const eligible = services.filter((s) => groundworksAllowsServiceSlugForLocation(location.id, s.slug));
    return eligible.map((service) => ({
      serviceSlug: service.slug,
      locationSlug: location.id,
    }));
  });
}

/** Structural / reinforced commercial-copy cluster (Kent/Surrey/London fringe + appendix + adjacent counties). */
export function isGroundworksStructuralClusterLocation(location: Location): boolean {
  if (
    STRATEGIC_MICRO_LOCATION_IDS.has(location.id) ||
    alignedContractorTerritoryLocationIds.has(location.id)
  ) {
    return true;
  }
  if (/kent|surrey|south london|south east london/i.test(location.area)) {
    return true;
  }
  if (
    /hertfordshire|bedfordshire|buckinghamshire|east sussex|west sussex|berkshire/i.test(location.area.trim())
  ) {
    return true;
  }
  return false;
}
