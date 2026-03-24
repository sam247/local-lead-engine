import { notFound } from "next/navigation";
import { services, locations } from "@/lib/data";
import { groundworksProblemPages, getGroundworksProblemPageBySlug } from "@/data/problemPages";
import { ProblemPage } from "engine";
import { verticalConfig } from "@/config";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  return groundworksProblemPages.map((p) => ({ slug: p.slug }));
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const problem = getGroundworksProblemPageBySlug(params.slug);
  if (!problem) return { title: "Not Found" };
  return {
    title: `${problem.title} – Causes and Fix | ${verticalConfig.siteName}`,
    description: `${problem.causes.slice(0, 155)}...`,
    alternates: { canonical: `${verticalConfig.baseUrl}/foundation-problems/${problem.slug}` },
  };
}

export default function FoundationProblemSlugPage({ params }: Props) {
  const problem = getGroundworksProblemPageBySlug(params.slug);
  if (!problem) notFound();

  return (
    <ProblemPage
      problem={problem}
      services={services}
      companyInfo={verticalConfig.companyInfo}
      baseUrl={verticalConfig.baseUrl}
      contactPath="/contact"
      basePath="/services"
      problemsBasePath="/foundation-problems"
      problemsBreadcrumbLabel="Foundation Problems"
      allProblems={groundworksProblemPages}
      relatedProblemsTitle="Related ground and foundation issues"
      diagnosisSectionTitle="Ground and foundation diagnosis"
      causesSectionTitle="What causes this issue"
      whenToCallSectionTitle="When to call a groundworks specialist"
      featuredLocations={locations.slice(0, 1).map((loc) => ({ id: loc.id, name: loc.name }))}
      primaryServiceSlug={problem.primaryServiceSlug}
      primaryServiceLabel={problem.primaryServiceLabel}
      locationLinkPath={(slug, id) => `/${slug}/${id}`}
      servicesNearYouTitle="Groundworks services near you"
      servicesNearYouIntro="Our teams deliver foundation, piling, and excavation services across the area. See a local service route below."
    />
  );
}
