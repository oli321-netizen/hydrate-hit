"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/site";
import type { MaintenanceState } from "@/lib/maintenance";

const POLL_MS = 45_000;

type BannerState = Pick<MaintenanceState, "enabled" | "message" | "lockdown">;

export function MaintenanceBanner() {
  const [state, setState] = useState<BannerState | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const enabled = Boolean(state?.enabled);
  const lockdown = Boolean(state?.lockdown);
  const message = state?.message ?? "";

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(asset("/api/maintenance"), { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as BannerState;
        if (!cancelled) setState(data);
      } catch {
        // Static Pages export has no API route — stay hidden.
      }
    }

    void load();
    const id = window.setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!enabled) {
      root.style.removeProperty("--hh-banner-h");
      root.classList.remove("hh-maintenance", "hh-maintenance-lockdown");
      return;
    }

    root.classList.add("hh-maintenance");
    root.classList.toggle("hh-maintenance-lockdown", lockdown);

    const el = barRef.current;
    if (!el) return;

    const apply = () => {
      root.style.setProperty("--hh-banner-h", `${el.offsetHeight}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    window.addEventListener("resize", apply);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
      root.style.removeProperty("--hh-banner-h");
      root.classList.remove("hh-maintenance", "hh-maintenance-lockdown");
    };
  }, [enabled, lockdown, message]);

  if (!enabled) return null;

  return (
    <div
      ref={barRef}
      className="hh-maintenance-banner fixed inset-x-0 top-0 z-[45]"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className="h-[3px] bg-gradient-to-r from-accent to-accent-2"
        aria-hidden
      />
      <div className="bg-ink px-3 py-2.5 pt-[max(0.625rem,env(safe-area-inset-top))] text-center md:px-6">
        <p className="mx-auto max-w-4xl text-[13px] font-medium leading-snug text-white md:text-sm">
          {message}
        </p>
      </div>
    </div>
  );
}
