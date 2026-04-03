/** Matches a trailing duplicate slug segment such as "-2" or "-12" (not hyphens inside words). */
const NUMERIC_SUFFIX_PATTERN = /-(\d+)$/;

export function hasNumericDuplicateSuffix(slug: string): boolean {
  return NUMERIC_SUFFIX_PATTERN.test(slug);
}

/** Strips one or more trailing "-N" segments (e.g. "foo-2-3" → "foo"). */
export function stripNumericDuplicateSuffix(slug: string): string {
  return slug.replace(/(-\d+)+$/, "");
}
