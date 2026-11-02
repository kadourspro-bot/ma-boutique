import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/components/HeroSlider";
import { site } from "@/config/site";

// Les textes de cette page se modifient dans src/config/site.ts
export default function Home() {
  const best = products.filter((p) => p.bestseller);
  return (
    <>
      <HeroSlider />

      <section className="max-w-6xl mx-auto px-4 mt-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display text-xs tracking-[0.3em] uppercase text-accent">Échantillons stables</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold">Meilleures ventes</h2>
          </div>
          <Link href="/boutique" className="text-sm text-accent hover:underline">Tout voir →</Link>
        </div>
        <div className="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-3">{best.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      </section>

      <section id="faq" className="max-w-3xl mx-auto px-4 mt-24 scroll-mt-28">
        <p className="font-display text-xs tracking-[0.3em] uppercase text-accent text-center">Base de données</p>
        <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-center">Questions fréquentes</h2>
        <div className="glass mt-8 divide-y divide-white/10 rounded-3xl">
          {site.faq.map(([q, a]) => (
            <details key={q} className="group p-5">
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center gap-4">{q}<span className="text-brand transition-transform group-open:rotate-45 text-xl">+</span></summary>
              <p className="mt-3 text-white/60">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
