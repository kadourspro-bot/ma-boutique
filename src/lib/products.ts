// Catalogue de démonstration : à remplacer par les vrais produits (ou un CMS / Shopify).
export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number; // en centimes
  image: string;
  short: string;
  description: string;
  stock: number;
  bestseller?: boolean;
};

export const products: Product[] = [
  { slug: "produit-alpha", name: "Produit Alpha", category: "Essentiels", price: 4900, image: "/placeholder.svg", short: "Notre référence la plus vendue.", description: "Description factuelle du produit, sans allégation de santé. Composition, format, conservation.", stock: 24, bestseller: true },
  { slug: "produit-beta", name: "Produit Beta", category: "Essentiels", price: 3900, image: "/placeholder.svg", short: "Format découverte.", description: "Description factuelle du produit.", stock: 8, bestseller: true },
  { slug: "pack-decouverte", name: "Pack Découverte", category: "Packs", price: 7900, image: "/placeholder.svg", short: "Les deux essentiels réunis, −15 %.", description: "Pack regroupant Alpha et Beta.", stock: 12, bestseller: true },
  { slug: "produit-gamma", name: "Produit Gamma", category: "Premium", price: 8900, image: "/placeholder.svg", short: "Notre gamme haut de gamme.", description: "Description factuelle du produit.", stock: 3 },
  { slug: "accessoire-kit", name: "Kit Accessoires", category: "Accessoires", price: 900, image: "/placeholder.svg", short: "Tout le nécessaire, prêt à l'emploi.", description: "Accessoires fournis.", stock: 100 },
  { slug: "produit-delta", name: "Produit Delta", category: "Premium", price: 6900, image: "/placeholder.svg", short: "Nouveauté.", description: "Description factuelle du produit.", stock: 0 },
];

export const FREE_SHIPPING_THRESHOLD = 15000;
export const SHIPPING_FEE = 690;

export const formatPrice = (cents: number) =>
  (cents / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
