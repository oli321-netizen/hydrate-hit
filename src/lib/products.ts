export type FlavourSlug =
  | "frost-mint"
  | "citrus-ice"
  | "blue-razz"
  | "peach-ice"
  | "cherry-ice";

export type Flavour = {
  slug: FlavourSlug;
  name: string;
  wordA: string;
  wordB: string;
  toneA: string;
  toneB: string;
  crystal: [string, string];
  blurb: string;
  heroSrc: string;
  lidSrc: string;
  comingSoon?: boolean;
};

export const FLAVOURS: Flavour[] = [
  {
    slug: "frost-mint",
    name: "Frost Mint",
    wordA: "FROST",
    wordB: "MINT",
    toneA: "#2F86E8",
    toneB: "#7EC8F0",
    crystal: ["#2F86E8", "#7EC8F0"],
    blurb: "Cold mint. Clean hit. No syrupy aftertaste.",
    heroSrc: "/tins/frost-mint.jpg",
    lidSrc: "/tins/frost-mint-lid.png",
  },
  {
    slug: "citrus-ice",
    name: "Citrus Ice",
    wordA: "CITRUS",
    wordB: "ICE",
    toneA: "#E8A317",
    toneB: "#2F86E8",
    crystal: ["#E8A317", "#2F86E8"],
    blurb: "Sharp citrus, iced. Breakfast energy, evening manners.",
    heroSrc: "/tins/citrus-ice.jpg",
    lidSrc: "/tins/citrus-ice-lid.png",
  },
  {
    slug: "blue-razz",
    name: "Blue Razz",
    wordA: "BLUE",
    wordB: "RAZZ",
    toneA: "#2F86E8",
    toneB: "#D63D8C",
    crystal: ["#2F86E8", "#D63D8C"],
    blurb: "Blue raspberry, split-tone. The house flavour.",
    heroSrc: "/tins/blue-razz.jpg",
    lidSrc: "/tins/blue-razz-lid.png",
  },
  {
    slug: "peach-ice",
    name: "Peach Ice",
    wordA: "PEACH",
    wordB: "ICE",
    toneA: "#E8896A",
    toneB: "#2F86E8",
    crystal: ["#E8896A", "#F7D0C0"],
    blurb: "Stone fruit, chilled. Soft on the tongue, not on the dose.",
    heroSrc: "/tins/peach-ice.jpg",
    lidSrc: "/tins/peach-ice-lid.png",
    comingSoon: true,
  },
  {
    slug: "cherry-ice",
    name: "Cherry Ice",
    wordA: "CHERRY",
    wordB: "ICE",
    toneA: "#D11F3C",
    toneB: "#2F86E8",
    crystal: ["#D11F3C", "#F5A3B0"],
    blurb: "Dark cherry, iced. Adult, not a sweets aisle.",
    heroSrc: "/tins/cherry-ice.jpg",
    lidSrc: "/tins/cherry-ice-lid.png",
    comingSoon: true,
  },
];

export const LAUNCH_FLAVOURS = FLAVOURS.filter((flavour) => !flavour.comingSoon);
export const SECONDARY_FLAVOURS = FLAVOURS.filter((flavour) => flavour.comingSoon);

export const DEFAULT_FLAVOUR: FlavourSlug = "blue-razz";

export const DOSE = {
  caffeineMg: 80,
  theanineMg: 60,
  sodiumMg: 50,
  potassiumMg: 50,
  b6Mg: 1.7,
  b6Nrv: 100,
  b12Ug: 2.4,
  b12Nrv: 100,
  pouchGrams: 0.5,
  pouchesPerCan: 20,
  maxPouchesPerDay: 2,
} as const;

export const PROOF = ["Caffeine", "Theanine", "Na", "K", "B6", "B12"] as const;

export function doseList() {
  return `${DOSE.caffeineMg} mg caffeine, ${DOSE.theanineMg} mg L-theanine, ${DOSE.sodiumMg} mg sodium, ${DOSE.potassiumMg} mg potassium, vitamin B6 ${DOSE.b6Mg} mg (${DOSE.b6Nrv}% NRV), vitamin B12 ${DOSE.b12Ug} µg (${DOSE.b12Nrv}% NRV)`;
}

export type SkuId =
  | FlavourSlug
  | "variety-3"
  | "pack-5";

export type Product = {
  sku: SkuId;
  name: string;
  detail: string;
  priceGbp: number;
  pouches: number;
  image: string;
  flavours: FlavourSlug[];
};

export const PRICE = {
  single: 12.99,
  variety3: 34.99,
  pack5: 54.99,
  subscribeOff: 0.2,
} as const;

export function subscribePrice(price: number) {
  return Math.round(price * (1 - PRICE.subscribeOff) * 100) / 100;
}

export function gbp(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

export function gbpPerPouch(price: number, pouches: number) {
  return gbp(Math.round((price / pouches) * 100) / 100);
}

export const PRODUCTS: Product[] = [
  ...FLAVOURS.map((flavour) => ({
    sku: flavour.slug,
    name: flavour.comingSoon ? `${flavour.name} can — coming soon` : `${flavour.name} can`,
    detail: flavour.comingSoon
      ? `${DOSE.pouchesPerCan} pouches · notify for first drop`
      : `${DOSE.pouchesPerCan} pouches`,
    priceGbp: PRICE.single,
    pouches: DOSE.pouchesPerCan,
    image: flavour.heroSrc,
    flavours: [flavour.slug] as FlavourSlug[],
  })),
  {
    sku: "variety-3",
    name: "3-can variety",
    detail: "Frost Mint, Citrus Ice, Blue Razz",
    priceGbp: PRICE.variety3,
    pouches: DOSE.pouchesPerCan * 3,
    image: "/tins/variety-3.jpg",
    flavours: ["frost-mint", "citrus-ice", "blue-razz"],
  },
  {
    sku: "pack-5",
    name: "5-pack",
    detail: "Launch three plus Peach Ice and Cherry Ice (coming soon)",
    priceGbp: PRICE.pack5,
    pouches: DOSE.pouchesPerCan * 5,
    image: "/tins/five-pack.jpg",
    flavours: FLAVOURS.map((f) => f.slug),
  },
];

export function productBySku(sku: SkuId) {
  const found = PRODUCTS.find((p) => p.sku === sku);
  if (!found) throw new Error(`Unknown sku ${sku}`);
  return found;
}

export function flavourBySlug(slug: string) {
  return FLAVOURS.find((f) => f.slug === slug);
}
