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
  const [formData, setFormData] = useState({ username: "", password: "" , confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading,setLoading] = useState(false);
  const [sessionInfo,setSessionInfo] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const API_BASE_URL = "http://localhost:8000/api"; 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 

    try {
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
        credentials: 'include', // Important pour les cookies de session
      });

      const data = await response.json();

      if (response.ok) {
        // Stocker les infos de session
        localStorage.setItem('user', JSON.stringify({
          username: data.user,
          session_id: data.session_id
        }));
        
        setSessionInfo(data);
        
        // Redirection après connexion réussie
        setTimeout(() => {
          navigate('/sante'); // Vers la première page du jeu
        }, 1500);
      } else {
        setError(data.message || "Erreur de connexion");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      setLoading(false);
      return;
    }

    try {
      console.log("Tentative d'inscription avec:", { username: formData.username });
      
      const response = await fetch(`${API_BASE_URL}/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("Réponse du serveur:", response.status, data);

      if (response.ok) {
        console.log("Inscription réussie, tentative de connexion...");
        // Auto-login après inscription
        await handleLogin(e);
      } else {
        setError(data.message || "Erreur lors de l'inscription");
        console.error("Erreur d'inscription:", data);
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    if (isLogin) {
      handleLogin(e);
    } else {
      handleRegister(e);
    }
  };

  return (
    <Background>
      <GreekFrise position="top" height={FRIESE_HEIGHT} tileWidth={TILE_WIDTH} />
      <GreekFrise position="bottom" height={FRIESE_HEIGHT} tileWidth={TILE_WIDTH} />

      <div
        className="w-full"
        style={{
          paddingTop: FRIESE_HEIGHT,
          paddingBottom: FRIESE_HEIGHT,
        }}
      >
        {/* Hero Header */}
        <header className="max-w-5xl mx-auto px-6 text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-3">
            <GreekColumn size="md" />
            <span className="text-sm tracking-widest uppercase text-[#8B7355]">
              Agora • Opération Héphaïstos
            </span>
            <GreekColumn size="md" className="scale-x-[-1]" />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-[#5C4033]">
            {isLogin ? "Rejoignez l'Olympe" : "Créez votre Légende"}
          </h1>
          <p className="mt-3 text-[#8B7355]/90">
            {isLogin 
              ? "Connectez-vous pour continuer votre aventure" 
              : "Inscrivez-vous pour débuter votre épopée"}
          </p>
        </header>

        {/* Main content */}
        <main className="max-w-md mx-auto px-6">
          <section className="relative">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-[#8B7355]/20 p-6 md:p-8">
              
              <h2 className="text-2xl font-bold text-[#5C4033] mb-6 text-center">
                {isLogin ? "Connexion" : "Inscription"}
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {sessionInfo && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                  Bienvenue {sessionInfo.user} ! Redirection...
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-[#5C4033] mb-1.5">
                    Nom d'utilisateur
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-[#C4B5A0] rounded-xl text-[#5C4033] placeholder-[#8B7355]/50 focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355] transition"
                    placeholder="Votre nom de héros"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#5C4033] mb-1.5">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-[#C4B5A0] rounded-xl text-[#5C4033] placeholder-[#8B7355]/50 focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355] transition"
                    placeholder="••••••••"
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#5C4033] mb-1.5">
                      Confirmer le mot de passe
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required={!isLogin}
                      className="w-full px-4 py-3 bg-white border-2 border-[#C4B5A0] rounded-xl text-[#5C4033] placeholder-[#8B7355]/50 focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 focus:border-[#8B7355] transition"
                      placeholder="••••••••"
                    />
                  </div>
                )}

                {/* Divider */}
                <div className="flex items-center justify-center gap-4 my-4">
                  <div className="h-px bg-gradient-to-r from-transparent to-[#8B7355]/40 flex-1" />
                  <svg className="w-4 h-4 text-[#8B7355]/80" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L14 9H20L15 13L17 19L12 15L7 19L9 13L4 9H10L12 3Z" />
                  </svg>
                  <div className="h-px bg-gradient-to-l from-transparent to-[#8B7355]/40 flex-1" />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold uppercase tracking-[0.18em] bg-gradient-to-r from-[#8B7355] to-[#A0826D] text-white shadow-lg transition duration-200 hover:from-[#7A6248] hover:to-[#8B7355] hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-[#8B7355]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="animate-spin">⚙️</span>
                  ) : (
                    <>
                      <svg className="w-5 h-5 text-white/80" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      <span className="drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]">
                        {isLogin ? "Se connecter" : "S'inscrire"}
                      </span>
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-[#8B7355] mt-4">
                  {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError("");
                      setFormData({ username: "", password: "", confirmPassword: "" });
                    }}
                    className="ml-2 text-[#5C4033] font-semibold hover:underline"
                  >
                    {isLogin ? "Inscrivez-vous" : "Connectez-vous"}
                  </button>
                </p>
              </form>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#8B7355]/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#A0826D]/10 rounded-full blur-2xl" />
          </section>
        </main>
      </div>
    </Background>
  );
};



export default Hub;
