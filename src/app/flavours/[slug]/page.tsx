import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CAN_LINE } from "@/lib/site";
import { DOSE, FLAVOURS, PRICE, flavourBySlug, gbp, subscribePrice } from "@/lib/products";
import { AccentLine, CrystalMark, FlavourName, ProofStrip } from "@/components/Brand";
import { FlavourBuy } from "@/components/FlavourBuy";
import { AssetImage } from "@/components/AssetImage";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return FLAVOURS.map((flavour) => ({ slug: flavour.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const flavour = flavourBySlug(slug);
  if (!flavour) return { title: "Flavour" };
  return {
    title: `${flavour.name} nicotine-free pouch`,
    description: `${flavour.name} Hydrate Hit. Nicotine-free caffeine and electrolyte oral pouch. ${flavour.blurb} ${CAN_LINE}. ${gbp(PRICE.single)} a can.`,
    alternates: { canonical: `/flavours/${flavour.slug}` },
    openGraph: {
      url: `/flavours/${flavour.slug}`,
      title: `${flavour.name} · Hydrate Hit`,
      description: `${flavour.name} nicotine-free pouch. ${flavour.blurb}`,
      images: [
        {
          url: `${flavour.heroSrc}`,
          alt: `${flavour.name} Hydrate Hit tin`,
        },
      ],
    },
  };
}

export default async function FlavourPage({ params }: Props) {
  const { slug } = await params;
  const flavour = flavourBySlug(slug);
  if (!flavour) notFound();

  return (
    <main className="px-4 pb-28 pt-24 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-bg-2">
          <AssetImage
            src={flavour.heroSrc}
            alt={`${flavour.name} Hydrate Hit tin`}
            fill
            className="object-contain"
          />
          <CrystalMark
            a={flavour.crystal[0]}
            b={flavour.crystal[1]}
            className="absolute bottom-6 right-6 h-16 w-16"
          />
        </div>
        <div>
          <FlavourName
            flavour={flavour}
            as="h1"
            className="text-4xl font-extrabold tracking-tighter md:text-6xl"
          />
          <AccentLine flavour={flavour} />
          <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-ink-soft">
            {flavour.blurb}
          </p>
          <ProofStrip className="mt-4" />
          <p className="mt-6 font-mono text-sm text-muted">{CAN_LINE}</p>
          <p className="mt-2 text-sm text-ink-soft">
            {DOSE.pouchesPerCan} pouches · {gbp(PRICE.single)} · subscribe{" "}
            {gbp(subscribePrice(PRICE.single))}
          </p>
          <FlavourBuy slug={flavour.slug} accent={flavour.toneA} />
        </div>
      </div>
    </main>
  );
}
