import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { QuoteFormPrimaryCta } from "./QuoteFormPrimaryCta";
import { SchemaMarkup } from "../schema/SchemaMarkup";
import { getCtaVariant } from "../utils/ctaVariants";
import { parseInlineLinks } from "../utils/inlineLinks";
import { TrackablePhoneLink } from "./TrackablePhoneLink";
import type { CompanyInfo, Location, Service } from "../types";
import type { ProjectImage, PublishedProject } from "../data/projects";

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
  verticalId: string;
  ctaVariants: readonly string[];
  guideLinks: RelatedLink[];
  relatedServiceLinks: RelatedLink[];
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

function getFallbackImage(project: PublishedProject): ProjectImage | undefined {
  if (project.image) {
    return {
      src: project.image,
      alt: `${project.title} project image`,
    };
  }
  return project.images?.[0];
}

function MediaBlock({
  image,
  alt,
  caption,
  priority = false,
  sizes,
  placeholderLabel,
}: {
  image?: ProjectImage;
  alt: string;
  caption?: string;
  priority?: boolean;
  sizes: string;
  placeholderLabel: string;
}) {
  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary/60">
        {image?.src ? (
          <Image
            src={image.src}
            alt={image.alt || alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-secondary/60 px-6 text-center text-sm text-muted-foreground">
            <span>{placeholderLabel}</span>
          </div>
        )}
      </div>
      {caption ? <figcaption className="border-t border-border bg-card px-4 py-3 text-sm text-muted-foreground">{caption}</figcaption> : null}
    </figure>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[92px_1fr] gap-3 border-b border-border/80 py-3 last:border-b-0 last:pb-0 first:pt-0">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

export function ProjectDetailPage({
  project,
  service,
  location,
  companyInfo,
  baseUrl,
  verticalId,
  ctaVariants,
  guideLinks,
  relatedServiceLinks,
  sidebarCtaHeading,
  sidebarCtaSupportText,
  sidebarTrustLine,
  contactPath = "/contact",
}: ProjectDetailPageProps) {
  const canonicalPath = `/projects/${project.slug}`;
  const ctaSeed = `project-${project.slug}`;
  const ctaLabel = getCtaVariant(ctaSeed, ctaVariants, { serviceSlug: service.slug });
  const midLead = `If you are dealing with ${project.scenario.specificIssue.toLowerCase()} on a ${project.scenario.propertyType.toLowerCase()}, the next step is a clear scope and quote.`;
  const endLead = `If you need ${service.title.toLowerCase()} in ${location.name}, we can review the job, confirm the constraints, and price the right route.`;
  const sectionClassName = "space-y-3 text-muted-foreground";
  const heroImage = project.detailMedia?.hero ?? getFallbackImage(project);
  const inlineImage = project.detailMedia?.inline;
  const inlineCaption =
    project.detailMedia?.inlineCaption ??
    `Survey data and site detail captured using ${project.equipmentOrMethod.toLowerCase()} in ${location.name}.`;
  const deliverySummary =
    /\breturn visit\b|\brevisit\b/i.test(project.outcome.join(" ")) || /\breturn visit\b|\brevisit\b/i.test(project.summary)
      ? "No return visit needed"
      : "Kept the programme moving";

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
        <div className="container max-w-6xl">
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
          <div className="mt-8">
            <MediaBlock
              image={heroImage}
              alt={`${project.title} project image`}
              sizes="(min-width: 1280px) 1152px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)"
              priority
              placeholderLabel={`Project image coming soon for ${project.title}.`}
            />
          </div>
        </div>
      </section>

      <article className="section-padding">
        <div className="container max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(280px,3fr)] lg:items-start">
            <div className="min-w-0">
              <section className="mb-12 md:mb-14">
                <h2 className="mb-4 font-display text-xl font-bold text-foreground md:text-2xl">The issue on this job</h2>
                <div className={sectionClassName}>
                  {project.problem.map((paragraph) => (
                    <p key={paragraph}>{renderParagraph(paragraph)}</p>
                  ))}
                </div>
              </section>

              <section className="mb-12 md:mb-14">
                <h2 className="mb-4 font-display text-xl font-bold text-foreground md:text-2xl">How we handled it</h2>
                <div className={sectionClassName}>
                  {project.solution.map((paragraph, index) => (
                    <div key={paragraph} className="space-y-4">
                      <p>{renderParagraph(paragraph)}</p>
                      {index === 0 ? (
                        <MediaBlock
                          image={inlineImage}
                          alt={`${project.title} detail image`}
                          caption={inlineCaption}
                          sizes="(min-width: 1280px) 760px, (min-width: 1024px) 62vw, calc(100vw - 32px)"
                          placeholderLabel={`Detailed site image placeholder for ${project.title}.`}
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-12 md:mb-14">
                <h2 className="mb-4 font-display text-xl font-bold text-foreground md:text-2xl">What the result was</h2>
                <div className="mb-5 grid gap-3 rounded-lg border border-border bg-card p-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Output</p>
                    <p className="mt-1 text-sm font-medium text-foreground">{project.outputSummary}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Delivery</p>
                    <p className="mt-1 text-sm font-medium text-foreground">{deliverySummary}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Programme</p>
                    <p className="mt-1 text-sm font-medium text-foreground">{project.timeTaken}</p>
                  </div>
                </div>
                <div className={sectionClassName}>
                  {project.outcome.map((paragraph, index) => (
                    <p key={paragraph} className={index === 0 ? "font-medium text-foreground" : undefined}>
                      {renderParagraph(paragraph)}
                    </p>
                  ))}
                </div>
              </section>

              <section className="mb-12 rounded-xl border border-primary/15 bg-primary/5 p-6 md:mb-14">
                <p className="mb-4 text-muted-foreground">{midLead}</p>
                <QuoteFormPrimaryCta contactPath={contactPath} ctaSeed={ctaSeed} ctaText={ctaLabel}>
                  {ctaLabel}
                </QuoteFormPrimaryCta>
              </section>

              <section className="mb-12 md:mb-14">
                <h2 className="mb-4 font-display text-xl font-bold text-foreground md:text-2xl">When this kind of work is needed</h2>
                <div className={sectionClassName}>
                  {project.whenNeeded.map((paragraph) => (
                    <p key={paragraph}>{renderParagraph(paragraph)}</p>
                  ))}
                </div>
              </section>

              <section className="mb-12 md:mb-14">
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
                      serviceSlug={service.slug}
                      locationSlug={location.id}
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
                  <h2 className="font-display text-lg font-bold text-foreground">Project summary</h2>
                  <dl className="mt-4">
                    <SummaryRow label="Location" value={location.name} />
                    <SummaryRow label="Service" value={service.title} />
                    <SummaryRow label="Site type" value={project.scenario.propertyType} />
                    <SummaryRow label="Output" value={project.outputSummary} />
                  </dl>
                </section>

                <section className="rounded-xl border border-border bg-card p-6">
                  <h2 className="font-display text-lg font-bold text-foreground">Trusted on live projects</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{sidebarTrustLine}</p>
                  <div className="mt-4 rounded-lg border border-dashed border-border px-4 py-5 text-center text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    Accreditation logos
                  </div>
                </section>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
