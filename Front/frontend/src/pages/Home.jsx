import { useNavigate } from "react-router-dom";
import Background from "../Background.jsx";
import GreekFrise from "../components/GreekFrise.jsx";
import PlayerSlot from "../components/PlayerSlot.jsx";

function Home() {
  const navigate = useNavigate();
  const FRISE_H = 40; // même valeur que dans le composant

  return (
    <Background>
      {/* conteneur page */}
      <div className="relative min-h-screen" style={{ paddingTop: FRISE_H, paddingBottom: FRISE_H }}>
        {/* Frises pleine largeur, ancrées sur la page (pas sur la card) */}
        <GreekFrise position="top" height={40} opacity={0.9} />
       

        {/* Ton bloc de contenu */}
        <div className="relative z-10 mx-auto max-w-5xl bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative z-10 px-8 pt-12 pb-16">
            <h2 className="flex justify-center">
              <span className="inline-block border-4 border-black px-4 py-1 rounded-md tracking-wide font-extrabold text-black bg-[#DDD1BC]">
                Code Session
              </span>
            </h2>

            <div className="mt-6 flex flex-row justify-center items-start gap-8 px-4">
              <PlayerSlot player={{ id: 1 }} />
              <PlayerSlot player={{ id: 2 }} />
              <PlayerSlot player={{ id: 3 }} />
              <PlayerSlot player={{ id: 4 }} />
            </div>
          </div>
        </div>
      </div>
      <GreekFrise position="bottom" height={40} opacity={0.9} />
    </Background>
  );
}

export default Home;
