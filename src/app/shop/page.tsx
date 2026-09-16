import type { Metadata } from "next";
import { ProductLine } from "@/components/ProductLine";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop nicotine-free pouches",
  description:
    `Shop ${SITE_NAME} in pounds. Five nicotine-free caffeine pouches with L-theanine and light electrolytes, 3-can variety, 5-pack. Register interest for priority delivery — not checkout.`,
  alternates: { canonical: "/shop" },
  openGraph: { url: "/shop", title: `Shop nicotine-free pouches · ${SITE_NAME}` },
};

export default function ShopPage() {
  return <ProductLine />;
}
