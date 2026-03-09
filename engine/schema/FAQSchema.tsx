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

export function FAQSchema({ items, title, subtitle, children }: FAQSchemaProps) {
  const schema = {
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children ?? (
        <section className="section-padding">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <div className="mb-12 text-center">
                <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                  {title ?? "Frequently Asked Questions"}
                </h2>
                {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
              </div>
              <dl className="space-y-4">
                {items.map((item, index) => (
                  <div key={index}>
                    <dt className="font-display font-semibold text-foreground">{item.question}</dt>
                    <dd className="mt-2 text-muted-foreground">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
