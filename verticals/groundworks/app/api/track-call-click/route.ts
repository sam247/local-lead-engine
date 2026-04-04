import { google } from "googleapis";

const SHEET_TAB_NAME = "call_clicks";
const EXPECTED_CALL_HEADERS = [
  "timestamp",
  "call_id",
  "vertical",
  "source_site",
  "page_path",
  "service_slug",
  "location_slug",
  "utm_source",
  "source",
  "user_agent",
] as const;
const OPTIONAL_CALL_HEADERS = [
  "contractor",
  "call_status",
  "event_type",
  "intent_id",
  "to_number",
  "twilio_call_sid",
  "call_duration",
  "orphan",
  "cta_text",
  "cta_seed",
  "call_quality",
] as const;

const TRAILING_COLUMN_NAMES = [
  "intent_id",
  "to_number",
  "twilio_call_sid",
  "call_duration",
  "orphan",
  "cta_text",
  "cta_seed",
  "call_quality",
] as const;

type CallRecord = Record<string, string>;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function normalizePrivateKey(maybeEscaped: string): string {
  return maybeEscaped.includes("\\n") ? maybeEscaped.replace(/\\n/g, "\n") : maybeEscaped;
}

function trimToString(value: unknown): string {
  return String(value ?? "").trim();
}

function columnIndexToLetter(index: number): string {
  let n = index + 1;
  let out = "";
  while (n > 0) {
    const rem = (n - 1) % 26;
    out = String.fromCharCode(65 + rem) + out;
    n = Math.floor((n - 1) / 26);
  }
  return out || "A";
}

function getRequestDomain(req: Request): string {
  try {
    return trimToString(new URL(req.url).hostname);
  } catch {
    return "";
  }
}

function parsePathFromReferer(req: Request): string {
  const referer = trimToString(req.headers.get("referer"));
  if (!referer) return "";
  try {
    return trimToString(new URL(referer).pathname);
  } catch {
    return "";
  }
}

function normalizeSource(value: string): string {
  const normalized = trimToString(value).toLowerCase();
  if (normalized === "cta" || normalized === "header" || normalized === "footer" || normalized === "inline") {
    return normalized;
  }
  return "inline";
}

function formatCallId(n: number): string {
  return `CALL-${String(n).padStart(4, "0")}`;
}

function parseCallId(callId: string): number | null {
  const match = /^CALL-(\d{4,})$/i.exec(trimToString(callId));
  if (!match) return null;
  const n = Number(match[1]);
  return Number.isFinite(n) ? n : null;
}

