import Link from "next/link";
import type { ReactNode } from "react";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { ShopCta, WaitlistCta } from "@/components/Ctas";

export function SeoDoc({
  title,
  lede,
  crumbs,
  children,
}: {
  title: string;
  lede: string;
  crumbs: Array<{ href: string; label: string }>;
  children: ReactNode;
}) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE_NAME,
        item: SITE_URL,
      },
      ...crumbs.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: crumb.label,
        item: `${SITE_URL}${crumb.href === "/" ? "" : crumb.href}`,
      })),
    ],
  };

  return (
    <main className="px-4 pb-28 pt-24 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <article className="mx-auto max-w-3xl">
        <nav className="flex flex-wrap gap-x-2 text-sm text-muted" aria-label="Breadcrumb">
          {[{ href: "/", label: "Home" }, ...crumbs].map((crumb, i, all) => (
            <span key={crumb.href} className="inline-flex items-center gap-2">
              {i === all.length - 1 ? (
                <span className="text-ink">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-ink hover:underline">
                  {crumb.label}
                </Link>
              )}
              {i < all.length - 1 ? <span aria-hidden="true">/</span> : null}
            </span>
          ))}
        </nav>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
          {SITE_NAME}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tighter md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-soft">{lede}</p>
        <div className="mt-10 space-y-8 text-base leading-relaxed text-ink-soft [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-ink [&_p]:max-w-[60ch] [&_ul]:max-w-[60ch] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_a]:font-semibold [&_a]:underline">
          {children}
        </div>
        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ShopCta href="/shop">See flavours</ShopCta>
          <WaitlistCta href="/#waitlist">Join waitlist</WaitlistCta>
          <WaitlistCta href="/">Home</WaitlistCta>
        </div>
      </article>
    </main>
  );
}
