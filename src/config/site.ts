// ============================================================
//  RÉGLAGES DU SITE : modifie ce fichier pour changer
//  le nom, les couleurs, les textes, la FAQ et tes infos légales.
//  Les produits sont dans src/config/products.ts
// ============================================================

export const site = {
  // --- Marque ---
  name: "PureForme",
  slogan: "Créatine pure, testée en laboratoire.",
  description: "Créatine monohydrate 100 % pure, sans additif, expédiée sous 24 h.",

  // --- Couleurs (codes hexadécimaux, ex. #059669) ---
  colors: {
    brand: "#0f766e", // boutons, badges, barre de progression
    dark: "#171717", // bandeau du haut, bouton panier
  },

  // --- Bandeau tout en haut de chaque page ---
  announcement: "Livraison offerte dès 50 € · Expédition sous 24 h",

  // --- Livraison (montants en centimes : 5000 = 50,00 €) ---
  freeShippingThreshold: 5000,
  shippingFee: 490,
  shippingOptions: ["Point relais (2–3 jours)", "Domicile (2 jours)"],

  // --- Page d'accueil ---
  hero: {
    title: "La créatine la plus pure, au juste prix.",
    subtitle: "100 % créatine monohydrate, sans arôme ni additif. Une dose de 3 g par jour suffit.",
    image: "/products/creatine.svg",
    primaryButton: { label: "Voir les produits", href: "/boutique" },
    secondaryButton: { label: "Commencer par le pack", href: "/produit/pack-2x500g" },
  },
  // Petits arguments affichés sous le hero et sur chaque fiche produit
  reassurance: ["Expédition 24 h", "Retours 14 jours", "Paiement sécurisé"],

  faq: [
    ["Quels sont les délais de livraison ?", "Expédition sous 24 h ouvrées, livraison en 2 à 3 jours en France."],
    ["Comment utiliser la créatine ?", "Mélangez une dose de 3 g (1 doseur) dans de l'eau ou votre boisson, une fois par jour."],
    ["Puis-je retourner un produit ?", "Oui, vous disposez de 14 jours après réception (droit de rétractation), produit non ouvert."],
    ["Le paiement est-il sécurisé ?", "Oui : carte bancaire, Apple Pay et Google Pay via un prestataire certifié."],
  ] as [string, string][],

  // --- Contact et informations légales (obligatoires en France) ---
  contactEmail: "contact@exemple.fr",
  company: {
    legalName: "Nom de ta société",
    address: "Adresse complète, code postal, ville",
    siret: "000 000 000 00000",
    vat: "FR00000000000",
    publisher: "Ton nom (directeur de la publication)",
    host: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA",
  },
};
