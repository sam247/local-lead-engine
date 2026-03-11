import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyEmergencyBar from "@/components/sections/StickyEmergencyBar";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Providers } from "./providers";

export const viewport = { width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  title: "Mainline Surveys | Land & Drone Surveying Across the UK",
  description: "Professional topographical, measured building, utility and drone surveys for architects, developers and property owners. Request a survey quote.",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <GoogleAnalytics />
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
