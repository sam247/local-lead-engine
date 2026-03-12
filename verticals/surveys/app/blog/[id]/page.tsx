import { notFound } from "next/navigation";
import { blogPosts, services, locations, hubPages, getCategoryPages } from "@/lib/data";
import { getBlogArticleContent } from "@/lib/blogArticleContent";
import { verticalConfig } from "@/config";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import BlogArticleContent from "@/components/pages/BlogArticleContent";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ id: p.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);
  if (!post) return { title: "Not Found" };
  const content = getBlogArticleContent(id);
  const description =
    post.excerpt.slice(0, 160) ||
    (content?.sections[0]?.body.slice(0, 157).replace(/\[[^\]]*\]\([^)]*\)/g, "").trim() + "...") ||
    post.title;
  return {
    title: `${post.title} | Mainline Surveys`,
    description,
    alternates: { canonical: `${verticalConfig.baseUrl}/blog/${id}` },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);
  const content = post ? getBlogArticleContent(id) : null;
  if (!post || !content) notFound();

  const postWithSlugs = post as typeof post & { relatedServiceSlugs?: string[] };
  const relatedServiceSlugs =
    (postWithSlugs.relatedServiceSlugs?.length ?? 0) > 0
      ? (postWithSlugs.relatedServiceSlugs ?? []).slice(0, 4)
      : services.slice(0, 4).map((s) => s.slug);

  const guidesHub = hubPages.find((h) => getCategoryPages(h.category).length > 0);
  const relatedGuideLinks = guidesHub
    ? getCategoryPages(guidesHub.category)
        .slice(0, 4)
        .map((p) => ({ title: p.title, href: `${guidesHub.basePath}/${p.slug}` }))
    : [];

  return (
    <>
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${id}` },
          ],
        }}
      />
      <BlogArticleContent
        post={post}
        content={content}
        relatedServiceSlugs={relatedServiceSlugs}
        services={services}
        locations={locations}
        relatedGuideLinks={relatedGuideLinks}
        crossVerticalLinks={verticalConfig.crossVerticalLinks}
        servicesPath="/services"
        locationLinkPath={(slug, locId) => `/${slug}/${locId}`}
      />
    </>
  );
}
