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
      <h1 className="text-3xl font-bold">Boutique</h1>
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <label className="flex-1"><span className="sr-only">Rechercher</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un produit…" className="w-full rounded-full border px-4 py-2" />
        </label>
        <label><span className="sr-only">Trier</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border px-4 py-2">
            <option value="pop">Populaires</option><option value="asc">Prix croissant</option><option value="desc">Prix décroissant</option>
          </select>
        </label>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`shrink-0 rounded-full px-4 py-1.5 text-sm border ${cat === c ? "bg-dark text-white" : ""}`}>{c}</button>
        ))}
      </div>
      <p className="mt-4 text-sm text-neutral-600">{list.length} produit(s)</p>
      <div className="mt-4 grid gap-4 grid-cols-2 lg:grid-cols-3">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
    </div>
  );
}
