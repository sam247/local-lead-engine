import type { ReactNode } from "react";
import Link from "next/link";
import { BreadcrumbNav } from "../BreadcrumbNav";
import { SchemaMarkup } from "../../schema/SchemaMarkup";
import type { CompanyInfo } from "../../types";
import { cn } from "../../utils/cn";
import { Button } from "../ui/button";

export type GuidePageParagraph = string | ReactNode;

export interface GuidePageSection {
  heading: string;
  paragraphs: GuidePageParagraph[];
}

export interface GuidePagePrimaryCta {
  heading: string;
  body: string;
  buttonHref: string;
  buttonLabel: string;
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
  /** Optional block after standard sections (e.g. legacy internal links). */
  afterSections?: ReactNode;
  /** Optional list after main sections; same styling as other H2 sections. */
  relatedServices?: { href: string; label: string }[];
  relatedServicesHeading?: string;
  /** Location links, typically service × location for primary service. */
  areasWeCover?: { href: string; label: string }[];
  areasWeCoverHeading?: string;
  areasWeCoverIntro?: string;
  primaryCta?: GuidePagePrimaryCta;
  /** Shown below primary CTA; set to null to hide the default contact teaser. */
  footerTeaser?: ReactNode | null;
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
  relatedServices,
  relatedServicesHeading = "Related services",
  areasWeCover,
  areasWeCoverHeading = "Areas we cover",
  areasWeCoverIntro,
  primaryCta,
  footerTeaser,
}: GuidePageProps) {
  const crumbs = [
    { name: "Home", url: "/" },
    { name: breadcrumbParent.name, url: breadcrumbParent.href },
    { name: title, url: path },
  ];

  const defaultFooterTeaser = (
    <>
      <Link href="/contact" className="font-medium text-primary hover:underline">
        Contact us
      </Link>{" "}
      to discuss your project or to arrange a site visit.
    </>
  );

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
                {section.paragraphs.map((p, j) =>
                  typeof p === "string" ? (
                    <p key={j}>{p}</p>
                  ) : (
                    <div key={j}>{p}</div>
                  )
                )}
              </div>
            </section>
          ))}

          {relatedServices && relatedServices.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 font-display text-xl font-bold text-foreground md:text-2xl">{relatedServicesHeading}</h2>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                {relatedServices.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="text-primary hover:underline">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {areasWeCover && areasWeCover.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 font-display text-xl font-bold text-foreground md:text-2xl">{areasWeCoverHeading}</h2>
              {areasWeCoverIntro ? <p className="mb-4 text-muted-foreground">{areasWeCoverIntro}</p> : null}
              <ul className="flex flex-wrap gap-x-4 gap-y-2 text-muted-foreground">
                {areasWeCover.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-primary hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {primaryCta ? (
            <section className="mb-10 rounded-xl border border-primary/20 bg-primary/5 p-6 md:p-8">
              <h2 className="mb-2 font-display text-xl font-bold text-foreground md:text-2xl">{primaryCta.heading}</h2>
              <p className="mb-5 text-muted-foreground">{primaryCta.body}</p>
              <Button asChild size="lg">
                <Link href={primaryCta.buttonHref}>{primaryCta.buttonLabel}</Link>
              </Button>
            </section>
          ) : null}

          {afterSections}

          {footerTeaser !== null ? (
            <p className="mt-10 text-sm text-muted-foreground">{footerTeaser ?? defaultFooterTeaser}</p>
          ) : null}
        </div>
      </article>
    </>
  );
}
