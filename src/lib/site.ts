export const SITE_NAME = "Hydrate Hit";
export const TAGLINE = "The pouch that hydrates and hits.";
export const CAN_LINE = "80mg caffeine · 300mg electrolytes · B6 + B12";
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://temporary-turbo-alder-9hz0yq0.vercel.app");
export const LOCALE = "en-GB";
export const CURRENCY = "GBP";
