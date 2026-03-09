import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyEmergencyBar from "@/components/sections/StickyEmergencyBar";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Mainline Drains | Expert Drain Repair & Drainage Solutions",
  description: "24/7 emergency drainage, drain collapse repair, CCTV surveys and relining across London. Trusted local drainage experts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
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
