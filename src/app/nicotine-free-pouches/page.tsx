import { routeMeta } from "@/lib/seo";
import { SeoDoc } from "@/components/SeoDoc";
import { gbp, PRICE } from "@/lib/products";
import Link from "next/link";

const PATH = "/nicotine-free-pouches";

export const metadata = routeMeta(
  PATH,
  "Nicotine-free oral pouches",
  "Hydrate Hit is a nicotine-free oral pouch: caffeine, electrolytes, B6 and B12 in a lip pouch. Tobacco-free. From £12.99. UK.",
);

export default function NicotineFreePouchesPage() {
  return (
    <SeoDoc
      title="Nicotine-free oral pouches"
      lede="Hydrate Hit is a lip pouch with caffeine and electrolytes. It is not snus, not tobacco, and it does not contain nicotine."
      crumbs={[{ href: PATH, label: "Nicotine-free pouches" }]}
    >
      <h2>What Hydrate Hit is</h2>
      <p>
        Hydrate Hit is a nicotine-free oral pouch — a small pouch you tuck
        between gum and lip. The format looks like other oral pouches. The
        contents do not. There is no nicotine, no tobacco, and no snus. Each
        pouch carries 80 mg caffeine, about 300 mg electrolytes (sodium,
        potassium, magnesium), vitamin B6 1.7 mg and vitamin B12 2.4 µg.
      </p>
      <p>
        People search for nicotine-free pouches, tobacco-free pouches, caffeine
        pouches and lip pouches for the same reason: they want a pocketable
        hit without a drink, and without nicotine. That is the job.
      </p>

      <h2>How a lip pouch works here</h2>
      <p>
        Tuck one pouch. Leave it. Do not chew. The stack is built to sit.
        Twenty pouches in a can. Five flavours on{" "}
        <Link href="/shop">the shop</Link>: Frost Mint, Citrus Ice, Blue Razz,
        Peach Ice, Cherry Ice. A single can is {gbp(PRICE.single)}. Pounds
        only.
      </p>

      <h2>What it is not</h2>
      <ul>
        <li>Not a nicotine pouch.</li>
        <li>Not snus and not tobacco.</li>
        <li>Not a mystery blend. Doses are named on the tin.</li>
      </ul>
      <p>
        If you want the pouch ritual without nicotine, read{" "}
        <Link href="/snus-alternative">snus-format alternative</Link>. If you
        care about the salts, read{" "}
        <Link href="/electrolyte-pouches">electrolyte pouches</Link>. First
        drop is waitlist only —{" "}
        <Link href="/waitlist">register interest</Link> for priority delivery.
      </p>
    </SeoDoc>
  );
}
