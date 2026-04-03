import Link from "next/link";
import { companyInfo } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import FAQSchema from "@/components/sections/FAQSchema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import CTABanner from "@/components/sections/CTABanner";
import { TrackablePhoneLink } from "engine";
import { verticalConfig } from "@/config";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const faqSections = [
  {
    title: "Drain Problems",
    items: [
      { question: "Can drains collapse suddenly?", answer: "Yes. While most drain collapses develop gradually, sudden collapses can occur due to heavy traffic, ground movement, or nearby construction work. A pre-emptive CCTV survey can detect weaknesses before they fail." },
      { question: "What are the signs of a collapsed drain?", answer: "Common signs include slow drainage, foul smells, sinkholes in the garden, damp walls, recurring blockages, and gurgling sounds. If you notice multiple symptoms, book a CCTV drain survey immediately.", link: "/drain-problems/signs-of-collapsed-drain" },
      { question: "Why do my drains keep blocking?", answer: "Recurring blockages usually indicate a structural problem such as a partial collapse, displaced joint, tree root ingress, or incorrect pipe gradient. A CCTV survey reveals the root cause.", link: "/drain-problems/recurring-drain-blockages" },
      { question: "What causes collapsed drains?", answer: "The most common causes are tree root ingress, ground movement, old clay pipes deteriorating, heavy traffic above pipes, and damage from building work.", link: "/drain-causes/tree-roots-in-drains" },
    ],
  },
  {
    title: "Drain Repairs",
    items: [
      { question: "How long do drain repairs take?", answer: "Simple jetting takes 1–3 hours. Drain relining typically takes half a day to a full day. Excavation repairs take 1–5 days depending on depth and complexity.", link: "/drain-repair-methods/how-long-do-drain-repairs-take" },
      { question: "What is drain relining?", answer: "Drain relining is a no-dig repair method where a resin-coated liner is inserted into your damaged pipe and cured in place, creating a seamless new pipe inside the old one. It avoids excavation and has a 50+ year lifespan.", link: "/drain-repair-methods/how-drain-relining-works" },
      { question: "Do I need planning permission for drain repairs?", answer: "Standard drain repairs on private land don't usually require planning permission. However, if the work involves a public sewer or is near a listed building, you may need approval. We can advise on your specific situation." },
      { question: "Is drain relining worth it?", answer: "In most cases, yes. Relining costs 30–60% less than excavation, causes no surface disruption, and lasts 50+ years. However, it's not suitable for fully collapsed pipes — a CCTV survey determines suitability.", link: "/drain-repair-methods/is-drain-relining-worth-it" },
    ],
  },
  {
    title: "Costs & Insurance",
    items: [
      { question: "How much does drain relining cost?", answer: "Drain relining typically costs £80–£200 per metre, with most residential jobs costing £800–£3,000 total. Patch repairs for single defects cost £300–£800. We provide fixed-price quotes after a CCTV survey.", link: "/drain-costs/drain-relining-cost" },
      { question: "Does insurance cover collapsed drains?", answer: "Many home insurance policies cover collapsed drain repair, especially if the damage is sudden. We provide detailed CCTV reports and documentation to support insurance claims.", link: "/drain-insurance/does-home-insurance-cover-drains" },
      { question: "Who is responsible for drains?", answer: "You're responsible for private drains within your property boundary. Shared drains adopted by the water company (since 2011) are their responsibility. We can survey and trace your system to clarify responsibility.", link: "/drain-insurance/shared-drain-responsibility" },
      { question: "How much does a CCTV drain survey cost?", answer: "Standard residential surveys cost £150–£300. Detailed homebuyer surveys with reports cost £250–£400. Post-repair verification surveys are often included free.", link: "/drain-costs/cctv-drain-survey-cost" },
    ],
  },
  {
    title: "Surveys & Inspections",
    items: [
      { question: "Do I need a CCTV drain survey?", answer: "You should get a survey if you have recurring problems, are buying a property, planning building work near drains, or making an insurance claim. It's the only way to see the true condition of underground pipes.", link: "/do-i-need-a-drain-survey" },
      { question: "What does a CCTV drain survey involve?", answer: "A specialist camera is inserted into your drains via manholes. It records HD footage of the pipe interior, identifying cracks, collapses, root ingress, blockages and other defects without any digging.", link: "/drain-inspection/cctv-drain-inspection" },
      { question: "Should I get a drain survey before buying a house?", answer: "Yes. Standard homebuyer surveys don't check underground drains, yet drainage repairs can cost £1,000–£15,000+. A pre-purchase survey protects your investment.", link: "/drain-survey/drain-survey-before-buying-house" },
    ],
  },
];

const allFaqs = faqSections.flatMap((s) => s.items.map(({ question, answer }) => ({ question, answer })));

export const metadata: Metadata = {
  title: "Drainage FAQ | Mainline Drains",
  description: "Frequently asked questions about drain problems, repairs, costs and insurance. Expert answers from London's trusted drainage engineers.",
  alternates: { canonical: "https://mainlinedrains.co.uk/drainage-faq" },
};

export default function DrainageFaqPage() {
  return (
    <>
      <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: "Drainage Guides", url: "/drainage-guides" }, { name: "Drainage FAQ", url: "/drainage-faq" }] }} />
      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">Drainage FAQ</h1>
            <p className="text-lg text-primary-foreground/80">Answers to the most common questions about drains, repairs, costs and insurance.</p>
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
                <TrackablePhoneLink
                  phone={companyInfo.phone}
                  vertical={verticalConfig.verticalId}
                  serviceSlug={null}
                  locationSlug={null}
                  pagePath="/drainage-faq"
                  className="flex items-center gap-2 text-primary-foreground hover:underline"
                >
                  <Phone className="h-5 w-5" /> Call Now
                </TrackablePhoneLink>
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
