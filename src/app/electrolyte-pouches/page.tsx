import { routeMeta } from "@/lib/seo";
import { SeoDoc } from "@/components/SeoDoc";
import { DOSE, gbp, PRICE } from "@/lib/products";
import Link from "next/link";

const PATH = "/electrolyte-pouches";

export const metadata = routeMeta(
  PATH,
  "Electrolyte pouches for hydration",
  "Hydrate Hit electrolyte pouches: 150 mg sodium, 100 mg potassium, 50 mg magnesium (~300 mg) plus 80 mg caffeine. Named doses. GBP.",
);

export default function ElectrolytePouchesPage() {
  return (
    <SeoDoc
      title="Electrolyte pouches for hydration"
      lede="Hydration first. Then the hit. Hydrate Hit puts named salts in a nicotine-free oral pouch so you do not need another bottle for the water work."
      crumbs={[{ href: PATH, label: "Electrolyte pouches" }]}
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

      <h2>Price in pounds</h2>
      <p>
        A single can (20 pouches) is {gbp(PRICE.single)}. The 3-can variety is{" "}
        {gbp(PRICE.variety3)}. The 5-pack is {gbp(PRICE.pack5)}. Subscribe
        and save 20%. UK English. Pounds sterling. Register interest on the{" "}
        <Link href="/shop">shop</Link> or the{" "}
        <Link href="/waitlist">waitlist</Link> — this is not checkout yet.
      </p>
      <p>
        For the caffeine side of the same pouch, see{" "}
        <Link href="/nicotine-free-pouches">nicotine-free oral pouches</Link>{" "}
        and{" "}
        <Link href="/guides/caffeine-pouch-vs-energy-drink">
          pouch vs energy drink
        </Link>
        .
      </p>
    </SeoDoc>
  );
}
