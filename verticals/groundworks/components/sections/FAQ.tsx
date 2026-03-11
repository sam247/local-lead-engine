import { faqs } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

          <Accordion type="single" collapsible className="w-full">
            {items.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-display font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
