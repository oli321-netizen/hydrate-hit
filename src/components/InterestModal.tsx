"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react";
import { WaitlistForm } from "@/components/WaitlistForm";
import type { WaitlistPayload } from "@/lib/waitlist";

export type InterestOpen = Pick<WaitlistPayload, "flavour" | "sku" | "intent" | "source">;

type InterestContextValue = {
  openInterest: (meta?: InterestOpen) => void;
};

const InterestContext = createContext<InterestContextValue | null>(null);

export function InterestProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [meta, setMeta] = useState<InterestOpen>({});
  const titleId = useId();

  const openInterest = useCallback((next?: InterestOpen) => {
    setMeta(next ?? {});
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <InterestContext.Provider value={{ openInterest }}>
      {children}
      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6">
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-zinc-950/45"
            onClick={close}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-md rounded-2xl bg-[#fafafa] p-6 text-[#18181b] shadow-2xl interest-in sm:p-8"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 text-sm font-medium text-[#71717a] hover:text-[#18181b]"
            >
              Close
            </button>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#71717a]">
              First drop
            </p>
            <h2 id={titleId} className="mt-2 text-3xl font-semibold tracking-tight">
              Get priority delivery
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#3f3f46]">
              Cans are not for sale yet. Register interest now and you ship first
              when the drop goes out.
            </p>
            <WaitlistForm
              compact
              className="mt-6"
              idPrefix="interest"
              submitLabel="Get priority access"
              meta={meta}
              successMessage="You are on the list for priority delivery. We email when the first drop ships."
            />
          </div>
        </div>
      ) : null}
    </InterestContext.Provider>
  );
}

export function useInterest() {
  const value = useContext(InterestContext);
  if (!value) throw new Error("useInterest outside InterestProvider");
  return value;
}
