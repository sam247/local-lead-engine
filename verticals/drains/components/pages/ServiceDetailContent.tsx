import Link from "next/link";
import { services, locations } from "@/lib/data";
import { getHeroImage } from "@/lib/images";
import { verticalConfig } from "@/config";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, AlertTriangle } from "lucide-react";
import { BreadcrumbNav, SchemaMarkup as EngineSchemaMarkup } from "engine";
import InspectionCTA from "@/components/sections/InspectionCTA";
import MidContentCTA from "@/components/sections/MidContentCTA";
import FAQSchema from "@/components/sections/FAQSchema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import RelatedLinks from "@/components/sections/RelatedLinks";
import CTABanner from "@/components/sections/CTABanner";

const serviceSymptomLinks: Record<string, { slug: string; path: string; title: string }[]> = {
  "drain-collapse-repair": [
    { slug: "signs-of-collapsed-drain", path: "/drain-problems/signs-of-collapsed-drain", title: "Signs of a collapsed drain" },
    { slug: "sinkholes-garden-driveway", path: "/drain-problems/sinkholes-garden-driveway", title: "Sinkholes in garden or driveway" },
    { slug: "cracks-in-driveway-near-drain", path: "/drain-problems/cracks-in-driveway-near-drain", title: "Cracks in driveway near drain" },
    { slug: "why-is-my-garden-sinking", path: "/drain-problems/why-is-my-garden-sinking", title: "Garden sinking or subsiding" },
  ],
  "drain-relining": [
    { slug: "recurring-drain-blockages", path: "/drain-problems/recurring-drain-blockages", title: "Recurring drain blockages" },
    { slug: "bad-smells-from-drains", path: "/drain-problems/bad-smells-from-drains", title: "Persistent bad smells from drains" },
    { slug: "gurgling-drains-pipes", path: "/drain-problems/gurgling-drains-pipes", title: "Gurgling sounds from pipes" },
    { slug: "slow-draining-sinks-toilets", path: "/drain-problems/slow-draining-sinks-toilets", title: "Slow draining sinks and toilets" },
  ],
  "cctv-drain-surveys": [
    { slug: "signs-of-collapsed-drain", path: "/drain-problems/signs-of-collapsed-drain", title: "Signs of a collapsed drain" },
    { slug: "recurring-drain-blockages", path: "/drain-problems/recurring-drain-blockages", title: "Recurring blockages" },
    { slug: "bad-smells-from-drains", path: "/drain-problems/bad-smells-from-drains", title: "Persistent drain smells" },
    { slug: "why-is-my-garden-sinking", path: "/drain-problems/why-is-my-garden-sinking", title: "Garden sinking" },
  ],
  "drain-excavation": [
    { slug: "sinkholes-garden-driveway", path: "/drain-problems/sinkholes-garden-driveway", title: "Sinkholes in garden or driveway" },
    { slug: "signs-of-collapsed-drain", path: "/drain-problems/signs-of-collapsed-drain", title: "Signs of a collapsed drain" },
    { slug: "cracks-in-driveway-near-drain", path: "/drain-problems/cracks-in-driveway-near-drain", title: "Driveway cracks near drains" },
    { slug: "drain-backing-up-garden", path: "/drain-problems/drain-backing-up-garden", title: "Drain backing up in garden" },
  ],
  "emergency-drainage": [
    { slug: "drain-backing-up-garden", path: "/drain-problems/drain-backing-up-garden", title: "Sewage backing up in garden" },
    { slug: "why-is-water-backing-up-in-drains", path: "/drain-problems/why-is-water-backing-up-in-drains", title: "Water backing up through drains" },
    { slug: "drain-backflow", path: "/drain-problems/drain-backflow", title: "Drain backflow into property" },
    { slug: "drain-water-coming-up-in-shower", path: "/drain-problems/drain-water-coming-up-in-shower", title: "Water coming up in shower" },
  ],
  "blocked-drains": [
    { slug: "recurring-drain-blockages", path: "/drain-problems/recurring-drain-blockages", title: "Recurring blockages" },
    { slug: "slow-draining-sinks-toilets", path: "/drain-problems/slow-draining-sinks-toilets", title: "Slow draining sinks and toilets" },
    { slug: "gurgling-drains-pipes", path: "/drain-problems/gurgling-drains-pipes", title: "Gurgling drains and pipes" },
    { slug: "bad-smells-from-drains", path: "/drain-problems/bad-smells-from-drains", title: "Bad smells from drains" },
  ],
  "drain-jetting": [
    { slug: "recurring-drain-blockages", path: "/drain-problems/recurring-drain-blockages", title: "Recurring blockages" },
    { slug: "slow-draining-sinks-toilets", path: "/drain-problems/slow-draining-sinks-toilets", title: "Slow draining fixtures" },
    { slug: "drain-backing-up-garden", path: "/drain-problems/drain-backing-up-garden", title: "Drains backing up" },
    { slug: "why-is-my-drain-blocking", path: "/drain-problems/why-is-my-drain-blocking", title: "Why drains keep blocking" },
  ],
  "drain-root-removal": [
    { slug: "recurring-drain-blockages", path: "/drain-problems/recurring-drain-blockages", title: "Recurring blockages" },
    { slug: "slow-draining-sinks-toilets", path: "/drain-problems/slow-draining-sinks-toilets", title: "Slow draining fixtures" },
    { slug: "sinkholes-garden-driveway", path: "/drain-problems/sinkholes-garden-driveway", title: "Sinkholes near trees" },
    { slug: "bad-smells-from-drains", path: "/drain-problems/bad-smells-from-drains", title: "Persistent drain odours" },
  ],
  "drain-unblocking": [
    { slug: "recurring-drain-blockages", path: "/drain-problems/recurring-drain-blockages", title: "Recurring blockages" },
    { slug: "slow-draining-sinks-toilets", path: "/drain-problems/slow-draining-sinks-toilets", title: "Slow draining sinks" },
    { slug: "gurgling-drains-pipes", path: "/drain-problems/gurgling-drains-pipes", title: "Gurgling drains" },
    { slug: "drain-backing-up-garden", path: "/drain-problems/drain-backing-up-garden", title: "Drain backing up" },
  ],
  "drain-pipe-replacement": [
    { slug: "signs-of-collapsed-drain", path: "/drain-problems/signs-of-collapsed-drain", title: "Signs of collapsed drain" },
    { slug: "sinkholes-garden-driveway", path: "/drain-problems/sinkholes-garden-driveway", title: "Sinkholes in garden" },
    { slug: "recurring-drain-blockages", path: "/drain-problems/recurring-drain-blockages", title: "Recurring blockages" },
    { slug: "cracks-in-driveway-near-drain", path: "/drain-problems/cracks-in-driveway-near-drain", title: "Driveway cracking" },
  ],
  "commercial-drainage": [
    { slug: "recurring-drain-blockages", path: "/drain-problems/recurring-drain-blockages", title: "Recurring blockages" },
    { slug: "bad-smells-from-drains", path: "/drain-problems/bad-smells-from-drains", title: "Drain odours on premises" },
    { slug: "slow-draining-sinks-toilets", path: "/drain-problems/slow-draining-sinks-toilets", title: "Slow draining fixtures" },
    { slug: "drain-backing-up-garden", path: "/drain-problems/drain-backing-up-garden", title: "Drain backflow" },
  ],
};

