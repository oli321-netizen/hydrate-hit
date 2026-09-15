import type { Metadata } from "next";
import Image from "next/image";
import { FLAVOURS, PRICE, PRODUCTS, gbp, subscribePrice } from "@/lib/products";
import { ShopGrid } from "@/components/ShopGrid";

export const metadata: Metadata = {
  title: "Shop",
  description: "Hydrate Hit cans and packs in pounds. Single, 3-can variety, 5-pack. Subscribe and save 20%.",
};

export default function ShopPage() {
  const singles = PRODUCTS.filter((p) => FLAVOURS.some((f) => f.slug === p.sku));
  const packs = PRODUCTS.filter((p) => p.sku === "variety-3" || p.sku === "pack-5");

  return (
    <main className="px-4 pb-28 pt-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-semibold tracking-tighter md:text-6xl">Shop</h1>
        <p className="mt-3 max-w-[50ch] text-base leading-relaxed text-ink-soft">
          Single can {gbp(PRICE.single)}. 3-can variety {gbp(PRICE.variety3)}. 5-pack{" "}
          {gbp(PRICE.pack5)}. Subscribe and save 20%.
        </p>
        <h2 className="mt-12 text-2xl font-semibold tracking-tight">Cans</h2>
        <ShopGrid products={singles} />
        <h2 className="mt-14 text-2xl font-semibold tracking-tight">Packs</h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-line">
          <div className="relative h-52 bg-bg md:h-72">
            <Image
              src="/tins/five-pack.jpg"
              alt="Hydrate Hit 5-pack"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
        <ShopGrid products={packs} />
        <p className="mt-8 font-mono text-xs text-muted">
          Subscribe prices: can {gbp(subscribePrice(PRICE.single))}, variety{" "}
          {gbp(subscribePrice(PRICE.variety3))}, 5-pack {gbp(subscribePrice(PRICE.pack5))}.
        </p>
      </div>
    </main>
  );
}
