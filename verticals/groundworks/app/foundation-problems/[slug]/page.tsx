import { notFound } from "next/navigation";
import { services } from "@/lib/data";
import { foundationProblems, getFoundationProblemBySlug } from "@/data/foundationProblems";
import { ProblemPage } from "engine";
import { verticalConfig } from "@/config";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  return foundationProblems.map((p) => ({ slug: p.slug }));
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const problem = getFoundationProblemBySlug(params.slug);
  if (!problem) return { title: "Not Found" };
  return {
    title: `${problem.title} – Causes and Fix | ${verticalConfig.siteName}`,
    description: `${problem.causes.slice(0, 155)}...`,
    alternates: { canonical: `${verticalConfig.baseUrl}/foundation-problems/${problem.slug}` },
  };
}

export default function FoundationProblemSlugPage({ params }: Props) {
  const problem = getFoundationProblemBySlug(params.slug);
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
    />
  );
}
