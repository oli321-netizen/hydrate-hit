"use client";

import Link from "next/link";
import { FLAVOURS, PRICE, gbp, subscribePrice } from "@/lib/products";
import { SITE_NAME } from "@/lib/site";
import { useFlavour } from "@/components/Providers";
import { useInterest } from "@/components/InterestModal";
import { AccentLine, CrystalMark, FlavourName, ProofStrip } from "@/components/Brand";
import { AddCanButton, SubscribeButton } from "@/components/Ctas";
import { AssetImage } from "@/components/AssetImage";

export function Flavours() {
  const { setSlug } = useFlavour();
  const { openInterest } = useInterest();

  return (
    <section id="shop" className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl font-semibold tracking-tighter md:text-6xl">
          The line.
        </h2>
        <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-ink-soft">
          Dual-tone names, crystal mark, accent-lined tagline. The Blue Razz
          system, applied across the line. Register interest for priority
          delivery on the first drop.
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
                  <AssetImage
                    src={flavour.heroSrc}
                    alt={`${flavour.name} ${SITE_NAME} tin`}
                    fill
                    className="object-contain"
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
                    openInterest({
                      flavour: flavour.slug,
                      sku: flavour.slug,
                      intent: "add",
                      source: "flavour-card",
                    });
                  }}
                >
                  Add can · {gbp(PRICE.single)}
                </AddCanButton>
                <SubscribeButton
                  onClick={() => {
                    setSlug(flavour.slug);
                    openInterest({
                      flavour: flavour.slug,
                      sku: flavour.slug,
                      intent: "subscribe",
                      source: "flavour-card",
                    });
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
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <AddCanButton
                  accent="#d63d8c"
                  className="w-full sm:w-auto"
                  onClick={() =>
                    openInterest({
                      sku: "variety-3",
                      intent: "add",
                      source: "bundle",
                    })
                  }
                >
                  Add 3-can · {gbp(PRICE.variety3)}
                </AddCanButton>
                <SubscribeButton
                  onDark
                  className="w-full sm:w-auto"
                  onClick={() =>
                    openInterest({
                      sku: "variety-3",
                      intent: "subscribe",
                      source: "bundle",
                    })
                  }
                >
                  Subscribe 3-can · {gbp(subscribePrice(PRICE.variety3))}
                </SubscribeButton>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <AddCanButton
                  accent="#1f6fe5"
                  className="w-full sm:w-auto"
                  onClick={() =>
                    openInterest({
                      sku: "pack-5",
                      intent: "add",
                      source: "bundle",
                    })
                  }
                >
                  Add 5-pack · {gbp(PRICE.pack5)}
                </AddCanButton>
                <SubscribeButton
                  onDark
                  className="w-full sm:w-auto"
                  onClick={() =>
                    openInterest({
                      sku: "pack-5",
                      intent: "subscribe",
                      source: "bundle",
                    })
                  }
                >
                  Subscribe 5-pack · {gbp(subscribePrice(PRICE.pack5))}
                </SubscribeButton>
              </div>
            </div>
          </div>
          <div className="relative min-h-52 overflow-hidden rounded-2xl bg-zinc-800">
            <AssetImage
              src="/tins/five-pack.jpg"
              alt={`${SITE_NAME} 5-pack sleeve`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
