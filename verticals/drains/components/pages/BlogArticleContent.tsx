import Link from "next/link";
import { BreadcrumbNav } from "engine";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FAQSchema from "@/components/sections/FAQSchema";
import {
  getBlogArticleContent,
  parseBodyWithLinks,
  type BlogArticleContent as BlogArticleContentType,
} from "@/lib/blogArticleContent";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  imagePrompt?: string;
  category: string;
}

interface BlogArticleContentProps {
  post: BlogPost;
  content: BlogArticleContentType;
}

export default function BlogArticleContent({ post, content }: BlogArticleContentProps) {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.id}` },
  ];

  return (
    <>
      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <BreadcrumbNav items={breadcrumbs} variant="inverse" />
            <div className="mt-4 flex flex-wrap items-center gap-2 text-primary-foreground/80">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                {post.category}
              </Badge>
              <span className="flex items-center gap-1 text-sm">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      <article className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            {content.sections.map((section, i) => (
              <section key={i} className="mb-10">
                <h2 className="mb-4 font-display text-2xl font-bold">{section.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {parseBodyWithLinks(section.body).map((segment, j) =>
                    segment.type === "text" ? (
                      <span key={j}>{segment.value}</span>
                    ) : (
                      <Link
                        key={j}
                        href={segment.href}
                        className="font-medium text-primary underline underline-offset-2 hover:text-primary/90"
                      >
                        {segment.text}
                      </Link>
                    )
                  )}
                </p>
              </section>
            ))}

            {content.faqs && content.faqs.length > 0 && (
              <div className="mt-12">
                <FAQSchema items={content.faqs} title={`${post.title} – FAQ`} />
              </div>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
