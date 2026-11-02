export const metadata = { title: "Mentions légales et CGV" };
export default function Legal() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Mentions légales</h1>
      <p>À compléter : raison sociale, adresse, SIRET, n° TVA, directeur de la publication, hébergeur.</p>
      <h2 id="cgv" className="text-xl font-bold">Conditions générales de vente</h2>
      <p>À rédiger (prix TTC, livraison, droit de rétractation de 14 jours, garanties légales, médiateur de la consommation).</p>
      <h2 id="retours" className="text-xl font-bold">Retours</h2>
      <p>À compléter.</p>
    </div>
  );
}
