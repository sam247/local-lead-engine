import { getCategoryPages } from "@/lib/data";
import { serviceImages } from "@/lib/images";
import { verticalConfig } from "@/config";
import type { PillarGuideSection } from "engine";

const guideFaqs = [
  {
    question: "Do I need a survey for planning permission?",
    answer:
      "Most planning applications need an up-to-date topographical survey and often a measured building survey of existing structures. Your architect or planning consultant can confirm local requirements.",
  },
  {
    question: "How much does a topographical survey cost?",
    answer:
      "Costs depend on site size and detail. Small residential plots typically range from around £600–£1,200 + VAT; larger sites £1,500–£4,000+. Our partners provide fixed quotes once scope is clear.",
  },
  {
    question: "When should I use a drone survey?",
    answer:
      "Drone surveys are ideal for large sites, roof inspections, progress monitoring and volume calculations. For small urban plots or fine internal detail, ground survey may be better.",
  },
  {
    question: "How long does a survey take?",
    answer:
      "On-site work is often one day for a typical dwelling plot; drawings are usually delivered within a few days to a week. Larger or drone surveys may need more time for processing.",
  },
  {
    question: "Do you offer free quotes?",
    answer:
      "Yes. We provide free, no-obligation survey quotes. Share your site and requirements and we'll match you with a qualified survey partner.",
  },
];

export function getCollapsedDrainsGuideProps() {
  const guidesPages = getCategoryPages("guides");
  const costPages = getCategoryPages("costs");

  const sections: PillarGuideSection[] = [
    {
      id: "when-you-need-a-survey",
      title: "When You Need a Survey",
      intro:
        "Planning applications, extensions, development and design work usually need accurate site information. Our guides explain when to commission a topographical, measured building, utility or drone survey.",
      links: guidesPages.slice(0, 4).map((p) => ({
        label: p.title,
        href: `/survey-guides/${p.slug}`,
      })),
    },
    {
      id: "planning-and-development",
      title: "Planning & Development",
      intro:
        "Survey requirements for planning permission, extensions and property development. Get the right scope from the start to avoid delays and refusals.",
      links: guidesPages.filter((p) => p.slug.includes("planning") || p.slug.includes("extension") || p.slug.includes("development")).slice(0, 4).map((p) => ({
        label: p.title,
        href: `/survey-guides/${p.slug}`,
      })),
    },
    {
      id: "survey-technology",
      title: "Survey Technology",
      intro:
        "How total stations, GNSS, laser scanning, GPR and drone mapping work. Understand the equipment and methods used by surveyors.",
      links: guidesPages.filter((p) => p.slug.includes("total-station") || p.slug.includes("gnss") || p.slug.includes("lidar") || p.slug.includes("gpr") || p.slug.includes("drone-mapping")).slice(0, 4).map((p) => ({
        label: p.title,
        href: `/survey-guides/${p.slug}`,
      })),
    },
    {
      id: "drone-surveys",
      title: "Drone Surveys",
      intro:
        "When to use drone surveys, how they work, accuracy and timescales. Drone surveys are ideal for large sites, roof inspections and progress monitoring.",
      links: guidesPages.filter((p) => p.slug.includes("drone")).slice(0, 4).map((p) => ({
        label: p.title,
        href: `/survey-guides/${p.slug}`,
      })),
    },
    {
      id: "costs",
      title: "Survey Costs",
      intro:
        "Typical UK cost ranges for topographical, measured building, utility and drone surveys. Costs depend on site size, complexity and deliverables.",
      links: costPages.slice(0, 4).map((p) => ({
        label: p.title,
        href: `/drain-costs/${p.slug}`,
      })),
    },
    {
      id: "need-help",
      title: "Not Sure Which Survey You Need?",
      intro:
        "Use our decision guide to find out which survey type fits your project, then request a free quote.",
      links: [
        { label: "Do I Need a Land Survey?", href: "/do-i-need-a-drain-survey" },
        { label: "Survey FAQ", href: "/drainage-faq" },
        { label: "Request a Quote", href: "/contact" },
      ],
    },
  ];

  const heroImage =
    serviceImages["topographical-survey"] ?? "/images/services/topographical-survey.jpg";

  return {
    heroTitle: "Survey Guides",
    heroSubtitle:
      "When you need a survey, which type to choose, and how much it costs. Planning, development and construction.",
    heroImage,
    guidePath: "/collapsed-drains-complete-guide",
    sections,
    guideFaqs,
    companyInfo: verticalConfig.companyInfo,
    baseUrl: verticalConfig.baseUrl,
    bottomCtaTitle: "Need a Survey Quote?",
    bottomCtaBody:
      "Contact us for a free, no-obligation quote. We'll match you with a qualified survey partner.",
    callTrackVertical: verticalConfig.verticalId,
  };
}
