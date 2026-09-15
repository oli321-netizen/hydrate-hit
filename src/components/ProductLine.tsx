import { PRICE, gbp } from "@/lib/products";
import { Flavours } from "@/components/Flavours";
import { WaitlistBand } from "@/components/WaitlistForm";

export function ProductLine() {
  return (
    <main className="pb-16">
      <div className="px-4 pt-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-semibold tracking-tighter md:text-6xl">Shop</h1>
          <p className="mt-3 max-w-[50ch] text-base leading-relaxed text-ink-soft">
            Single can {gbp(PRICE.single)}. 3-can variety {gbp(PRICE.variety3)}. 5-pack{" "}
            {gbp(PRICE.pack5)}. Register interest for priority delivery — this is
            not checkout.
          </p>
        </div>
      </div>
      <Flavours />
      <WaitlistBand />
    </main>
  );
}
