import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { getBlogImage } from "@/lib/images";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getServiceUrl } from "engine";

const categoryServiceMap: Record<string, { slug: string; label: string }> = {
  "Drain Repair": { slug: "drain-collapse-repair", label: "Drain Collapse Repair" },
  "Drain Surveys": { slug: "cctv-drain-surveys", label: "CCTV Drain Surveys" },
  "Blocked Drains": { slug: "blocked-drains", label: "Blocked Drains" },
  "Emergency": { slug: "emergency-drainage", label: "Emergency Drainage" },
  "Maintenance": { slug: "drain-jetting", label: "Drain Jetting" },
  "Commercial": { slug: "commercial-drainage", label: "Commercial Drainage" },
};

const BlogPreview = () => {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section className="section-padding bg-secondary">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Latest News
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
            From Our Blog
          </h2>
          <p className="text-muted-foreground">
            Industry insights, project updates, and expert advice from our team.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {recentPosts.map((post, index) => {
            const relatedService = categoryServiceMap[post.category];
            return (
              <Card
                key={post.id}
                className="group overflow-hidden border-border bg-card transition-all hover:shadow-lg animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={getBlogImage(post, index)}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    {relatedService && (
                      <Link href={getServiceUrl(relatedService.slug)}>
                        <Badge variant="outline" className="text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                          {relatedService.label} →
                        </Badge>
                      </Link>
                    )}
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
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:underline"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link href="/blog">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
