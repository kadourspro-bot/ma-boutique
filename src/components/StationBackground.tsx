"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";
import { usePageTransition } from "@/lib/transition";
import { site } from "@/config/site";

// Décor fixe du site : le docteur dans son laboratoire, une vidéo par étape d'achat.
// - On avance d'une étape : la vidéo de l'étape se joue en entier (il se déplace).
// - On revient en arrière (ou on saute des étapes) : pas de marche arrière ; le décor
//   se fond dans la fin de la vidéo de l'étape visée, comme un changement de plan au
//   cinéma : on voit le docteur arriver à sa place.
// - Ensuite, il « attend » : une courte boucle vidéo au ralenti (il respire, bouge à
//   peine), sans couture, aussi longtemps que le client reste sur l'étape.
// Réglages : src/config/site.ts → background.

type Step = keyof typeof site.background.scenes;
const ORDER: Step[] = ["accueil", "boutique", "produit", "panier", "commande", "merci"];
const scenes = site.background.scenes;
// La boucle d'attente commence 0,6 s avant la fin de la vidéo de l'étape :
// on passe de l'une à l'autre à ce moment-là, l'image est la même.
const IDLE_LEAD = 0.6;

type Move = { step: Step; from: number; fade: number; key: number };

function stepFor(path: string, open: boolean, ordered: boolean): Step {
  let step: Step = "accueil";
  if (path.startsWith("/boutique")) step = "boutique";
  if (path.startsWith("/produit")) step = "produit";
  if (open) step = "panier";
  if (path.startsWith("/commande")) step = ordered ? "merci" : "commande";
  return step;
}

export default function StationBackground() {
  const pathname = usePathname();
  const { open, ordered } = useCart();
  const { target, leaving } = usePageTransition();

  // pendant la sortie d'une page, le docteur part déjà vers l'étape suivante
  const step = stepFor(target ?? pathname, open && !target, ordered);
  const idx = ORDER.indexOf(step);
  const isHome = (target ?? pathname) === "/";
  const done = step === "merci";
  const clear = done || step === "panier" || leaving; // vidéo bien nette, sans voile

  const [idle, setIdle] = useState<Step | null>(null); // boucle d'attente affichée
  const [move, setMove] = useState<Move | null>(null); // déplacement en cours
  const [moveOn, setMoveOn] = useState(false); // le déplacement est-il visible ?
  const [still, setStill] = useState<string>(site.background.debut); // image de secours
  const prev = useRef<number | null>(null);
  const counter = useRef(0);
  const idleRef = useRef<HTMLVideoElement>(null);
  const moveRef = useRef<HTMLVideoElement>(null);
  const swapped = useRef(false);

  // Choisit le déplacement quand l'étape change
  // (petit délai : quand on clique « Commander », le panier se ferme juste avant le
  // changement de page ; on attend que tout soit stable pour ne pas jouer un faux retour)
  useEffect(() => {
    const timer = setTimeout(() => decide(), 120);
    return () => clearTimeout(timer);
  }, [idx]); // eslint-disable-line react-hooks/exhaustive-deps

  const decide = () => {
    const from = prev.current;
    if (from === idx) return;
    prev.current = idx;
    const s = ORDER[idx];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setMove(null); setIdle(null); setStill(scenes[s].fin); return; }
    swapped.current = false;
    setMoveOn(false);
    if (from === null || idx === from + 1) {
      // première visite ou étape suivante : la vidéo entière
      setMove({ step: s, from: 0, fade: 0.35, key: ++counter.current });
    } else {
      // retour en arrière ou saut d'étapes : fondu dans la fin de la vidéo visée
      setMove({ step: s, from: -site.background.arrivee, fade: 0.9, key: ++counter.current });
    }
  };

  // La vidéo de déplacement a démarré : on place la boucle d'attente de la même étape
  // derrière elle (en pause au début), pour qu'elle soit chargée au moment du relais.
  const onMovePlaying = () => {
    setMoveOn(true);
    if (move) setTimeout(() => setIdle(move.step), move.fade * 1000 + 50);
  };

  const onMoveMeta = () => {
    const v = moveRef.current;
    if (v && move && move.from < 0) v.currentTime = Math.max(0, v.duration + move.from);
  };

  // Relais : un peu avant la fin du déplacement, la boucle d'attente prend le relais
  const onMoveTime = () => {
    const v = moveRef.current;
    if (!v || !move || swapped.current || !v.duration) return;
    if (v.currentTime >= v.duration - IDLE_LEAD) handOver();
  };

  const handOver = () => {
    if (swapped.current) return;
    swapped.current = true;
    if (move) setStill(scenes[move.step].fin);
    const i = idleRef.current;
    if (move && idle !== move.step) setIdle(move.step);
    if (i) { i.currentTime = 0; i.play().catch(() => {}); }
    setMoveOn(false);
    setTimeout(() => setMove((m) => (m && m.key === move?.key ? null : m)), 400);
  };

  // si la boucle change de source pendant le relais, on la relance au début
  useEffect(() => {
    const i = idleRef.current;
    if (i && swapped.current) { i.currentTime = 0; i.play().catch(() => {}); }
  }, [idle]);

  const focus = site.background.mobileFocus;
  const idleScene = idle ? scenes[idle] : null;
  const moveScene = move ? scenes[move.step] : null;
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-night" style={{ "--focus-m": focus } as CSSProperties}>
      {/* sur ordinateur, quand le panier est ouvert à droite, la scène glisse un peu
          vers la gauche pour que le docteur ne soit pas caché derrière le panier */}
      <div className={`bg-stage absolute inset-0${step === "panier" ? " cart-open" : ""}`}>
        {/* image de secours (chargement, mouvements réduits) */}
        <img src={still} alt="" className="bg-media absolute inset-0 h-full w-full object-cover" />
        {/* le docteur qui attend : boucle au ralenti, sans couture */}
        {idleScene && (
          <video
            ref={idleRef}
            key={idleScene.attente}
            src={idleScene.attente}
            poster={idleScene.fin}
            muted
            loop
            playsInline
            preload="auto"
            autoPlay={!move}
            className="bg-media idle-drift absolute inset-0 h-full w-full object-cover"
          />
        )}
        {/* le déplacement du docteur vers l'étape */}
        {move && moveScene && (
          <video
            ref={moveRef}
            key={move.key}
            src={moveScene.video}
            autoPlay
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={onMoveMeta}
            onPlaying={onMovePlaying}
            onTimeUpdate={onMoveTime}
            onEnded={handOver}
            onError={handOver}
            className="bg-media absolute inset-0 h-full w-full object-cover"
            style={{ opacity: moveOn ? 1 : 0, transition: `opacity ${moveOn ? move.fade : 0.35}s ease` }}
          />
        )}
      </div>
      <Particles day={done} />
      {/* voile pour la lisibilité des textes : léger sur l'accueil, plus dense ailleurs,
          absent à la fin, quand le panier est ouvert et pendant les changements de page */}
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
