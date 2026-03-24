import Link from "next/link";
import { projects } from "@/data/projects";
import { services } from "@/lib/data";
import { getProjectImage } from "@/lib/images";
import { ProjectCardWithLinks, getServiceUrl } from "engine";
import CTABanner from "@/components/sections/CTABanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "Our Projects | Mainline Groundworks",
  description: "A showcase of our completed groundworks projects — piling, excavation, foundations and site preparation across the UK.",
  alternates: { canonical: "https://mainlinegroundworks.co.uk/projects" },
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
            <p className="text-lg text-primary-foreground/80">A showcase of our completed groundworks projects across the UK.</p>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          {featuredServices.length > 0 && (
            <div className="mb-8 rounded-lg border border-border bg-secondary/30 p-6">
              <h2 className="mb-4 font-display text-xl font-bold">Related services</h2>
              <div className="flex flex-wrap gap-3">
                {featuredServices.map((s) => (
                  <Link
                    key={s.id}
                    href={getServiceUrl(s.slug)}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCardWithLinks
                key={project.id}
                project={{
                  id: project.id,
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
                locationLinkPath={(slug, locId) => `/${slug}/${locId}`}
                servicesPath="/services"
              />
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
