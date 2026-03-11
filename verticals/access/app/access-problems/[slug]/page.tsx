import { notFound } from "next/navigation";
import { accessProblems, getAccessProblemBySlug } from "@/data/problems";
import { services } from "@/lib/data";
import { ProblemPage } from "engine";
import { verticalConfig } from "@/config";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  return accessProblems.map((p) => ({ slug: p.slug }));
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const problem = getAccessProblemBySlug(params.slug);
  if (!problem) return { title: "Not Found" };
  return {
    title: `${problem.title} – Causes and Repair | ${verticalConfig.siteName}`,
    description: `${problem.causes.slice(0, 155)}...`,
    alternates: { canonical: `${verticalConfig.baseUrl}/access-problems/${problem.slug}` },
  };
}

export default function AccessProblemSlugPage({ params }: Props) {
  const problem = getAccessProblemBySlug(params.slug);
  if (!problem) notFound();

  return (
    <ProblemPage
      problem={problem}
      services={services}
      companyInfo={verticalConfig.companyInfo}
      baseUrl={verticalConfig.baseUrl}
      contactPath="/contact"
      basePath="/services"
      problemsBasePath="/access-problems"
      problemsBreadcrumbLabel={verticalConfig.problemLabel ?? "Problems"}
    />
  );
}
