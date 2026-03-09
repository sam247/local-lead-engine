import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowRight } from "lucide-react";
import { SchemaMarkup } from "../schema/SchemaMarkup";
import { CTABanner } from "./CTABanner";
import type { HubData, InfoPageData, Service, CompanyInfo } from "../types";

export interface CrossSection {
  label: string;
  pages: { slug: string; title: string; intro: string; basePath: string }[];
}

export interface HubPageProps {
  hub: HubData;
  pages: InfoPageData[];
  heroImage: string;
  heroAlt: string;
  crossSections: CrossSection[];
  keyServices: Service[];
  companyInfo: CompanyInfo;
  baseUrl: string;
  contactPath?: string;
}

export function HubPage({
  hub,
  pages,
  heroImage,
  heroAlt,
  crossSections,
  keyServices,
  companyInfo,
  baseUrl,
  contactPath = "/contact",
}: HubPageProps) {
  return (
    <>
      <SchemaMarkup
        type="BreadcrumbList"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: hub.title, url: hub.basePath },
          ],
        }}
      />
      <section className="relative bg-primary py-16 md:py-24">
        <div className="absolute inset-0">
          <img src={heroImage} alt={heroAlt} className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">
              {hub.title}
            </h1>
            <p className="text-lg text-primary-foreground/80">{hub.subtitle}</p>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <Card
                key={page.slug}
                className="group border-border transition-all hover:shadow-lg"
              >
                <CardHeader>
                  <CardTitle className="font-display text-lg">{page.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                    {page.intro}
                  </p>
                  <Link
                    href={`${hub.basePath}/${page.slug}`}
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {crossSections.map((section) => (
        <section key={section.label} className="bg-secondary/50 py-12">
          <div className="container">
            <h2 className="mb-6 font-display text-2xl font-bold">{section.label}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {section.pages.map((page) => (
                <Link
                  key={page.slug}
                  href={`${page.basePath}/${page.slug}`}
                  className="group rounded-lg border border-border bg-background p-4 transition-all hover:shadow-md"
                >
                  <h3 className="mb-1 text-sm font-semibold group-hover:text-primary">
                    {page.title}
                  </h3>
                  <p className="line-clamp-2 text-xs text-muted-foreground">{page.intro}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
      <section className="bg-secondary py-12">
        <div className="container">
          <h2 className="mb-8 text-center font-display text-2xl font-bold">Related Services</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {keyServices.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group rounded-lg border border-border bg-background p-6 transition-all hover:shadow-lg"
              >
                <h3 className="mb-2 font-display text-lg font-semibold group-hover:text-primary">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTABanner companyInfo={companyInfo} contactPath={contactPath} />
    </>
  );
}
