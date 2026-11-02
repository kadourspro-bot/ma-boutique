# Comment modifier ton site

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

**Changer le nom de la marque :**
```ts
name: "PureForme",   →   name: "MonNouveauNom",
```

**Changer les couleurs** (choisis un code sur https://htmlcolorcodes.com/fr/) :
```ts
brand: "#39ff88",       // vert alien : boutons, lueurs, prix
accent: "#22d3ee",      // cyan : liens, molécules du fond
background: "#03060c",  // fond de l'espace
```

**Modifier le slider de l'accueil :** dans `site.ts`, la liste `slides` contient un bloc par slide (`tag`, `title`, `subtitle`, `image`, `button`). Copie un bloc pour en ajouter un, supprime-le pour l'enlever. `slideDuration` règle le temps entre deux slides (en secondes).

**Régler le fond animé :** `molecules` = nombre de points (baisse-le si le site rame sur un vieux téléphone), `linkDistance` = distance à partir de laquelle les points se relient.

**Changer un prix** (en centimes : 2490 = 24,90 €) :
```ts
price: 1990,   →   price: 2490,
```

**Ajouter un produit :** copie un bloc complet de `{` à `},` dans `products.ts`, colle-le juste en dessous et change les valeurs. Le `slug` doit être unique, en minuscules et avec des tirets (exemple : `creatine-1kg`).

**Mettre ta propre photo :** sur GitHub, va dans `public/products/`, clique **Add file → Upload files** et envoie ta photo (par exemple `pot.jpg`). Dans `products.ts`, mets ensuite `image: "/products/pot.jpg",`.

**Masquer un produit épuisé :** mets `stock: 0,` et il s'affichera « Épuisé ».

## Règle importante pour les textes

N'écris pas de promesse santé non autorisée (« fait maigrir », « soigne »…). Pour les compléments alimentaires, seules les allégations de la liste officielle de l'UE sont permises. Celle de la créatine en est une : « augmente la performance physique lors d'exercices brefs et intenses (3 g par jour) ».

## Si quelque chose casse

Sur GitHub, ouvre l'onglet **Commits**, retrouve ta dernière modification et clique sur **Revert**. Tu peux aussi me le dire et je corrige.
