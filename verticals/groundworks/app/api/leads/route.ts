import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { google } from "googleapis";
import { leadEmailField, leadPhoneField, leadPostcodeField } from "engine";
import { deriveSourceQueryTheme, getCommercialOpportunityScore } from "@/lib/commercialOpportunity";
import { serviceCommercialMetadataBySlug } from "@/lib/data";

const SERVICE_OPTIONS = [
  "Groundworks Contractors",
  "Piling Contractors",
  "Mini Piling Contractors",
  "Excavation Contractors",
  "Site Clearance Contractors",
  "Foundation Contractors",
  "Concrete Foundations",
  "Enabling Works Contractors",
  "Commercial Groundworks",
  "Earthworks Contractors",
  "Roads and Sewers Contractors",
  "Attenuation Systems Installation",
  "Advice",
] as const;
const EXPECTED_SHEET_HEADERS = [
  "timestamp",
  "lead_id",
  "vertical",
  "source_site",
  "service",
  "postcode",
  "town",
  "first_name",
  "last_name",
  "email",
  "phone",
  "description",
  "project_stage",
  "status",
  "utm_source",
  "page_path",
  "service_slug",
  "location_slug",
  "assigned_to",
  "date_sent_to_contractor",
  "response_received",
  "lead_quality",
  "estimated_value",
  "won",
  "quote_sent",
  "cta_text",
  "cta_seed",
  "source_page_path",
  "source_service_slug",
  "source_location_slug",
  "source_vertical",
  "source_query_theme",
  "lead_class",
  "lead_score",
  "classification_reason",
  "supplier_id",
  "supplier_name",
  "supplier_fit_tier",
  "supplier_fit_reason",
  "supplier_preferred_services",
  "supplier_preferred_lead_types",
  "supplier_preferred_project_sizes",
  "supplier_preferred_territories",
  "supplier_response_speed_rating",
  "supplier_performance_bucket",
  "supplier_win_rate_tracking",
  "assignment_method",
  "assignment_priority_score",
  "territory_cluster",
] as const;
const PROJECT_STAGE_OPTIONS = new Set(["planning", "ready", "exploring"]);
const ASSIGNED_TO = "Jamie";
const VERTICAL = "groundworks";

type LeadClass =
  | "residential"
  | "commercial"
  | "structural"
  | "foundations"
  | "piling"
  | "retaining_walls"
  | "basement_excavation"
  | "enabling_works"
  | "low_fit";

type SupplierProfile = {
  id: string;
  name: string;
  assignee: string;
  preferredServices: string[];
  preferredLeadTypes: LeadClass[];
  preferredProjectSizes: Array<"small" | "medium" | "large">;
  preferredTerritories: string[];
  preferredCounties: Array<"kent" | "surrey">;
  minimumPackageTier?: "premium" | "high" | "medium";
  responseSpeedRating: number;
  performanceBucket: "strong" | "stable" | "developing";
  winRateTracking: string;
};

const SUPPLIER_PROFILES: SupplierProfile[] = [
  {
    id: "supplier-kent-structural-01",
    name: "Kent Structural Groundworks Partner",
    assignee: "Kent Structural Desk",
    preferredServices: [
      "foundation-contractors",
      "mini-piling-contractors",
      "piling-contractors",
      "excavation-contractors",
      "enabling-works-contractors",
    ],
    preferredLeadTypes: ["commercial", "structural", "foundations", "piling", "basement_excavation", "enabling_works"],
    preferredProjectSizes: ["medium", "large"],
    preferredTerritories: ["ashford", "maidstone", "sevenoaks", "tunbridge-wells", "tonbridge", "dartford", "rochester", "gravesend", "canterbury", "dover", "folkestone", "sidcup", "chislehurst", "bickley", "mottingham", "new-eltham"],
    preferredCounties: ["kent"],
    minimumPackageTier: "high",
    responseSpeedRating: 5,
    performanceBucket: "strong",
    winRateTracking: "ready",
  },
  {
    id: "supplier-surrey-foundations-01",
    name: "Surrey Foundations Partner",
    assignee: "Surrey Foundations Desk",
    preferredServices: [
      "foundation-contractors",
      "foundation-repair",
      "underpinning",
      "mini-piling-contractors",
      "piling-contractors",
    ],
    preferredLeadTypes: ["commercial", "structural", "foundations", "piling"],
    preferredProjectSizes: ["small", "medium", "large"],
    preferredTerritories: ["guildford", "woking", "reigate", "dorking", "epsom", "weybridge", "esher", "leatherhead", "staines"],
    preferredCounties: ["surrey"],
    minimumPackageTier: "medium",
    responseSpeedRating: 4,
    performanceBucket: "stable",
    winRateTracking: "ready",
  },
  {
    id: "supplier-residential-drainage-01",
    name: "Residential Drainage Partner",
    assignee: "Residential Routing Desk",
    preferredServices: ["site-clearance-contractors", "muck-away-services", "groundworks-contractors", "advice"],
    preferredLeadTypes: ["residential", "low_fit"],
    preferredProjectSizes: ["small", "medium"],
    preferredTerritories: [],
    preferredCounties: [],
    responseSpeedRating: 3,
    performanceBucket: "developing",
    winRateTracking: "baseline",
  },
];

