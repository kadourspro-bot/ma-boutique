# Lunaria (boutique en ligne)

Boutique en ligne en Next.js 15 + Tailwind CSS, pensée pour la conversion : panier latéral avec barre « livraison offerte », commande en une page sans compte, bouton d'achat fixe sur mobile, recherche et tri.

## Lancer le site sur ton ordinateur

1. Installe [Node.js](https://nodejs.org) (version 20 ou plus).
2. Dans ce dossier : `npm install` puis `npm run dev`.
3. Ouvre http://localhost:3000

## Modifier les produits

Tout est expliqué pas à pas dans [MODIFIER.md](MODIFIER.md). En bref : les réglages (nom, couleurs, textes) sont dans `src/config/site.ts`, les produits dans `src/config/products.ts`.

## À faire

- Remplacer les produits et la marque d'exemple
- Brancher le paiement
- Rédiger mentions légales et CGV (`src/app/mentions-legales/page.tsx`)
- Mettre en ligne sur Vercel
