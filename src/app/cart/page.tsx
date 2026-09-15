"use client";

import Link from "next/link";
import { useState } from "react";
import { gbp, productBySku, subscribePrice } from "@/lib/products";
import { useCart } from "@/components/Providers";
import { CheckoutButton } from "@/components/Ctas";

export default function CartPage() {
  const { lines, setQty, remove, subtotal, clear } = useCart();
  const [note, setNote] = useState("");

  return (
    <main className="px-4 pb-16 pt-24 md:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tighter md:text-6xl">Cart</h1>
        <p className="mt-3 text-sm text-ink-soft">
          Stub checkout. Totals are real. Payment is not live yet.
        </p>
        {lines.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-line p-8">
            <p className="text-ink-soft">Cart is empty.</p>
            <Link href="/shop" className="mt-4 inline-block text-sm font-semibold underline">
              Shop
            </Link>
          </div>
        ) : (
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {lines.map((line) => {
              const product = productBySku(line.sku);
              const unit = line.subscribe
                ? subscribePrice(product.priceGbp)
                : product.priceGbp;
              return (
                <li key={`${line.sku}-${line.subscribe}`} className="flex items-start justify-between gap-4 py-5">
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-muted">
                      {line.subscribe ? "Subscribe (20% off)" : "One-time"} · {gbp(unit)}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        className="h-8 w-8 rounded-lg border border-line"
                        onClick={() => setQty(line.sku, line.subscribe, line.qty - 1)}
                        aria-label="Decrease"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm">{line.qty}</span>
                      <button
                        type="button"
                        className="h-8 w-8 rounded-lg border border-line"
                        onClick={() => setQty(line.sku, line.subscribe, line.qty + 1)}
                        aria-label="Increase"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="ml-2 text-xs text-muted underline"
                        onClick={() => remove(line.sku, line.subscribe)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="font-medium">{gbp(unit * line.qty)}</p>
                </li>
              );
            })}
          </ul>
        )}
        {lines.length > 0 ? (
          <div className="mt-8">
            <p className="flex justify-between text-lg font-semibold">
              <span>Subtotal</span>
              <span>{gbp(subtotal)}</span>
            </p>
            <p className="mt-1 text-xs text-muted">GBP only. Shipping calculated at first drop.</p>
            <CheckoutButton
              className="mt-6"
              onClick={() => {
                setNote("Checkout is stubbed. Join the waitlist and we will take the order for real.");
              }}
            />
            <button type="button" onClick={clear} className="mt-3 text-xs text-muted underline">
              Clear cart
            </button>
            {note ? <p className="mt-4 text-sm text-ink-soft">{note}</p> : null}
            <Link href="/waitlist" className="mt-4 block text-sm font-semibold underline">
              Join waitlist
            </Link>
          </div>
        ) : null}
      </div>
    </main>
  );
}
