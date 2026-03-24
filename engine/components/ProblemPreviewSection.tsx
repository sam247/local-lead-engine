import Link from "next/link";

export interface ProblemPreviewItem {
  title: string;
  href: string;
  context?: string;
}

export interface ProblemPreviewSectionProps {
  title: string;
  intro: string;
  items: ProblemPreviewItem[];
}

/** Keeps preview rows even on small screens: short first sentence or word-safe trim. */
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

export function ProblemPreviewSection({ title, intro, items }: ProblemPreviewSectionProps) {
  const visibleItems = items.slice(0, 6);
  if (!visibleItems.length) return null;

  return (
    <section className="border-b border-border bg-secondary/20 py-10 md:py-12">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-3 font-display text-2xl font-bold">{title}</h2>
          <p className="mb-6 text-muted-foreground">{intro}</p>
          <ul className="grid gap-3 md:grid-cols-2">
            {visibleItems.map((item) => (
              <li key={item.href} className="rounded-md border border-border/70 bg-background/80 p-4">
                <Link href={item.href} className="group inline-flex items-center gap-2 font-medium text-primary">
                  <span className="group-hover:underline">{item.title}</span>
                  <span aria-hidden="true">→</span>
                </Link>
                {item.context && (
                  <p
                    className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground"
                    title={item.context}
                  >
                    {compactPreviewContext(item.context)}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
