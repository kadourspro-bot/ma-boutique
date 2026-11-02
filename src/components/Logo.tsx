// Logo Lunaria : croissant de lune + orbite + étoile. Fichiers vectoriels dans public/brand/
export function LogoIcon({ className = "h-8 w-8", moon = "var(--silver)" }: { className?: string; moon?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path d="M38 8a24 24 0 1 0 18 34A20 20 0 1 1 38 8Z" fill={moon} />
      <ellipse cx="32" cy="34" rx="29" ry="10" transform="rotate(-22 32 34)" stroke="var(--lilac)" strokeWidth="2.6" />
      <path d="M51 15l1.6 4.4L57 21l-4.4 1.6L51 27l-1.6-4.4L45 21l4.4-1.6z" fill="var(--turquoise)" className="animate-glint" />
    </svg>
  );
}

export default function Logo({ withSignature = false, size = "md" }: { withSignature?: boolean; size?: "md" | "lg" }) {
  const lg = size === "lg";
  return (
    <span className="inline-flex items-center gap-3">
      <LogoIcon className={lg ? "h-14 w-14" : "h-8 w-8"} />
      <span className="flex flex-col leading-none">
        <span className={`font-display font-normal text-silver ${lg ? "text-3xl tracking-[0.4em]" : "text-lg tracking-[0.35em]"}`}>LUNARIA</span>
        {withSignature && <span className="mt-1.5 font-display text-[10px] tracking-[0.25em] uppercase text-silver/70">Votre beauté, nouvelle orbite</span>}
      </span>
    </span>
  );
}
