import type { HubData, InfoPageData, Service } from "engine";
import { guidesPages } from "@/data/guides";
import { foundationProblems } from "@/data/foundationProblems";
import { groundConditionsPages } from "@/data/groundConditionsPages";
import { groundworksCostsPages } from "@/data/groundworksCostsPages";
import { sitePreparationPages } from "@/data/sitePreparationPages";
import { drivewayGroundworksPages } from "@/data/drivewayGroundworksPages";
import { constructionDrainagePages } from "@/data/constructionDrainagePages";
import { getCommercialOpportunityScore } from "@/lib/commercialOpportunity";
import { filterLocationsForService } from "@/lib/groundworksDiscoveryLinks";
import { PRIMARY_NEAR_ME_SERVICE_SLUG } from "@/lib/primaryNearMeLocations";

// Company info – used by config and layout (public Twilio inbound; set NEXT_PUBLIC_PHONE_NUMBER in deploy)
const publicPhone = (process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "").trim();
export const companyInfo = {
  name: "Mainline Groundworks",
  phone: publicPhone,
  email: "info@mainlinegroundworks.co.uk",
  address: "128 City Road, London, EC1V 2NX",
  hours: "Mon–Fri 8am–6pm, 24/7 emergency callout support",
  social: {
    linkedin: "#",
    twitter: "#",
    facebook: "#",
  },
};

type GroundworksCommercialIntentLevel = "very_high" | "high" | "medium" | "lower";
type GroundworksPreferredLeadType = "commercial" | "structural" | "residential" | "infrastructure";
type GroundworksPackageValueTier = "premium" | "high" | "medium" | "lower";
type GroundworksSupplierFitTag =
  | "kent_structural"
  | "surrey_foundations"
  | "commercial_groundworks"
  | "infrastructure_delivery"
  | "residential_general";

export type GroundworksService = Service & {
  commercialIntentLevel?: GroundworksCommercialIntentLevel;
  preferredLeadType?: GroundworksPreferredLeadType;
  packageValueTier?: GroundworksPackageValueTier;
  supplierFitTags?: GroundworksSupplierFitTag[];
};

