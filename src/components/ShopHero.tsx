"use client";

import dynamic from "next/dynamic";
import { AssetImage } from "@/components/AssetImage";
import { CAN_LINE } from "@/lib/site";
import { FLAVOURS, PRICE, gbp } from "@/lib/products";
import { useFlavour } from "@/components/Providers";
import { usePrefersReducedMotion } from "@/lib/motion";
import { FlavourName, ProofStrip } from "@/components/Brand";
import { StickyAddButton, WaitlistCta } from "@/components/Ctas";
import { useInterest } from "@/components/InterestModal";

const TinScene = dynamic(
  () => import("@/components/TinScene").then((mod) => mod.TinScene),
  { ssr: false },
);

export function ShopHero() {
  const { flavour, setSlug } = useFlavour();
  const reduced = usePrefersReducedMotion();
  const { openInterest } = useInterest();

  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-24 md:px-8 md:pb-16">
      <div className="mx-auto grid max-w-6xl items-center gap-6 md:grid-cols-2 md:gap-10">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
            Shop
          </p>
          <h1 className="mt-3 max-w-[12ch] text-4xl font-semibold leading-[0.95] tracking-tighter text-ink md:text-6xl">
            Five tins. One stack.
          </h1>
          <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-ink-soft">
            Single can {gbp(PRICE.single)}. 3-can variety {gbp(PRICE.variety3)}.
            5-pack {gbp(PRICE.pack5)}. Register interest for priority delivery —
            this is not checkout.
          </p>
          <p className="mt-3 font-mono text-xs text-muted">{CAN_LINE}. No nicotine.</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <StickyAddButton
              onClick={() =>
                openInterest({
                  flavour: flavour.slug,
                  sku: flavour.slug,
                  intent: "add",
                  source: "shop-hero",
                })
              }
            >
              Get priority
            </StickyAddButton>
            <WaitlistCta href="#waitlist">Join waitlist</WaitlistCta>
          </div>
        </div>

        <div>
          <div className="relative mx-auto aspect-square w-full max-w-[34rem] md:max-w-none">
            <AssetImage
              src={flavour.heroSrc}
              alt={`${flavour.name} Hydrate Hit tin`}
              fill
              className="object-contain"
            />
            {reduced ? null : (
              <div className="absolute inset-0">
                <TinScene flavour={flavour} />
              </div>
            )}
          </div>
          <div className="mt-2 flex flex-col items-center gap-3">
            <FlavourName
              flavour={flavour}
              className="text-2xl font-extrabold tracking-tight md:text-3xl"
            />
            <ProofStrip />
            <div className="flex flex-wrap justify-center gap-2">
              {FLAVOURS.map((item) => {
                const active = item.slug === flavour.slug;
                return (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => setSlug(item.slug)}
                    aria-pressed={active}
                    aria-label={item.name}
                    className="relative h-12 w-12 overflow-hidden rounded-full border bg-paper transition-transform active:scale-95"
                    style={{
                      borderColor: active ? item.toneA : "#d4d4d8",
                      boxShadow: active ? `0 0 0 2px ${item.toneA}` : undefined,
                    }}
                  >
                    <AssetImage src={item.lidSrc} alt={`${item.name} lid`} fill className="object-cover" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
