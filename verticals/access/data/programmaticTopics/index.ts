/**
 * Programmatic topic datasets for Mainline Access "topic in location" pages.
 *
 * Summary:
 * - Dataset 1 (CCTV installation): 10 topics → cctvInstallationTopics
 * - Dataset 2 (Access control): 10 topics → accessControlTopics
 * - Dataset 3 (Construction site security): 8 topics → constructionSiteSecurityTopics
 * - Dataset 4 (Sector-specific security): 9 topics → sectorSecurityTopics
 * - Dataset 5 (Data cabling): 8 topics → dataCablingTopics
 * - Total: 45 topics.
 *
 * Estimated page count: 45 × locations.length (from lib/data). With 100 locations, ~4,500 pages.
 * URL pattern: /{topicSlug}-{locationId} (e.g. /commercial-cctv-installation-richmond).
 *
 * Phase 2 / architecture note: Topic×location route generation is DEFERRED (e.g. to Phase 4).
 * Implement only after Access has topic hubs in place so internal linking and hierarchy are consistent.
 * No route or page template currently consumes these datasets.
 */

export type { ProgrammaticTopic } from "../programmaticTopicTypes";
export { cctvInstallationTopics } from "../cctvInstallationTopics";
export { accessControlTopics } from "../accessControlTopics";
export { constructionSiteSecurityTopics } from "../constructionSiteSecurityTopics";
export { sectorSecurityTopics } from "../sectorSecurityTopics";
export { dataCablingTopics } from "../dataCablingTopics";

import { cctvInstallationTopics } from "../cctvInstallationTopics";
import { accessControlTopics } from "../accessControlTopics";
import { constructionSiteSecurityTopics } from "../constructionSiteSecurityTopics";
import { sectorSecurityTopics } from "../sectorSecurityTopics";
import { dataCablingTopics } from "../dataCablingTopics";
import type { ProgrammaticTopic } from "../programmaticTopicTypes";

const allTopics: ProgrammaticTopic[] = [
  ...cctvInstallationTopics,
  ...accessControlTopics,
  ...constructionSiteSecurityTopics,
  ...sectorSecurityTopics,
  ...dataCablingTopics,
];

export function getProgrammaticTopicBySlug(slug: string): ProgrammaticTopic | undefined {
  return allTopics.find((t) => t.slug === slug);
}

export function getAllProgrammaticTopics(): ProgrammaticTopic[] {
  return allTopics;
}
