import { notFound } from "next/navigation";
import { getHubData, getCategoryPages, services, locations } from "@/lib/data";
import { drainProblemPages, getDrainProblemPageBySlug } from "@/data/problemPages";
import { InfoPage, ProblemPage } from "engine";
import { buildInfoMetadata, buildProblemMetadata } from "engine";
import { verticalConfig } from "@/config";
import { getInfoPageProps } from "@/lib/infoPageProps";
import type { Metadata } from "next";

const SERVICES_NEAR_YOU_INTRO =
  "Our engineers provide CCTV drain surveys, drain repairs and drain unblocking across the area. Find a local service below.";

export const dynamic = "force-static";
export const revalidate = false;

const category = "problems";

export async function generateStaticParams() {
  const hubSlugs = getCategoryPages(category).map((page) => ({ slug: page.slug }));
  const programmaticSlugs = drainProblemPages.map((p) => ({ slug: p.slug }));
  return [...programmaticSlugs, ...hubSlugs];
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const problem = getDrainProblemPageBySlug(params.slug);
  if (problem) {
    const base = verticalConfig.baseUrl.replace(/\/$/, "");
    return buildProblemMetadata(problem, verticalConfig, `${base}/drain-problems/${problem.slug}`);
  }
  const hub = getHubData(category);
  const page = getCategoryPages(category).find((p) => p.slug === params.slug);
  if (!hub || !page) return { title: "Not Found" };
  return buildInfoMetadata(hub, page, verticalConfig);
}

export default function DrainProblemsSlugPage({ params }: Props) {
  const problem = getDrainProblemPageBySlug(params.slug);
  if (problem) {
    return (
      <ProblemPage
        problem={problem}
        services={services}
        companyInfo={verticalConfig.companyInfo}
        baseUrl={verticalConfig.baseUrl}
        contactPath="/contact"
        basePath="/services"
        problemsBasePath="/drain-problems"
        problemsBreadcrumbLabel={verticalConfig.problemLabel ?? "Problems"}
        allProblems={drainProblemPages}
        relatedProblemsTitle="Related drain issues"
        diagnosisSectionTitle="Drain problem diagnosis"
        causesSectionTitle="What causes this drain problem"
        whenToCallSectionTitle="When to call a drainage engineer"
        featuredLocations={locations.slice(0, 1).map((loc) => ({ id: loc.id, name: loc.name }))}
        primaryServiceSlug={problem.primaryServiceSlug}
        primaryServiceLabel={problem.primaryServiceLabel}
        locationLinkPath={(slug, id) => `/${slug}/${id}`}
        ctaVariants={verticalConfig.ctaVariants}
        servicesNearYouTitle="Drain repair services near you"
        servicesNearYouIntro={SERVICES_NEAR_YOU_INTRO}
      />
    );
  }
  const props = getInfoPageProps(category, params.slug);
  if (!props) notFound();
  return <InfoPage {...props} />;
}
