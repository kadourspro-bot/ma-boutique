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
    "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.short, image: p.image,
    offers: { "@type": "Offer", priceCurrency: "EUR", price: (p.price / 100).toFixed(2), availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" },
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 pb-32 sm:pb-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid gap-10 sm:grid-cols-2">
        <img src={p.image} alt={p.name} className="glass w-full aspect-square rounded-3xl object-contain p-10 drop-shadow-[0_0_40px_var(--brand)]" />
        <div>
          <p className="text-sm text-white/60">{p.category}</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mt-1 title-gradient">{p.name}</h1>
          <p className="font-display text-3xl font-bold mt-3 text-brand text-glow">{formatPrice(p.price)}</p>
          <p className="mt-4 text-white/60">{p.description}</p>
          <p className={`mt-4 text-sm ${p.stock > 0 ? "text-brand" : "text-red-400"}`}>
            {p.stock > 0 ? `● En stock · expédié sous 24 h` : "● Épuisé"}
          </p>
          <AddToCart slug={p.slug} price={p.price} disabled={p.stock === 0} />
          <ul className="mt-6 text-sm space-y-1 text-white/60">{site.reassurance.map((r) => <li key={r}>✓ {r}</li>)}</ul>
        </div>
      </div>
      <h2 className="font-display text-xl font-bold mt-16">Vous aimerez aussi</h2>
      <div className="mt-4 grid gap-4 grid-cols-2 lg:grid-cols-3">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
    </div>
  );
}
