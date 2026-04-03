import type { Location, Service } from "engine";
import { clampMetaTitle, getVariantIndex, maybeAddNearMeMetaTitle } from "engine";
import { services } from "@/lib/data";

/** Fixed label for fallback titles only (plan: drains). */
const VERTICAL_LABEL = "Drain Specialists";

type DrainServiceSlug = (typeof services)[number]["slug"];

const DRAIN_L4_TITLE_TEMPLATES: Record<DrainServiceSlug, [string, string]> = {
  "drain-collapse-repair": [
    `Collapsed Drain Repair {location} - Fast Diagnosis & Expert Repairs`,
    `Collapsed Drain Repair {location} - CCTV Checks & Same-Day Help`,
  ],
  "drain-relining": [
    `Drain Relining {location} - No-Dig Repairs & Clear Pricing`,
    `Drain Relining {location} - Less Disruption & Fixed Quotes`,
  ],
  "cctv-drain-surveys": [
    `CCTV Drain Survey {location} - Fixed Price Surveys & Fast Reports`,
    `CCTV Drain Survey {location} - Fast Reports & Clear Findings`,
  ],
  "drain-excavation": [
    `Drain Excavation {location} - Full Repairs & Clear Reinstatement`,
    `Drain Excavation {location} - Expert Repairs & Clear Pricing`,
  ],
  "emergency-drainage": [
    `Emergency Drainage {location} - Fast Response & 24/7 Help`,
    `Emergency Drainage {location} - Same-Day Help & Expert Engineers`,
  ],
  "blocked-drains": [
    `Blocked Drains {location} - Fast Clearance & Same-Day Help`,
    `Blocked Drains {location} - Rapid Unblocking & Clear Pricing`,
  ],
  "drain-jetting": [
    `Drain Jetting {location} - Fast Clearance & Same-Day Service`,
    `Drain Jetting {location} - Powerful Cleaning & Clear Pricing`,
  ],
  "drain-root-removal": [
    `Drain Root Removal {location} - Fast Clearance & Lasting Repairs`,
    `Drain Root Removal {location} - Specialist Cutting & Clear Pricing`,
  ],
  "drain-unblocking": [
    `Drain Unblocking {location} - Fast Response & Same-Day Help`,
    `Drain Unblocking {location} - Rapid Clearance & Clear Pricing`,
  ],
  "drain-pipe-replacement": [
    `Drain Pipe Replacement {location} - Reliable Repairs & Clear Quotes`,
    `Drain Pipe Replacement {location} - New Pipe Runs & Fixed Pricing`,
  ],
  "commercial-drainage": [
    `Commercial Drainage {location} - Reliable Support & Fast Response`,
    `Commercial Drainage {location} - Planned Works & Clear Pricing`,
  ],
};

export function pickDrainsL4MetaTitle(service: Service, location: Location): string {
  const locName = location.name;
  const pair = DRAIN_L4_TITLE_TEMPLATES[service.slug as DrainServiceSlug];
  if (!pair) {
    const base = `${service.titleSingular ?? service.title} ${locName} - Fast Response & ${VERTICAL_LABEL}`;
    return clampMetaTitle(maybeAddNearMeMetaTitle(base));
  }
  const idx = getVariantIndex(`l4-meta-title:${service.slug}:${location.id}`, 2);
  const raw = pair[idx].replace(/\{location\}/g, locName);
  return clampMetaTitle(maybeAddNearMeMetaTitle(raw));
}
