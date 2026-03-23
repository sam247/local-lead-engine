import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { TrustPoints, HomepageArticles, pickHomepageArticleCards } from "engine";
import { verticalConfig } from "@/config";
import { blogPosts, getCategoryPages, getHubData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mainline Groundworks | Piling, Excavation & Foundation Contractors UK",
  description: "Commercial groundworks contractors providing piling, excavation, site clearance and foundation construction across the UK.",
  alternates: { canonical: verticalConfig.baseUrl },
};

export default function HomePage() {
  const hub = getHubData("guides");
  const guidePages = getCategoryPages("guides");
  const fallbacks = hub
    ? guidePages.slice(0, 8).map((p) => ({
        title: p.title,
        intro: p.intro,
        href: `${hub.basePath}/${p.slug}`,
      }))
    : [];
  const articleCards = pickHomepageArticleCards(
    blogPosts.map((p) => ({ id: p.id, title: p.title, excerpt: p.excerpt })),
    fallbacks
  );

  return (
    <>
      <SchemaMarkup type="LocalBusiness" data={{ areaServed: "UK" }} />
      <Hero />
      <ServicesGrid />
      <TrustPoints items={verticalConfig.homepageTrustPoints} />
      <ProjectsPreview />
      <HomepageArticles cards={articleCards} />
      <Testimonials />
      <CTABanner />
    </>
  );
}
