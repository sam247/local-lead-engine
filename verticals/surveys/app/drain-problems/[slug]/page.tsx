import { notFound, permanentRedirect } from "next/navigation";
import { getHubData, getCategoryPages, services, locations } from "@/lib/data";
import { InfoPage, ProblemPage } from "engine";
import { buildInfoMetadata, buildProblemMetadata } from "engine";
import { verticalConfig } from "@/config";
import { getInfoPageProps } from "@/lib/infoPageProps";
import { surveyProblemPages, getSurveyProblemPageBySlug } from "@/data/problemPages";
import { hasNumericDuplicateSuffix, stripNumericDuplicateSuffix } from "@/lib/numericSlugSuffix";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const category = "problems";
const guidesCategory = "guides";

export async function generateStaticParams() {
  const hubSlugs = getCategoryPages(category).map((page) => ({ slug: page.slug }));
  const problemSlugs = surveyProblemPages.map((page) => ({ slug: page.slug }));
  return [...problemSlugs, ...hubSlugs];
}

type Props = { params: { slug: string } };

function slugResolvesInDrainProblemsHub(canonicalSlug: string): boolean {
  if (getSurveyProblemPageBySlug(canonicalSlug)) return true;
  return getCategoryPages(category).some((p) => p.slug === canonicalSlug);
}

function slugResolvesInSurveyGuidesHub(canonicalSlug: string): boolean {
  return getCategoryPages(guidesCategory).some((p) => p.slug === canonicalSlug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const rawSlug = params.slug;
  const stripped = stripNumericDuplicateSuffix(rawSlug);
  const suffixDuplicate = hasNumericDuplicateSuffix(rawSlug);
  const canonicalIfDuplicate =
    suffixDuplicate &&
    (slugResolvesInDrainProblemsHub(stripped) || slugResolvesInSurveyGuidesHub(stripped))
      ? stripped
      : null;

  const problem = getSurveyProblemPageBySlug(canonicalIfDuplicate ?? rawSlug);
  if (problem) {
    const base = verticalConfig.baseUrl.replace(/\/$/, "");
    return buildProblemMetadata(problem, verticalConfig, `${base}/drain-problems/${problem.slug}`);
  }

  const hubPageDrain = getCategoryPages(category).find((p) => p.slug === (canonicalIfDuplicate ?? rawSlug));
  if (hubPageDrain) {
    const hub = getHubData(category);
    if (!hub) return { title: "Not Found" };
    return buildInfoMetadata(hub, hubPageDrain, verticalConfig);
  }

  if (suffixDuplicate && slugResolvesInSurveyGuidesHub(stripped) && !slugResolvesInDrainProblemsHub(stripped)) {
    const guidePage = getCategoryPages(guidesCategory).find((p) => p.slug === stripped);
    if (guidePage) {
      const guidesHub = getHubData(guidesCategory);
      if (!guidesHub) return { title: "Not Found" };
      return buildInfoMetadata(guidesHub, guidePage, verticalConfig);
    }
  }

  if (!suffixDuplicate) {
    const hub = getHubData(category);
    const page = getCategoryPages(category).find((p) => p.slug === rawSlug);
    if (!hub || !page) return { title: "Not Found" };
    return buildInfoMetadata(hub, page, verticalConfig);
  }

  return { title: "Not Found" };
}

export default async function DrainProblemsInfoPage({ params }: Props) {
  const rawSlug = params.slug;
  if (hasNumericDuplicateSuffix(rawSlug)) {
    const canonicalSlug = stripNumericDuplicateSuffix(rawSlug);
    if (slugResolvesInDrainProblemsHub(canonicalSlug)) {
      permanentRedirect(`/drain-problems/${canonicalSlug}`);
    }
    if (slugResolvesInSurveyGuidesHub(canonicalSlug)) {
      permanentRedirect(`/survey-guides/${canonicalSlug}`);
    }
  }

  const problem = getSurveyProblemPageBySlug(rawSlug);
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
        allProblems={surveyProblemPages}
        relatedProblemsTitle="Related survey issues"
        diagnosisSectionTitle="Survey problem diagnosis"
        causesSectionTitle="What causes this site issue"
        whenToCallSectionTitle="When to call a survey specialist"
        featuredLocations={locations.slice(0, 1).map((loc) => ({ id: loc.id, name: loc.name }))}
        primaryServiceSlug={problem.primaryServiceSlug}
        primaryServiceLabel={problem.primaryServiceLabel}
        locationLinkPath={(slug, id) => `/${slug}/${id}`}
        servicesNearYouTitle="Survey services near you"
        servicesNearYouIntro="Our teams deliver survey services across the area. Compare the main service route below."
      />
    );
  }
  const props = getInfoPageProps(category, rawSlug);
  if (!props) notFound();
  return <InfoPage {...props} />;
}
