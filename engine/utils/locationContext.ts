export interface BuildLocationContextParams {
  serviceTitle: string;
  locationName: string;
  area: string;
  nearbyTowns: string[];
}

/**
 * Replaces placeholders in a template with location context values.
 * Placeholders: {serviceTitle}, {locationName}, {area}, {nearbyTowns}.
 * nearbyTowns is formatted as a readable list (e.g. "X, Y and Z").
 */
export function buildLocationContextParagraph(
  template: string,
  params: BuildLocationContextParams
): string {
  const { serviceTitle, locationName, area, nearbyTowns } = params;
  const nearbyTownsText =
    nearbyTowns.length <= 1
      ? nearbyTowns[0] ?? ""
      : nearbyTowns.length === 2
        ? `${nearbyTowns[0]} and ${nearbyTowns[1]}`
        : `${nearbyTowns.slice(0, -1).join(", ")} and ${nearbyTowns[nearbyTowns.length - 1]}`;

  return template
    .replace(/\{serviceTitle\}/g, serviceTitle)
    .replace(/\{locationName\}/g, locationName)
    .replace(/\{area\}/g, area)
    .replace(/\{nearbyTowns\}/g, nearbyTownsText);
}
