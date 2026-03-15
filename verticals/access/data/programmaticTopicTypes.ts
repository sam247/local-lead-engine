/**
 * Shared type for programmatic "topic in location" pages.
 * Topic slug is combined with location id as {slug}-{locationId} (e.g. commercial-cctv-installation-richmond).
 */
export interface ProgrammaticTopic {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  explanation: string;
  commonProblems: string[];
  sectorUseCases: string[];
  relatedServiceSlugs: string[];
  ctaText: string;
}
