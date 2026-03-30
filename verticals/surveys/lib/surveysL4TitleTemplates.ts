import type { Location, Service } from "engine";
import { clampMetaTitle, getVariantIndex } from "engine";
import { services } from "@/lib/data";

const VERTICAL_LABEL = "Surveyors";

type SurveysServiceSlug = (typeof services)[number]["slug"];

const SURVEYS_L4_TITLE_TEMPLATES: Record<SurveysServiceSlug, [string, string]> = {
  "topographical-survey": [
    `Topographical survey in {location} | Levels & contours`,
    `Land topo for {location} | CAD-ready drawings`,
  ],
  "measured-building-survey": [
    `Measured building survey in {location} | Plans & elevations`,
    `As-built surveys in {location} | Refurb & extension`,
  ],
  "utility-survey": [
    `Utility survey in {location} | GPR & EML locate`,
    `Buried services in {location} | Pre-excavation`,
  ],
  "utility-mapping-survey": [
    `Utility mapping in {location} | Coordinated plans`,
    `Subsurface utilities for {location} | Major sites`,
  ],
  "boundary-survey": [
    `Boundary survey in {location} | Title-aligned plans`,
    `Legal boundary work in {location} | Clear drawings`,
  ],
  "laser-scanning-survey": [
    `Laser scanning in {location} | Point clouds & BIM`,
    `3D scan surveys in {location} | Complex buildings`,
  ],
  "drone-survey": [
    `Drone survey in {location} | Fast aerial capture`,
    `UAV mapping in {location} | Orthos & volumes`,
  ],
  "drone-roof-inspection": [
    `Drone roof inspection in {location} | No scaffolding`,
    `Aerial roof survey in {location} | Defect photos`,
  ],
  "drone-building-inspection": [
    `Drone façade inspection in {location} | High-level checks`,
    `External building drone survey in {location} | Safe access`,
  ],
  "drone-topographical-survey": [
    `Drone topo survey in {location} | Large open sites`,
    `Aerial topo for {location} | DTM & contours`,
  ],
  "drone-construction-survey": [
    `Construction drone survey in {location} | Progress & volumes`,
    `Site progress drones in {location} | Repeatable data`,
  ],
  "building-surveys": [
    `Building survey in {location} | Pre-purchase clarity`,
    `Property condition survey in {location} | Defects & risks`,
  ],
  "party-wall-surveyors": [
    `Party wall surveyor in {location} | Notices & awards`,
    `Party Wall Act advice in {location} | Neighbouring sites`,
  ],
};

function applyLocation(template: string, locationName: string): string {
  return template.replace(/\{location\}/g, locationName);
}

export function pickSurveysL4MetaTitle(service: Service, location: Location): string {
  const locName = location.name;
  const pair = SURVEYS_L4_TITLE_TEMPLATES[service.slug as SurveysServiceSlug];
  if (!pair) {
    const base = `${service.titleSingular ?? service.title} in ${locName} | Local ${VERTICAL_LABEL}`;
    return clampMetaTitle(base);
  }
  const idx = getVariantIndex(`l4-meta-title:${service.slug}:${location.id}`, 2);
  const raw = applyLocation(pair[idx], locName);
  return clampMetaTitle(raw);
}
