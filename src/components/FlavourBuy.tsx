"use client";

import { PRICE, gbp, subscribePrice, type FlavourSlug } from "@/lib/products";
import { useFlavour } from "@/components/Providers";
import { useInterest } from "@/components/InterestModal";
import { AddCanButton, SubscribeButton } from "@/components/Ctas";
import { useEffect } from "react";

export function FlavourBuy({ slug, accent }: { slug: FlavourSlug; accent: string }) {
  const { setSlug } = useFlavour();
  const { openInterest } = useInterest();

  useEffect(() => {
    setSlug(slug);
  }, [setSlug, slug]);

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <AddCanButton
        accent={accent}
        onClick={() =>
          openInterest({ flavour: slug, sku: slug, intent: "add", source: "flavour-page" })
        }
      >
        Add can · {gbp(PRICE.single)}
      </AddCanButton>
      <SubscribeButton
        onClick={() =>
          openInterest({
            flavour: slug,
            sku: slug,
            intent: "subscribe",
            source: "flavour-page",
          })
        }
      >
        Subscribe · {gbp(subscribePrice(PRICE.single))}
      </SubscribeButton>
    </div>
  );
}
