import { google } from "googleapis";

import {
  bindCallSidToIntent,
  clearLatestIntentId,
  peekLatestIntentId,
} from "@/lib/twilioIntentStore";

const SHEET_TAB_NAME = "call_clicks";

const VOICEMAIL_TRAILING_HEADERS = [
  "lead_type",
  "recording_url",
  "call_sid",
  "message",
  "phone",
] as const;

const VOICEMAIL_SAY_MESSAGE =
  "Hi, you've reached Mainline. We're likely on site at the moment. Please leave your name, number, location and a brief description of the work after the beep, and we'll get back to you shortly.";

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function readParam(url: URL, key: string, fallback: string): string {
  const value = url.searchParams.get(key);
  if (!value) return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

function trimToString(value: unknown): string {
  return String(value ?? "").trim();
}

function firstFormString(formData: FormData, keys: string[]): string {
  for (const key of keys) {
    const raw = formData.get(key);
    if (typeof raw === "string") {
      const t = raw.trim();
      if (t.length > 0) return t;
    }
  }
  return "";
}

/** Prefer form body, then query string; if still empty, use default. */
function fieldOrDefault(
  formData: FormData,
  url: URL,
  formKeys: string[],
  queryKey: string,
  fallback: string
): string {
  const fromForm = firstFormString(formData, formKeys);
  if (fromForm.length > 0) return fromForm;
  const fromQuery = trimToString(url.searchParams.get(queryKey));
  if (fromQuery.length > 0) return fromQuery;
  return fallback;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function normalizePrivateKey(maybeEscaped: string): string {
  return maybeEscaped.includes("\\n") ? maybeEscaped.replace(/\\n/g, "\n") : maybeEscaped;
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

async function getSheetsClient() {
  const auth = new google.auth.JWT({
    email: requireEnv("GOOGLE_SHEETS_CLIENT_EMAIL"),
    key: normalizePrivateKey(requireEnv("GOOGLE_SHEETS_PRIVATE_KEY")),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

async function getCallClicksHeaders(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string
): Promise<string[]> {
  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_TAB_NAME}!1:1`,
  });
  const row = resp.data.values?.[0] ?? [];
  return row.map((c) => trimToString(c)).filter(Boolean);
}

async function ensureVoicemailColumns(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  headers: string[]
): Promise<string[]> {
  const toAdd = VOICEMAIL_TRAILING_HEADERS.filter((name) => !headers.includes(name));
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

function formatCallId(n: number): string {
  return `CALL-${String(n).padStart(4, "0")}`;
}

function parseCallId(callId: string): number | null {
  const match = /^CALL-(\d{4,})$/i.exec(trimToString(callId));
  if (!match) return null;
  const n = Number(match[1]);
  return Number.isFinite(n) ? n : null;
}

async function getNextCallId(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  headers: string[]
): Promise<string> {
  const callIdIndex = headers.indexOf("call_id");
  if (callIdIndex < 0) return formatCallId(1);
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

async function appendVoicemailToSheet(params: {
  formData: FormData;
  url: URL;
  callSid: string;
  callStatus: string;
  recordingUrl: string;
  recordingDuration: string;
}): Promise<void> {
  const recordingUrl = trimToString(params.recordingUrl);
  if (recordingUrl.length === 0) return;

  const spreadsheetId = requireEnv("GOOGLE_SHEETS_SHEET_ID");
  const sheets = await getSheetsClient();
  let headers = await getCallClicksHeaders(sheets, spreadsheetId);
  headers = await ensureVoicemailColumns(sheets, spreadsheetId, headers);

  const callId = await getNextCallId(sheets, spreadsheetId, headers);

  const phone =
    firstFormString(params.formData, ["From", "from"]) || "unknown";
  const message = `Voicemail: ${recordingUrl}`;

  const source_site = fieldOrDefault(
    params.formData,
    params.url,
    ["source_site"],
    "source_site",
    "mainlinegroundworks.co.uk"
  );
  const page_path = fieldOrDefault(
    params.formData,
    params.url,
    ["page_path"],
    "page_path",
    "phone_call"
  );
  const service_slug = fieldOrDefault(
    params.formData,
    params.url,
    ["service_slug"],
    "service_slug",
    "unknown"
  );
  const location_slug = fieldOrDefault(
    params.formData,
    params.url,
    ["location_slug"],
    "location_slug",
    "unknown"
  );
  const utm_source = fieldOrDefault(
    params.formData,
    params.url,
    ["utm_source"],
    "utm_source",
    "offline"
  );

  const byHeader: Record<string, string> = {
    timestamp: new Date().toISOString(),
    call_id: callId,
    vertical: "groundworks",
    source_site,
    page_path,
    service_slug,
    location_slug,
    utm_source,
    source: "twilio",
    user_agent: "",
    contractor: "",
    call_status: params.callStatus,
    event_type: "twilio_voicemail",
    intent_id: "",
    to_number: trimToString(process.env.FORWARD_PHONE_NUMBER),
    twilio_call_sid: params.callSid,
    call_duration: params.recordingDuration,
    call_quality: "",
    orphan: "yes",
    cta_text: "",
    cta_seed: "",
    lead_type: "call",
    recording_url: recordingUrl,
    call_sid: params.callSid,
    message,
    phone,
  };

  const row: string[] = headers.map((h) => byHeader[h] ?? "");

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEET_TAB_NAME}!A:ZZ`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
}

/** Recording complete webhook: Twilio sends RecordingSid and usually RecordingUrl. */
function isRecordingStatusCallback(formData: FormData): boolean {
  if (firstFormString(formData, ["RecordingSid", "recording_sid"]).length > 0) return true;
  return firstFormString(formData, ["RecordingUrl", "recording_url"]).length > 0;
}

/** Relative path for Dial action (resolved by Twilio against the voice webhook host). */
function buildDialActionAttr(intentId: string | undefined): string {
  let path = "/api/twilio/voice?dial_step=1";
  if (intentId) path += `&intent_id=${encodeURIComponent(intentId)}`;
  return path;
}

const VOICEMAIL_AFTER_DIAL_STATUSES = new Set(["no-answer", "busy", "failed", "canceled", "cancelled"]);

export async function POST(req: Request) {
  const url = new URL(req.url);
  const service = readParam(url, "service", "unknown");
  const location = readParam(url, "location", "unknown");
  const page = readParam(url, "page", "unknown");
  const issue = readParam(url, "issue", "none");

  const formData = await req.formData();

  const callSid = firstFormString(formData, ["CallSid", "call_sid"]);
  const callStatus = firstFormString(formData, ["CallStatus", "call_status"]);
  const recordingUrl = firstFormString(formData, ["RecordingUrl", "recording_url"]);
  const recordingDuration = firstFormString(formData, ["RecordingDuration", "recording_duration"]);

  const dialStep = trimToString(url.searchParams.get("dial_step"));

  if (isRecordingStatusCallback(formData)) {
    if (recordingUrl.length > 0) {
      try {
        await appendVoicemailToSheet({
          formData,
          url,
          callSid: callSid || "unknown",
          callStatus: callStatus || "unknown",
          recordingUrl,
          recordingDuration,
        });
      } catch (err) {
        console.error("[twilio_voice] Voicemail sheet append failed", err);
      }
    }

    return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`, {
      headers: { "Content-Type": "text/xml" },
    });
  }

  let intentFromQuery = trimToString(url.searchParams.get("intent_id"));
  const intentFromForm = trimToString(formData.get("intent_id"));
  let intentId = intentFromQuery || intentFromForm;

  if (dialStep !== "1") {
    const latest = peekLatestIntentId();
    if (callSid && latest) {
      bindCallSidToIntent(callSid, latest);
      intentId = latest;
      clearLatestIntentId();
    }
  }

  const forwardedNumber = process.env.FORWARD_PHONE_NUMBER?.trim();
  if (!forwardedNumber) {
    console.error("[twilio_voice] Missing FORWARD_PHONE_NUMBER");
    return new Response("Missing FORWARD_PHONE_NUMBER", { status: 500 });
  }

  const baseUrl = `${url.protocol}//${url.host}`;
  const statusPath = "/api/twilio/status";
  const statusCallback = intentId
    ? `${baseUrl}${statusPath}?intent_id=${encodeURIComponent(intentId)}`
    : `${baseUrl}${statusPath}`;

  if (dialStep === "1") {
    const dialCallStatus = firstFormString(formData, ["DialCallStatus", "dial_call_status"]).toLowerCase();

    if (VOICEMAIL_AFTER_DIAL_STATUSES.has(dialCallStatus)) {
      const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>${xmlEscape(VOICEMAIL_SAY_MESSAGE)}</Say>
  <Record recordingStatusCallback="${xmlEscape("/api/twilio/voice")}" recordingStatusCallbackMethod="POST" />
</Response>`;
      return new Response(twiml, {
        headers: { "Content-Type": "text/xml" },
      });
    }

    return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response><Hangup/></Response>`, {
      headers: { "Content-Type": "text/xml" },
    });
  }

  const dialActionAttr = buildDialActionAttr(intentId);

  console.log("[twilio_voice]", {
    intentId,
    callSid: callSid || undefined,
    statusCallback,
    dialActionAttr,
  });

  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial
    timeout="15"
    action="${xmlEscape(dialActionAttr)}"
    method="POST"
    statusCallback="${xmlEscape(statusCallback)}"
    statusCallbackEvent="completed"
    statusCallbackMethod="POST"
  >
    ${xmlEscape(forwardedNumber)}
  </Dial>
</Response>`;

  void service;
  void location;
  void page;
  void issue;

  return new Response(twiml, {
    headers: { "Content-Type": "text/xml" },
  });
}
