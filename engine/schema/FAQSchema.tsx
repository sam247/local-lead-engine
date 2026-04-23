export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSchemaProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  /** Optional: render custom FAQ UI. If not provided, only JSON-LD is rendered. */
  children?: React.ReactNode;
}

function buildFaqPageSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** JSON-LD only — pair with GuidePage or custom layout. */
export function FAQSchemaJsonLd({ items }: { items: FAQItem[] }) {
  const schema = buildFaqPageSchema(items);
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

export function FAQSchema({ items, title, subtitle, children }: FAQSchemaProps) {
  const schema = buildFaqPageSchema(items);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children ?? (
        <section className="section-padding">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <div className="mb-4">
                <h2 className="mb-2 font-display text-2xl font-bold text-foreground">
                  {title ?? "Frequently Asked Questions"}
                </h2>
                {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
              </div>
              <div className="space-y-3">
                {items.map((item) => (
                  <details key={item.question} className="rounded-lg border border-border bg-card p-4">
                    <summary className="cursor-pointer font-medium">{item.question}</summary>
                    <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
