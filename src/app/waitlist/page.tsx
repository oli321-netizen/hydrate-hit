import type { Metadata } from "next";
import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Waitlist",
  description: "Join the Hydrate Hit first drop waitlist. UK. Pounds only.",
};

export default function WaitlistPage() {
  return (
    <main className="px-4 pb-28 pt-24 md:px-8">
      <div className="mx-auto max-w-xl">
        <h1 className="text-4xl font-semibold tracking-tighter md:text-6xl">Waitlist</h1>
        <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-ink-soft">
          First cans go to this list. Five flavours, priced in pounds, no nicotine.
        </p>
        <WaitlistForm />
      </div>
    </main>
  );
}
