"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FLAVOURS, PRICE, gbp } from "@/lib/products";
import { useFlavour } from "@/components/Providers";
import { useInterest } from "@/components/InterestModal";
import { StickyAddButton } from "@/components/Ctas";

function isHome(path: string) {
  return path === "/" || path === "";
}

function isQuiet(path: string) {
  const p = path.replace(/\/$/, "") || "/";
  return (
    p === "/cart" ||
    p === "/waitlist" ||
    p === "/nicotine-free-pouches" ||
    p === "/snus-alternative" ||
    p === "/electrolyte-pouches" ||
    p.startsWith("/guides")
  );
}

export function BuyBar() {
  const path = usePathname();
  const { flavour, setSlug } = useFlavour();
  const { openInterest } = useInterest();

  if (isQuiet(path)) return null;

  if (isHome(path)) {
    return (
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-[color-mix(in_srgb,var(--bg)_92%,white)] px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
        <Link
          href="/#waitlist"
          className="flex h-11 w-full items-center justify-center rounded-2xl border border-[#d4d4d8] text-sm font-semibold"
          style={{ backgroundColor: "#fafafa", color: "#18181b" }}
        >
          Register interest
        </Link>
      </div>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-[color-mix(in_srgb,var(--bg)_92%,white)] px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <div className="flex items-center gap-2">
        <label className="sr-only" htmlFor="buybar-flavour">
          Flavour
        </label>
        <select
          id="buybar-flavour"
          value={flavour.slug}
          onChange={(e) => setSlug(e.target.value as (typeof FLAVOURS)[number]["slug"])}
          className="h-11 min-w-0 flex-1 rounded-2xl border border-line bg-paper px-3 text-sm"
        >
          {FLAVOURS.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
        <StickyAddButton
          onClick={() =>
            openInterest({
              flavour: flavour.slug,
              sku: flavour.slug,
              intent: "add",
              source: "buy-bar",
            })
          }
        >
          Get priority
        </StickyAddButton>
      </div>
      <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-wider text-muted">
        From {gbp(PRICE.single)} · priority delivery on first drop
      </p>
    </div>
  );
}
