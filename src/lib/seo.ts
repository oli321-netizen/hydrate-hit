import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

/** Canonical share image. Always the apex URL — never prefix with /hydrate-hit. */
export const OG_IMAGE_URL = "https://hydrationhit.com/og.jpg";
export const OG_IMAGE = {
  url: OG_IMAGE_URL,
  width: 1200,
  height: 630,
  alt: "Hydrate Hit — the pouch that hydrates and hits. Blue Razz tin.",
};

export const SEO_PAGES = [
  {
    path: "/nicotine-free-pouches",
    title: "Nicotine-free oral pouches",
    description:
      "Hydrate Hit is a nicotine-free oral pouch: caffeine, electrolytes, B6 and B12 in a lip pouch. Tobacco-free. From £12.99. UK.",
  },
  {
    path: "/snus-alternative",
    title: "A snus-format alternative without nicotine",
    description:
      "Want the pouch ritual without nicotine or tobacco? Hydrate Hit is a caffeine and electrolyte lip pouch, not snus and not a nicotine pouch.",
  },
  {
    path: "/electrolyte-pouches",
    title: "Electrolyte pouches for hydration",
    description:
      "Hydrate Hit electrolyte pouches: 150 mg sodium, 100 mg potassium, 50 mg magnesium (~300 mg) plus 80 mg caffeine. Named doses. GBP.",
  },
  {
    path: "/guides/caffeine-pouch-vs-energy-drink",
    title: "Caffeine pouch vs energy drink",
    description:
      "How a nicotine-free caffeine pouch compares with an energy drink: 80 mg caffeine, no cup, named electrolytes. Hydrate Hit, UK, pounds.",
  },
] as const;

export function routeMeta(
  path: string,
  title: string,
  description: string,
  extra?: Metadata,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: "en_GB",
      url: path,
      siteName: SITE_NAME,
      title: `${title} · ${SITE_NAME}`,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${SITE_NAME}`,
      description,
      images: [OG_IMAGE_URL],
    },
    ...extra,
  };
}
