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
