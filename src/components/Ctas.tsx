import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";

type Base = {
  children?: ReactNode;
  className?: string;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Hard hex so labels never inherit a parent colour (text-paper/text-ink can vanish). */
const INK = "#18181b";
const PAPER = "#fafafa";
const MUTED = "#3f3f46";

const pill =
  "inline-flex min-h-11 items-center justify-center rounded-2xl px-4 py-2 text-center text-sm font-semibold leading-tight tracking-tight transition-transform active:scale-[0.98]";

export function PackCta({
  href = "/shop",
  children = "Shop the 5-pack",
  className,
}: Base & { href?: string }) {
  return (
    <Link
      href={href}
      className={cx(pill, "shadow-[inset_0_0_0_1px_rgba(24,24,27,0.12)] hover:brightness-[1.03]", className)}
      style={{ backgroundColor: PAPER, color: INK }}
    >
      {children}
    </Link>
  );
}

export function ShopCta({
  href = "/#stack",
  children = "Learn the stack",
  className,
}: Base & { href?: string }) {
  return (
    <Link
      href={href}
      className={cx(pill, "hover:brightness-110", className)}
      style={{ backgroundColor: INK, color: PAPER }}
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
        "inline-flex min-h-11 items-center justify-center px-1 text-sm font-semibold tracking-tight",
        "bg-[linear-gradient(90deg,var(--accent),var(--accent-2))] bg-bottom bg-no-repeat [background-size:100%_2px] hover:[background-size:100%_4px] active:translate-y-px",
        className,
      )}
      style={{ color: INK }}
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
      className={cx(pill, "border border-[#d4d4d8] hover:brightness-[1.03]", className)}
      style={
        {
          backgroundColor: PAPER,
          color: INK,
          boxShadow: `inset 4px 0 0 ${accent}`,
        } satisfies CSSProperties
      }
    >
      {children}
    </button>
  );
}

export function SubscribeButton({
  onClick,
  children = "Subscribe, save 20%",
  className,
  onDark = false,
}: Base & { onClick: () => void; onDark?: boolean }) {
  const color = onDark ? PAPER : MUTED;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        pill,
        "border bg-transparent font-medium hover:brightness-110",
        onDark ? "border-white/40 hover:border-white" : "border-[#18181b]/15 hover:border-[#18181b]",
        className,
      )}
      style={{ color }}
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
      className={cx(pill, className)}
      style={{
        color: PAPER,
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
      className={cx(pill, "min-w-[7.5rem]", className)}
      style={{ backgroundColor: INK, color: PAPER }}
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
      className={cx(pill, "w-full hover:brightness-95", className)}
      style={{ backgroundColor: "#1f6fe5", color: "#ffffff" }}
    >
      {children}
    </button>
  );
}
