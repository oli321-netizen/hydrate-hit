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
};

export const FLAVOURS: Flavour[] = [
  {
    slug: "frost-mint",
    name: "Frost Mint",
    wordA: "FROST",
    wordB: "MINT",
    toneA: "#3A9FD4",
    toneB: "#7EC8E8",
    crystal: ["#3A9FD4", "#B9E4F7"],
    blurb: "Cold mint. Clean hit. No syrupy aftertaste.",
    heroSrc: "/tins/frost-mint.jpg",
    lidSrc: "/tins/frost-mint-lid.png",
  },
  {
    slug: "citrus-ice",
    name: "Citrus Ice",
    wordA: "CITRUS",
    wordB: "ICE",
    toneA: "#8FBF3A",
    toneB: "#C5D94A",
    crystal: ["#8FBF3A", "#DCE98A"],
    blurb: "Sharp citrus, iced. Breakfast energy, evening manners.",
    heroSrc: "/tins/citrus-ice.jpg",
    lidSrc: "/tins/citrus-ice-lid.png",
  },
  {
    slug: "blue-razz",
    name: "Blue Razz",
    wordA: "BLUE",
    wordB: "RAZZ",
    toneA: "#1F6FE5",
    toneB: "#D63D8C",
    crystal: ["#1F6FE5", "#D63D8C"],
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
    toneB: "#F3B39A",
    crystal: ["#E8896A", "#F7D0C0"],
    blurb: "Stone fruit, chilled. Soft on the tongue, not on the dose.",
    heroSrc: "/tins/peach-ice.jpg",
    lidSrc: "/tins/peach-ice-lid.png",
  },
  {
    slug: "cherry-ice",
    name: "Cherry Ice",
    wordA: "CHERRY",
    wordB: "ICE",
    toneA: "#D11F3C",
    toneB: "#F0627A",
    crystal: ["#D11F3C", "#F5A3B0"],
    blurb: "Dark cherry, iced. Adult, not a sweets aisle.",
    heroSrc: "/tins/cherry-ice.jpg",
    lidSrc: "/tins/cherry-ice-lid.png",
  },
];

export const DEFAULT_FLAVOUR: FlavourSlug = "blue-razz";

export const DOSE = {
  caffeineMg: 80,
  sodiumMg: 150,
  potassiumMg: 100,
  magnesiumMg: 50,
  electrolytesMg: 300,
  b6Mg: 1.7,
  b12Ug: 2.4,
  pouchesPerCan: 20,
} as const;

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

export const PRODUCTS: Product[] = [
  ...FLAVOURS.map((flavour) => ({
    sku: flavour.slug,
    name: `${flavour.name} can`,
    detail: `${DOSE.pouchesPerCan} pouches`,
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
    image: "/tins/five-pack.jpg",
    flavours: ["frost-mint", "citrus-ice", "blue-razz"],
  },
  {
    sku: "pack-5",
    name: "5-pack",
    detail: "All five flavours",
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

export const PROOF = ["Caffeine", "Na", "K", "Mg", "B6", "B12"] as const;
