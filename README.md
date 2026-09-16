# FluxHit

Mobile-first marketing and shop site for **FluxHit**.

## Brand

- Name: FluxHit (one word, capital F and H)
- Tagline: smooth hit · light electrolytes
- Voice: Sharp, dry, adult. UK English. Functional swagger — not TikTok-bro, not wellness brochure.
- Per pouch (0.5 g): 80 mg caffeine · 60 mg L-theanine · 50 mg sodium · 50 mg potassium · B6 1.7 mg (100% NRV) · B12 2.4 µg (100% NRV)
- Proof strip: `Caffeine · Theanine · Na · K · B6 · B12`
- Can line: `80mg caffeine · 60mg theanine · light electrolytes · B6 + B12`
- Launch flavours: Frost Mint, Citrus Ice, Blue Razz
- Coming soon: Peach Ice, Cherry Ice
- Use: place between upper lip and gum; do not chew or swallow; ~20–40 mins; adults 18+; max 2 pouches per day
- Food supplement. Nicotine-free, tobacco-free, sugar-free, spit-free oral pouches.
- Tin artwork: `python3 scripts/generate-brand-assets.py` (needs Pillow + Archivo Black at `/tmp/ArchivoBlack-Regular.ttf`)

## Pricing (GBP only)

| Item | Price | Subscribe (20% off) |
| --- | ---: | ---: |
| Single can, 20 pouches | £12.99 | £10.39 |
| 3-can variety (Frost Mint + Citrus Ice + Blue Razz) | £34.99 | £27.99 |
| 5-pack (launch three plus Peach Ice & Cherry Ice, coming soon) | £54.99 | £43.99 |

Shop CTAs register interest. They do not add to cart. Joining now gets **priority delivery** when the first drop ships.

## Production

**Host: Railway** (Next.js Node server + waitlist API)  
**DNS: Cloudflare** → Railway  
**Canonical URL: https://getfluxhit.com**  
**Alias: https://hydrationhit.com** (stays attached on Railway)  
**Backup: GitHub Pages** at https://oli321-netizen.github.io/hydrate-hit/ (static, no waitlist store)

## Deploy on Railway

1. New project → **Deploy from GitHub** → `oli321-netizen/hydrate-hit` → branch `main`.
2. Railway builds `Dockerfile` (`railway.toml`). No Railway token belongs in this repo.
3. Add **PostgreSQL** in the same Railway project.
4. **Link Postgres to the web service** (Railway does **not** auto-inject `DATABASE_URL`):
   - Web service → **Variables** → **Add Variable**
   - Name: `DATABASE_URL`
   - Value: `${{Postgres.DATABASE_URL}}` (use the **exact** Postgres service name if it is not `Postgres`, e.g. `${{PostgreSQL.DATABASE_URL}}`)
   - Save and **redeploy** the web service.
5. Confirm `GET https://getfluxhit.com/api/waitlist` returns `"storage":"postgres"`. If you see `"file"` plus a `warning`, the URL is present but connect/SSL failed — the app falls back to JSONL so signups still work.
6. Set remaining env vars (below).

Do **not** set `GITHUB_PAGES=true` on Railway.

### Env vars

| Name | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes | `https://getfluxhit.com` |
| `NEXT_PUBLIC_CUSTOM_DOMAIN` | yes | `getfluxhit.com` |
| `DATABASE_URL` | yes on Railway | `${{Postgres.DATABASE_URL}}` on the **web** service, then redeploy |
| `WAITLIST_PATH` | no | JSONL path if no Postgres. Default `data/waitlist.jsonl` |
| `WAITLIST_EXPORT_SECRET` | yes for export | Bearer / `?key=` for CSV download |
| `WAITLIST_FORWARD_ENDPOINT` | no | Extra POST (Formspree/Getform) after local store |
| `PORT` | set by Railway | Listen port |
| `MAINTENANCE_BANNER` | no | `1` / `true` shows a site-wide “we’re updating” bar (server env, request-time — not `NEXT_PUBLIC_`) |
| `MAINTENANCE_ETA` | no | Text after “back in …”, e.g. `about 15 minutes` |
| `MAINTENANCE_MESSAGE` | no | Optional full banner copy override |
| `MAINTENANCE_LOCKDOWN` | no | Optional: dim the site, waitlist still usable |

Do **not** set `GITHUB_PAGES=true` on Railway.

### Maintenance banner

On Railway → web service → **Variables**: set `MAINTENANCE_BANNER=1` and `MAINTENANCE_ETA=about 15 minutes`. Optional `MAINTENANCE_MESSAGE` replaces the whole sentence; `MAINTENANCE_LOCKDOWN=1` dims shop/content but leaves the waitlist usable. Redeploy or restart the service so the new env is picked up (`GET /api/maintenance` should then show `"enabled":true`). Remove `MAINTENANCE_BANNER` or set it to `0` to hide the bar — no code change.

### Export the list (mass email)

```bash
curl -L -H "Authorization: Bearer $WAITLIST_EXPORT_SECRET" \
  https://getfluxhit.com/api/waitlist/export \
  -o waitlist.csv
```

CSV columns: `email,flavour,sku,intent,source,created_at` (unique emails, first signup wins).

## Cloudflare DNS

Point the **getfluxhit.com** zone at Railway. Use the hostname Railway shows (`*.up.railway.app`):

`5euvi6l7.up.railway.app`

| Type | Name | Target | Proxy |
| --- | --- | --- | --- |
| CNAME | `@` | `5euvi6l7.up.railway.app` | **Proxied** (orange cloud) |
| CNAME | `www` | `getfluxhit.com` | **Proxied** |

Cloudflare flattens the apex CNAME. Do not keep GitHub Pages A records on `@` once this is live.

**SSL/TLS** (Cloudflare → Railway): **Full (strict)**. Railway already serves HTTPS.

`hydrationhit.com` remains a working alias (already attached on Railway). Optional Cloudflare Redirect Rule `hydrationhit.com` / `www.hydrationhit.com` → `https://getfluxhit.com`. The Next server also 301s those hosts (and `www.getfluxhit.com`) to the canonical apex.

After DNS is green, in Railway: **Settings → Networking → Custom domain** → `getfluxhit.com` (canonical) and `hydrationhit.com` (alias).

## GitHub Pages backup

The `GitHub Pages` workflow still static-exports the marketing site (API routes stripped). It is **not** production.

- Live backup: https://oli321-netizen.github.io/hydrate-hit/
- Waitlist on Pages only works if you set GitHub secret `WAITLIST_ENDPOINT` to a Formspree/Getform URL.
- Do not attach `getfluxhit.com` or `hydrationhit.com` to Pages while Cloudflare points at Railway.

## Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Waitlist POSTs to `/api/waitlist` and writes `data/waitlist.jsonl` unless `DATABASE_URL` is set.

## Stack

Next.js App Router, TypeScript, Tailwind CSS v4, React Three Fiber (3D tin + flavour switcher).

```bash
npm run build
npm start
```

## Site map

- `/` brand home: splash, hero, why, stack, how to use, light flavour preview, FAQ, waitlist
- `/shop` (also `/flavours`) launch tins, bundles, register-interest modals
- `/flavours/[slug]` flavour detail
- `/waitlist` priority-delivery list
- Nav: Home · Stack · Shop · Waitlist
