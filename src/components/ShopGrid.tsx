"use client";

import { PRODUCTS, gbp, subscribePrice, type Product } from "@/lib/products";
import { useInterest } from "@/components/InterestModal";
import { AddCanButton, SubscribeButton } from "@/components/Ctas";
import { AssetImage } from "@/components/AssetImage";

export function ShopGrid({ products }: { products: Product[] }) {
  const { openInterest } = useInterest();
  const list = products.length ? products : PRODUCTS;

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((product) => (
        <article key={product.sku} className="rounded-2xl border border-line bg-paper p-4">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-bg">
            <AssetImage
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
          <h3 className="mt-4 text-lg font-semibold tracking-tight">{product.name}</h3>
          <p className="text-sm text-ink-soft">{product.detail}</p>
          <p className="mt-2 font-medium">{gbp(product.priceGbp)}</p>
          <div className="mt-4 flex flex-col gap-2">
            <AddCanButton
              onClick={() =>
                openInterest({
                  sku: product.sku,
                  flavour: product.flavours.length === 1 ? product.flavours[0] : undefined,
                  intent: "add",
                  source: "shop-grid",
                })
              }
            >
              Add · {gbp(product.priceGbp)}
            </AddCanButton>
            <SubscribeButton
              onClick={() =>
                openInterest({
                  sku: product.sku,
                  flavour: product.flavours.length === 1 ? product.flavours[0] : undefined,
                  intent: "subscribe",
                  source: "shop-grid",
                })
              }
            >
              Subscribe · {gbp(subscribePrice(product.priceGbp))}
            </SubscribeButton>
          </div>
        </article>
      ))}
    </div>
  );
}
