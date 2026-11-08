# Comment modifier ton site

Le guide complet, partie par partie (où se trouve chaque texte, chaque réglage et chaque vidéo) : https://claude.ai/artifact/RteawEqxGhh4M3cdoJyBNW

Tu n'as besoin que de **deux fichiers**. Tu peux les modifier directement sur GitHub, sans rien installer.

| Ce que tu veux changer | Fichier |
|---|---|
| Nom de la marque, couleurs, bandeau du haut, textes de l'accueil, FAQ, frais de livraison, infos légales | `src/config/site.ts` |
| Produits : nom, prix, description, stock, image | `src/config/products.ts` |
| Images des produits | dossier `public/products/` |

## Modifier un fichier sur GitHub (le plus simple)

1. Ouvre ton dépôt sur github.com et clique sur le fichier (par exemple `src/config/site.ts`).
2. Clique sur l'icône **crayon** ✏️ en haut à droite du fichier.
3. Change le texte **entre les guillemets** `"..."`. Ne supprime pas les guillemets, les virgules ni les accolades.
4. Clique sur **Commit changes…** puis encore **Commit changes**.
5. Si le site est relié à Vercel, il se met à jour tout seul en 1 minute environ.

## Exemples

**Changer le nom de la marque** (logo, onglet du navigateur, bas de page) :
```ts
name: "Lunaria",   →   name: "MonNouveauNom",
```

**Changer les couleurs** (palette Lunaria, dans `site.ts`) :
```ts
night: "#11152B",      // bleu nuit : fond
lilac: "#B7A1E8",      // lilas : boutons, accents
silver: "#D7D8E2",     // argent : logo, lignes
ivory: "#F7F3EE",      // ivoire : textes, cartes produits
turquoise: "#73D9D0",  // turquoise : détails futuristes
```

**Le décor vidéo :** le fond du site, ce sont les 6 vidéos du dossier `public/videos/` (une par étape : accueil, boutique, fiche produit, panier, commande, après le paiement). Quand le client avance d'une étape, la vidéo `etape-N.mp4` se joue : le docteur se déplace. Ensuite il « attend » : sa petite vidéo `etape-N-attente.mp4` se joue une fois, puis il reste immobile (à la boutique, il reste immobile tout de suite : `attente: ""` dans `site.ts`). S'il revient en arrière, il n'y a pas de marche arrière : le décor se fond dans les dernières secondes de la vidéo de l'étape visée, on voit le docteur arriver à sa place (durée réglable : `arrivee`). Au clic sur un lien, le contenu de la page s'efface en flou, le voile du fond se retire pour laisser voir le docteur bouger, puis la nouvelle page apparaît en douceur. Pour changer une vidéo, remplace le fichier en gardant **exactement le même nom** ; l'image `-fin.jpg` sert de secours pendant le chargement (je peux la refaire). Pour une nouvelle vidéo d'attente, envoie-moi le clip de 4 s qui commence sur la dernière image de l'étape : je la mets à la bonne taille. Les chemins sont dans le bloc `background` de `site.ts`, ainsi que le cadrage sur mobile (`mobileFocus`) et le nombre de lueurs (`particles`, 0 pour les enlever).

**Après la commande :** la vidéo 6 se joue (le jour se lève, la planète apparaît), puis la phrase apparaît en fondu. Le message et le sous-titre se changent dans le bloc `thankYou` de `site.ts`.

**Les autres images :** dépose dans `public/images/` (Add file → Upload files) :
- `labo.jpg` : section « Le rituel »
- `moon.jpg` : section newsletter (robot M.O.O.N.)
- pour changer la photo d'Orion de la section « Univers », remplace `orion.webp` (ou change le chemin `universe.image`).

Tant qu'un fichier manque, une illustration le remplace.

**Changer les textes de l'accueil :** blocs `hero`, `ritual`, `universe`, `newsletter` et `faq` dans `site.ts`.

**Le logo :** les fichiers vectoriels sont dans `public/brand/` (version principale, claire, transparente et icône).

**Changer un prix** (en centimes : 2490 = 24,90 €) :
```ts
price: 1990,   →   price: 2490,
```

**Ajouter un produit :** copie un bloc complet de `{` à `},` dans `products.ts`, colle-le juste en dessous et change les valeurs. Le `slug` doit être unique, en minuscules et avec des tirets (exemple : `creatine-1kg`).

**Mettre ta propre photo :** sur GitHub, va dans `public/products/`, clique **Add file → Upload files** et envoie ta photo (par exemple `pot.jpg`). Dans `products.ts`, mets ensuite `image: "/products/pot.jpg",`.

**Masquer un produit épuisé :** mets `stock: 0,` et il s'affichera « Épuisé ».

## Règle importante pour les textes

N'écris pas de promesse santé non autorisée (« fait maigrir », « soigne »…). Pour les compléments alimentaires, seules les allégations de la liste officielle de l'UE sont permises. Pour les cosmétiques, chaque bénéfice doit pouvoir être prouvé (tests). Si tu ajoutes un complément alimentaire, n'utilise que les allégations officielles de ses ingrédients (ex. pour le magnésium : « contribue à réduire la fatigue »).

## Attention aux apostrophes dans les fichiers .tsx

Dans `site.ts` et `products.ts`, écris normalement. Dans un fichier `.tsx`, une apostrophe droite `'` dans un texte bloque la mise en ligne : utilise l'apostrophe typographique ’ ou écris `&apos;`.

## Site sur invitation (mot de passe)

Une fois en ligne, le site peut être réservé aux personnes à qui tu donnes un mot de passe. Les autres voient seulement une page « Accès sur invitation ». Une personne qui a entré le bon mot de passe n’a plus à le retaper pendant 30 jours sur ce téléphone ou cet ordinateur.

Le mot de passe ne s’écrit **pas** dans le code (le dépôt GitHub est public, tout le monde pourrait le lire). Il se règle sur Vercel :

1. Sur vercel.com, ouvre ton projet → **Settings** → **Environment Variables**.
2. **Key** : `SITE_PASSWORD` · **Value** : ton mot de passe (exemple : `orion2026`) → **Save**.
3. Onglet **Deployments** → sur la dernière ligne, les trois points **⋯** → **Redeploy**.

- **Plusieurs personnes, un code chacune :** sépare les codes par des virgules, par exemple `marie-lune,karim-orbite,orion2026`. Pour retirer l’accès à quelqu’un, enlève son code puis refais **Redeploy**.
- **Ouvrir le site à tout le monde :** supprime la variable `SITE_PASSWORD` puis **Redeploy**.
- Sur ton ordinateur (`npm run dev`), il n’y a pas de mot de passe tant que la variable n’existe pas.

## Si quelque chose casse

Sur GitHub, ouvre le fichier puis **History** : tu y retrouves chaque ancienne version et tu peux recopier celle qui marchait. Tu peux aussi me le dire et je corrige.
