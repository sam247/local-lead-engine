import { MAINLINE_GROUP_DIVISIONS } from "../../../engine/data/mainline-group";
import { alignedContractorTerritoryLocationIds } from "../../../engine/data/aligned-contractor-territory-locations";

function divisionBaseUrl(divisionNameIncludes: string): string {
  const d = MAINLINE_GROUP_DIVISIONS.find((x) => x.name.includes(divisionNameIncludes));
  return (d?.baseUrl ?? "").replace(/\/$/, "");
}

const SURVEYS_ECOSYSTEM_SERVICE_SLUGS = new Set([
  "topographical-survey",
  "utility-survey",
  "utility-mapping-survey",
  "measured-building-survey",
  "boundary-survey",
  "building-surveys",
]);

export function getSurveysEcosystemExternalLinks(opts: {
  locationId: string;
  locationName: string;
  serviceSlug: string;
}): { label: string; href: string }[] | undefined {
  if (!alignedContractorTerritoryLocationIds.has(opts.locationId)) return undefined;
  if (!SURVEYS_ECOSYSTEM_SERVICE_SLUGS.has(opts.serviceSlug)) return undefined;

  const gwBase = divisionBaseUrl("Groundworks");
  const drainsBase = divisionBaseUrl("Drains");
  if (!gwBase || !drainsBase) return undefined;

  const lid = opts.locationId;
  return [
    {
      label: `Structural groundworks contractors in ${opts.locationName} (Mainline Groundworks)`,
      href: `${gwBase}/foundation-contractors/${lid}`,
    },
    {
      label: `Site drainage attenuation packages in ${opts.locationName} (Mainline Drains)`,
      href: `${drainsBase}/attenuation-systems/${lid}`,
    },
  ];
}
