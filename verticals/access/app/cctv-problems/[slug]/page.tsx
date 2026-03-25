import { notFound } from "next/navigation";
import { services, locations } from "@/lib/data";
import { cctvProblemPages } from "@/data/problemPages";
import { ProblemPage, buildProblemMetadata } from "engine";
import { verticalConfig } from "@/config";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const SERVICES_NEAR_YOU_INTRO =
  "We provide commercial CCTV installation, IP camera systems and security integration across the area. Find a local service below.";

export async function generateStaticParams() {
  return cctvProblemPages.map((p) => ({ slug: p.slug }));
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const problem = cctvProblemPages.find((p) => p.slug === params.slug);
  if (!problem) return { title: "Not Found" };
  const base = verticalConfig.baseUrl.replace(/\/$/, "");
  return buildProblemMetadata(problem, verticalConfig, `${base}/cctv-problems/${problem.slug}`);
}

export default function CctvProblemSlugPage({ params }: Props) {
  const problem = cctvProblemPages.find((p) => p.slug === params.slug);
  if (!problem) notFound();

  return (
    <ProblemPage
      problem={problem}
      services={services}
      companyInfo={verticalConfig.companyInfo}
      baseUrl={verticalConfig.baseUrl}
      contactPath="/contact"
      basePath="/services"
      problemsBasePath="/cctv-problems"
      problemsBreadcrumbLabel="CCTV Problems"
      allProblems={cctvProblemPages}
      relatedProblemsTitle="Related CCTV issues"
      diagnosisSectionTitle="CCTV problem diagnosis"
      causesSectionTitle="What causes this CCTV problem"
      whenToCallSectionTitle="When to call a security professional"
      featuredLocations={locations.slice(0, 1).map((loc) => ({ id: loc.id, name: loc.name }))}
      primaryServiceSlug={problem.primaryServiceSlug}
      primaryServiceLabel={problem.primaryServiceLabel}
      locationLinkPath={(slug, id) => `/${slug}/${id}`}
      servicesNearYouTitle="CCTV services near you"
      servicesNearYouIntro={SERVICES_NEAR_YOU_INTRO}
    />
  );
}
