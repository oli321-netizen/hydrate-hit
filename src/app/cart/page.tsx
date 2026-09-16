import type { Metadata } from "next";
import { WaitlistForm } from "@/components/WaitlistForm";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Priority delivery",
  description:
    `Register interest for ${SITE_NAME} nicotine-free pouches. Priority delivery when the first drop ships. UK. Pounds.`,
  alternates: { canonical: "/waitlist" },
};

export default function CartPage() {
  return (
    <main className="px-4 pb-28 pt-24 md:px-8">
      <div className="mx-auto max-w-xl">
        <h1 className="text-4xl font-semibold tracking-tighter md:text-6xl">
          Get priority delivery
        </h1>
        <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-ink-soft">
          Nothing to buy yet. Register interest and you ship first when the
          drop goes out.
        </p>
        <WaitlistForm meta={{ source: "cart-page", intent: "waitlist" }} />
      </div>
    </main>
  );
}
