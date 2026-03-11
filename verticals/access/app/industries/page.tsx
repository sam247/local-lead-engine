import Link from "next/link";
import { industries } from "@/data/industries";
import { verticalConfig } from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Industries we serve | ${verticalConfig.siteName}`,
  description: "Access control and security systems for hospitals, data centres, warehouses and commercial buildings. Find out how we support your sector.",
  alternates: { canonical: `${verticalConfig.baseUrl}/industries` },
};

export const dynamic = "force-static";
export const revalidate = false;

export default function IndustriesPage() {
  return (
    <section className="section-padding">
      <div className="container max-w-3xl">
        <h1 className="mb-6 font-display text-3xl font-bold md:text-4xl">
          Industries we serve
        </h1>
        <p className="mb-8 text-muted-foreground">
          We design and install access control, CCTV and integrated security systems for a range of commercial and public-sector environments.
        </p>
        <ul className="space-y-4">
          {industries.map((industry) => (
            <li key={industry.slug}>
              <Link
                href={`/industries/${industry.slug}`}
                className="text-lg font-medium text-primary hover:underline"
              >
                {industry.title}
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">{industry.intro}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
