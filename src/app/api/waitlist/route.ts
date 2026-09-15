import { NextResponse } from "next/server";
import { isEmail, waitlistEndpoint, type WaitlistPayload } from "@/lib/waitlist";
import { storageBackend, storeWaitlist } from "@/lib/waitlist-store";

export const runtime = "nodejs";

async function forwardOptional(payload: WaitlistPayload) {
  const dest = process.env.WAITLIST_FORWARD_ENDPOINT || waitlistEndpoint();
  if (!dest) return;
  await fetch(dest, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: payload.email,
      flavour: payload.flavour ?? "",
      sku: payload.sku ?? "",
      intent: payload.intent ?? "waitlist",
      source: payload.source ?? "api",
      _subject: "Hydrate Hit waitlist",
    }),
  }).catch(() => undefined);
}

/** Probe which store the live service will use (no writes). */
export async function GET() {
  return NextResponse.json({ ok: true, storage: storageBackend() });
}

export async function POST(request: Request) {
  let body: {
    email?: string;
    flavour?: string;
    sku?: string;
    intent?: WaitlistPayload["intent"];
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

  const payload: WaitlistPayload = {
    email,
    flavour: body.flavour,
    sku: body.sku,
    intent: body.intent ?? "waitlist",
    source: body.source ?? "api",
  };

  await storeWaitlist(payload);
  await forwardOptional(payload);

  return NextResponse.json({ ok: true, storage: storageBackend() });
}
