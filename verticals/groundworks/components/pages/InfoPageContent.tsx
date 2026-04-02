import Link from "next/link";
import { getCategoryPages, getHubData, hubPages, companyInfo, categoryImages, categoryAltText } from "@/lib/data";
import { getHeroImage } from "@/lib/images";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone } from "lucide-react";
import InspectionCTA from "@/components/sections/InspectionCTA";
import MidContentCTA from "@/components/sections/MidContentCTA";
import RelatedLinks from "@/components/sections/RelatedLinks";
import FAQSchema from "@/components/sections/FAQSchema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import CTABanner from "@/components/sections/CTABanner";
import { getServiceUrl, TrackablePhoneLink } from "engine";
import { verticalConfig } from "@/config";

interface InfoPageContentProps {
  category: string;
  slug: string;
}

export default function InfoPageContent({ category, slug }: InfoPageContentProps) {
  const hub = getHubData(category);
  const pages = getCategoryPages(category);
  const page = pages.find((p) => p.slug === slug);
  if (!hub || !page) return null;

  const otherPages = pages.filter((p) => p.slug !== page.slug).slice(0, 4);
  const heroImage = getHeroImage({ category, categoryImagesMap: categoryImages });
  const heroAlt = categoryAltText[category] || `${page.title} - professional groundworks service`;
  const pageFaqs = [
    { question: `What are the signs of ${page.title.toLowerCase()}?`, answer: page.signs.slice(0, 3).join(". ") + "." },
    { question: `How do you diagnose ${page.title.toLowerCase()}?`, answer: page.diagnosis.slice(0, 200) + "..." },
    { question: `How do you fix ${page.title.toLowerCase()}?`, answer: page.resolution.slice(0, 200) + "..." },
  ];
  const pagePath = `${hub.basePath}/${page.slug}`;

  return (
    <>
      <SchemaMarkup type="Article" data={{ title: page.title, description: page.metaDescription, url: `${hub.basePath}/${page.slug}` }} />
      <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: hub.title, url: hub.basePath }, { name: page.title, url: `${hub.basePath}/${page.slug}` }] }} />
      <section className="relative bg-primary py-16 md:py-24">
        <div className="absolute inset-0">
          <img src={heroImage} alt={heroAlt} className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <nav className="mb-4">
              <Link href={hub.basePath} className="text-sm text-primary-foreground/60 hover:text-primary-foreground">
                {hub.title}
              </Link>
              <span className="mx-2 text-primary-foreground/40">/</span>
              <span className="text-sm text-primary-foreground/80">{page.title}</span>
            </nav>
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">{page.title}</h1>
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
              <MidContentCTA message={`Think you might have ${page.title.toLowerCase()}? A CCTV inspection will confirm the diagnosis.`} />
              <h2 className="mb-4 font-display text-2xl font-bold">How We Fix It</h2>
              <p className="mb-8 text-muted-foreground">{page.resolution}</p>
              {page.relatedPages && page.relatedPages.length > 0 && (
                <div className="mb-8 rounded-lg border border-border bg-secondary/50 p-6">
                  <h3 className="mb-4 font-display text-lg font-bold">How This Issue Is Normally Diagnosed and Repaired</h3>
                  <p className="mb-4 text-sm text-muted-foreground">Follow the typical path from problem identification through to resolution:</p>
                  <ol className="space-y-2">
                    {page.relatedPages.map((rp, idx) => {
                      const categoryHub = hubPages.find((h) => h.category === rp.category);
                      const linkPath =
                        rp.category === "service"
                          ? getServiceUrl(rp.slug)
                          : categoryHub
                            ? `${categoryHub.basePath}/${rp.slug}`
                            : getServiceUrl(rp.slug);
                      return (
                        <li key={rp.slug} className="flex items-center gap-2">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{idx + 1}</span>
                          <Link href={linkPath} className="text-sm text-primary hover:underline">
                            {rp.title}
                          </Link>
                        </li>
                      );
                    })}
                    <li className="flex items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{page.relatedPages.length + 1}</span>
                      <Link href="/contact" className="text-sm text-primary hover:underline">
                        Get a Free Quote →
                      </Link>
                    </li>
                  </ol>
                </div>
              )}
              <div className="mb-8">
                <InspectionCTA />
              </div>
              <div className="rounded-lg bg-primary p-6 text-center">
                <p className="mb-4 text-lg font-medium text-primary-foreground">{page.ctaText}</p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/contact">Get a Free Quote</Link>
                  </Button>
                  <TrackablePhoneLink
                    phone={companyInfo.phone}
                    vertical={verticalConfig.verticalId}
                    serviceSlug={page.relatedServices?.[0] ?? null}
                    locationSlug={null}
                    context={{
                      service: page.relatedServices?.[0] ?? null,
                      page: pagePath,
                      voiceWebhookPath: "/api/twilio/voice",
                      vertical: verticalConfig.verticalId,
                    }}
                    className="flex items-center gap-2 text-primary-foreground hover:underline"
                  >
                    <Phone className="h-5 w-5" /> {companyInfo.phone}
                  </TrackablePhoneLink>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <RelatedLinks relatedServices={page.relatedServices} category={category} currentSlug={page.slug} />
              {otherPages.length > 0 && (
                <div className="rounded-lg bg-secondary p-6">
                  <h3 className="mb-4 font-display text-lg font-bold">Related Articles</h3>
                  <div className="space-y-2">
                    {otherPages.map((p) => (
                      <Link key={p.slug} href={`${hub.basePath}/${p.slug}`} className="block text-sm text-primary hover:underline">
                        {p.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Contact Us</h3>
                <TrackablePhoneLink
                  phone={companyInfo.phone}
                  vertical={verticalConfig.verticalId}
                  serviceSlug={page.relatedServices?.[0] ?? null}
                  locationSlug={null}
                  context={{
                    service: page.relatedServices?.[0] ?? null,
                    page: pagePath,
                    voiceWebhookPath: "/api/twilio/voice",
                    vertical: verticalConfig.verticalId,
                  }}
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Phone className="h-4 w-4" /> {companyInfo.phone}
                </TrackablePhoneLink>
                <Button asChild className="mt-4 w-full">
                  <Link href="/contact">Get a Free Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FAQSchema items={pageFaqs} title={`${page.title} FAQ`} />
      <CTABanner />
    </>
  );
}
