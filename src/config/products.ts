// ============================================================
//  TES PRODUITS : ajoute, supprime ou modifie un bloc { ... }
//  (pour l'instant un seul produit ; pour en ajouter un, copie le bloc
//   entier de { à }, colle-le juste après et change les valeurs)
//  - slug : l'adresse de la page (minuscules, tirets, sans accent)
//  - price : en centimes (3900 = 39,00 €)
//  - image : un fichier dans public/products/
//  - accent : la couleur de la gamme
//  - stock : 0 = affiché « Épuisé »
//  - bestseller : true = mis en avant
//  ⚠️ Textes : bénéfices concrets et vérifiables uniquement,
//     aucune promesse de minceur ni de soin médical.
// ============================================================

export type Product = {
  slug: string;
  name: string;
  range: string;
  category: string;
  price: number;
  image: string;
  accent: string;
  short: string;
  description: string;
  benefits: string[];
  ritual: string;
  ingredients: string;
  size: string;
  stock: number;
  bestseller?: boolean;
};

export const products: Product[] = [
  {
    slug: "pack-retatruitide",
    name: "Pack Rétatruitide",
    range: "Peptide",
    category: "produit minceur",
    price: 7500,
    image: "/images/produit reta.png",
    accent: "#73D9D0",
    short: "Peptide synthétique de 39 acides aminés qui agit sur trois récepteurs hormonaux.",
    description: "La rétatrutide est un peptide synthétique : une chaîne de 39 acides aminés, modifiée avec une partie lipidique pour prolonger son action. Elle agit sur trois récepteurs hormonaux : GIP, GLP‑1 et glucagon",
    benefits: ["Perte de poids", "Favorise un meilleur équilibre du sucre dans le sang", "Contribue à réduire la graisse stockée dans le foie"],
    ritual: "Une fois par semaine, prélever la dose prescrite, vérifier l’absence de bulles d’air, puis injecter",
    ingredients: "Patch hydroalcoolique, seringues, rétatrutide 10 mg et eau bactériostatique",
    size: "10 mg",
    stock: 50,
    bestseller: true,
  },
];

// ---- Ne pas modifier en dessous ----
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
