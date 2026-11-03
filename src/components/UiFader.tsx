"use client";
import { useCart } from "@/lib/cart";

// Fait disparaître en fondu les écritures du site :
// - pendant la scène finale (après le paiement),
// - quand le panier est ouvert, pour laisser voir le laboratoire derrière.
// `onlyCart` : ne disparaît que pour le panier (utilisé pour le contenu des pages,
// car la phrase finale est elle-même dans la page).
export default function UiFader({ children, onlyCart = false }: { children: React.ReactNode; onlyCart?: boolean }) {
  const { ordered, open } = useCart();
  const hidden = open || (!onlyCart && ordered);
  return (
    <div style={{ opacity: hidden ? 0 : 1, transition: "opacity .7s ease", pointerEvents: hidden ? "none" : undefined }} aria-hidden={hidden || undefined}>
      {children}
    </div>
  );
}
