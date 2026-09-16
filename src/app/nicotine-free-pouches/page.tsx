import { seoPageMeta } from "@/lib/seo";
import { SeoDoc } from "@/components/SeoDoc";
import { DOSE, doseList, gbp, PRICE } from "@/lib/products";
import Link from "next/link";

const PATH = "/nicotine-free-pouches";

export const metadata = seoPageMeta(PATH);

const FAQS = [
  {
    q: "What are nicotine-free pouches?",
    a: "Oral pouches you tuck between gum and lip that do not contain nicotine. FluxHit is one: caffeine, L-theanine, light electrolytes, B6 and B12. No tobacco.",
  },
  {
    q: "Is FluxHit tobacco-free as well?",
    a: "Yes. No nicotine, no tobacco, not snus. Same lip-pouch format as nicotine pouches, different contents.",
  },
  {
    q: "How much caffeine is in a pouch?",
    a: "80 mg, with 60 mg L-theanine. High caffeine content. Adults only. Max 2 pouches per day. Know your own limit. Not for children, pregnancy, breastfeeding, or anyone sensitive to caffeine.",
  },
  {
    q: "Is this a snus alternative?",
    a: "It is a snus-format alternative without nicotine. It is not a quit-aid and not a medicine. Read the snus alternative page for the honest split.",
  },
] as const;

export default function NicotineFreePouchesPage() {
  return (
    <SeoDoc
      title="Nicotine-free pouches with a named stack"
      lede="FluxHit is a lip pouch with caffeine, L-theanine and light electrolytes. It is not snus, not tobacco, and it does not contain nicotine."
      crumbs={[{ href: PATH, label: "Nicotine-free pouches" }]}
      faqs={FAQS}
    >
      <h2>What nicotine-free pouches are</h2>
      <p>
        A nicotine-free pouch is a small oral pouch you tuck between gum and
        lip. The format looks like a nicotine pouch. The contents do not.
        There is no nicotine to absorb. The job, if there is one, has to come
        from something else.
      </p>
      <p>
        FluxHit uses that format for caffeine plus theanine, with light
        electrolytes. People search for nicotine-free pouches, tobacco-free
        pouches, caffeine pouches and lip pouches for the same reason: a
        pocketable hit without a drink, and without nicotine. That is the job.
      </p>

      <h2>What is in a FluxHit pouch</h2>
      <p>
        Each {DOSE.pouchGrams} g pouch carries {doseList()}. Named doses, not a
        mystery blend. Light salts, not a sports-drink dump. Full salts note on{" "}
        <Link href="/electrolyte-pouches">light electrolyte pouches</Link>.
      </p>
      <p>
        Twenty pouches in a can. Launch flavours on the{" "}
        <Link href="/shop">shop</Link>: Frost Mint, Citrus Ice, Blue Razz.
        Peach Ice and Cherry Ice are coming soon. A single can is{" "}
        {gbp(PRICE.single)}. Pounds only. First drop is waitlist only —{" "}
        <Link href="/#waitlist">register interest</Link> for priority
        delivery.
      </p>

      <h2>How a lip pouch works here</h2>
      <p>
        Place one pouch between upper lip and gum. Leave it about 20–40
        minutes. Do not chew or swallow. High caffeine content: one pouch is{" "}
        {DOSE.caffeineMg} mg, with {DOSE.theanineMg} mg L-theanine. Adults
        only: max {DOSE.maxPouchesPerDay} pouches per day. Know your own
        limit. You still drink water.
      </p>
      <p>
        If the comparison you want is a can of drink, read{" "}
        <Link href="/guides/caffeine-pouch-vs-energy-drink">
          caffeine pouch vs energy drink
        </Link>
        .
      </p>

      <h2>What it is not</h2>
      <ul>
        <li>Not a nicotine pouch.</li>
        <li>Not snus and not tobacco.</li>
        <li>Not a quit-aid and not a medicine.</li>
        <li>Not a mystery blend. Doses are named on the tin.</li>
      </ul>
      <p>
        If you want the pouch ritual without nicotine, the longer split is on{" "}
        <Link href="/snus-alternative">snus alternative</Link>. Short version
        lives on the <Link href="/">home stack</Link>. Not for children, not
        in pregnancy or while breastfeeding, not if you are sensitive to
        caffeine.
      </p>
    </SeoDoc>
  );
}
