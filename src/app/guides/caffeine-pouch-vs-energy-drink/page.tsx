import { seoPageMeta } from "@/lib/seo";
import { SeoDoc } from "@/components/SeoDoc";
import { DOSE, gbp, PRICE } from "@/lib/products";
import Link from "next/link";

const PATH = "/guides/caffeine-pouch-vs-energy-drink";

export const metadata = seoPageMeta(PATH);

const FAQS = [
  {
    q: "How much caffeine is in a Hydrate Hit pouch?",
    a: "80 mg — in the same ballpark as a small coffee or a typical energy-drink serving, without the cup. High caffeine content. Know your own limit.",
  },
  {
    q: "Do caffeine pouches replace an energy drink?",
    a: "They replace the cup, not the water. Hydrate Hit is a lip pouch: caffeine plus named electrolytes, no nicotine. If you are thirsty, drink water.",
  },
  {
    q: "Is there sugar or nicotine in the pouch?",
    a: "No nicotine and no tobacco. It is not a nicotine pouch and not snus. It is a food supplement pouch with named doses on the tin.",
  },
  {
    q: "When is a drink the better tool?",
    a: "When you are thirsty, or when you actually want a beverage. A caffeine pouch is for when you do not want another can in your hand.",
  },
] as const;

export default function CaffeinePouchVsEnergyDrinkPage() {
  return (
    <SeoDoc
      title="Caffeine pouch vs energy drink"
      lede="An energy drink is a can you finish. A caffeine pouch is a lip pouch you tuck. Hydrate Hit is the second: 80 mg caffeine, named electrolytes, no nicotine."
      crumbs={[{ href: PATH, label: "Pouch vs energy drink" }]}
      faqs={FAQS}
    >
      <h2>What is in a caffeine pouch</h2>
      <p>
        Hydrate Hit is a nicotine-free caffeine pouch. One pouch is{" "}
        {DOSE.caffeineMg} mg caffeine — in the same ballpark as a small coffee
        or a typical energy-drink serving, without the cup, the sugar theatre,
        or a second liquid to carry. Alongside that: {DOSE.sodiumMg} mg
        sodium, {DOSE.potassiumMg} mg potassium, {DOSE.magnesiumMg} mg
        magnesium, B6 and B12. Full stack on the{" "}
        <Link href="/#stack">home stack</Link>.
      </p>
      <p>
        Energy drinks vary wildly. Some are mostly sugar and a mystery
        “blend”. This pouch does not pretend to be a meal or a pint of water.
        It is an oral pouch: tuck, sit, get on with it.
      </p>

      <h2>Side by side</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Caffeine pouch</th>
            <th>Energy drink</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Format</td>
            <td>Lip pouch</td>
            <td>Can you finish</td>
          </tr>
          <tr>
            <td>Caffeine here</td>
            <td>{DOSE.caffeineMg} mg, named</td>
            <td>Varies by brand</td>
          </tr>
          <tr>
            <td>Electrolytes</td>
            <td>
              {DOSE.sodiumMg} / {DOSE.potassiumMg} / {DOSE.magnesiumMg} mg
            </td>
            <td>Often a vibe, not milligrams</td>
          </tr>
          <tr>
            <td>Nicotine</td>
            <td>None</td>
            <td>None, usually</td>
          </tr>
          <tr>
            <td>Hands</td>
            <td>Free</td>
            <td>Holding a can</td>
          </tr>
        </tbody>
      </table>
      <p>
        High caffeine content either way. Know your own limit. Hydrate Hit is
        not for children, pregnancy, breastfeeding, or anyone sensitive to
        caffeine. It is not a medicine.
      </p>

      <h2>When a pouch is the better tool</h2>
      <ul>
        <li>You want caffeine without another drink in your hand.</li>
        <li>You want electrolytes named in milligrams, not a vibe.</li>
        <li>You do not want nicotine. This is not a nicotine pouch.</li>
        <li>
          You like the tuck — see{" "}
          <Link href="/snus-alternative">snus alternative</Link> if that is
          the ritual you mean.
        </li>
      </ul>
      <p>
        When a drink is the better tool: you are thirsty. Drink water. The
        pouch is not a bottle. Salts in milligrams live on{" "}
        <Link href="/electrolyte-pouches">electrolyte pouches</Link>. The
        no-nicotine position is on{" "}
        <Link href="/nicotine-free-pouches">nicotine-free pouches</Link>.
      </p>

      <h2>GBP, flavours, waitlist</h2>
      <p>
        From {gbp(PRICE.single)} a can. Five flavours on the{" "}
        <Link href="/shop">shop</Link>.{" "}
        <Link href="/#waitlist">Join the waitlist</Link> for priority
        delivery — this is not checkout yet.
      </p>
    </SeoDoc>
  );
}
