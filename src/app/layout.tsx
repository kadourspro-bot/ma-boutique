import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "MaBoutique", template: "%s · MaBoutique" },
  description: "Boutique en ligne : livraison rapide, paiement sécurisé.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${geist.variable} antialiased bg-white text-neutral-900`}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <CartDrawer />
          <footer className="mt-20 border-t bg-neutral-50">
            <div className="max-w-6xl mx-auto px-4 py-10 grid gap-6 sm:grid-cols-3 text-sm">
              <div><p className="font-bold">MaBoutique</p><p className="text-neutral-600 mt-2">Société, adresse en France/UE, SIRET, TVA.</p></div>
              <ul className="space-y-1"><li><Link href="/boutique">Boutique</Link></li><li><Link href="/#faq">FAQ</Link></li><li><a href="mailto:contact@exemple.fr">contact@exemple.fr</a></li></ul>
              <ul className="space-y-1"><li><Link href="/mentions-legales">Mentions légales</Link></li><li><Link href="/mentions-legales#cgv">CGV</Link></li><li><Link href="/mentions-legales#retours">Retours (14 jours)</Link></li></ul>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
