import type { Location, Service } from "engine";
import { clampMetaTitle, getVariantIndex, maybeAddNearMeMetaTitle } from "engine";
import { services } from "@/lib/data";
import { getL4StrikingDistanceTarget } from "@/data/l4StrikingDistance";

const VERTICAL_LABEL = "Groundwork Contractors";

type GroundworksServiceSlug = (typeof services)[number]["slug"];

const GROUNDWORKS_L4_TITLE_TEMPLATES: Record<GroundworksServiceSlug, [string, string]> = Object.fromEntries(
  services.map((service) => [
    service.slug,
    [
      `${service.title} in {location} | Local Groundworks Company`,
      `${service.title} in {location} | Trusted Local Groundworks Company`,
    ] as [string, string],
  ])
) as Record<GroundworksServiceSlug, [string, string]>;

function applyLocation(template: string, locationName: string): string {
  return template.replace(/\{location\}/g, locationName);
}

export function pickGroundworksL4MetaTitle(service: Service, location: Location): string {
  const strikingDistanceTarget = getL4StrikingDistanceTarget(service.slug, location.id);
  if (strikingDistanceTarget?.metaTitleOverride) {
    return clampMetaTitle(maybeAddNearMeMetaTitle(strikingDistanceTarget.metaTitleOverride));
  }
  const locName = location.name;
  const pair = GROUNDWORKS_L4_TITLE_TEMPLATES[service.slug as GroundworksServiceSlug];
  if (!pair) {
    const base = `${service.title} in ${locName} | Local Groundworks Company`;
    return clampMetaTitle(maybeAddNearMeMetaTitle(base));
  }
  const idx = getVariantIndex(`l4-meta-title:${service.slug}:${location.id}`, 2);
  const raw = applyLocation(pair[idx], locName);
  return clampMetaTitle(maybeAddNearMeMetaTitle(raw));
}
