"use client";

import Link from "next/link";
import { useState } from "react";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-line/70 bg-[color-mix(in_srgb,var(--bg)_88%,white)] backdrop-blur-md md:h-[72px]">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="text-[15px] font-extrabold tracking-tight text-ink">
          HYDRATE HIT
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-ink-soft md:flex">
          <Link href="/#stack" className="hover:text-ink">
            Stack
          </Link>
          <Link href="/#shop" className="hover:text-ink">
            Flavours
          </Link>
          <Link href="/#faq" className="hover:text-ink">
            FAQ
          </Link>
          <Link href="/#waitlist" className="text-ink">
            Waitlist
          </Link>
        </nav>
        <button
          type="button"
          className="md:hidden"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-5 bg-ink" />
          <span className="mt-1.5 block h-0.5 w-5 bg-ink" />
        </button>
      </div>
      {open ? (
        <div className="border-b border-line bg-bg px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium">
            <Link href="/#stack" onClick={() => setOpen(false)}>
              Stack
            </Link>
            <Link href="/#shop" onClick={() => setOpen(false)}>
              Flavours
            </Link>
            <Link href="/#faq" onClick={() => setOpen(false)}>
              FAQ
            </Link>
            <Link href="/#waitlist" onClick={() => setOpen(false)}>
              Waitlist
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