const LeadInputSchema = z.object({
  first_name: z.string().trim().min(1).max(50),
  last_name: z.string().trim().min(1).max(50),
  email: leadEmailField,
  phone: leadPhoneField,
  postcode: leadPostcodeField,
  town: z.string().trim().max(100).optional(),
  service: z.enum(SERVICE_OPTIONS),
  description: z.string().trim().min(1).max(2000),
  source_site: z.string().trim().max(255).optional(),
  utm_source: z.string().trim().max(100).optional(),
  page_path: z.string().trim().max(500).optional(),
  service_slug: z.string().trim().max(150).optional(),
  location_slug: z.string().trim().max(150).optional(),
  project_stage: z.string().trim().max(50).optional(),
  cta_text: z.string().trim().max(500).optional(),
  cta_seed: z.string().trim().max(200).optional(),
});

type LeadInput = z.infer<typeof LeadInputSchema>;
type LeadRecord = Record<string, string>;

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable: ${name}`);
  return v;
}

function normalizePrivateKey(maybeEscaped: string): string {
  return maybeEscaped.includes("\\n") ? maybeEscaped.replace(/\\n/g, "\n") : maybeEscaped;
}

function formatLeadId(n: number): string {
  return `GW-${String(n).padStart(3, "0")}`;
}

function parseLeadId(leadId: string): number | null {
  const m = /^GW-(\d{3,})$/.exec(leadId.trim());
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : null;
}

async function getSheetsClient() {
  const clientEmail = requireEnv("GOOGLE_SHEETS_CLIENT_EMAIL");
  const privateKey = normalizePrivateKey(requireEnv("GOOGLE_SHEETS_PRIVATE_KEY"));
  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

function trimToString(value: unknown): string {
  return String(value ?? "").trim();
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function toTitleCaseService(value: string): string {
  const normalized = normalizeWhitespace(value);
  if (!normalized) return "";

  const tokens = normalized.split(" ").filter(Boolean);
  const deduped = tokens.filter((token, index) => index === 0 || token.toLowerCase() !== tokens[index - 1].toLowerCase());

  return deduped
    .map((token) =>
      token
        .split("-")
        .map((part) => {
          if (!part) return "";
          if (/^[A-Z0-9]{2,}$/.test(part)) return part;
          return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        })
        .join("-")
    )
    .join(" ");
}

function slugifyText(value: string): string {
  const normalized = normalizeWhitespace(value).toLowerCase();
  if (!normalized) return "";
  return normalized
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sanitizePathname(value: string): string {
  const input = trimToString(value);
  if (!input) return "";

  try {
    const parsed = new URL(input);
    return sanitizePathname(parsed.pathname);
  } catch {
    // Not a full URL, keep processing.
  }

  const withoutQuery = input.split(/[?#]/)[0] ?? "";
  const normalized = trimToString(withoutQuery);
  if (!normalized) return "";
  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

function getEffectivePathname(req: Request, payloadPagePath?: string): string {
  const fromPayload = sanitizePathname(payloadPagePath ?? "");
  if (fromPayload) return fromPayload;

  const refererPath = sanitizePathname(req.headers.get("referer") ?? "");
  if (refererPath) return refererPath;

  const fromRequest = sanitizePathname(req.url);
  if (fromRequest.startsWith("/api/")) return "";
  return fromRequest;
}

function parsePathParts(pagePath: string): { service_slug: string; location_slug: string } {
  const segments = sanitizePathname(pagePath).split("/").filter(Boolean);
  return {
    service_slug: segments[0] ?? "",
    location_slug: segments[1] ?? "",
  };
}

function deriveLeadOrigin(pagePath: string): string {
  const normalized = trimToString(pagePath).toLowerCase();
  if (!normalized) return "";
  if (normalized.includes("near-me")) return "near_me";
  if (normalized.includes("guides")) return "content";
  const segments = normalized.split("/").filter(Boolean);
  return segments.length >= 2 ? "service_location" : "";
}

function normalizeProjectStage(value: string): string {
  const normalized = trimToString(value).toLowerCase();
  return PROJECT_STAGE_OPTIONS.has(normalized) ? normalized : "";
}

const KENT_LOCATION_SLUGS = new Set([
  "ashford",
  "canterbury",
  "dartford",
  "dover",
  "folkestone",
  "gravesend",
  "maidstone",
  "rochester",
  "sevenoaks",
  "tonbridge",
  "tunbridge-wells",
  "chislehurst",
  "sidcup",
  "bickley",
  "mottingham",
  "new-eltham",
]);

const SURREY_LOCATION_SLUGS = new Set([
  "epsom",
  "esher",
  "guildford",
  "leatherhead",
  "reigate",
  "staines",
  "weybridge",
  "woking",
  "dorking",
]);

function getCountyForLocationSlug(locationSlug: string): "kent" | "surrey" | "other" {
  if (KENT_LOCATION_SLUGS.has(locationSlug)) return "kent";
  if (SURREY_LOCATION_SLUGS.has(locationSlug)) return "surrey";
  return "other";
}

function packageTierToScore(value?: "premium" | "high" | "medium" | "lower"): number {
  if (value === "premium") return 4;
  if (value === "high") return 3;
  if (value === "medium") return 2;
  return 1;
}

function inferProjectSize(description: string): "small" | "medium" | "large" {
  const value = description.toLowerCase();
  if (/(multi|development|commercial|phase|block|plot|scheme|package)/.test(value)) return "large";
  if (/(extension|basement|underpinning|retaining|piling|foundation)/.test(value)) return "medium";
  return "small";
}

function classifyLead(serviceSlug: string, description: string, projectStage: string): {
  leadClass: LeadClass;
  leadScore: string;
  classificationReason: string;
} {
  const input = `${serviceSlug} ${description}`.toLowerCase();
  const commercialScore = getCommercialOpportunityScore(input);
  const isCommercial = /commercial|development|contractor|package|structural/.test(input);
  if (/basement|bulk-excavation/.test(input)) {
    return { leadClass: "basement_excavation", leadScore: String(commercialScore), classificationReason: "Basement or bulk excavation pattern" };
  }
  if (/retaining-wall|retaining wall/.test(input)) {
    return { leadClass: "retaining_walls", leadScore: String(commercialScore), classificationReason: "Retaining wall pattern" };
  }
  if (/piling|cfa|mini-piling/.test(input)) {
    return { leadClass: "piling", leadScore: String(commercialScore), classificationReason: "Piling-related service pattern" };
  }
  if (/foundation|underpinning|settlement|structural/.test(input)) {
    return { leadClass: "foundations", leadScore: String(commercialScore), classificationReason: "Foundation/underpinning structural pattern" };
  }
  if (/enabling/.test(input)) {
    return { leadClass: "enabling_works", leadScore: String(commercialScore), classificationReason: "Enabling works pattern" };
  }
  if (isCommercial || projectStage === "ready") {
    return { leadClass: "commercial", leadScore: String(commercialScore), classificationReason: "Commercial or ready-to-procure signal" };
  }
  if (projectStage === "exploring" || /quote|advice|budget only|just looking/.test(input)) {
    return { leadClass: "low_fit", leadScore: String(Math.max(15, commercialScore - 25)), classificationReason: "Exploratory low-fit signal" };
  }
  return { leadClass: "residential", leadScore: String(Math.max(20, commercialScore - 10)), classificationReason: "Default residential fit" };
}

function resolveSupplierAssignment(input: {
  serviceSlug: string;
  locationSlug: string;
  leadClass: LeadClass;
  projectSize: "small" | "medium" | "large";
  sourceQueryTheme: string;
  servicePackageTier?: "premium" | "high" | "medium" | "lower";
}): {
  assignedTo: string;
  assignmentMethod: string;
  assignmentPriorityScore: string;
  supplier: SupplierProfile | null;
  supplierFitTier: "high" | "medium" | "low";
  supplierFitReason: string;
} {
  let best: { supplier: SupplierProfile; score: number; reason: string } | null = null;
  for (const supplier of SUPPLIER_PROFILES) {
    let score = 0;
    const reasons: string[] = [];
    if (supplier.preferredServices.includes(input.serviceSlug)) {
      score += 35;
      reasons.push("service_match");
    }
    if (supplier.preferredLeadTypes.includes(input.leadClass)) {
      score += 25;
      reasons.push("lead_type_match");
    }
    if (supplier.preferredProjectSizes.includes(input.projectSize)) {
      score += 15;
      reasons.push("project_size_match");
    }
    if (
      supplier.preferredTerritories.length === 0 ||
      supplier.preferredTerritories.includes(input.locationSlug)
    ) {
      score += supplier.preferredTerritories.length === 0 ? 8 : 20;
      reasons.push("territory_match");
    }
    const leadCounty = getCountyForLocationSlug(input.locationSlug);
    if (supplier.preferredCounties.includes(leadCounty as "kent" | "surrey")) {
      score += 10;
      reasons.push(`county_bias_${leadCounty}`);
    }
    if (supplier.minimumPackageTier && input.servicePackageTier) {
      const supplierTierScore = packageTierToScore(supplier.minimumPackageTier);
      const leadTierScore = packageTierToScore(input.servicePackageTier);
      if (leadTierScore >= supplierTierScore) {
        score += 10;
        reasons.push("package_tier_match");
      } else {
        score += 2;
        reasons.push("package_tier_below_preference");
      }
    }
    score += supplier.responseSpeedRating * 3;
    if (/foundations|piling|basement|retaining/.test(input.sourceQueryTheme) && supplier.performanceBucket === "strong") {
      score += 8;
      reasons.push("territory_reinforcement_bias");
    }
    if (!best || score > best.score) {
      best = { supplier, score, reason: reasons.join("|") || "fallback" };
    }
  }

  if (!best) {
    return {
      assignedTo: ASSIGNED_TO,
      assignmentMethod: "fallback_default",
      assignmentPriorityScore: "0",
      supplier: null,
      supplierFitTier: "low",
      supplierFitReason: "No supplier profile candidates",
    };
  }

  const fitTier: "high" | "medium" | "low" = best.score >= 85 ? "high" : best.score >= 60 ? "medium" : "low";
  return {
    assignedTo: best.supplier.assignee,
    assignmentMethod: "deterministic_weighted_v1",
    assignmentPriorityScore: String(best.score),
    supplier: best.supplier,
    supplierFitTier: fitTier,
    supplierFitReason: best.reason,
  };
}

function getRequestDomain(req: Request): string {
  try {
    const url = new URL(req.url);
    return trimToString(url.hostname);
  } catch {
    return "";
  }
}

function normalizeLeadData(input: LeadInput, req: Request): LeadRecord {
  const pagePath = getEffectivePathname(req, input.page_path);
  const derivedFromPath = parsePathParts(pagePath);
  const providedServiceSlug = trimToString(input.service_slug);
  const providedLocationSlug = trimToString(input.location_slug);
  const normalizedService = toTitleCaseService(trimToString(input.service));
  const normalizedTown = normalizeWhitespace(trimToString(input.town));

  const serviceSlug = derivedFromPath.service_slug || providedServiceSlug || slugifyText(normalizedService) || "";
  const locationSlug = derivedFromPath.location_slug || providedLocationSlug || slugifyText(normalizedTown) || "";
  const projectStage = normalizeProjectStage(trimToString(input.project_stage));
  const sourceQueryTheme = deriveSourceQueryTheme(`${serviceSlug} ${pagePath} ${trimToString(input.description)}`);
  const { leadClass, leadScore, classificationReason } = classifyLead(serviceSlug, trimToString(input.description), projectStage);
  const projectSize = inferProjectSize(trimToString(input.description));
  const assignment = resolveSupplierAssignment({
    serviceSlug,
    locationSlug,
    leadClass,
    projectSize,
    sourceQueryTheme,
    servicePackageTier: serviceCommercialMetadataBySlug[serviceSlug]?.packageValueTier,
  });
  const territoryCluster =
    assignment.supplier?.preferredTerritories.includes(locationSlug) ? "supplier_primary_territory" : "general_territory";

  const lead: LeadRecord = {
    first_name: trimToString(input.first_name),
    last_name: trimToString(input.last_name),
    email: trimToString(input.email),
    phone: trimToString(input.phone),
    postcode: trimToString(input.postcode),
    town: normalizedTown,
    service: normalizedService,
    description: trimToString(input.description),
    utm_source: trimToString(input.utm_source),
    page_path: pagePath || "",
    service_slug: serviceSlug,
    location_slug: locationSlug,
    project_stage: projectStage,
    source_site: getRequestDomain(req),
    status: "new",
    assigned_to: assignment.assignedTo,
    date_sent_to_contractor: "",
    response_received: "no",
    lead_quality: leadClass,
    estimated_value: "",
    won: "",
    quote_sent: "",
    cta_text: trimToString(input.cta_text),
    cta_seed: trimToString(input.cta_seed),
    source_page_path: pagePath || "",
    source_service_slug: serviceSlug,
    source_location_slug: locationSlug,
    source_vertical: VERTICAL,
    source_query_theme: sourceQueryTheme,
    lead_class: leadClass,
    lead_score: leadScore,
    classification_reason: classificationReason,
    supplier_id: assignment.supplier?.id ?? "",
    supplier_name: assignment.supplier?.name ?? "",
    supplier_fit_tier: assignment.supplierFitTier,
    supplier_fit_reason: assignment.supplierFitReason,
    supplier_preferred_services: assignment.supplier?.preferredServices.join("|") ?? "",
    supplier_preferred_lead_types: assignment.supplier?.preferredLeadTypes.join("|") ?? "",
    supplier_preferred_project_sizes: assignment.supplier?.preferredProjectSizes.join("|") ?? "",
    supplier_preferred_territories: assignment.supplier?.preferredTerritories.join("|") ?? "",
    supplier_response_speed_rating: assignment.supplier ? String(assignment.supplier.responseSpeedRating) : "",
    supplier_performance_bucket: assignment.supplier?.performanceBucket ?? "",
    supplier_win_rate_tracking: assignment.supplier?.winRateTracking ?? "",
    assignment_method: assignment.assignmentMethod,
    assignment_priority_score: assignment.assignmentPriorityScore,
    territory_cluster: territoryCluster,
  };

  if (process.env.NODE_ENV !== "production" && (!lead.service_slug || !lead.location_slug || lead.page_path === "/")) {
    console.warn("Lead missing routing metadata", {
      page_path: lead.page_path,
      service: lead.service,
      town: lead.town,
    });
  }

  return lead;
}

async function getSheetHeaders(sheets: ReturnType<typeof google.sheets>, spreadsheetId: string): Promise<string[]> {
  const resp = await sheets.spreadsheets.values.get({ spreadsheetId, range: "Sheet1!1:1" });
  const row = resp.data.values?.[0] ?? [];
  const headers = row.map((value) => trimToString(value)).filter((header) => header.length > 0);
  if (headers.length > 0) return headers;
  console.warn("[leads] Header row missing; writing expected schema headers");
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "Sheet1!A1",
    valueInputOption: "RAW",
    requestBody: { values: [Array.from(EXPECTED_SHEET_HEADERS)] },
  });
  return Array.from(EXPECTED_SHEET_HEADERS);
}

function validateSchema(headers: string[]) {
  const expectedSet = new Set(EXPECTED_SHEET_HEADERS);
  const headerSet = new Set(headers);
  const missing = EXPECTED_SHEET_HEADERS.filter((header) => !headerSet.has(header));
  const extra = headers.filter((header) => !expectedSet.has(header as (typeof EXPECTED_SHEET_HEADERS)[number]));
  const orderMismatch = EXPECTED_SHEET_HEADERS.some((header, index) => headers[index] !== header);

  if (missing.length > 0) console.warn("[leads] Missing expected sheet columns", { missing });
  if (extra.length > 0) console.warn("[leads] Unexpected sheet columns", { extra });
  if (orderMismatch) console.warn("[leads] Sheet column order mismatch detected");
}

async function getNextLeadId(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  headers: string[]
): Promise<string> {
  const leadIdColumnIndex = headers.indexOf("lead_id");
  if (leadIdColumnIndex < 0) {
    console.warn("[leads] lead_id header missing, starting sequence from 1");
    return formatLeadId(1);
  }
  const columnLetter = String.fromCharCode(65 + leadIdColumnIndex);
  const colRange = `Sheet1!${columnLetter}:${columnLetter}`;
  const resp = await sheets.spreadsheets.values.get({ spreadsheetId, range: colRange });
  const values = resp.data.values ?? [];
  for (let i = values.length - 1; i >= 0; i--) {
    const v = values[i]?.[0];
    if (!v) continue;
    const n = parseLeadId(String(v));
    if (n != null) return formatLeadId(n + 1);
  }
  return formatLeadId(1);
}

async function appendLeadRow(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  headers: string[],
  lead: LeadRecord
) {
  const row = headers.map((header) => {
    if (header === "lead_origin") {
      const derivedLeadOrigin = deriveLeadOrigin(lead.page_path);
      if (derivedLeadOrigin) {
        console.warn("[leads] Derived lead_origin from page_path", { page_path: lead.page_path, lead_origin: derivedLeadOrigin });
      }
      return derivedLeadOrigin;
    }
    return trimToString(lead[header] ?? "");
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:ZZ",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
}

function buildEmailSubject(lead: LeadRecord) {
  return `New Groundworks Lead – ${lead.lead_id} – ${lead.town} – ${lead.service}`;
}

function buildEmailBody(lead: LeadRecord) {
  return [
    `Lead Reference: ${lead.lead_id}`,
    `Timestamp: ${lead.timestamp}`,
    "",
    `Name: ${lead.first_name} ${lead.last_name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Postcode: ${lead.postcode}`,
    `Town: ${lead.town}`,
    `Requested service: ${lead.service}`,
    "",
    "Description of project:",
    lead.description,
  ].join("\n");
}

function escapeHtmlText(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = LeadInputSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", issues: parsed.error.issues.map((i) => ({ path: i.path, message: i.message })) },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const spreadsheetId = requireEnv("GOOGLE_SHEETS_SHEET_ID");
    const sheets = await getSheetsClient();
    const headers = await getSheetHeaders(sheets, spreadsheetId);
    validateSchema(headers);
    const lead_id = await getNextLeadId(sheets, spreadsheetId, headers);

    const normalizedLead = normalizeLeadData(parsed.data, req);
    const lead: LeadRecord = {
      ...normalizedLead,
      lead_id,
      timestamp,
      vertical: VERTICAL,
    };

    // Persist first so we never lose a lead if email fails
    await appendLeadRow(sheets, spreadsheetId, headers, lead);

    const resend = new Resend(requireEnv("RESEND_API_KEY"));
    // Hardcoded test inbox until leads@* MX records receive mail.
    const emailTo = "sampettiford@googlemail.com";
    const emailFrom = "Mainline Groundworks <leads@mainlinegroundworks.co.uk>";

    const maxRetries = 3;
    let lastError: unknown = null;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const { error } = await resend.emails.send({
        to: emailTo,
        from: emailFrom,
        subject: buildEmailSubject(lead),
        text: buildEmailBody(lead),
      });
      if (!error) {
        const ackTo = lead.email.trim();
        if (ackTo.includes("@")) {
          try {
            const first = lead.first_name.trim() ? escapeHtmlText(lead.first_name.trim()) : "there";
            await resend.emails.send({
              from: emailFrom,
              to: ackTo,
              subject: "Thanks – we've received your enquiry",
              html: `<p>Hi ${first},</p>
<p>Thanks for getting in touch — we've received your enquiry and will review the details.</p>
<p>We'll either come back to you directly or pass this to a relevant contractor in your area, who will be in touch shortly.</p>
<p>If your enquiry is urgent, feel free to reply to this email.</p>
<p>Thanks,<br/>Mainline Team</p>`,
            });
          } catch (autoErr) {
            console.error("[leads] Auto-response failed:", autoErr);
          }
        }
        return NextResponse.json({ ok: true, lead_id, timestamp });
      }
      lastError = error;
      const statusCode = (error as { statusCode?: number })?.statusCode;
      const isRetryable = statusCode === 429 || (statusCode != null && statusCode >= 500);
      if (!isRetryable || attempt === maxRetries) break;
      await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
    }

    // Lead is saved; log email failure but still return success
    console.error("[leads] Resend failed after retries:", lastError);
    return NextResponse.json({ ok: true, lead_id, timestamp });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: "Lead submission failed", message }, { status: 500 });
  }
}
