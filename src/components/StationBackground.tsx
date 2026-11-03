"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";
import { site } from "@/config/site";

// Décor fixe du site : 6 vidéos du laboratoire, une par étape du parcours d'achat.
// - On avance d'une étape : la vidéo de l'étape se joue une fois.
// - On recule d'une étape : la vidéo de l'étape quittée se joue à l'envers.
// - Ensuite, le scientifique « attend » sur la dernière image (léger mouvement de
//   caméra + particules lumineuses), aussi longtemps que le client reste sur la page.
// Réglages : src/config/site.ts → background.

type Step = keyof typeof site.background.scenes;
const ORDER: Step[] = ["accueil", "boutique", "produit", "panier", "commande", "merci"];
const scenes = site.background.scenes;

type Clip = { src: string; end: string; key: number };

export default function StationBackground() {
  const pathname = usePathname();
  const { open, ordered } = useCart();

  let step: Step = "accueil";
  if (pathname.startsWith("/boutique")) step = "boutique";
  if (pathname.startsWith("/produit")) step = "produit";
  if (open) step = "panier";
  if (pathname.startsWith("/commande")) step = ordered ? "merci" : "commande";
  const idx = ORDER.indexOf(step);
  const isHome = pathname === "/";
  const done = step === "merci";
  const clear = done || step === "panier"; // vidéo bien nette, sans voile

  const [still, setStill] = useState<string>(site.background.debut); // image d'attente
  const [clip, setClip] = useState<Clip | null>(null); // vidéo en cours
  const [visible, setVisible] = useState(false); // la vidéo est-elle affichée ?
  const prev = useRef<number | null>(null);
  const counter = useRef(0);

  // Précharge les images d'attente pour que le passage vidéo → image soit invisible
  useEffect(() => {
    ORDER.forEach((s) => { const i = new Image(); i.src = scenes[s].fin; });
  }, []);

  // Choisit quelle vidéo jouer quand l'étape change
  // (petit délai : quand on clique « Commander », le panier se ferme juste avant le
  // changement de page ; on attend que tout soit stable pour ne pas jouer un faux retour)
  useEffect(() => {
    const timer = setTimeout(() => decide(), 200);
    return () => clearTimeout(timer);
  }, [idx]); // eslint-disable-line react-hooks/exhaustive-deps

  const decide = () => {
    const from = prev.current;
    if (from === idx) return;
    prev.current = idx;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sceneNow = scenes[ORDER[idx]];
    if (reduce) { setClip(null); setVisible(false); setStill(sceneNow.fin); return; }

    const play = (src: string, start: string, end: string) => {
      setStill(start);
      setVisible(false);
      setClip({ src, end, key: ++counter.current });
    };
    const before = idx > 0 ? scenes[ORDER[idx - 1]].fin : site.background.debut;

    if (from === null || idx > from) {
      // première visite ou on avance : vidéo de l'étape, depuis la fin de l'étape d'avant
      play(sceneNow.video, before, sceneNow.fin);
    } else if (idx < from) {
      const left = scenes[ORDER[from]];
      if (from - idx === 1 && left.retour) play(left.retour, left.fin, sceneNow.fin);
      else { setClip(null); setVisible(false); setStill(sceneNow.fin); }
    }
  };

  const onEnded = () => {
    if (!clip) return;
    setStill(clip.end);
    // on laisse l'image s'afficher sous la vidéo avant de retirer la vidéo
    requestAnimationFrame(() => requestAnimationFrame(() => { setVisible(false); setClip(null); }));
  };

  const focus = site.background.mobileFocus;
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-night" style={{ "--focus-m": focus } as CSSProperties}>
      {/* sur ordinateur, quand le panier est ouvert à droite, la scène glisse un peu
          vers la gauche pour que le docteur ne soit pas caché derrière le panier */}
      <div className={`bg-stage absolute inset-0${step === "panier" ? " cart-open" : ""}`}>
      {/* le scientifique qui attend : dernière image, qui « respire » doucement */}
      <img
        key={still}
        src={still}
        alt=""
        className="bg-media idle-breathe absolute inset-0 h-full w-full object-cover"
      />
      {/* la vidéo de l'étape */}
      {clip && (
        <video
          key={clip.key}
          src={clip.src}
          autoPlay
          muted
          playsInline
          preload="auto"
          onPlaying={() => setVisible(true)}
          onEnded={onEnded}
          onError={onEnded}
          className="bg-media absolute inset-0 h-full w-full object-cover"
          style={{ opacity: visible ? 1 : 0, transition: "opacity .35s ease" }}
        />
      )}
      </div>
      <Particles day={done} />
      {/* voile pour la lisibilité des textes : léger sur l'accueil, plus dense ailleurs, absent à la fin */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgb(17 21 43 / .35) 0%, rgb(17 21 43 / .05) 35%, rgb(17 21 43 / .7) 100%)", opacity: clear ? 0 : 1, transition: "opacity 1s ease" }} />
      <div className="absolute inset-0 bg-night" style={{ opacity: clear ? 0 : isHome ? 0.1 : 0.55, transition: "opacity 1s ease" }} />
    </div>
  );
}

// Petites lueurs qui montent lentement, pour que l'image d'attente reste vivante
function Particles({ day }: { day: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const dayRef = useRef(day);
  dayRef.current = day;

  useEffect(() => {
    const n = site.background.particles;
    const canvas = ref.current;
    if (!canvas || !n || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, raf = 0;
    type P = { x: number; y: number; r: number; v: number; p: number; c: number };
    let ps: P[] = [];
    const make = (y?: number): P => ({ x: Math.random() * w, y: y ?? Math.random() * h, r: Math.random() * 1.8 + 0.6, v: 0.15 + Math.random() * 0.35, p: Math.random() * 6.3, c: Math.random() });
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ps = Array.from({ length: n }, () => make());
    };
    let t = 0;
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (const q of ps) {
        q.y -= q.v; q.x += Math.sin(t + q.p) * 0.15;
        if (q.y < -10) Object.assign(q, make(h + 10));
        const col = dayRef.current ? "255,225,170" : q.c > 0.5 ? "183,161,232" : "115,217,208";
        const a = 0.25 + 0.45 * Math.sin(t * 1.3 + q.p) ** 2;
        const g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, q.r * 4);
        g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(q.x, q.y, q.r * 4, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 mix-blend-screen" />;
}
