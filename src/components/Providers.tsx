"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_FLAVOUR,
  FLAVOURS,
  productBySku,
  subscribePrice,
  type Flavour,
  type FlavourSlug,
  type SkuId,
} from "@/lib/products";

export type CartLine = {
  sku: SkuId;
  qty: number;
  subscribe: boolean;
};

type CartContextValue = {
  lines: CartLine[];
  add: (sku: SkuId, qty?: number, subscribe?: boolean) => void;
  setQty: (sku: SkuId, subscribe: boolean, qty: number) => void;
  remove: (sku: SkuId, subscribe: boolean) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

type FlavourContextValue = {
  flavour: Flavour;
  setSlug: (slug: FlavourSlug) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const FlavourContext = createContext<FlavourContextValue | null>(null);

const CART_KEY = "hydrate-hit-cart";

export function Providers({ children }: { children: ReactNode }) {
  const [slug, setSlug] = useState<FlavourSlug>(DEFAULT_FLAVOUR);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* stub cart */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const add = useCallback((sku: SkuId, qty = 1, subscribe = false) => {
    setLines((current) => {
      const match = current.find((l) => l.sku === sku && l.subscribe === subscribe);
      if (match) {
        return current.map((l) =>
          l.sku === sku && l.subscribe === subscribe ? { ...l, qty: l.qty + qty } : l,
        );
      }
      return [...current, { sku, qty, subscribe }];
    });
  }, []);

  const setQty = useCallback((sku: SkuId, subscribe: boolean, qty: number) => {
    setLines((current) =>
      qty <= 0
        ? current.filter((l) => !(l.sku === sku && l.subscribe === subscribe))
        : current.map((l) =>
            l.sku === sku && l.subscribe === subscribe ? { ...l, qty } : l,
          ),
    );
  }, []);

  const remove = useCallback((sku: SkuId, subscribe: boolean) => {
    setLines((current) =>
      current.filter((l) => !(l.sku === sku && l.subscribe === subscribe)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);
  const subtotal = useMemo(
    () =>
      lines.reduce((n, l) => {
        const price = productBySku(l.sku).priceGbp;
        return n + (l.subscribe ? subscribePrice(price) : price) * l.qty;
      }, 0),
    [lines],
  );

  const flavour = FLAVOURS.find((f) => f.slug === slug) ?? FLAVOURS[2];

  return (
    <FlavourContext.Provider value={{ flavour, setSlug }}>
      <CartContext.Provider value={{ lines, add, setQty, remove, clear, count, subtotal }}>
        {children}
      </CartContext.Provider>
    </FlavourContext.Provider>
  );
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart outside Providers");
  return value;
}

export function useFlavour() {
  const value = useContext(FlavourContext);
  if (!value) throw new Error("useFlavour outside Providers");
  return value;
}
