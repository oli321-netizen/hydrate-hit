const STEPS = [
  {
    n: "01",
    title: "Tuck one pouch.",
    body: "Upper lip. Dry fingers. Same ritual as any other oral pouch, minus the nicotine.",
  },
  {
    n: "02",
    title: "Leave it there.",
    body: "Do not chew. The stack is built to sit. Caffeine, salts, B6, B12.",
  },
  {
    n: "03",
    title: "Get on with it.",
    body: "One pouch is 80 mg caffeine. Know your own limit. Water still counts.",
  },
];

export function HowToUse() {
  return (
    <section id="use" className="border-t border-line px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-4xl font-semibold tracking-tighter md:text-6xl">How to use</h2>
        <ol className="mt-10">
          {STEPS.map((step, i) => (
            <li
              key={step.n}
              className="relative grid grid-cols-[4rem_1fr] gap-4 border-l-2 border-line py-8 pl-8 first:pt-0 last:pb-0"
              style={{
                borderImage:
                  i === 1
                    ? "linear-gradient(#1f6fe5, #d63d8c) 1"
                    : undefined,
              }}
            >
              <span className="font-mono text-sm text-muted">{step.n}</span>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 max-w-[52ch] text-base leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
