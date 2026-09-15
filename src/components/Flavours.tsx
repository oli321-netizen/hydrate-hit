"use client";

import Image from "next/image";
import Link from "next/link";
import { FLAVOURS, PRICE, gbp, subscribePrice } from "@/lib/products";
import { useCart, useFlavour } from "@/components/Providers";
import { AccentLine, CrystalMark, FlavourName, ProofStrip } from "@/components/Brand";
import { AddCanButton, PackCta, SubscribeButton } from "@/components/Ctas";

export function Flavours() {
  const { add } = useCart();
  const { setSlug } = useFlavour();

  return (
    <section id="shop" className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl font-semibold tracking-tighter md:text-6xl">
          Five tins. One stack.
        </h2>
        <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-ink-soft">
          Dual-tone names, crystal mark, accent-lined tagline. The Blue Razz
          system, applied across the line.
        </p>

        <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
          {FLAVOURS.map((flavour) => (
            <article
              key={flavour.slug}
              className="min-w-[78%] snap-start rounded-2xl border border-line bg-paper p-4 sm:min-w-[18rem] md:min-w-0"
            >
              <Link
                href={`/flavours/${flavour.slug}`}
                onClick={() => setSlug(flavour.slug)}
                className="block"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-bg">
                  <Image
                    src={flavour.heroSrc}
                    alt={`${flavour.name} tin`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 80vw, 20vw"
                  />
                  <CrystalMark
                    a={flavour.crystal[0]}
                    b={flavour.crystal[1]}
                    className="absolute bottom-3 right-3 h-8 w-8"
                  />
                </div>
                <FlavourName
                  flavour={flavour}
                  className="mt-4 block text-lg font-extrabold tracking-tight"
                />
                <AccentLine flavour={flavour} />
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{flavour.blurb}</p>
                <ProofStrip className="mt-3" />
              </Link>
              <div className="mt-4 flex flex-col gap-2">
                <AddCanButton
                  accent={flavour.toneA}
                  onClick={() => {
                    setSlug(flavour.slug);
                    add(flavour.slug);
                  }}
                >
                  Add can · {gbp(PRICE.single)}
                </AddCanButton>
                <SubscribeButton
                  onClick={() => {
                    setSlug(flavour.slug);
                    add(flavour.slug, 1, true);
                  }}
                >
                  Subscribe · {gbp(subscribePrice(PRICE.single))}
                </SubscribeButton>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 rounded-2xl bg-ink px-5 py-8 text-paper md:grid-cols-[1.2fr_1fr] md:items-center md:px-10">
          <div>
            <h3 className="text-3xl font-semibold tracking-tight">Bundles, priced in pounds.</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li>Single can, 20 pouches: {gbp(PRICE.single)}</li>
              <li>3-can variety (Frost Mint, Citrus Ice, Blue Razz): {gbp(PRICE.variety3)}</li>
              <li>5-pack, all five: {gbp(PRICE.pack5)}</li>
              <li>Subscribe and save 20% on any of the above.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <AddCanButton
                accent="#d63d8c"
                className="bg-white"
                onClick={() => add("variety-3")}
              >
                Add 3-can · {gbp(PRICE.variety3)}
              </AddCanButton>
              <SubscribeButton
                className="border-white/30 text-zinc-200 hover:border-white hover:text-white"
                onClick={() => add("variety-3", 1, true)}
              >
                Subscribe 3-can · {gbp(subscribePrice(PRICE.variety3))}
              </SubscribeButton>
            </div>
          </div>
          <div className="relative min-h-52 overflow-hidden rounded-2xl bg-zinc-800">
            <Image
              src="/tins/five-pack.jpg"
              alt="Hydrate Hit 5-pack sleeve"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div className="md:col-span-2">
            <PackCta href="/shop">Shop the 5-pack</PackCta>
            <button
              type="button"
              onClick={() => add("pack-5")}
              className="ml-4 text-sm font-medium text-zinc-300 underline-offset-4 hover:text-white hover:underline"
            >
              Add 5-pack · {gbp(PRICE.pack5)}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
