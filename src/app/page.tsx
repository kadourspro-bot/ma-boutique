import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { site } from "@/config/site";

// Les textes de cette page se modifient dans src/config/site.ts
export default function Home() {
  const best = products.filter((p) => p.bestseller);
  const { hero } = site;
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-24 grid gap-8 sm:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{hero.title}</h1>
          <p className="mt-4 text-lg text-neutral-600">{hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={hero.primaryButton.href} className="rounded-full bg-brand hover:opacity-90 text-white font-semibold px-6 py-3">{hero.primaryButton.label}</Link>
            <Link href={hero.secondaryButton.href} className="rounded-full border border-neutral-300 px-6 py-3 font-semibold">{hero.secondaryButton.label}</Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-700">
            {site.reassurance.map((r) => <li key={r}>✓ {r}</li>)}
          </ul>
        </div>
        <img src={hero.image} alt="" className="w-full aspect-square rounded-3xl bg-neutral-100" />
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">Meilleures ventes</h2>
          <Link href="/boutique" className="text-sm underline">Tout voir</Link>
        </div>
        <div className="mt-6 grid gap-4 grid-cols-2 lg:grid-cols-3">{best.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      </section>

      <section id="faq" className="max-w-3xl mx-auto px-4 mt-20">
        <h2 className="text-2xl font-bold">Questions fréquentes</h2>
        <div className="mt-6 divide-y border rounded-2xl">
          {site.faq.map(([q, a]) => (
            <details key={q} className="p-4"><summary className="font-medium cursor-pointer">{q}</summary><p className="mt-2 text-neutral-600">{a}</p></details>
          ))}
        </div>
      </section>
    </>
  );
}
