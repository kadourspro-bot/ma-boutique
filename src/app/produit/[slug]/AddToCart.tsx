"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export default function AddToCart({ slug, price, disabled }: { slug: string; price: number; disabled: boolean }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const btn = (
    <button disabled={disabled} onClick={() => add(slug, qty)} className="flex-1 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-neutral-300 text-white font-semibold py-3 px-6">
      {disabled ? "Épuisé" : `Ajouter au panier · ${formatPrice(price * qty)}`}
    </button>
  );
  return (
    <>
      <div className="mt-6 flex gap-3">
        <div className="flex items-center border rounded-full">
          <button className="px-4 py-3" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Diminuer la quantité">−</button>
          <span className="w-6 text-center" aria-live="polite">{qty}</span>
          <button className="px-4 py-3" onClick={() => setQty(qty + 1)} aria-label="Augmenter la quantité">+</button>
        </div>
        {btn}
      </div>
      {/* Bouton collant sur mobile : le CTA reste toujours visible */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-20 bg-white border-t p-3 flex">{btn}</div>
    </>
  );
}
