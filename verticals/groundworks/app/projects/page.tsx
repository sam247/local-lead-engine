import { projects } from "@/data/projects";
import { getProjectImage } from "@/lib/images";
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.id} className="group overflow-hidden rounded-lg bg-card shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={getProjectImage(project.imageIndex)} alt={project.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-primary">{project.service}</span>
                  <h3 className="mt-1 font-display font-semibold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.location}</p>
                  {project.description && <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{project.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
