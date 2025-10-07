import { useNavigate } from 'react-router-dom'
import ReadyButton from '../Button.jsx'
import Background from '../Background.jsx'
import GreekColumn from '../components/GreekColumn.jsx'
import GreekFrise from '../components/GreekFrise.jsx'

function Home() {
  const navigate = useNavigate()

  const handleReady = () => {
    console.log('Player is ready!')
    // Navigate to hub/registration page
    navigate('/hub')
  }

  return (
    <Background>
      {/* Main content card */}
      <div className="relative max-w-2xl w-full">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-12">
          
          {/* Greek pattern decoration */}
          <GreekFrise position="top" />
          
          {/* Header */}
          <div className="text-center mb-12">
            <GreekColumn size="lg" className="mb-6" />
            
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
    </Background>
  )
}

export default Home

