import type { Service } from "engine";

export type GroundworksSectorSlug =
  | "commercial-developments"
  | "residential-developments"
  | "infrastructure-civils"
  | "industrial-sites"
  | "extensions-self-build"
  | "local-authority-public-works"
  | "utilities-drainage-infrastructure";

export type GroundworksSector = {
  slug: GroundworksSectorSlug;
  title: string;
  shortTitle: string;
  metaDescription: string;
  intro: string;
  body: string;
  relatedServiceSlugs: string[];
  relatedGuides: { title: string; href: string }[];
};

export const groundworksSectors: GroundworksSector[] = [
  {
    slug: "commercial-developments",
    title: "Commercial developments",
    shortTitle: "Commercial",
    metaDescription:
      "Groundworks, enabling works and infrastructure packages for offices, logistics, retail and mixed-use schemes. Mainline Groundworks UK.",
    intro:
      "Commercial schemes need programme-led groundworks: enabling access, formation levels, structural foundations, drainage interfaces and clear handover to the main contractor. We align scope with design information and sequencing so civils and substructure do not become the critical path.",
    body:
      "Typical packages include bulk excavation, piling coordination, attenuation and roads-and-sewers interfaces, site clearance and muck-away. We work with developers and main contractors where a single accountable groundworks partner reduces interface risk.",
    relatedServiceSlugs: [
      "commercial-groundworks",
      "enabling-works-contractors",
      "bulk-earthworks",
      "excavation-contractors",
      "foundation-contractors",
      "roads-and-sewers",
    ],
    relatedGuides: [
      { title: "Groundworks process", href: "/guides/groundworks-process" },
      { title: "Construction site preparation", href: "/guides/construction-site-preparation" },
      { title: "Groundworks costs overview", href: "/groundworks-costs/groundworks-cost-overview" },
    ],
  },
  {
    slug: "residential-developments",
    title: "Residential developments",
    shortTitle: "Residential",
    metaDescription:
      "Groundworks for housing developers: platforms, drainage adoption, roads and sewers, foundations and enabling works from Mainline Groundworks.",
    intro:
      "Residential development sites need coordinated reduced dig, plot drainage, adoptable infrastructure and formation readiness for plot handover. We deliver groundworks that match NHBC and warranty expectations and programme milestones.",
    body:
      "We support platforms, roads and sewers packages, attenuation and surface water control, foundation packages and site preparation. Work is sequenced around plot releases and main contractor access.",
    relatedServiceSlugs: [
      "groundworks-contractors",
      "site-preparation-services",
      "roads-and-sewers",
      "attenuation-systems",
      "foundation-contractors",
      "site-clearance-contractors",
    ],
    relatedGuides: [
      { title: "Planning drainage for new housing", href: "/construction-drainage/planning-drainage-new-housing" },
      { title: "Extension foundations guide", href: "/guides/extension-foundations-guide" },
      { title: "Budgeting for groundworks", href: "/groundworks-costs/budgeting-for-groundworks" },
    ],
  },
  {
    slug: "infrastructure-civils",
    title: "Infrastructure & civils",
    shortTitle: "Infrastructure",
    metaDescription:
      "Civils and infrastructure groundworks: roads and sewers, earthworks, bulk movement and development infrastructure from Mainline Groundworks.",
    intro:
      "Infrastructure-led projects demand formation control, adoptable highways and drainage coordination, and disciplined earthworks. We deliver civils groundworks that integrate with wider infrastructure programmes.",
    body:
      "Scopes often include bulk earthworks, cut and fill, roads and sewers preparation, attenuation and connection readiness. We work to engineer specification and inspection regimes.",
    relatedServiceSlugs: [
      "roads-and-sewers",
      "earthworks",
      "bulk-earthworks",
      "excavation-contractors",
      "attenuation-systems",
      "muck-away-services",
    ],
    relatedGuides: [
      { title: "Drainage adoption (Section 104)", href: "/construction-drainage/drainage-adoption-s104" },
      { title: "Excavation cost per cubic metre", href: "/groundworks-costs/excavation-cost-per-cubic-metre" },
      { title: "When is piling required?", href: "/guides/when-is-piling-required" },
    ],
  },
  {
    slug: "industrial-sites",
    title: "Industrial sites",
    shortTitle: "Industrial",
    metaDescription:
      "Groundworks for industrial estates, logistics and manufacturing: platforms, heavy-duty slabs, drainage and enabling works from Mainline Groundworks.",
    intro:
      "Industrial sites often combine heavy wheel loads, deep services corridors and tight programme windows. We deliver groundworks and enabling packages suited to logistics and manufacturing builds.",
    body:
      "Typical work includes platform preparation, deep drainage runs, hardstanding and access roads, bulk excavation and foundation interfaces. We coordinate with structural and MEP design teams.",
    relatedServiceSlugs: [
      "commercial-groundworks",
      "concrete-foundations",
      "excavation-contractors",
      "site-preparation-services",
      "enabling-works-contractors",
      "ground-investigation-services",
    ],
    relatedGuides: [
      { title: "Enabling works explained", href: "/site-preparation/enabling-works-explained" },
      { title: "Concrete foundations cost", href: "/guides/concrete-foundations-cost" },
      { title: "Ground investigation before build", href: "/guides/ground-investigation-before-build" },
    ],
  },
  {
    slug: "extensions-self-build",
    title: "Extensions & self-build",
    shortTitle: "Extensions",
    metaDescription:
      "Groundworks for extensions and self-build homes: foundations, underpinning, mini piling and site preparation from Mainline Groundworks.",
    intro:
      "Smaller sites still need engineer-led foundations, controlled excavation and proper drainage. We support extensions and self-build projects with proportionate groundworks packages.",
    body:
      "Common scopes include mini piling, underpinning, strip and pad foundations, reduced dig and muck-away, and temporary access. We work with homeowners, architects and small builders.",
    relatedServiceSlugs: [
      "mini-piling-contractors",
      "underpinning",
      "foundation-contractors",
      "excavation-contractors",
      "groundworks-contractors",
      "muck-away-services",
    ],
    relatedGuides: [
      { title: "Extension foundations guide", href: "/guides/extension-foundations-guide" },
      { title: "Underpinning vs piling", href: "/guides/underpinning-vs-piling" },
      { title: "Foundation cost guide", href: "/guides/foundation-cost" },
    ],
  },
  {
    slug: "local-authority-public-works",
    title: "Local authority & public works",
    shortTitle: "Public sector",
    metaDescription:
      "Groundworks for public-sector and civils frameworks: enabling works, excavation, drainage and infrastructure-ready packages from Mainline Groundworks.",
    intro:
      "Public works require clear documentation, inspection regimes and programme discipline. We deliver groundworks packages aligned to engineer specification and site constraints.",
    body:
      "Typical packages mirror commercial civils: site preparation, excavation, drainage interfaces, roads and sewers preparation and reinstatement planning. We focus on buildability and handover records.",
    relatedServiceSlugs: [
      "enabling-works-contractors",
      "excavation-contractors",
      "roads-and-sewers",
      "site-clearance-contractors",
      "bulk-earthworks",
      "groundworks-contractors",
    ],
    relatedGuides: [
      { title: "What are enabling works?", href: "/guides/what-are-enabling-works" },
      { title: "Site preparation overview", href: "/site-preparation/site-preparation-overview" },
      { title: "Enabling works cost", href: "/groundworks-costs/enabling-works-cost" },
    ],
  },
  {
    slug: "utilities-drainage-infrastructure",
    title: "Utilities & drainage infrastructure",
    shortTitle: "Utilities",
    metaDescription:
      "Attenuation, soakaways, SuDS, surface water and site drainage groundworks for developments — Mainline Groundworks.",
    intro:
      "Surface water and foul drainage must integrate with groundworks sequencing and adoption requirements. We install attenuation, soakaways and drainage runs to design with clear testing and handover.",
    body:
      "Packages often coordinate with roads and sewers, plot drainage and main contractor programme. We support Section 104 adoption routes where applicable.",
    relatedServiceSlugs: [
      "attenuation-systems",
      "roads-and-sewers",
      "excavation-contractors",
      "bulk-earthworks",
      "site-preparation-services",
      "groundworks-contractors",
    ],
    relatedGuides: [
      { title: "Soakaway design and installation", href: "/guides/soakaway-design-and-installation" },
      { title: "Green drainage (SuDS)", href: "/construction-drainage/green-drainage-suds" },
      { title: "Surface water drainage installation", href: "/construction-drainage/surface-water-drainage-installation" },
    ],
  },
];

export function getGroundworksSector(slug: string): GroundworksSector | undefined {
  return groundworksSectors.find((s) => s.slug === slug);
}

export function resolveSectorServices(slugs: string[], allServices: Service[]): Service[] {
  const bySlug = new Map(allServices.map((s) => [s.slug, s]));
  return slugs.map((slug) => bySlug.get(slug)).filter((s): s is Service => Boolean(s));
}
