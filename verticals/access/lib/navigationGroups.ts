import type { NavigationConfig } from "engine/components/navigation";

export const navigationConfig: NavigationConfig = {
  viewAllServicesHref: "/services",
  viewAllServicesLabel: "View All Services",
  serviceGroups: [
    {
      title: "Security systems",
      links: [
        { href: "/access-control-systems", label: "Access control systems" },
        { href: "/commercial-cctv-installation", label: "Commercial CCTV installation" },
        { href: "/ip-camera-systems", label: "IP camera systems" },
      ],
    },
    {
      title: "Perimeter & integration",
      links: [
        { href: "/perimeter-security-systems", label: "Perimeter security systems" },
        { href: "/security-system-integration", label: "Security system integration" },
      ],
    },
  ],
};
