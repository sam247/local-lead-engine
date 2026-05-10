import { MAINLINE_GROUP_DIVISIONS } from "../../../engine/data/mainline-group";
import { alignedContractorTerritoryLocationIds } from "../../../engine/data/aligned-contractor-territory-locations";

function divisionBaseUrl(divisionNameIncludes: string): string {
  const d = MAINLINE_GROUP_DIVISIONS.find((x) => x.name.includes(divisionNameIncludes));
  return (d?.baseUrl ?? "").replace(/\/$/, "");
}

const DRAINS_ALIGNED_ECOSYSTEM_SLUGS = new Set([
  "soakaway-installation",
  "attenuation-systems",
  "site-drainage",
  "surface-water-drainage",
  "suds-drainage",
]);

export function getDrainsEcosystemExternalLinks(opts: {
  locationId: string;
  locationName: string;
  serviceSlug: string;
}): { label: string; href: string }[] | undefined {
  if (!alignedContractorTerritoryLocationIds.has(opts.locationId)) return undefined;
  if (!DRAINS_ALIGNED_ECOSYSTEM_SLUGS.has(opts.serviceSlug)) return undefined;

  const gwBase = divisionBaseUrl("Groundworks");
  const surveysBase = divisionBaseUrl("Surveys");
  if (!gwBase || !surveysBase) return undefined;

  const lid = opts.locationId;
  return [
    {
      label: `Commercial groundworks coordination in ${opts.locationName} (Mainline Groundworks)`,
      href: `${gwBase}/commercial-groundworks/${lid}`,
    },
    {
      label: `Utility mapping surveys in ${opts.locationName} (Mainline Surveys)`,
      href: `${surveysBase}/utility-survey/${lid}`,
    },
  ];
}