// Services (order: high-intent / core first for footer and list slices)
export const services: GroundworksService[] = [
  {
    id: "groundworks-contractors",
    slug: "groundworks-contractors",
    title: "Groundworks Contractors",
    titleSingular: "Groundworks Contractor",
    shortDescription: "Full-service groundworks for commercial and residential construction.",
    description: "We deliver complete groundworks packages including piling, excavation, site clearance, foundations and enabling works. From housing developments to commercial and industrial projects across the UK.",
    benefits: ["Single point of contact for all groundworks", "Programme-driven delivery", "Fully insured and accredited", "Experienced teams and plant", "Quality assured work"],
    process: ["Site assessment and design coordination", "Setting out and excavation", "Piling and foundations as required", "Utilities and services", "Reinstatement and handover"],
    icon: "Shovel",
    commercialIntentLevel: "high",
    preferredLeadType: "commercial",
    packageValueTier: "high",
    supplierFitTags: ["kent_structural", "commercial_groundworks"],
  },
  {
    id: "commercial-groundworks",
    slug: "commercial-groundworks",
    title: "Commercial Groundworks",
    titleSingular: "Commercial Groundworks Contractor",
    shortDescription: "Commercial groundworks packages for development, logistics, and mixed-use schemes.",
    description:
      "We deliver commercial groundworks packages for development-led projects, industrial estates, logistics yards, and mixed-use sites. Scopes include enabling works coordination, excavation, structural foundations, drainage interfaces, and handover planning around programme milestones.",
    benefits: ["Single-package procurement", "Commercial programme coordination", "Structural and enabling scope alignment", "Site-logistics aware delivery"],
    process: ["Commercial scope review", "Programme and sequencing alignment", "Package mobilisation and delivery", "Quality control and handover"],
    icon: "Building2",
    commercialIntentLevel: "very_high",
    preferredLeadType: "commercial",
    packageValueTier: "premium",
    supplierFitTags: ["kent_structural", "commercial_groundworks", "infrastructure_delivery"],
  },
  {
    id: "earthworks",
    slug: "earthworks",
    title: "Earthworks Contractors",
    titleSingular: "Earthworks Contractor",
    shortDescription: "Cut, fill, regrading and formation works for commercial and infrastructure sites.",
    description:
      "Our earthworks teams deliver cut and fill operations, site regrading, and engineered formation preparation for commercial and infrastructure projects. We coordinate bulk movement, levels strategy, and sequencing so later structural packages can progress reliably.",
    benefits: ["Earthworks planning around levels strategy", "Bulk cut/fill coordination", "Supports infrastructure and development programmes", "Formation readiness for structural follow-on works"],
    process: ["Levels and volume appraisal", "Earthworks sequencing plan", "Cut/fill execution and compaction", "Formation verification"],
    icon: "Mountain",
    commercialIntentLevel: "high",
    preferredLeadType: "infrastructure",
    packageValueTier: "high",
    supplierFitTags: ["kent_structural", "commercial_groundworks", "infrastructure_delivery"],
  },
  {
    id: "roads-and-sewers",
    slug: "roads-and-sewers",
    title: "Roads and Sewers Contractors",
    titleSingular: "Roads and Sewers Contractor",
    shortDescription: "Adoptable roads and sewers groundworks for development infrastructure.",
    description:
      "We deliver roads and sewers packages for commercial and residential developments, including formation, drainage runs, and coordinated handover preparation. Work is sequenced to support broader infrastructure delivery and programme certainty.",
    benefits: ["Road and sewer package coordination", "Infrastructure sequencing support", "Development-phase delivery control", "Clear handover readiness"],
    process: ["Infrastructure package review", "Road and sewer sequencing plan", "Drainage and formation delivery", "Handover and records"],
    icon: "Layers",
    commercialIntentLevel: "very_high",
    preferredLeadType: "infrastructure",
    packageValueTier: "premium",
    supplierFitTags: ["kent_structural", "commercial_groundworks", "infrastructure_delivery"],
  },
  {
    id: "attenuation-systems",
    slug: "attenuation-systems",
    title: "Attenuation Systems Installation",
    titleSingular: "Attenuation Systems Contractor",
    shortDescription: "Surface water attenuation systems for commercial and infrastructure developments.",
    description:
      "We install attenuation systems for commercial and infrastructure projects where surface water control needs to be integrated into groundworks delivery. Packages include excavation, crate or tank install coordination, and connection readiness for downstream drainage interfaces.",
    benefits: ["Integrated attenuation package delivery", "Supports roads and sewers programmes", "Commercial drainage interface coordination", "Buildability-led sequencing"],
    process: ["Attenuation design coordination", "Excavation and install prep", "System install and interface works", "Testing and handover support"],
    icon: "Droplets",
    commercialIntentLevel: "high",
    preferredLeadType: "infrastructure",
    packageValueTier: "high",
    supplierFitTags: ["kent_structural", "commercial_groundworks", "infrastructure_delivery"],
  },
  {
    id: "underpinning",
    slug: "underpinning",
    title: "Underpinning Contractors",
    titleSingular: "Underpinning Contractor",
    shortDescription: "Stabilise and strengthen existing foundations for movement, subsidence or structural upgrades.",
    description:
      "Underpinning deepens or widens existing foundations so the structure is supported where the ground or loading has changed. We work where there is structural movement, subsidence, or when you need to strengthen or extend foundations for alterations. Everything follows structural design with controlled sequencing and handover records.",
    benefits: [
      "Stabilises existing structures",
      "Suitable for extensions and structural changes",
      "Addresses foundation movement issues",
    ],
    process: [
      "Site assessment",
      "Structural evaluation",
      "Excavation and preparation",
      "Underpinning installation",
      "Structural stabilisation",
    ],
    icon: "Anchor",
    commercialIntentLevel: "very_high",
    preferredLeadType: "structural",
    packageValueTier: "high",
    supplierFitTags: ["kent_structural", "surrey_foundations"],
  },
  {
    id: "piling-contractors",
    slug: "piling-contractors",
    title: "Piling Contractors",
    titleSingular: "Piling Contractor",
    shortDescription: "Piling for new builds, extensions and structural works on difficult or tight sites.",
    description:
      "Piling solutions for residential and commercial projects, including new builds, extensions and structural works. We choose approaches around ground conditions, access constraints and what the structure needs — not a one-size-fits-all rig on every job.",
    benefits: ["Handles complex soil conditions", "Suitable for restricted access", "Tailored foundation solutions"],
    process: ["Site assessment", "Method selection", "Installation", "Structural integration"],
    icon: "Layers",
    commercialIntentLevel: "very_high",
    preferredLeadType: "structural",
    packageValueTier: "high",
    supplierFitTags: ["kent_structural", "surrey_foundations"],
  },
  {
    id: "cfa-piling",
    slug: "cfa-piling",
    title: "CFA Piling Contractors",
    titleSingular: "CFA Piling Contractor",
    shortDescription: "CFA piling for restricted sites and low-vibration urban work.",
    description:
      "Continuous Flight Auger (CFA) piling drills a bore and pumps concrete as the auger is withdrawn, forming a cast-in-place pile with low spoil and controlled vibration. It suits restricted sites, low-vibration environments and typical urban builds where neighbours and access matter.",
    benefits: ["Low noise and low vibration", "Ideal for urban environments", "Efficient installation"],
    process: ["Site assessment", "Auger drilling", "Concrete injection", "Reinforcement placement"],
    icon: "Drill",
  },
  {
    id: "mini-piling-contractors",
    slug: "mini-piling-contractors",
    title: "Mini Piling Contractors",
    titleSingular: "Mini Piling Contractor",
    shortDescription: "Section piles and CFA mini piling for low headroom and tight sites.",
    description: "Mini piling is ideal where access is limited or headroom is low. We install section piles and CFA mini piles for extensions, basements and constrained sites.",
    benefits: ["Low headroom capability", "Minimal spoil", "Quick to install", "Suitable for domestic and commercial", "Reduced disruption"],
    process: ["Site survey and access check", "Pile design and layout", "Installation with mini piling rig", "Pile caps and ground beams", "Testing and records"],
    icon: "CircleDot",
    commercialIntentLevel: "very_high",
    preferredLeadType: "structural",
    packageValueTier: "high",
    supplierFitTags: ["kent_structural", "surrey_foundations"],
  },
  {
    id: "foundation-contractors",
    slug: "foundation-contractors",
    title: "Foundation Contractors",
    titleSingular: "Foundation Contractor",
    shortDescription: "Strip, pad, raft and piled foundations for all building types.",
    description: "We design and build strip foundations, pad foundations, raft foundations and piled foundations for housing, commercial and industrial projects.",
    benefits: ["Design or design-and-build", "All foundation types", "Engineered solutions", "Programme certainty", "Quality and compliance"],
    process: ["Ground review and design", "Setting out and excavation", "Reinforcement and concrete", "Curing and protection", "Handover and as-built"],
    icon: "Building2",
    commercialIntentLevel: "very_high",
    preferredLeadType: "structural",
    packageValueTier: "premium",
    supplierFitTags: ["kent_structural", "surrey_foundations", "commercial_groundworks"],
  },
  {
    id: "foundation-repair",
    slug: "foundation-repair",
    title: "Foundation Repair",
    titleSingular: "Foundation Repair",
    shortDescription: "Repair and stabilisation where foundations have failed, cracked or moved.",
    description:
      "Foundation issues show up as movement, cracking or loss of support. We work from investigation and structural input to repair, rebuild or stabilise foundation elements so loads are carried correctly again. Scopes are defined around the defect, not generic make-good.",
    benefits: ["Targets the real defect", "Aligned with structural design", "Clear reinstatement and records"],
    process: ["Assessment of movement and damage", "Engineer-led repair specification", "Break out and preparation", "Repair and stabilisation works", "Protection and handover"],
    icon: "Warehouse",
  },
  {
    id: "foundation-depth-issues",
    slug: "foundation-depth-issues",
    title: "Foundation Depth Issues",
    titleSingular: "Foundation Depth Issue",
    shortDescription: "Investigate and correct shallow or inconsistent foundation depths.",
    description:
      "We assess foundation depth issues where existing footings are too shallow, variable or exposed to frost and movement risk. Our team works from engineer-led recommendations and can deliver underpinning, piling or local remedial work depending on the structure and ground.",
    benefits: ["Engineer-led solutions", "Suitable for existing buildings", "Reduces movement risk", "Clear certification"],
    process: ["Site review and survey", "Depth assessment", "Engineer coordination", "Repair or strengthening works"],
    icon: "AlertTriangle",
  },
  {
    id: "building-regs-foundation-compliance",
    slug: "building-regs-foundation-compliance",
    title: "Building Regs Foundation Compliance",
    titleSingular: "Building Regs Foundation Compliance",
    shortDescription: "Bring foundations into line with building control and structural requirements.",
    description:
      "We help when foundation work needs to be aligned with building control, structural design and practical site constraints. That can mean checking what was built, planning remedial work and coordinating with the wider project team to achieve compliance.",
    benefits: ["Supports compliance checks", "Works with structural design", "Useful for extensions and alterations", "Clear handover records"],
    process: ["Review the issue", "Check drawings and site conditions", "Agree remedial scope", "Deliver compliant works"],
    icon: "Building2",
  },
  {
    id: "clay-soil-foundation-problems",
    slug: "clay-soil-foundation-problems",
    title: "Clay Soil Foundation Problems",
    titleSingular: "Clay Soil Foundation Problem",
    shortDescription: "Assess and resolve foundation movement caused by clay soil conditions.",
    description:
      "Clay soils shrink and swell with seasonal moisture changes, which can affect foundations and create movement. We work with engineers to stabilise the structure and select the right foundation or remedial approach for the clay conditions.",
    benefits: ["Clarity on clay-related risk", "Supports structural design", "Suitable for new build and remedial work", "Helps avoid repeat movement"],
    process: ["Review ground conditions", "Coordinate investigation", "Agree foundation strategy", "Deliver works to design"],
    icon: "Droplets",
  },
  {
    id: "tree-impact-foundations",
    slug: "tree-impact-foundations",
    title: "Tree Impact Foundation Solutions",
    titleSingular: "Tree Impact Foundation Solution",
    shortDescription: "Foundation solutions where nearby trees are affecting ground moisture or support.",
    description:
      "Trees can change soil moisture levels and affect nearby foundations, especially on clay ground. We help assess tree-related foundation risk and deliver solutions such as underpinning, piling or remedial works.",
    benefits: ["Tree risk assessment support", "Links to engineer-led repair", "Suitable for extensions and existing homes", "Clear programme and handover"],
    process: ["Assess tree influence", "Review foundation depth", "Coordinate with engineer", "Install remedy"],
    icon: "TreeDeciduous",
  },
  {
    id: "foundation-remedial-work",
    slug: "foundation-remedial-work",
    title: "Foundation Remedial Work",
    titleSingular: "Foundation Remedial Work",
    shortDescription: "Targeted remedial works for compromised or under-performing foundations.",
    description:
      "We carry out remedial foundation work where support has been compromised by movement, design issues or ground conditions. Every scheme is coordinated with structural design and staged to keep the structure safe.",
    benefits: ["Targeted repair options", "Engineer-led delivery", "Works for damaged or under-designed foundations", "Full documentation"],
    process: ["Inspection and diagnosis", "Engineer specification", "Controlled remedial works", "Sign-off and records"],
    icon: "Wrench",
  },
  {
    id: "underpinning-advice",
    slug: "underpinning-advice",
    title: "Underpinning Advice",
    titleSingular: "Underpinning Advice",
    shortDescription: "Practical advice and delivery support for underpinning projects.",
    description:
      "We provide practical underpinning advice and delivery support where existing foundations need to be deepened or stabilised. The solution is always chosen against the structure, the soil and the engineer's specification.",
    benefits: ["Clear direction on next steps", "Suitable for movement and shallow foundations", "Works with existing structures", "Engineer-led approach"],
    process: ["Initial consultation", "Review of drawings and symptoms", "Engineer coordination", "Underpinning works"],
    icon: "Replace",
  },
  {
    id: "structural-groundworks-consultation",
    slug: "structural-groundworks-consultation",
    title: "Structural Groundworks Consultation",
    titleSingular: "Structural Groundworks Consultation",
    shortDescription: "Consultation for projects with uncertainty around foundations, soil and buildability.",
    description:
      "We provide structural groundworks consultation for projects with uncertainty around foundations, soil and buildability. The aim is to define the right groundworks route before costly mistakes are made on site.",
    benefits: ["Early-stage advice", "Buildability and risk review", "Helps define scope and sequence", "Useful for complex sites"],
    process: ["Project review", "Site and drawing assessment", "Plan options and risks", "Recommend next steps"],
    icon: "Building2",
  },
  {
    id: "ground-investigation-services",
    slug: "ground-investigation-services",
    title: "Ground Investigation Services",
    titleSingular: "Ground Investigation Service",
    shortDescription: "Coordinate ground investigation inputs for foundation and testing decisions.",
    description:
      "We arrange and interpret ground investigation inputs so the foundation strategy is based on real site conditions rather than assumptions. That supports foundation design, testing and buildability decisions.",
    benefits: ["Site-specific ground data", "Supports design and warranty", "Helps avoid over- or under-design", "Useful before foundation decisions"],
    process: ["Desktop review", "Trial pits or boreholes plan", "Data review with engineer", "Deliver foundation route"],
    icon: "Shovel",
  },
  {
    id: "soil-bearing-capacity-testing",
    slug: "soil-bearing-capacity-testing",
    title: "Soil Bearing Capacity Testing",
    titleSingular: "Soil Bearing Capacity Testing",
    shortDescription: "Assess how well ground can support load before foundation decisions are made.",
    description:
      "We assess soil bearing capacity so the foundation design reflects the ground's real ability to support load. This is especially useful on variable sites, made ground or where settlement risk needs checking.",
    benefits: ["Clarifies bearing performance", "Supports design decisions", "Useful on weak or variable soils", "Buildability insight"],
    process: ["Initial site review", "Testing plan", "Capacity assessment", "Engineer handover"],
    icon: "Droplets",
  },
  {
    id: "plate-load-testing",
    slug: "plate-load-testing",
    title: "Plate Load Testing",
    titleSingular: "Plate Load Testing",
    shortDescription: "Verify ground response under load before finalising foundation choices.",
    description:
      "Plate load testing helps verify how ground responds under load, giving confidence around foundation performance and settlement. We use it where bearing performance needs practical confirmation.",
    benefits: ["Direct load response data", "Useful for design verification", "Supports foundation decisions", "Clear test records"],
    process: ["Set out test location", "Load application", "Record settlement", "Report results"],
    icon: "Layers",
  },
  {
    id: "incremental-plate-load-testing",
    slug: "incremental-plate-load-testing",
    title: "Incremental Plate Load Testing",
    titleSingular: "Incremental Plate Load Testing",
    shortDescription: "Staged plate load testing for more detailed bearing data.",
    description:
      "Incremental plate load testing applies load in stages so the ground response can be checked more carefully. It is useful where the engineer wants detailed bearing data before finalising foundation design.",
    benefits: ["Detailed load-response data", "Supports engineering sign-off", "Useful on uncertain ground", "Clear reporting"],
    process: ["Prepare test point", "Apply staged loading", "Measure settlement", "Compile report"],
    icon: "Camera",
  },
  {
    id: "concrete-repair",
    slug: "concrete-repair",
    title: "Concrete Repair",
    titleSingular: "Concrete Repair",
    shortDescription: "Structural and non-structural concrete repairs for slabs, beams and elements.",
    description:
      "Spalled, cracked or carbonated concrete needs proper prep and compatible materials. We remove unsound concrete, treat reinforcement where specified and reinstate to a defined repair detail so performance and fire cover are maintained.",
    benefits: ["Repairs to specification", "Suitable for structural and facing concrete", "Documented quality"],
    process: ["Assessment and marking up", "Break out and substrate preparation", "Reinstatement and finishing", "Curing and records"],
    icon: "BrickWall",
  },
  {
    id: "excavation-contractors",
    slug: "excavation-contractors",
    title: "Excavation Contractors",
    titleSingular: "Excavation Contractor",
    shortDescription: "Bulk excavation, strip excavation and trenching for construction.",
    description: "We carry out bulk excavation, strip excavation and trenching for foundations, utility runs and structural formations. Machine and hand dig to programme with proper support and reinstatement.",
    benefits: ["Programme-led excavation", "Support and temporary works", "Spoil management", "Quality formation levels", "Safe working practices"],
    process: ["Setting out and levels", "Excavation to design", "Support and edge protection", "Formation preparation", "Backfill and compaction"],
    icon: "Mountain",
    commercialIntentLevel: "high",
    preferredLeadType: "commercial",
    packageValueTier: "high",
    supplierFitTags: ["kent_structural", "commercial_groundworks"],
  },
  {
    id: "site-clearance-contractors",
    slug: "site-clearance-contractors",
    title: "Site Clearance Contractors",
    titleSingular: "Site Clearance Contractor",
    shortDescription: "Vegetation clearance, demolition and waste removal to prepare sites.",
    description: "We clear sites for development: vegetation, structures, hardstanding and arisings. Waste is removed and disposed of responsibly with documentation.",
    benefits: ["Full site strip capability", "Waste removed and recycled where possible", "Safe demolition and clearance", "Site ready for groundworks", "Documented disposal"],
    process: ["Site survey and scope", "Clearance and demolition", "Vegetation and topsoil strip", "Waste removal and tickets", "Handover of clear site"],
    icon: "TreePine",
  },
  {
    id: "muck-away-services",
    slug: "muck-away-services",
    title: "Muck Away Services",
    titleSingular: "Muck Away Service",
    shortDescription: "Excavate, load and dispose of spoil with the right documentation.",
    description:
      "Muck away services cover the loading, removal and disposal of spoil from groundworks and excavation. We plan routes, waste handling and documentation so the site is cleared efficiently and the next phase can start on programme.",
    benefits: ["Licensed disposal routes", "Efficient spoil removal", "Supports fast site clearance", "Works with excavation and enabling works"],
    process: ["Scope spoil volumes", "Plan access and collections", "Load and remove material", "Provide waste records"],
    icon: "Shovel",
  },
  {
    id: "bulk-earthworks",
    slug: "bulk-earthworks",
    title: "Bulk Earthworks",
    titleSingular: "Bulk Earthworks",
    shortDescription: "Large-scale cut, fill and formation works for development sites.",
    description:
      "Bulk earthworks cover the large-scale movement of soil and fill needed to get a site to formation or platform levels. We work to the design and programme, managing excavation, reuse, import and compaction so the site is ready for the next stage.",
    benefits: ["Large-volume excavation", "Cut and fill coordination", "Formation and platform prep", "Works with site prep and enabling"],
    process: ["Review levels and volumes", "Plan cut and fill", "Excavate and move material", "Compact and hand over"],
    icon: "Layers",
  },
  {
    id: "site-preparation-services",
    slug: "site-preparation-services",
    title: "Site Preparation Services",
    titleSingular: "Site Preparation Service",
    shortDescription: "Early site preparation to get a project ready for main works.",
    description:
      "Site preparation services bring together clearance, temporary access, spoil management and early formation work so the site is ready for the main build. We keep the sequence practical and aligned to the project programme.",
    benefits: ["Early-stage project readiness", "Clearance and access coordination", "Supports efficient main works", "Works with enabling and excavation"],
    process: ["Site review", "Clearance and access plan", "Prepare formation and logistics", "Handover ready for main works"],
    icon: "Building2",
  },
  {
    id: "concrete-foundations",
    slug: "concrete-foundations",
    title: "Concrete Foundations",
    titleSingular: "Concrete Foundation",
    shortDescription: "Reinforced and mass concrete foundations and ground beams.",
    description: "We supply and place reinforced concrete foundations, mass concrete, blinding and ground beams. All work to specification with testing and records.",
    benefits: ["Reinforced and mass concrete", "Blinding and ground beams", "Quality concrete supply", "Testing and cube records", "Smooth handover"],
    process: ["Formation preparation", "Reinforcement fixing", "Concrete order and pour", "Curing and protection", "Testing and documentation"],
    icon: "Box",
  },
  {
    id: "enabling-works-contractors",
    slug: "enabling-works-contractors",
    title: "Enabling Works Contractors",
    titleSingular: "Enabling Works Contractor",
    shortDescription: "Access roads, temporary drainage and site set-up before main works.",
    description: "Enabling works prepare the site for main construction: access roads, temporary drainage, fencing, hoardings and temporary services so the project can start on programme.",
    benefits: ["Site access and logistics", "Temporary drainage and services", "Fencing and security", "Early programme certainty", "Main contractor ready"],
    process: ["Site logistics plan", "Access and hardstanding", "Temporary drainage", "Fencing and hoardings", "Handover to main works"],
    icon: "HardHat",
    commercialIntentLevel: "high",
    preferredLeadType: "commercial",
    packageValueTier: "high",
    supplierFitTags: ["kent_structural", "commercial_groundworks", "infrastructure_delivery"],
  },
];

