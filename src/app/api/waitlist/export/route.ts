import { NextResponse } from "next/server";
import { listWaitlist, toCsv, uniqueByEmail } from "@/lib/waitlist-store";

export const runtime = "nodejs";

function authorized(request: Request) {
  const secret = process.env.WAITLIST_EXPORT_SECRET?.trim();
  if (!secret) return false;
  const header = request.headers.get("authorization") ?? "";
  const bearer = header.replace(/^Bearer\s+/i, "").trim();
  const url = new URL(request.url);
  const query = url.searchParams.get("key") ?? "";
  return bearer === secret || query === secret;
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorised." }, { status: 401 });
  }

  const rows = uniqueByEmail(await listWaitlist());
  const csv = toCsv(rows);
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=hydrate-hit-waitlist.csv",
    },
  });
}
