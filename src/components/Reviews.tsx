export function Reviews() {
  return (
    <section id="reviews" className="bg-paper px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl font-semibold tracking-tighter md:text-6xl">
          Reviews land with the first drop.
        </h2>
        <p className="mt-4 max-w-[50ch] text-base leading-relaxed text-ink-soft">
          No invented quotes. When the first cans ship, this is where they sit.
        </p>
        <div className="mt-10 grid gap-px bg-line md:grid-cols-3">
          {["01", "02", "03"].map((slot) => (
            <blockquote key={slot} className="bg-paper p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Slot {slot}
              </p>
              <p className="mt-6 min-h-24 text-xl leading-snug text-zinc-300">
                “ ”
              </p>
              <footer className="mt-6 text-sm text-muted">Awaiting first drop</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
