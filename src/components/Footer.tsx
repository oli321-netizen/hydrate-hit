import Link from "next/link";
import { CAN_LINE, SITE_NAME, TAGLINE } from "@/lib/site";
import { ProofStrip } from "@/components/Brand";
import { WaitlistCta } from "@/components/Ctas";

export function Footer() {
  return (
    <footer className="border-t border-line px-4 pb-28 pt-12 md:px-8 md:pb-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-lg font-extrabold tracking-tight">{SITE_NAME}</p>
          <p className="mt-1 text-sm text-ink-soft">{TAGLINE}</p>
          <p className="mt-3 font-mono text-xs text-muted">{CAN_LINE}</p>
          <ProofStrip className="mt-2" />
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/#stack" className="hover:underline">
            Stack
          </Link>
          <Link href="/shop" className="hover:underline">
            Shop
          </Link>
          <WaitlistCta href="/#waitlist" />
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-muted">
        Food supplement pouch. High caffeine content. Not for children, pregnant
        or breastfeeding people, or those sensitive to caffeine. UK English.
        Prices in pounds sterling.
      </p>
    </footer>
  );
}
