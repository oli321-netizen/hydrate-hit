"use client";

import Link from "next/link";
import { FLAVOURS } from "@/lib/products";
import { SITE_NAME } from "@/lib/site";
import { useFlavour } from "@/components/Providers";
import { AssetImage } from "@/components/AssetImage";
import { FlavourName } from "@/components/Brand";
import { WaitlistCta } from "@/components/Ctas";

export function FlavourPreview() {
  const { setSlug } = useFlavour();

  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl font-semibold tracking-tighter md:text-6xl">
          Five tins.
        </h2>
        <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-ink-soft">
          Frost Mint, Citrus Ice, Blue Razz, Peach Ice, Cherry Ice. The line
          lives on the shop page. This is just a look.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4 sm:justify-start">
          {FLAVOURS.map((flavour) => (
            <Link
              key={flavour.slug}
              href="/shop"
              onClick={() => setSlug(flavour.slug)}
              className="flex w-[5.5rem] flex-col items-center gap-2 sm:w-24"
            >
              <span className="relative h-20 w-20 overflow-hidden rounded-full border border-line bg-paper sm:h-24 sm:w-24">
                <AssetImage src={flavour.lidSrc} alt={`${flavour.name} ${SITE_NAME} lid`} fill className="object-cover" />
              </span>
              <FlavourName
                flavour={flavour}
                className="text-center text-[11px] font-extrabold tracking-tight sm:text-xs"
              />
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <WaitlistCta href="/shop">See flavours</WaitlistCta>
        </div>
      </div>
    </section>
  );
}
