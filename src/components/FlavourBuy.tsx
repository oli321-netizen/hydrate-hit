"use client";

import { PRICE, gbp, subscribePrice, type FlavourSlug } from "@/lib/products";
import { useCart, useFlavour } from "@/components/Providers";
import { AddCanButton, SubscribeButton } from "@/components/Ctas";
import { useEffect } from "react";

export function FlavourBuy({ slug, accent }: { slug: FlavourSlug; accent: string }) {
  const { add } = useCart();
  const { setSlug } = useFlavour();

  useEffect(() => {
    setSlug(slug);
  }, [setSlug, slug]);

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <AddCanButton accent={accent} onClick={() => add(slug)}>
        Add can · {gbp(PRICE.single)}
      </AddCanButton>
      <SubscribeButton onClick={() => add(slug, 1, true)}>
        Subscribe · {gbp(subscribePrice(PRICE.single))}
      </SubscribeButton>
    </div>
  );
}
