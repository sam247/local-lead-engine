import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { verticalConfig } from "@/config";
import { services } from "@/lib/data";
import {
  getGroundworksSector,
  groundworksSectors,
  resolveSectorServices,
} from "@/data/sectors";

export const dynamic = "force-static";
export const revalidate = false;

const base = verticalConfig.baseUrl.replace(/\/$/, "");

export function generateStaticParams() {
  return groundworksSectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = getGroundworksSector(slug);
  if (!sector) return { title: "Not found" };
  return {
    title: `${sector.title} | Mainline Groundworks`,
    description: sector.metaDescription,
    alternates: { canonical: `${base}/sectors/${sector.slug}` },
  };
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sector = getGroundworksSector(slug);
  if (!sector) notFound();

  const relatedServices = resolveSectorServices(sector.relatedServiceSlugs, services);

  return (
    <main className="min-h-[50vh] bg-background">
      <article className="border-b border-border bg-muted/20 py-12 md:py-16">
        <div className="container max-w-3xl">
          <nav className="mb-4 text-sm text-muted-foreground">
            <Link href="/sectors" className="hover:text-primary">
              Sectors
            </Link>
            <span className="mx-2 text-border">/</span>
            <span className="text-foreground">{sector.shortTitle}</span>
          </nav>
          <h1 className="mb-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">{sector.title}</h1>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{sector.intro}</p>
        </div>
      </article>

      <section className="py-10 md:py-14">
        <div className="container max-w-3xl">
          <p className="text-base leading-relaxed text-foreground">{sector.body}</p>
        </div>
      </section>

      <section className="border-t border-border bg-muted/20 py-10 md:py-14">
        <div className="container max-w-3xl">
          <h2 className="mb-6 font-display text-xl font-semibold text-foreground">Related services</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {relatedServices.map((svc) => (
              <li key={svc.slug}>
                <Link href={`/${svc.slug}`} className="block rounded-md border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary">
                  {svc.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container max-w-3xl">
          <h2 className="mb-6 font-display text-xl font-semibold text-foreground">Planning & technical guides</h2>
          <ul className="space-y-2">
            {sector.relatedGuides.map((g) => (
              <li key={g.href}>
                <Link href={g.href} className="text-sm font-medium text-primary hover:underline">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">
            <Link href="/contact" className="font-medium text-primary hover:underline">
              Discuss your package
            </Link>
            {" — "}we align scope with drawings, programme and inspection requirements.
          </p>
        </div>
      </section>
    </main>
  );
}
