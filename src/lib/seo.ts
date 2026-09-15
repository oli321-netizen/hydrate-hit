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
    title: "Nicotine-free pouches with caffeine",
    description:
      "Nicotine-free pouches from Hydrate Hit: 80 mg caffeine, named electrolytes, B6 and B12. Tobacco-free lip pouches. UK waitlist. From £12.99.",
  },
  {
    path: "/snus-alternative",
    title: "Snus alternative without nicotine",
    description:
      "A snus alternative without nicotine or tobacco. Hydrate Hit is a UK caffeine and electrolyte lip pouch — same ritual, named doses, waitlist only.",
  },
  {
    path: "/electrolyte-pouches",
    title: "Electrolyte pouches with named salts",
    description:
      "Electrolyte pouches with 150 mg sodium, 100 mg potassium, 50 mg magnesium plus 80 mg caffeine. Nicotine-free. Hydrate Hit, UK.",
  },
  {
    path: "/guides/caffeine-pouch-vs-energy-drink",
    title: "Caffeine pouch vs energy drink",
    description:
      "Caffeine pouches vs energy drinks: Hydrate Hit is 80 mg caffeine in a lip pouch, named electrolytes, no nicotine, no cup. UK.",
  },
] as const;

export type SeoFaq = { q: string; a: string };

export function faqPageLd(faqs: readonly SeoFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function seoPageMeta(path: (typeof SEO_PAGES)[number]["path"]) {
  const page = SEO_PAGES.find((entry) => entry.path === path);
  if (!page) throw new Error(`Unknown SEO page ${path}`);
  return routeMeta(page.path, page.title, page.description);
}

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
