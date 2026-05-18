import { permanentRedirect } from "next/navigation";
import { parseCanonicalSlug } from "@/lib/canonicalSlug";

/** Resolve slug for metadata (no redirect). */
export function resolveInfoSlugForMetadata(
  rawSlug: string,
  slugExists: (canonical: string) => boolean
): string {
  const { canonical, hasNumericSuffix } = parseCanonicalSlug(rawSlug);
  if (hasNumericSuffix && slugExists(canonical)) return canonical;
  return rawSlug;
}

/** 301 legacy hub topic slugs with numeric suffixes (e.g. aberdeen-2 → aberdeen). */
export function resolveCanonicalInfoSlug(
  basePath: string,
  rawSlug: string,
  slugExists: (canonical: string) => boolean
): string {
  const { canonical, hasNumericSuffix } = parseCanonicalSlug(rawSlug);
  if (hasNumericSuffix && slugExists(canonical)) {
    permanentRedirect(`${basePath}/${canonical}`);
  }
  return canonical;
}
