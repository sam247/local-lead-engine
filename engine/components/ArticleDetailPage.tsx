import Image from "next/image";
import Link from "next/link";
import { Calendar, Phone } from "lucide-react";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { QuoteFormPrimaryCta } from "./QuoteFormPrimaryCta";
import { TrackablePhoneLink } from "./TrackablePhoneLink";
import { SchemaMarkup } from "../schema/SchemaMarkup";
import { getCtaVariant } from "../utils/ctaVariants";
import { parseInlineLinks } from "../utils/inlineLinks";
import type { CompanyInfo } from "../types";

export type ArticleIntent = "diagnostic" | "explanatory" | "cost-related" | "decision-making";

export interface ArticleFaq {
  question: string;
  answer: string;
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface ArticleSidebarLink {
  href: string;
  label: string;
}

export interface ArticleDetailData {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  category: string;
  intent: ArticleIntent;
  metaDescription: string;
  serviceSlug: string;
  serviceTitle: string;
  locationId: string;
  audience: string;
  scenario: {
    propertyType: string;
    specificIssue: string;
    constraints: string[];
  };
  sections: ArticleSection[];
  sidebarLinks: ArticleSidebarLink[];
  faq?: ArticleFaq[];
  endCtaLead: string;
}

export interface ArticleDetailPageProps {
  article: ArticleDetailData;
  companyInfo: CompanyInfo;
  baseUrl: string;
  verticalId: string;
  ctaVariants: readonly string[];
  sidebarCtaHeading: string;
  sidebarCtaSupportText: string;
  sidebarTrustLine: string;
  contactPath?: string;
}

function renderParagraph(text: string) {
  return parseInlineLinks(text).map((segment, index) =>
    segment.type === "text" ? (
      <span key={index}>{segment.value}</span>
    ) : (
      <Link key={index} href={segment.href} className="font-medium text-primary underline underline-offset-2 hover:text-primary/90">
        {segment.text}
      </Link>
    )
  );
}

export function ArticleDetailPage({
  article,
  companyInfo,
  baseUrl,
  verticalId,
  ctaVariants,
  sidebarCtaHeading,
  sidebarCtaSupportText,
  sidebarTrustLine,
  contactPath = "/contact",
}: ArticleDetailPageProps) {
  const canonicalPath = `/blog/${article.slug}`;
  const ctaSeed = `article-${article.slug}`;
  const ctaLabel = getCtaVariant(ctaSeed, ctaVariants, { serviceSlug: article.serviceSlug });
  const midLead = `If this article matches what you are seeing on site, the next step is a scoped quote based on the actual issue rather than guesswork.`;
  const articleDate = new Date(article.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const intentLabel =
    article.intent === "cost-related"
      ? "Cost guide"
      : article.intent === "decision-making"
        ? "Decision guide"
        : article.intent === "diagnostic"
          ? "Diagnostic guide"
          : "Explainer";

  return (
    <>
      <SchemaMarkup
        type="Article"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          title: article.title,
          description: article.metaDescription,
          url: canonicalPath,
          datePublished: article.date,
        }}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: article.title, url: canonicalPath },
          ],
        }}
      />

      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <BreadcrumbNav
              items={[
                { name: "Home", url: "/" },
                { name: "Blog", url: "/blog" },
                { name: article.title, url: canonicalPath },
              ]}
              variant="inverse"
            />
            <div className="mt-4 flex flex-wrap items-center gap-2 text-primary-foreground/80">
              <span className="rounded-full bg-primary-foreground/15 px-3 py-1 text-sm">{article.category}</span>
              <span className="flex items-center gap-1 text-sm">
                <Calendar className="h-4 w-4" />
                {new Date(article.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">{article.title}</h1>
            <p className="mt-4 max-w-3xl text-primary-foreground/85">{article.excerpt}</p>
          </div>
        </div>
      </section>

      <article className="section-padding">
        <div className="container max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(280px,3fr)] lg:items-start">
            <div className="min-w-0">
              {article.image ? (
                <div className="mb-10 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={article.image}
                      alt={`${article.title} article image`}
                      fill
                      priority
                      sizes="(min-width: 1280px) 760px, (min-width: 1024px) 62vw, calc(100vw - 32px)"
                      className="object-cover"
                    />
                  </div>
                </div>
              ) : null}

              {article.sections.map((section, index) => (
                <section key={section.heading} className="mb-12 md:mb-14">
                  <h2 className="mb-4 font-display text-xl font-bold text-foreground md:text-2xl">{section.heading}</h2>
                  <div className="space-y-3 text-muted-foreground">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{renderParagraph(paragraph)}</p>
                    ))}
                  </div>
                  {index === 2 ? (
                    <div className="mt-8 rounded-xl border border-primary/15 bg-primary/5 p-6">
                      <p className="mb-4 text-muted-foreground">{midLead}</p>
                      <QuoteFormPrimaryCta contactPath={contactPath} ctaSeed={ctaSeed} ctaText={ctaLabel}>
                        {ctaLabel}
                      </QuoteFormPrimaryCta>
                    </div>
                  ) : null}
                </section>
              ))}

              {article.faq && article.faq.length > 0 ? (
                <section className="mb-12 md:mb-14">
                  <h2 className="mb-4 font-display text-xl font-bold text-foreground md:text-2xl">FAQ</h2>
                  <div className="space-y-4">
                    {article.faq.map((item) => (
                      <div key={item.question} className="rounded-lg border border-border bg-card p-4">
                        <h3 className="font-semibold text-foreground">{item.question}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="rounded-xl border border-primary/15 bg-primary/5 p-6">
                <p className="mb-4 text-muted-foreground">{article.endCtaLead}</p>
                <QuoteFormPrimaryCta contactPath={contactPath} ctaSeed={`${ctaSeed}-end`} ctaText={ctaLabel}>
                  {ctaLabel}
                </QuoteFormPrimaryCta>
              </section>
            </div>

            <aside className="min-w-0">
              <div className="space-y-5 lg:sticky lg:top-[100px]">
                <section className="rounded-xl border border-border bg-secondary/40 p-6">
                  <h2 className="font-display text-xl font-bold text-foreground">{sidebarCtaHeading}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{sidebarCtaSupportText}</p>
                  <div className="mt-5 flex flex-col gap-3">
                    <QuoteFormPrimaryCta contactPath={contactPath} ctaSeed={ctaSeed} ctaText={ctaLabel} className="w-full">
                      {ctaLabel}
                    </QuoteFormPrimaryCta>
                    <TrackablePhoneLink
                      phone={companyInfo.phone}
                      vertical={verticalId}
                      serviceSlug={article.serviceSlug}
                      locationSlug={article.locationId}
                      pagePath={canonicalPath}
                      source="cta"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      Call now
                    </TrackablePhoneLink>
                  </div>
                </section>

                <section className="rounded-xl border border-border bg-card p-6">
                  <h2 className="font-display text-lg font-bold text-foreground">Article summary</h2>
                  <dl className="mt-4 space-y-3">
                    <div className="grid grid-cols-[92px_1fr] gap-3 border-b border-border/80 py-3 pt-0">
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Topic</dt>
                      <dd className="text-sm font-medium text-foreground">{article.category}</dd>
                    </div>
                    <div className="grid grid-cols-[92px_1fr] gap-3 border-b border-border/80 py-3">
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Service</dt>
                      <dd className="text-sm font-medium text-foreground">{article.serviceTitle}</dd>
                    </div>
                    <div className="grid grid-cols-[92px_1fr] gap-3 border-b border-border/80 py-3">
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Intent</dt>
                      <dd className="text-sm font-medium text-foreground">{intentLabel}</dd>
                    </div>
                    <div className="grid grid-cols-[92px_1fr] gap-3 py-3 pb-0">
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">For</dt>
                      <dd className="text-sm font-medium text-foreground">{article.audience}</dd>
                    </div>
                  </dl>
                </section>

                <section className="rounded-xl border border-border bg-card p-6">
                  <h2 className="font-display text-lg font-bold text-foreground">Trusted support</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{sidebarTrustLine}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.12em] text-muted-foreground">Published {articleDate}</p>
                </section>

                {article.sidebarLinks.length > 0 ? (
                  <section className="rounded-xl border border-border bg-card p-6">
                    <h2 className="font-display text-lg font-bold text-foreground">Related reading</h2>
                    <div className="mt-4 space-y-3">
                      {article.sidebarLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="block text-sm font-medium text-primary underline underline-offset-2 hover:text-primary/90">
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
