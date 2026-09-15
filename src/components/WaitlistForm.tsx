"use client";

import { useState, type FormEvent } from "react";
import { FirstDropButton } from "@/components/Ctas";
import { submitWaitlist, type WaitlistPayload } from "@/lib/waitlist";

export function WaitlistForm({
  compact = false,
  className,
  idPrefix = "waitlist",
  submitLabel = "Join waitlist",
  meta,
  successMessage = "You are on the list for priority delivery. We email when the first drop ships.",
}: {
  compact?: boolean;
  className?: string;
  idPrefix?: string;
  submitLabel?: string;
  meta?: Omit<WaitlistPayload, "email">;
  successMessage?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");
  const inputId = `${idPrefix}-email`;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const result = await submitWaitlist({
      email,
      flavour: meta?.flavour,
      sku: meta?.sku,
      intent: meta?.intent ?? "waitlist",
      source: meta?.source ?? idPrefix,
    });
    if (result.ok) {
      setStatus("ok");
      setMessage(successMessage);
      setEmail("");
      return;
    }
    setStatus("error");
    setMessage(result.error);
  }

  return (
    <form onSubmit={onSubmit} className={className ?? (compact ? "" : "mt-8")}>
      <label htmlFor={inputId} className="block text-sm font-medium text-[#18181b]">
        Email
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
          className="h-12 w-full rounded-2xl border border-[#d4d4d8] bg-[#fafafa] px-4 text-[#18181b] outline-none ring-[#1f6fe5] placeholder:text-zinc-400 focus:ring-2"
        />
        <FirstDropButton className="shrink-0 sm:min-w-44">
          {status === "loading" ? "Sending" : submitLabel}
        </FirstDropButton>
      </div>
      {message ? (
        <p
          className={`mt-3 text-sm ${status === "error" ? "text-red-700" : "text-[#3f3f46]"}`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      ) : (
        <p className="mt-3 text-sm text-[#71717a]">
          Join now for priority delivery. UK drop. No spam.
        </p>
      )}
    </form>
  );
}

export function WaitlistBand() {
  return (
    <section id="waitlist" className="relative z-[35] bg-bg-2 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
          First drop
        </p>
        <h2 className="mt-3 text-4xl font-semibold tracking-tighter md:text-6xl">
          Register interest. Ship first.
        </h2>
        <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-ink-soft">
          Cans are not on shelves yet. Join now and you get priority delivery
          when the first drop ships.
        </p>
        <WaitlistForm meta={{ source: "waitlist-band" }} />
      </div>
    </section>
  );
}
