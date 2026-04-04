import { notFound } from "next/navigation";
import { getHubData, getCategoryPages } from "@/lib/data";
import { InfoPage } from "engine";
import { buildInfoMetadata } from "engine";
import { verticalConfig } from "@/config";
import { getInfoPageProps } from "@/lib/infoPageProps";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const category = "commercial";

export async function generateStaticParams() {
  return getCategoryPages(category).map((page) => ({ slug: page.slug }));
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hub = getHubData(category);
  const page = getCategoryPages(category).find((p) => p.slug === params.slug);
  if (!hub || !page) return { title: "Not Found" };
  return buildInfoMetadata(hub, page, verticalConfig);
}

export default function InfoPageRoute({ params }: Props) {
  const props = getInfoPageProps(category, params.slug);
  if (!props) notFound();
  return <InfoPage {...props} />;
}
