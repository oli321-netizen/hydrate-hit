import { CAN_LINE, SITE_NAME, TAGLINE } from "@/lib/site";
import { CrystalMark, ProofStrip } from "@/components/Brand";
import { ShopCta, WaitlistCta } from "@/components/Ctas";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-14 pt-24 md:px-8 md:pb-24 md:pt-28">
      <div
        className="pointer-events-none absolute -right-16 top-8 opacity-[0.14] md:right-8 md:top-12 md:opacity-20"
        aria-hidden
      >
        <CrystalMark a="#1f6fe5" b="#d63d8c" className="h-72 w-72 md:h-[28rem] md:w-[28rem]" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
          {SITE_NAME}
        </p>
        <h1 className="mt-4 max-w-[14ch] text-5xl font-semibold leading-[0.92] tracking-tighter text-ink md:text-7xl">
          {TAGLINE}
        </h1>
        <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-ink-soft">
          A nicotine-free, sugar-free oral pouch. L-theanine for a smooth
          caffeine hit. Sodium and potassium electrolytes. {CAN_LINE}.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ShopCta href="/#stack">Learn the stack</ShopCta>
          <WaitlistCta href="/#waitlist">Join waitlist</WaitlistCta>
        </div>
        <ProofStrip className="mt-8" />
      </div>
    </section>
  );
}
