"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { getProduct, formatPrice, FREE_SHIPPING_THRESHOLD } from "@/lib/products";

export default function CartDrawer() {
  const { open, setOpen, lines, setQty, subtotal, shipping, total } = useCart();
  if (!open) return null;
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Panier">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-night/95 border-l border-silver/15 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="font-display font-semibold tracking-wider">Votre panier</h2>
          <button onClick={() => setOpen(false)} aria-label="Fermer le panier" className="text-2xl leading-none px-2 hover:text-lilac">×</button>
        </div>
        <div className="p-4 border-b border-white/10">
          <p className="text-sm text-white/80">
            {remaining > 0 ? <>Plus que <strong className="text-lilac">{formatPrice(remaining)}</strong> pour la livraison offerte</> : <strong className="text-lilac">Livraison offerte débloquée ✦</strong>}
          </p>
          <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-2 rounded-full bg-gradient-to-r from-lilac to-turquoise transition-all" style={{ width: `${progress}%` }} /></div>
        </div>
        <ul className="flex-1 overflow-y-auto divide-y divide-white/10">
          {lines.length === 0 && <li className="p-6 text-white/50">Votre panier est vide.</li>}
          {lines.map((l) => {
            const p = getProduct(l.slug); if (!p) return null;
            return (
              <li key={l.slug} className="p-4 flex gap-3 items-center">
                <img src={p.image} alt="" className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 p-1" />
                <div className="flex-1">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-lilac">{formatPrice(p.price)}</p>
                </div>
                <div className="flex items-center rounded-full border border-silver/20">
                  <button className="px-3 py-1 hover:text-lilac" onClick={() => setQty(l.slug, l.qty - 1)} aria-label={`Retirer un ${p.name}`}>−</button>
                  <span className="px-2" aria-live="polite">{l.qty}</span>
                  <button className="px-3 py-1 hover:text-lilac" onClick={() => setQty(l.slug, l.qty + 1)} aria-label={`Ajouter un ${p.name}`}>+</button>
                </div>
              </li>
            );
          })}
        </ul>
        {lines.length > 0 && (
          <div className="p-4 border-t border-white/10 space-y-2">
            <div className="flex justify-between text-sm text-white/70"><span>Sous-total</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-sm text-white/70"><span>Livraison</span><span>{shipping === 0 ? "Offerte" : formatPrice(shipping)}</span></div>
            <div className="flex justify-between font-display font-semibold text-lg"><span>Total</span><span className="text-lilac">{formatPrice(total)}</span></div>
            <Link href="/commande" onClick={() => setOpen(false)} className="btn-neon block text-center rounded-full py-3.5">
              Commander en 1 minute →
            </Link>
            <p className="text-xs text-center text-white/40">Paiement sécurisé · CB, Apple Pay, Google Pay</p>
          </div>
        )}
      </aside>
    </div>
  );
}
