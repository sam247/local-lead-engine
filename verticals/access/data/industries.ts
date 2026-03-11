export interface IndustryPage {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  body: string;
  relatedServiceSlugs: string[];
}

export const industries: IndustryPage[] = [
  {
    slug: "hospital-security-systems",
    title: "Hospital Security Systems",
    metaDescription: "Access control, CCTV and integrated security systems for hospitals and healthcare facilities. Mainline Access designs and installs systems that meet NHS and healthcare compliance requirements.",
    intro: "Hospitals and healthcare facilities require robust, compliant security that protects staff, patients and assets without hindering day-to-day operations.",
    body: "We design and install access control, CCTV and integrated security systems for hospitals, clinics and healthcare sites. Our solutions support compliance with NHS and sector standards, with audit trails, restricted zones and integration with existing building and alarm systems. From main entrances and wards to pharmacy and IT areas, we specify systems that balance security with accessibility for staff and visitors.",
    relatedServiceSlugs: ["access-control-systems", "commercial-cctv-installation", "security-system-integration"],
  },
  {
    slug: "data-centre-security",
    title: "Data Centre Security",
    metaDescription: "Perimeter and access security for data centres. Access control, CCTV and intrusion detection for colocation and enterprise data halls.",
    intro: "Data centres need layered security: perimeter detection, controlled access and full audit trails for compliance and incident response.",
    body: "We provide access control, CCTV and perimeter security systems for data centres and server environments. Solutions include mantrap entry, badging, HD surveillance and integration with existing BMS and monitoring. We work with facilities teams to meet contractual and compliance requirements while keeping installation and maintenance disruption to a minimum.",
    relatedServiceSlugs: ["access-control-systems", "perimeter-security-systems", "ip-camera-systems", "security-system-integration"],
  },
  {
    slug: "warehouse-security",
    title: "Warehouse Security",
    metaDescription: "Access control and CCTV for warehouses and logistics. Secure loading bays, yards and perimeters with integrated surveillance.",
    intro: "Warehouses and logistics sites need reliable access control and visibility across loading bays, yards and perimeters.",
    body: "We install access control and CCTV systems for warehouses, distribution centres and logistics sites. Coverage includes gates, loading bays, yard and perimeter areas, with recording and remote viewing to support operations and incident review. Systems can integrate with existing security or building management where required.",
    relatedServiceSlugs: ["access-control-systems", "commercial-cctv-installation", "perimeter-security-systems"],
  },
  {
    slug: "commercial-building-security",
    title: "Commercial Building Security",
    metaDescription: "Access control, CCTV and integrated security for offices and commercial buildings. Design, installation and maintenance across London and the UK.",
    intro: "Commercial offices and mixed-use buildings need access control and CCTV that scale with tenant and landlord requirements.",
    body: "We design and install access control and CCTV for offices, business parks and commercial buildings. From single-tenant to multi-let sites, we provide systems that support reception, out-of-hours access and landlord reporting. Integration with existing door entry, CCTV or intruder systems is available where needed.",
    relatedServiceSlugs: ["access-control-systems", "commercial-cctv-installation", "ip-camera-systems", "security-system-integration"],
  },
];

export function getIndustryBySlug(slug: string): IndustryPage | undefined {
  return industries.find((i) => i.slug === slug);
}
