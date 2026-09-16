import { seoPageMeta } from "@/lib/seo";
import { SeoDoc } from "@/components/SeoDoc";
import { DOSE, doseList, gbp, PRICE } from "@/lib/products";
import Link from "next/link";

const PATH = "/snus-alternative";

export const metadata = seoPageMeta(PATH);

const FAQS = [
  {
    q: "Is FluxHit a snus alternative?",
    a: "It is a snus-format alternative: same lip-pouch ritual, different contents. FluxHit is nicotine-free and tobacco-free. It is not snus and not a nicotine pouch.",
  },
  {
    q: "Does it contain nicotine?",
    a: "No. There is no nicotine and no tobacco. Each pouch carries 80 mg caffeine, 60 mg L-theanine, light electrolytes, vitamin B6 and vitamin B12.",
  },
  {
    q: "Will this help me quit snus or nicotine pouches?",
    a: "No. FluxHit is not a quit-aid, not nicotine replacement, and not a medicine. It will not wean you off nicotine. If you want to stop nicotine, use tools built for that job.",
  },
  {
    q: "What is in a FluxHit pouch?",
    a: `${doseList()}. Twenty pouches in a can.`,
  },
  {
    q: "Who should not use it?",
    a: "Not for children, not in pregnancy or while breastfeeding, and not if you are sensitive to caffeine. One pouch is 80 mg caffeine. High caffeine content. Adults only. Max 2 pouches per day. Know your own limit.",
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
      lede="The pouch between gum and lip is a ritual. Snus puts tobacco in that ritual. Nicotine pouches put nicotine in it. FluxHit puts caffeine, theanine and light electrolytes in it."
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
        FluxHit keeps the tuck and drops both. It is a{" "}
        <Link href="/nicotine-free-pouches">nicotine-free pouch</Link> with
        caffeine, L-theanine and light electrolytes. It is not snus. It is not a
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
        Still not FluxHit.
      </p>
      <h3>FluxHit</h3>
      <p>
        A UK caffeine and theanine lip pouch with light electrolytes. No
        nicotine. No tobacco. Food supplement, not a medicine. Waitlist for the
        first drop — see the <Link href="/shop">shop</Link> for flavours and
        pounds.
      </p>

      <h2>Why people search for a snus alternative</h2>
      <p>
        The search is usually honest. People want the pouch without the
        nicotine, or they want something in the pocket that is not a vape and
        not another drink. UK queries for a snus alternative often sit next to
        nicotine-free pouches and caffeine pouches. Same shape of intent: a lip
        pouch that does a job.
      </p>
      <p>
        If you searched hoping for a quieter nicotine, this is not that. If you
        searched hoping to keep the ritual and lose the nicotine, this is
        closer — with the caveat that caffeine is not a substitute for
        nicotine, and FluxHit does not pretend otherwise.
      </p>

      <h2>Ritual without nicotine</h2>
      <p>
        Place one pouch between upper lip and gum. Leave it about 20–40
        minutes. Do not chew or swallow. That is the whole method, same as any
        other oral pouch. The ritual is the point for a lot of people.
      </p>
      <p>
        FluxHit will not give you nicotine. It will not taper you. It is not a
        quit-aid and not nicotine replacement. There is nothing in the pouch to
        wean off. If you need help stopping nicotine, that is a different job,
        with different tools.
      </p>
      <p>
        What you get instead: {DOSE.caffeineMg} mg caffeine, {DOSE.theanineMg}{" "}
        mg L-theanine, light salts, B6 and B12, in a pouch you already know how
        to use. Compare the caffeine side in{" "}
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
            <td>L-Theanine</td>
            <td>{DOSE.theanineMg} mg</td>
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
            <td>Vitamin B6</td>
            <td>
              {DOSE.b6Mg} mg ({DOSE.b6Nrv}% NRV)
            </td>
          </tr>
          <tr>
            <td>Vitamin B12</td>
            <td>
              {DOSE.b12Ug} µg ({DOSE.b12Nrv}% NRV)
            </td>
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
        ballpark as a small coffee — with {DOSE.theanineMg} mg L-theanine so
        the hit stays civil. Adults only. Max {DOSE.maxPouchesPerDay} pouches
        per day. Know your own limit. You still drink water; the salts do not
        replace a glass. Light salts note on{" "}
        <Link href="/electrolyte-pouches">light electrolyte pouches</Link>.
      </p>
      <p>
        Twenty pouches in a can. Launch flavours: Frost Mint, Citrus Ice, Blue
        Razz. Peach Ice and Cherry Ice coming soon. A single can is{" "}
        {gbp(PRICE.single)}. Pounds only. This is not checkout yet —{" "}
        <Link href="/#waitlist">join the waitlist</Link> for priority delivery.
      </p>

      <h2>Who it is for, and who it is not</h2>
      <p>
        For adults who like a lip pouch and do not want nicotine. For people
        who want caffeine pouches they can carry, with theanine in the same
        tuck. For people who want a light salt stack without another bottle in
        the hand.
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
        FluxHit is a food supplement pouch. It is not a treatment and it does
        not claim medical benefits. Read the <Link href="/">home stack</Link>{" "}
        if you want the short version, or register interest on the{" "}
        <Link href="/shop">shop</Link>.
      </p>
    </SeoDoc>
  );
}
