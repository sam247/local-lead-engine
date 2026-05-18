import type { NavigationConfig } from "engine/components/navigation";

export const navigationConfig: NavigationConfig = {
  viewAllServicesHref: "/services",
  viewAllServicesLabel: "View All Services",
  serviceGroups: [
    {
      title: "Commercial drainage",
      links: [
        { href: "/cctv-drain-surveys", label: "CCTV drain surveys" },
        { href: "/commercial-drainage", label: "Commercial drainage" },
        { href: "/site-drainage", label: "Site drainage" },
        { href: "/surface-water-drainage", label: "Surface water drainage" },
      ],
    },
    {
      title: "Infrastructure",
      links: [
        { href: "/soakaway-installation", label: "Soakaway installation" },
        { href: "/attenuation-systems", label: "Attenuation systems" },
        { href: "/suds-drainage", label: "SuDS drainage" },
        { href: "/surface-water-drainage", label: "Surface water & stormwater" },
        { href: "/drain-relining", label: "Drain relining" },
        { href: "/drain-pipe-replacement", label: "Drain pipe replacement" },
        { href: "/drain-excavation", label: "Drain excavation" },
      ],
    },
  ],
};
