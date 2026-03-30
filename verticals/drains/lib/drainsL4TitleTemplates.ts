import type { Location, Service } from "engine";
import { clampMetaTitle, getVariantIndex } from "engine";
import { services } from "@/lib/data";

/** Fixed label for fallback titles only (plan: drains). */
const VERTICAL_LABEL = "Drain Specialists";

type DrainServiceSlug = (typeof services)[number]["slug"];

const DRAIN_L4_TITLE_TEMPLATES: Record<DrainServiceSlug, [string, string]> = {
  "drain-collapse-repair": [
    `Collapsed drain repair in {location} | Fast site quotes`,
    `Fix collapsed drains in {location} | CCTV-led repairs`,
  ],
  "drain-relining": [
    `No-dig drain relining in {location} | Trenchless fix`,
    `Relined drains for {location} | Less disruption`,
  ],
  "cctv-drain-surveys": [
    `CCTV drain surveys in {location} | Clear diagnosis`,
    `Camera drain inspection in {location} | Written report`,
  ],
  "drain-excavation": [
    `Drain excavation in {location} | Open-cut repairs`,
    `Excavation & replacement in {location} | Full reinstatement`,
  ],
  "emergency-drainage": [
    `24/7 emergency drainage in {location} | Rapid response`,
    `Urgent drain faults in {location} | Same-day attendance`,
  ],
  "blocked-drains": [
    `Blocked drains cleared in {location} | Jetting & checks`,
    `Slow or blocked drains in {location} | Fast clearance`,
  ],
  "drain-jetting": [
    `High-pressure drain jetting in {location} | Deep clean`,
    `Jetting for stubborn blockages in {location} | Full bore flush`,
  ],
  "drain-root-removal": [
    `Tree root removal from drains in {location} | Cut & clear`,
    `Roots in pipework in {location} | Mechanical removal`,
  ],
  "drain-unblocking": [
    `Drain unblocking in {location} | Same-day options`,
    `Blocked lines cleared in {location} | CCTV follow-up`,
  ],
  "drain-pipe-replacement": [
    `Drain pipe replacement in {location} | New pipe runs`,
    `Replace failed drain runs in {location} | Fixed pricing after survey`,
  ],
  "commercial-drainage": [
    `Commercial drainage in {location} | Planned & emergency`,
    `Business drainage contracts in {location} | Compliance support`,
  ],
};

export function pickDrainsL4MetaTitle(service: Service, location: Location): string {
  const locName = location.name;
  const pair = DRAIN_L4_TITLE_TEMPLATES[service.slug as DrainServiceSlug];
  if (!pair) {
    const base = `${service.titleSingular ?? service.title} in ${locName} | Local ${VERTICAL_LABEL}`;
    return clampMetaTitle(base);
  }
  const idx = getVariantIndex(`l4-meta-title:${service.slug}:${location.id}`, 2);
  const raw = pair[idx].replace(/\{location\}/g, locName);
  return clampMetaTitle(raw);
}
