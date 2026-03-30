import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import { HomeTrustCoreBar } from "@/components/sections/HomeTrustCoreBar";
import { HomeProblemPreviewSection } from "@/components/sections/HomeProblemPreviewSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { TrustPoints, HomepageArticles, pickHomepageArticleCards } from "engine";
import { verticalConfig } from "@/config";
import { blogPosts, getCategoryPages, getHubData } from "@/lib/data";
import { accessProblemPages } from "@/data/problemPages";

export const metadata: Metadata = {
  title: "Mainline Access | Commercial Access Control and Security Systems",
  description: "Access control, CCTV and integrated security systems for hospitals, data centres, warehouses and commercial buildings. Request a security consultation.",
  alternates: { canonical: "https://mainlineaccess.co.uk" },
};

export default function HomePage() {
  const hub = getHubData("cctv-guides");
  const guidePages = getCategoryPages("cctv-guides");
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
  const problemItems = accessProblemPages.slice(0, 6).map((problem) => ({
    title: problem.title,
    href: `/${problem.hub}/${problem.slug}`,
    context: problem.whenToCall,
  }));

  return (
    <>
      <SchemaMarkup type="LocalBusiness" data={{ areaServed: "London and surrounding areas" }} />
      <Hero />
      <HomeTrustCoreBar />
      <section className="py-4">
        <div className="container">
          <p className="mx-auto max-w-2xl text-center text-base text-muted-foreground">
            Tell us what&apos;s going on — we&apos;ll connect you with the right specialist near you.
          </p>
        </div>
      </section>
      <HomeProblemPreviewSection
        title="What's the issue with your system?"
        intro="Select the issue below to get matched with a specialist near you."
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