const serviceFaqs: Record<string, { question: string; answer: string }[]> = {
  "drain-collapse-repair": [
    { question: "How much does collapsed drain repair cost?", answer: "Costs range from £1,500 for shallow garden repairs to £8,000+ for deep collapses under buildings. We provide fixed-price quotes after a CCTV survey." },
    { question: "How long does collapsed drain repair take?", answer: "Simple repairs take 1–2 days. Complex jobs under buildings or roads can take 3–5 days. Emergency work starts same-day." },
    { question: "Will my insurance cover collapsed drain repair?", answer: "Many buildings insurance policies cover sudden drain collapse. We provide CCTV reports formatted for insurance claims to support your case." },
  ],
  "drain-relining": [
    { question: "How long does drain relining last?", answer: "Relined drains have a design life of 50+ years. The seamless liner is resistant to root ingress, corrosion, and joint failure." },
    { question: "Is drain relining cheaper than excavation?", answer: "Yes — relining typically costs 30–60% less than excavation because it avoids digging, surface reinstatement, and longer labour times." },
    { question: "Can all drains be relined?", answer: "Most drains 100mm–300mm diameter can be relined if they retain their circular shape. A CCTV survey determines suitability." },
  ],
  "cctv-drain-surveys": [
    { question: "How much does a CCTV drain survey cost?", answer: "Standard residential surveys cost £150–£300. Detailed homebuyer surveys with reports cost £250–£400." },
    { question: "How long does a drain survey take?", answer: "Most residential CCTV drain surveys take 1–2 hours. Reports are delivered within 24–48 hours." },
    { question: "Is a CCTV drain survey disruptive?", answer: "No. CCTV surveys are completely non-invasive. We access drains through existing manholes — no digging required." },
  ],
  "drain-excavation": [
    { question: "How much does drain excavation cost?", answer: "Shallow excavations start from £1,000. Deep excavations under buildings can cost £3,000–£8,000+. Surface reinstatement is included." },
    { question: "How long does drain excavation take?", answer: "Simple excavations take 1–2 days. Complex jobs with deep pipes or restricted access may take 3–5 days." },
    { question: "Will my garden/driveway be restored?", answer: "Yes. Full surface reinstatement is included in every excavation job — whether it's lawn, paving, tarmac, or concrete." },
  ],
  "emergency-drainage": [
    { question: "How quickly can you respond to an emergency?", answer: "Our emergency team typically arrives within 1–2 hours, operating 24/7 including weekends and bank holidays." },
    { question: "What counts as a drainage emergency?", answer: "Sewage flooding, drains backing up into the property, multiple fixtures blocked simultaneously, or ground collapse over drains." },
    { question: "Do you charge extra for emergency callouts?", answer: "Emergency callouts carry a premium, but we never charge a separate call-out fee when repair work is carried out." },
  ],
  "blocked-drains": [
    { question: "How much does drain unblocking cost?", answer: "Simple unblocking starts from £80–£150. High-pressure jetting costs £150–£300. Emergency out-of-hours callouts cost £200–£400." },
    { question: "Why do my drains keep blocking?", answer: "Recurring blockages usually indicate a structural problem — partial collapse, root ingress, or pipe gradient issues. A CCTV survey finds the cause." },
    { question: "Can blocked drains cause damage?", answer: "Yes. Persistent blockages can cause sewage backflow, damp, bad smells, and even structural damage if the pipe collapses." },
  ],
  "drain-jetting": [
    { question: "What pressure does drain jetting use?", answer: "Professional drain jetting uses water at 3,000–4,000 PSI — far more powerful than consumer equipment and effective on all blockage types." },
    { question: "Is drain jetting safe for old pipes?", answer: "Yes, when carried out by qualified engineers who assess pipe condition first. We always check with CCTV before jetting damaged pipes." },
    { question: "How often should drains be jetted?", answer: "For most residential properties, every 1–2 years as preventative maintenance. Commercial kitchens may need quarterly jetting." },
  ],
  "drain-root-removal": [
    { question: "Will tree roots grow back after removal?", answer: "Without relining, roots typically regrow within 12–24 months. We recommend relining after root removal to seal entry points permanently." },
    { question: "Which trees cause the most drain damage?", answer: "Willows, poplars, oaks and ash trees are the most aggressive. Their roots can travel 10–20 metres from the trunk." },
    { question: "Does root removal damage the pipe?", answer: "No. We use specialist mechanical cutters designed for drain pipes. The cutting action removes roots without damaging the pipe walls." },
  ],
  "drain-unblocking": [
    { question: "What methods do you use to unblock drains?", answer: "We use high-pressure jetting, mechanical rodding, electro-mechanical cutting, and hand tools depending on the blockage type and location." },
    { question: "Do you check the cause after unblocking?", answer: "Yes. Every unblocking includes a CCTV check to identify the underlying cause and prevent the blockage returning." },
    { question: "Can you unblock drains same-day?", answer: "Yes. Most drain unblocking jobs are completed same-day, often within hours of your call." },
  ],
  "drain-pipe-replacement": [
    { question: "What pipe materials do you use?", answer: "We use modern PVC-U or HDPE plastic pipes that are resistant to root ingress, corrosion, and ground movement. All pipes carry manufacturer guarantees." },
    { question: "How long does pipe replacement take?", answer: "Simple replacements take 1–2 days. Longer runs or difficult access may take 3–5 days including surface reinstatement." },
    { question: "Is pipe replacement better than relining?", answer: "For fully collapsed pipes, yes. Relining is better for partially damaged pipes. A CCTV survey determines which is most appropriate." },
  ],
  "commercial-drainage": [
    { question: "Do you offer maintenance contracts?", answer: "Yes. Planned maintenance contracts include scheduled jetting, CCTV inspections, and priority emergency response for contract clients." },
    { question: "Can you work outside business hours?", answer: "Yes. We schedule commercial work to minimise business disruption, including evenings, weekends, and overnight where required." },
    { question: "Do you provide compliance documentation?", answer: "Yes. All commercial work includes detailed reports, compliance certificates, and maintenance records suitable for regulatory requirements." },
  ],
};

