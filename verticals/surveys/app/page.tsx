import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { TrustPoints, TrustStrip, HomepageArticles, pickHomepageArticleCards, ProblemPreviewSection } from "engine";
import { verticalConfig } from "@/config";
import { blogPosts, getCategoryPages, getHubData, services } from "@/lib/data";
import { surveyProblemPages } from "@/data/problemPages";

export const metadata: Metadata = {
  title: "Mainline Surveys | Land & Drone Surveying Across the UK",
  description: "Professional land and drone surveys for planning, development and construction. Topographical, measured building, utility and drone survey services.",
  alternates: { canonical: "https://mainlinesurveys.co.uk" },
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
  const problemItems = surveyProblemPages.slice(0, 6).map((problem) => ({
    title: problem.title,
    href: `/drain-problems/${problem.slug}`,
    context: problem.whenToCall,
  }));

  return (
    <>
      <SchemaMarkup type="LocalBusiness" data={{ areaServed: "London and surrounding areas" }} />
      <Hero />
      <section className="border-b border-border bg-background py-6" aria-labelledby="core-services-heading">
        <div className="container">
          <TrustStrip className="mb-5" />
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
        title="Situations where a survey may be needed"
        intro="When planning decisions, boundary uncertainty, utility risk, or pre-purchase concerns appear, a targeted survey usually gives the evidence needed to move forward with confidence."
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
