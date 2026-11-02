import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const faq = [
  ["Quels sont les délais de livraison ?", "Expédition sous 24 h ouvrées, livraison en 2 à 3 jours en France."],
  ["Puis-je retourner un produit ?", "Oui, vous disposez de 14 jours après réception (droit de rétractation)."],
  ["Le paiement est-il sécurisé ?", "Oui : carte bancaire, Apple Pay et Google Pay via un prestataire certifié PCI-DSS."],
];

export default function Home() {
  const best = products.filter((p) => p.bestseller);
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-24 grid gap-8 sm:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Une promesse claire, en une phrase.</h1>
          <p className="mt-4 text-lg text-neutral-600">Le bénéfice principal pour le client, sans jargon.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/boutique" className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3">Voir les produits</Link>
            <Link href="/produit/pack-decouverte" className="rounded-full border border-neutral-300 px-6 py-3 font-semibold">Commencer par le pack</Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-700">
            <li>✓ Expédition 24 h</li><li>✓ Retours 14 jours</li><li>✓ Paiement sécurisé</li>
          </ul>
        </div>
        <img src="/placeholder.svg" alt="" className="w-full aspect-square rounded-3xl bg-neutral-100" />
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
          {faq.map(([q, a]) => (
            <details key={q} className="p-4"><summary className="font-medium cursor-pointer">{q}</summary><p className="mt-2 text-neutral-600">{a}</p></details>
          ))}
        </div>
      </section>
    </>
  );
}
