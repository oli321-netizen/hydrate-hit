import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-4 pb-28 pt-24 md:px-8">
      <div className="mx-auto max-w-xl">
        <h1 className="text-4xl font-semibold tracking-tighter">That page is dry.</h1>
        <p className="mt-3 text-ink-soft">No pouch here. Back to the tins.</p>
        <Link href="/" className="mt-6 inline-block text-sm font-semibold underline">
          Home
        </Link>
      </div>
    </main>
  );
}
