import { asset } from "@/lib/site";

export type WaitlistPayload = {
  email: string;
  flavour?: string;
  sku?: string;
  intent?: "add" | "subscribe" | "waitlist";
  source?: string;
};

function trimId(value: string) {
  return value.replace(/^https?:\/\/(formspree\.io\/f\/|getform\.io\/f\/)/, "").replace(/^\/+|\/+$/g, "");
}

/** Public form URL. Set NEXT_PUBLIC_WAITLIST_ENDPOINT or a Formspree/Getform id. */
export function waitlistEndpoint() {
  const full = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT?.trim();
  if (full) return full;
  const formspree = process.env.NEXT_PUBLIC_FORMSPREE_ID?.trim();
  if (formspree) return `https://formspree.io/f/${trimId(formspree)}`;
  const getform = process.env.NEXT_PUBLIC_GETFORM_ID?.trim();
  if (getform) return `https://getform.io/f/${trimId(getform)}`;
  return "";
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export async function submitWaitlist(payload: WaitlistPayload) {
  const email = payload.email.trim().toLowerCase();
  if (!isEmail(email)) {
    return { ok: false as const, error: "That does not look like an email." };
  }

  const body = {
    email,
    flavour: payload.flavour ?? "",
    sku: payload.sku ?? "",
    intent: payload.intent ?? "waitlist",
    source: payload.source ?? "site",
    _subject: "Hydrate Hit waitlist",
  };

  const endpoint = waitlistEndpoint();
  const url = endpoint || asset("/api/waitlist");

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.ok) return { ok: true as const };
    if (res.status === 404 && !endpoint) {
      return {
        ok: false as const,
        error: "Waitlist endpoint is not configured. Add WAITLIST_ENDPOINT — see README.",
      };
    }
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    return {
      ok: false as const,
      error: data.error ?? "That email did not take. Try again.",
    };
  } catch {
    return { ok: false as const, error: "Network dropped. Try again." };
  }
}
