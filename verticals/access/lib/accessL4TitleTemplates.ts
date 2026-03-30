import type { Location, Service } from "engine";
import { clampMetaTitle, getVariantIndex } from "engine";
import { services } from "@/lib/data";

const VERTICAL_LABEL = "Access Control Specialists";

type AccessServiceSlug = (typeof services)[number]["slug"];

const ACCESS_L4_TITLE_TEMPLATES: Record<AccessServiceSlug, [string, string]> = {
  "access-control-systems": [
    `Access control systems in {location} | Design & install`,
    `Door & gate access in {location} | Commercial fit-out`,
  ],
  "commercial-cctv-installation": [
    `Commercial CCTV installation in {location} | HD & IP`,
    `Business CCTV in {location} | Coverage & recording`,
  ],
  "ip-camera-systems": [
    `IP camera systems in {location} | PoE & VMS`,
    `Network CCTV in {location} | Scalable estates`,
  ],
  "perimeter-security-systems": [
    `Perimeter security in {location} | Detection & response`,
    `Boundary protection in {location} | Outdoor sensors`,
  ],
  "security-system-integration": [
    `Integrated security in {location} | One platform`,
    `Unified CCTV & access in {location} | Faster response`,
  ],
};

function applyLocation(template: string, locationName: string): string {
  return template.replace(/\{location\}/g, locationName);
}

export function pickAccessL4MetaTitle(service: Service, location: Location): string {
  const locName = location.name;
  const pair = ACCESS_L4_TITLE_TEMPLATES[service.slug as AccessServiceSlug];
  if (!pair) {
    const base = `${service.titleSingular ?? service.title} in ${locName} | Local ${VERTICAL_LABEL}`;
    return clampMetaTitle(base);
  }
  const idx = getVariantIndex(`l4-meta-title:${service.slug}:${location.id}`, 2);
  const raw = applyLocation(pair[idx], locName);
  return clampMetaTitle(raw);
}
