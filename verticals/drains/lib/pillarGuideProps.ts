import { getCategoryPages } from "@/lib/data";
import { serviceImages } from "@/lib/images";
import { verticalConfig } from "@/config";
import { getServiceUrl, type PillarGuideSection } from "engine";

const guideFaqs = [
  {
    question: "Can a collapsed drain fix itself?",
    answer:
      "No. A collapsed drain will only get worse over time as soil washes into the void and the damage spreads. Professional repair is always needed.",
  },
  {
    question: "How long does drain repair take?",
    answer:
      "Simple relining can be completed in a day. Excavation repairs typically take 1-3 days depending on depth and location. Emergency repairs often start the same day.",
  },
  {
    question: "Will insurance cover drain damage?",
    answer:
      "Many home insurance policies cover sudden drain collapse. Gradual deterioration is less commonly covered. We provide detailed CCTV reports to support your claim.",
  },
  {
    question: "How much does drain relining cost?",
    answer:
      "Drain relining typically costs £1,000-£4,000 depending on pipe diameter, length, and access difficulty. It's usually cheaper than excavation.",
  },
  {
    question: "Do I need a CCTV drain survey?",
    answer:
      "A CCTV survey is essential for accurate diagnosis. It reveals the exact nature, location and severity of any problem, allowing us to recommend the most appropriate repair.",
  },
];

export function getCollapsedDrainsGuideProps() {
  const collapsePages = getCategoryPages("collapse");
  const causePages = getCategoryPages("causes");
  const inspectionPages = getCategoryPages("inspection");
  const repairPages = getCategoryPages("repair-methods");
  const costPages = getCategoryPages("costs");
  const insurancePages = getCategoryPages("insurance");

  const sections: PillarGuideSection[] = [
    {
      id: "signs",
      title: "Signs of a Collapsed Drain",
      intro:
        "A collapsed drain can go undetected for weeks, causing increasing damage. Key warning signs include slow drainage across multiple fixtures, foul sewage smells, sinkholes in the garden, recurring blockages, damp patches, and cracks in walls near drain runs.",
      links: collapsePages.slice(0, 4).map((p) => ({
        label: p.title,
        href: `/drain-collapse/${p.slug}`,
      })),
    },
    {
      id: "causes",
      title: "What Causes Drain Collapse",
      intro:
        "Drains collapse due to age-related deterioration of old clay pipes, tree root ingress cracking joints, ground movement from construction or subsidence, heavy vehicle loads above shallow pipes, and corrosion of metal pipework.",
      links: causePages.slice(0, 4).map((p) => ({
        label: p.title,
        href: `/drain-causes/${p.slug}`,
      })),
    },
    {
      id: "inspection",
      title: "How We Inspect Drains",
      intro:
        "CCTV drain surveys are the gold standard for diagnosing drainage problems. A high-resolution camera is fed through your pipes, revealing the exact condition, location and severity of any defects — without any digging.",
      links: inspectionPages.slice(0, 4).map((p) => ({
        label: p.title,
        href: `/drain-inspection/${p.slug}`,
      })),
    },
    {
      id: "repair",
      title: "Repair Methods",
      intro:
        "The right repair method depends on the type and extent of damage. Options range from no-dig relining for partial damage to full excavation for severe collapses. We always recommend the most cost-effective solution.",
      links: [
        ...repairPages.slice(0, 4).map((p) => ({
          label: p.title,
          href: `/drain-repair-methods/${p.slug}`,
        })),
        { label: "Drain Relining", href: getServiceUrl("drain-relining") },
        { label: "Drain Excavation", href: getServiceUrl("drain-excavation") },
        { label: "Drain Collapse Repair", href: getServiceUrl("drain-collapse-repair") },
      ],
    },
    {
      id: "costs",
      title: "Typical Repair Costs",
      intro:
        "Costs depend on the repair method, pipe depth, location, and extent of damage. A CCTV survey gives you the information needed for an accurate quote.",
      links: costPages.slice(0, 4).map((p) => ({
        label: p.title,
        href: `/drain-costs/${p.slug}`,
      })),
    },
    {
      id: "insurance",
      title: "Insurance & Claims",
      intro:
        "Many home insurance policies cover drain collapse repair. We help you through the claims process with detailed CCTV reports and documentation.",
      links: insurancePages.slice(0, 4).map((p) => ({
        label: p.title,
        href: `/drain-insurance/${p.slug}`,
      })),
    },
  ];

  const heroImage =
    serviceImages["drain-collapse-repair"] ?? "/images/services/drain-collapse-repair.jpg";

  return {
    heroTitle: "Collapsed Drains: The Complete Guide",
    heroSubtitle:
      "Everything you need to know about identifying, diagnosing, repairing and claiming for collapsed drains.",
    heroImage,
    guidePath: "/collapsed-drains-complete-guide",
    sections,
    guideFaqs,
    companyInfo: verticalConfig.companyInfo,
    baseUrl: verticalConfig.baseUrl,
    bottomCtaTitle: "Need Expert Help with a Collapsed Drain?",
    bottomCtaBody:
      "Contact us for a free CCTV survey and no-obligation repair quote.",
    callTrackVertical: verticalConfig.verticalId,
    ctaVariants: verticalConfig.ctaVariants,
    ctaBiasServiceSlug: "drain-collapse-repair",
  };
}
