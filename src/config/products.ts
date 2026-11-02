// ============================================================
//  TES PRODUITS : ajoute, supprime ou modifie un bloc { ... }
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
  {
    slug: "lunaria-glow",
    name: "Lunaria Glow",
    range: "Soin éclat",
    category: "Huiles",
    price: 3400,
    image: "/products/glow.svg",
    accent: "#E8C9A1",
    short: "Huile sèche nacrée visage et corps.",
    description: "Une huile sèche aux reflets nacrés qui sublime la peau d'un voile lumineux. Elle nourrit sans graisser et laisse un parfum délicat.",
    benefits: ["Fini nacré lumineux", "Peau nourrie et satinée", "Pénètre en quelques secondes"],
    ritual: "Réchauffez quelques gouttes entre vos mains et appliquez sur les pommettes, les épaules ou les jambes.",
    ingredients: "Caprylic/Capric Triglyceride, Prunus Amygdalus Dulcis Oil, Mica, Tocopherol, Parfum… (liste complète à compléter)",
    size: "50 ml",
    stock: 25,
    bestseller: true,
  },
  {
    slug: "lunaria-nuit",
    name: "Lunaria Nuit",
    range: "Rituel du soir",
    category: "Crèmes",
    price: 4500,
    image: "/products/nuit.svg",
    accent: "#B7A1E8",
    short: "Crème de nuit fondante au bakuchiol.",
    description: "Une crème riche et fondante pour un rituel du soir apaisant. Au réveil, la peau est souple, confortable et reposée.",
    benefits: ["Peau souple et confortable au réveil", "Hydratation longue durée", "Massage relaxant du soir"],
    ritual: "Le soir, massez une noisette de crème en mouvements lents, du centre du visage vers l'extérieur.",
    ingredients: "Aqua, Butyrospermum Parkii Butter, Glycerin, Bakuchiol, Squalane, Lavandula Angustifolia Oil… (liste complète à compléter)",
    size: "50 ml",
    stock: 18,
    bestseller: true,
  },
  {
    slug: "lunaria-balance",
    name: "Lunaria Balance",
    range: "Bien-être",
    category: "Compléments",
    price: 2900,
    image: "/products/balance.svg",
    accent: "#A9C7F0",
    short: "Complément magnésium & mélisse, 60 gélules.",
    description: "Complément alimentaire associant magnésium marin et extrait de mélisse, pour accompagner votre équilibre au quotidien. Le magnésium contribue à réduire la fatigue.",
    benefits: ["Le magnésium contribue à réduire la fatigue", "Le magnésium contribue à un fonctionnement normal du système nerveux", "2 gélules par jour, 1 mois de rituel"],
    ritual: "2 gélules par jour avec un grand verre d'eau. Ne pas dépasser la dose journalière recommandée. À utiliser dans le cadre d'une alimentation variée et équilibrée et d'un mode de vie sain. Tenir hors de portée des jeunes enfants.",
    ingredients: "Oxyde de magnésium marin, extrait de mélisse (Melissa officinalis), gélule d'origine végétale (hydroxypropylméthylcellulose)… (à compléter)",
    size: "60 gélules",
    stock: 30,
  },
  {
    slug: "coffret-orbite",
    name: "Coffret Orbite",
    range: "Coffret",
    category: "Coffrets",
    price: 9900,
    image: "/products/coffret.svg",
    accent: "#D7D8E2",
    short: "Éclat + Glow + Nuit, le rituel complet.",
    description: "Les trois soins du rituel Lunaria réunis dans un coffret bleu nuit, prêt à offrir (ou à s'offrir).",
    benefits: ["Le rituel complet matin et soir", "19 € d'économie", "Coffret cadeau inclus"],
    ritual: "Matin : Éclat puis Glow. Soir : Nuit.",
    ingredients: "Voir chaque produit.",
    size: "30 ml + 50 ml + 50 ml",
    stock: 10,
    bestseller: true,
  },
];

// ---- Ne pas modifier en dessous ----
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
