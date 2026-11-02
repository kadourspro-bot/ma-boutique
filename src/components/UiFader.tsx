"use client";
import { useCart } from "@/lib/cart";

// Fait disparaître en fondu toutes les écritures du site pendant la scène finale.
export default function UiFader({ children }: { children: React.ReactNode }) {
  const { ordered } = useCart();
  return (
    <div style={{ opacity: ordered ? 0 : 1, transition: "opacity 1s ease", pointerEvents: ordered ? "none" : undefined }} aria-hidden={ordered || undefined}>
      {children}
    </div>
  );
}
