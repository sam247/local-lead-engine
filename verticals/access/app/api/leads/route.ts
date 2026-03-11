import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { google } from "googleapis";

const SERVICE_OPTIONS = ["Access control systems", "Commercial CCTV", "IP cameras", "Perimeter security", "Security integration", "Advice"] as const;

const LeadInputSchema = z.object({
  first_name: z.string().trim().min(1).max(50),
  last_name: z.string().trim().min(1).max(50),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(1).max(30),
  postcode: z.string().trim().min(1).max(16),
  town: z.string().trim().min(1).max(100),
  service: z.enum(SERVICE_OPTIONS),
  description: z.string().trim().min(1).max(2000),
  source_site: z.literal("access"),
  utm_source: z.string().trim().max(100).optional(),
});

type LeadInput = z.infer<typeof LeadInputSchema>;

const SHEET_HEADERS = [
  "timestamp",
  "lead_id",
  "vertical",
  "source_site",
  "utm_source",
  "service",
  "postcode",
  "town",
  "first_name",
  "last_name",
  "email",
  "phone",
  "description",
  "status",
  "contractor",
  "value",
] as const;

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

async function ensureHeaderRow(sheets: ReturnType<typeof google.sheets>, spreadsheetId: string) {
  const headerRange = "Sheet1!A1:P1";
  const existing = await sheets.spreadsheets.values.get({ spreadsheetId, range: headerRange });
  const row = existing.data.values?.[0] ?? [];
  const normalized = row.map((c) => String(c ?? "").trim());
  const matches = SHEET_HEADERS.every((h, idx) => normalized[idx] === h);
  if (matches) return;
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: headerRange,
    valueInputOption: "RAW",
    requestBody: { values: [Array.from(SHEET_HEADERS)] },
  });
}

async function getNextLeadId(sheets: ReturnType<typeof google.sheets>, spreadsheetId: string): Promise<string> {
  // Column B holds lead_id per our schema.
  const colRange = "Sheet1!B:B";
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
  lead: LeadInput & { lead_id: string; timestamp: string }
) {
  const row = [
    lead.timestamp,
    lead.lead_id,
    "access",
    lead.source_site,
    lead.utm_source ?? "",
    lead.service,
    lead.postcode,
    lead.town,
    lead.first_name,
    lead.last_name,
    lead.email,
    lead.phone,
    lead.description,
    "new",
    "",
    "",
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:P",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
}

function buildEmailSubject(lead: { lead_id: string; town: string; service: string }) {
  return `New Access Lead – ${lead.lead_id} – ${lead.town} – ${lead.service}`;
}

function buildEmailBody(lead: LeadInput & { lead_id: string; timestamp: string }) {
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
    "",
    `Source site: ${lead.source_site}`,
  ].join("\n");
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
    await ensureHeaderRow(sheets, spreadsheetId);

    // Best-effort sequential ID (simple + lightweight).
    const lead_id = await getNextLeadId(sheets, spreadsheetId);

    const lead: LeadInput & { lead_id: string; timestamp: string } = { ...parsed.data, lead_id, timestamp };

    const resend = new Resend(requireEnv("RESEND_API_KEY"));
    const emailTo = "leads@mainlineaccess.co.uk";
    const emailFrom = "Mainline Access <leads@mainlineaccess.co.uk>";

    await resend.emails.send({
      to: emailTo,
      from: emailFrom,
      subject: buildEmailSubject(lead),
      text: buildEmailBody(lead),
    });

    await appendLeadRow(sheets, spreadsheetId, lead);

    return NextResponse.json({ ok: true, lead_id, timestamp });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: "Lead submission failed", message }, { status: 500 });
  }
}

