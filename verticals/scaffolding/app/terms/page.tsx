import { verticalConfig } from "@/config";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: `Terms & Conditions | ${verticalConfig.siteName}`,
  description: "Terms and conditions for Mainline Scaffold.",
};

export default function TermsPage() {
  return (
    <div className="section-padding">
      <div className="container max-w-3xl">
        <h1 className="mb-6 font-display text-3xl font-bold">Terms and Conditions</h1>
        <p className="text-muted-foreground">
          These terms and conditions govern the use of this website and the provision of scaffolding services by Mainline Scaffold. By using this website or engaging our services, you agree to these terms. For full terms, contact us at{" "}
          <a href={`mailto:${verticalConfig.companyInfo.email}`} className="text-primary hover:underline">
            {verticalConfig.companyInfo.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
