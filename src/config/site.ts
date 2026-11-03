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

  // --- Décor : les 6 vidéos du laboratoire, une par étape d'achat ---
  // Pour chaque étape :
  // - video   : le docteur se déplace jusqu'à l'étape (jouée quand on avance d'une étape) ;
  // - attente : boucle jouée tant que le client reste sur l'étape (ta vidéo d'attente
  //             jouée à l'endroit puis à l'envers, pour boucler sans coupure) ;
  // - fin     : image de secours (chargement, ou si le visiteur a réduit les animations).
  // Quand on revient en arrière, pas de marche arrière : le décor se fond dans les
  // dernières secondes de la vidéo de l'étape visée (durée réglable : arrivee).
  // Pour changer une vidéo : remplace le fichier dans public/videos/ en gardant le même nom
  // (la boucle « attente » et l'image « fin » se refont à partir de la vidéo : demande-moi).
  background: {
    debut: "/videos/etape-1-debut.jpg", // image affichée pendant le chargement
    scenes: {
      accueil: { video: "/videos/etape-1.mp4", attente: "/videos/etape-1-attente.mp4", fin: "/videos/etape-1-fin.jpg" },
      boutique: { video: "/videos/etape-2.mp4", attente: "/videos/etape-2-attente.mp4", fin: "/videos/etape-2-fin.jpg" },
      produit: { video: "/videos/etape-3.mp4", attente: "/videos/etape-3-attente.mp4", fin: "/videos/etape-3-fin.jpg" },
      panier: { video: "/videos/etape-4.mp4", attente: "/videos/etape-4-attente.mp4", fin: "/videos/etape-4-fin.jpg" },
      commande: { video: "/videos/etape-5.mp4", attente: "/videos/etape-5-attente.mp4", fin: "/videos/etape-5-fin.jpg" },
      merci: { video: "/videos/etape-6.mp4", attente: "/videos/etape-6-attente.mp4", fin: "/videos/etape-6-fin.jpg" },
    },
    arrivee: 2.5, // secondes de vidéo montrées quand on revient à une étape précédente
    // Sur mobile, partie de la vidéo gardée à l'écran (0% = gauche, 100% = droite)
    mobileFocus: "68%",
    particles: 40, // petites lueurs qui flottent pendant l'attente (0 pour les enlever)
  },

  // --- Après la commande : la phrase finale ---
  thankYou: {
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
