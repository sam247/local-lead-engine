import { faqs } from "@/lib/data";

interface FAQProps {
  items?: typeof faqs;
  title?: string;
  subtitle?: string;
}

const FAQ = ({ items = faqs, title = "Frequently Asked Questions", subtitle }: FAQProps) => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              {title}
            </h2>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>

          <div className="space-y-3">
            {items.map((faq, index) => (
              <details key={index} className="rounded-lg border border-border bg-card p-4">
                <summary className="cursor-pointer font-medium">{faq.question}</summary>
                <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
