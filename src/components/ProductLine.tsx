import { ShopProduct } from "@/components/ShopProduct";
import { WaitlistBand } from "@/components/WaitlistForm";

export function ProductLine() {
  return (
    <main className="pb-16">
      <ShopProduct />
      <WaitlistBand />
    </main>
  );
}
