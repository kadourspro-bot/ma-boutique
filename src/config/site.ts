// ============================================================
//  RÉGLAGES DU SITE LUNARIA : modifie ce fichier pour changer
//  les textes, couleurs, images, la FAQ et tes infos légales.
//  Les produits sont dans src/config/products.ts
// ============================================================

export const site = {
  // --- Marque ---
  name: "LUNARIA",
  signature: "Votre beauté, nouvelle orbite.",
  description: "Lunaria explore les rituels de beauté du futur, imaginés dans un laboratoire en orbite.",

  // --- Palette de la D.A. ---
  colors: {
    night: "#11152B", // bleu nuit spatial : fond
    lilac: "#B7A1E8", // lilas lunaire : boutons, accents
    silver: "#D7D8E2", // argent nacré : logo, lignes
    ivory: "#F7F3EE", // ivoire cosmique : textes, cartes produits
    turquoise: "#73D9D0", // turquoise lumineux : détails futuristes
  },

  // --- Décor : la station lunaire et la lune qui avance à chaque étape ---
  background: {
    station: "/images/station.webp", // le laboratoire (baie vitrée transparente)
    moon: "/images/lune.webp",
    stars: 180,
    // Position de la lune (en % de la largeur de la baie, 100 = à droite) pour chaque étape
    moonSteps: { accueil: 74, boutique: 62, produit: 50, panier: 38, commande: 26, merci: -20 },
    moonSeconds: 2.2, // durée du déplacement de la lune
  },

  // --- Après la commande : la planète arrive ---
  thankYou: {
    planet: "/images/planete.webp",
    message: "La beauté ne se voit qu'après les résultats.",
    subtitle: "Merci pour votre commande. Un e-mail de confirmation vient de partir vers votre orbite.",
  },

  // --- Bandeau tout en haut ---
  announcement: "Livraison offerte dès 60 € · Échantillon Lunaria Nuit offert",

  // --- Livraison (montants en centimes : 6000 = 60,00 €) ---
  freeShippingThreshold: 6000,
  shippingFee: 490,
  shippingOptions: ["Point relais (2–3 jours)", "Domicile (2 jours)"],

  // --- 1. Accueil ---
  hero: {
    kicker: "Laboratoire lunaire · Station Lunaria",
    title: "Votre beauté, nouvelle orbite.",
    subtitle: "Des rituels de beauté inspirés par la curiosité, la lumière et l'univers.",
    button: { label: "Découvrir la collection", href: "/#collection" },
  },

  reassurance: ["Livraison suivie 48 h", "Retours 14 jours", "Paiement sécurisé"],

  // --- 3. Le rituel ---
  ritual: {
    kicker: "Le rituel Lunaria",
    title: "Trois gestes, une nouvelle orbite.",
    image: "/images/labo.jpg",
    steps: [
      { title: "Éveiller", text: "Le matin, quelques gouttes de Lunaria Éclat sur peau propre pour un teint frais et lumineux." },
      { title: "Illuminer", text: "Une touche de Lunaria Glow sur les pommettes et les épaules pour un fini nacré." },
      { title: "Régénérer", text: "Le soir, Lunaria Nuit en massage lent : un moment pour soi avant de rejoindre les étoiles." },
    ],
  },

  // --- 4. L'univers ---
  universe: {
    kicker: "L'univers du laboratoire",
    title: "Rencontrez le Professeur Orion.",
    text: [
      "Dans une station vitrée suspendue au-dessus de la Lune, le Professeur Orion imagine les rituels de beauté de demain. Curieux, inventif et un brin excentrique, il s'inspire de la lumière lunaire, des textures nacrées et des botaniques cultivées sous cloche.",
      "À ses côtés, M.O.O.N., son petit robot assistant, teste chaque texture avec un enthousiasme débordant (et quelques bips de satisfaction).",
    ],
    image: "/images/orion.webp",
  },

  faq: [
    ["Comment utiliser les produits Lunaria ?", "Chaque fiche produit détaille son rituel. Éclat et Glow s'utilisent le matin, Nuit le soir, Balance au quotidien."],
    ["D'où viennent les ingrédients ?", "Nos formules associent des actifs botaniques sélectionnés et des ingrédients d'origine naturelle. La liste complète (INCI) figure sur chaque fiche produit."],
    ["Quels sont les délais de livraison ?", "Expédition sous 24 h ouvrées, livraison en 2 à 3 jours en France."],
    ["Puis-je retourner un produit ?", "Oui, vous disposez de 14 jours après réception pour un produit non ouvert."],
  ] as [string, string][],

  // --- 5. Newsletter ---
  newsletter: {
    title: "M.O.O.N. a un message pour vous.",
    text: "Rituels inédits, lancements et coulisses du laboratoire : recevez la transmission lunaire, une fois par mois.",
    image: "/images/moon.jpg",
  },

  // --- Pied de page ---
  contactEmail: "contact@lunaria.fr",
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "TikTok", href: "https://tiktok.com/" },
    { label: "Pinterest", href: "https://pinterest.com/" },
  ],
  company: {
    legalName: "Nom de ta société",
    address: "Adresse complète, code postal, ville",
    siret: "000 000 000 00000",
    vat: "FR00000000000",
    publisher: "Ton nom (directeur de la publication)",
    host: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA",
  },
};
