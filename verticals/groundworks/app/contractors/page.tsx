import { ClipboardList, MapPin, Handshake, Users, TrendingUp, ShieldCheck } from "lucide-react";
import ContractorsForm from "@/components/sections/ContractorsForm";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const steps = [
  { icon: ClipboardList, title: "Client Submits Enquiry", desc: "A client describes their project and location through our website." },
  { icon: MapPin, title: "We Match to Local Contractor", desc: "We route the enquiry to a qualified contractor covering that postcode area." },
  { icon: Handshake, title: "You Receive the Lead", desc: "You get full contact details and issue information to follow up directly." },
];

const benefits = [
  { icon: Users, title: "Real Enquiries", desc: "Genuine leads from clients needing groundworks — no cold calling." },
  { icon: TrendingUp, title: "Expand Your Coverage Area", desc: "Receive enquiries in postcodes you want to grow your business into." },
  { icon: ShieldCheck, title: "No Long-Term Contracts", desc: "Flexible arrangements with no tie-in periods or ongoing marketing fees." },
];

const exampleLead = [
  { label: "Name", value: "Sarah Thompson" },
  { label: "Phone", value: "07700 900123" },
  { label: "Postcode", value: "SE19 3AF" },
  { label: "Issue", value: "Ground sinking near driveway" },
  { label: "Urgency", value: "Urgent — within 24 hours" },
];

export const metadata: Metadata = {
  title: "Groundworks Contractors — Work With Us | Mainline Groundworks",
  description: "Join our network of groundworks contractors. Receive enquiries for piling, excavation, foundations and site preparation across the UK.",
  alternates: { canonical: "https://mainlinegroundworks.co.uk/contractors" },
};

export default function ContractorsPage() {
  return (
    <>
      <section className="bg-primary py-16 md:py-24">
        <div className="container text-center">
          <h1 className="mb-4 font-display text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">Groundworks Contractors — Work With Us</h1>
          <p className="mx-auto max-w-2xl text-base text-primary-foreground/80 md:text-lg">
            We receive enquiries for piling, excavation, foundations and site preparation. We are looking for reliable groundworks contractors to work with us.
          </p>
        </div>
      </section>
      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="mb-10 text-center font-display text-2xl font-bold text-foreground md:text-3xl">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <s.icon className="h-7 w-7 text-primary" />
                </div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Step {i + 1}</p>
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="container">
          <h2 className="mb-10 text-center font-display text-2xl font-bold text-foreground md:text-3xl">Benefits for Contractors</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((b, i) => (
              <div key={i} className="rounded-lg border border-border bg-background p-6">
                <b.icon className="mb-3 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
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
              <p className="mb-6 text-sm text-muted-foreground">Here&apos;s what a typical homeowner enquiry looks like:</p>
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
              <p className="mb-6 text-sm text-muted-foreground">Fill in the form below and we&apos;ll be in touch within 48 hours.</p>
              <ContractorsForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
