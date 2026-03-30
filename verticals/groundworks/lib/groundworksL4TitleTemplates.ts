import type { Location, Service } from "engine";
import { clampMetaTitle, getVariantIndex } from "engine";
import { services } from "@/lib/data";

const VERTICAL_LABEL = "Groundwork Contractors";

type GroundworksServiceSlug = (typeof services)[number]["slug"];

const GROUNDWORKS_L4_TITLE_TEMPLATES: Record<GroundworksServiceSlug, [string, string]> = {
  "groundworks-contractors": [
    `Groundworks contractors in {location} | Full packages`,
    `Site groundworks for {location} | Excavation to handover`,
  ],
  underpinning: [
    `Underpinning contractors in {location} | Stabilise movement`,
    `Structural underpinning in {location} | Engineer-led work`,
  ],
  "piling-contractors": [
    `Piling contractors in {location} | Foundations & rigs`,
    `Piled foundations in {location} | Ground model led`,
  ],
  "cfa-piling": [
    `CFA piling in {location} | Low-vibration urban work`,
    `Continuous flight auger piling in {location} | Tight sites`,
  ],
  "mini-piling-contractors": [
    `Mini piling in {location} | Low headroom & access`,
    `Section & mini CFA piles in {location} | Domestic & commercial`,
  ],
  "foundation-contractors": [
    `Foundation contractors in {location} | Strip, pad & raft`,
    `New foundations in {location} | Design coordination`,
  ],
  "foundation-repair": [
    `Foundation repair in {location} | Cracks & movement`,
    `Stabilise failing foundations in {location} | Scoped repairs`,
  ],
  "concrete-repair": [
    `Concrete repair in {location} | Structural patch works`,
    `Spalled concrete fixed in {location} | Spec-compliant`,
  ],
  "excavation-contractors": [
    `Excavation contractors in {location} | Bulk & trench`,
    `Earthworks & trenching in {location} | Programme-led`,
  ],
  "site-clearance-contractors": [
    `Site clearance in {location} | Demolition & vegetation`,
    `Clear & level sites in {location} | Waste tickets`,
  ],
  "concrete-foundations": [
    `Concrete foundations in {location} | Pour & reinforcement`,
    `Ground beams & blinding in {location} | Cube records`,
  ],
  "enabling-works-contractors": [
    `Enabling works in {location} | Access & temp drainage`,
    `Site set-up before main build in {location} | Early programme`,
  ],
};

function applyLocation(template: string, locationName: string): string {
  return template.replace(/\{location\}/g, locationName);
}

export function pickGroundworksL4MetaTitle(service: Service, location: Location): string {
  const locName = location.name;
  const pair = GROUNDWORKS_L4_TITLE_TEMPLATES[service.slug as GroundworksServiceSlug];
  if (!pair) {
    const base = `${service.titleSingular ?? service.title} in ${locName} | Local ${VERTICAL_LABEL}`;
    return clampMetaTitle(base);
  }
  const idx = getVariantIndex(`l4-meta-title:${service.slug}:${location.id}`, 2);
  const raw = applyLocation(pair[idx], locName);
  return clampMetaTitle(raw);
}
