// ============================================================
//  RÉGLAGES DU SITE LUNARIA : modifie ce fichier pour changer
//  les textes, couleurs, images, la FAQ et tes infos légales.
//  Les produits sont dans src/config/products.ts
// ============================================================

export const site = {
  // --- Marque ---
  name: "Lunaria", // s'affiche en capitales dans le logo
  signature: "Votre santé, nouvelle orbite.",
  description: "Lunaria explore la perte de poid du futur, imaginés dans un laboratoire en orbite.",

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
  // - attente : ta vidéo d'attente, jouée une fois quand le docteur est arrivé ; ensuite
  //             l'image reste sur sa dernière image (pas de boucle, pas de marche arrière) ;
  // - fin     : image de secours (chargement, ou si le visiteur a réduit les animations) ;
  // - fixe    : (facultatif) true = pendant l'attente, l'image reste parfaitement immobile.
  //             mettre "" pour rester immobile dès la fin du déplacement ;
  // Quand on revient en arrière, pas de marche arrière : le décor se fond dans les
  // dernières secondes de la vidéo de l'étape visée (durée réglable : arrivee).
  // Pour changer une vidéo : remplace le fichier dans public/videos/ en gardant le même nom
  // (la vidéo « attente » et l'image « fin » se refont à partir de la vidéo : demande-moi).
  background: {
    debut: "/videos/etape-1-debut.jpg", // image affichée pendant le chargement
    scenes: {
      accueil: { video: "/videos/etape-1.mp4", attente: "/videos/etape-1-attente.mp4", fin: "/videos/etape-1-fin.jpg" },
      boutique: { video: "/videos/etape-2.mp4", attente: "/videos/etape-2-attente.mp4", fin: "/videos/etape-2-fin.jpg", fixe: true },
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
  announcement: "Livraison offerte dès 200 € · Paiement sécurisé",

  // --- Livraison (montants en centimes : 6000 = 60,00 €) ---
  freeShippingThreshold: 20000,
  shippingFee: 490,
  shippingOptions: ["Point relais (4-5 jours)", "Domicile (7 jours)"],

  // --- 1. Accueil ---
  hero: {
    kicker: "Laboratoire lunaire · Station Lunaria",
    title: "Votre santé, nouvelle orbite.",
    subtitle: "Des Méthode de santé inspirés par la curiosité, la lumière et l'univers.",
    button: { label: "Découvrir la collection", href: "/#collection" },
  },

  reassurance: ["Livraison suivie 72 h", "Retours 14 jours", "Paiement sécurisé"],

  // --- 3. La Méthode ---
  ritual: {
    kicker: "La Méthode Lunaria",
    title: "Trois gestes, une nouvelle orbite.",
    image: "/images/moon.jpg",
    steps: [
      { title: "Préparer", text: "Nettoyez la zone à injecter avec un patch hydroalcoolique, puis laissez-la sécher." },
      { title: "Prélever", text: "Après reconstitution, prélevez dans la seringue la dose (en unités ou en mg) définie avec votre médecin, en vérifiant qu’il n’y a pas de bulles d’air." },
      { title: "Injecter", text: "Enfin, injectez la dose dans la zone nettoyée." },
    ],
  },

  // --- 4. L'univers ---
  universe: {
    kicker: "L'univers du laboratoire",
    title: "Rencontrez le Professeur Orion.",
    text: [
      "Dans une station vitrée suspendue au-dessus de la Lune, le Professeur Orion imagine de nouvelles méthodes dédiées au bien-être et à la vitalité. Curieux, inventif et un brin excentrique, il explore l’équilibre, l’énergie et les habitudes qui aident à se sentir bien au quotidien.",
      "À ses côtés, M.O.O.N., son petit robot assistant, l’accompagne dans ses découvertes avec un enthousiasme débordant (et quelques bips de satisfaction).",
    ],
    image: "/images/orion2.0.jpg",
  },

  faq: [
    ["Comment utiliser le Pack rétatruitide ?", "Une fois par semaine, prélever la dose souhaitée, puis l’injecter dans le tissu adipeux (graisse corporelle)."],
    ["D'où vient la rétatruitide ?", "La rétatrutide, est une molécule développée en laboratoire. C’est un peptide expérimental conçu pour agir sur trois récepteurs liés à l’appétit et au métabolisme. Elle est étudiée pour la gestion du poids et certaines conditions métaboliques"],
    ["Quels sont les délais de livraison ?", "Expédition sous 72 h ouvrées, livraison en 5 à 7 jours en France."],
  ] as [string, string][],

  // --- 5. Newsletter ---
  newsletter: {
    title: "M.O.O.N. a un message pour vous.",
    text: "Méthodes inédites, lancements et coulisses du laboratoire : recevez la transmission lunaire, une fois par mois.",
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
