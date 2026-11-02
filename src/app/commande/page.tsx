"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { getProduct, formatPrice } from "@/lib/products";

// Checkout en une seule page. Le paiement sera branché ensuite (Stripe Checkout, Mollie, PayPlug…).
export default function Commande() {
  const { lines, subtotal, shipping, total, clear } = useCart();
  const [done, setDone] = useState(false);
  if (done) return <div className="max-w-xl mx-auto px-4 py-20 text-center"><h1 className="text-3xl font-bold">Merci pour votre commande !</h1><p className="mt-3 text-neutral-600">Un e-mail de confirmation vous a été envoyé.</p></div>;
  if (lines.length === 0) return <div className="max-w-xl mx-auto px-4 py-20 text-center"><p>Votre panier est vide.</p></div>;
  const field = "w-full rounded-lg border px-3 py-2.5";
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid gap-10 md:grid-cols-[1fr_360px]">
      <form onSubmit={(e) => { e.preventDefault(); clear(); setDone(true); }} className="space-y-4">
        <h1 className="text-2xl font-bold">Finaliser la commande</h1>
        <p className="text-sm text-neutral-600">Pas besoin de créer de compte.</p>
        <label className="block"><span className="text-sm font-medium">E-mail</span><input required type="email" autoComplete="email" className={field} /></label>
        <div className="grid grid-cols-2 gap-3">
          <label><span className="text-sm font-medium">Prénom</span><input required autoComplete="given-name" className={field} /></label>
          <label><span className="text-sm font-medium">Nom</span><input required autoComplete="family-name" className={field} /></label>
        </div>
        <label className="block"><span className="text-sm font-medium">Adresse</span><input required autoComplete="street-address" className={field} /></label>
        <div className="grid grid-cols-2 gap-3">
          <label><span className="text-sm font-medium">Code postal</span><input required inputMode="numeric" autoComplete="postal-code" className={field} /></label>
          <label><span className="text-sm font-medium">Ville</span><input required autoComplete="address-level2" className={field} /></label>
        </div>
        <label className="block"><span className="text-sm font-medium">Téléphone (pour le transporteur)</span><input type="tel" autoComplete="tel" className={field} /></label>
        <fieldset className="space-y-2"><legend className="text-sm font-medium">Livraison</legend>
          <label className="flex gap-2 border rounded-lg p-3"><input type="radio" name="ship" defaultChecked /> Point relais (2–3 j)</label>
          <label className="flex gap-2 border rounded-lg p-3"><input type="radio" name="ship" /> Domicile (2 j)</label>
        </fieldset>
        <label className="flex gap-2 text-sm"><input required type="checkbox" /> J&apos;accepte les CGV.</label>
        <button className="w-full rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3">Payer {formatPrice(total)}</button>
        <p className="text-xs text-center text-neutral-500">Démo : aucun paiement réel n&apos;est effectué.</p>
      </form>
      <aside className="rounded-2xl bg-neutral-50 p-5 h-fit space-y-3">
        <h2 className="font-semibold">Récapitulatif</h2>
        {lines.map((l) => { const p = getProduct(l.slug); return p && <div key={l.slug} className="flex justify-between text-sm"><span>{l.qty} × {p.name}</span><span>{formatPrice(p.price * l.qty)}</span></div>; })}
        <hr />
        <div className="flex justify-between text-sm"><span>Sous-total</span><span>{formatPrice(subtotal)}</span></div>
        <div className="flex justify-between text-sm"><span>Livraison</span><span>{shipping === 0 ? "Offerte" : formatPrice(shipping)}</span></div>
        <details className="text-sm"><summary className="cursor-pointer">Vous avez un code promo ?</summary><input className={`${field} mt-2`} placeholder="CODE" /></details>
        <div className="flex justify-between font-bold text-lg"><span>Total</span><span>{formatPrice(total)}</span></div>
      </aside>
    </div>
  );
}
