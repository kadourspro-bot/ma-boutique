"use client";
import { useState } from "react";
import { site } from "@/config/site";
import { LogoIcon } from "./Logo";

// Newsletter avec M.O.O.N. (formulaire de démonstration : à relier à Brevo, Klaviyo ou Mailchimp)
export default function Newsletter({ hasImage }: { hasImage: boolean }) {
  const [sent, setSent] = useState(false);
  const n = site.newsletter;
  return (
    <section className="mx-auto mt-32 max-w-6xl px-4">
      <div className="glass grid items-center gap-8 overflow-hidden rounded-[2rem] p-6 sm:p-10 md:grid-cols-[260px_1fr]">
        <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-full border border-lilac/30 md:w-full">
          {hasImage ? <img src={n.image} alt="Le robot M.O.O.N. transmet une capsule lumineuse" className="h-full w-full object-cover" />
            : <div className="grid h-full w-full place-items-center" style={{ background: "radial-gradient(circle, rgb(183 161 232 / .3), transparent 70%)" }}><LogoIcon className="h-24 w-24 animate-float" /></div>}
        </div>
        <div>
          <p className="kicker">Transmission lunaire</p>
          <h2 className="mt-3 font-display text-3xl font-light">{n.title}</h2>
          <p className="mt-3 max-w-lg text-ivory/65">{n.text}</p>
          {sent ? <p className="mt-6 text-turquoise">Bip bip ! Message reçu, bienvenue en orbite ✦</p> : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <label className="flex-1"><span className="sr-only">Votre e-mail</span>
                <input required type="email" placeholder="votre@email.fr" className="w-full rounded-full border border-silver/20 bg-night/60 px-5 py-3 outline-none placeholder:text-ivory/40 focus:border-lilac" />
              </label>
              <button className="btn-neon rounded-full px-6 py-3">S&apos;inscrire</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
