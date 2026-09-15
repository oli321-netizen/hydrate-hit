# Hydrate Hit

Mobile-first marketing and shop site for **Hydrate Hit**, the pouch that hydrates and hits.

## Brand

- Tagline: The pouch that hydrates and hits.
- Voice: Sharp, dry, adult. UK English.
- Per pouch: 80 mg caffeine · 150 mg sodium · 100 mg potassium · 50 mg magnesium (~300 mg electrolytes) · B6 1.7 mg · B12 2.4 µg
- Can line: `80mg caffeine · 300mg electrolytes · B6 + B12`
- Flavours: Frost Mint, Citrus Ice, Blue Razz, Peach Ice, Cherry Ice

## Pricing (GBP only)

| Item | Price | Subscribe (20% off) |
| --- | ---: | ---: |
| Single can, 20 pouches | £12.99 | £10.39 |
| 3-can variety (Frost Mint + Citrus Ice + Blue Razz) | £34.99 | £27.99 |
| 5-pack (all five) | £54.99 | £43.99 |

## Live site

**https://oli321-netizen.github.io/hydrate-hit/**

Public assets are prefixed with `/hydrate-hit` (GitHub project Pages `basePath`).

## Stack

Next.js App Router, TypeScript, Tailwind CSS v4, React Three Fiber (3D tin + flavour switcher).

```bash
npm install
npm run dev
npm run build
```

## Site map

- `/` hero with 3D tin, why, stack, shop, how to use, review placeholders, FAQ, waitlist
- `/shop` cans and packs
- `/flavours/[slug]` flavour detail
- `/cart` stub cart
- `/waitlist` first-drop list
- Sticky mobile buy bar on marketing and shop routes

Checkout and waitlist storage are stubbed. Totals are real. Payment is not live.
