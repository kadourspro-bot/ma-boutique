"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";
import { site } from "@/config/site";

// Décor fixe du site : le ciel étoilé, la lune, puis le laboratoire (dont la baie
// vitrée est transparente). La lune glisse de droite à gauche à chaque étape du
// parcours d'achat. Réglages dans src/config/site.ts → background.
const RATIO = 1560 / 944; // proportions de l'image station.webp

type Step = keyof typeof site.background.moonSteps;

export default function StationBackground() {
  const pathname = usePathname();
  const { open, ordered } = useCart();
  const ref = useRef<HTMLCanvasElement>(null);
  const [fit, setFit] = useState(1); // part de l'image visible en largeur (petits écrans)

  let step: Step = "accueil";
  if (pathname.startsWith("/boutique")) step = "boutique";
  if (pathname.startsWith("/produit")) step = "produit";
  if (open) step = "panier";
  if (pathname.startsWith("/commande")) step = ordered ? "merci" : "commande";
  const order: Step[] = ["accueil", "boutique", "produit", "panier", "commande", "merci"];
  const idx = order.indexOf(step);

  // Sur mobile, on ne voit que le centre de la baie : on resserre la course de la lune
  const raw = site.background.moonSteps[step];
  const x = 50 + (raw - 50) * Math.min(1, fit * 1.15);
  const isHome = pathname === "/";

  useEffect(() => {
    const onResize = () => setFit(Math.min(1, window.innerWidth / window.innerHeight / RATIO));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Étoiles qui scintillent lentement dans le ciel derrière la baie
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, t = 0;
    let stars: { x: number; y: number; r: number; p: number; s: number }[] = [];
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: site.background.stars }, () => ({ x: Math.random() * w, y: Math.random() * h * 0.7, r: Math.random() * 1.2 + 0.2, p: Math.random() * 6.3, s: 0.3 + Math.random() * 0.8 }));
    };
    const draw = () => {
      t += 0.016; ctx.clearRect(0, 0, w, h); ctx.fillStyle = site.colors.silver;
      for (const s of stars) {
        ctx.globalAlpha = 0.3 + 0.6 * Math.sin(t * s.s + s.p) ** 2;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  const sec = site.background.moonSeconds;
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-night">
      {/* ciel profond */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(90% 70% at 50% 20%, #23305e 0%, #141a3a 45%, var(--night) 100%)" }} />
      <canvas ref={ref} className="absolute inset-0" />

      {/* conteneur aux proportions de l'image (comme object-cover) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: `max(100vw, ${RATIO * 100}vh)`, aspectRatio: `${RATIO}` }}>
        {/* la lune, derrière la vitre */}
        <div
          className="absolute"
          style={{
            width: "36%", aspectRatio: "1", top: "4%",
            left: `${x}%`,
            transform: `translateX(-50%) rotate(${-idx * 24}deg)`,
            transition: `left ${sec}s cubic-bezier(.45,.05,.2,1), transform ${sec}s cubic-bezier(.45,.05,.2,1), opacity 1.2s`,
            opacity: step === "merci" ? 0 : 1,
          }}
        >
          <div className="absolute inset-[-25%] rounded-full opacity-60 blur-3xl" style={{ background: "radial-gradient(circle, rgb(183 161 232 / .45), transparent 65%)" }} />
          <img src={site.background.moon} alt="" className="relative h-full w-full" />
        </div>
        {/* le laboratoire */}
        <img src={site.background.station} alt="" className="absolute inset-0 h-full w-full" />
      </div>

      {/* voile pour la lisibilité : léger sur l'accueil, plus dense sur les autres pages */}
      <div className="absolute inset-0 transition-opacity duration-1000" style={{ background: "linear-gradient(180deg, rgb(17 21 43 / .35) 0%, rgb(17 21 43 / .15) 35%, rgb(17 21 43 / .75) 100%)" }} />
      <div className="absolute inset-0 bg-night transition-opacity duration-1000" style={{ opacity: isHome ? 0.05 : 0.55 }} />
    </div>
  );
}
