"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { site } from "@/config/site";

export default function Header() {
  const { count, setOpen } = useCart();
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-neutral-200">
      <p className="bg-dark text-white text-center text-sm py-2">
        {site.announcement}
      </p>
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between" aria-label="Navigation principale">
        <Link href="/" className="font-bold text-xl tracking-tight">{site.name}</Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/boutique" className="hover:underline">Boutique</Link>
          <Link href="/#faq" className="hover:underline hidden sm:inline">FAQ</Link>
          <button onClick={() => setOpen(true)} className="relative rounded-full bg-dark text-white px-4 py-2 font-medium" aria-label={`Ouvrir le panier, ${count} article(s)`}>
            Panier
            {count > 0 && <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs">{count}</span>}
          </button>
        </div>
      </nav>
    </header>
  );
}
