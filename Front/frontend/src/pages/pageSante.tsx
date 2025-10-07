import React, { useState } from "react";

import exampleImage from "../assets/serment.png";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/dialog";
import { Button } from "../components/ButtonVariant";

interface PopupContent {
  title: string;
  description: string;
}

const popupContents: Record<string, PopupContent> = {
  hippocrate: {
    title: "trouve l'intru:",
    description:
      " Socrate ; Platon ; Hippocrate ; Aristote ",
  },
  personnes: {
    title: "Devinette",
    description:
      " On prête serment en mon nom, mai je ne suis ni temple ni tribunal. Qui suis-je ? "
      },
  statue: {
    title: "Rebus",
    description:
      " Un phare + une masse (marteau) + une scie ",
  },
};

export default function PageSante() {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  // états pour les champs de texte par popup
  const [inputs, setInputs] = useState<Record<string, string>>({
    hippocrate: "",
    personnes: "",
    statue: "",
  });

  const openPopup = (type: string) => {
    setActivePopup(type);
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  const handleChange = (key: string, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleValidate = () => {
    if (!activePopup) return;
    const value = inputs[activePopup] ?? "";
    // 👉 remplace ceci par ton propre traitement (API, state global, etc.)
    console.log(`Validation pour "${activePopup}":`, value);
    // Optionnel: fermer après validation
    // closePopup();
  };

  return (
    <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
      <div className="relative max-w-full max-h-full">
        <img
          src={exampleImage}
          alt="Scène antique avec Hippocrate"
          className="max-w-full max-h-screen object-contain"
        />

        {/* Zone cliquable pour Hippocrate (personnage en rouge) — transparente (aucun hover) */}
        <button
          onClick={() => openPopup("hippocrate")}
          className="absolute bg-transparent border-2 border-red-500 border-opacity-0 rounded-lg cursor-pointer"
          style={{
            left: "23%",
            top: "44%",
            width: "12%",
            height: "25%",
          }}
          aria-label="Cliquez pour en savoir plus sur Hippocrate"
        >
          <span className="sr-only">Zone interactive - Hippocrate</span>
        </button>

        {/* Zone cliquable pour les personnes à droite — transparente (aucun hover) */}
        <button
          onClick={() => openPopup("personnes")}
          className="absolute bg-transparent border-2 border-blue-500 border-opacity-0 rounded-lg cursor-pointer"
          style={{
            left: "70%",
            top: "40%",
            width: "18%",
            height: "30%",
          }}
          aria-label="Cliquez pour en savoir plus sur les disciples"
        >
          <span className="sr-only">
            Zone interactive - Disciples et spectateurs
          </span>
        </button>

        {/* Zone cliquable pour la statue en arrière-plan — transparente (aucun hover) */}
        <button
          onClick={() => openPopup("statue")}
          className="absolute bg-transparent border-2 border-yellow-500 border-opacity-0 rounded-lg cursor-pointer"
          style={{
            left: "40%",
            top: "2%",
            width: "40%",
            height: "8%",
          }}
          aria-label="Cliquez pour en savoir plus sur la statue d'Asclépios"
        >
          <span className="sr-only">Zone interactive - Statue d'Asclépios</span>
        </button>

        {/* Instructions mises à jour */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-3 rounded-lg">
          <p className="text-sm">
            Cliquez sur les zones invisibles de l’image pour ouvrir une fiche.
          </p>
        </div>
      </div>

      {/* Dialog pour afficher les pop-ups avec zone de texte + bouton valider */}
      <Dialog open={activePopup !== null} onOpenChange={closePopup}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {activePopup && popupContents[activePopup]?.title}
            </DialogTitle>
            <DialogDescription className="mt-4">
              {activePopup && popupContents[activePopup]?.description}
            </DialogDescription>
          </DialogHeader>

          {/* Champ de texte contrôlé */}
          {activePopup && (
            <div className="mt-4 space-y-2">
              <label
                htmlFor="popup-textarea"
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Ajoutez votre texte
              </label>
              <textarea
                id="popup-textarea"
                value={inputs[activePopup] || ""}
                onChange={(e) => handleChange(activePopup, e.target.value)}
                className="w-full min-h-[120px] rounded-md border border-gray-300 bg-white/90 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700"
                placeholder="Écrivez ici..."
              />
            </div>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <Button onClick={closePopup} variant="outline">
              Fermer
            </Button>
            <Button onClick={handleValidate}>Valider</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
