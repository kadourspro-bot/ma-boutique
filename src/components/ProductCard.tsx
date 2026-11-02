"use client";
import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";

export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const out = p.stock === 0;
  return (
    <article className="glass glass-hover group flex flex-col rounded-[1.75rem] p-3">
      <Link href={`/produit/${p.slug}`} className="block">
        <div className="pearl relative aspect-[4/5] w-full overflow-hidden rounded-[1.4rem]">
          <div className="absolute inset-x-6 bottom-6 h-1/2 rounded-full opacity-40 blur-2xl transition-opacity duration-700 group-hover:opacity-80" style={{ background: p.accent }} />
          <img src={p.image} alt={p.name} className="relative h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-[1.04]" />
          <span className="absolute left-3 top-3 rounded-full bg-night/85 px-3 py-1 font-display text-[10px] uppercase tracking-[0.2em] text-silver">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: p.accent }} />{p.range}
          </span>
        </div>
        <h3 className="mt-4 px-1 font-display text-lg tracking-wide">{p.name}</h3>
        <p className="px-1 text-sm text-ivory/60">{p.short}</p>
      </Link>
      <div className="mt-auto flex items-center justify-between gap-2 px-1 pt-4">
        <span className="font-display text-lg text-silver">{formatPrice(p.price)}</span>
        <button disabled={out} onClick={() => add(p.slug)} className="btn-neon rounded-full px-5 py-2 text-sm">{out ? "Épuisé" : "Ajouter"}</button>
      </div>
      {!out && p.stock <= 5 && <p className="mt-1 px-1 text-xs text-lilac">Plus que {p.stock} en stock</p>}
    </article>
  );
}
