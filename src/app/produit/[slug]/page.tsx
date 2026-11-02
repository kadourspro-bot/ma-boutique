import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, products, formatPrice } from "@/lib/products";
import AddToCart from "./AddToCart";
import ProductCard from "@/components/ProductCard";
import { site } from "@/config/site";

export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: p.name, description: p.short } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const related = products.filter((x) => x.slug !== p.slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.short, image: p.image, brand: { "@type": "Brand", name: "Lunaria" },
    offers: { "@type": "Offer", priceCurrency: "EUR", price: (p.price / 100).toFixed(2), availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" },
  };
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 pb-32 sm:pb-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid gap-10 md:grid-cols-2">
        <div className="pearl relative aspect-square overflow-hidden rounded-[2rem]">
          <div className="absolute inset-x-10 bottom-10 h-1/2 rounded-full opacity-50 blur-3xl" style={{ background: p.accent }} />
          <img src={p.image} alt={p.name} className="relative h-full w-full object-contain p-10 animate-float" />
        </div>
        <div>
          <p className="kicker" style={{ color: p.accent }}>{p.range} · {p.size}</p>
          <h1 className="mt-3 font-display text-4xl font-light sm:text-5xl title-gradient">{p.name}</h1>
          <p className="mt-3 text-lg text-ivory/70">{p.short}</p>
          <p className="mt-5 font-display text-3xl text-silver">{formatPrice(p.price)}</p>
          <ul className="mt-6 space-y-2">
            {p.benefits.map((b) => <li key={b} className="flex gap-3 text-ivory/85"><span style={{ color: p.accent }}>✦</span>{b}</li>)}
          </ul>
          <p className={`mt-6 text-sm ${p.stock > 0 ? "text-turquoise" : "text-red-300"}`}>{p.stock > 0 ? "● En stock · expédié sous 24 h" : "● Épuisé"}</p>
          <AddToCart slug={p.slug} price={p.price} disabled={p.stock === 0} />
          <div className="glass mt-8 divide-y divide-silver/10 rounded-2xl">
            <details className="group p-4" open><summary className="flex cursor-pointer list-none justify-between font-medium">Description<span className="text-lilac group-open:rotate-45 transition-transform">+</span></summary><p className="mt-3 text-ivory/70">{p.description}</p></details>
            <details className="group p-4"><summary className="flex cursor-pointer list-none justify-between font-medium">Le rituel<span className="text-lilac group-open:rotate-45 transition-transform">+</span></summary><p className="mt-3 text-ivory/70">{p.ritual}</p></details>
            <details className="group p-4"><summary className="flex cursor-pointer list-none justify-between font-medium">Ingrédients<span className="text-lilac group-open:rotate-45 transition-transform">+</span></summary><p className="mt-3 text-sm text-ivory/60">{p.ingredients}</p></details>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ivory/55">{site.reassurance.map((r) => <li key={r}>✦ {r}</li>)}</ul>
        </div>
      </div>
      <h2 className="mt-24 font-display text-2xl font-light">Prolongez le rituel</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
    </div>
  );
}
