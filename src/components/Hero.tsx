import Link from "next/link";
import { site } from "@/config/site";
import { LogoIcon } from "./Logo";

// 1. Accueil : le texte se pose sur le laboratoire lunaire (le décor est dans StationBackground)
export default function Hero() {
  const { hero } = site;
  return (
    <section className="relative">
      <div className="mx-auto flex min-h-[calc(100vh-6.5rem)] max-w-6xl items-center px-4">
        <div className="max-w-xl py-20">
          <div className="rounded-[2rem] bg-night/35 p-6 backdrop-blur-[2px] sm:bg-transparent sm:p-0 sm:backdrop-blur-0">
            <p className="kicker animate-fade-up">{hero.kicker}</p>
            <div className="mt-6 flex items-center gap-4 animate-fade-up delay-1">
              <LogoIcon className="h-12 w-12" />
              <span className="font-display text-2xl uppercase tracking-[0.45em] text-silver">{site.name}</span>
            </div>
            <h1 className="mt-6 font-display text-5xl font-light leading-[1.05] sm:text-7xl title-gradient animate-fade-up delay-2 drop-shadow-[0_4px_30px_rgba(17,21,43,.8)]">{hero.title}</h1>
            <p className="mt-6 max-w-md text-lg text-ivory/85 animate-fade-up delay-3">{hero.subtitle}</p>
            <div className="mt-10 flex flex-wrap gap-3 animate-fade-up delay-4">
              <Link href={hero.button.href} className="btn-neon rounded-full px-8 py-4">{hero.button.label}</Link>
              <Link href="/#univers" className="btn-ghost rounded-full bg-night/40 px-8 py-4 backdrop-blur">Entrer dans le laboratoire</Link>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ivory/75 animate-fade-up delay-4">
              {site.reassurance.map((r) => <li key={r} className="flex items-center gap-2"><span className="text-turquoise">✦</span>{r}</li>)}
            </ul>
          </div>
        </div>
      </div>
      <a href="#collection" className="absolute bottom-6 left-1/2 -translate-x-1/2 font-display text-[10px] uppercase tracking-[0.35em] text-silver/70 animate-float">Défiler ↓</a>
    </section>
  );
}
