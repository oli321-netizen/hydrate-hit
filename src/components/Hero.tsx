"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { CAN_LINE, TAGLINE } from "@/lib/site";
import { FLAVOURS, PRICE, gbp, subscribePrice } from "@/lib/products";
import { useFlavour } from "@/components/Providers";
import { usePrefersReducedMotion } from "@/lib/motion";
import { FlavourName, ProofStrip } from "@/components/Brand";
import { ShopCta, WaitlistCta } from "@/components/Ctas";

const TinScene = dynamic(
  () => import("@/components/TinScene").then((mod) => mod.TinScene),
  { ssr: false },
);

export function Hero() {
  const { flavour, setSlug } = useFlavour();
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-20 md:px-8 md:pb-16 md:pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-6 md:grid-cols-2 md:gap-10">
        <div className="order-2 md:order-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
            Hydrate Hit
          </p>
          <h1 className="mt-3 max-w-[14ch] text-4xl font-semibold leading-[0.95] tracking-tighter text-ink md:text-6xl">
            {TAGLINE}
          </h1>
          <p className="mt-4 max-w-[36ch] text-base leading-relaxed text-ink-soft">
            {CAN_LINE}. Twenty pouches. No nicotine.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ShopCta href="/#shop" />
            <WaitlistCta />
          </div>
          <p className="mt-6 font-mono text-xs text-muted">
            From {gbp(subscribePrice(PRICE.single))} on subscribe, or {gbp(PRICE.single)} a can.
          </p>
        </div>

        <div className="order-1 md:order-2">
          <div className="relative mx-auto aspect-square w-full max-w-[34rem] md:max-w-none">
            <Image
              src={flavour.heroSrc}
              alt={`${flavour.name} Hydrate Hit tin`}
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
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
                    <Image src={item.lidSrc} alt="" fill className="object-cover" sizes="48px" />
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
