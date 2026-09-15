import type { Metadata } from "next";
import { ProductLine } from "@/components/ProductLine";

export const dynamic =
  process.env.GITHUB_PAGES === "true" ? "force-static" : "force-dynamic";

export const metadata: Metadata = {
  title: "Shop nicotine-free pouches",
  description:
    "Shop Hydrate Hit in pounds. Five nicotine-free caffeine pouches, 3-can variety, 5-pack. Register interest for priority delivery — not checkout.",
  alternates: { canonical: "/shop" },
  openGraph: { url: "/shop", title: "Shop nicotine-free pouches · Hydrate Hit" },
};

export default function ShopPage() {
  return <ProductLine />;
}
