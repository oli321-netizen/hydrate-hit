"use client";

import Link from "next/link";
import { LAUNCH_FLAVOURS, SECONDARY_FLAVOURS } from "@/lib/products";
import { useFlavour } from "@/components/Providers";
import { AssetImage } from "@/components/AssetImage";
import { FlavourName } from "@/components/Brand";
import { WaitlistCta } from "@/components/Ctas";
import { brandAlt } from "@/lib/site";

export function FlavourPreview() {
  const { setSlug } = useFlavour();

  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl font-semibold tracking-tighter md:text-6xl">
          Three tins.
        </h2>
        <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-ink-soft">
          Frost Mint, Citrus Ice, Blue Razz. The launch line. Peach Ice and
          Cherry Ice follow.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4 sm:justify-start">
          {LAUNCH_FLAVOURS.map((flavour) => (
            <Link
              key={flavour.slug}
              href="/shop"
              onClick={() => setSlug(flavour.slug)}
              className="flex w-[5.5rem] flex-col items-center gap-2 sm:w-24"
            >
              <span className="relative h-20 w-20 overflow-hidden rounded-full border border-line bg-paper sm:h-24 sm:w-24">
                <AssetImage src={flavour.lidSrc} alt={brandAlt(`${flavour.name} lid`)} fill className="object-cover" />
              </span>
              <FlavourName
                flavour={flavour}
                className="text-center text-[11px] font-extrabold tracking-tight sm:text-xs"
              />
            </Link>
          ))}
        </div>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Coming soon · {SECONDARY_FLAVOURS.map((f) => f.name).join(" · ")}
        </p>
        <div className="mt-4">
          <WaitlistCta href="/shop">See flavours</WaitlistCta>
        </div>
      </div>
    </section>
  );
}
