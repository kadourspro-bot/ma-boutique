"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/config/site";

// Slider de l'accueil. Les slides se modifient dans src/config/site.ts (slides)
export default function HeroSlider() {
  const slides = site.slides;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const go = useCallback((n: number) => setI((n + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = setTimeout(() => go(i + 1), site.slideDuration * 1000);
    return () => clearTimeout(t);
  }, [i, paused, go, slides.length]);

  const s = slides[i];
  return (
    <section
      className="relative max-w-6xl mx-auto px-4 pt-10 sm:pt-16"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
      aria-roledescription="carrousel" aria-label="À la une"
    >
      <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-12 sm:py-14 grid gap-8 md:grid-cols-[1.1fr_1fr] items-center min-h-[560px]">
        <div className="scanline" />
        <div key={`t${i}`} className="relative animate-slide-in" aria-live="polite">
          <p className="font-display text-xs tracking-[0.3em] uppercase text-accent">{s.tag}</p>
          <h1 className="mt-4 font-display text-4xl sm:text-6xl font-bold leading-[1.05] title-gradient">{s.title}</h1>
          <p className="mt-5 text-lg text-white/70 max-w-md">{s.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={s.button.href} className="btn-neon rounded-full px-7 py-3.5">{s.button.label}</Link>
            <Link href="/boutique" className="btn-ghost rounded-full px-7 py-3.5 font-semibold">Tout le catalogue</Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
            {site.reassurance.map((r) => <li key={r}><span className="text-brand">◆</span> {r}</li>)}
          </ul>
        </div>

        {/* Chambre de confinement */}
        <div className="relative mx-auto aspect-square w-full max-w-[420px]">
          <div className="absolute inset-0 rounded-full border border-accent/30 animate-spin-slow" style={{ borderStyle: "dashed" }} />
          <div className="absolute inset-6 rounded-full border border-brand/25 animate-spin-slower" />
          <div className="absolute inset-12 rounded-full border-2 border-brand/40 animate-pulse-ring" />
          <div className="absolute inset-16 rounded-full" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--brand) 35%, transparent), transparent 65%)" }} />
          <img key={`i${i}`} src={s.image} alt="" className="absolute inset-[18%] h-[64%] w-[64%] object-contain animate-float drop-shadow-[0_0_30px_var(--brand)]" />
        </div>
      </div>

      {slides.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-4">
          <button onClick={() => go(i - 1)} className="btn-ghost h-10 w-10 rounded-full" aria-label="Slide précédente">‹</button>
          {slides.map((_, n) => (
            <button key={n} onClick={() => go(n)} aria-label={`Aller à la slide ${n + 1}`} aria-current={n === i}
              className={`h-1.5 rounded-full transition-all ${n === i ? "w-10 bg-brand shadow-[0_0_12px_var(--brand)]" : "w-4 bg-white/25"}`} />
          ))}
          <button onClick={() => go(i + 1)} className="btn-ghost h-10 w-10 rounded-full" aria-label="Slide suivante">›</button>
        </div>
      )}
    </section>
  );
}
