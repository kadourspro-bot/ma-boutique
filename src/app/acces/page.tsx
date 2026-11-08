import Logo from "@/components/Logo";

export const metadata = { title: "Accès sur invitation", robots: { index: false, follow: false } };

// Page affichée aux visiteurs qui n'ont pas encore le mot de passe.
// Le mot de passe se règle sur Vercel (variable SITE_PASSWORD), voir MODIFIER.md.
export default async function Acces({ searchParams }: { searchParams: Promise<{ from?: string; erreur?: string }> }) {
  const { from = "/", erreur } = await searchParams;
  return (
    <div data-acces className="flex min-h-[100svh] items-center justify-center px-4 py-10">
      {/* Sur cette page, on cache l'en-tête et le bas de page du site */}
      <style>{`body:has([data-acces]) header, body:has([data-acces]) footer { display: none; }`}</style>
      <form action="/api/acces" method="post" className="glass w-full max-w-sm rounded-3xl p-8 text-center">
        <div className="flex justify-center"><Logo size="lg" /></div>
        <p className="kicker mt-8">Accès sur invitation</p>
        <h1 className="mt-3 font-display text-2xl font-light title-gradient">La station est encore secrète.</h1>
        <p className="mt-3 text-sm text-ivory/70">Entrez le mot de passe qui vous a été confié.</p>
        <input type="hidden" name="from" value={from} />
        <input
          type="password"
          name="code"
          required
          autoFocus
          autoComplete="current-password"
          aria-label="Mot de passe"
          placeholder="Mot de passe"
          className="mt-6 w-full rounded-full border border-silver/25 bg-night/60 px-5 py-3 text-center text-ivory placeholder:text-ivory/40 focus:border-lilac focus:outline-none"
        />
        {erreur && <p role="alert" className="mt-3 text-sm text-lilac">Mot de passe incorrect, réessayez.</p>}
        <button type="submit" className="btn-neon mt-5 w-full rounded-full px-6 py-3">Entrer</button>
      </form>
    </div>
  );
}