export const serviceCommercialMetadataBySlug: Record<
  string,
  Pick<
    GroundworksService,
    "commercialIntentLevel" | "preferredLeadType" | "packageValueTier" | "supplierFitTags"
  >
> = Object.fromEntries(
  services.map((service) => [
    service.slug,
    {
      commercialIntentLevel: service.commercialIntentLevel,
      preferredLeadType: service.preferredLeadType,
      packageValueTier: service.packageValueTier,
      supplierFitTags: service.supplierFitTags,
    },
  ])
);

// Core locations plus aligned contractor appendix (Groundworks/Surveys/Drains only — not in default engine list).
import { locations as engineLocations } from "../../../engine/data/locations";
import { alignedContractorTerritoryLocations } from "../../../engine/data/aligned-contractor-territory-locations";

const engineLocationIds = new Set(engineLocations.map((l) => l.id));
export const locations = [
  ...engineLocations,
  ...alignedContractorTerritoryLocations.filter((loc) => !engineLocationIds.has(loc.id)),
];

// Level 2 = service hubs (/services, /services/[slug]). Level 3 = topic hubs (e.g. /foundation-problems, /ground-conditions). Level 4 = service×location (/[serviceSlug]/[locationId]).
export const hubPages: HubData[] = [
  {
    category: "guides",
    basePath: "/guides",
    title: "Groundworks Guides",
    subtitle: "Costs, processes and advice for piling, foundations, excavation and site preparation.",
    metaDescription:
      "Expert guides on piling costs, foundation types, excavation, site clearance and enabling works. UK groundworks advice from Mainline Groundworks.",
  },
  {
    category: "foundation-problems",
    basePath: "/foundation-problems",
    title: "Foundation Problems",
    subtitle: "Subsidence, cracking and inadequate design — causes and how we fix them.",
    metaDescription: "Foundation problems: subsidence, cracking, inadequate design. Expert diagnosis and repair from Mainline Groundworks.",
  },
  {
    category: "ground-conditions",
    basePath: "/ground-conditions",
    title: "Ground Conditions",
    subtitle: "Made ground, soft soils and when piling is needed.",
    metaDescription: "Ground conditions for construction: made ground, soft soils, when piling is needed. UK groundworks advice from Mainline Groundworks.",
  },
  {
    category: "groundworks-costs",
    basePath: "/groundworks-costs",
    title: "Groundworks Costs",
    subtitle: "Cost overview and budgeting for piling, foundations and site preparation.",
    metaDescription: "Groundworks costs: piling, foundations, excavation and site clearance. Cost overview from Mainline Groundworks.",
  },
  {
    category: "site-preparation",
    basePath: "/site-preparation",
    title: "Site Preparation",
    subtitle: "Surveys, clearance and enabling works before main construction.",
    metaDescription: "Site preparation for construction: surveys, clearance, enabling works. UK guide from Mainline Groundworks.",
  },
  {
    category: "driveway-groundworks",
    basePath: "/driveway-groundworks",
    title: "Driveway Groundworks",
    subtitle: "Sub-base, drainage and construction for domestic driveways.",
    metaDescription: "Driveway groundworks: sub-base, drainage and construction. Domestic driveway advice from Mainline Groundworks.",
  },
  {
    category: "construction-drainage",
    basePath: "/construction-drainage",
    title: "Construction Drainage",
    subtitle: "Build-over, connections and drainage surveys for construction.",
    metaDescription: "Construction drainage: build-over agreements, connections and surveys. UK guide from Mainline Groundworks.",
  },
];

