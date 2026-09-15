import { NextResponse } from "next/server";
import { isEmail, waitlistEndpoint } from "@/lib/waitlist";

export async function POST(request: Request) {
  let body: {
    email?: string;
    flavour?: string;
    sku?: string;
    intent?: string;
    source?: string;
  } = {};
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Send JSON with an email." }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "That does not look like an email." }, { status: 400 });
  }

  const dest = process.env.WAITLIST_ENDPOINT || waitlistEndpoint();
  if (!dest) {
    return NextResponse.json(
      { ok: false, error: "Waitlist endpoint is not configured." },
      { status: 503 },
    );
  }

  const res = await fetch(dest, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      flavour: body.flavour ?? "",
      sku: body.sku ?? "",
      intent: body.intent ?? "waitlist",
      source: body.source ?? "api",
      _subject: "Hydrate Hit waitlist",
    }),
  });
  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "Waitlist provider dropped it." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
