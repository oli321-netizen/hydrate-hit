import type { Metadata } from "next";
import { ProductLine } from "@/components/ProductLine";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Buy Hydrate Hit in pounds. Five flavours, 3-can variety, 5-pack. Register interest for priority delivery — not checkout.",
  alternates: { canonical: "/shop" },
  openGraph: { url: "/shop", title: "Shop · Hydrate Hit" },
};

export default function ShopPage() {
  return <ProductLine />;
}
