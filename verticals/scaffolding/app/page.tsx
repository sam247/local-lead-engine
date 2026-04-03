import Link from "next/link";
import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { TrustPoints, pickHomepageArticleCards } from "engine";
import { verticalConfig } from "@/config";
import { blogPosts, getCategoryPages, getHubData } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Mainline Scaffold | NASC Accredited Scaffolding Contractors UK",
  description:
    "NASC accredited scaffolding contractors providing domestic, commercial, roof, chimney and emergency scaffolding across the UK. Free quotes — rapid mobilisation.",
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
    blogPosts.map((p) => ({ id: p.id, title: p.title, excerpt: "" })),
    fallbacks
  );

  return (
    <>
      <SchemaMarkup type="LocalBusiness" data={{ areaServed: "UK" }} />
      <Hero />
      <ServicesGrid />
      <TrustPoints
        items={verticalConfig.homepageTrustPoints}
        className="[&_li>span:first-child]:h-[3.75rem] [&_li>span:first-child]:w-[3.75rem] [&_li_svg]:h-8 [&_li_svg]:w-8 [&_li_svg]:text-muted-foreground/90"
      />
      {articleCards.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Scaffolding guides and advice
              </h2>
              <p className="mt-2 text-muted-foreground">Practical information from our scaffolding team.</p>
            </div>
            <ul className="grid gap-6 md:grid-cols-3">
              {articleCards.map((card) => (
                <li key={card.href}>
                  <article className="flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      <Link href={card.href} className="hover:text-primary">
                        {card.title}
                      </Link>
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{card.excerpt}</p>
                    <Link href={card.href} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                      Read more
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <Testimonials />
      <CTABanner />
    </>
  );
}
