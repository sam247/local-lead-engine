import type { NavigationConfig } from "engine/components/navigation";

export const navigationConfig: NavigationConfig = {
  viewAllServicesHref: "/services",
  viewAllServicesLabel: "View All Services",
  serviceGroups: [
    {
      title: "Property & building surveys",
      links: [
        { href: "/boundary-survey", label: "Boundary surveys" },
        { href: "/measured-building-survey", label: "Measured building surveys" },
        { href: "/topographical-survey", label: "Topographical surveys" },
        { href: "/building-surveys", label: "Building surveys" },
        { href: "/party-wall-surveyors", label: "Party wall surveyors" },
      ],
    },
    {
      title: "Ground & engineering",
      links: [
        { href: "/utility-survey", label: "Utility surveys" },
        { href: "/utility-mapping-survey", label: "Utility mapping" },
        { href: "/laser-scanning-survey", label: "Engineering & laser scanning surveys" },
        { href: "/survey-guides/what-is-a-total-station", label: "Setting out & precision survey" },
      ],
    },
    {
      title: "Land & development",
      links: [
        { href: "/drone-survey", label: "Land & drone surveys" },
        { href: "/drone-topographical-survey", label: "Development topographical (drone)" },
        { href: "/drone-construction-survey", label: "Construction & progress surveys" },
        { href: "/drone-building-inspection", label: "Building inspection (drone)" },
      ],
    },
  ],
};
