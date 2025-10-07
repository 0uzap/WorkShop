import { useNavigate } from 'react-router-dom'
import Background from '../Background.jsx'
import GreekFrise from '../components/GreekFrise.jsx'
import PlayerSlot from '../components/PlayerSlot.jsx'

function Home() {
  const navigate = useNavigate()

  return (
    <Background>
      {/* Player Slots Section */}
      <div className="relative max-w-5xl w-full">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-8">
          <GreekFrise position="top" />
          
          <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 mb-8 mt-4">
            Code de Session
          </h2>

          {/* 4 Player Slots - Horizontal layout */}
          <div className="flex flex-row justify-center items-start gap-8 px-4">
            <PlayerSlot player={{ id: 1 }} />
            <PlayerSlot player={{ id: 2 }} />
            <PlayerSlot player={{ id: 3 }} />
            <PlayerSlot player={{ id: 4 }} />
          </div>

          <GreekFrise position="bottom" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
      </div>
    </Background>
  )
}

export default Home
