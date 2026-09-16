import type { Metadata } from "next";
import { ProductLine } from "@/components/ProductLine";

export const metadata: Metadata = {
  title: "Shop nicotine-free pouches",
  description:
    "Shop FluxHit in pounds. Frost Mint, Citrus Ice, Blue Razz nicotine-free caffeine pouches, 3-can variety, 5-pack. Register interest for priority delivery — not checkout.",
  alternates: { canonical: "/shop" },
  openGraph: { url: "/shop", title: "Shop nicotine-free pouches · FluxHit" },
};

export default function ShopPage() {
  return <ProductLine />;
}
