import type { Location, Service } from "engine";
import { clampMetaTitle, getVariantIndex, maybeAddNearMeMetaTitle } from "engine";
import { services } from "@/lib/data";
import { getL4StrikingDistanceTarget } from "@/data/l4StrikingDistance";

const VERTICAL_LABEL = "Access Control Specialists";

type AccessServiceSlug = (typeof services)[number]["slug"];

const ACCESS_L4_TITLE_TEMPLATES: Record<AccessServiceSlug, [string, string]> = {
  "access-control-systems": [
    `Access Control Systems {location} - Secure Entry & Clear Quotes`,
    `Access Control Systems {location} - Reliable Security & Fast Surveys`,
  ],
  "commercial-cctv-installation": [
    `Commercial CCTV Installation {location} - Reliable Coverage & Fast Surveys`,
    `Commercial CCTV Installation {location} - Clear Imaging & Trusted Installers`,
  ],
  "ip-camera-systems": [
    `IP Camera Systems {location} - Clear Coverage & Reliable Installers`,
    `IP Camera Systems {location} - Smart Security & Fast Surveys`,
  ],
  "perimeter-security-systems": [
    `Perimeter Security Systems {location} - Stronger Protection & Clear Quotes`,
    `Perimeter Security Systems {location} - Reliable Detection & Fast Surveys`,
  ],
  "security-system-integration": [
    `Security System Integration {location} - Joined-Up Control & Clear Quotes`,
    `Security System Integration {location} - Faster Response & Trusted Specialists`,
  ],
};

function applyLocation(template: string, locationName: string): string {
  return template.replace(/\{location\}/g, locationName);
}

export function pickAccessL4MetaTitle(service: Service, location: Location): string {
  const strikingDistanceTarget = getL4StrikingDistanceTarget(service.slug, location.id);
  if (strikingDistanceTarget?.metaTitleOverride) {
    return clampMetaTitle(maybeAddNearMeMetaTitle(strikingDistanceTarget.metaTitleOverride));
  }
  const locName = location.name;
  const pair = ACCESS_L4_TITLE_TEMPLATES[service.slug as AccessServiceSlug];
  if (!pair) {
    const base = `${service.titleSingular ?? service.title} ${locName} - Reliable Security & ${VERTICAL_LABEL}`;
    return clampMetaTitle(maybeAddNearMeMetaTitle(base));
  }
  const idx = getVariantIndex(`l4-meta-title:${service.slug}:${location.id}`, 2);
  const raw = applyLocation(pair[idx], locName);
  return clampMetaTitle(maybeAddNearMeMetaTitle(raw));
}
