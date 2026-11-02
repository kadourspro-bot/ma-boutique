import type { Metadata } from "next";
import { Geist, Orbitron } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import LabBackground from "@/components/LabBackground";
import { site } from "@/config/site";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const orbitron = Orbitron({ variable: "--font-orbitron", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: `${site.name} · ${site.slogan}`, template: `%s · ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const vars = { "--brand": site.colors.brand, "--accent": site.colors.accent, "--bg": site.colors.background } as React.CSSProperties;
  return (
    <html lang="fr" style={vars}>
      <body className={`${geist.variable} ${orbitron.variable} antialiased font-sans`}>
        <LabBackground />
        <CartProvider>
          <Header />
          <main>{children}</main>
          <CartDrawer />
          <footer className="mt-24 border-t border-white/10 bg-black/40 backdrop-blur">
            <div className="max-w-6xl mx-auto px-4 py-10 grid gap-6 sm:grid-cols-3 text-sm text-white/60">
              <div><p className="font-display font-bold text-white">{site.name}</p><p className="mt-2">{site.company.legalName}<br />{site.company.address}</p></div>
              <ul className="space-y-1"><li><Link href="/boutique" className="hover:text-brand">Boutique</Link></li><li><Link href="/#faq" className="hover:text-brand">FAQ</Link></li><li><a href={`mailto:${site.contactEmail}`} className="hover:text-brand">{site.contactEmail}</a></li></ul>
              <ul className="space-y-1"><li><Link href="/mentions-legales" className="hover:text-brand">Mentions légales</Link></li><li><Link href="/mentions-legales#cgv" className="hover:text-brand">CGV</Link></li><li><Link href="/mentions-legales#retours" className="hover:text-brand">Retours (14 jours)</Link></li></ul>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
