import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import { site } from "@/config/site";
import { hasPublicFile } from "@/lib/assets";

// Les textes de cette page se modifient dans src/config/site.ts
function Visual({ src, alt, fallback, className }: { src: string; alt: string; fallback: React.ReactNode; className?: string }) {
  return hasPublicFile(src) ? <img src={src} alt={alt} className={className ?? "h-full w-full object-cover"} /> : <>{fallback}</>;
}

export default function Home() {
  const { ritual, universe } = site;
  return (
    <>
      <Hero />

      {/* 2. Les produits */}
      <section id="collection" className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">La collection</p>
            <h2 className="mt-3 font-display text-3xl font-light sm:text-4xl">{products.length > 1 ? "Une collection, une même orbite." : "Un produit, une nouvelle orbite."}</h2>
          </div>
          <Link href="/boutique" className="text-sm text-turquoise hover:underline">Tout voir →</Link>
        </div>
        <div className={`mt-10 grid gap-4 ${products.length > 1 ? "grid-cols-2 lg:grid-cols-3" : "mx-auto max-w-sm grid-cols-1"}`}>{products.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      </section>

      {/* 3. Le rituel */}
      <section id="rituel" className="mx-auto mt-32 grid max-w-7xl scroll-mt-28 items-center gap-10 px-4 md:grid-cols-[1.15fr_0.85fr]">
        <div className="glass relative mx-auto aspect-square w-full max-w-[32rem] overflow-hidden rounded-[2rem]">
          <Visual src={ritual.image} alt={`Fioles et botaniques sous cloche dans le laboratoire ${site.name}`} className="h-full w-full scale-[0.94] object-contain" fallback={
            <div className="absolute inset-0 grid place-items-center" style={{ background: "radial-gradient(circle at 50% 70%, rgb(183 161 232 / .35), transparent 60%)" }}>
              <div className="flex items-end gap-6">{products.slice(0, 3).map((p, i) => <img key={p.slug} src={p.image} alt="" className={`w-28 animate-float ${i === 1 || products.length === 1 ? "w-36" : ""}`} style={{ animationDelay: `${i * 0.8}s` }} />)}</div>
            </div>} />
        </div>
        <div className="rounded-[2rem] border border-silver/15 bg-night/95 p-6 shadow-xl backdrop-blur-md sm:p-8">
          <p className="kicker">{ritual.kicker}</p>
          <h2 className="mt-3 font-display text-3xl font-light sm:text-4xl">{ritual.title}</h2>
          <ol className="mt-8 space-y-6">
            {ritual.steps.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-lilac/50 bg-night font-display text-lilac">0{i + 1}</span>
                <div><h3 className="font-display text-lg tracking-wide text-ivory">{s.title}</h3><p className="mt-1 text-ivory/85">{s.text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. L'univers du laboratoire */}
      <section id="univers" className="mx-auto mt-32 grid max-w-6xl scroll-mt-28 items-center gap-10 px-4 md:grid-cols-[1fr_1.1fr]">
        <div className="order-2 rounded-[2rem] border border-silver/15 bg-night/95 p-6 shadow-xl backdrop-blur-md sm:p-8 md:order-1">
          <p className="kicker">{universe.kicker}</p>
          <h2 className="mt-3 font-display text-3xl font-light sm:text-4xl title-gradient">{universe.title}</h2>
          {universe.text.map((t) => <p key={t} className="mt-5 text-ivory/85">{t}</p>)}
          <Link href="/boutique" className="btn-ghost mt-8 inline-block rounded-full px-7 py-3">Explorer ses créations</Link>
        </div>
        <div className="glass relative order-1 aspect-[16/11] overflow-hidden rounded-[2rem] md:order-2">
          <Visual src={universe.image} alt="Le Professeur Orion dans son laboratoire" fallback={
            <div className="absolute inset-0"><div className="absolute inset-0 grid place-items-center">
              <div className="relative h-56 w-56 rounded-full border border-turquoise/30 animate-spin-slow" style={{ background: "radial-gradient(circle, rgb(115 217 208 / .15), transparent 70%)" }}>
                <div className="absolute inset-6 rounded-full border border-dashed border-silver/30" /><span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-turquoise" />
              </div>
              <p className="absolute bottom-6 font-display text-xs uppercase tracking-[0.3em] text-silver/60">Carte holographique · Mare Tranquillitatis</p>
            </div></div>} />
        </div>
      </section>

      {/* 5. FAQ */}
      <section id="faq" className="mx-auto mt-32 max-w-3xl scroll-mt-28 px-4">
        <p className="kicker text-center">Questions fréquentes</p>
        <h2 className="mt-3 text-center font-display text-3xl font-light">Tout savoir avant le décollage.</h2>
        <div className="glass mt-10 divide-y divide-silver/10 rounded-[1.75rem]">
          {site.faq.map(([q, a]) => (
            <details key={q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">{q}<span className="text-xl text-lilac transition-transform duration-500 group-open:rotate-45">+</span></summary>
              <p className="mt-3 text-ivory/65">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <Newsletter hasImage={hasPublicFile(site.newsletter.image)} />
    </>
  );
}
