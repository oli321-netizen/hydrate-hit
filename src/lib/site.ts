export const SITE_NAME = "Hydrate Hit";
export const TAGLINE = "The pouch that hydrates and hits.";
export const CAN_LINE = "80mg caffeine · 300mg electrolytes · B6 + B12";
export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_PAGES === "true" ? "/hydrate-hit" : "");
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.GITHUB_PAGES === "true"
    ? "https://oli321-netizen.github.io/hydrate-hit"
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://oli321-netizen.github.io/hydrate-hit");
export const LOCALE = "en-GB";
export const CURRENCY = "GBP";

/** Prefix a public file path with the GitHub Pages basePath. Idempotent. */
export function asset(path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (!BASE_PATH) return clean;
  if (clean === BASE_PATH || clean.startsWith(`${BASE_PATH}/`)) return clean;
  return `${BASE_PATH}${clean}`;
}
