import Link from "next/link";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { ProblemCTA } from "./ProblemCTA";
import { SchemaMarkup } from "../schema/SchemaMarkup";
import type { ProblemData, Service, CompanyInfo } from "../types";

export interface ProblemPageProps {
  problem: ProblemData;
  services: Service[];
  companyInfo: CompanyInfo;
  baseUrl: string;
  contactPath?: string;
  basePath?: string;
  problemsBasePath?: string;
  /** Breadcrumb label for the problems hub (e.g. "Drain Problems", "Access Problems"). Default "Problems". */
  problemsBreadcrumbLabel?: string;
}

export function ProblemPage({
  problem,
  services,
  companyInfo,
  baseUrl,
  contactPath = "/contact",
  basePath = "/services",
  problemsBasePath = "/drain-problems",
  problemsBreadcrumbLabel,
}: ProblemPageProps) {
  const relatedServices = problem.relatedServiceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => s != null);

  const serviceLinks = relatedServices.map((s) => ({
    slug: s.slug,
    label: s.title,
  }));

  const breadcrumbLabel = problemsBreadcrumbLabel ?? "Problems";
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: breadcrumbLabel, url: problemsBasePath },
    { name: `${problem.title} – Causes and Repair`, url: `${problemsBasePath}/${problem.slug}` },
  ];

  return (
    <>
      <SchemaMarkup
        type="Article"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          title: `${problem.title} – Causes and Repair`,
          description: `${problem.causes.slice(0, 155)}...`,
          url: `${baseUrl}${problemsBasePath}/${problem.slug}`,
        }}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{ breadcrumbs }}
      />
      <section className="section-padding">
        <div className="container max-w-3xl">
          <BreadcrumbNav items={breadcrumbs} />
          <h1 className="mb-6 font-display text-3xl font-bold md:text-4xl">
            {problem.title} – Causes and Repair
          </h1>

          <h2 className="mb-2 font-display text-xl font-bold">What causes this problem</h2>
          <p className="mb-8 text-muted-foreground">{problem.causes}</p>

          <h2 className="mb-2 font-display text-xl font-bold">How it is normally fixed</h2>
          <p className="mb-8 text-muted-foreground">{problem.howFixed}</p>

          <h2 className="mb-2 font-display text-xl font-bold">When to call a professional</h2>
          <p className="mb-8 text-muted-foreground">{problem.whenToCall}</p>

          <h2 className="mb-2 font-display text-xl font-bold">Related services</h2>
          <ul className="mb-8 list-inside list-disc space-y-1 text-muted-foreground">
            {relatedServices.map((s) => (
              <li key={s.id}>
                <Link href={`${basePath}/${s.slug}`} className="text-primary hover:underline">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>

          <ProblemCTA
            message={problem.ctaMessage}
            serviceLinks={serviceLinks}
            basePath={basePath}
            contactPath={contactPath}
          />
        </div>
      </section>
    </>
  );
}
