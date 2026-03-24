import Link from "next/link";
import { services, locations } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, AlertTriangle, Layers, Camera, Shovel, Siren, Ban, Droplets, TreeDeciduous, Wrench, Replace, Building2 } from "lucide-react";
import CTABanner from "@/components/sections/CTABanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { getServiceUrl } from "engine";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  AlertTriangle, Layers, Camera, Shovel, Siren, Ban, Droplets, TreeDeciduous, Wrench, Replace, Building2,
};

export const metadata: Metadata = {
  title: "Our Services | Mainline Access",
  description: "Commercial security services including access control, CCTV, IP camera systems, perimeter security and system integration across the UK.",
  alternates: { canonical: "https://mainlineaccess.co.uk/services" },
};

export default function ServicesPage() {
  return (
    <>
      <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: "Services", url: "/services" }] }} />
      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">Our Services</h1>
            <p className="text-lg text-primary-foreground/80">Expert drainage solutions for every situation.</p>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || AlertTriangle;
              return (
                <Card key={service.id} className="group border-border transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-display text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.shortDescription}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground">{service.description.slice(0, 150)}...</p>
                    <Link href={getServiceUrl(service.slug)} className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                    <div className="mt-4 border-t pt-4">
                      <p className="mb-2 text-xs font-medium text-muted-foreground">Available in:</p>
                      <div className="flex flex-wrap gap-1">
                        {locations.slice(0, 5).map((loc) => (
                          <Link key={loc.id} href={`/${service.slug}/${loc.id}`} className="text-xs text-primary hover:underline">
                            {loc.name}
                          </Link>
                        ))}
                        <span className="text-xs text-muted-foreground">+{locations.length - 5} more</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
