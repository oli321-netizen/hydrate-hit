import { SITE_URL } from "@/lib/site";
import { FLAVOURS } from "@/lib/products";
import { SEO_PAGES } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap() {
  const now = new Date();
  const staticPaths = ["", "/shop", "/flavours", "/waitlist", "/cart"].map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified: now,
  }));
  const flavours = FLAVOURS.map((flavour) => ({
    url: `${SITE_URL}/flavours/${flavour.slug}`,
    lastModified: now,
  }));
  const seo = SEO_PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: now,
  }));
  return [...staticPaths, ...flavours, ...seo];
}
