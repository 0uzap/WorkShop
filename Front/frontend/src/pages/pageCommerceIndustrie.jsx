import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../Background.jsx';
import GreekFrise from '../components/GreekFrise.jsx';
import { Coins, Lock, Unlock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const PageCommerceIndustrie = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [hints, setHints] = useState({});
  const [validatedAnswers, setValidatedAnswers] = useState({});
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [showTransition, setShowTransition] = useState(false);

  const puzzles = [
    {
      id: 'drachme',
      title: "La Monnaie Antique",
      question: "On me pèse et me frappe ; j'achète l'huile et le vin sur l'agora. Qui suis-je ?",
      answer: "drachme",
      alternativeAnswers: ["la drachme", "une drachme"],
      hint: "Monnaie antique grecque",
      type: "text"
    },
    {
      id: 'amphore',
      title: "Le Récipient du Commerce",
      question: "Rébus : Calendrier (année/an) + un bonhomme musclé (fort)",
      answer: "amphore",
      alternativeAnswers: ["une amphore", "l'amphore"],
      hint: "Récipient à deux anses pour le transport",
      type: "rebus",
      visual: ["📅 An", "💪 Fort"]
    }
  ];

  const currentPuzzle = puzzles[currentPuzzleIndex];

  const normalizeAnswer = (answer) => {
    return answer.toLowerCase().trim().replace(/[^a-zàâäéèêëïîôùûüÿœæç]/gi, '');
  };

  const checkAnswer = (userAnswer, correctAnswer, alternativeAnswers = []) => {
    const normalized = normalizeAnswer(userAnswer);
    const correct = normalizeAnswer(correctAnswer);
    const alternatives = alternativeAnswers.map(a => normalizeAnswer(a));
    
    return normalized === correct || alternatives.includes(normalized);
  };

  const handleSubmit = () => {
    const userAnswer = answers[currentPuzzle.id] || '';
    
    if (checkAnswer(userAnswer, currentPuzzle.answer, currentPuzzle.alternativeAnswers)) {
      setValidatedAnswers({...validatedAnswers, [currentPuzzle.id]: true});
      
      setTimeout(() => {
        if (currentPuzzleIndex < puzzles.length - 1) {
          setCurrentPuzzleIndex(currentPuzzleIndex + 1);
        } else {
          setShowTransition(true);
          setTimeout(() => {
            navigate('/tourisme');
          }, 2000);
        }
      }, 1500);
    } else {
      setValidatedAnswers({...validatedAnswers, [currentPuzzle.id]: false});
      setTimeout(() => {
        setValidatedAnswers(prev => ({...prev, [currentPuzzle.id]: undefined}));
      }, 2000);
    }
  };

  const toggleHint = () => {
    setHints({...hints, [currentPuzzle.id]: !hints[currentPuzzle.id]});
  };

  return (
    <Background>
      <GreekFrise position="top" />
      <GreekFrise position="bottom" />
      
      <div className="relative z-10 w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Coins className="w-8 h-8 text-[#8B7355]" />
            <h1 className="text-4xl md:text-5xl font-bold text-[#5C4033]">
              Commerce & Industrie
            </h1>
            <Coins className="w-8 h-8 text-[#8B7355]" />
          </div>
          <p className="text-[#8B7355] text-lg">
            Les secrets de l'agora et du commerce antique
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-center gap-2 mb-4">
            {puzzles.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index < currentPuzzleIndex ? 'bg-[#5C4033]' :
                  index === currentPuzzleIndex ? 'bg-[#8B7355] scale-125' :
                  'bg-[#C4B5A0]'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-[#8B7355] text-sm">
            Énigme {currentPuzzleIndex + 1} sur {puzzles.length}
          </p>
        </div>

        <div className={`bg-white/80 backdrop-blur rounded-2xl shadow-xl border-2 border-[#8B7355]/20 overflow-hidden transition-all duration-500 ${
          validatedAnswers[currentPuzzle.id] === true ? 'border-green-600 shadow-green-600/20' :
          validatedAnswers[currentPuzzle.id] === false ? 'border-red-600 shake' : ''
        }`}>
          <div className="bg-gradient-to-r from-[#8B7355] to-[#A0826D] p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {currentPuzzle.title}
              </h2>
              {validatedAnswers[currentPuzzle.id] === true ? (
                <Unlock className="w-6 h-6 text-white" />
              ) : (
                <Lock className="w-6 h-6 text-white/60" />
              )}
            </div>
          </div>

          <div className="p-6">
            <p className="text-[#5C4033] text-lg mb-6 font-medium">
              {currentPuzzle.question}
            </p>

            {currentPuzzle.type === 'rebus' && currentPuzzle.visual && (
              <div className="flex flex-wrap gap-3 mb-6 justify-center bg-[#F5E6D3] rounded-xl p-4">
                {currentPuzzle.visual.map((item, idx) => (
                  <div key={idx} className="text-2xl font-bold text-[#5C4033] px-4 py-2 bg-white rounded-lg shadow-md">
                    {item}
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={answers[currentPuzzle.id] || ''}
                onChange={(e) => setAnswers({...answers, [currentPuzzle.id]: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                disabled={validatedAnswers[currentPuzzle.id] === true}
                placeholder="Votre réponse..."
                className={`flex-1 px-4 py-3 rounded-xl border-2 bg-white focus:outline-none focus:ring-2 transition-all ${
                  validatedAnswers[currentPuzzle.id] === true
                    ? 'border-green-500 bg-green-50'
                    : 'border-[#C4B5A0] focus:ring-[#8B7355]/30 focus:border-[#8B7355]'
                }`}
              />
              
              <button
                onClick={handleSubmit}
                disabled={validatedAnswers[currentPuzzle.id] === true}
                className="px-6 py-3 bg-gradient-to-r from-[#8B7355] to-[#A0826D] text-white font-bold rounded-xl hover:from-[#7A6248] hover:to-[#8B7355] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                Valider
              </button>
              
              <button
                onClick={toggleHint}
                className="px-4 py-3 bg-[#F5E6D3] text-[#5C4033] rounded-xl hover:bg-[#E8D4B8] transition-all shadow-md"
                title="Indice"
              >
                💡
              </button>
            </div>

            {hints[currentPuzzle.id] && (
              <div className="p-4 bg-[#FFF8DC] border-2 border-[#D4AF37]/30 rounded-lg">
                <p className="text-[#8B7355] flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  <span className="font-medium">Indice : {currentPuzzle.hint}</span>
                </p>
              </div>
            )}

            {validatedAnswers[currentPuzzle.id] === true && (
              <div className="mt-4 p-3 bg-green-100 rounded-lg flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Parfait ! Commerce maîtrisé !</span>
              </div>
            )}
            {validatedAnswers[currentPuzzle.id] === false && (
              <div className="mt-4 p-3 bg-red-100 rounded-lg flex items-center gap-2 text-red-700">
                <XCircle className="w-5 h-5" />
                <span>Réessayez votre proposition...</span>
              </div>
            )}
          </div>
        </div>

        {showTransition && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 text-center max-w-md shadow-2xl">
              <div className="text-6xl mb-4">💰</div>
              <h2 className="text-3xl font-bold text-[#5C4033] mb-4">
                Fortune acquise !
              </h2>
              <p className="text-[#8B7355] mb-6">
                L'agora n'a plus de secrets pour vous !
                Continuons vers le Tourisme...
              </p>
              <div className="flex justify-center">
                <ArrowRight className="w-8 h-8 text-[#8B7355] animate-pulse" />
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </Background>
  );
};

export default PageCommerceIndustrie;