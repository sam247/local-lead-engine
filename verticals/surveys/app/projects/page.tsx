import { projectImages } from "@/lib/images";
import CTABanner from "@/components/sections/CTABanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const projects = [
  { id: 1, title: "Residential Drain Collapse Repair", location: "Chelsea", category: "Drain Collapse Repair", image: projectImages[0] },
  { id: 2, title: "Commercial CCTV Drainage Survey", location: "Canary Wharf", category: "CCTV Drain Surveys", image: projectImages[1] },
  { id: 3, title: "Victorian Property Drain Relining", location: "Richmond", category: "Drain Relining", image: projectImages[2] },
  { id: 4, title: "Emergency Sewer Repair", location: "Wimbledon", category: "Emergency Drainage", image: projectImages[3] },
  { id: 5, title: "Blocked Drain Clearance", location: "Ealing", category: "Blocked Drains", image: projectImages[4] },
  { id: 6, title: "Full Drain Excavation & Replacement", location: "Kensington", category: "Drain Excavation", image: projectImages[5] },
  { id: 7, title: "Multi-Property Drain Survey", location: "Hammersmith", category: "CCTV Drain Surveys", image: projectImages[1] },
  { id: 8, title: "Emergency Flooding Response", location: "Fulham", category: "Emergency Drainage", image: projectImages[0] },
];

export const metadata: Metadata = {
  title: "Our Projects | Mainline Surveys",
  description: "View our portfolio of completed drainage projects across London — drain repairs, CCTV surveys, relining and more.",
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
            <p className="text-lg text-primary-foreground/80">A showcase of our completed drainage work across London.</p>
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
