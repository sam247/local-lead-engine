import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SelectedIssueProvider } from "@/components/context/SelectedIssueContext";
import { StickyCTA } from "@/components/ui/StickyCTA";
import { stickyCtaConfig } from "@/lib/stickyCtaConfig";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { companyInfo } from "@/lib/data";
import { verticalConfig } from "@/config";
import { ScrollToTop } from "engine";
import { mainlineGroupLinksForSite } from "engine/data/mainline-group";
import { Providers } from "./providers";

export const viewport = { width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  title: "Mainline Groundworks | Piling, Excavation & Foundation Contractors UK",
  description: "Commercial groundworks contractors providing piling, excavation, site clearance and foundation construction across the UK.",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyInfo.name,
    url: verticalConfig.baseUrl,
    sameAs: mainlineGroupLinksForSite(verticalConfig.baseUrl).map((item) => item.href),
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Providers>
          <ScrollToTop />
          <SelectedIssueProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <StickyCTA {...stickyCtaConfig} />
          </SelectedIssueProvider>
        </Providers>
      </body>
    </html>
  );
}
