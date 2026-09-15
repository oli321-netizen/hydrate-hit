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

Shop CTAs register interest. They do not add to cart. Joining now gets **priority delivery** when the first drop ships.

## Live site

**https://hydrationhit.com**

`www.hydrationhit.com` should resolve too (GitHub Pages redirects www → apex once DNS is in). Fallback while DNS propagates: https://oli321-netizen.github.io/hydrate-hit/

## DNS records (registrar)

Point the domain at GitHub Pages. Use **either** the four A records **or** an ALIAS/ANAME for the apex — not both overlapping in a way that fights.

### Apex `hydrationhit.com`

**Option A — A records**

| Type | Host / Name | Value | TTL |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | 3600 or Auto |
| A | `@` | `185.199.109.153` | 3600 or Auto |
| A | `@` | `185.199.110.153` | 3600 or Auto |
| A | `@` | `185.199.111.153` | 3600 or Auto |

Optional IPv6 (AAAA), same host `@`:

- `2606:50c0:8000::153`
- `2606:50c0:8001::153`
- `2606:50c0:8002::153`
- `2606:50c0:8003::153`

**Option B — ALIAS / ANAME** (if the registrar supports it, instead of the A records)

| Type | Host / Name | Value |
| --- | --- | --- |
| ALIAS or ANAME | `@` | `oli321-netizen.github.io` |

### `www.hydrationhit.com`

| Type | Host / Name | Value |
| --- | --- | --- |
| CNAME | `www` | `oli321-netizen.github.io` |

Do **not** CNAME the apex `@` unless the registrar’s ALIAS/ANAME product is explicitly that.

Then in GitHub: **Settings → Pages → Custom domain** = `hydrationhit.com` (the deploy workflow also writes the `CNAME` file and tries to enforce HTTPS). Wait for the DNS check to go green, then **Enforce HTTPS**.

## Waitlist email (Formspree / Getform)

Static Pages cannot run `/api/waitlist`. Point the client at a form endpoint so emails land in your Formspree/Getform inbox for the launch mailer.

1. Create a form at [Formspree](https://formspree.io/) or [Getform](https://getform.io/).
2. Copy the form URL (`https://formspree.io/f/xxxxxxxx` or `https://getform.io/f/xxxxxxxx`).
3. Local: put it in `.env.local` as `NEXT_PUBLIC_WAITLIST_ENDPOINT`.
4. GitHub Pages: **Settings → Secrets and variables → Actions → New repository secret** named `WAITLIST_ENDPOINT`, paste the same URL.
5. Redeploy (push to `main` or **Actions → GitHub Pages → Run workflow**).

You can also set `FORMSPREE_ID` or `GETFORM_ID` (id only). The workflow maps those to `NEXT_PUBLIC_FORMSPREE_ID` / `NEXT_PUBLIC_GETFORM_ID`.

Until a secret is set, local `npm run dev` needs `WAITLIST_ENDPOINT` or `NEXT_PUBLIC_WAITLIST_ENDPOINT` to actually store emails. The live site needs the GitHub secret for real capture.

## Stack

Next.js App Router, TypeScript, Tailwind CSS v4, React Three Fiber (3D tin + flavour switcher).

```bash
npm install
npm run dev
npm run build
```

## Site map

- `/` hero with 3D tin, why, stack, shop, how to use, review placeholders, FAQ, waitlist
- `/shop` cans and packs (register-interest modal)
- `/flavours/[slug]` flavour detail
- `/waitlist` priority-delivery list
- Sticky mobile bar opens the same waitlist modal

Checkout is not live. Emails go to the waitlist endpoint for the first-drop campaign.
