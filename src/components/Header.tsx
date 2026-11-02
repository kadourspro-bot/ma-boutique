"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { site } from "@/config/site";
import Logo from "./Logo";

export default function Header() {
  const { count, setOpen } = useCart();
  return (
    <header className="sticky top-0 z-30 border-b border-silver/10 bg-night/70 backdrop-blur-xl">
      <p className="border-b border-silver/5 py-2 text-center font-display text-[10px] uppercase tracking-[0.25em] text-silver/80 sm:text-xs">{site.announcement}</p>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4" aria-label="Navigation principale">
        <Link href="/" aria-label="Lunaria, accueil"><Logo /></Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/#collection" className="hidden hover:text-lilac sm:inline">Collection</Link>
          <Link href="/#rituel" className="hidden hover:text-lilac md:inline">Rituel</Link>
          <Link href="/#univers" className="hidden hover:text-lilac md:inline">Univers</Link>
          <Link href="/#faq" className="hidden hover:text-lilac lg:inline">FAQ</Link>
          <button onClick={() => setOpen(true)} className="btn-ghost rounded-full px-4 py-2" aria-label={`Ouvrir le panier, ${count} article(s)`}>
            Panier
            {count > 0 && <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-lilac px-1 text-xs font-semibold text-night">{count}</span>}
          </button>
        </div>
      </nav>
    </header>
  );
}
