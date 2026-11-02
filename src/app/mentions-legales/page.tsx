import { site } from "@/config/site";
export const metadata = { title: "Mentions légales et CGV" };

// Les informations de la société se modifient dans src/config/site.ts
export default function Legal() {
  const c = site.company;
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Mentions légales</h1>
      <ul className="space-y-1">
        <li><strong>Société :</strong> {c.legalName}</li>
        <li><strong>Adresse :</strong> {c.address}</li>
        <li><strong>SIRET :</strong> {c.siret}</li>
        <li><strong>TVA intracommunautaire :</strong> {c.vat}</li>
        <li><strong>Directeur de la publication :</strong> {c.publisher}</li>
        <li><strong>Contact :</strong> {site.contactEmail}</li>
        <li><strong>Hébergeur :</strong> {c.host}</li>
      </ul>
      <h2 id="cgv" className="text-xl font-bold">Conditions générales de vente</h2>
      <p>À rédiger : prix TTC, livraison, droit de rétractation de 14 jours, garanties légales, médiateur de la consommation.</p>
      <h2 id="retours" className="text-xl font-bold">Retours</h2>
      <p>Vous disposez de 14 jours après réception pour nous retourner un produit non ouvert. Écrivez-nous à {site.contactEmail}.</p>
    </div>
  );
}
