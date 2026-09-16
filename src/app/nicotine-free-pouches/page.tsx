import { seoPageMeta } from "@/lib/seo";
import { SeoDoc } from "@/components/SeoDoc";
import { DOSE, gbp, PRICE } from "@/lib/products";
import { SITE_NAME } from "@/lib/site";
import Link from "next/link";

const PATH = "/nicotine-free-pouches";

export const metadata = seoPageMeta(PATH);

const FAQS = [
  {
    q: "What are nicotine-free pouches?",
    a: `Oral pouches you tuck between gum and lip that do not contain nicotine. ${SITE_NAME} is one: caffeine, L-theanine, sodium and potassium electrolytes, B6 and B12. No tobacco. No sugar.`,
  },
  {
    q: `Is ${SITE_NAME} tobacco-free as well?`,
    a: "Yes. No nicotine, no tobacco, not snus. Same lip-pouch format as nicotine pouches, different contents.",
  },
  {
    q: "How much caffeine is in a pouch?",
    a: `${DOSE.caffeineMg} mg, with ${DOSE.theanineMg} mg L-theanine. High caffeine content. Know your own limit. Not for children, pregnancy, breastfeeding, or anyone sensitive to caffeine.`,
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
      lede={`${SITE_NAME} is a lip pouch with caffeine, L-theanine and light electrolytes. It is not snus, not tobacco, and it does not contain nicotine.`}
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
        {SITE_NAME} uses that format for caffeine, L-theanine and light
        electrolytes. People search for nicotine-free pouches, tobacco-free
        pouches, caffeine pouches and lip pouches for the same reason: a
        pocketable hit without a drink, and without nicotine. That is the job.
      </p>

      <h2>What is in a {SITE_NAME} pouch</h2>
      <p>
        Each pouch carries {DOSE.caffeineMg} mg caffeine, {DOSE.theanineMg} mg
        L-theanine, {DOSE.sodiumMg} mg sodium, {DOSE.potassiumMg} mg potassium,
        vitamin B6 {DOSE.b6Mg} mg and vitamin B12 {DOSE.b12Ug} µg (100% NRV).
        Named doses, not a mystery blend. Full hydration angle on{" "}
        <Link href="/electrolyte-pouches">electrolyte pouches</Link>.
      </p>
      <p>
        Twenty pouches in a can. Five flavours on the{" "}
        <Link href="/shop">shop</Link>: Frost Mint, Citrus Ice, Blue Razz,
        Peach Ice, Cherry Ice. A single can is {gbp(PRICE.single)}. Pounds
        only. First drop is waitlist only —{" "}
        <Link href="/#waitlist">register interest</Link> for priority
        delivery.
      </p>

      <h2>How a lip pouch works here</h2>
      <p>
        Tuck one pouch. Leave it. Do not chew. The stack is built to sit.
        High caffeine content: one pouch is {DOSE.caffeineMg} mg, in the same
        ballpark as a small coffee, with {DOSE.theanineMg} mg L-theanine for a
        smoother hit. Know your own limit. You still drink water.
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
