"use client";
import { useCart } from "@/lib/cart";

// Fait disparaître en fondu les écritures du site :
// - pendant la scène finale (après le paiement),
// - quand le panier est ouvert, pour laisser voir le laboratoire derrière.
// `onlyCart` : ne disparaît que pour le panier (utilisé pour le contenu des pages,
// car la phrase finale est elle-même dans la page).
// `className` : classes ajoutées à l'enveloppe (ex. « sticky top-0 » pour que l'en-tête
// reste collé en haut : c'est l'enveloppe qui doit être collante, pas l'en-tête dedans).
export default function UiFader({ children, onlyCart = false, className }: { children: React.ReactNode; onlyCart?: boolean; className?: string }) {
  const { ordered, open } = useCart();
  const hidden = open || (!onlyCart && ordered);
  return (
    <div className={className} style={{ opacity: hidden ? 0 : 1, transition: "opacity .7s ease", pointerEvents: hidden ? "none" : undefined }} aria-hidden={hidden || undefined}>
      {children}
    </div>
  );
}
