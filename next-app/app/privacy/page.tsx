import type { Metadata } from "next";
import { companyInfo } from "@/lib/data";

const baseUrl = "https://mainlinedrains.co.uk";
const siteName = companyInfo.name;

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteName}`,
  description: `How ${siteName} collects, uses and protects your data. Form data, cookies and contact details.`,
  alternates: { canonical: `${baseUrl}/privacy` },
};

export default function PrivacyPage() {
  const email = companyInfo.email;

  return (
    <article className="section-padding">
      <div className="container max-w-3xl">
        <h1 className="mb-8 font-display text-3xl font-bold md:text-4xl">Privacy Policy</h1>
        <p className="mb-6 text-muted-foreground">Last updated: March 2025.</p>

        <section className="mb-8">
          <h2 className="mb-4 font-display text-xl font-semibold">Data we collect from forms</h2>
          <p className="mb-4 text-muted-foreground">
            When you submit an enquiry or contact form on this site, we collect the information you provide, such as your name, phone number, email address, postcode and the details of your enquiry. This data is used solely to respond to your request and, where relevant, to arrange or deliver services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-display text-xl font-semibold">Validation tools on forms</h2>
          <p className="mb-4 text-muted-foreground">
            We use validation on our forms to ensure that required fields are completed and that contact details are in a valid format. This helps us receive accurate information and reduce errors. We may also use tools to prevent spam and automated abuse. No additional personal data is collected by these validation tools beyond what you enter.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-display text-xl font-semibold">Sharing of lead data</h2>
          <p className="mb-4 text-muted-foreground">
            Enquiry and lead data you submit may be shared with our engineers, contractors or trusted service partners so that we can fulfil your request, provide quotes or deliver the services you have asked about. We do not sell your data to third parties for marketing. We only share what is necessary to respond to your enquiry or perform the service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-display text-xl font-semibold">Cookies</h2>
          <p className="mb-4 text-muted-foreground">
            This site may use essential cookies to support basic functionality (for example, remembering your preferences or session state). We may also use analytics or similar tools to understand how the site is used and to improve it. You can control or disable non-essential cookies through your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-display text-xl font-semibold">Contact</h2>
          <p className="mb-4 text-muted-foreground">
            For questions about this privacy policy or your personal data, please contact us at{" "}
            <a href={`mailto:${email}`} className="text-primary hover:underline">
              {email}
            </a>
            . {siteName} is the data controller for the data collected through this website.
          </p>
        </section>
      </div>
    </article>
  );
}
