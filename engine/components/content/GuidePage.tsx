import type { ReactNode } from "react";
import Link from "next/link";
import { BreadcrumbNav } from "../BreadcrumbNav";
import { SchemaMarkup } from "../../schema/SchemaMarkup";
import type { CompanyInfo } from "../../types";
import { cn } from "../../utils/cn";

export interface GuidePageSection {
  heading: string;
  paragraphs: string[];
}

export interface GuidePageProps {
  title: string;
  metaDescription: string;
  intro: string;
  sections: GuidePageSection[];
  companyInfo: CompanyInfo;
  baseUrl: string;
  /** URL path for this page, e.g. "/how-it-works" */
  path: string;
  breadcrumbParent?: { name: string; href: string };
  className?: string;
  /** Optional block after sections (e.g. internal links) */
  afterSections?: ReactNode;
}

export function GuidePage({
  title,
  metaDescription,
  intro,
  sections,
  companyInfo,
  baseUrl,
  path,
  breadcrumbParent = { name: "Guides", href: "/guides" },
  className,
  afterSections,
}: GuidePageProps) {
  const crumbs = [
    { name: "Home", url: "/" },
    { name: breadcrumbParent.name, url: breadcrumbParent.href },
    { name: title, url: path },
  ];

  return (
    <>
      <SchemaMarkup
        type="Article"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          title,
          description: metaDescription,
          url: path,
        }}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{ breadcrumbs: crumbs }}
      />

      <section className={cn("border-b border-border bg-secondary/30 py-10", className)}>
        <div className="container">
          <BreadcrumbNav items={crumbs} />
          <h1 className="mt-6 font-display text-3xl font-bold text-foreground md:text-4xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">{intro}</p>
        </div>
      </section>

      <article className="section-padding">
        <div className="container max-w-3xl">
          {sections.map((section, i) => (
            <section key={i} className="mb-10">
              <h2 className="mb-4 font-display text-xl font-bold text-foreground md:text-2xl">{section.heading}</h2>
              <div className="space-y-3 text-muted-foreground">
                {section.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </section>
          ))}
          {afterSections}
          <p className="mt-10 text-sm text-muted-foreground">
            <Link href="/contact" className="font-medium text-primary hover:underline">
              Contact us
            </Link>{" "}
            to discuss your project or to arrange a site visit.
          </p>
        </div>
      </article>
    </>
  );
}
