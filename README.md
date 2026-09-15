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

**https://oli321-netizen.github.io/hydrate-hit/**

Custom domain (ready, DNS may still be pending): **hydrationhit.com**

Public assets on the GitHub project URL are prefixed with `/hydrate-hit`.

## Waitlist email (Formspree / Getform)

Static Pages cannot run `/api/waitlist`. Point the client at a form endpoint so emails land in your Formspree/Getform inbox for the launch mailer.

1. Create a form at [Formspree](https://formspree.io/) or [Getform](https://getform.io/).
2. Copy the form URL (`https://formspree.io/f/xxxxxxxx` or `https://getform.io/f/xxxxxxxx`).
3. Local: put it in `.env.local` as `NEXT_PUBLIC_WAITLIST_ENDPOINT`.
4. GitHub Pages: **Settings → Secrets and variables → Actions → New repository secret** named `WAITLIST_ENDPOINT`, paste the same URL.
5. Redeploy (push to `main` or **Actions → GitHub Pages → Run workflow**).

You can also set `FORMSPREE_ID` or `GETFORM_ID` (id only). The workflow maps those to `NEXT_PUBLIC_FORMSPREE_ID` / `NEXT_PUBLIC_GETFORM_ID`.

Until a secret is set, local `npm run dev` still posts to `/api/waitlist` (stores nothing; use it only to test the UI). The live site needs the secret for real capture.

## Custom domain (GitHub Pages)

Target apex: `hydrationhit.com`. The build writes `CNAME` into the Pages output.

### DNS (at your registrar)

**Apex `hydrationhit.com`** — A records to GitHub Pages:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

**`www.hydrationhit.com`** — CNAME to `oli321-netizen.github.io`.

Then in GitHub: **Settings → Pages → Custom domain** → `hydrationhit.com` → wait for DNS check → enable HTTPS.

### Cut over paths (after DNS is green)

The project URL uses `basePath` `/hydrate-hit`. A custom domain serves from the root, so once DNS works:

1. Repo **Settings → Secrets and variables → Actions → Variables** → `CUSTOM_DOMAIN` = `hydrationhit.com`
2. Push or re-run the Pages workflow.

That drops `/hydrate-hit` from asset URLs and sets the canonical site URL to `https://hydrationhit.com`.

If the domain changes, edit `CNAME`, `public/CNAME`, and the `CUSTOM_DOMAIN` variable.

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
