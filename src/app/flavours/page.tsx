import type { Metadata } from "next";
import { ProductLine } from "@/components/ProductLine";

export const metadata: Metadata = {
  title: "Flavours",
  description:
    "Frost Mint, Citrus Ice, Blue Razz, Peach Ice, Cherry Ice. Hydrate Hit nicotine-free pouches, priced in pounds.",
  alternates: { canonical: "/shop" },
  openGraph: { url: "/shop", title: "Flavours · Hydrate Hit" },
};

export default function FlavoursIndexPage() {
  return <ProductLine />;
}
