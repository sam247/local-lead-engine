import { MAINLINE_GROUP_DIVISIONS } from "../../../engine/data/mainline-group";
import { alignedContractorTerritoryLocationIds } from "../../../engine/data/aligned-contractor-territory-locations";

function divisionBaseUrl(divisionNameIncludes: string): string {
  const d = MAINLINE_GROUP_DIVISIONS.find((x) => x.name.includes(divisionNameIncludes));
  return (d?.baseUrl ?? "").replace(/\/$/, "");
}

const STRUCTURAL_ECOSYSTEM_SERVICE_SLUGS = new Set([
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
]);

/** Sparse cross-division URLs for appendix territory + structural/high-package services only. */
export function getGroundworksEcosystemExternalLinks(opts: {
  locationId: string;
  locationName: string;
  serviceSlug: string;
}): { label: string; href: string }[] | undefined {
  if (!alignedContractorTerritoryLocationIds.has(opts.locationId)) return undefined;
  if (!STRUCTURAL_ECOSYSTEM_SERVICE_SLUGS.has(opts.serviceSlug)) return undefined;

  const surveysBase = divisionBaseUrl("Surveys");
  const drainsBase = divisionBaseUrl("Drains");
  if (!surveysBase || !drainsBase) return undefined;

  const lid = opts.locationId;
  return [
    {
      label: `Topographical surveys in ${opts.locationName} (Mainline Surveys)`,
      href: `${surveysBase}/topographical-survey/${lid}`,
    },
    {
      label: `Drainage attenuation packages in ${opts.locationName} (Mainline Drains)`,
      href: `${drainsBase}/attenuation-systems/${lid}`,
    },
  ];
}
