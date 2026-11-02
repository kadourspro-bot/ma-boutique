"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { getProduct, formatPrice } from "@/lib/products";
import { site } from "@/config/site";
import PlanetArrival from "@/components/PlanetArrival";
import { useEffect } from "react";

// Checkout en une seule page. Le paiement sera branché ensuite (Stripe Checkout, Mollie, PayPlug…).
export default function Commande() {
  const { lines, subtotal, shipping, total, clear, setOrdered } = useCart();
  useEffect(() => () => setOrdered(false), [setOrdered]); // en quittant la page, la lune revient
  const [done, setDone] = useState(false);
  if (done) return <PlanetArrival />;
  if (lines.length === 0) return <div className="max-w-xl mx-auto px-4 py-20 text-center"><p>Votre panier est vide.</p></div>;
  const field = "mt-1 w-full rounded-xl border border-silver/20 bg-night/60 px-3 py-2.5 outline-none focus:border-brand focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--lilac)_25%,transparent)]";
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid gap-10 md:grid-cols-[1fr_360px]">
      <form onSubmit={(e) => { e.preventDefault(); clear(); setDone(true); setOrdered(true); window.scrollTo({ top: 0 }); }} className="glass rounded-3xl p-6 space-y-4">
        <h1 className="font-display text-2xl font-bold title-gradient">Finaliser la commande</h1>
        <p className="text-sm text-white/60">Pas besoin de créer de compte.</p>
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
          {site.shippingOptions.map((o, i) => (
            <label key={o} className="flex gap-2 border border-silver/20 rounded-xl p-3 has-[:checked]:border-brand has-[:checked]:bg-brand/10 cursor-pointer accent-[var(--lilac)]"><input type="radio" name="ship" defaultChecked={i === 0} /> {o}</label>
          ))}
        </fieldset>
        <label className="flex gap-2 text-sm"><input required type="checkbox" /> J&apos;accepte les CGV.</label>
        <button className="btn-neon w-full rounded-full py-3.5">Payer {formatPrice(total)}</button>
        <p className="text-xs text-center text-white/60">Démo : aucun paiement réel n&apos;est effectué.</p>
      </form>
      <aside className="glass rounded-3xl p-5 h-fit space-y-3 md:sticky md:top-32">
        <h2 className="font-semibold">Récapitulatif</h2>
        {lines.map((l) => { const p = getProduct(l.slug); return p && <div key={l.slug} className="flex justify-between text-sm"><span>{l.qty} × {p.name}</span><span>{formatPrice(p.price * l.qty)}</span></div>; })}
        <hr className="border-white/10" />
        <div className="flex justify-between text-sm"><span>Sous-total</span><span>{formatPrice(subtotal)}</span></div>
        <div className="flex justify-between text-sm"><span>Livraison</span><span>{shipping === 0 ? "Offerte" : formatPrice(shipping)}</span></div>
        <details className="text-sm"><summary className="cursor-pointer">Vous avez un code promo ?</summary><input className={`${field} mt-2`} placeholder="CODE" /></details>
        <div className="flex justify-between font-display text-lg text-brand"><span>Total</span><span>{formatPrice(total)}</span></div>
      </aside>
    </div>
  );
}
