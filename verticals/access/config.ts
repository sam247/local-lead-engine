import { companyInfo } from "@/lib/data";
import type { VerticalConfig } from "engine";

/** Partner site for cross-vertical linking (surveys). */
export const partnerBaseUrl = "https://mainlinesurveys.co.uk";
export const partnerTopographicalSurveyPath = "/services/topographical-survey";

/** Partner site for cross-vertical linking (drains). */
export const partnerDrainsBaseUrl = "https://mainlinedrains.co.uk";

const serviceTypesBySlug: Record<string, string[]> = {
  "access-control-systems": ["Card and fob access", "Keypad entry", "Biometric readers", "Intercom and video entry", "Integration with building systems"],
  "commercial-cctv-installation": ["Fixed and PTZ cameras", "Indoor and outdoor", "NVR and cloud recording", "Remote viewing and analytics"],
  "ip-camera-systems": ["PoE and wireless IP cameras", "4K and megapixel", "VMS integration", "Edge and cloud recording"],
  "perimeter-security-systems": ["PIR and beam detection", "Fence and boundary sensors", "Outdoor CCTV", "Alarm and monitoring integration"],
  "security-system-integration": ["Access with CCTV", "Single platform monitoring", "Intruder and fire integration", "BMS and legacy system integration"],
};

export const verticalConfig: VerticalConfig = {
  verticalId: "access",
  siteName: "Mainline Access",
  baseUrl: "https://mainlineaccess.co.uk",
  primaryService: "Access Control Systems",
  industry: "Commercial access control and security systems",
  heroSecondaryCtaText: "Get Security System Quote",
  problemLabel: "Access Problems",
  relatedServicesLabel: "Access",
  serviceTypesBySlug,
  industries: ["Hospitals", "Data centres", "Warehouses", "Office buildings", "Manufacturing sites", "Commercial property"],
  trustedEquipment: ["Major access control brands", "CCTV and VMS platforms", "Intruder and fire systems", "Building management integration"],
  sectionIntros: {
    types: "Security and access solutions can include access control, CCTV, perimeter detection and integration with existing systems. We specify and install the right combination for your site, from single-door systems to multi-site platforms.",
    process: "We work from initial site survey and design through to installation, commissioning and handover. You get a single point of contact, clear documentation and support so your systems perform as specified.",
    industries: "We install and maintain security systems for a wide range of sectors. From offices and retail to healthcare, data centres and industrial sites, we tailor solutions to each environment and compliance need.",
    benefits: "A single supplier for access and security simplifies procurement and support. We deliver on programme, integrate with major brands and building systems, and provide ongoing maintenance and documentation.",
  },
  relatedServicesIntro:
    "Security and access solutions can include access control, CCTV, perimeter detection and integration with existing systems. In addition to the service above, we offer the following so you can find the right combination for your site.",
  relatedLocationsIntro:
    "We install and maintain security systems across the UK. Select an area below for local information and contact options.",
  crossVerticalLinks: [
    { label: "Topographical surveys", url: `${partnerBaseUrl}${partnerTopographicalSurveyPath}` },
  ],
  locationContextTemplate:
    "We provide {serviceTitle} across {locationName} and the {area} region for commercial and public-sector sites. Our engineers install and maintain access control, CCTV and integrated security systems throughout the area, including in {nearbyTowns}. Contact us for a free site survey and quote for your project in or around {locationName}.",
  companyInfo: {
    name: companyInfo.name,
    phone: companyInfo.phone,
    email: companyInfo.email,
    address: companyInfo.address,
    hours: companyInfo.hours,
    social: companyInfo.social,
    aggregateRating: {
      ratingValue: 4.9,
      reviewCount: 120,
      bestRating: 5,
    },
  },
};
