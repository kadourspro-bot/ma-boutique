"use client";
import Link from "next/link";
import { site } from "@/config/site";

// Après la commande : la scène se joue dans le décor (planète, lever du jour, Orion).
// Ici, seulement la phrase qui apparaît en fondu, puis un discret bouton de retour.
// Textes dans src/config/site.ts → thankYou
export default function PlanetArrival() {
  const t = site.thankYou;
  return (
    <div className="fixed inset-0 z-40 flex items-end px-4 pb-6 sm:px-[8vw] sm:pb-[12vh]" role="status">
      <div className="max-w-xl rounded-3xl bg-white/45 p-5 backdrop-blur-md sm:bg-transparent sm:p-0 sm:backdrop-blur-0" style={{ animation: "soft-fade 2s ease-in-out 7s both" }}>
        <p className="font-display text-3xl font-light leading-tight text-night sm:text-6xl" style={{ animation: "soft-fade 3s ease-in-out 7.4s both", textShadow: "0 2px 30px rgb(255 255 255 / .6)" }}>
          {t.message}
        </p>
        <p className="mt-6 max-w-sm text-night/70" style={{ animation: "soft-fade 2s ease-in-out 9.6s both" }}>{t.subtitle}</p>
        <Link href="/" className="mt-8 inline-block rounded-full border border-night/25 bg-white/40 px-7 py-3 text-sm text-night backdrop-blur transition hover:bg-white/70" style={{ animation: "soft-fade 2s ease-in-out 10.8s both" }}>
          Retour au laboratoire
        </Link>
      </div>
    </div>
  );
}
