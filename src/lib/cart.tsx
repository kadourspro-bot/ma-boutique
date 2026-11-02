"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getProduct, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "./products";

type Line = { slug: string; qty: number };
type Cart = {
  lines: Line[];
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  open: boolean;
  setOpen: (o: boolean) => void;
  ordered: boolean; // commande validée : déclenche l'animation de la planète
  setOrdered: (o: boolean) => void;
};

const CartContext = createContext<Cart | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    try { const s = localStorage.getItem("cart"); if (s) setLines(JSON.parse(s)); } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem("cart", JSON.stringify(lines)); } catch {}
  }, [lines]);

  const add = (slug: string, qty = 1) => {
    setLines((l) => {
      const ex = l.find((x) => x.slug === slug);
      return ex ? l.map((x) => (x.slug === slug ? { ...x, qty: x.qty + qty } : x)) : [...l, { slug, qty }];
    });
    setOpen(true); // ouvre le panier latéral : confirmation immédiate, pas de changement de page
  };
  const setQty = (slug: string, qty: number) =>
    setLines((l) => (qty <= 0 ? l.filter((x) => x.slug !== slug) : l.map((x) => (x.slug === slug ? { ...x, qty } : x))));
  const remove = (slug: string) => setLines((l) => l.filter((x) => x.slug !== slug));
  const clear = () => setLines([]);

  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + (getProduct(l.slug)?.price ?? 0) * l.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  return (
    <CartContext.Provider value={{ lines, add, setQty, remove, clear, count, subtotal, shipping, total: subtotal + shipping, open, setOpen, ordered, setOrdered }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart doit être utilisé dans CartProvider");
  return c;
};
