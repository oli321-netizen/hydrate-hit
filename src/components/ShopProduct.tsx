"use client";

import { useMemo, useState } from "react";
import { AssetImage } from "@/components/AssetImage";
import { CrystalMark, FlavourName, ProofStrip } from "@/components/Brand";
import { useInterest } from "@/components/InterestModal";
import { useFlavour } from "@/components/Providers";
import {
  DOSE,
  FLAVOURS,
  PRICE,
  gbp,
  gbpPerPouch,
  type FlavourSlug,
  type SkuId,
} from "@/lib/products";
import { CAN_LINE, SITE_NAME, TAGLINE, brandAlt } from "@/lib/site";

type BundleId = "single" | "variety-3" | "pack-5";

const BUNDLES: Array<{
  id: BundleId;
  sku: SkuId | "single";
  tins: number;
  pouches: number;
  price: number;
  title: string;
  detail: string;
  popular?: boolean;
}> = [
  {
    id: "variety-3",
    sku: "variety-3",
    tins: 3,
    pouches: 60,
    price: PRICE.variety3,
    title: "3-can variety",
    detail: "Frost Mint, Citrus Ice, Blue Razz",
    popular: true,
  },
  {
    id: "pack-5",
    sku: "pack-5",
    tins: 5,
    pouches: 100,
    price: PRICE.pack5,
    title: "5-pack",
    detail: "Launch three plus two coming soon",
  },
  {
    id: "single",
    sku: "single",
    tins: 1,
    pouches: 20,
    price: PRICE.single,
    title: "1 tin",
    detail: "20 pouches",
  },
];

const FEATURES = [
  { title: "Smooth hit", body: `${DOSE.caffeineMg} mg caffeine + ${DOSE.theanineMg} mg theanine.` },
  { title: "Light electrolytes", body: `${DOSE.sodiumMg} mg Na · ${DOSE.potassiumMg} mg K.` },
  { title: "Spit-free", body: "Upper lip and gum. Do not chew. 20–40 mins." },
  { title: "Zero nicotine", body: `Not snus. Max ${DOSE.maxPouchesPerDay} pouches a day.` },
];

