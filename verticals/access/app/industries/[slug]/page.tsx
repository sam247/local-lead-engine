import Link from "next/link";
import { notFound } from "next/navigation";
import { industries, getIndustryBySlug } from "@/data/industries";
import { services } from "@/lib/data";
import { verticalConfig } from "@/config";
import { getServiceUrl } from "engine";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = getIndustryBySlug(params.slug);
  if (!industry) return { title: "Not Found" };
  return {
    title: `${industry.title} | ${verticalConfig.siteName}`,
    description: industry.metaDescription,
    alternates: { canonical: `${verticalConfig.baseUrl}/industries/${industry.slug}` },
  };
}

export default function IndustrySlugPage({ params }: Props) {
  const industry = getIndustryBySlug(params.slug);
  if (!industry) notFound();

  const relatedServices = industry.relatedServiceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean);

  return (
    <section className="section-padding">
      <div className="container max-w-3xl">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/industries" className="hover:text-primary">Industries</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{industry.title}</span>
        </nav>
        <h1 className="mb-6 font-display text-3xl font-bold md:text-4xl">
          {industry.title}
        </h1>
        <p className="mb-6 text-lg text-muted-foreground">{industry.intro}</p>
        <div className="prose prose-neutral mb-8 dark:prose-invert">
          <p>{industry.body}</p>
        </div>
        {relatedServices.length > 0 && (
          <>
            <h2 className="mb-4 font-display text-xl font-bold">Related services</h2>
            <ul className="space-y-2">
              {relatedServices.map((s) => s && (
                <li key={s.slug}>
                  <Link href={getServiceUrl(s.slug)} className="text-primary hover:underline">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
