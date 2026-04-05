import Link from "next/link";
import type { Metadata } from "next";
import { ProjectCardWithLinks, getServiceUrl } from "engine";
import { projects } from "@/data/projects";
import { services } from "@/lib/data";
import { getProjectImage } from "@/lib/images";
import CTABanner from "@/components/sections/CTABanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "Our Projects | Mainline Scaffold",
  description: "View recent domestic, commercial, emergency, and temporary roofing scaffolding projects from Mainline Scaffold.",
  alternates: { canonical: "https://mainlinescaffold.co.uk/projects" },
};

export default function ProjectsPage() {
  const featuredServices = services.slice(0, 6);

  return (
    <>
      <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: "Projects", url: "/projects" }] }} />
      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">Our Projects</h1>
            <p className="text-lg text-primary-foreground/80">A showcase of domestic, commercial, and emergency scaffolding work.</p>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          {featuredServices.length > 0 ? (
            <div className="mb-8 rounded-lg border border-border bg-secondary/30 p-6">
              <h2 className="mb-4 font-display text-xl font-bold">Related services</h2>
              <div className="flex flex-wrap gap-3">
                {featuredServices.map((service) => (
                  <Link key={service.id} href={getServiceUrl(service.slug)} className="text-sm font-medium text-primary hover:underline">
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCardWithLinks
                key={project.id}
                project={{
                  id: project.id,
                  slug: project.slug,
                  title: project.title,
                  description: project.description,
                  location: project.location,
                  locationId: project.locationId,
                  service: project.service,
                  serviceSlug: project.serviceSlug,
                }}
                imageSrc={getProjectImage(project, index)}
                imageAlt={project.title}
                services={services}
                locationLinkPath={(slug, locationId) => `/${slug}/${locationId}`}
                servicesPath="/services"
                projectHref={`/projects/${project.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
