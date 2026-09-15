import { routeMeta } from "@/lib/seo";
import { SeoDoc } from "@/components/SeoDoc";
import Link from "next/link";

const PATH = "/snus-alternative";

export const metadata = routeMeta(
  PATH,
  "A snus-format alternative without nicotine",
  "Want the pouch ritual without nicotine or tobacco? Hydrate Hit is a caffeine and electrolyte lip pouch, not snus and not a nicotine pouch.",
);

export default function SnusAlternativePage() {
  return (
    <SeoDoc
      title="A snus-format alternative without nicotine"
      lede="The pouch between gum and lip is a ritual. Snus and nicotine pouches put nicotine in that ritual. Hydrate Hit does not."
      crumbs={[{ href: PATH, label: "Snus alternative" }]}
    >
      <h2>Pouch ritual, different contents</h2>
      <p>
        Snus is an oral tobacco product. Nicotine pouches (including brands
        such as Zyn) are nicotine in a similar lip-pouch format, without
        tobacco leaf. Hydrate Hit uses that oral-pouch format for caffeine
        and electrolytes. It is nicotine-free and tobacco-free. It is not
        snus. It is not a nicotine pouch.
      </p>
      <p>
        People searching for a snus alternative or a Zyn alternative sometimes
        want to quit nicotine and keep the tuck. That search is fair. The
        honest answer is: Hydrate Hit will not give you nicotine. It will give
        you 80 mg caffeine and a named electrolyte stack in a pouch you already
        know how to use.
      </p>

      <h2>Who this is for</h2>
      <p>
        Adults who like a lip pouch and do not want nicotine. Not for children,
        not in pregnancy, not if you are sensitive to caffeine. One pouch is
        80 mg caffeine. Know your own limit.
      </p>
      <p>
        Read{" "}
        <Link href="/nicotine-free-pouches">nicotine-free oral pouches</Link>{" "}
        for what is in the pouch, or{" "}
        <Link href="/guides/caffeine-pouch-vs-energy-drink">
          caffeine pouch vs energy drink
        </Link>
        . Flavours and GBP prices live on the{" "}
        <Link href="/shop">shop</Link>.
      </p>
    </SeoDoc>
  );
}
