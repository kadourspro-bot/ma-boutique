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
    slug: "lunaria-eclat",
    name: "Lunaria Éclat",
    range: "Rituel beauté",
    category: "Sérums",
    price: 3900,
    image: "/products/eclat.svg",
    accent: "#73D9D0",
    short: "Sérum lumière à la vitamine C stabilisée.",
    description: "Un sérum fluide qui révèle l'éclat du teint dès le matin. Sa texture légère pénètre vite et laisse la peau douce, sans film gras.",
    benefits: ["Teint visiblement plus lumineux", "Peau hydratée et douce", "Texture légère, non grasse"],
    ritual: "Le matin, appliquez 3 à 4 gouttes sur le visage propre, puis votre crème habituelle.",
    ingredients: "Aqua, Glycerin, Ascorbyl Glucoside, Sodium Hyaluronate, Niacinamide, Citrus Aurantium Dulcis Fruit Extract… (liste complète à compléter)",
    size: "30 ml",
    stock: 40,
    bestseller: true,
  },
];

// ---- Ne pas modifier en dessous ----
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
