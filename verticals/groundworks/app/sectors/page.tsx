import Link from "next/link";
import type { Metadata } from "next";
import { verticalConfig } from "@/config";
import { groundworksSectors } from "@/data/sectors";

export const dynamic = "force-static";
export const revalidate = false;

const canonical = `${verticalConfig.baseUrl.replace(/\/$/, "")}/sectors`;

export const metadata: Metadata = {
  title: "Sectors | Mainline Groundworks",
  description:
    "Groundworks, civils and infrastructure capability by sector — commercial and residential development, industrial, public works and utilities.",
  alternates: { canonical },
};

export default function SectorsIndexPage() {
  return (
    <main className="min-h-[50vh] bg-background">
      <section className="border-b border-border bg-muted/30 py-12 md:py-16">
        <div className="container max-w-3xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Capability</p>
          <h1 className="mb-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">Sectors we support</h1>
          <p className="text-base text-muted-foreground md:text-lg">
            Programme-led groundworks and civils packages aligned to how your site is procured — from enabling and bulk
            movement through to drainage interfaces and foundation readiness.
          </p>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="container">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {groundworksSectors.map((sector) => (
              <li key={sector.slug}>
                <Link
                  href={`/sectors/${sector.slug}`}
                  className="flex h-full flex-col rounded-lg border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/40 hover:bg-muted/30"
                >
                  <h2 className="mb-2 font-display text-lg font-semibold text-foreground">{sector.title}</h2>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground">{sector.metaDescription}</p>
                  <span className="text-sm font-medium text-primary">View sector →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
