import { seoPageMeta } from "@/lib/seo";
import { SeoDoc } from "@/components/SeoDoc";
import { DOSE, doseList, gbp, PRICE } from "@/lib/products";
import Link from "next/link";

const PATH = "/electrolyte-pouches";

export const metadata = seoPageMeta(PATH);

const FAQS = [
  {
    q: "What are electrolyte pouches?",
    a: "Oral pouches that carry named salts instead of putting them in a drink. FluxHit has light electrolytes — 50 mg sodium and 50 mg potassium per pouch — plus 80 mg caffeine and 60 mg L-theanine.",
  },
  {
    q: "Does an electrolyte pouch replace water?",
    a: "No. You still drink water. The pouch does not replace a glass, a bottle, or a drip. It is a food supplement, not a medicine. FluxHit is light on salts on purpose.",
  },
  {
    q: "Is there nicotine in FluxHit?",
    a: "No. Nicotine-free and tobacco-free. Same lip-pouch format as snus or a nicotine pouch, different contents.",
  },
  {
    q: "How much does a can cost?",
    a: "A single can (20 pouches) is £12.99. The 3-can variety is £34.99. The 5-pack is £54.99. Subscribe and save 20%. Pounds only. Waitlist, not checkout.",
  },
] as const;

export default function ElectrolytePouchesPage() {
  return (
    <SeoDoc
      title="Light electrolyte pouches you can actually count"
      lede="Smooth hit. Light electrolytes. FluxHit puts named salts in a nicotine-free oral pouch — not a heavy hydration story, not another bottle."
      crumbs={[{ href: PATH, label: "Light electrolyte pouches" }]}
      faqs={FAQS}
    >
      <h2>Light salts, in a pouch</h2>
      <p>
        Most electrolyte products are drinks chasing a big milligram number.
        FluxHit is a caffeine and theanine pouch with light electrolytes:{" "}
        {DOSE.sodiumMg} mg sodium and {DOSE.potassiumMg} mg potassium, plus{" "}
        {DOSE.caffeineMg} mg caffeine, {DOSE.theanineMg} mg L-theanine, B6{" "}
        {DOSE.b6Mg} mg and B12 {DOSE.b12Ug} µg. No nicotine. You still drink
        water. The pouch does not replace a glass.
      </p>
      <p>
        Named doses, not a mystery blend. The numbers on the tin are the
        numbers in the pouch. That is the salts angle: light, countable, in a
        lip pouch you can actually carry.
      </p>

      <h2>What is in the salt stack</h2>
      <table>
        <thead>
          <tr>
            <th>Salt</th>
            <th>Per pouch</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sodium</td>
            <td>{DOSE.sodiumMg} mg</td>
          </tr>
          <tr>
            <td>Potassium</td>
            <td>{DOSE.potassiumMg} mg</td>
          </tr>
        </tbody>
      </table>
      <p>
        Alongside that: {doseList()}. High caffeine content. Adults only. Max{" "}
        {DOSE.maxPouchesPerDay} pouches per day. Know your own limit. Not for
        children, pregnancy, breastfeeding, or anyone sensitive to caffeine.
        This is a food supplement pouch, not a treatment for dehydration.
      </p>

      <h2>When a pouch beats a bottle</h2>
      <p>
        When you want a smooth hit without another liquid in your hand. When
        you already drink water and do not want a second flavoured can. When
        you like the lip-pouch ritual and do not want nicotine — the longer
        split is on <Link href="/snus-alternative">snus alternative</Link>.
      </p>
      <p>
        When a drink is the better tool: you are thirsty. Drink water. For the
        caffeine comparison, see{" "}
        <Link href="/guides/caffeine-pouch-vs-energy-drink">
          caffeine pouch vs energy drink
        </Link>
        . For the no-nicotine position, see{" "}
        <Link href="/nicotine-free-pouches">nicotine-free pouches</Link>.
      </p>

      <h2>Price in pounds</h2>
      <p>
        A single can (20 pouches) is {gbp(PRICE.single)}. The 3-can variety is{" "}
        {gbp(PRICE.variety3)}. The 5-pack is {gbp(PRICE.pack5)}. Subscribe and
        save 20%. UK English. Pounds sterling. Register interest on the{" "}
        <Link href="/shop">shop</Link> or the{" "}
        <Link href="/#waitlist">waitlist</Link> — this is not checkout yet.
        Stack summary on the <Link href="/">home page</Link>.
      </p>
    </SeoDoc>
  );
}
