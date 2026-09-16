import { faqPageLd } from "@/lib/seo";
import { DOSE, doseList, gbp, PRICE } from "@/lib/products";

export const FAQS = [
  {
    q: "What is in a pouch?",
    a: `${doseList()}. One ${DOSE.pouchGrams} g pouch. Food supplement.`,
  },
  {
    q: "Is there nicotine?",
    a: "No. FluxHit is a caffeine and theanine pouch with light electrolytes. No nicotine. No tobacco.",
  },
  {
    q: "Is this snus or a nicotine pouch?",
    a: "No. Same lip-pouch format, different contents. FluxHit is a nicotine-free oral pouch, not snus and not a nicotine pouch.",
  },
  {
    q: "How many pouches in a can?",
    a: "20. A 3-can variety is 60. The 5-pack is 100 — Peach Ice and Cherry Ice on that pack are coming soon.",
  },
  {
    q: "What does it cost?",
    a: `A single can is ${gbp(PRICE.single)}. The 3-can variety (Frost Mint, Citrus Ice, Blue Razz) is ${gbp(PRICE.variety3)}. The 5-pack is ${gbp(PRICE.pack5)}. Subscribe and save 20%. Pounds only.`,
  },
  {
    q: "How do I use it?",
    a: `Place one pouch between upper lip and gum. Do not chew or swallow. Leave it about 20–40 minutes. Adults only: max ${DOSE.maxPouchesPerDay} pouches per day. One pouch is ${DOSE.caffeineMg} mg caffeine. Know your own limit.`,
  },
  {
    q: "When do you ship?",
    a: "First drop is waitlist only. Register interest now and you get priority delivery when we ship. We email the list.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-t border-line px-4 py-16 md:px-8 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd(FAQS)) }}
      />
      <div className="mx-auto max-w-3xl">
        <h2 className="text-4xl font-semibold tracking-tighter md:text-6xl">FAQ</h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {FAQS.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="cursor-pointer list-none text-lg font-semibold tracking-tight marker:content-none">
                <span className="flex items-start justify-between gap-4">
                  {item.q}
                  <span className="font-mono text-muted group-open:hidden">+</span>
                  <span className="hidden font-mono text-muted group-open:inline">x</span>
                </span>
              </summary>
              <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-ink-soft">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