function problemDataToInfoPageData(p: {
  slug: string;
  title: string;
  causes: string;
  howFixed: string;
  whenToCall: string;
  ctaMessage: string;
  relatedServiceSlugs: string[];
}): InfoPageData {
  return {
    slug: p.slug,
    title: p.title,
    metaDescription: p.causes.slice(0, 155) + (p.causes.length > 155 ? "..." : ""),
    intro: p.causes,
    signs: [],
    diagnosis: p.howFixed,
    resolution: p.whenToCall,
    ctaText: p.ctaMessage,
    relatedServices: p.relatedServiceSlugs,
  };
}

export const getCategoryPages = (category: string): InfoPageData[] => {
  switch (category) {
    case "guides":
      return guidesPages;
    case "foundation-problems":
      return foundationProblems.map(problemDataToInfoPageData);
    case "ground-conditions":
      return groundConditionsPages;
    case "groundworks-costs":
      return groundworksCostsPages;
    case "site-preparation":
      return sitePreparationPages;
    case "driveway-groundworks":
      return drivewayGroundworksPages;
    case "construction-drainage":
      return constructionDrainagePages;
    default:
      return [];
  }
};

export const getHubData = (category: string): HubData | undefined => {
  return hubPages.find((h) => h.category === category);
};

const GROUNDWORKS_SERVICE_TO_TOPIC_CATEGORIES: Record<string, string[]> = {
  "foundation-contractors": ["foundation-problems", "ground-conditions", "groundworks-costs"],
  "groundworks-contractors": ["groundworks-costs", "site-preparation", "guides"],
  "commercial-groundworks": ["site-preparation", "groundworks-costs", "construction-drainage"],
  earthworks: ["site-preparation", "groundworks-costs", "ground-conditions"],
  "roads-and-sewers": ["construction-drainage", "site-preparation", "groundworks-costs"],
  "attenuation-systems": ["construction-drainage", "groundworks-costs", "site-preparation"],
  "piling-contractors": ["ground-conditions", "groundworks-costs", "guides"],
  "cfa-piling": ["ground-conditions", "groundworks-costs", "guides"],
  "mini-piling-contractors": ["ground-conditions", "groundworks-costs", "guides"],
  "underpinning": ["foundation-problems", "groundworks-costs", "guides"],
  "foundation-repair": ["foundation-problems", "groundworks-costs", "guides"],
  "foundation-depth-issues": ["foundation-problems", "ground-conditions", "guides"],
  "building-regs-foundation-compliance": ["foundation-problems", "site-preparation", "guides"],
  "clay-soil-foundation-problems": ["foundation-problems", "ground-conditions", "guides"],
  "tree-impact-foundations": ["foundation-problems", "ground-conditions", "guides"],
  "foundation-remedial-work": ["foundation-problems", "groundworks-costs", "guides"],
  "underpinning-advice": ["foundation-problems", "groundworks-costs", "guides"],
  "structural-groundworks-consultation": ["foundation-problems", "groundworks-costs", "guides"],
  "ground-investigation-services": ["ground-conditions", "foundation-problems", "guides"],
  "soil-bearing-capacity-testing": ["ground-conditions", "foundation-problems", "guides"],
  "plate-load-testing": ["ground-conditions", "groundworks-costs", "guides"],
  "incremental-plate-load-testing": ["ground-conditions", "groundworks-costs", "guides"],
  "muck-away-services": ["site-preparation", "groundworks-costs", "guides"],
  "bulk-earthworks": ["site-preparation", "groundworks-costs", "guides"],
  "site-preparation-services": ["site-preparation", "groundworks-costs", "guides"],
  "concrete-repair": ["foundation-problems", "groundworks-costs", "guides"],
  "excavation-contractors": ["site-preparation", "groundworks-costs", "guides"],
  "site-clearance-contractors": ["site-preparation", "groundworks-costs"],
  "concrete-foundations": ["foundation-problems", "ground-conditions", "groundworks-costs"],
  "enabling-works-contractors": ["site-preparation", "construction-drainage", "guides"],
};

