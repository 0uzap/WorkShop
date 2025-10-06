import { useNavigate } from 'react-router-dom'
import ReadyButton from '../Button.jsx'

function Home() {
  const navigate = useNavigate()

  const handleReady = () => {
    console.log('Player is ready!')
    // Navigate to hub/registration page
    navigate('/hub')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)] opacity-30"></div>
      
      {/* Main content card */}
      <div className="relative max-w-2xl w-full">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-12">
          
          {/* Greek pattern decoration */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30">
                <svg className="w-10 h-10 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 mb-4">
              Bienvenue
            </h1>
            
            <p className="text-xl text-slate-300 mb-2">
              L'Opération Héphaïstos vous attend
            </p>
            
            <p className="text-slate-400 max-w-md mx-auto">
              Embarquez dans une aventure épique inspirée de la mythologie grecque. 
              Êtes-vous prêt à relever le défi des dieux?
            </p>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px bg-gradient-to-r from-transparent to-amber-500/50 flex-1"></div>
            <svg className="w-6 h-6 text-amber-500/70" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L14 9L20 9L15 13L17 19L12 15L7 19L9 13L4 9L10 9L12 3Z" />
            </svg>
            <div className="h-px bg-gradient-to-l from-transparent to-amber-500/50 flex-1"></div>
          </div>

          {/* Ready Button */}
          <div className="flex justify-center mb-8">
            <ReadyButton onClick={handleReady}>
              Prêt
            </ReadyButton>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-slate-700/50">
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-sm text-slate-400">Défis Épiques</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏛️</div>
              <p className="text-sm text-slate-400">Mythologie</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏆</div>
              <p className="text-sm text-slate-400">Gloire Éternelle</p>
            </div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
      </div>
    </div>
  )
}

export default Home

