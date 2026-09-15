"use client";

import { usePathname } from "next/navigation";
import { FLAVOURS, PRICE, gbp, subscribePrice } from "@/lib/products";
import { useCart, useFlavour } from "@/components/Providers";
import { StickyAddButton } from "@/components/Ctas";

export function BuyBar() {
  const path = usePathname();
  const { flavour, setSlug } = useFlavour();
  const { add, count } = useCart();

  if (path === "/cart") return null;

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
        <StickyAddButton onClick={() => add(flavour.slug)}>
          Add {gbp(PRICE.single)}
        </StickyAddButton>
      </div>
      <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-wider text-muted">
        Subscribe {gbp(subscribePrice(PRICE.single))}
        {count > 0 ? ` · Cart ${count}` : ""}
      </p>
    </div>
  );
}
