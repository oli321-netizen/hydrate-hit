import type { Metadata } from "next";
import { ProductLine } from "@/components/ProductLine";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Flavours",
  description:
    `Frost Mint, Citrus Ice, Blue Razz, Peach Ice, Cherry Ice. ${SITE_NAME} nicotine-free pouches, priced in pounds.`,
  alternates: { canonical: "/shop" },
  openGraph: { url: "/shop", title: `Flavours · ${SITE_NAME}` },
};

export default function FlavoursIndexPage() {
  return <ProductLine />;
}
