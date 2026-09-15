# syntax=docker/dockerfile:1
# Next.js 16 standalone on Railway. Do not set GITHUB_PAGES here (that is static export).

FROM node:22-alpine AS base
# sharp / Next image optimizer need musl compat on Alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_CUSTOM_DOMAIN=hydrationhit.com
ENV NEXT_PUBLIC_SITE_URL=https://hydrationhit.com
# Railway is the Node server. Unset so a leaked env cannot flip output to "export".
ENV GITHUB_PAGES=
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build \
  && test -f .next/standalone/server.js \
  && mkdir -p .next/standalone/public .next/standalone/.next/static \
  && cp -a public/. .next/standalone/public/ \
  && cp -a .next/static/. .next/standalone/.next/static/

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Railway injects PORT at runtime; 8080 is the Docker/Railway default.
ENV PORT=8080
ENV HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Re-copy in case standalone trace omitted public or hashed CSS/JS.
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
RUN mkdir -p /app/data /app/.next/cache \
  && chown -R nextjs:nodejs /app/data /app/.next
USER nextjs
EXPOSE 8080
CMD ["node", "server.js"]
