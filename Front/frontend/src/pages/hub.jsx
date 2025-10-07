import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../Background.jsx";
import GreekColumn from "../components/GreekColumn.jsx";
import GreekFrise from "../components/GreekFrise.jsx";
import PlayerSlot from "../components/PlayerSlot.jsx";

const FRIESE_HEIGHT = 48;   // Keep in sync with GreekFrise height
const TILE_WIDTH = 160;     // Motif width

const Hub = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nom: "", prenom: "", equipe: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inscription:", formData);
    // your submit logic here
  };

  return (
    <Background>
      {/* Top & bottom frise (fixed) */}
      <GreekFrise position="top" height={FRIESE_HEIGHT} tileWidth={TILE_WIDTH} />
      <GreekFrise position="bottom" height={FRIESE_HEIGHT} tileWidth={TILE_WIDTH} />

      {/* Page container — reserve space for the frises so nothing is hidden */}
      <div
        className="w-full"
        style={{
          // Space equals the frise height top & bottom
          paddingTop: FRIESE_HEIGHT,
          paddingBottom: FRIESE_HEIGHT,
        }}
      >
        {/* Hero Header */}
        <header className="max-w-5xl mx-auto px-6 text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-3">
            <GreekColumn size="md" />
            <span className="text-sm tracking-widest uppercase text-amber-300/80">
              Agora • Opération Héphaïstos
            </span>
            <GreekColumn size="md" className="scale-x-[-1]" />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 drop-shadow-sm">
            Rejoignez l’expédition
          </h1>
          <p className="mt-3 text-slate-300/90">
            Formez votre équipe et inscrivez-vous pour entrer dans la légende.
          </p>
        </header>

        {/* Main grid */}
        <main className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Registration Card */}
          <section className="relative">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-6 md:p-8">
              {/* Decorative top frise inside card (not fixed) */}
              <div className="relative">
                <div
                  className="pointer-events-none absolute -top-3 left-0 right-0 h-3 opacity-70"
                  style={{
                    backgroundImage: `url(/src/assets/frise-grecque-classique-removebg-preview.png)`,
                    backgroundRepeat: "repeat-x",
                    backgroundSize: "80px 100%",
                    backgroundPosition: "center",
                  }}
                  aria-hidden
                />
              </div>

              <h2 className="text-2xl font-bold text-amber-100 mb-6">Inscription</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-slate-300 mb-1.5">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/60 border border-slate-600/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/60 transition"
                    placeholder="Entrez votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="prenom" className="block text-sm font-medium text-slate-300 mb-1.5">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/60 border border-slate-600/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/60 transition"
                    placeholder="Entrez votre prénom"
                  />
                </div>

                <div>
                  <label htmlFor="equipe" className="block text-sm font-medium text-slate-300 mb-1.5">
                    Nom d’équipe
                  </label>
                  <input
                    type="text"
                    id="equipe"
                    name="equipe"
                    value={formData.equipe}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/60 border border-slate-600/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/60 transition"
                    placeholder="Les Argonautes"
                  />
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center gap-4 my-4">
                  <div className="h-px bg-gradient-to-r from-transparent to-amber-500/40 flex-1" />
                  <svg className="w-4 h-4 text-amber-400/80" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L14 9H20L15 13L17 19L12 15L7 19L9 13L4 9H10L12 3Z" />
                  </svg>
                  <div className="h-px bg-gradient-to-l from-transparent to-amber-500/40 flex-1" />
                </div>

                <button
                  type="submit"
                  className="w-full group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold uppercase text-slate-900 shadow-[inset_0_0_0_2px_rgba(202,138,4,0.9),0_10px_20px_-5px_rgba(0,0,0,0.35)] ring-1 ring-amber-700/40 transition duration-200 hover:from-amber-400 hover:via-yellow-400 hover:to-amber-500 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-amber-400/3"
                >
                  <svg className="w-5 h-5 text-amber-950/60" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span className="drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]">S’inscrire</span>
                </button>

                <p className="text-center text-xs text-slate-500 mt-3">
                  En vous inscrivant, vous acceptez de participer à l’aventure épique.
                </p>
              </form>
            </div>
          </section>

          {/* Lobby / Slots Card */}
          <section className="relative">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-amber-100 mb-2">Salon d’équipe</h2>
              <p className="text-slate-300/90 mb-6">
                Invitez vos coéquipiers, choisissez un nom et préparez votre plan.
              </p>

              {/* Soft glowing decor */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
            </div>
          </section>
        </main>
      </div>
    </Background>
  );
};

export default Hub;
