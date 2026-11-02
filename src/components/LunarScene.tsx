// Illustration « Le laboratoire s'éveille » : affichée tant que l'image ou la vidéo
// d'Orion n'a pas été déposée dans public/images/. La lune se lève derrière la baie
// vitrée, la lumière turquoise s'allume, les fioles s'illuminent.
export default function LunarScene() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* baie vitrée */}
      <svg className="absolute right-[-8%] top-0 h-full w-[85%] sm:w-[70%]" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <radialGradient id="moon" cx=".38" cy=".35" r=".7"><stop offset="0" stop-color="#ffffff" /><stop offset=".55" stop-color="#e3e1ec" /><stop offset="1" stop-color="#9c9ab3" /></radialGradient>
          <radialGradient id="moonglow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#d7d8e2" stopOpacity=".45" /><stop offset="1" stop-color="#d7d8e2" stopOpacity="0" /></radialGradient>
          <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" stopOpacity=".09" /><stop offset=".5" stopColor="#ffffff" stopOpacity="0" /><stop offset="1" stopColor="#b7a1e8" stopOpacity=".08" /></linearGradient>
          <radialGradient id="tq" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#73D9D0" stopOpacity=".7" /><stop offset="1" stop-color="#73D9D0" stopOpacity="0" /></radialGradient>
        </defs>
        <g className="animate-moonrise">
          <circle cx="330" cy="250" r="230" fill="url(#moonglow)" />
          <circle cx="330" cy="250" r="150" fill="url(#moon)" />
          <g fill="#8f8ca6" opacity=".35"><circle cx="280" cy="210" r="22" /><circle cx="370" cy="300" r="30" /><circle cx="390" cy="200" r="12" /><circle cx="300" cy="320" r="10" /><circle cx="250" cy="270" r="8" /></g>
        </g>
        {/* montants de la baie */}
        <path d="M60 600V170Q330 -40 600 170V600" stroke="#d7d8e2" strokeOpacity=".35" strokeWidth="3" />
        <path d="M330 600V40M60 330H600" stroke="#d7d8e2" strokeOpacity=".18" strokeWidth="2" />
        <path d="M60 600V170Q330 -40 600 170V600Z" fill="url(#glass)" />
        {/* orbite lumineuse */}
        <ellipse cx="330" cy="420" rx="300" ry="60" stroke="#b7a1e8" strokeOpacity=".5" strokeWidth="1.2" transform="rotate(-8 330 420)" className="animate-lab-light" />
        {/* paillasse et fioles */}
        <g className="animate-lab-light">
          <rect x="0" y="470" width="600" height="14" fill="#d7d8e2" opacity=".35" />
          <rect x="0" y="484" width="600" height="120" fill="#0c0f22" opacity=".85" />
          <circle cx="200" cy="430" r="90" fill="url(#tq)" />
          <g className="animate-float">
            <path d="M188 360h24v30l22 60a10 10 0 0 1-9 14h-50a10 10 0 0 1-9-14l22-60z" fill="#73D9D0" fillOpacity=".55" stroke="#d7d8e2" strokeOpacity=".7" />
            <rect x="185" y="352" width="30" height="10" rx="3" fill="#d7d8e2" />
          </g>
          <rect x="300" y="400" width="26" height="70" rx="12" fill="#b7a1e8" fillOpacity=".5" stroke="#d7d8e2" strokeOpacity=".6" />
          <rect x="340" y="420" width="22" height="50" rx="10" fill="#f7f3ee" fillOpacity=".35" stroke="#d7d8e2" strokeOpacity=".6" />
          {/* plante sous cloche */}
          <path d="M440 470v-70a40 40 0 0 1 80 0v70" stroke="#d7d8e2" strokeOpacity=".5" fill="#ffffff" fillOpacity=".04" />
          <path d="M480 470c0-30-18-40-26-50M480 470c0-28 16-42 28-46M480 460c-4-18-2-30 2-40" stroke="#73D9D0" strokeOpacity=".8" strokeWidth="2" />
        </g>
      </svg>
      {/* hologramme discret */}
      <div className="absolute right-[6%] top-[14%] hidden h-24 w-36 rounded-lg border border-turquoise/30 bg-turquoise/5 p-3 sm:block animate-lab-light">
        <div className="h-1 w-16 rounded bg-turquoise/60" /><div className="mt-2 h-1 w-24 rounded bg-silver/30" /><div className="mt-2 h-1 w-20 rounded bg-silver/30" />
        <div className="mt-3 h-8 w-full rounded border border-turquoise/20" style={{ background: "repeating-linear-gradient(90deg, rgb(115 217 208 / .25) 0 2px, transparent 2px 8px)" }} />
      </div>
    </div>
  );
}
