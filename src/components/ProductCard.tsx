"use client";
import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";

export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const out = p.stock === 0;
  return (
    <article className="glass glass-hover group rounded-3xl p-3 flex flex-col">
      <Link href={`/produit/${p.slug}`} className="block">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-black/30 border border-white/5">
          <div className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(circle at 50% 60%, color-mix(in srgb, var(--brand) 30%, transparent), transparent 60%)" }} />
          <img src={p.image} alt={p.name} className="relative h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2" />
          {p.bestseller && <span className="absolute left-3 top-3 rounded-full bg-brand/15 border border-brand/40 px-2.5 py-0.5 font-display text-[10px] tracking-widest uppercase text-brand">Best-seller</span>}
        </div>
        <h3 className="mt-3 font-semibold">{p.name}</h3>
        <p className="text-sm text-white/55">{p.short}</p>
      </Link>
      <div className="mt-auto pt-3 flex items-center justify-between gap-2">
        <span className="font-display font-bold text-brand">{formatPrice(p.price)}</span>
        <button disabled={out} onClick={() => add(p.slug)} className="btn-neon rounded-full text-sm px-4 py-2">
          {out ? "Épuisé" : "Ajouter"}
        </button>
      </div>
      {!out && p.stock <= 5 && <p className="text-xs text-amber-300 mt-1">Plus que {p.stock} en stock</p>}
    </article>
  );
}
