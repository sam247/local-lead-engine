import Link from "next/link";
import { Button } from "./ui/button";
import { CheckCircle, Phone } from "lucide-react";
import { SchemaMarkup } from "../schema/SchemaMarkup";
import { FAQSchema, type FAQItem } from "../schema/FAQSchema";
import { InspectionCTA } from "./InspectionCTA";
import { MidContentCTA } from "./MidContentCTA";
import { RelatedLinks } from "./RelatedLinks";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { CTABanner } from "./CTABanner";
import type { HubData, InfoPageData, Service, Location, CompanyInfo } from "../types";

export interface RelatedPageLink {
  title: string;
  href: string;
}

export interface InfoPageProps {
  hub: HubData;
  page: InfoPageData;
  otherPages: InfoPageData[];
  heroImage: string;
  heroAlt: string;
  pageFaqs: FAQItem[];
  companyInfo: CompanyInfo;
  baseUrl: string;
  contactPath?: string;
  relatedPageLinks?: RelatedPageLink[];
  services: Service[];
  locations: Location[];
  hubPages: HubData[];
  getCategoryPages: (category: string) => InfoPageData[];
  /** Title for the related guides block in sidebar. Default "Related Articles". */
  relatedGuidesTitle?: string;
}

export function InfoPage({
  hub,
  page,
  otherPages,
  heroImage,
  heroAlt,
  pageFaqs,
  companyInfo,
  baseUrl,
  contactPath = "/contact",
  relatedPageLinks = [],
  services,
  locations,
  hubPages,
  getCategoryPages,
  relatedGuidesTitle = "Related Articles",
}: InfoPageProps) {
  const relatedGuides = otherPages.slice(0, 5);
  return (
    <>
      <SchemaMarkup
        type="Article"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          title: page.title,
          description: page.metaDescription,
          url: `${hub.basePath}/${page.slug}`,
        }}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: hub.title, url: hub.basePath },
            { name: page.title, url: `${hub.basePath}/${page.slug}` },
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
            <BreadcrumbNav
              items={[
                { name: "Home", url: "/" },
                { name: hub.title, url: hub.basePath },
                { name: page.title, url: `${hub.basePath}/${page.slug}` },
              ]}
              variant="inverse"
            />
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">
              {page.title}
            </h1>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="mb-8 text-lg text-muted-foreground">{page.intro}</p>
              <h2 className="mb-4 font-display text-2xl font-bold">What to Look For</h2>
              <ul className="mb-8 space-y-2">
                {page.signs.map((sign) => (
                  <li key={sign} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
              <h2 className="mb-4 font-display text-2xl font-bold">How We Diagnose the Problem</h2>
              <p className="mb-4 text-muted-foreground">{page.diagnosis}</p>
              <MidContentCTA
                companyInfo={companyInfo}
                message={`Think you might have ${page.title.toLowerCase()}? A professional inspection will confirm the diagnosis.`}
                buttonLink={contactPath}
              />
              <h2 className="mb-4 font-display text-2xl font-bold">How We Fix It</h2>
              <p className="mb-8 text-muted-foreground">{page.resolution}</p>
              {relatedPageLinks.length > 0 && (
                <div className="mb-8 rounded-lg border border-border bg-secondary/50 p-6">
                  <h3 className="mb-4 font-display text-lg font-bold">
                    How This Issue Is Normally Diagnosed and Repaired
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Follow the typical path from problem identification through to resolution:
                  </p>
                  <ol className="space-y-2">
                    {relatedPageLinks.map((rp, idx) => (
                      <li key={rp.href} className="flex items-center gap-2">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          {idx + 1}
                        </span>
                        <Link
                          href={rp.href}
                          className="text-sm text-primary hover:underline"
                        >
                          {rp.title}
                        </Link>
                      </li>
                    ))}
                    <li className="flex items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {relatedPageLinks.length + 1}
                      </span>
                      <Link href={contactPath} className="text-sm text-primary hover:underline">
                        Get a Free Quote →
                      </Link>
                    </li>
                  </ol>
                </div>
              )}
              {locations.length > 0 && (page.relatedServices?.[0] || services[0]?.slug) && (
                <div className="mb-8">
                  <h3 className="mb-3 font-display text-lg font-bold">We provide these services across the UK, including</h3>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {locations.slice(0, 8).map((loc) => (
                      <Link
                        key={loc.id}
                        href={`/${page.relatedServices?.[0] || services[0]?.slug}/${loc.id}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {loc.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <div className="mb-8">
                <InspectionCTA companyInfo={companyInfo} contactPath={contactPath} />
              </div>
              <div className="rounded-lg bg-primary p-6 text-center">
                <p className="mb-4 text-lg font-medium text-primary-foreground">{page.ctaText}</p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href={contactPath}>Get a Free Quote</Link>
                  </Button>
                  <a
                    href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-primary-foreground"
                  >
                    <Phone className="h-5 w-5" /> {companyInfo.phone}
                  </a>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <RelatedLinks
                relatedServices={page.relatedServices}
                category={hub.category}
                currentSlug={page.slug}
                services={services}
                locations={locations}
                hubPages={hubPages}
                getCategoryPages={getCategoryPages}
              />
              {relatedGuides.length > 0 && (
                <div className="rounded-lg bg-secondary p-6">
                  <h3 className="mb-4 font-display text-lg font-bold">{relatedGuidesTitle}</h3>
                  <div className="space-y-2">
                    {relatedGuides.map((p) => (
                      <Link
                        key={p.slug}
                        href={`${hub.basePath}/${p.slug}`}
                        className="block text-sm text-primary hover:underline"
                      >
                        {p.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Contact Us</h3>
                <a
                  href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Phone className="h-4 w-4" /> {companyInfo.phone}
                </a>
                <Button asChild className="mt-4 w-full">
                  <Link href={contactPath}>Get a Free Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FAQSchema items={pageFaqs} title={`${page.title} FAQ`} />
      <CTABanner companyInfo={companyInfo} contactPath={contactPath} />
    </>
  );
}
