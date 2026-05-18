import type { NavigationConfig } from "engine/components/navigation";

/**
 * Header mega menu: service hubs (`/{slug}`) and topic hubs only — matches public routes.
 */
export const navigationConfig: NavigationConfig = {
  viewAllServicesHref: "/services",
  viewAllServicesLabel: "View All Services",
  serviceGroups: [
    {
      title: "Foundations & structural",
      links: [
        { href: "/foundation-contractors", label: "Foundation contractors" },
        { href: "/commercial-groundworks", label: "Foundation & structural packages" },
        { href: "/underpinning", label: "Foundation underpinning" },
        { href: "/mini-piling-contractors", label: "Mini piling" },
        { href: "/cfa-piling", label: "CFA piling" },
        { href: "/piling-contractors", label: "Piling foundations" },
        { href: "/ground-investigation-services", label: "Ground investigation" },
        { href: "/soil-bearing-capacity-testing", label: "Soil testing services" },
        { href: "/foundation-repair", label: "Foundation repair" },
        { href: "/clay-soil-foundation-problems", label: "Clay soil foundation problems" },
      ],
    },
    {
      title: "Earthworks & enabling",
      links: [
        { href: "/bulk-earthworks", label: "Bulk excavation services" },
        { href: "/earthworks", label: "Earthworks" },
        { href: "/site-clearance-contractors", label: "Site clearance" },
        { href: "/muck-away-services", label: "Muck away services" },
        { href: "/structural-groundworks-consultation", label: "Groundworks for developments" },
        { href: "/groundworks-contractors", label: "Groundworks for new builds" },
        { href: "/enabling-works-contractors", label: "Enabling works" },
        { href: "/excavation-contractors", label: "Excavation contractors" },
        { href: "/site-preparation-services", label: "Site preparation" },
      ],
    },
    {
      title: "Drainage & infrastructure",
      links: [
        { href: "/construction-drainage/installing-soakaways-new-build", label: "Soakaway installation" },
        { href: "/attenuation-systems", label: "Attenuation systems" },
        { href: "/construction-drainage/green-drainage-suds", label: "SuDS drainage" },
        { href: "/construction-drainage/surface-water-drainage-installation", label: "Surface water drainage" },
        { href: "/construction-drainage/planning-drainage-new-housing", label: "Commercial site drainage" },
        { href: "/roads-and-sewers", label: "Roads & sewers" },
        { href: "/construction-drainage/drainage-adoption-s104", label: "Section 104 drainage" },
        { href: "/construction-drainage/surface-water-separation-foul", label: "Stormwater management" },
        { href: "/construction-drainage/drainage-under-buildings", label: "Site drainage" },
      ],
    },
    {
      title: "Retaining & external works",
      links: [
        { href: "/site-preparation/retaining-wall-construction", label: "Retaining wall construction" },
        { href: "/guides/retaining-wall-guide", label: "Retaining wall systems" },
        { href: "/ground-conditions/ground-anchors-retaining", label: "Reinforced retaining walls" },
        { href: "/groundworks-costs/retaining-wall-cost-per-metre", label: "Retaining wall costs" },
        { href: "/site-preparation/access-road-construction", label: "Access roads & hardstanding" },
        { href: "/concrete-foundations", label: "Concrete foundations" },
        { href: "/site-preparation/site-compound-set-up", label: "External works & site compound" },
      ],
    },
  ],
};