export function ShopProduct() {
  const { flavour, setSlug } = useFlavour();
  const { openInterest } = useInterest();
  const [bundle, setBundle] = useState<BundleId>("variety-3");
  const [shot, setShot] = useState<"flavour" | "pack">("flavour");

  const main = useMemo(() => {
    if (bundle === "pack-5" || shot === "pack") {
      return { src: "/tins/five-pack.jpg", alt: brandAlt("5-pack") };
    }
    if (bundle === "variety-3") {
      return { src: "/tins/variety-3.jpg", alt: brandAlt("3-can variety") };
    }
    return { src: flavour.heroSrc, alt: brandAlt(flavour.name) };
  }, [bundle, flavour, shot]);

  function pickFlavour(slug: FlavourSlug) {
    setSlug(slug);
    setShot("flavour");
    if (bundle === "pack-5" || bundle === "variety-3") setBundle("single");
  }

  function pickBundle(id: BundleId) {
    setBundle(id);
    setShot(id === "pack-5" ? "pack" : "flavour");
  }

  function register() {
    const sku: SkuId = bundle === "single" ? flavour.slug : bundle;
    openInterest({
      flavour: bundle === "single" ? flavour.slug : undefined,
      sku,
      intent: "add",
      source: "shop-product",
    });
  }

  return (
    <section className="px-4 pb-8 pt-20 md:px-8 md:pb-16 md:pt-24">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-12">
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper sm:aspect-square">
            <AssetImage src={main.src} alt={main.alt} fill className="object-contain p-4" />
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {FLAVOURS.map((item) => {
              const active = shot === "flavour" && flavour.slug === item.slug && bundle === "single";
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => pickFlavour(item.slug)}
                  aria-label={item.comingSoon ? `${item.name} (coming soon)` : item.name}
                  aria-pressed={active}
                  className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border bg-paper"
                  style={{
                    borderColor: active ? item.toneA : "#d4d4d8",
                    boxShadow: active ? `0 0 0 2px ${item.toneA}` : undefined,
                    opacity: item.comingSoon ? 0.72 : 1,
                  }}
                >
                  <AssetImage src={item.lidSrc} alt={`${item.name} lid`} fill className="object-cover" />
                  {item.comingSoon ? (
                    <span className="absolute inset-x-0 bottom-0 bg-ink/80 py-0.5 text-center font-mono text-[8px] uppercase tracking-wider text-paper">
                      Soon
                    </span>
                  ) : null}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => pickBundle("pack-5")}
              aria-label="5-pack"
              aria-pressed={shot === "pack"}
              className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border bg-paper"
              style={{
                borderColor: shot === "pack" ? "#18181b" : "#d4d4d8",
                boxShadow: shot === "pack" ? "0 0 0 2px #18181b" : undefined,
              }}
            >
              <AssetImage src="/tins/five-pack.jpg" alt={brandAlt("5-pack")} fill className="object-cover" />
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-extrabold leading-[0.95] tracking-tighter md:text-5xl">
            {SITE_NAME.toUpperCase()}
          </h1>
          <p className="mt-2 text-lg font-semibold tracking-tight text-ink-soft">
            Caffeine + theanine pouches
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">
            Reviews at first drop
          </p>
          {bundle === "single" ? (
            <FlavourName flavour={flavour} className="mt-3 block text-xl font-extrabold tracking-tight" />
          ) : null}
          {bundle === "single" && flavour.comingSoon ? (
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Coming soon
            </p>
          ) : null}

          <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-ink-soft">
            {TAGLINE} {CAN_LINE}. Place one pouch between upper lip and gum.
            Twenty pouches a tin. Not snus. Not a nicotine pouch. Max{" "}
            {DOSE.maxPouchesPerDay} a day. Pounds only.
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-2">
              <span className="mt-0.5 text-accent" aria-hidden>
                ✓
              </span>
              <span>
                <strong className="text-ink">HIT</strong> — {DOSE.caffeineMg} mg
                caffeine
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-accent" aria-hidden>
                ✓
              </span>
              <span>
                <strong className="text-ink">SMOOTH</strong> — {DOSE.theanineMg}{" "}
                mg L-theanine
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-accent-2" aria-hidden>
                ✓
              </span>
              <span>
                <strong className="text-ink">LIGHT SALTS</strong> —{" "}
                {DOSE.sodiumMg} mg Na / {DOSE.potassiumMg} mg K
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-accent-2" aria-hidden>
                ✓
              </span>
              <span>
                <strong className="text-ink">FOCUS</strong> — B6 {DOSE.b6Mg} mg,
                B12 {DOSE.b12Ug} µg
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 text-ink" aria-hidden>
                ✓
              </span>
              <span>
                <strong className="text-ink">ZERO NICOTINE</strong> — on purpose
              </span>
            </li>
          </ul>

          <div className="mt-8 overflow-hidden rounded-2xl bg-ink px-5 py-5 text-paper">
            <div className="flex items-start gap-3">
              <CrystalMark a="#1f6fe5" b="#d63d8c" className="mt-0.5 h-10 w-10 shrink-0" />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
                  Nicotine-free pouch ritual
                </p>
                <p className="mt-1 text-lg font-semibold tracking-tight">
                  Priority delivery for the waitlist
                </p>
                <p className="mt-1 text-sm text-zinc-300">
                  Cans are not at checkout. Register interest and you ship first.
                </p>
              </div>
            </div>
          </div>

          <fieldset className="mt-8">
            <legend className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              Choose your bundle
            </legend>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {BUNDLES.map((item) => {
                const selected = bundle === item.id;
                return (
                  <label
                    key={item.id}
                    className={`relative flex cursor-pointer flex-col rounded-2xl border bg-paper p-4 ${item.id === "single" ? "col-span-2 sm:col-span-1" : ""}`}
                    style={{
                      borderColor: selected ? "#18181b" : "#d4d4d8",
                      boxShadow: selected ? "0 0 0 1px #18181b" : undefined,
                    }}
                  >
                    {item.popular ? (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-ink px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-paper">
                        Most popular
                      </span>
                    ) : null}
                    <input
                      type="radio"
                      name="fluxhit-bundle"
                      className="sr-only"
                      checked={selected}
                      onChange={() => pickBundle(item.id)}
                    />
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <span
                        className="grid h-4 w-4 place-items-center rounded-full border"
                        style={{ borderColor: selected ? "#18181b" : "#a1a1aa" }}
                        aria-hidden
                      >
                        {selected ? (
                          <span className="h-2 w-2 rounded-full bg-ink" />
                        ) : null}
                      </span>
                      {item.tins} {item.tins === 1 ? "tin" : "tins"}
                    </span>
                    <span className="mt-1 text-xs text-muted">
                      {item.pouches} pouches
                    </span>
                    <span className="mt-3 text-sm font-medium">{item.detail}</span>
                    {item.id === "single" ? (
                      <span className="mt-1 text-xs text-ink-soft">
                        {flavour.name}
                        {flavour.comingSoon ? " · coming soon" : ""}
                      </span>
                    ) : null}
                    <span className="mt-4 rounded-xl bg-bg px-3 py-2 text-center text-sm font-semibold">
                      {gbp(item.price)}
                      <span className="mt-0.5 block text-[11px] font-medium text-muted">
                        {gbpPerPouch(item.price, item.pouches)} a pouch
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={register}
            className="mt-6 flex h-12 w-full items-center justify-center rounded-2xl text-sm font-semibold"
            style={{ backgroundColor: "#18181b", color: "#fafafa" }}
          >
            Get priority delivery
          </button>
          <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            Zero nicotine · Named doses · Priority delivery for the early list
          </p>
          <ProofStrip className="mt-4 text-center" />
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-4">
        {FEATURES.map((item) => (
          <article key={item.title} className="rounded-2xl bg-paper p-4">
            <p className="text-sm font-semibold tracking-tight">{item.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
