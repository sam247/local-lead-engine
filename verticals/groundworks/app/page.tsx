import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { TrustPoints, HomepageArticles, pickHomepageArticleCards, ProblemPreviewSection } from "engine";
import { verticalConfig } from "@/config";
import { blogPosts, getCategoryPages, getHubData, services } from "@/lib/data";
import { groundworksProblemPages } from "@/data/problemPages";

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
  const problemItems = groundworksProblemPages.slice(0, 6).map((problem) => ({
    title: problem.title,
    href: `/foundation-problems/${problem.slug}`,
    context: problem.whenToCall,
  }));

  return (
    <>
      <SchemaMarkup type="LocalBusiness" data={{ areaServed: "UK" }} />
      <Hero />
      <section className="border-b border-border bg-background py-6" aria-labelledby="core-services-heading">
        <div className="container">
          <h2 id="core-services-heading" className="mb-3 font-display text-lg font-semibold text-foreground">
            Core services
          </h2>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {services.slice(0, Math.min(5, services.length)).map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="text-primary hover:underline">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ProblemPreviewSection
        title="Common ground and foundation issues"
        intro="When subsidence, unstable ground, waterlogged formations, or foundation cracking start to affect programme certainty, these issue pages help teams move from concern to action."
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
