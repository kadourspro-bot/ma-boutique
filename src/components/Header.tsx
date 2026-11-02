"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { FREE_SHIPPING_THRESHOLD, formatPrice } from "@/lib/products";

export default function Header() {
  const { count, setOpen } = useCart();
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-neutral-200">
      <p className="bg-neutral-900 text-white text-center text-sm py-2">
        Livraison offerte dès {formatPrice(FREE_SHIPPING_THRESHOLD)} · Expédition sous 24 h
      </p>
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between" aria-label="Navigation principale">
        <Link href="/" className="font-bold text-xl tracking-tight">MaBoutique</Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/boutique" className="hover:underline">Boutique</Link>
          <Link href="/#faq" className="hover:underline hidden sm:inline">FAQ</Link>
          <button onClick={() => setOpen(true)} className="relative rounded-full bg-neutral-900 text-white px-4 py-2 font-medium" aria-label={`Ouvrir le panier, ${count} article(s)`}>
            Panier
            {count > 0 && <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-xs">{count}</span>}
          </button>
        </div>
      </nav>
    </header>
  );
}
