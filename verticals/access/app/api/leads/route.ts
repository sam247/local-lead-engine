import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { google } from "googleapis";
import { leadEmailField, leadPhoneField, leadPostcodeField } from "engine";

const SERVICE_OPTIONS = ["Access control systems", "Commercial CCTV", "IP cameras", "Perimeter security", "Security integration", "Advice"] as const;
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
] as const;
const PROJECT_STAGE_OPTIONS = new Set(["planning", "ready", "exploring"]);
const ASSIGNED_TO = "Access";
const VERTICAL = "access";

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
  return `ACC-${String(n).padStart(3, "0")}`;
}

function parseLeadId(leadId: string): number | null {
  const m = /^ACC-(\d{3,})$/.exec(leadId.trim());
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
    project_stage: normalizeProjectStage(trimToString(input.project_stage)),
    source_site: getRequestDomain(req),
    status: "new",
    assigned_to: ASSIGNED_TO,
    date_sent_to_contractor: "",
    response_received: "no",
    lead_quality: "",
    estimated_value: "",
    won: "",
    quote_sent: "",
    cta_text: trimToString(input.cta_text),
    cta_seed: trimToString(input.cta_seed),
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
  return `New Access Lead – ${lead.lead_id} – ${lead.town} – ${lead.service}`;
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
    "Description / requirements:",
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
    const emailFrom = "Mainline Access <leads@mainlineaccess.co.uk>";

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