const MAX_TOPIC_LINKS = 6;
const MAX_PER_CATEGORY = 2;

export function getRelevantTopicsForService(serviceSlug: string): { title: string; href: string }[] {
  const categories = GROUNDWORKS_SERVICE_TO_TOPIC_CATEGORIES[serviceSlug];
  if (!categories?.length) return [];
  const out: { title: string; href: string }[] = [];
  for (const category of categories) {
    const hub = getHubData(category);
    const pages = getCategoryPages(category);
    if (!hub || !pages.length) continue;
    // Phase 3: bias link reinforcement toward high-intent structural/commercial topics first.
    const taken = [...pages]
      .sort((a, b) => {
        const aScore = getCommercialOpportunityScore(`${a.title} ${a.slug} ${hub.basePath}`);
        const bScore = getCommercialOpportunityScore(`${b.title} ${b.slug} ${hub.basePath}`);
        return bScore - aScore;
      })
      .slice(0, MAX_PER_CATEGORY);
    for (const page of taken) {
      out.push({ title: page.title, href: `${hub.basePath}/${page.slug}` });
      if (out.length >= MAX_TOPIC_LINKS) return out;
    }
  }
  return out;
}

export const stats: { value: string; label: string }[] = [
  { value: "500+", label: "Projects Completed" },
  { value: "25+", label: "Years Experience" },
  { value: "UK-wide", label: "Coverage" },
  { value: "100%", label: "Client Focus" },
];

export const testimonials: { quote: string; author: string; role: string; company: string }[] = [
  { quote: "Mainline Groundworks delivered our piling and foundations on programme. Professional and easy to work with.", author: "David M.", role: "Project Manager", company: "Birmingham" },
  { quote: "Site clearance and enabling works were completed ahead of schedule. We use them on every project now.", author: "Sarah L.", role: "Developer", company: "Manchester" },
  { quote: "Mini piling in a tight access site — no issues. Clear communication and proper certification.", author: "James K.", role: "Contractor", company: "Leeds" },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "What groundworks services do you offer?",
    answer:
      "We offer piling (including CFA and mini piling), underpinning, foundation repair, concrete repair, excavation, site clearance, new foundations, concrete foundations and enabling works for commercial and residential projects across the UK.",
  },
  {
    question: "Do you work on housing developments?",
    answer:
      "Yes. We deliver groundworks packages for housing developments including site clearance, excavation, piling, underpinning, strip and raft foundations, and utility and service connections where required.",
  },
  { question: "How do I get a quote?", answer: "Contact us with your site address, project type and any drawings or specifications. We will arrange a site visit and provide a detailed quote." },
  { question: "What areas do you cover?", answer: "We operate across the UK including London, Birmingham, Manchester, Leeds, Bristol and many other towns and cities. Contact us to confirm coverage for your area." },
  { question: "Do you need a survey before groundworks?", answer: "Many projects benefit from a topographical or utility survey before groundworks to map the site and avoid clashes. We can work with your surveyor or recommend one." },
];

export const blogPosts: Array<{ id: string; title: string; excerpt: string; date: string; image: string; imagePrompt?: string; category: string }> = [];

