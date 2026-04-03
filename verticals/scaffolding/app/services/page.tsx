import Link from "next/link";
import { services } from "@/lib/data";
import { verticalConfig } from "@/config";
import { getServiceUrl } from "engine";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: `Scaffolding Services | ${verticalConfig.siteName}`,
  description: "Browse our full range of scaffolding services — domestic, commercial, roof, chimney, temporary roofing and emergency scaffolding across the UK.",
  alternates: { canonical: `${verticalConfig.baseUrl}/services` },
};

export default function ServicesIndexPage() {
  return (
    <div className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 font-display text-4xl font-bold">Our Scaffolding Services</h1>
          <p className="mb-10 text-lg text-muted-foreground">
            NASC-accredited scaffolding for domestic, commercial and specialist projects across the UK. Select a service for more information.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service.id}>
                <Link
                  href={getServiceUrl(service.slug)}
                  className="block rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md"
                >
                  <h2 className="mb-1 font-display text-lg font-semibold">{service.title}</h2>
                  <p className="text-sm text-muted-foreground">{service.shortDescription}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
