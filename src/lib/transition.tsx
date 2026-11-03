"use client";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

// Transitions entre les pages, synchronisées avec le docteur du décor :
// 1. au clic sur un lien, le docteur commence tout de suite à se déplacer
//    vers l'étape suivante et le contenu de la page s'efface en fondu flou ;
// 2. pendant un court instant, on voit le laboratoire en grand (voile allégé) ;
// 3. la nouvelle page apparaît en douceur pendant que le docteur termine son geste.
// Réglage de la durée de sortie : LEAVE_MS (en millisecondes).
const LEAVE_MS = 450;

type T = { leaving: boolean; target: string | null };
const Ctx = createContext<T>({ leaving: false, target: null });
export const usePageTransition = () => useContext(Ctx);

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [target, setTarget] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // la nouvelle page est affichée : fin de la sortie
  useEffect(() => { setTarget(null); }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a || a.target || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return; // simple ancre sur la même page
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      e.preventDefault();
      const href = url.pathname + url.search + url.hash;
      router.prefetch(href);
      setTarget(url.pathname);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => router.push(href), LEAVE_MS);
    };
    // phase de capture : passe avant les liens de Next pour pouvoir retarder la navigation
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return <Ctx.Provider value={{ leaving: target !== null, target }}>{children}</Ctx.Provider>;
}

// Enveloppe le contenu des pages : sortie en fondu flou, entrée en douceur.
export function PageContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { leaving } = usePageTransition();
  return (
    <div key={pathname} className={leaving ? "page-leave" : "page-enter"}>
      {children}
    </div>
  );
}