async function getSheetsClient() {
  const auth = new google.auth.JWT({
    email: requireEnv("GOOGLE_SHEETS_CLIENT_EMAIL"),
    key: normalizePrivateKey(requireEnv("GOOGLE_SHEETS_PRIVATE_KEY")),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

async function getSheetHeaders(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string
): Promise<string[]> {
  const range = `${SHEET_TAB_NAME}!1:1`;
  const resp = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  const row = resp.data.values?.[0] ?? [];
  const headers = row.map((value) => trimToString(value)).filter(Boolean);
  if (headers.length > 0) return headers;

  const seedHeaders = [...EXPECTED_CALL_HEADERS, ...OPTIONAL_CALL_HEADERS];
  console.warn("[call_clicks] Header row missing; writing default call_clicks schema headers");
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${SHEET_TAB_NAME}!A1`,
    valueInputOption: "RAW",
    requestBody: { values: [seedHeaders] },
  });
  return seedHeaders;
}

async function ensureTrailingColumns(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  headers: string[]
): Promise<string[]> {
  const toAdd = TRAILING_COLUMN_NAMES.filter((name) => !headers.includes(name));
  if (toAdd.length === 0) return headers;
  const newRow = [...headers, ...toAdd];
  const endLetter = columnIndexToLetter(newRow.length - 1);
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${SHEET_TAB_NAME}!A1:${endLetter}1`,
    valueInputOption: "RAW",
    requestBody: { values: [newRow] },
  });
  return newRow;
}

function validateSchema(headers: string[]) {
  const expectedSet = new Set(EXPECTED_CALL_HEADERS);
  const headerSet = new Set(headers);
  const optionalSet = new Set<string>([...OPTIONAL_CALL_HEADERS]);
  const missing = EXPECTED_CALL_HEADERS.filter((header) => !headerSet.has(header));
  const extra = headers.filter(
    (header) =>
      !expectedSet.has(header as (typeof EXPECTED_CALL_HEADERS)[number]) && !optionalSet.has(header)
  );
  const requiredOrderSlice = headers.filter((header) =>
    expectedSet.has(header as (typeof EXPECTED_CALL_HEADERS)[number])
  );
  const expectedOrderSlice = EXPECTED_CALL_HEADERS.filter((header) => headerSet.has(header));
  const orderMismatch = requiredOrderSlice.some((header, index) => header !== expectedOrderSlice[index]);

  if (missing.length > 0) console.warn("[call_clicks] Missing expected columns", { missing });
  if (extra.length > 0) console.warn("[call_clicks] Unexpected columns", { extra });
  if (orderMismatch) console.warn("[call_clicks] Column order mismatch detected");
}

async function getNextCallId(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  headers: string[]
): Promise<string> {
  const callIdIndex = headers.indexOf("call_id");
  if (callIdIndex < 0) {
    console.warn("[call_clicks] call_id column missing; starting from CALL-0001");
    return formatCallId(1);
  }

  const colLetter = columnIndexToLetter(callIdIndex);
  const range = `${SHEET_TAB_NAME}!${colLetter}:${colLetter}`;
  const resp = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  const values = resp.data.values ?? [];
  for (let i = values.length - 1; i >= 0; i--) {
    const raw = trimToString(values[i]?.[0]);
    if (!raw) continue;
    const parsed = parseCallId(raw);
    if (parsed != null) return formatCallId(parsed + 1);
  }
  return formatCallId(1);
}

function normalizeInput(body: Record<string, unknown>, req: Request): CallRecord {
  const pagePath = trimToString(body.page_path) || parsePathFromReferer(req);
  const publicTo = trimToString(process.env.NEXT_PUBLIC_PHONE_NUMBER);
  return {
    vertical: trimToString(body.vertical),
    source_site: getRequestDomain(req),
    page_path: pagePath,
    service_slug: trimToString(body.service_slug),
    location_slug: trimToString(body.location_slug),
    utm_source: trimToString(body.utm_source),
    source: normalizeSource(trimToString(body.source)),
    user_agent: trimToString(req.headers.get("user-agent")),
    contractor: "",
    call_status: "",
    event_type: "click",
    intent_id: trimToString(body.intent_id),
    to_number: publicTo,
    twilio_call_sid: "",
    call_duration: "",
    orphan: "",
    cta_text: trimToString(body.cta_text),
    cta_seed: trimToString(body.cta_seed),
    call_quality: "",
  };
}

async function appendCallRow(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  headers: string[],
  call: CallRecord
) {
  const row = headers.map((header) => {
    if (OPTIONAL_CALL_HEADERS.includes(header as (typeof OPTIONAL_CALL_HEADERS)[number])) {
      return trimToString(call[header] ?? "");
    }
    return trimToString(call[header] ?? "");
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEET_TAB_NAME}!A:ZZ`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const spreadsheetId = requireEnv("GOOGLE_SHEETS_SHEET_ID");
    const sheets = await getSheetsClient();
    let headers = await getSheetHeaders(sheets, spreadsheetId);
    headers = await ensureTrailingColumns(sheets, spreadsheetId, headers);
    validateSchema(headers);
    const callId = await getNextCallId(sheets, spreadsheetId, headers);
    const normalized = normalizeInput(body, req);
    const clickTs = trimToString(body.click_timestamp);
    const call: CallRecord = {
      ...normalized,
      timestamp: clickTs.length > 0 ? clickTs : new Date().toISOString(),
      call_id: callId,
    };
    await appendCallRow(sheets, spreadsheetId, headers, call);
  } catch (error) {
    console.error("[call_clicks] Failed to record call click", error);
    // Never block dial action from client.
  }
  return new Response(null, { status: 204 });
}
