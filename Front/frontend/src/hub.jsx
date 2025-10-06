import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Hub = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Inscription:', formData)
    // Add your submission logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)] opacity-30"></div>
      
      {/* Main content card */}
      <div className="relative max-w-md w-full">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-8">
          
          {/* Greek pattern decoration */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30">
                <svg className="w-8 h-8 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 mb-2">
              Inscription
            </h1>
            
            <p className="text-slate-400">
              Rejoignez l'Opération Héphaïstos
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Nom field */}
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-slate-300 mb-2">
                Nom
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                placeholder="Entrez votre nom"
              />
            </div>

            {/* Prénom field */}
            <div>
              <label htmlFor="prenom" className="block text-sm font-medium text-slate-300 mb-2">
                Prénom
              </label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                placeholder="Entrez votre prénom"
              />
            </div>

            {/* Équipe field */}
            <div>
              <label htmlFor="equipe" className="block text-sm font-medium text-slate-300 mb-2">
                Nom d'équipe
              </label>
              <input
                type="text"
                id="equipe"
                name="equipe"
                value={formData.equipe}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                placeholder="Les Argonautes"
              />
            </div>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4 my-6">
              <div className="h-px bg-gradient-to-r from-transparent to-amber-500/50 flex-1"></div>
              <svg className="w-4 h-4 text-amber-500/70" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L14 9L20 9L15 13L17 19L12 15L7 19L9 13L4 9L10 9L12 3Z" />
              </svg>
              <div className="h-px bg-gradient-to-l from-transparent to-amber-500/50 flex-1"></div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl select-none font-semibold uppercase tracking-[0.18em] bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 text-slate-900 shadow-[inset_0_0_0_2px_rgba(202,138,4,0.9),0_10px_20px_-5px_rgba(0,0,0,0.35)] ring-1 ring-amber-700/40 transition-all duration-200 ease-out hover:from-amber-400 hover:via-yellow-400 hover:to-amber-500 hover:-translate-y-0.5 active:translate-y-0 active:brightness-[0.98] focus:outline-none focus:ring-4 focus:ring-amber-400/30 before:absolute before:inset-[2px] before:rounded-[10px] before:bg-gradient-to-b before:from-white/15 before:to-black/10 before:pointer-events-none"
            >
              <svg className="w-5 h-5 text-amber-950/60" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span className="drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]">S'inscrire</span>
            </button>
          </form>

          {/* Footer note */}
          <p className="text-center text-xs text-slate-500 mt-6">
            En vous inscrivant, vous acceptez de participer à l'aventure épique
          </p>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
      </div>
    </div>
  )
}

export default Hub
