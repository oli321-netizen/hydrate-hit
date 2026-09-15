import { Flavours } from "@/components/Flavours";
import { ShopHero } from "@/components/ShopHero";
import { WaitlistBand } from "@/components/WaitlistForm";

export function ProductLine() {
  return (
    <main className="pb-16">
      <ShopHero />
      <Flavours />
      <WaitlistBand />
    </main>
  );
}
