import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "../../utils/cn";

export interface HomepageArticleCard {
  title: string;
  excerpt: string;
  href: string;
}

export interface HomepageArticlesProps {
  cards: [HomepageArticleCard, HomepageArticleCard, HomepageArticleCard];
  className?: string;
}

export function HomepageArticles({ cards, className }: HomepageArticlesProps) {
  return (
    <section className={cn("section-padding bg-background", className)}>
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Guides &amp; Insights</h2>
          <p className="mt-2 text-muted-foreground">Practical guides and articles from our team.</p>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <li key={card.href}>
              <article className="flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  <Link href={card.href} className="hover:text-primary">
                    {card.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{card.excerpt}</p>
                <Link
                  href={card.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Read more
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