interface ServiceDetailContentProps {
  service: (typeof services)[number];
}

export default function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  const symptoms = serviceSymptomLinks[service.slug] || [];
  const faqs = serviceFaqs[service.slug] || [];
  const imageSrc = getHeroImage({ serviceSlug: service.slug });

  return (
    <>
      <EngineSchemaMarkup
        type="Service"
        companyInfo={verticalConfig.companyInfo}
        baseUrl={verticalConfig.baseUrl}
        data={{
          serviceName: service.title,
          serviceDescription: service.description,
          url: `/services/${service.slug}`,
          areaServed: "London and surrounding areas",
          serviceType: service.title,
        }}
      />
      <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: service.title, url: `/services/${service.slug}` }] }} />
      <section className="relative bg-primary py-16 md:py-24">
        <div className="absolute inset-0">
          <img src={imageSrc} alt="" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <BreadcrumbNav
              items={[
                { name: "Home", url: "/" },
                { name: "Services", url: "/services" },
                { name: service.title, url: `/services/${service.slug}` },
              ]}
              variant="inverse"
            />
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">{service.title}</h1>
            <p className="text-lg text-primary-foreground/80">{service.shortDescription}</p>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-4 font-display text-2xl font-bold">Overview</h2>
              <p className="mb-8 text-muted-foreground">{service.description}</p>
              {symptoms.length > 0 && (
                <>
                  <h3 className="mb-4 font-display text-xl font-bold">Common Signs You Need {service.title}</h3>
                  <ul className="mb-8 space-y-2">
                    {symptoms.map((s) => (
                      <li key={s.slug} className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
                        <Link href={s.path} className="text-primary hover:underline">{s.title}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <h3 className="mb-4 font-display text-xl font-bold">Our Process</h3>
              <ol className="mb-8 space-y-3">
                {service.process.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
              <MidContentCTA message="Not sure what's wrong with your drains? Book a professional CCTV drain survey for a clear diagnosis." buttonText="Book a CCTV Survey" />
              <h3 className="mb-4 font-display text-xl font-bold">Benefits</h3>
              <ul className="mb-8 space-y-2">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <InspectionCTA />
            </div>
            <div className="space-y-6">
              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Related Drain Services</h3>
                <ul className="space-y-2">
                  {services
                    .filter((s) => s.slug !== service.slug)
                    .slice(0, 6)
                    .map((s) => (
                      <li key={s.id}>
                        <Link href={`/services/${s.slug}`} className="text-sm text-primary hover:underline">
                          {s.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Areas We Cover</h3>
                <div className="grid grid-cols-2 gap-2">
                  {locations.map((loc) => (
                    <Link key={loc.id} href={`/${service.slug}/${loc.id}`} className="text-sm text-primary hover:underline">
                      {loc.name} <ArrowRight className="inline h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>
              <RelatedLinks relatedServices={services.filter((s) => s.slug !== service.slug).slice(0, 3).map((s) => s.slug)} />
              <Button asChild className="w-full" variant="highlight">
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {faqs.length > 0 && <FAQSchema items={faqs} title={`${service.title} FAQ`} />}
      <CTABanner />
    </>
  );
}
