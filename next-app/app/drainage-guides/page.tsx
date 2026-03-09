import GuidesIndexContent from "@/components/pages/GuidesIndexContent";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "Drainage Guides & Resources | Mainline Drains",
  description: "Complete drainage resource library. Guides on drain problems, collapse repair, surveys, costs, insurance and repair methods from London's trusted drainage experts.",
  alternates: { canonical: "https://mainlinedrains.co.uk/drainage-guides" },
};

export default function DrainageGuidesIndexPage() {
  return <GuidesIndexContent />;
}
