// Vérifie si un fichier existe dans public/ (pour afficher l'image si tu l'as déposée,
// sinon l'illustration de remplacement).
import fs from "node:fs";
import path from "node:path";
export const hasPublicFile = (p?: string) => !!p && fs.existsSync(path.join(process.cwd(), "public", p));
