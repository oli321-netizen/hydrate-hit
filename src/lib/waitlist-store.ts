import { mkdir, appendFile, readFile } from "node:fs/promises";
import path from "node:path";
import { Pool } from "pg";
import type { WaitlistPayload } from "@/lib/waitlist";

export type WaitlistRow = {
  email: string;
  flavour: string;
  sku: string;
  intent: string;
  source: string;
  createdAt: string;
};

export type StorageKind = "postgres" | "file";

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

let pool: Pool | null = null;

function filePath() {
  return process.env.WAITLIST_PATH || path.join(process.cwd(), "data", "waitlist.jsonl");
}

export function configuredBackend(): StorageKind {
  return process.env.DATABASE_URL?.trim() ? "postgres" : "file";
}

/** Railway private host does not speak TLS. Public proxy / sslmode=require does. */
export function pgSsl(connectionString: string) {
  const value = connectionString.toLowerCase();
  if (value.includes("sslmode=disable")) return false;
  if (value.includes("localhost") || value.includes("127.0.0.1")) return false;
  if (value.includes(".railway.internal") || value.includes("railway.internal")) return false;
  if (
    value.includes("sslmode=require") ||
    value.includes("sslmode=verify") ||
    value.includes("proxy.rlwy.net") ||
    value.includes(".rlwy.net")
  ) {
    return { rejectUnauthorized: false };
  }
  return { rejectUnauthorized: false };
}

function getPool() {
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) return null;
  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: pgSsl(connectionString),
      max: 4,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 8_000,
    });
    pool.on("error", (error) => {
      console.error("waitlist postgres pool", error);
    });
  }
  return pool;
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

function asErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) return error.message;
  return "Waitlist store failed.";
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
  const db = getPool();
  if (!db) throw new Error("DATABASE_URL is not set.");
  await db.query(CREATE_SQL);
  await db.query(
    `INSERT INTO waitlist (email, flavour, sku, intent, source, created_at)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [row.email, row.flavour, row.sku, row.intent, row.source, row.createdAt],
  );
}

async function listPostgres(): Promise<WaitlistRow[]> {
  const db = getPool();
  if (!db) throw new Error("DATABASE_URL is not set.");
  await db.query(CREATE_SQL);
  const result = await db.query<{
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
}

export async function storeWaitlist(payload: WaitlistPayload) {
  const row = rowFromPayload(payload);
  if (configuredBackend() === "postgres") {
    try {
      await insertPostgres(row);
      return { row, storage: "postgres" as const };
    } catch (error) {
      console.error("waitlist postgres insert failed; falling back to file", error);
      try {
        await insertFile(row);
        return {
          row,
          storage: "file" as const,
          warning: `postgres unavailable (${asErrorMessage(error)}); wrote to file`,
        };
      } catch (fileError) {
        throw new Error(
          `Waitlist could not save (${asErrorMessage(error)}; file: ${asErrorMessage(fileError)}).`,
        );
      }
    }
  }
  await insertFile(row);
  return { row, storage: "file" as const };
}

export async function listWaitlist() {
  if (configuredBackend() === "postgres") {
    try {
      return await listPostgres();
    } catch (error) {
      console.error("waitlist postgres list failed; falling back to file", error);
      return listFile();
    }
  }
  return listFile();
}

export async function probeStorage() {
  const configured = configuredBackend();
  if (configured !== "postgres") {
    return { storage: "file" as const, configured: "file" as const };
  }
  try {
    const db = getPool();
    if (!db) throw new Error("DATABASE_URL is not set.");
    await db.query("SELECT 1");
    return { storage: "postgres" as const, configured: "postgres" as const };
  } catch (error) {
    console.error("waitlist postgres probe failed", error);
    return {
      storage: "file" as const,
      configured: "postgres" as const,
      warning: asErrorMessage(error),
    };
  }
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
