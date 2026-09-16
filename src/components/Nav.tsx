"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE_MARK } from "@/lib/site";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/#stack", label: "Stack" },
  { href: "/shop", label: "Shop" },
  { href: "/#waitlist", label: "Waitlist" },
] as const;

function isCurrent(href: string, path: string) {
  if (href === "/") return path === "/";
  if (href === "/shop") return path === "/shop" || path.startsWith("/flavours");
  return false;
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <header className="hh-nav fixed inset-x-0 top-0 z-40 h-16 border-b border-line/70 bg-[color-mix(in_srgb,var(--bg)_88%,white)] backdrop-blur-md md:h-[72px]">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="text-[15px] font-extrabold tracking-tight text-ink">
          {SITE_MARK}
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-ink-soft md:flex">
          {LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isCurrent(item.href, path) ? "text-ink" : "hover:text-ink"}
            >
              {item.label}
            </Link>
          ))}
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
            {LINKS.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
