import type { Metadata } from "next";
import { ProductLine } from "@/components/ProductLine";

export const metadata: Metadata = {
  title: "Flavours",
  description:
    "Hydrate Hit cans and packs in pounds. Five flavours, 3-can variety, 5-pack. Register interest for priority delivery.",
};

export default function FlavoursIndexPage() {
  return <ProductLine />;
}
