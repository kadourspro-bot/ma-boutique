"use client";
import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";

export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const out = p.stock === 0;
  return (
    <article className="group rounded-2xl border border-neutral-200 p-3 flex flex-col">
      <Link href={`/produit/${p.slug}`} className="block">
        <img src={p.image} alt={p.name} className="aspect-square w-full rounded-xl bg-neutral-100 object-cover" />
        <h3 className="mt-3 font-semibold">{p.name}</h3>
        <p className="text-sm text-neutral-600">{p.short}</p>
      </Link>
      <div className="mt-auto pt-3 flex items-center justify-between gap-2">
        <span className="font-bold">{formatPrice(p.price)}</span>
        <button disabled={out} onClick={() => add(p.slug)} className="rounded-full bg-neutral-900 text-white text-sm px-4 py-2 disabled:bg-neutral-300">
          {out ? "Épuisé" : "Ajouter"}
        </button>
      </div>
      {!out && p.stock <= 5 && <p className="text-xs text-amber-700 mt-1">Plus que {p.stock} en stock</p>}
    </article>
  );
}
