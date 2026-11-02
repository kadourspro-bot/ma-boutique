import Link from "next/link";
import { site } from "@/config/site";
import { hasPublicFile } from "@/lib/assets";
import LunarScene from "./LunarScene";
import { LogoIcon } from "./Logo";

// 1. Accueil : vidéo (si déposée) > image d'Orion (si déposée) > illustration
export default function Hero() {
  const { hero } = site;
  const hasVideo = hasPublicFile(hero.video);
  const hasImage = hasPublicFile(hero.image);
  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden">
      {hasVideo ? (
        <video className="absolute inset-0 -z-10 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={hasImage ? hero.image : undefined}>
          <source src={hero.video} type="video/mp4" />
        </video>
      ) : hasImage ? (
        <img src={hero.image} alt="Le Professeur Orion dans son laboratoire lunaire" className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]" />
      ) : (
        <div className="absolute inset-0 -z-10"><LunarScene /></div>
      )}
      {/* dégradé à gauche pour la lisibilité du texte */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/80 to-transparent sm:via-night/55" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-night to-transparent" />

      <div className="mx-auto flex min-h-[88vh] max-w-6xl items-center px-4">
        <div className="max-w-xl py-24">
          <p className="kicker animate-fade-up">{hero.kicker}</p>
          <div className="mt-6 flex items-center gap-4 animate-fade-up delay-1">
            <LogoIcon className="h-12 w-12" />
            <span className="font-display text-2xl tracking-[0.45em] text-silver">LUNARIA</span>
          </div>
          <h1 className="mt-6 font-display text-5xl font-light leading-[1.05] sm:text-7xl title-gradient animate-fade-up delay-2">{hero.title}</h1>
          <p className="mt-6 max-w-md text-lg text-ivory/75 animate-fade-up delay-3">{hero.subtitle}</p>
          <div className="mt-10 flex flex-wrap gap-3 animate-fade-up delay-4">
            <Link href={hero.button.href} className="btn-neon rounded-full px-8 py-4">{hero.button.label}</Link>
            <Link href="/#univers" className="btn-ghost rounded-full px-8 py-4">Entrer dans le laboratoire</Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ivory/60 animate-fade-up delay-4">
            {site.reassurance.map((r) => <li key={r} className="flex items-center gap-2"><span className="text-turquoise">✦</span>{r}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
