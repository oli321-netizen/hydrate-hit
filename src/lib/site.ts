export const SITE_NAME = "Hydrate Hit";
export const TAGLINE = "The pouch that hydrates and hits.";
export const CAN_LINE = "80mg caffeine · 300mg electrolytes · B6 + B12";

/** Apex custom domain (Railway + Cloudflare). */
export const CUSTOM_DOMAIN = (
  process.env.NEXT_PUBLIC_CUSTOM_DOMAIN ??
  process.env.CUSTOM_DOMAIN ??
  "hydrationhit.com"
)
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "");

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://${CUSTOM_DOMAIN}`;
export const LOCALE = "en-GB";
export const CURRENCY = "GBP";

/** Prefix a public file path with an optional basePath. Idempotent. */
export function asset(path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (!BASE_PATH) return clean;
  if (clean === BASE_PATH || clean.startsWith(`${BASE_PATH}/`)) return clean;
  return `${BASE_PATH}${clean}`;
}
