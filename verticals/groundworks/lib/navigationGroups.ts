import type { NavigationConfig } from "engine/components/navigation";

/**
 * Header mega menu: commercial service hubs and topic routes in columns;
 * guides, costs and diagnosis sit in {@link NavigationConfig.planningSection}.
 */
export const navigationConfig: NavigationConfig = {
  viewAllServicesHref: "/services",
  viewAllServicesLabel: "View all services",
  serviceGroups: [
    {
      title: "Foundations & piling",
      links: [
        {
          href: "/commercial-groundworks",
          label: "Groundworks for developments",
          commercialTier: "primary",
          microLabel: "Commercial",
        },
        {
          href: "/structural-groundworks-consultation",
          label: "Structural groundworks packages",
          commercialTier: "primary",
          microLabel: "Commercial",
        },
        { href: "/foundation-contractors", label: "Foundation contractors", commercialTier: "primary" },
        { href: "/underpinning", label: "Underpinning", commercialTier: "primary" },
        {
          href: "/piling-contractors",
          label: "Piling foundations",
          commercialTier: "primary",
          microLabel: "Infrastructure",
        },
        { href: "/mini-piling-contractors", label: "Mini piling", commercialTier: "primary" },
        { href: "/cfa-piling", label: "CFA piling" },
        { href: "/foundation-repair", label: "Foundation repair" },
        { href: "/ground-investigation-services", label: "Ground investigation" },
        { href: "/soil-bearing-capacity-testing", label: "Soil bearing capacity testing" },
      ],
    },
    {
      title: "Earthworks & enabling",
      links: [
        {
          href: "/bulk-earthworks",
          label: "Bulk earthworks & excavation",
          commercialTier: "primary",
          microLabel: "Commercial",
        },
        { href: "/earthworks", label: "Earthworks", commercialTier: "primary", microLabel: "Commercial" },
        {
          href: "/enabling-works-contractors",
          label: "Enabling works",
          commercialTier: "primary",
          microLabel: "Commercial",
        },
        { href: "/excavation-contractors", label: "Excavation contractors", commercialTier: "primary" },
        { href: "/site-clearance-contractors", label: "Site clearance" },
        { href: "/muck-away-services", label: "Muck away" },
        { href: "/site-preparation-services", label: "Site preparation" },
        { href: "/groundworks-contractors", label: "Groundworks contractors" },
        { href: "/concrete-foundations", label: "Concrete foundations" },
      ],
    },
    {
      title: "Drainage & infrastructure",
      links: [
        {
          href: "/roads-and-sewers",
          label: "Roads & sewers",
          commercialTier: "primary",
          microLabel: "Infrastructure",
        },
        {
          href: "/attenuation-systems",
          label: "Attenuation systems",
          commercialTier: "primary",
          microLabel: "Infrastructure",
        },
        {
          href: "/construction-drainage/foul-drainage-new-build",
          label: "Commercial site drainage",
          commercialTier: "primary",
          microLabel: "Commercial",
        },
        {
          href: "/construction-drainage/installing-soakaways-new-build",
          label: "Soakaway installation",
          commercialTier: "primary",
        },
        { href: "/construction-drainage/surface-water-drainage-installation", label: "Surface water drainage" },
        { href: "/construction-drainage/drainage-adoption-s104", label: "Section 104 adoption" },
        { href: "/construction-drainage/green-drainage-suds", label: "SuDS & green drainage" },
        { href: "/construction-drainage/drainage-under-buildings", label: "Drainage under buildings" },
        { href: "/construction-drainage/surface-water-separation-foul", label: "Foul & storm separation" },
      ],
    },
    {
      title: "Structures & external works",
      links: [
        {
          href: "/site-preparation/retaining-wall-construction",
          label: "Retaining wall construction",
          commercialTier: "primary",
        },
        { href: "/site-preparation/access-road-construction", label: "Access roads & hardstanding" },
        { href: "/site-preparation/site-compound-set-up", label: "Site compound & external works" },
      ],
    },
  ],
  planningSection: {
    title: "Guides & project planning",
    links: [
      { href: "/foundation-problems", label: "Foundation issue guides" },
      { href: "/ground-conditions", label: "Ground condition guides" },
      { href: "/clay-soil-foundation-problems", label: "Clay soil & shrink–swell" },
      { href: "/underpinning-advice", label: "Underpinning guidance" },
      { href: "/guides/retaining-wall-guide", label: "Retaining wall design guide" },
      { href: "/groundworks-costs/retaining-wall-cost-per-metre", label: "Retaining wall costs" },
      { href: "/groundworks-costs/budgeting-for-groundworks", label: "Budgeting for groundworks" },
      { href: "/ground-conditions/ground-anchors-retaining", label: "Ground anchors & retaining" },
    ],
  },
};
