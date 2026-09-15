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

## Production

**Host: Railway** (Next.js Node server + waitlist API)  
**DNS: Cloudflare** → Railway  
**Canonical URL: https://hydrationhit.com**  
**Backup: GitHub Pages** at https://oli321-netizen.github.io/hydrate-hit/ (static, no waitlist store)

## Deploy on Railway

1. New project → **Deploy from GitHub** → `oli321-netizen/hydrate-hit` → branch `main`.
2. Railway builds `Dockerfile` (`railway.toml`). No Railway token belongs in this repo.
3. Optional but recommended: **Add PostgreSQL** in the same Railway project.
4. **Link Postgres to the web service** (Railway does **not** auto-inject `DATABASE_URL` into the Next.js service):
   - Open the **web / Next.js** service → **Variables**
   - **Add Variable** → Name: `DATABASE_URL` → Value: `${{Postgres.DATABASE_URL}}`
   - If the DB service is not named `Postgres`, use that exact service name, e.g. `${{PostgreSQL.DATABASE_URL}}`
   - Save (Railway redeploys). Without this reference, signups still return `200` but write to ephemeral `data/waitlist.jsonl` inside the container — **no tables appear in Railway Data**.
5. Set remaining env vars (below).
6. Copy the public hostname, e.g. `hydrate-hit-production.up.railway.app`.

**Verify storage:** `GET https://hydrationhit.com/api/waitlist` returns `{"ok":true,"storage":"postgres"}` when linked (or `"file"` when not). First successful POST with `storage":"postgres"` creates table `waitlist`.

### Env vars

| Name | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes | `https://hydrationhit.com` |
| `NEXT_PUBLIC_CUSTOM_DOMAIN` | yes | `hydrationhit.com` |
| `DATABASE_URL` | recommended | Postgres URL from the Railway plugin |
| `WAITLIST_PATH` | no | JSONL path if no Postgres. Default `data/waitlist.jsonl` |
| `WAITLIST_EXPORT_SECRET` | yes for export | Bearer / `?key=` for CSV download |
| `WAITLIST_FORWARD_ENDPOINT` | no | Extra POST (Formspree/Getform) after local store |
| `PORT` | set by Railway | Listen port |

Do **not** set `GITHUB_PAGES=true` on Railway.

### Export the list (mass email)

```bash
curl -L -H "Authorization: Bearer $WAITLIST_EXPORT_SECRET" \
  https://hydrationhit.com/api/waitlist/export \
  -o waitlist.csv
```

CSV columns: `email,flavour,sku,intent,source,created_at` (unique emails, first signup wins).

## Cloudflare DNS

Point the zone at Railway. Use the hostname Railway shows (`*.up.railway.app`). Placeholder until the service exists:

`hydrate-hit-production.up.railway.app`

| Type | Name | Target | Proxy |
| --- | --- | --- | --- |
| CNAME | `@` | `hydrate-hit-production.up.railway.app` | **Proxied** (orange cloud) |
| CNAME | `www` | `hydrationhit.com` | **Proxied** |

Cloudflare flattens the apex CNAME. Do not keep GitHub Pages A records on `@` once this is live.

**SSL/TLS** (Cloudflare → Railway): **Full (strict)**. Railway already serves HTTPS.

Optional: Cloudflare Redirect Rule `www.hydrationhit.com` → `https://hydrationhit.com` if you prefer apex-only.

After DNS is green, in Railway: **Settings → Networking → Custom domain** → `hydrationhit.com` and `www.hydrationhit.com`.

## GitHub Pages backup

The `GitHub Pages` workflow still static-exports the marketing site (API routes stripped). It is **not** production.

- Live backup: https://oli321-netizen.github.io/hydrate-hit/
- Waitlist on Pages only works if you set GitHub secret `WAITLIST_ENDPOINT` to a Formspree/Getform URL.
- Do not attach `hydrationhit.com` to Pages while Cloudflare points at Railway.

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

- `/` hero with 3D tin, why, stack, shop, how to use, review placeholders, FAQ, waitlist
- `/shop` cans and packs (register-interest modal)
- `/flavours/[slug]` flavour detail
- `/waitlist` priority-delivery list
- Sticky mobile bar opens the same waitlist modal
