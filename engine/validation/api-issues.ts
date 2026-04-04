import type { ZodIssue } from "zod";

export type ApiValidationIssue = { path: (string | number)[]; message: string };

/** Maps API 400 `issues` (Zod-style) to a single message per top-level field; later issues overwrite earlier for the same key. */
export function issuesToFieldErrorMap(issues: ApiValidationIssue[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (key === undefined) continue;
    out[String(key)] = issue.message;
  }
  return out;
}

export function zodIssuesToFieldErrorMap(issues: ZodIssue[]): Record<string, string> {
  return issuesToFieldErrorMap(
    issues.map((i) => ({ path: i.path as (string | number)[], message: i.message }))
  );
}

/** Maps snake_case lead API field keys to homepage Hero form state keys. */
const LEAD_API_FIELD_TO_HERO_UI: Record<string, string> = {
  first_name: "firstName",
  last_name: "lastName",
  description: "details",
  project_stage: "projectStage",
};

export function mapLeadApiErrorsToHeroUi(fieldErrors: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, msg] of Object.entries(fieldErrors)) {
    out[LEAD_API_FIELD_TO_HERO_UI[k] ?? k] = msg;
  }
  return out;
}
