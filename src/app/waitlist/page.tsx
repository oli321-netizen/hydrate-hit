import type { Metadata } from "next";
import { WaitlistForm } from "@/components/WaitlistForm";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Waitlist for priority delivery",
  description:
    `Join the ${SITE_NAME} waitlist. Nicotine-free caffeine pouches with L-theanine and light electrolytes. Priority delivery on the first UK drop. Pounds only.`,
  alternates: { canonical: "/waitlist" },
  openGraph: { url: "/waitlist", title: `Waitlist · ${SITE_NAME}` },
};

export default function WaitlistPage() {
  return (
    <main data-waitlist-page className="px-4 pb-28 pt-24 md:px-8">
      <div className="mx-auto max-w-xl">
        <h1 className="text-4xl font-semibold tracking-tighter md:text-6xl">
          Register interest
        </h1>
        <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-ink-soft">
          Join now. You get priority delivery when the first drop ships. Five
          flavours, priced in pounds, no nicotine.
        </p>
        <WaitlistForm meta={{ source: "waitlist-page", intent: "waitlist" }} />
      </div>
    </main>
  );
}
