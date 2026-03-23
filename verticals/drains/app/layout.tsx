import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyEmergencyBar from "@/components/sections/StickyEmergencyBar";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { companyInfo } from "@/lib/data";
import { verticalConfig } from "@/config";
import { mainlineGroupLinksForSite } from "engine/data/mainline-group";
import { Providers } from "./providers";

export const viewport = { width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  title: "Mainline Drains | Expert Drain Repair & Drainage Solutions",
  description: "24/7 emergency drainage, drain collapse repair, CCTV surveys and relining across the UK. Trusted local drainage experts.",
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
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyEmergencyBar />
        </Providers>
      </body>
    </html>
  );
}
