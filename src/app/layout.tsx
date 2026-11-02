import type { Metadata } from "next";
import { Inter, Jost } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import StationBackground from "@/components/StationBackground";
import Logo from "@/components/Logo";
import { site } from "@/config/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jost = Jost({ variable: "--font-jost", subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: { default: `Lunaria · ${site.signature}`, template: "%s · Lunaria" },
  description: site.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const c = site.colors;
  const vars = { "--night": c.night, "--lilac": c.lilac, "--silver": c.silver, "--ivory": c.ivory, "--turquoise": c.turquoise } as React.CSSProperties;
  return (
    <html lang="fr" style={vars}>
      <body className={`${inter.variable} ${jost.variable} font-sans antialiased`}>
        <CartProvider>
          <StationBackground />
          <Header />
          <main>{children}</main>
          <CartDrawer />
          <footer className="mt-32 border-t border-silver/10 bg-night/60 backdrop-blur">
            <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 text-sm text-ivory/60 sm:grid-cols-4">
              <div className="sm:col-span-2"><Logo withSignature /><p className="mt-4 max-w-xs">{site.description}</p></div>
              <ul className="space-y-2">
                <li><Link href="/boutique" className="hover:text-lilac">Collection</Link></li>
                <li><Link href="/#rituel" className="hover:text-lilac">Le rituel</Link></li>
                <li><a href={`mailto:${site.contactEmail}`} className="hover:text-lilac">{site.contactEmail}</a></li>
                {site.socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener" className="hover:text-lilac">{s.label}</a></li>)}
              </ul>
              <ul className="space-y-2">
                <li><Link href="/mentions-legales" className="hover:text-lilac">Mentions légales</Link></li>
                <li><Link href="/mentions-legales#cgv" className="hover:text-lilac">CGV</Link></li>
                <li><Link href="/mentions-legales#retours" className="hover:text-lilac">Retours (14 jours)</Link></li>
              </ul>
            </div>
            <p className="pb-8 text-center text-xs text-ivory/35">© {new Date().getFullYear()} Lunaria · {site.company.legalName}</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
