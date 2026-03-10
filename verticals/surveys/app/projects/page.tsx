import { projectImages } from "@/lib/images";
import CTABanner from "@/components/sections/CTABanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const projects = [
  { id: 1, title: "Topographical Site Survey for Planning", location: "Chelsea", category: "Topographical Survey", image: projectImages[0] },
  { id: 2, title: "Measured Building Survey, Period Property", location: "Richmond", category: "Measured Building Survey", image: projectImages[1] },
  { id: 3, title: "Drone Survey for Development Site", location: "Surrey", category: "Drone Survey", image: projectImages[2] },
  { id: 4, title: "Utility Mapping Before Groundworks", location: "Wimbledon", category: "Utility Survey", image: projectImages[3] },
  { id: 5, title: "Extension Design – Existing Building Survey", location: "Ealing", category: "Measured Building Survey", image: projectImages[4] },
  { id: 6, title: "Drone Roof Inspection", location: "Kensington", category: "Drone Survey", image: projectImages[5] },
  { id: 7, title: "Multi-Plot Topographical Survey", location: "Hammersmith", category: "Topographical Survey", image: projectImages[1] },
  { id: 8, title: "Construction Progress Drone Survey", location: "Fulham", category: "Drone Survey", image: projectImages[0] },
];

export const metadata: Metadata = {
  title: "Our Projects | Mainline Surveys",
  description: "Portfolio of land and drone surveying projects across London and the South East — topographical, measured building, utility and drone surveys.",
  alternates: { canonical: "https://mainlinesurveys.co.uk/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: "Projects", url: "/projects" }] }} />
      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">Our Projects</h1>
            <p className="text-lg text-primary-foreground/80">A showcase of land and drone surveying projects across London and the South East.</p>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.id} className="group overflow-hidden rounded-lg bg-card shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-primary">{project.category}</span>
                  <h3 className="mt-1 font-display font-semibold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.location}</p>
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
