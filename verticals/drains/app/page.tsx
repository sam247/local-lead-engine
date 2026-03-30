import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import { HomeTrustCoreBar } from "@/components/sections/HomeTrustCoreBar";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { TrustPoints, HomepageArticles, pickHomepageArticleCards, ProblemPreviewSection } from "engine";
import { verticalConfig } from "@/config";
import { blogPosts, getCategoryPages, getHubData, services } from "@/lib/data";
import { drainProblemPages } from "@/data/problemPages";

export const metadata: Metadata = {
  title: "Mainline Drains | Expert Drain Repair & Drainage Solutions Across the UK",
  description: "Trusted drainage experts across the UK. 24/7 emergency drain repair, CCTV surveys, drain relining and blocked drain clearance.",
  alternates: { canonical: "https://mainlinedrains.co.uk" },
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
  const problemItems = drainProblemPages.slice(0, 6).map((problem) => ({
    title: problem.title,
    href: `/drain-problems/${problem.slug}`,
    context: problem.whenToCall,
  }));

  return (
    <>
      <SchemaMarkup type="LocalBusiness" data={{ areaServed: "London and surrounding areas" }} />
      <Hero />
      <HomeTrustCoreBar coreServices={services.slice(0, Math.min(5, services.length))} />
      <ProblemPreviewSection
        title="Common drainage issues"
        intro="If drains are backing up, flooding, smelling, or repeatedly slowing down, these are usually signs of an issue that needs proper diagnosis before disruption gets worse."
        items={problemItems}
      />
      <ServicesGrid />
      <TrustPoints items={verticalConfig.homepageTrustPoints} />
      <ProjectsPreview />
      <HomepageArticles cards={articleCards} />
      <Testimonials />
      <CTABanner />
    </>
  );
}
