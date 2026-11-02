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
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">Votre panier</h2>
          <button onClick={() => setOpen(false)} aria-label="Fermer le panier" className="text-2xl leading-none px-2">×</button>
        </div>
        <div className="p-4 border-b">
          <p className="text-sm">
            {remaining > 0 ? <>Plus que <strong>{formatPrice(remaining)}</strong> pour la livraison offerte</> : <strong className="text-brand">Livraison offerte débloquée 🎉</strong>}
          </p>
          <div className="mt-2 h-2 rounded bg-neutral-200"><div className="h-2 rounded bg-brand" style={{ width: `${progress}%` }} /></div>
        </div>
        <ul className="flex-1 overflow-y-auto divide-y">
          {lines.length === 0 && <li className="p-6 text-neutral-500">Votre panier est vide.</li>}
          {lines.map((l) => {
            const p = getProduct(l.slug); if (!p) return null;
            return (
              <li key={l.slug} className="p-4 flex gap-3 items-center">
                <img src={p.image} alt="" className="w-16 h-16 rounded bg-neutral-100" />
                <div className="flex-1">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-neutral-600">{formatPrice(p.price)}</p>
                </div>
                <div className="flex items-center border rounded">
                  <button className="px-3 py-1" onClick={() => setQty(l.slug, l.qty - 1)} aria-label={`Retirer un ${p.name}`}>−</button>
                  <span className="px-2" aria-live="polite">{l.qty}</span>
                  <button className="px-3 py-1" onClick={() => setQty(l.slug, l.qty + 1)} aria-label={`Ajouter un ${p.name}`}>+</button>
                </div>
              </li>
            );
          })}
        </ul>
        {lines.length > 0 && (
          <div className="p-4 border-t space-y-2">
            <div className="flex justify-between text-sm"><span>Sous-total</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-sm"><span>Livraison</span><span>{shipping === 0 ? "Offerte" : formatPrice(shipping)}</span></div>
            <div className="flex justify-between font-semibold text-lg"><span>Total</span><span>{formatPrice(total)}</span></div>
            <Link href="/commande" onClick={() => setOpen(false)} className="block text-center rounded-full bg-brand hover:opacity-90 text-white font-semibold py-3">
              Commander en 1 minute →
            </Link>
            <p className="text-xs text-center text-neutral-500">Paiement sécurisé · CB, Apple Pay, Google Pay</p>
          </div>
        )}
      </aside>
    </div>
  );
}
