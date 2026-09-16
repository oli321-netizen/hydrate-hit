import { DOSE } from "@/lib/products";

const CELLS = [
  {
    key: "caf",
    label: "Caffeine",
    value: `${DOSE.caffeineMg} mg`,
    note: "The hit. L-theanine sits next to it so the caffeine stays smooth.",
    wide: true,
  },
  {
    key: "theanine",
    label: "L-theanine",
    value: `${DOSE.theanineMg} mg`,
    note: "Paired with caffeine. That is the smooth in the hit.",
    wide: true,
  },
  {
    key: "na",
    label: "Sodium",
    value: `${DOSE.sodiumMg} mg`,
    note: "Light electrolyte. The salt you actually sweat.",
  },
  {
    key: "k",
    label: "Potassium",
    value: `${DOSE.potassiumMg} mg`,
    note: "Pairs with sodium. Not a garnish.",
  },
  {
    key: "b6",
    label: "Vitamin B6",
    value: `${DOSE.b6Mg} mg`,
    note: "100% NRV. Adult daily dose, not a dusting.",
  },
  {
    key: "b12",
    label: "Vitamin B12",
    value: `${DOSE.b12Ug} µg`,
    note: "100% NRV. 2.4 micrograms. The number on the tin is the number in the pouch.",
  },
];

export function Stack() {
  return (
    <section id="stack" className="bg-bg-2 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
          The stack
        </p>
        <h2 className="mt-3 max-w-[16ch] text-4xl font-semibold tracking-tighter md:text-6xl">
          Named doses. No mystery blend.
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CELLS.map((cell) => (
            <article
              key={cell.key}
              className={`rounded-2xl bg-paper p-6 ${cell.wide ? "sm:col-span-2 lg:col-span-3" : ""}`}
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                {cell.label}
              </p>
              <p
                className={`mt-2 font-semibold tracking-tight ${cell.wide ? "text-5xl md:text-7xl" : "text-3xl"}`}
              >
                {cell.value}
              </p>
              <p className="mt-3 max-w-[50ch] text-sm leading-relaxed text-ink-soft">
                {cell.note}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
