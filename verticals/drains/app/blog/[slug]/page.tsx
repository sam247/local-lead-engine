import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleDetailPage } from "engine";
import { blogPosts, getBlogPostBySlug } from "@/lib/blogData";
import { verticalConfig } from "@/config";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogPostBySlug(slug);
  if (!article) return { title: "Not Found" };
  return {
    title: article.title,
    description: article.metaDescription,
    alternates: { canonical: `${verticalConfig.baseUrl}/blog/${article.slug}` },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getBlogPostBySlug(slug);
  if (!article) notFound();

  return (
    <ArticleDetailPage
      article={article}
      companyInfo={verticalConfig.companyInfo}
      baseUrl={verticalConfig.baseUrl}
      ctaVariants={verticalConfig.ctaVariants}
    />
  );
}
