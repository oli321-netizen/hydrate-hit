import { mkdir, appendFile, readFile } from "node:fs/promises";
import path from "node:path";
import { Client } from "pg";
import type { WaitlistPayload } from "@/lib/waitlist";

export type WaitlistRow = {
  email: string;
  flavour: string;
  sku: string;
  intent: string;
  source: string;
  createdAt: string;
};

const CREATE_SQL = `
  CREATE TABLE IF NOT EXISTS waitlist (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    flavour TEXT,
    sku TEXT,
    intent TEXT,
    source TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

function filePath() {
  return process.env.WAITLIST_PATH || path.join(process.cwd(), "data", "waitlist.jsonl");
}

function pgClient() {
  return new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes("localhost")
      ? false
      : { rejectUnauthorized: false },
  });
}

function rowFromPayload(payload: WaitlistPayload): WaitlistRow {
  return {
    email: payload.email.trim().toLowerCase(),
    flavour: payload.flavour ?? "",
    sku: payload.sku ?? "",
    intent: payload.intent ?? "waitlist",
    source: payload.source ?? "site",
    createdAt: new Date().toISOString(),
  };
}

async function insertFile(row: WaitlistRow) {
  const dest = filePath();
  await mkdir(path.dirname(dest), { recursive: true });
  await appendFile(/* turbopackIgnore: true */ dest, `${JSON.stringify(row)}\n`, "utf8");
}

async function listFile(): Promise<WaitlistRow[]> {
  try {
    const raw = await readFile(/* turbopackIgnore: true */ filePath(), "utf8");
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line) as WaitlistRow);
  } catch {
    return [];
  }
}

async function insertPostgres(row: WaitlistRow) {
  const client = pgClient();
  await client.connect();
  try {
    await client.query(CREATE_SQL);
    await client.query(
      `INSERT INTO waitlist (email, flavour, sku, intent, source, created_at)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [row.email, row.flavour, row.sku, row.intent, row.source, row.createdAt],
    );
  } finally {
    await client.end();
  }
}

async function listPostgres(): Promise<WaitlistRow[]> {
  const client = pgClient();
  await client.connect();
  try {
    await client.query(CREATE_SQL);
    const result = await client.query<{
      email: string;
      flavour: string | null;
      sku: string | null;
      intent: string | null;
      source: string | null;
      created_at: Date;
    }>(
      `SELECT email, flavour, sku, intent, source, created_at
       FROM waitlist
       ORDER BY created_at ASC`,
    );
    return result.rows.map((item) => ({
      email: item.email,
      flavour: item.flavour ?? "",
      sku: item.sku ?? "",
      intent: item.intent ?? "",
      source: item.source ?? "",
      createdAt: new Date(item.created_at).toISOString(),
    }));
  } finally {
    await client.end();
  }
}

export function storageBackend(): "postgres" | "file" {
  return process.env.DATABASE_URL ? "postgres" : "file";
}

export async function storeWaitlist(payload: WaitlistPayload) {
  const row = rowFromPayload(payload);
  if (storageBackend() === "postgres") await insertPostgres(row);
  else await insertFile(row);
  return row;
}

export async function listWaitlist() {
  if (storageBackend() === "postgres") return listPostgres();
  return listFile();
}

/** Unique emails, first-seen row wins — for the launch mailer. */
export function uniqueByEmail(rows: WaitlistRow[]) {
  const seen = new Set<string>();
  const unique: WaitlistRow[] = [];
  for (const row of rows) {
    if (seen.has(row.email)) continue;
    seen.add(row.email);
    unique.push(row);
  }
  return unique;
}

export function toCsv(rows: WaitlistRow[]) {
  const header = "email,flavour,sku,intent,source,created_at";
  const lines = rows.map((row) =>
    [row.email, row.flavour, row.sku, row.intent, row.source, row.createdAt]
      .map((value) => `"${String(value).replaceAll('"', '""')}"`)
      .join(","),
  );
  return [header, ...lines].join("\n");
}
