import type { Location, Service } from "engine";
import { clampMetaTitle, getVariantIndex, maybeAddNearMeMetaTitle } from "engine";
import { services } from "@/lib/data";
import { getL4StrikingDistanceTarget } from "@/data/l4StrikingDistance";

const VERTICAL_LABEL = "Surveyors";

type SurveysServiceSlug = (typeof services)[number]["slug"];

const SURVEYS_L4_TITLE_TEMPLATES: Record<SurveysServiceSlug, [string, string]> = {
  "topographical-survey": [
    `Topographical Survey {location} - Accurate Plans & Fast Delivery`,
    `Topographical Survey {location} - Planning-Ready Drawings & Clear Quotes`,
  ],
  "measured-building-survey": [
    `Measured Building Survey {location} - Accurate Plans & Fast Delivery`,
    `Measured Building Survey {location} - Clear Drawings & Reliable Turnaround`,
  ],
  "utility-survey": [
    `Utility Survey {location} - Clear Site Data & Fast Turnaround`,
    `Utility Survey {location} - Safer Dig Planning & Reliable Reports`,
  ],
  "utility-mapping-survey": [
    `Utility Mapping Survey {location} - Accurate Plans & Fast Reports`,
    `Utility Mapping Survey {location} - Clear Site Data & Reliable Delivery`,
  ],
  "boundary-survey": [
    `Boundary Survey {location} - Clear Plans & Reliable Advice`,
    `Boundary Survey {location} - Accurate Boundaries & Fast Turnaround`,
  ],
  "laser-scanning-survey": [
    `Laser Scanning Survey {location} - Accurate Point Clouds & Fast Delivery`,
    `Laser Scanning Survey {location} - Detailed 3D Data & Clear Quotes`,
  ],
  "drone-survey": [
    `Drone Survey {location} - Fast Site Capture & Clear Reports`,
    `Drone Survey {location} - Accurate Aerial Data & Reliable Turnaround`,
  ],
  "drone-roof-inspection": [
    `Drone Roof Inspection {location} - Fast Checks & Clear Images`,
    `Drone Roof Inspection {location} - Safe Access & Fast Reports`,
  ],
  "drone-building-inspection": [
    `Drone Building Inspection {location} - Safe Checks & Fast Reports`,
    `Drone Building Inspection {location} - High-Level Access & Clear Images`,
  ],
  "drone-topographical-survey": [
    `Drone Topographical Survey {location} - Fast Coverage & Accurate Data`,
    `Drone Topographical Survey {location} - Large-Site Capture & Clear Reports`,
  ],
  "drone-construction-survey": [
    `Construction Drone Survey {location} - Fast Progress Data & Clear Reporting`,
    `Construction Drone Survey {location} - Reliable Site Capture & Fast Turnaround`,
  ],
  "building-surveys": [
    `Building Surveys {location} - Clear Findings & Reliable Advice`,
    `Building Surveys {location} - Fast Reports & Specialist Guidance`,
  ],
  "party-wall-surveyors": [
    `Party Wall Surveyors {location} - Clear Advice & Reliable Support`,
    `Party Wall Surveyors {location} - Fast Guidance & Expert Help`,
  ],
};

function applyLocation(template: string, locationName: string): string {
  return template.replace(/\{location\}/g, locationName);
}

export function pickSurveysL4MetaTitle(service: Service, location: Location): string {
  const strikingDistanceTarget = getL4StrikingDistanceTarget(service.slug, location.id);
  if (strikingDistanceTarget?.metaTitleOverride) {
    return clampMetaTitle(maybeAddNearMeMetaTitle(strikingDistanceTarget.metaTitleOverride));
  }
  const locName = location.name;
  const pair = SURVEYS_L4_TITLE_TEMPLATES[service.slug as SurveysServiceSlug];
  if (!pair) {
    const base = `${service.titleSingular ?? service.title} ${locName} - Fast Turnaround & ${VERTICAL_LABEL}`;
    return clampMetaTitle(maybeAddNearMeMetaTitle(base));
  }
  const idx = getVariantIndex(`l4-meta-title:${service.slug}:${location.id}`, 2);
  const raw = applyLocation(pair[idx], locName);
  return clampMetaTitle(maybeAddNearMeMetaTitle(raw));
}
