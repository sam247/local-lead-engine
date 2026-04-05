import Link from "next/link";
import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { TrustPoints } from "engine";
import { verticalConfig } from "@/config";
import { blogPosts } from "@/lib/blogData";
import { getBlogImage } from "@/lib/images";
import { ArrowRight, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Mainline Scaffold | NASC Accredited Scaffolding Contractors UK",
  description:
    "NASC accredited scaffolding contractors providing domestic, commercial, roof, chimney and emergency scaffolding across the UK. Free quotes — rapid mobilisation.",
  alternates: { canonical: verticalConfig.baseUrl },
};

export default function HomePage() {
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <>
      <SchemaMarkup type="LocalBusiness" data={{ areaServed: "UK" }} />
      <Hero />
      <ServicesGrid />
      <TrustPoints
        items={verticalConfig.homepageTrustPoints}
        className="[&_li>span:first-child]:h-[3.75rem] [&_li>span:first-child]:w-[3.75rem] [&_li_svg]:h-8 [&_li_svg]:w-8 [&_li_svg]:text-muted-foreground/90"
      />
      <ProjectsPreview />
      {featuredPosts.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Scaffolding guides and advice
              </h2>
              <p className="mt-2 text-muted-foreground">Practical information from our scaffolding team.</p>
            </div>
            <ul className="grid gap-6 md:grid-cols-3">
              {featuredPosts.map((post, index) => (
                <li key={post.slug}>
                  <Card className="group h-full overflow-hidden border-border bg-card transition-all hover:shadow-lg">
                    <Link href={`/blog/${post.slug}`} className="block aspect-video overflow-hidden">
                      <img
                        src={getBlogImage(post, index)}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </Link>
                    <CardHeader>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <CardTitle className="font-display text-lg group-hover:text-primary">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </CardTitle>
                      <CardDescription>{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      >
                        Read more
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
            <div className="mt-10 text-center">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                View all articles
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      )}
      <Testimonials />
      <CTABanner />
    </>
  );
}
