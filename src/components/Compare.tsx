const ROWS = [
  {
    label: "Caffeine",
    us: "80 mg",
    range: "No",
    zalt: "No",
    energy: "Usually yes",
  },
  {
    label: "Electrolytes",
    us: "300 mg (Na, K, Mg)",
    range: "No",
    zalt: "No",
    energy: "Rarely a full stack",
  },
  {
    label: "B6 + B12",
    us: "1.7 mg / 2.4 µg",
    range: "No",
    zalt: "No",
    energy: "Sometimes",
  },
  {
    label: "Nicotine",
    us: "None",
    range: "Yes",
    zalt: "Yes",
    energy: "None",
  },
  {
    label: "Job",
    us: "Hydrate and hit",
    range: "Nicotine pouch",
    zalt: "Nicotine pouch",
    energy: "Caffeine pouch",
  },
];

export function Compare() {
  return (
    <section id="compare" className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
          Against the usual suspects
        </p>
        <h2 className="mt-3 max-w-[16ch] text-4xl font-semibold tracking-tighter md:text-6xl">
          Not Range. Not ZALT. Not another energy pouch.
        </h2>
        <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-ink-soft">
          Range and ZALT sell nicotine. Energy pouches chase caffeine and skip
          the salts. Hydrate Hit is the adult overlap: a hit with a hydration
          stack, no nicotine.
        </p>
        <div className="-mx-4 mt-10 overflow-x-auto px-4">
          <table className="min-w-[40rem] w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-ink text-xs uppercase tracking-[0.14em]">
                <th className="py-3 pr-4 font-medium text-muted"> </th>
                <th className="py-3 pr-4 font-semibold text-ink">Hydrate Hit</th>
                <th className="py-3 pr-4 font-medium text-muted">Range</th>
                <th className="py-3 pr-4 font-medium text-muted">ZALT</th>
                <th className="py-3 font-medium text-muted">Energy pouches</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-b border-line">
                  <th className="py-4 pr-4 font-medium text-ink-soft">{row.label}</th>
                  <td className="py-4 pr-4 font-semibold">{row.us}</td>
                  <td className="py-4 pr-4 text-muted">{row.range}</td>
                  <td className="py-4 pr-4 text-muted">{row.zalt}</td>
                  <td className="py-4 text-muted">{row.energy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
