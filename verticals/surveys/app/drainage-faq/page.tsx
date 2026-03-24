import Link from "next/link";
import { companyInfo } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import FAQSchema from "@/components/sections/FAQSchema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import CTABanner from "@/components/sections/CTABanner";
import { getServiceUrl } from "engine";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const faqSections = [
  {
    title: "Planning & Development",
    items: [
      { question: "What survey do I need for planning permission?", answer: "Most planning applications need an up-to-date topographical survey of the site and often a measured building survey of any existing structures you plan to alter. Boundary surveys may be required where works are close to the property line.", link: "/drainage-guides/survey-for-planning-permission" },
      { question: "Do I need a survey before an extension?", answer: "Yes, in most cases. A measured building survey gives your architect accurate floor plans, elevations and sections; a topographical survey captures levels and features in the garden. Together they reduce design risk.", link: "/drainage-guides/survey-before-building-extension" },
      { question: "When do I need a topographical survey?", answer: "You typically need one for planning applications, feasibility studies, and before detailed design. They show existing levels, boundaries, buildings and features so designs are accurate.", link: "/drainage-guides/survey-for-planning-permission" },
    ],
  },
  {
    title: "Survey Costs",
    items: [
      { question: "How much does a topographical survey cost?", answer: "Costs depend on site size and complexity. Small residential plots typically range from around £600–£1,200 + VAT; larger sites can be £1,500–£4,000+. Survey partners provide fixed quotes once scope is clear.", link: "/drain-costs/topographical-survey-cost" },
      { question: "How much does a drone survey cost?", answer: "Drone survey pricing depends on site size, deliverables and airspace. Small sites or roof inspections often start from around £750–£1,500 + VAT; larger sites may be £2,000–£7,000+. Request a quote for your project.", link: "/drain-costs/drone-survey-cost" },
      { question: "How long does a survey take?", answer: "A typical topographical or measured building survey for a single dwelling can be completed on site in one day, with drawings delivered within a few days to a week. Larger or drone surveys may need more processing time.", link: "/drainage-guides/how-long-does-a-drone-survey-take" },
    ],
  },
  {
    title: "Survey Types",
    items: [
      { question: "When should I use a drone survey?", answer: "Drone surveys are ideal for large or inaccessible sites, roof inspections, progress monitoring and volume calculations. They often cost less than traditional surveys for big areas and deliver orthophotos, contours and 3D models.", link: "/drainage-guides/when-to-use-drone-surveys" },
      { question: "What is a utility survey?", answer: "Utility surveys locate and map buried services (electric, gas, water, telecoms, drainage) before excavation. They reduce the risk of service strikes and support CDM and design. Often combined with topographical surveys.", link: "/drainage-guides/what-is-gpr-utility-mapping" },
      { question: "What is a measured building survey?", answer: "A measured building survey captures the as-built layout of a property — floor plans, elevations and sections — for extensions, refurbishments and change-of-use. Outputs are typically 2D CAD or 3D/BIM.", link: getServiceUrl("measured-building-survey") },
    ],
  },
];

const allFaqs = faqSections.flatMap((s) => s.items.map(({ question, answer }) => ({ question, answer })));

export const metadata: Metadata = {
  title: "Survey FAQ | Mainline Surveys",
  description: "Frequently asked questions about land surveys, drone surveys, costs and when to book. Expert answers from Mainline Surveys.",
  alternates: { canonical: "https://mainlinesurveys.co.uk/drainage-faq" },
};

export default function DrainageFaqPage() {
  return (
    <>
      <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: "Guides", url: "/drainage-guides" }, { name: "Survey FAQ", url: "/drainage-faq" }] }} />
      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">Survey FAQ</h1>
            <p className="text-lg text-primary-foreground/80">Answers to the most common questions about land surveys, drone surveys, costs and when to book.</p>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            {faqSections.map((section) => (
              <div key={section.title} className="mb-10">
                <h2 className="mb-6 font-display text-2xl font-bold">{section.title}</h2>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.question} className="rounded-lg border border-border p-5">
                      <h3 className="mb-2 font-display font-semibold">{item.question}</h3>
                      <p className="text-sm text-muted-foreground">{item.answer}</p>
                      {item.link && (
                        <Link href={item.link} className="mt-2 inline-block text-sm font-medium text-primary hover:underline">Read more →</Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="rounded-lg bg-primary p-6 text-center">
              <p className="mb-4 text-lg font-medium text-primary-foreground">Still have questions?</p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-primary-foreground">
                  <Phone className="h-5 w-5" /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FAQSchema items={allFaqs} />
      <CTABanner />
    </>
  );
}
