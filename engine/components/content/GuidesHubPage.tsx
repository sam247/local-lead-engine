import Link from "next/link";
import { BreadcrumbNav } from "../BreadcrumbNav";
import { SchemaMarkup } from "../../schema/SchemaMarkup";
import type { CompanyInfo } from "../../types";
import { cn } from "../../utils/cn";

export interface GuidesHubCard {
  title: string;
  description: string;
  href: string;
}

export interface GuidesHubPageProps {
  h1: string;
  intro: string;
  cards: GuidesHubCard[];
  companyInfo: CompanyInfo;
  baseUrl: string;
  path?: string;
  className?: string;
}

export function GuidesHubPage({
  h1,
  intro,
  cards,
  companyInfo,
  baseUrl,
  path = "/guides",
  className,
}: GuidesHubPageProps) {
  const crumbs = [
    { name: "Home", url: "/" },
    { name: h1, url: path },
  ];

  return (
    <>
      <SchemaMarkup
        type="Article"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          title: h1,
          description: intro.slice(0, 160),
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
          <h1 className="mt-6 font-display text-3xl font-bold text-foreground md:text-4xl">{h1}</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">{intro}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <li key={card.href}>
                <Link
                  href={card.href}
                  className="flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary hover:shadow-md"
                >
                  <span className="font-display text-lg font-semibold text-foreground">{card.title}</span>
                  <span className="mt-2 text-sm text-muted-foreground">{card.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
