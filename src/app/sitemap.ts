import { SITE_URL } from "@/lib/site";
import { FLAVOURS } from "@/lib/products";

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
  return [...staticPaths, ...flavours];
}
