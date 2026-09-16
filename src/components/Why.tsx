import Link from "next/link";
import { CAN_LINE } from "@/lib/site";
import { DOSE } from "@/lib/products";

export function Why() {
  return (
    <section id="why" className="border-t border-line px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <div>
          <h2 className="max-w-[12ch] text-4xl font-semibold tracking-tighter text-ink md:text-6xl">
            Smooth hit. Light electrolytes.
          </h2>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-ink-soft">
            Caffeine plus L-theanine for the hit. Sodium and potassium
            electrolytes. Named doses, not a mystery blend.
          </p>
        </div>
        <ul className="divide-y divide-line text-sm">
          <li className="flex justify-between gap-4 py-4">
            <span className="text-muted">The hit</span>
            <span className="text-right font-medium">
              {DOSE.caffeineMg} mg caffeine + {DOSE.theanineMg} mg L-theanine
            </span>
          </li>
          <li className="flex justify-between gap-4 py-4">
            <span className="text-muted">The water work</span>
            <span className="text-right font-medium">
              {DOSE.sodiumMg} mg sodium + {DOSE.potassiumMg} mg potassium
            </span>
          </li>
          <li className="flex justify-between gap-4 py-4">
            <span className="text-muted">The adult extras</span>
            <span className="text-right font-medium">
              B6 {DOSE.b6Mg} mg, B12 {DOSE.b12Ug} µg (100% NRV)
            </span>
          </li>
          <li className="flex justify-between gap-4 py-4">
            <span className="text-muted">Nicotine</span>
            <span className="text-right font-medium">None. Sugar-free. Tobacco-free.</span>
          </li>
        </ul>
      </div>
      <p className="mx-auto mt-10 max-w-6xl font-mono text-xs uppercase tracking-[0.16em] text-muted">
        {CAN_LINE}
      </p>
      <p className="mx-auto mt-4 max-w-6xl text-sm leading-relaxed text-ink-soft">
        Same pouch, three ways in:{" "}
        <Link href="/snus-alternative" className="font-semibold underline">
          snus alternative
        </Link>
        ,{" "}
        <Link href="/nicotine-free-pouches" className="font-semibold underline">
          nicotine-free pouches
        </Link>
        ,{" "}
        <Link href="/electrolyte-pouches" className="font-semibold underline">
          electrolyte pouches
        </Link>
        . Or the{" "}
        <Link href="/guides/caffeine-pouch-vs-energy-drink" className="font-semibold underline">
          caffeine pouch vs energy drink
        </Link>{" "}
        note.
      </p>
    </section>
  );
}
