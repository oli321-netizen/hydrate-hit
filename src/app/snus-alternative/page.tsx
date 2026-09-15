import { seoPageMeta } from "@/lib/seo";
import { SeoDoc } from "@/components/SeoDoc";
import { DOSE, gbp, PRICE } from "@/lib/products";
import Link from "next/link";

const PATH = "/snus-alternative";

export const metadata = seoPageMeta(PATH);

const FAQS = [
  {
    q: "Is Hydrate Hit a snus alternative?",
    a: "It is a snus-format alternative: same lip-pouch ritual, different contents. Hydrate Hit is nicotine-free and tobacco-free. It is not snus and not a nicotine pouch.",
  },
  {
    q: "Does it contain nicotine?",
    a: "No. There is no nicotine and no tobacco. Each pouch carries 80 mg caffeine plus named electrolytes, vitamin B6 and vitamin B12.",
  },
  {
    q: "Will this help me quit snus or nicotine pouches?",
    a: "No. Hydrate Hit is not a quit-aid, not nicotine replacement, and not a medicine. It will not wean you off nicotine. If you want to stop nicotine, use tools built for that job.",
  },
  {
    q: "What is in a Hydrate Hit pouch?",
    a: "80 mg caffeine, 150 mg sodium, 100 mg potassium, 50 mg magnesium (about 300 mg electrolytes), vitamin B6 1.7 mg and vitamin B12 2.4 µg. Twenty pouches in a can.",
  },
  {
    q: "Who should not use it?",
    a: "Not for children, not in pregnancy or while breastfeeding, and not if you are sensitive to caffeine. One pouch is 80 mg caffeine. High caffeine content. Know your own limit.",
  },
  {
    q: "Can I buy a can today?",
    a: "Not yet. First drop is waitlist only. Register interest for priority delivery when we ship. Flavours and GBP prices are on the shop.",
  },
] as const;

export default function SnusAlternativePage() {
  return (
    <SeoDoc
      title="A snus alternative without nicotine"
      lede="The pouch between gum and lip is a ritual. Snus puts tobacco in that ritual. Nicotine pouches put nicotine in it. Hydrate Hit puts caffeine and electrolytes in it."
      crumbs={[{ href: PATH, label: "Snus alternative" }]}
      faqs={FAQS}
    >
      <h2>What snus is, what nicotine pouches are, what this is</h2>
      <p>
        Snus is an oral tobacco product. You tuck a portion between gum and lip.
        Nicotine arrives through the mucosa. That is the original job.
      </p>
      <p>
        Nicotine pouches — including brands such as Zyn — keep the tuck and drop
        the tobacco leaf. Nicotine stays. The format looks like snus. The
        contents are still nicotine.
      </p>
      <p>
        Hydrate Hit keeps the tuck and drops both. It is a{" "}
        <Link href="/nicotine-free-pouches">nicotine-free pouch</Link> with
        caffeine and a named electrolyte stack. It is not snus. It is not a
        nicotine pouch. It is not Zyn. Same oral-pouch format. Different
        contents, named on the tin.
      </p>

      <h3>Snus</h3>
      <p>
        Tobacco, oral, nicotine. Legal status and availability vary by country.
        If that is the product you want, this page is not selling it.
      </p>
      <h3>Nicotine pouches</h3>
      <p>
        Nicotine in a small white pouch, typically tobacco-free. Still nicotine.
        Still not Hydrate Hit.
      </p>
      <h3>Hydrate Hit</h3>
      <p>
        A UK caffeine and electrolyte lip pouch. No nicotine. No tobacco. Food
        supplement, not a medicine. Waitlist for the first drop — see the{" "}
        <Link href="/shop">shop</Link> for flavours and pounds.
      </p>

      <h2>Why people search for a snus alternative</h2>
      <p>
        The search is usually honest. People want the pouch without the
        nicotine, or they want something in the pocket that is not a vape and
        not another drink. UK queries for a snus alternative often sit next to
        nicotine-free pouches, caffeine pouches and electrolyte pouches. Same
        shape of intent: a lip pouch that does a job.
      </p>
      <p>
        If you searched hoping for a quieter nicotine, this is not that. If you
        searched hoping to keep the ritual and lose the nicotine, this is
        closer — with the caveat that caffeine is not a substitute for
        nicotine, and Hydrate Hit does not pretend otherwise.
      </p>

      <h2>Ritual without nicotine</h2>
      <p>
        Tuck one pouch. Leave it. Do not chew. That is the whole method, same
        as any other oral pouch. The ritual is the point for a lot of people.
      </p>
      <p>
        Hydrate Hit will not give you nicotine. It will not taper you. It is
        not a quit-aid and not nicotine replacement. There is nothing in the
        pouch to wean off. If you need help stopping nicotine, that is a
        different job, with different tools.
      </p>
      <p>
        What you get instead: {DOSE.caffeineMg} mg caffeine, named salts, B6
        and B12, in a pouch you already know how to use. Compare the caffeine
        side in{" "}
        <Link href="/guides/caffeine-pouch-vs-energy-drink">
          caffeine pouch vs energy drink
        </Link>
        .
      </p>

      <h2>What is in a pouch</h2>
      <p>
        Named doses, not a mystery blend. The numbers on the tin are the
        numbers in the pouch.
      </p>
      <table>
        <thead>
          <tr>
            <th>In the pouch</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Caffeine</td>
            <td>{DOSE.caffeineMg} mg</td>
          </tr>
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
            <td>Electrolytes, total</td>
            <td>about {DOSE.electrolytesMg} mg</td>
          </tr>
          <tr>
            <td>Vitamin B6</td>
            <td>{DOSE.b6Mg} mg</td>
          </tr>
          <tr>
            <td>Vitamin B12</td>
            <td>{DOSE.b12Ug} µg</td>
          </tr>
          <tr>
            <td>Nicotine</td>
            <td>none</td>
          </tr>
          <tr>
            <td>Tobacco</td>
            <td>none</td>
          </tr>
        </tbody>
      </table>
      <p>
        High caffeine content. One pouch is {DOSE.caffeineMg} mg — in the same
        ballpark as a small coffee. Know your own limit. Do not stack pouches
        as if they were mints. You still drink water; the salts do not replace
        a glass. Full hydration angle on{" "}
        <Link href="/electrolyte-pouches">electrolyte pouches</Link>.
      </p>
      <p>
        Twenty pouches in a can. Five flavours: Frost Mint, Citrus Ice, Blue
        Razz, Peach Ice, Cherry Ice. A single can is {gbp(PRICE.single)}.
        Pounds only. This is not checkout yet —{" "}
        <Link href="/#waitlist">join the waitlist</Link> for priority delivery.
      </p>

      <h2>Who it is for, and who it is not</h2>
      <p>
        For adults who like a lip pouch and do not want nicotine. For people
        who want caffeine pouches they can carry. For people who want
        electrolyte work without another bottle in the hand.
      </p>
      <p>Not for:</p>
      <ul>
        <li>Children.</li>
        <li>Pregnancy or breastfeeding.</li>
        <li>Anyone sensitive to caffeine.</li>
        <li>
          Anyone expecting a medicine, a nicotine replacement, or a hydration
          drip in a pouch.
        </li>
      </ul>
      <p>
        Hydrate Hit is a food supplement pouch. It is not a treatment and it
        does not claim medical benefits. Read the{" "}
        <Link href="/">home stack</Link> if you want the short version, or
        register interest on the <Link href="/shop">shop</Link>.
      </p>
    </SeoDoc>
  );
}
