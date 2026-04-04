export interface HomepageArticleCard {
  title: string;
  excerpt: string;
  href: string;
}

export interface BlogPostLike {
  slug: string;
  title: string;
  excerpt: string;
}

export interface GuideFallbackLike {
  title: string;
  intro: string;
  href: string;
}

/**
 * Deterministic: prefer blog posts (sorted by id), then pad with guide fallbacks.
 */
export function pickHomepageArticleCards(
  blogPosts: BlogPostLike[],
  guideFallbacks: GuideFallbackLike[]
): [HomepageArticleCard, HomepageArticleCard, HomepageArticleCard] {
  const sortedPosts = [...blogPosts].sort((a, b) => a.slug.localeCompare(b.slug));
  const out: HomepageArticleCard[] = sortedPosts.slice(0, 3).map((p) => ({
    title: p.title,
    excerpt: p.excerpt,
    href: `/blog/${p.slug}`,
  }));
  let fi = 0;
  while (out.length < 3 && fi < guideFallbacks.length) {
    const g = guideFallbacks[fi++];
    out.push({
      title: g.title,
      excerpt: g.intro.slice(0, 140) + (g.intro.length > 140 ? "…" : ""),
      href: g.href,
    });
  }
  while (out.length < 3) {
    out.push({
      title: "Guides",
      excerpt: "Browse our guides for practical advice.",
      href: "/guides",
    });
  }
  return [out[0], out[1], out[2]];
}
