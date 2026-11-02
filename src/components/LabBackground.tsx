"use client";
import { useEffect, useRef } from "react";
import { site } from "@/config/site";

// Fond animé : un réseau de molécules qui dérivent et se relient entre elles,
// sur une nébuleuse et une grille de laboratoire. Réglages dans src/config/site.ts
export default function LabBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { brand, accent } = site.colors;
    const maxDist = site.background.linkDistance;
    let w = 0, h = 0, raf = 0;
    const mouse = { x: -9999, y: -9999 };
    type N = { x: number; y: number; vx: number; vy: number; r: number; c: string };
    let nodes: N[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(site.background.molecules * Math.min(1, (w * h) / (1440 * 900)));
      nodes = Array.from({ length: Math.max(24, count) }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.8, c: Math.random() > 0.35 ? accent : brand,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
          const dx = mouse.x - n.x, dy = mouse.y - n.y, d = Math.hypot(dx, dy);
          if (d < 180) { n.x += dx * 0.004; n.y += dy * 0.004; }
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < maxDist) {
            ctx.strokeStyle = a.c;
            ctx.globalAlpha = (1 - d / maxDist) * 0.35;
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        // liaison avec la souris : effet « scanner »
        const m = Math.hypot(nodes[i].x - mouse.x, nodes[i].y - mouse.y);
        if (m < 200) {
          ctx.strokeStyle = brand; ctx.globalAlpha = (1 - m / 200) * 0.6;
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      for (const n of nodes) {
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = n.c;
        ctx.shadowColor = n.c; ctx.shadowBlur = 10;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    resize(); draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      {/* nébuleuses */}
      <div className="absolute -top-1/4 -left-1/4 h-[70vmax] w-[70vmax] rounded-full opacity-25 blur-3xl" style={{ background: "radial-gradient(circle, var(--brand), transparent 60%)" }} />
      <div className="absolute -bottom-1/3 -right-1/4 h-[80vmax] w-[80vmax] rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #7c3aed, transparent 60%)" }} />
      <div className="absolute top-1/3 left-1/2 h-[50vmax] w-[50vmax] -translate-x-1/2 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, var(--accent), transparent 60%)" }} />
      {/* grille du labo */}
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)", backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)" }} />
      <canvas ref={ref} className="absolute inset-0" />
      {/* vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgb(0 0 0 / .65))" }} />
    </div>
  );
}
