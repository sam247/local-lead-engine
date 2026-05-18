import type { NavigationConfig } from "engine/components/navigation";

export const navigationConfig: NavigationConfig = {
  viewAllServicesHref: "/services",
  viewAllServicesLabel: "View All Services",
  serviceGroups: [
    {
      title: "Commercial & access",
      links: [
        { href: "/commercial-scaffolding", label: "Commercial scaffolding" },
        { href: "/roof-scaffolding", label: "Roof scaffolding" },
        { href: "/temporary-roofing", label: "Temporary roofing" },
        { href: "/access-scaffolding", label: "Access scaffolding" },
      ],
    },
    {
      title: "Domestic & specialist",
      links: [
        { href: "/domestic-scaffolding", label: "Domestic scaffolding" },
        { href: "/chimney-scaffolding", label: "Chimney scaffolding" },
        { href: "/scaffolding-hire", label: "Scaffolding hire" },
      ],
    },
  ],
};