export const whyChooseUs: { title: string; description: string; icon: string }[] = [
  { title: "Experienced Teams", description: "Qualified operatives and modern plant for piling, excavation and foundations across the UK.", icon: "Users" },
  { title: "Programme Led", description: "We work to your programme with clear planning and communication from start to finish.", icon: "Calendar" },
  { title: "Fully Insured", description: "Comprehensive insurance and accreditation so your project is in safe hands.", icon: "Shield" },
  { title: "Quality Assured", description: "Testing, certification and handover documentation for every project.", icon: "CheckCircle" },
];

function buildRelatedGuideLinksByService(): Record<string, { slug: string; path: string; title: string }[]> {
  const map: Record<string, { slug: string; path: string; title: string }[]> = {};
  const serviceToGuides: Record<string, string[]> = {
    "groundworks-contractors": ["groundworks-process", "construction-site-preparation", "what-are-enabling-works"],
    "commercial-groundworks": ["what-are-enabling-works", "groundworks-process", "construction-site-preparation"],
    earthworks: ["groundworks-process", "construction-site-preparation", "muck-away-and-disposal"],
    "roads-and-sewers": ["construction-site-preparation", "what-are-enabling-works", "groundworks-process"],
    "attenuation-systems": ["construction-site-preparation", "groundworks-process", "what-are-enabling-works"],
    "piling-contractors": ["piling-cost", "types-of-piling", "when-is-piling-required"],
    "cfa-piling": ["types-of-piling", "piling-cost", "when-is-piling-required"],
    "mini-piling-contractors": ["mini-piling-cost", "types-of-piling", "when-is-piling-required"],
    "underpinning": ["foundation-cost", "groundworks-process", "types-of-piling"],
    "foundation-repair": ["foundation-cost", "groundworks-process", "concrete-foundations-cost"],
    "foundation-depth-issues": ["foundation-depth-frost", "foundation-cost", "ground-investigation-before-build"],
    "building-regs-foundation-compliance": ["extension-foundations-guide", "groundworks-process", "ground-investigation-before-build"],
    "clay-soil-foundation-problems": ["how-ground-conditions-affect-foundation-design", "when-is-piling-required", "ground-investigation-before-build"],
    "tree-impact-foundations": ["underpinning-vs-piling", "foundation-depth-frost", "extension-foundations-guide"],
    "foundation-remedial-work": ["underpinning-vs-piling", "foundation-cost", "groundworks-process"],
    "underpinning-advice": ["underpinning-vs-piling", "when-is-piling-required", "foundation-cost"],
    "structural-groundworks-consultation": ["ground-investigation-before-build", "groundworks-process", "how-ground-conditions-affect-foundation-design"],
    "ground-investigation-services": ["ground-investigation-before-build", "how-ground-conditions-affect-foundation-design", "groundworks-process"],
    "soil-bearing-capacity-testing": ["ground-investigation-before-build", "how-ground-conditions-affect-foundation-design", "when-is-piling-required"],
    "plate-load-testing": ["ground-investigation-before-build", "when-is-piling-required", "types-of-piling"],
    "incremental-plate-load-testing": ["ground-investigation-before-build", "piling-cost", "when-is-piling-required"],
    "muck-away-services": ["muck-away-and-disposal", "site-clearance-what-to-expect", "construction-site-preparation"],
    "bulk-earthworks": ["muck-away-and-disposal", "topsoil-stripping-and-stockpile", "groundworks-process"],
    "site-preparation-services": ["construction-site-preparation", "what-are-enabling-works", "groundworks-process"],
    "concrete-repair": ["concrete-foundations-cost", "foundation-cost", "groundworks-process"],
    "excavation-contractors": ["excavation-cost", "groundworks-process"],
    "site-clearance-contractors": ["site-clearance-cost", "construction-site-preparation"],
    "foundation-contractors": ["foundation-cost", "groundworks-process", "concrete-foundations-cost"],
    "concrete-foundations": ["concrete-foundations-cost", "foundation-cost"],
    "enabling-works-contractors": ["what-are-enabling-works", "construction-site-preparation"],
  };
  for (const [slug, guideSlugs] of Object.entries(serviceToGuides)) {
    map[slug] = guideSlugs
      .filter((s) => guidesPages.some((g) => g.slug === s))
      .map((s) => {
        const g = guidesPages.find((p) => p.slug === s);
        return g ? { slug: g.slug, path: `/guides/${g.slug}`, title: g.title } : null;
      })
      .filter((x): x is { slug: string; path: string; title: string } => x !== null);
  }
  return map;
}

export const relatedGuideLinksByService = buildRelatedGuideLinksByService();

