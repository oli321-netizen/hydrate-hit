import { seoPageMeta } from "@/lib/seo";
import { SeoDoc } from "@/components/SeoDoc";
import { DOSE, gbp, PRICE } from "@/lib/products";
import Link from "next/link";

const PATH = "/electrolyte-pouches";

export const metadata = seoPageMeta(PATH);

const FAQS = [
  {
    q: "What are electrolyte pouches?",
    a: "Oral pouches that carry named salts instead of putting them in a drink. Hydrate Hit has 150 mg sodium, 100 mg potassium and 50 mg magnesium per pouch, plus 80 mg caffeine.",
  },
  {
    q: "Does an electrolyte pouch replace water?",
    a: "No. You still drink water. The pouch does not replace a glass, a bottle, or a drip. It is a food supplement, not a medicine.",
  },
  {
    q: "Is there nicotine in Hydrate Hit?",
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
      title="Electrolyte pouches you can actually count"
      lede="Hydration first. Then the hit. Hydrate Hit puts named salts in a nicotine-free oral pouch so you do not need another bottle for the water work."
      crumbs={[{ href: PATH, label: "Electrolyte pouches" }]}
      faqs={FAQS}
    >
      <h2>The water work, in a pouch</h2>
      <p>
        Most electrolyte products are drinks. Hydrate Hit is an electrolyte
        pouch: {DOSE.sodiumMg} mg sodium, {DOSE.potassiumMg} mg potassium,{" "}
        {DOSE.magnesiumMg} mg magnesium — about {DOSE.electrolytesMg} mg in
        total — plus {DOSE.caffeineMg} mg caffeine, B6 {DOSE.b6Mg} mg and B12{" "}
        {DOSE.b12Ug} µg. No nicotine. You still drink water. The pouch does
        not replace a glass.
      </p>
      <p>
        Named doses, not a mystery blend. The numbers on the tin are the
        numbers in the pouch. That is the hydration angle: salts you can
        actually count, in a lip pouch you can actually carry.
      </p>

      <h2>What is in the electrolyte stack</h2>
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
          <tr>
            <td>Magnesium</td>
            <td>{DOSE.magnesiumMg} mg</td>
          </tr>
          <tr>
            <td>Total electrolytes</td>
            <td>about {DOSE.electrolytesMg} mg</td>
          </tr>
        </tbody>
      </table>
      <p>
        Alongside that: {DOSE.caffeineMg} mg caffeine. High caffeine content.
        Know your own limit. Not for children, pregnancy, breastfeeding, or
        anyone sensitive to caffeine. This is a food supplement pouch, not a
        treatment for dehydration.
      </p>

      <h2>When a pouch beats a bottle</h2>
      <p>
        When you want the salts without another liquid in your hand. When you
        already drink water and do not want a second flavoured can. When you
        like the lip-pouch ritual and do not want nicotine — the longer split
        is on <Link href="/snus-alternative">snus alternative</Link>.
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
