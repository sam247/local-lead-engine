import type { Metadata } from "next";
import { ClipboardList, Handshake, MapPin, ShieldCheck, TrendingUp, Users } from "lucide-react";
import ContractorsForm from "@/components/sections/ContractorsForm";

export const dynamic = "force-static";
export const revalidate = false;

const steps = [
  {
    icon: ClipboardList,
    title: "Client submits the enquiry",
    desc: "A homeowner, builder, or site manager tells us the scaffold requirement, location, and timing through the website.",
  },
  {
    icon: MapPin,
    title: "We match by area and scope",
    desc: "We review the access need and pass it to scaffolding contractors covering that area and project type.",
  },
  {
    icon: Handshake,
    title: "You receive the lead",
    desc: "You get the enquiry details directly so you can qualify the access requirement and quote the work.",
  },
];

const benefits = [
  {
    icon: Users,
    title: "Real scaffold enquiries",
    desc: "Leads come from homeowners, builders, and commercial clients already looking for scaffold pricing or access advice.",
  },
  {
    icon: TrendingUp,
    title: "Expand your coverage",
    desc: "Receive enquiries in the towns, sectors, and project types you actually want to grow into.",
  },
  {
    icon: ShieldCheck,
    title: "Flexible arrangement",
    desc: "No long tie-in period. We review fit and coverage before sending work through.",
  },
];

const exampleLead = [
  { label: "Name", value: "James Carter" },
  { label: "Phone", value: "07700 900123" },
  { label: "Postcode", value: "TW1 3AF" },
  { label: "Project", value: "Rear extension and reroof scaffold" },
  { label: "Timing", value: "Need scaffold up within 10 days" },
];

export const metadata: Metadata = {
  title: "Scaffolding Contractors - Work With Us | Mainline Scaffold",
  description: "Join our scaffolding contractor network and receive real domestic, commercial, and emergency access enquiries.",
  alternates: { canonical: "https://mainlinescaffold.co.uk/contractors" },
};

export default function ContractorsPage() {
  return (
    <>
      <section className="bg-primary py-16 md:py-24">
        <div className="container text-center">
          <h1 className="mb-4 font-display text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
            Scaffolding Contractors - Work With Us
          </h1>
          <p className="mx-auto max-w-2xl text-base text-primary-foreground/80 md:text-lg">
            We receive domestic, commercial, and emergency scaffolding enquiries every week and are looking for reliable contractors to support selected areas.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="mb-10 text-center font-display text-2xl font-bold text-foreground md:text-3xl">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Step {index + 1}</p>
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16 md:py-20">
        <div className="container">
          <h2 className="mb-10 text-center font-display text-2xl font-bold text-foreground md:text-3xl">Benefits for Contractors</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="rounded-lg border border-border bg-background p-6">
                <benefit.icon className="mb-3 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-display text-2xl font-bold text-foreground md:text-3xl">Example Lead Format</h2>
              <p className="mb-6 text-sm text-muted-foreground">Here is the kind of scaffolding enquiry we pass through when there is a fit on area and scope.</p>
              <div className="rounded-lg border border-border bg-muted/30 p-6">
                <div className="space-y-3">
                  {exampleLead.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className="w-20 shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</span>
                      <span className="text-sm text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-6 font-display text-2xl font-bold text-foreground md:text-3xl">Become a Partner</h2>
              <p className="mb-6 text-sm text-muted-foreground">Send over your details and coverage areas and we will review whether there is a fit.</p>
              <ContractorsForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