export const relatedCostGuideLinksByService: Record<string, { slug: string; path: string; title: string }[]> = {
  "groundworks-contractors": [
    { slug: "groundworks-cost-overview", path: "/groundworks-costs/groundworks-cost-overview", title: "Groundworks cost overview" },
    { slug: "budgeting-for-groundworks", path: "/groundworks-costs/budgeting-for-groundworks", title: "Budgeting for groundworks" },
  ],
  "commercial-groundworks": [
    { slug: "groundworks-cost-overview", path: "/groundworks-costs/groundworks-cost-overview", title: "Groundworks cost overview" },
    { slug: "budgeting-for-groundworks", path: "/groundworks-costs/budgeting-for-groundworks", title: "Budgeting for groundworks" },
  ],
  earthworks: [
    { slug: "excavation-cost-per-cubic-metre", path: "/groundworks-costs/excavation-cost-per-cubic-metre", title: "Excavation cost per cubic metre" },
    { slug: "groundworks-cost-overview", path: "/groundworks-costs/groundworks-cost-overview", title: "Groundworks cost overview" },
  ],
  "roads-and-sewers": [
    { slug: "groundworks-cost-overview", path: "/groundworks-costs/groundworks-cost-overview", title: "Groundworks cost overview" },
    { slug: "budgeting-for-groundworks", path: "/groundworks-costs/budgeting-for-groundworks", title: "Budgeting for groundworks" },
  ],
  "attenuation-systems": [
    { slug: "groundworks-cost-overview", path: "/groundworks-costs/groundworks-cost-overview", title: "Groundworks cost overview" },
    { slug: "groundworks-contingency-budget", path: "/groundworks-costs/groundworks-contingency-budget", title: "Groundworks contingency budget" },
  ],
  "foundation-contractors": [
    { slug: "foundation-cost-per-metre", path: "/groundworks-costs/foundation-cost-per-metre", title: "Foundation cost per metre" },
    { slug: "extension-foundation-cost", path: "/groundworks-costs/extension-foundation-cost", title: "Extension foundation cost" },
  ],
  "underpinning": [
    { slug: "underpinning-cost", path: "/groundworks-costs/underpinning-cost", title: "Underpinning cost" },
    { slug: "mass-concrete-underpinning-cost", path: "/groundworks-costs/mass-concrete-underpinning-cost", title: "Mass concrete underpinning cost" },
  ],
  "foundation-repair": [
    { slug: "underpinning-cost", path: "/groundworks-costs/underpinning-cost", title: "Underpinning cost" },
    { slug: "foundation-cost-per-metre", path: "/groundworks-costs/foundation-cost-per-metre", title: "Foundation cost per metre" },
  ],
  "foundation-depth-issues": [
    { slug: "foundation-cost-per-metre", path: "/groundworks-costs/foundation-cost-per-metre", title: "Foundation cost per metre" },
    { slug: "underpinning-cost", path: "/groundworks-costs/underpinning-cost", title: "Underpinning cost" },
  ],
  "building-regs-foundation-compliance": [
    { slug: "extension-foundation-cost", path: "/groundworks-costs/extension-foundation-cost", title: "Extension foundation cost" },
    { slug: "groundworks-cost-overview", path: "/groundworks-costs/groundworks-cost-overview", title: "Groundworks cost overview" },
  ],
  "clay-soil-foundation-problems": [
    { slug: "ground-investigation-cost", path: "/groundworks-costs/ground-investigation-cost", title: "Ground investigation cost" },
    { slug: "foundation-cost-per-metre", path: "/groundworks-costs/foundation-cost-per-metre", title: "Foundation cost per metre" },
  ],
  "tree-impact-foundations": [
    { slug: "ground-investigation-cost", path: "/groundworks-costs/ground-investigation-cost", title: "Ground investigation cost" },
    { slug: "foundation-cost-per-metre", path: "/groundworks-costs/foundation-cost-per-metre", title: "Foundation cost per metre" },
  ],
  "foundation-remedial-work": [
    { slug: "underpinning-cost", path: "/groundworks-costs/underpinning-cost", title: "Underpinning cost" },
    { slug: "foundation-cost-per-metre", path: "/groundworks-costs/foundation-cost-per-metre", title: "Foundation cost per metre" },
  ],
  "underpinning-advice": [
    { slug: "underpinning-cost", path: "/groundworks-costs/underpinning-cost", title: "Underpinning cost" },
    { slug: "foundation-cost-per-metre", path: "/groundworks-costs/foundation-cost-per-metre", title: "Foundation cost per metre" },
  ],
  "structural-groundworks-consultation": [
    { slug: "groundworks-cost-overview", path: "/groundworks-costs/groundworks-cost-overview", title: "Groundworks cost overview" },
    { slug: "budgeting-for-groundworks", path: "/groundworks-costs/budgeting-for-groundworks", title: "Budgeting for groundworks" },
  ],
  "ground-investigation-services": [
    { slug: "ground-investigation-cost", path: "/groundworks-costs/ground-investigation-cost", title: "Ground investigation cost" },
    { slug: "groundworks-contingency-budget", path: "/groundworks-costs/groundworks-contingency-budget", title: "Groundworks contingency budget" },
  ],
  "soil-bearing-capacity-testing": [
    { slug: "ground-investigation-cost", path: "/groundworks-costs/ground-investigation-cost", title: "Ground investigation cost" },
    { slug: "foundation-cost-per-metre", path: "/groundworks-costs/foundation-cost-per-metre", title: "Foundation cost per metre" },
  ],
  "plate-load-testing": [
    { slug: "ground-investigation-cost", path: "/groundworks-costs/ground-investigation-cost", title: "Ground investigation cost" },
    { slug: "piling-cost-per-metre", path: "/groundworks-costs/piling-cost-per-metre", title: "Piling cost per linear metre" },
  ],
  "incremental-plate-load-testing": [
    { slug: "ground-investigation-cost", path: "/groundworks-costs/ground-investigation-cost", title: "Ground investigation cost" },
    { slug: "piling-cost-per-metre", path: "/groundworks-costs/piling-cost-per-metre", title: "Piling cost per linear metre" },
  ],
  "muck-away-services": [
    { slug: "site-clearance-muck-away-price", path: "/groundworks-costs/site-clearance-muck-away-price", title: "Site clearance and muck-away price" },
    { slug: "excavation-cost-per-cubic-metre", path: "/groundworks-costs/excavation-cost-per-cubic-metre", title: "Excavation cost per cubic metre" },
  ],
  "bulk-earthworks": [
    { slug: "groundworks-cost-overview", path: "/groundworks-costs/groundworks-cost-overview", title: "Groundworks cost overview" },
    { slug: "excavation-cost-per-cubic-metre", path: "/groundworks-costs/excavation-cost-per-cubic-metre", title: "Excavation cost per cubic metre" },
  ],
  "site-preparation-services": [
    { slug: "enabling-works-cost", path: "/groundworks-costs/enabling-works-cost", title: "Enabling works cost" },
    { slug: "site-clearance-muck-away-price", path: "/groundworks-costs/site-clearance-muck-away-price", title: "Site clearance and muck-away price" },
  ],
  "excavation-contractors": [
    { slug: "excavation-cost-per-cubic-metre", path: "/groundworks-costs/excavation-cost-per-cubic-metre", title: "Excavation cost per cubic metre" },
    { slug: "groundworks-cost-overview", path: "/groundworks-costs/groundworks-cost-overview", title: "Groundworks cost overview" },
  ],
  "site-clearance-contractors": [
    { slug: "site-clearance-cost", path: "/guides/site-clearance-cost", title: "Site Clearance Cost" },
    { slug: "site-clearance-muck-away-price", path: "/groundworks-costs/site-clearance-muck-away-price", title: "Site clearance and muck-away price" },
  ],
  "enabling-works-contractors": [
    { slug: "enabling-works-cost", path: "/groundworks-costs/enabling-works-cost", title: "Enabling works cost" },
    { slug: "groundworks-cost-overview", path: "/groundworks-costs/groundworks-cost-overview", title: "Groundworks cost overview" },
  ],
  "concrete-foundations": [
    { slug: "concrete-foundation-cost", path: "/groundworks-costs/concrete-foundation-cost", title: "Concrete foundation cost" },
    { slug: "foundation-cost-per-metre", path: "/groundworks-costs/foundation-cost-per-metre", title: "Foundation cost per metre" },
  ],
};

