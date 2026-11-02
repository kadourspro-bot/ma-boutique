"use client";
import { useEffect, useRef } from "react";
import { site } from "@/config/site";

// Fond : ciel étoilé qui scintille doucement, particules lilas et turquoise
// qui dérivent lentement, et fines orbites. Réglages dans src/config/site.ts
export default function SpaceBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { lilac, turquoise, silver } = site.colors;
    let w = 0, h = 0, raf = 0, t = 0;
    type Star = { x: number; y: number; r: number; p: number; s: number };
    type Dust = { x: number; y: number; r: number; vx: number; vy: number; c: string };
    let stars: Star[] = [], dust: Dust[] = [];
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const k = Math.min(1, (w * h) / (1440 * 900));
      stars = Array.from({ length: Math.round(site.background.stars * Math.max(.4, k)) }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.1 + .2, p: Math.random() * Math.PI * 2, s: .4 + Math.random() * .8 }));
      dust = Array.from({ length: Math.round(site.background.particles * Math.max(.5, k)) }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 2 + 1, vx: (Math.random() - .5) * .12, vy: -Math.random() * .15 - .03, c: Math.random() > .5 ? lilac : turquoise }));
    };
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        ctx.globalAlpha = .35 + .45 * Math.sin(t * s.s + s.p) ** 2;
        ctx.fillStyle = silver;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      }
      for (const d of dust) {
        if (!reduce) { d.x += d.vx; d.y += d.vy; if (d.y < -10) { d.y = h + 10; d.x = Math.random() * w; } }
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 6);
        g.addColorStop(0, d.c); g.addColorStop(1, "transparent");
        ctx.globalAlpha = .35; ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r * 6, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden" style={{ background: "radial-gradient(120% 80% at 70% 0%, #1c2147 0%, var(--night) 55%, #090b18 100%)" }}>
      <div className="absolute -top-1/3 right-[-20%] h-[70vmax] w-[70vmax] rounded-full opacity-[0.18] blur-3xl" style={{ background: "radial-gradient(circle, var(--lilac), transparent 60%)" }} />
      <div className="absolute bottom-[-35%] left-[-20%] h-[70vmax] w-[70vmax] rounded-full opacity-[0.10] blur-3xl" style={{ background: "radial-gradient(circle, var(--turquoise), transparent 60%)" }} />
      <svg className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 animate-spin-slow opacity-[0.12]" viewBox="0 0 100 100" fill="none">
        <ellipse cx="50" cy="50" rx="46" ry="18" stroke="var(--silver)" strokeWidth=".08" />
        <ellipse cx="50" cy="50" rx="34" ry="12" stroke="var(--lilac)" strokeWidth=".08" transform="rotate(25 50 50)" />
        <circle cx="96" cy="50" r=".5" fill="var(--turquoise)" />
      </svg>
      <canvas ref={ref} className="absolute inset-0" />
    </div>
  );
}
