import { verticalConfig } from "@/config";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: `Privacy Policy | ${verticalConfig.siteName}`,
  description: "Privacy policy for Mainline Scaffold.",
};

export default function PrivacyPage() {
  return (
    <div className="section-padding">
      <div className="container max-w-3xl">
        <h1 className="mb-6 font-display text-3xl font-bold">Privacy Policy</h1>
        <p className="text-muted-foreground">
          This privacy policy explains how Mainline Scaffold collects and uses personal data. We collect contact information you provide when requesting a quote or contacting us. This data is used solely to respond to your enquiry and is not shared with third parties for marketing purposes. For full details, contact us at{" "}
          <a href={`mailto:${verticalConfig.companyInfo.email}`} className="text-primary hover:underline">
            {verticalConfig.companyInfo.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