export const serviceFaqsBySlug: Record<string, { question: string; answer: string }[]> = {
  "groundworks-contractors": [
    {
      question: "What is included in a groundworks package?",
      answer:
        "A full groundworks package typically includes site clearance, excavation, piling or foundations, utility and service runs, and enabling works such as access and temporary site services. We tailor the scope to your project.",
    },
  ],
  "commercial-groundworks": [
    {
      question: "Can you deliver commercial groundworks as a single package?",
      answer:
        "Yes. We can deliver commercial groundworks as a coordinated package including enabling works, excavation, foundations and drainage interfaces with clear programme sequencing.",
    },
  ],
  earthworks: [
    {
      question: "What is included in an earthworks package?",
      answer:
        "Earthworks typically includes cut and fill operations, site regrading, formation preparation, and compaction to the required levels for downstream construction.",
    },
  ],
  "roads-and-sewers": [
    {
      question: "Do you take on roads and sewers packages for developments?",
      answer:
        "Yes. We deliver roads and sewers packages for development projects, coordinating drainage runs, formation works, and handover requirements.",
    },
  ],
  "attenuation-systems": [
    {
      question: "Do you install attenuation systems as part of wider groundworks?",
      answer:
        "Yes. We install attenuation systems alongside excavation and enabling works so surface water control is integrated into the wider groundworks programme.",
    },
  ],
  "piling-contractors": [
    { question: "When is piling required?", answer: "Piling is required when the ground cannot support conventional strip or pad foundations — for example on made ground, soft soils or where loads are high. A structural engineer will specify piling from the ground investigation." },
  ],
  "mini-piling-contractors": [
    { question: "What is mini piling?", answer: "Mini piling uses smaller rigs and section or CFA piles, ideal for low headroom, tight access or domestic projects. It provides the same load-bearing function as conventional piling where space is limited." },
  ],
  "excavation-contractors": [
    { question: "How deep can you excavate?", answer: "We carry out excavation to the depths required by your design, with appropriate support and edge protection. Bulk, strip and trench excavation are all within our capability." },
  ],
  "site-clearance-contractors": [
    { question: "Do you remove trees?", answer: "We can clear vegetation and remove trees as part of site clearance where required, subject to any tree preservation orders or planning conditions. We advise checking with your planning consultant first." },
  ],
  "foundation-contractors": [
    { question: "What types of foundations do you build?", answer: "We build strip foundations, pad foundations, raft foundations and piled foundations. The type is determined by the structural engineer and ground conditions." },
  ],
  "concrete-foundations": [
    { question: "Do you supply concrete?", answer: "Yes. We arrange quality-assured concrete supply and place reinforced and mass concrete for foundations, ground beams and blinding." },
  ],
  "enabling-works-contractors": [
    { question: "What are enabling works?", answer: "Enabling works prepare the site for main construction: access roads, temporary drainage, fencing, hoardings and temporary services so that the main contractor can start on programme." },
  ],
  "cfa-piling": [
    {
      question: "When is CFA piling used?",
      answer:
        "CFA piling is often chosen on urban or noise-sensitive sites and where vibration must be kept down. Your structural engineer will confirm it suits the loads and ground model for your project.",
    },
  ],
  underpinning: [
    {
      question: "Do I need underpinning or foundation repair?",
      answer:
        "Underpinning usually means extending or deepening foundations to stabilise the building. Foundation repair can cover localised fixes. A structural engineer defines the right method after assessment.",
    },
  ],
  "foundation-depth-issues": [
    {
      question: "When do shallow foundations need more than a simple repair?",
      answer:
        "If the foundations are too shallow for the ground conditions, frost depth or nearby trees, the fix often needs deeper support such as underpinning or piling. We work from the engineer's specification.",
    },
  ],
  "building-regs-foundation-compliance": [
    {
      question: "Can you help bring foundation works into compliance?",
      answer:
        "Yes. We review the issue, coordinate with the wider project team and deliver remedial works so the foundations align with building control and structural requirements.",
    },
  ],
  "clay-soil-foundation-problems": [
    {
      question: "How do you deal with clay soil movement?",
      answer:
        "We work with engineers to determine whether deeper foundations, underpinning or another remedial approach is needed. The right solution depends on the structure, the clay behavior and the ground investigation.",
    },
  ],
  "tree-impact-foundations": [
    {
      question: "Are nearby trees always a foundation risk?",
      answer:
        "Not always, but tree species, soil type and distance from the building all matter. We assess the risk with the engineer and then deliver the right foundation or remedial solution.",
    },
  ],
  "foundation-remedial-work": [
    {
      question: "Do you work from engineer-led remedial details?",
      answer:
        "Yes. We scope and deliver remedial foundation work from the agreed design, including sequencing, support and handover records.",
    },
  ],
  "underpinning-advice": [
    {
      question: "When is underpinning the right option?",
      answer:
        "Underpinning is usually chosen when existing foundations need deeper or wider support to stabilise movement or meet a revised design. A structural engineer confirms the method after assessment.",
    },
  ],
  "structural-groundworks-consultation": [
    {
      question: "Can you review foundation options before work starts?",
      answer:
        "Yes. We review drawings, site conditions and buildability concerns early so the project team can choose a practical groundworks route before work starts.",
    },
  ],
  "ground-investigation-services": [
    {
      question: "Do you coordinate ground investigation with the foundation design?",
      answer:
        "We work from the ground investigation findings and the engineer's design so the foundation route reflects what the site is actually doing.",
    },
  ],
  "soil-bearing-capacity-testing": [
    {
      question: "Why test soil bearing capacity before foundations?",
      answer:
        "Testing confirms whether the ground can carry the intended load and helps avoid under- or over-designed foundations on uncertain sites.",
    },
  ],
  "plate-load-testing": [
    {
      question: "When is plate load testing useful?",
      answer:
        "Plate load testing is useful when the engineer wants direct evidence of how the ground responds under load before finalising the foundation approach.",
    },
  ],
  "incremental-plate-load-testing": [
    {
      question: "What does incremental plate load testing tell you?",
      answer:
        "It shows how the ground behaves under staged loading, which gives a more detailed picture of settlement and bearing response.",
    },
  ],
  "foundation-repair": [
    {
      question: "Can you work from a structural engineer's report?",
      answer: "Yes. We scope and price from engineer drawings and specifications, and agree sequencing and protection before work starts.",
    },
  ],
  "muck-away-services": [
    {
      question: "What does muck away include?",
      answer:
        "Muck away includes loading, removal and disposal of spoil from excavation or site preparation, with the right waste documentation and route planning.",
    },
  ],
  "bulk-earthworks": [
    {
      question: "When do bulk earthworks become the right option?",
      answer:
        "Bulk earthworks are the right option when a site needs large-scale cut, fill or formation work to bring levels to design before the main build.",
    },
  ],
  "site-preparation-services": [
    {
      question: "What is included in site preparation services?",
      answer:
        "Site preparation can include clearance, spoil management, access, formation prep and early enabling works so the site is ready for the main build.",
    },
  ],
  "concrete-repair": [
    {
      question: "What concrete repairs do you take on?",
      answer: "We repair spalled, cracked and specified structural concrete elements, including prep, reinforcement treatment where required, and reinstatement to the agreed detail.",
    },
  ],
};

export const guidesIndexFeatured: { title: string; description: string; href: string; iconKey: "BookOpen" | "HelpCircle" }[] = [
  { title: "Piling cost guide", description: "What affects piling costs and how to budget.", href: "/guides/piling-cost", iconKey: "BookOpen" },
  { title: "Foundation costs", description: "Strip, pad, raft and piled foundation costs.", href: "/guides/foundation-cost", iconKey: "BookOpen" },
  { title: "Groundworks process", description: "How a typical groundworks project runs.", href: "/guides/groundworks-process", iconKey: "HelpCircle" },
];

export const guidesIndexNearMe: { title: string; href: string }[] = filterLocationsForService(
  PRIMARY_NEAR_ME_SERVICE_SLUG,
  locations
)
  .slice(0, 8)
  .map((loc) => ({
    title: `Groundworks in ${loc.name}`,
    href: `/${PRIMARY_NEAR_ME_SERVICE_SLUG}/${loc.id}`,
  }));

export const categoryAltText: Record<string, string> = {
  guides: "Groundworks guides and cost advice",
  "foundation-problems": "Foundation problems and repair",
  "ground-conditions": "Ground conditions for construction",
  "groundworks-costs": "Groundworks cost guides",
  "site-preparation": "Site preparation and enabling works",
  "driveway-groundworks": "Driveway groundworks",
  "construction-drainage": "Construction drainage",
};

export const categoryImages: Record<string, string> = {
  guides: "groundworks-contractors",
  "foundation-problems": "foundation-contractors",
  "ground-conditions": "piling-contractors",
  "groundworks-costs": "groundworks-contractors",
  "site-preparation": "site-clearance-contractors",
  "driveway-groundworks": "groundworks-contractors",
  "construction-drainage": "excavation-contractors",
};
