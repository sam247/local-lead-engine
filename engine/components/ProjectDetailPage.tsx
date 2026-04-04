import Link from "next/link";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { QuoteFormPrimaryCta } from "./QuoteFormPrimaryCta";
import { SchemaMarkup } from "../schema/SchemaMarkup";
import { getCtaVariant } from "../utils/ctaVariants";
import { parseInlineLinks } from "../utils/inlineLinks";
import type { CompanyInfo, Location, Service } from "../types";
import type { PublishedProject } from "../data/projects";

interface RelatedLink {
  href: string;
  label: string;
}

export interface ProjectDetailPageProps {
  project: PublishedProject;
  service: Service;
  location: Location;
  companyInfo: CompanyInfo;
  baseUrl: string;
  ctaVariants: readonly string[];
  guideLinks: RelatedLink[];
  relatedServiceLinks: RelatedLink[];
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

export function ProjectDetailPage({
  project,
  service,
  location,
  companyInfo,
  baseUrl,
  ctaVariants,
  guideLinks,
  relatedServiceLinks,
  contactPath = "/contact",
}: ProjectDetailPageProps) {
  const canonicalPath = `/projects/${project.slug}`;
  const ctaSeed = `project-${project.slug}`;
  const ctaLabel = getCtaVariant(ctaSeed, ctaVariants, { serviceSlug: service.slug });
  const midLead = `If you are dealing with ${project.scenario.specificIssue.toLowerCase()} on a ${project.scenario.propertyType.toLowerCase()}, the next step is a clear scope and quote.`;
  const endLead = `If you need ${service.title.toLowerCase()} in ${location.name}, we can review the job, confirm the constraints, and price the right route.`;
  const sectionClassName = "space-y-3 text-muted-foreground";

  return (
    <>
      <SchemaMarkup
        type="Article"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          title: `${service.title} in ${location.name} – Project Overview`,
          description: project.metaDescription,
          url: canonicalPath,
        }}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Projects", url: "/projects" },
            { name: `${service.title} in ${location.name}`, url: canonicalPath },
          ],
        }}
      />

      <section className="border-b border-border bg-secondary/30 py-10">
        <div className="container">
          <BreadcrumbNav
            items={[
              { name: "Home", url: "/" },
              { name: "Projects", url: "/projects" },
              { name: `${service.title} in ${location.name}`, url: canonicalPath },
            ]}
          />
          <h1 className="mt-6 font-display text-3xl font-bold text-foreground md:text-4xl">
            {service.title} in {location.name} (Project)
          </h1>
          <div className="mt-4 max-w-3xl space-y-3 text-muted-foreground">
            {[project.summary].map((paragraph: string) => (
              <p key={paragraph}>{renderParagraph(paragraph)}</p>
            ))}
          </div>
        </div>
      </section>

      <article className="section-padding">
        <div className="container max-w-3xl">
          {project.images && project.images.length > 0 ? (
            <div className="mb-10 grid gap-4 md:grid-cols-2">
              {project.images.map((image) => (
                <figure key={image.src} className="overflow-hidden rounded-xl border border-border bg-card">
                  <img src={image.src} alt={image.alt} className="aspect-[4/3] w-full object-cover" />
                  {image.caption ? <figcaption className="p-3 text-sm text-muted-foreground">{image.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          ) : null}

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold text-foreground md:text-2xl">The issue on this job</h2>
            <div className={sectionClassName}>
              {project.problem.map((paragraph) => (
                <p key={paragraph}>{renderParagraph(paragraph)}</p>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold text-foreground md:text-2xl">How we handled it</h2>
            <div className={sectionClassName}>
              {project.solution.map((paragraph) => (
                <p key={paragraph}>{renderParagraph(paragraph)}</p>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold text-foreground md:text-2xl">What the result was</h2>
            <div className={sectionClassName}>
              {project.outcome.map((paragraph) => (
                <p key={paragraph}>{renderParagraph(paragraph)}</p>
              ))}
            </div>
          </section>

          <section className="mb-10 rounded-xl border border-primary/15 bg-primary/5 p-6">
            <p className="mb-4 text-muted-foreground">{midLead}</p>
            <QuoteFormPrimaryCta contactPath={contactPath} ctaSeed={ctaSeed} ctaText={ctaLabel}>
              {ctaLabel}
            </QuoteFormPrimaryCta>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold text-foreground md:text-2xl">When this kind of work is needed</h2>
            <div className={sectionClassName}>
              {project.whenNeeded.map((paragraph) => (
                <p key={paragraph}>{renderParagraph(paragraph)}</p>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 font-display text-xl font-bold text-foreground md:text-2xl">Related services in this area</h2>
            <div className={sectionClassName}>
              {project.relatedServicesSection.map((paragraph) => (
                <p key={paragraph}>{renderParagraph(paragraph)}</p>
              ))}
              {relatedServiceLinks.length > 0 ? (
                <p>
                  {relatedServiceLinks.map((link, index) => (
                    <span key={link.href}>
                      {index > 0 ? " " : ""}
                      <Link href={link.href} className="font-medium text-primary underline underline-offset-2 hover:text-primary/90">
                        {link.label}
                      </Link>
                      {index < relatedServiceLinks.length - 1 ? "," : "."}
                    </span>
                  ))}
                </p>
              ) : null}
              {guideLinks.length > 0 ? (
                <p>
                  {guideLinks.map((link, index) => (
                    <span key={link.href}>
                      {index > 0 ? " " : ""}
                      <Link href={link.href} className="font-medium text-primary underline underline-offset-2 hover:text-primary/90">
                        {link.label}
                      </Link>
                      {index < guideLinks.length - 1 ? "," : "."}
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
          </section>

          <section className="rounded-xl border border-primary/15 bg-primary/5 p-6">
            <p className="mb-4 text-muted-foreground">{endLead}</p>
            <QuoteFormPrimaryCta contactPath={contactPath} ctaSeed={`${ctaSeed}-end`} ctaText={ctaLabel}>
              {ctaLabel}
            </QuoteFormPrimaryCta>
          </section>
        </div>
      </article>
    </>
  );
}
