/** Strip legacy numeric suffixes from slugs (e.g. aberdeen-2 → aberdeen, homeowners-2 → homeowners). */
export function parseCanonicalSlug(raw: string): { canonical: string; hasNumericSuffix: boolean } {
  const hasNumericSuffix = /-\d+$/.test(raw);
  const canonical = hasNumericSuffix ? raw.replace(/(-\d+)+$/, "") : raw;
  return { canonical, hasNumericSuffix };
}
