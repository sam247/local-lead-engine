import Link from "next/link";
import { Briefcase, Check, Shield } from "lucide-react";

const TRUST_ITEMS = [
  { label: "Vetted contractors", icon: Check },
  { label: "Fully insured", icon: Shield },
  { label: "Commercial & site work specialists", icon: Briefcase },
] as const;

export type HomeTrustCoreService = { slug: string; title: string };

export interface HomeTrustCoreBarProps {
  coreServices: HomeTrustCoreService[];
}

export function HomeTrustCoreBar({ coreServices }: HomeTrustCoreBarProps) {
  return (
    <section
      className="border-b border-border bg-background py-5 sm:py-6"
      aria-labelledby="core-services-heading"
    >
      <div className="container">
        <div className="flex flex-col gap-4 sm:gap-5">
          <ul
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-xs text-muted-foreground/80 sm:justify-between"
            aria-label="Trust signals"
          >
            {TRUST_ITEMS.map(({ label, icon: Icon }, i) => (
              <li key={`${label}-${i}`} className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                <span>{label}</span>
              </li>
            ))}
          </ul>
          <div>
            <h2
              id="core-services-heading"
              className="mb-2 font-display text-lg font-semibold text-foreground sm:mb-3"
            >
              Core services
            </h2>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
              {coreServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="text-primary hover:underline">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
