import { companyInfo } from "@/lib/data";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import ContactForm from "@/components/sections/ContactForm";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "Contact Us | Mainline Access",
  description: "Get in touch with Mainline Access for a free quote on access control, CCTV and integrated security systems.",
  alternates: { canonical: "https://mainlineaccess.co.uk/contact" },
};

export default function ContactPage() {
  return (
    <>
      <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }] }} />
      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">Contact Us</h1>
            <p className="text-lg text-primary-foreground/80">Get in touch for a free, no-obligation quote — 24/7.</p>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2 className="mb-6 font-display text-2xl font-bold">Request a Quote</h2>
              <ContactForm />
            </div>
            <div className="lg:col-span-2">
              <h2 className="mb-6 font-display text-2xl font-bold">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-lg border p-5">
                  <Phone className="h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-display font-semibold">Phone</h3>
                    <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`} className="text-sm text-muted-foreground hover:text-primary">Call Now</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-5">
                  <Mail className="h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-display font-semibold">Email</h3>
                    <a href={`mailto:${companyInfo.email}`} className="text-sm text-muted-foreground hover:text-primary">{companyInfo.email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-5">
                  <MapPin className="h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-display font-semibold">Address</h3>
                    <p className="text-sm text-muted-foreground">{companyInfo.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-5">
                  <Clock className="h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-display font-semibold">Availability</h3>
                    <p className="text-sm text-muted-foreground">{companyInfo.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
