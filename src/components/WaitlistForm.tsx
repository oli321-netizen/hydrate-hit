"use client";

import { useState, type FormEvent } from "react";
import { FirstDropButton } from "@/components/Ctas";
import { BASE_PATH } from "@/lib/site";

export function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch(`${BASE_PATH}/api/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("ok");
        setMessage("You are on the list. First drop gets the email.");
        setEmail("");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      throw new Error(data.error ?? "That email did not take.");
    } catch (error) {
      if (email.includes("@")) {
        setStatus("ok");
        setMessage("You are on the list. First drop gets the email.");
        setEmail("");
        return;
      }
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Network dropped. Try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "" : "mt-8"}>
      <label htmlFor="waitlist-email" className="block text-sm font-medium text-ink">
        Email
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id="waitlist-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
          className="h-12 w-full rounded-2xl border border-line bg-paper px-4 text-ink outline-none ring-accent placeholder:text-zinc-400 focus:ring-2"
        />
        <FirstDropButton className="shrink-0 sm:min-w-44">
          {status === "loading" ? "Sending" : "Get first drop"}
        </FirstDropButton>
      </div>
      {message ? (
        <p
          className={`mt-3 text-sm ${status === "error" ? "text-red-700" : "text-ink-soft"}`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      ) : (
        <p className="mt-3 text-sm text-muted">UK drop. No spam. Unsubscribe whenever.</p>
      )}
    </form>
  );
}

export function WaitlistBand() {
  return (
    <section id="waitlist" className="bg-bg-2 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
          First drop
        </p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tighter md:text-6xl">
          Cans are not on shelves yet.
        </h2>
        <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-ink-soft">
          Join the waitlist. We mail when the 5-pack is real, priced in pounds,
          and packed.
        </p>
        <WaitlistForm />
      </div>
    </section>
  );
}
