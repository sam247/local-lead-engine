import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/data";
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
    title: `${post.title} | Mainline Groundworks`,
    description,
    alternates: { canonical: `${verticalConfig.baseUrl}/blog/${id}` },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);
  const content = post ? getBlogArticleContent(id) : null;
  if (!post || !content) notFound();

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
      <BlogArticleContent post={post} content={content} />
    </>
  );
}
