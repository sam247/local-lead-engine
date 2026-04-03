import type { Location, Service } from "engine";
import { clampMetaTitle, getVariantIndex, maybeAddNearMeMetaTitle } from "engine";
import { services } from "@/lib/data";

const VERTICAL_LABEL = "Groundwork Contractors";

type GroundworksServiceSlug = (typeof services)[number]["slug"];

const GROUNDWORKS_L4_TITLE_TEMPLATES: Record<GroundworksServiceSlug, [string, string]> = {
  "groundworks-contractors": [
    `Groundworks Contractors {location} - Reliable Site Prep & Fast Turnaround`,
    `Groundworks Contractors {location} - Full Packages & Clear Quotes`,
  ],
  underpinning: [
    `Underpinning Contractors {location} - Structural Repairs & Clear Quotes`,
    `Underpinning Contractors {location} - Reliable Stabilisation & Fast Advice`,
  ],
  "piling-contractors": [
    `Piling Contractors {location} - Reliable Foundations & Fast Turnaround`,
    `Piling Contractors {location} - Specialist Ground Support & Clear Quotes`,
  ],
  "cfa-piling": [
    `CFA Piling {location} - Reliable Foundations & Fast Delivery`,
    `CFA Piling {location} - Low-Vibration Ground Support & Clear Quotes`,
  ],
  "mini-piling-contractors": [
    `Mini Piling Contractors {location} - Reliable Foundations & Fast Turnaround`,
    `Mini Piling Contractors {location} - Tight Access Solutions & Clear Quotes`,
  ],
  "foundation-contractors": [
    `Foundation Contractors {location} - Reliable Bases & Fast Turnaround`,
    `Foundation Contractors {location} - Accurate Ground Prep & Clear Quotes`,
  ],
  "foundation-repair": [
    `Foundation Repair {location} - Reliable Structural Fixes & Clear Quotes`,
    `Foundation Repair {location} - Crack Repairs & Fast Specialist Advice`,
  ],
  "concrete-repair": [
    `Concrete Repair {location} - Reliable Structural Repairs & Clear Quotes`,
    `Concrete Repair {location} - Fast Specialist Fixes & Trusted Workmanship`,
  ],
  "excavation-contractors": [
    `Excavation Contractors {location} - Reliable Ground Prep & Fast Turnaround`,
    `Excavation Contractors {location} - Bulk Digging & Clear Quotes`,
  ],
  "site-clearance-contractors": [
    `Site Clearance Contractors {location} - Fast Site Prep & Clear Quotes`,
    `Site Clearance Contractors {location} - Reliable Clearance & Trusted Teams`,
  ],
  "concrete-foundations": [
    `Concrete Foundations {location} - Reliable Bases & Clear Quotes`,
    `Concrete Foundations {location} - Fast Ground Prep & Trusted Installers`,
  ],
  "enabling-works-contractors": [
    `Enabling Works Contractors {location} - Fast Site Prep & Clear Quotes`,
    `Enabling Works Contractors {location} - Reliable Early Works & Trusted Teams`,
  ],
};

function applyLocation(template: string, locationName: string): string {
  return template.replace(/\{location\}/g, locationName);
}

export function pickGroundworksL4MetaTitle(service: Service, location: Location): string {
  const locName = location.name;
  const pair = GROUNDWORKS_L4_TITLE_TEMPLATES[service.slug as GroundworksServiceSlug];
  if (!pair) {
    const base = `${service.titleSingular ?? service.title} ${locName} - Fast Turnaround & ${VERTICAL_LABEL}`;
    return clampMetaTitle(maybeAddNearMeMetaTitle(base));
  }
  const idx = getVariantIndex(`l4-meta-title:${service.slug}:${location.id}`, 2);
  const raw = applyLocation(pair[idx], locName);
  return clampMetaTitle(maybeAddNearMeMetaTitle(raw));
}
