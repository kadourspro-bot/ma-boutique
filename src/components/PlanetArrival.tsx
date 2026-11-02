"use client";
import Link from "next/link";
import { site } from "@/config/site";

// Après la commande : une planète aux couleurs vives arrive, puis le message apparaît.
// Image et textes dans src/config/site.ts → thankYou
export default function PlanetArrival() {
  const t = site.thankYou;
  const sparks = Array.from({ length: 26 }, (_, i) => i);
  return (
    <div className="fixed inset-0 z-40 overflow-hidden" role="status">
      <div className="absolute inset-0 bg-night/60 backdrop-blur-sm" style={{ animation: "lab-light 1.2s ease-out both" }} />
      {/* éclats lumineux */}
      {sparks.map((i) => (
        <span key={i} className="absolute h-1.5 w-1.5 rounded-full" style={{
          left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`,
          background: ["#ff4fa0", "#ffb347", "#73D9D0", "#B7A1E8"][i % 4],
          boxShadow: "0 0 12px currentColor", color: ["#ff4fa0", "#ffb347", "#73D9D0", "#B7A1E8"][i % 4],
          animation: `twinkle 2.4s ease-in-out ${1.5 + (i % 7) * 0.25}s infinite both`,
        }} />
      ))}
      {/* la planète */}
      <div className="absolute left-1/2 top-[36%] w-[min(130vw,72vh,980px)]" style={{ animation: "planet-in 3.2s cubic-bezier(.16,.8,.2,1) both" }}>
        <div className="absolute inset-[18%] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgb(255 79 160 / .55), rgb(115 217 208 / .25) 50%, transparent 70%)", animation: "pulse-glow 4s ease-in-out 3s infinite" }} />
        <img src={t.planet} alt="" className="relative w-full" style={{ animation: "planet-spin 40s linear 3.2s infinite" }} />
      </div>
      {/* le message */}
      <div className="absolute inset-x-0 bottom-[8%] px-6 text-center sm:bottom-[12%]">
        <p className="mx-auto max-w-3xl font-display text-3xl font-light leading-tight sm:text-5xl" style={{ animation: "fade-up 1.4s cubic-bezier(.2,.7,.2,1) 2.4s both", background: "linear-gradient(90deg, #ffd27a, #ff6fb5 35%, #B7A1E8 65%, #73D9D0)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
          {t.message}
        </p>
        <p className="mx-auto mt-5 max-w-md text-ivory/80" style={{ animation: "fade-up 1.2s ease-out 3.2s both" }}>{t.subtitle}</p>
        <Link href="/" className="btn-neon mt-8 inline-block rounded-full px-8 py-3.5" style={{ animation: "fade-up 1.2s ease-out 3.8s both" }}>Retour au laboratoire</Link>
      </div>
    </div>
  );
}
