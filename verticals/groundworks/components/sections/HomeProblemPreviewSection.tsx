import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProblemPreviewSectionProps } from "engine";

function compactPreviewContext(text: string, maxLength = 118): string {
  const trimmed = text.trim().replace(/\s+/g, " ");
  if (trimmed.length <= maxLength) return trimmed;
  const firstStop = trimmed.search(/[.!?](\s|$)/);
  if (firstStop >= 24 && firstStop + 1 <= maxLength + 8) {
    return trimmed.slice(0, firstStop + 1);
  }
  const cut = trimmed.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > 36 ? cut.slice(0, lastSpace) : cut;
  return `${base.trimEnd()}…`;
}

export function HomeProblemPreviewSection({ title, intro, items }: ProblemPreviewSectionProps) {
  const visibleItems = items.slice(0, 6);
  if (!visibleItems.length) return null;

  return (
    <section className="border-b border-border bg-secondary/20 pt-6 pb-10 md:pb-12">
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <h2 className="mb-3 font-display text-2xl font-bold md:text-3xl">{title}</h2>
          <p className="text-muted-foreground">{intro}</p>
        </div>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group block cursor-pointer rounded-md border border-border/70 bg-background/80 p-4 transition-all duration-150 hover:translate-x-0.5 hover:border-primary/60 hover:bg-muted/55 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium text-primary group-hover:underline">{item.title}</span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-muted-foreground opacity-70 transition-transform duration-150 group-hover:translate-x-1 group-hover:opacity-100"
                    aria-hidden
                  />
                </div>
                {item.context && (
                  <p
                    className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground"
                    title={item.context}
                  >
                    {compactPreviewContext(item.context)}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
