import { ClipboardList, MapPin, Handshake, Users, TrendingUp, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import ContractorsForm from "@/components/sections/ContractorsForm";

export const dynamic = "force-static";
export const revalidate = false;

const steps = [
  {
    icon: ClipboardList,
    title: "Business Submits Security Enquiry",
    desc: "A business shares its access control, CCTV, or perimeter security requirement through our website.",
  },
  {
    icon: MapPin,
    title: "We Match to Local Contractor",
    desc: "We route the enquiry to a qualified security contractor covering that location and service type.",
  },
  {
    icon: Handshake,
    title: "You Receive the Lead",
    desc: "You receive contact details and project information so your team can follow up directly.",
  },
];

const benefits = [
  {
    icon: Users,
    title: "Commercial Security Enquiries",
    desc: "Real enquiries from businesses planning CCTV, access control, and integrated security works.",
  },
  {
    icon: TrendingUp,
    title: "Grow Target Coverage",
    desc: "Receive enquiries in areas and sectors you want to expand across.",
  },
  {
    icon: ShieldCheck,
    title: "Flexible Partnership Model",
    desc: "Work with us without long-term tie-ins while maintaining your own client delivery process.",
  },
];

const exampleLead = [
  { label: "Company", value: "Riverside Logistics Ltd" },
  { label: "Contact", value: "Alex Morgan" },
  { label: "Phone", value: "07700 900123" },
  { label: "Location", value: "Croydon, CR0" },
  { label: "Requirement", value: "Warehouse CCTV + door access control" },
  { label: "Timeline", value: "Survey this month, install next quarter" },
];

export const metadata: Metadata = {
  title: "Security Contractors — Work With Us | Mainline Access",
  description:
    "Join our contractor network for commercial security leads, including CCTV, access control, and perimeter security projects.",
  alternates: { canonical: "https://mainlineaccess.co.uk/contractors" },
};

export default function ContractorsPage() {
  return (
    <>
      <section className="bg-primary py-16 md:py-24">
        <div className="container text-center">
          <h1 className="mb-4 font-display text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
            Security Contractors - Work With Us
          </h1>
          <p className="mx-auto max-w-2xl text-base text-primary-foreground/80 md:text-lg">
            We receive commercial enquiries for CCTV, access control, and integrated security projects. We are looking
            for reliable contractors to deliver these leads.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="mb-10 text-center font-display text-2xl font-bold text-foreground md:text-3xl">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Step {index + 1}
                </p>
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16 md:py-20">
        <div className="container">
          <h2 className="mb-10 text-center font-display text-2xl font-bold text-foreground md:text-3xl">
            Benefits for Contractors
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-lg border border-border bg-background p-6">
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
              <p className="mb-6 text-sm text-muted-foreground">Here is what a typical security enquiry looks like:</p>
              <div className="rounded-lg border border-border bg-muted/30 p-6">
                <div className="space-y-3">
                  {exampleLead.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="text-sm text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-6 font-display text-2xl font-bold text-foreground md:text-3xl">Become a Partner</h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Fill in the form below and our team will review your details.
              </p>
              <ContractorsForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
