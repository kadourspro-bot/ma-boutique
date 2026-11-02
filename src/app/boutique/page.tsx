"use client";
import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function Boutique() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Tous");
  const [sort, setSort] = useState("pop");
  const cats = ["Tous", ...Array.from(new Set(products.map((p) => p.category)))];
  const list = useMemo(() => {
    let l = products.filter((p) => (cat === "Tous" || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase()));
    if (sort === "asc") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "desc") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "pop") l = [...l].sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller));
    return l;
  }, [q, cat, sort]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold title-gradient">Boutique</h1>
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <label className="flex-1"><span className="sr-only">Rechercher</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un produit…" className="w-full rounded-full border border-white/15 bg-black/40 px-4 py-2.5 placeholder:text-white/40 focus:border-brand outline-none" />
        </label>
        <label><span className="sr-only">Trier</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-white/15 bg-black/60 px-4 py-2.5">
            <option value="pop">Populaires</option><option value="asc">Prix croissant</option><option value="desc">Prix décroissant</option>
          </select>
        </label>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`shrink-0 rounded-full px-4 py-1.5 text-sm border transition ${cat === c ? "bg-brand text-black border-brand shadow-[0_0_16px_-2px_var(--brand)] font-semibold" : "border-white/15 hover:border-brand/60"}`}>{c}</button>
        ))}
      </div>
      <p className="mt-4 text-sm text-white/60">{list.length} produit(s)</p>
      <div className="mt-4 grid gap-4 grid-cols-2 lg:grid-cols-3">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
    </div>
  );
}
