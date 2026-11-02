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
    brand: "#39ff88", // vert alien : boutons, lueurs, prix
    accent: "#22d3ee", // cyan : liens, molécules du fond
    background: "#03060c", // fond de l'espace
  },

  // --- Fond animé (molécules qui se connectent) ---
  background: {
    molecules: 90, // nombre de points (moins = plus léger sur mobile)
    linkDistance: 140, // distance max pour relier deux points
  },

  // --- Slider tout en haut de l'accueil (ajoute ou retire des slides) ---
  slides: [
    {
      tag: "Protocole 01 · Pureté",
      title: "Synthétisée au-delà des étoiles.",
      subtitle: "Créatine monohydrate pure à 99,9 %, analysée en laboratoire, lot par lot.",
      image: "/products/creatine.svg",
      button: { label: "Explorer le labo", href: "/boutique" },
    },
    {
      tag: "Protocole 02 · Puissance",
      title: "3 g. Chaque jour. Rien d'autre.",
      subtitle: "Augmente la performance physique lors d'exercices brefs et intenses.",
      image: "/products/creatine.svg",
      button: { label: "Voir la créatine 500 g", href: "/produit/creatine-500g" },
    },
    {
      tag: "Protocole 03 · Offre",
      title: "Le pack de l'année, shaker offert.",
      subtitle: "Deux pots de 500 g, livraison offerte, expédiés sous 24 h.",
      image: "/products/shaker.svg",
      button: { label: "Prendre le pack", href: "/produit/pack-2x500g" },
    },
  ],
  slideDuration: 6, // secondes entre deux slides

  // --- Bandeau tout en haut de chaque page ---
  announcement: "Livraison offerte dès 50 € · Expédition sous 24 h",

  // --- Livraison (montants en centimes : 5000 = 50,00 €) ---
  freeShippingThreshold: 5000,
  shippingFee: 490,
  shippingOptions: ["Point relais (2–3 jours)", "Domicile (2 jours)"],

  // Petits arguments affichés sous le slider et sur chaque fiche produit
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
