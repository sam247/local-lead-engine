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
        title="Common security issues"
        intro="If access control is failing, CCTV coverage has gaps, or breach risk is increasing, these pages outline the most common triggers and the next practical step."
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
