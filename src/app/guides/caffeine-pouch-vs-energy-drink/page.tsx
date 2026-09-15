import { routeMeta } from "@/lib/seo";
import { SeoDoc } from "@/components/SeoDoc";
import { DOSE, gbp, PRICE } from "@/lib/products";
import Link from "next/link";

const PATH = "/guides/caffeine-pouch-vs-energy-drink";

export const metadata = routeMeta(
  PATH,
  "Caffeine pouch vs energy drink",
  "How a nicotine-free caffeine pouch compares with an energy drink: 80 mg caffeine, no cup, named electrolytes. Hydrate Hit, UK, pounds.",
);

export default function CaffeinePouchVsEnergyDrinkPage() {
  return (
    <SeoDoc
      title="Caffeine pouch vs energy drink"
      lede="An energy drink is a can you finish. A caffeine pouch is a lip pouch you tuck. Hydrate Hit is the second: 80 mg caffeine, named electrolytes, no nicotine."
      crumbs={[
        { href: PATH, label: "Pouch vs energy drink" },
      ]}
    >
      <h2>What is in a caffeine pouch</h2>
      <p>
        Hydrate Hit is a nicotine-free caffeine pouch. One pouch is{" "}
        {DOSE.caffeineMg} mg caffeine — in the same ballpark as a small coffee
        or a typical energy drink serving, without the cup, the sugar theatre,
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

      <h2>When a pouch is the better tool</h2>
      <ul>
        <li>You want caffeine without another drink in your hand.</li>
        <li>You want electrolytes named in milligrams, not a vibe.</li>
        <li>You do not want nicotine. This is not a nicotine pouch.</li>
      </ul>
      <p>
        When a drink is the better tool: you are thirsty. Drink water. The
        pouch is not a bottle.
      </p>

      <h2>GBP, flavours, waitlist</h2>
      <p>
        From {gbp(PRICE.single)} a can. Five flavours on the{" "}
        <Link href="/shop">shop</Link>. Compare the hydration angle on{" "}
        <Link href="/electrolyte-pouches">electrolyte pouches</Link>, or the
        no-nicotine position on{" "}
        <Link href="/nicotine-free-pouches">nicotine-free pouches</Link>.{" "}
        <Link href="/waitlist">Join the waitlist</Link> for priority delivery.
      </p>
    </SeoDoc>
  );
}
