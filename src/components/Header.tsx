"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { site } from "@/config/site";

export default function Header() {
  const { count, setOpen } = useCart();
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <p className="text-center text-[10px] sm:text-sm py-2 font-display tracking-wide sm:tracking-widest uppercase text-brand text-glow border-b border-white/5">
        {site.announcement}
      </p>
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between" aria-label="Navigation principale">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-lg sm:text-xl tracking-wider">
          <span className="inline-block h-3 w-3 rounded-full bg-brand shadow-[0_0_14px_var(--brand)]" aria-hidden />
          {site.name}
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link href="/boutique" className="hover:text-brand transition-colors">Boutique</Link>
          <Link href="/#faq" className="hover:text-brand transition-colors hidden sm:inline">FAQ</Link>
          <button onClick={() => setOpen(true)} className="btn-ghost relative rounded-full px-4 py-2 font-medium" aria-label={`Ouvrir le panier, ${count} article(s)`}>
            Panier
            {count > 0 && <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-bold text-black shadow-[0_0_10px_var(--brand)]">{count}</span>}
          </button>
        </div>
      </nav>
    </header>
  );
}
