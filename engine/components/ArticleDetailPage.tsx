import Link from "next/link";
import { Calendar } from "lucide-react";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { QuoteFormPrimaryCta } from "./QuoteFormPrimaryCta";
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
  scenario: {
    propertyType: string;
    specificIssue: string;
    constraints: string[];
  };
  sections: ArticleSection[];
  faq?: ArticleFaq[];
  endCtaLead: string;
}

export interface ArticleDetailPageProps {
  article: ArticleDetailData;
  companyInfo: CompanyInfo;
  baseUrl: string;
  ctaVariants: readonly string[];
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
  ctaVariants,
  contactPath = "/contact",
}: ArticleDetailPageProps) {
  const canonicalPath = `/blog/${article.slug}`;
  const ctaSeed = `article-${article.slug}`;
  const ctaLabel = getCtaVariant(ctaSeed, ctaVariants, { serviceSlug: article.serviceSlug });
  const midLead = `If you are seeing ${article.scenario.specificIssue.toLowerCase()}, a scoped quote is usually the quickest way to confirm the right next step.`;

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
        <div className="container max-w-3xl">
          {article.image ? (
            <div className="mb-10 overflow-hidden rounded-xl border border-border">
              <img src={article.image} alt={article.title} className="aspect-video w-full object-cover" />
            </div>
          ) : null}

          {article.sections.map((section, index) => (
            <section key={section.heading} className="mb-10">
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
            <section className="mb-10">
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
      </article>
    </>
  );
}
