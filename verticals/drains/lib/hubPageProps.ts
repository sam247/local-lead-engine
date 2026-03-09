import {
  getCategoryPages,
  getHubData,
  hubPages,
  services,
  categoryImages,
  categoryAltText,
} from "@/lib/data";
import { getHeroImage } from "@/lib/images";
import { verticalConfig } from "@/config";
import type { CrossSection } from "engine";

function categorisePages(category: string): CrossSection[] {
  const symptomCategories = ["problems"];
  const repairCategories = ["repair-methods"];
  const inspectionCategories = ["inspection", "survey"];
  const costCategories = ["costs"];
  const allCategories = [
    { label: "Symptom Guides", cats: symptomCategories },
    { label: "Repair Methods", cats: repairCategories },
    { label: "Inspection Guides", cats: inspectionCategories },
    { label: "Cost Guides", cats: costCategories },
  ];
  return allCategories
    .filter((section) => !section.cats.includes(category))
    .map((section) => ({
      label: section.label,
      pages: section.cats.flatMap((cat) => {
        const hub = hubPages.find((h) => h.category === cat);
        return getCategoryPages(cat).slice(0, 3).map((p) => ({
          slug: p.slug,
          title: p.title,
          intro: p.intro,
          basePath: hub?.basePath ?? "",
        }));
      }),
    }))
    .filter((s) => s.pages.length > 0);
}

export function getHubPageProps(category: string) {
  const hub = getHubData(category);
  const pages = getCategoryPages(category);
  if (!hub || pages.length === 0) return null;
  const keyServices = services.filter((s) =>
    ["drain-collapse-repair", "cctv-drain-surveys", "drain-excavation"].includes(
      s.slug
    )
  );
  const heroImage = getHeroImage({
    category,
    categoryImagesMap: categoryImages,
  });
  const heroAlt =
    categoryAltText[category] || `${hub.title} - drainage services`;
  const crossSections = categorisePages(category);
  const pillarGuides = [
    { title: "Collapsed Drains Complete Guide", href: "/collapsed-drains-complete-guide" },
    { title: "CCTV Drain Survey Guide", href: "/drain-survey" },
  ];
  return {
    hub,
    pages,
    heroImage,
    heroAlt,
    crossSections,
    keyServices,
    companyInfo: verticalConfig.companyInfo,
    baseUrl: verticalConfig.baseUrl,
    pillarGuides,
  };
}
