import type { Metadata } from "next";
import { companyInfo } from "@/lib/data";

const baseUrl = "https://mainlinedrains.co.uk";
const siteName = companyInfo.name;

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: `Terms of Use | ${siteName}`,
  description: `Terms of use for ${siteName}. Service disclaimers, enquiry model and acceptable use.`,
  alternates: { canonical: `${baseUrl}/terms` },
};

export default function TermsPage() {
  return (
    <article className="section-padding">
      <div className="container max-w-3xl">
        <h1 className="mb-8 font-display text-3xl font-bold md:text-4xl">Terms of Use</h1>
        <p className="mb-6 text-muted-foreground">Last updated: March 2025.</p>

        <section className="mb-8">
          <h2 className="mb-4 font-display text-xl font-semibold">Service disclaimer</h2>
          <p className="mb-4 text-muted-foreground">
            The information on this website is for general guidance only. It does not constitute professional advice or a substitute for an on-site assessment. Actual services, pricing and recommendations depend on your specific situation. {siteName} provides services subject to separate agreements and site-specific terms agreed at the time of engagement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-display text-xl font-semibold">Information accuracy</h2>
          <p className="mb-4 text-muted-foreground">
            We aim to keep the content on this site accurate and up to date. We do not guarantee that all information is complete, current or error-free. Technical and regulatory details may change. You should not rely solely on this website for decisions; we recommend confirming important details with us directly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-display text-xl font-semibold">Lead enquiry model</h2>
          <p className="mb-4 text-muted-foreground">
            Submitting an enquiry or contact form does not create a contract or oblige you to use our services. It allows us to contact you to discuss your needs and, if appropriate, provide a quote or arrange a visit. Enquiries may be shared with trusted service partners who help us fulfil requests (for example, engineers or contractors in your area). By submitting an enquiry, you agree to this use of your contact details.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-display text-xl font-semibold">Limitation of liability</h2>
          <p className="mb-4 text-muted-foreground">
            To the fullest extent permitted by law, {siteName} is not liable for any indirect, incidental or consequential loss arising from your use of this website or reliance on its content. Our liability in connection with services provided is governed by the terms agreed for those services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 font-display text-xl font-semibold">Acceptable use</h2>
          <p className="mb-4 text-muted-foreground">
            You must not use this site to submit false information, impersonate others, or use the site for any unlawful or abusive purpose. You are responsible for ensuring that the details you provide in forms are accurate and that you are entitled to provide them. We may refuse or suspend access where we believe these terms have been breached.
          </p>
        </section>
      </div>
    </article>
  );
}
