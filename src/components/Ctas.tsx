import type { ReactNode } from "react";
import Link from "next/link";

type Base = {
  children?: ReactNode;
  className?: string;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function PackCta({
  href = "/shop",
  children = "Shop the 5-pack",
  className,
}: Base & { href?: string }) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex h-12 items-center justify-center rounded-2xl bg-paper px-5 text-sm font-semibold tracking-tight text-ink shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)] transition-transform hover:bg-white active:scale-[0.98]",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function ShopCta({
  href = "/#shop",
  children = "Shop the 5-pack",
  className,
}: Base & { href?: string }) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex h-12 items-center justify-center rounded-2xl bg-ink px-5 text-sm font-semibold tracking-tight text-paper transition-transform hover:bg-zinc-800 active:scale-[0.98]",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function WaitlistCta({
  href = "/#waitlist",
  children = "Join waitlist",
  className,
}: Base & { href?: string }) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex h-12 items-center justify-center px-1 text-sm font-semibold tracking-tight text-ink",
        "bg-[linear-gradient(90deg,var(--accent),var(--accent-2))] bg-bottom bg-no-repeat [background-size:100%_2px] hover:[background-size:100%_4px] active:translate-y-px",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function AddCanButton({
  onClick,
  children = "Add can",
  accent = "#1f6fe5",
  className,
}: Base & { onClick: () => void; accent?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "inline-flex h-11 items-center justify-center rounded-2xl border border-line bg-paper px-4 text-sm font-semibold text-ink transition-transform hover:bg-white active:scale-[0.98]",
        className,
      )}
      style={{ boxShadow: `inset 4px 0 0 ${accent}` }}
    >
      {children}
    </button>
  );
}

export function SubscribeButton({
  onClick,
  children = "Subscribe, save 20%",
  className,
}: Base & { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "inline-flex h-11 items-center justify-center rounded-2xl border border-ink/15 bg-transparent px-4 text-sm font-medium text-ink-soft hover:border-ink hover:text-ink active:scale-[0.98]",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function FirstDropButton({
  children = "Get first drop",
  className,
  type = "submit",
}: Base & { type?: "submit" | "button" }) {
  return (
    <button
      type={type}
      className={cx(
        "inline-flex h-12 items-center justify-center rounded-2xl px-5 text-sm font-semibold text-paper active:scale-[0.98]",
        className,
      )}
      style={{
        background: "linear-gradient(90deg, #1f6fe5 0%, #1f6fe5 48%, #d63d8c 52%, #d63d8c 100%)",
      }}
    >
      {children}
    </button>
  );
}

export function StickyAddButton({
  onClick,
  children,
  className,
}: Base & { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "inline-flex h-11 min-w-[7.5rem] items-center justify-center rounded-2xl bg-ink text-sm font-semibold text-paper active:scale-[0.98]",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function CheckoutButton({
  onClick,
  children = "Checkout (stub)",
  className,
}: Base & { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "inline-flex h-12 w-full items-center justify-center rounded-2xl bg-accent text-sm font-semibold text-white hover:brightness-95 active:scale-[0.98]",
        className,
      )}
    >
      {children}
    </button>
  );
}
