import type { Flavour } from "@/lib/products";

export function FlavourName({
  flavour,
  className = "",
  as: Tag = "span",
}: {
  flavour: Flavour;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  return (
    <Tag className={className}>
      <span style={{ color: flavour.toneA }}>{flavour.wordA}</span>{" "}
      <span style={{ color: flavour.toneB }}>{flavour.wordB}</span>
    </Tag>
  );
}

export function AccentLine({
  flavour,
  children = "hydrates and hits",
}: {
  flavour: Flavour;
  children?: string;
}) {
  return (
    <p className="flex items-center justify-center gap-3 text-sm text-ink-soft">
      <span className="h-px w-8" style={{ background: flavour.toneB }} />
      {children}
      <span className="h-px w-8" style={{ background: flavour.toneA }} />
    </p>
  );
}

export function ProofStrip({ className = "" }: { className?: string }) {
  const items = ["Caffeine", "Na", "K", "Mg", "B6", "B12"];
  return (
    <p className={`font-mono text-[11px] uppercase tracking-[0.18em] text-muted ${className}`}>
      {items.map((item, i) => (
        <span key={item}>
          {i > 0 && (
            <span className="mx-1.5" style={{ color: i % 2 ? "#1f6fe5" : "#d63d8c" }}>
              ·
            </span>
          )}
          {item}
        </span>
      ))}
    </p>
  );
}

export function CrystalMark({
  a,
  b,
  className = "h-10 w-10",
}: {
  a: string;
  b: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <polygon points="8,28 32,6 40,30 24,58" fill={a} />
      <polygon points="32,6 56,28 40,58 40,30" fill={b} />
      <polyline
        points="32,6 28,28 24,58"
        fill="none"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
    </svg>
  );
}
