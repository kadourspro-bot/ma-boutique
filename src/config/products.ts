// ============================================================
//  TES PRODUITS : ajoute, supprime ou modifie un bloc { ... }
//  - slug : l'adresse de la page (minuscules, tirets, sans accent)
//  - price : en centimes (1990 = 19,90 €)
//  - image : un fichier placé dans le dossier public/products/
//  - stock : 0 = affiché « Épuisé »
//  - bestseller : true = affiché sur la page d'accueil
// ============================================================

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  short: string;
  description: string;
  stock: number;
  bestseller?: boolean;
};

export const products: Product[] = [
  {
    slug: "creatine-300g",
    name: "Créatine monohydrate 300 g",
    category: "Créatine",
    price: 1990,
    image: "/products/creatine.svg",
    short: "100 doses de 3 g. Poudre pure, sans arôme.",
    description:
      "Créatine monohydrate micronisée, pureté ≥ 99,9 %. Sans arôme, sans édulcorant, sans additif. La créatine augmente la performance physique lors d'exercices brefs et intenses (effet obtenu avec une consommation de 3 g par jour). Doseur inclus.",
    stock: 40,
    bestseller: true,
  },
  {
    slug: "creatine-500g",
    name: "Créatine monohydrate 500 g",
    category: "Créatine",
    price: 2790,
    image: "/products/creatine.svg",
    short: "166 doses de 3 g. Le meilleur prix au kilo.",
    description:
      "Le même produit en grand format. La créatine augmente la performance physique lors d'exercices brefs et intenses (effet obtenu avec une consommation de 3 g par jour). Doseur inclus.",
    stock: 25,
    bestseller: true,
  },
  {
    slug: "pack-2x500g",
    name: "Pack 2 × 500 g + shaker offert",
    category: "Packs",
    price: 4990,
    image: "/products/creatine.svg",
    short: "Un an de créatine, livraison offerte.",
    description: "Deux pots de 500 g et un shaker de 600 ml offert.",
    stock: 12,
    bestseller: true,
  },
  {
    slug: "shaker-600ml",
    name: "Shaker 600 ml",
    category: "Accessoires",
    price: 690,
    image: "/products/shaker.svg",
    short: "Sans BPA, passe au lave-vaisselle.",
    description: "Shaker 600 ml avec grille de mélange, sans BPA.",
    stock: 80,
  },
];

// ---- Ne pas modifier en dessous ----
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
